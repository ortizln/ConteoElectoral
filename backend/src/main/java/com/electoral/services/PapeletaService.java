package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class PapeletaService {

    private final PapeletaRepository papeletaRepository;
    private final OpcionPapeletaRepository opcionPapeletaRepository;
    private final TipoEleccionCargoRepository tipoEleccionCargoRepository;
    private final TipoCircunscripcionRepository tipoCircunscripcionRepository;
    private final CandidatoRepository candidatoRepository;
    private final PartidoRepository partidoRepository;
    private final ProvinciaRepository provinciaRepository;
    private final CantonRepository cantonRepository;
    private final ParroquiaRepository parroquiaRepository;
    private final ListaElectoralRepository listaElectoralRepository;
    private final EleccionService eleccionService;

    @Transactional(readOnly = true)
    public List<PapeletaResponse> getPapeletasByEleccion(Long eleccionId) {
        List<Papeleta> papeletas = papeletaRepository.findByEleccionIdOrderByOrden(eleccionId);
        return papeletas.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public PapeletaResponse getPapeletaById(Long id) {
        Papeleta papeleta = papeletaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Papeleta no encontrada con ID: " + id));
        return mapToResponse(papeleta);
    }

    @Transactional
    public List<PapeletaResponse> generarPapeletas(Long eleccionId) {
        Eleccion eleccion = eleccionService.getEleccionEntityById(eleccionId);
        if (eleccion.getTipoEleccion() == null) {
            throw new IllegalStateException("La elección debe tener un tipo de elección asignado");
        }

        List<TipoEleccionCargo> tecList = tipoEleccionCargoRepository
                .findByTipoEleccionIdOrderByOrden(eleccion.getTipoEleccion().getId());
        if (tecList.isEmpty()) {
            throw new IllegalStateException("No hay cargos configurados para este tipo de elección");
        }

        List<Papeleta> papeletasGeneradas = new ArrayList<>();

        for (TipoEleccionCargo tec : tecList) {
            Cargo cargo = tec.getCargo();
            String circCodigo = cargo.getTipoCircunscripcion().getCodigo();
            List<Long> circunscripcionIds = getCircunscripcionIds(circCodigo);

            for (Long circId : circunscripcionIds) {
                String titulo = buildTituloPapeleta(cargo, circCodigo, circId);
                Papeleta papeleta = Papeleta.builder()
                        .eleccion(eleccion)
                        .cargo(cargo)
                        .tipoCircunscripcion(cargo.getTipoCircunscripcion())
                        .circunscripcionId(circId)
                        .titulo(titulo)
                        .orden(cargo.getId().intValue())
                        .build();
                papeleta = papeletaRepository.save(papeleta);
                papeletasGeneradas.add(papeleta);

                agregarOpciones(papeleta, cargo, eleccionId, circCodigo, circId);
            }
        }

        return papeletasGeneradas.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional
    public void regenerarPapeletas(Long eleccionId) {
        List<Papeleta> existentes = papeletaRepository.findByEleccionIdOrderByOrden(eleccionId);
        List<Long> papeletaIds = existentes.stream().map(Papeleta::getId).collect(Collectors.toList());
        if (!papeletaIds.isEmpty()) {
            opcionPapeletaRepository.deleteByPapeletaIdIn(papeletaIds);
            papeletaRepository.deleteByEleccionId(eleccionId);
        }
        generarPapeletas(eleccionId);
    }

    private List<Long> getCircunscripcionIds(String codigo) {
        switch (codigo) {
            case "PROVINCIAL":
                return provinciaRepository.findAll().stream().map(Provincia::getId).collect(Collectors.toList());
            case "CANTONAL":
            case "URBANA":
            case "RURAL":
                return cantonRepository.findAll().stream().map(Canton::getId).collect(Collectors.toList());
            case "PARROQUIAL":
                return parroquiaRepository.findAll().stream().map(Parroquia::getId).collect(Collectors.toList());
            default:
                return Collections.singletonList(null);
        }
    }

    private String buildTituloPapeleta(Cargo cargo, String circCodigo, Long circId) {
        if (circId == null) return cargo.getNombre();
        switch (circCodigo) {
            case "PROVINCIAL":
                return cargo.getNombre() + " - " + provinciaRepository.findById(circId)
                        .map(Provincia::getNombre).orElse("Desconocida");
            case "CANTONAL":
            case "URBANA":
            case "RURAL":
                String cantonNombre = cantonRepository.findById(circId)
                        .map(Canton::getNombre).orElse("Desconocido");
                if ("URBANA".equals(circCodigo)) return "Concejales Urbanos - " + cantonNombre;
                if ("RURAL".equals(circCodigo)) return "Concejales Rurales - " + cantonNombre;
                return cargo.getNombre() + " - " + cantonNombre;
            case "PARROQUIAL":
                return "Vocales - " + parroquiaRepository.findById(circId)
                        .map(Parroquia::getNombre).orElse("Desconocida");
            default:
                return cargo.getNombre();
        }
    }

    private void agregarOpciones(Papeleta papeleta, Cargo cargo,
                                  Long eleccionId, String circCodigo, Long circId) {
        int orden = 0;
        List<ListaElectoral> listas = listaElectoralRepository
                .findByEleccionIdAndCargoIdAndCircunscripcionIdAndCircunscripcionTipo(
                        eleccionId, cargo.getId(), circId, circCodigo);

        if (listas.isEmpty()) {
            // Fallback V2: crear opciones desde partidos
            List<Partido> partidos = partidoRepository.findByEleccionesId(eleccionId);
            for (Partido partido : partidos) {
                opcionPapeletaRepository.save(OpcionPapeleta.builder()
                        .papeleta(papeleta).tipoOpcion("PARTIDO")
                        .partido(partido).partidoSigla(partido.getSigla())
                        .etiqueta(partido.getNombre() + " (Lista " + partido.getSigla() + ")")
                        .orden(++orden).build());
            }
        } else {
            for (ListaElectoral lista : listas) {
                String etiqueta = lista.getNombre();
                opcionPapeletaRepository.save(OpcionPapeleta.builder()
                        .papeleta(papeleta)
                        .tipoOpcion("LISTA")
                        .lista(lista)
                        .partido(lista.getPartido())
                        .partidoSigla(lista.getPartido() != null ? lista.getPartido().getSigla() : null)
                        .etiqueta(etiqueta + " (Lista " + lista.getNumeroLista() + ")")
                        .orden(++orden).build());
            }
        }

        opcionPapeletaRepository.save(OpcionPapeleta.builder()
                .papeleta(papeleta).tipoOpcion("NULO")
                .etiqueta("Voto Nulo").orden(998).build());
        opcionPapeletaRepository.save(OpcionPapeleta.builder()
                .papeleta(papeleta).tipoOpcion("BLANCO")
                .etiqueta("Voto Blanco").orden(999).build());
    }

    private List<Candidato> findCandidatosForCircunscripcion(
            Long eleccionId, Long cargoId, String circCodigo, Long circId) {
        List<Candidato> todos = candidatoRepository.findByEleccionesId(eleccionId).stream()
                .filter(c -> c.getCargo().getId().equals(cargoId))
                .collect(Collectors.toList());

        if (circId == null) return todos;

        switch (circCodigo) {
            case "PROVINCIAL":
                return todos.stream()
                        .filter(c -> c.getProvincia() != null && c.getProvincia().getId().equals(circId))
                        .collect(Collectors.toList());
            case "CANTONAL":
            case "URBANA":
            case "RURAL":
                return todos.stream()
                        .filter(c -> c.getCanton() != null && c.getCanton().getId().equals(circId))
                        .collect(Collectors.toList());
            case "PARROQUIAL":
                return todos.stream()
                        .filter(c -> c.getParroquia() != null && c.getParroquia().getId().equals(circId))
                        .collect(Collectors.toList());
            default:
                return todos;
        }
    }

    private PapeletaResponse mapToResponse(Papeleta p) {
        List<OpcionPapeleta> opciones = opcionPapeletaRepository.findByPapeletaIdOrderByOrden(p.getId());

        return PapeletaResponse.builder()
                .id(p.getId())
                .eleccionId(p.getEleccion().getId())
                .eleccionNombre(p.getEleccion().getNombre())
                .cargoId(p.getCargo().getId())
                .cargoNombre(p.getCargo().getNombre())
                .tipoVotacion(p.getCargo().getTipoVotacion() != null
                        ? p.getCargo().getTipoVotacion().name() : null)
                .tipoCircunscripcion(p.getTipoCircunscripcion().getCodigo())
                .circunscripcionId(p.getCircunscripcionId())
                .titulo(p.getTitulo())
                .orden(p.getOrden())
                .colorHex(p.getColorHex())
                .colorNombre(p.getColorNombre())
                .plantillaId(p.getPlantilla() != null ? p.getPlantilla().getId() : null)
                .plantillaNombre(p.getPlantilla() != null ? p.getPlantilla().getNombre() : null)
                .permiteVotoCruzado(p.getPermiteVotoCruzado())
                .permiteVotoListaCompleta(p.getPermiteVotoListaCompleta())
                .cantidadMaxVotos(p.getCantidadMaxVotos())
                .cantidadCandidatosPorLista(p.getCantidadCandidatosPorLista())
                .activa(p.getActiva())
                .opciones(opciones.stream().map(this::mapOpcionToResponse).collect(Collectors.toList()))
                .build();
    }

    private OpcionPapeletaResponse mapOpcionToResponse(OpcionPapeleta op) {
        return OpcionPapeletaResponse.builder()
                .id(op.getId())
                .tipoOpcion(op.getTipoOpcion())
                .candidatoId(op.getCandidato() != null ? op.getCandidato().getId() : null)
                .candidatoNombre(op.getCandidato() != null ? op.getCandidato().getNombreCompleto() : null)
                .listaId(op.getLista() != null ? op.getLista().getId() : null)
                .numeroLista(op.getLista() != null ? op.getLista().getNumeroLista() : null)
                .listaNombre(op.getLista() != null ? op.getLista().getNombre() : null)
                .partidoId(op.getPartido() != null ? op.getPartido().getId() : null)
                .partidoNombre(op.getPartido() != null ? op.getPartido().getNombre() : null)
                .partidoSigla(op.getPartidoSigla())
                .etiqueta(op.getEtiqueta())
                .orden(op.getOrden())
                .build();
    }
}
