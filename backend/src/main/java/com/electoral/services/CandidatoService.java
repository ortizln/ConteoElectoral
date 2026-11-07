package com.electoral.services;

import com.electoral.annotation.Auditable;
import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.exception.ValidacionException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class CandidatoService {
    private final CandidatoRepository candidatoRepository;
    private final PartidoRepository partidoRepository;
    private final CargoRepository cargoRepository;
    private final EleccionService eleccionService;
    private final TipoCircunscripcionRepository tipoCircunscripcionRepository;
    private final ProvinciaRepository provinciaRepository;
    private final CantonRepository cantonRepository;
    private final ParroquiaRepository parroquiaRepository;
    private final ListaElectoralRepository listaElectoralRepository;
    private final RuleEngine ruleEngine;
    private final ReglaNegocioService reglaNegocioService;
    private final com.electoral.repositories.MesaRepository mesaRepository;

    @Transactional(readOnly = true)
    public List<CandidatoResponse> getCandidatosByEleccion(Long eleccionesId) {
        return candidatoRepository.findByEleccionesId(eleccionesId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Candidatos visibles para una mesa segun el territorio del cargo:
     * - Cargo NACIONAL: siempre visible.
     * - PROVINCIA/CANTON/PARROQUIA: el candidato debe tener asignado el
     *   territorio que coincide con el de la mesa (parroquia de la institucion).
     * - Candidatos sin territorio asignado: visibles (compatibilidad con
     *   datos cargados antes de esta funcionalidad).
     */
    @Transactional(readOnly = true)
    public List<CandidatoResponse> getCandidatosByMesa(Long mesaId) {
        Mesa mesa = mesaRepository.findById(mesaId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + mesaId));
        Long eleccionId = mesa.getElecciones().getId();
        Long parroquiaMesa = mesa.getInstitucion() != null && mesa.getInstitucion().getParroquia() != null
                ? mesa.getInstitucion().getParroquia().getId() : null;
        Long cantonMesa = parroquiaMesa != null && mesa.getInstitucion().getParroquia().getCanton() != null
                ? mesa.getInstitucion().getParroquia().getCanton().getId() : null;
        Long provinciaMesa = cantonMesa != null && mesa.getInstitucion().getParroquia().getCanton().getProvincia() != null
                ? mesa.getInstitucion().getParroquia().getCanton().getProvincia().getId() : null;

        return candidatoRepository.findByEleccionesId(eleccionId).stream()
                .filter(c -> aplicaParaTerritorio(c, parroquiaMesa, cantonMesa, provinciaMesa))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private boolean aplicaParaTerritorio(Candidato candidato, Long parroquiaMesa, Long cantonMesa, Long provinciaMesa) {
        Cargo cargo = candidato.getCargo();
        if (cargo == null || cargo.getTerritorio() == null || cargo.getTerritorio() == TipoTerritorio.NACIONAL) {
            return true;
        }
        switch (cargo.getTerritorio()) {
            case PROVINCIA:
                return candidato.getProvincia() == null
                        || (provinciaMesa != null && provinciaMesa.equals(candidato.getProvincia().getId()));
            case CANTON:
                return candidato.getCanton() == null
                        || (cantonMesa != null && cantonMesa.equals(candidato.getCanton().getId()));
            case PARROQUIA:
                return candidato.getParroquia() == null
                        || (parroquiaMesa != null && parroquiaMesa.equals(candidato.getParroquia().getId()));
            default:
                return true;
        }
    }

    @Transactional(readOnly = true)
    public List<CandidatoResponse> getCandidatosOrderByCargo(Long eleccionId) {
        return candidatoRepository.findByEleccionOrderByCargo(eleccionId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CandidatoResponse getCandidatoById(Long id) {
        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id));
        return mapToResponse(candidato);
    }

    @Transactional
    @Auditable(entidad = "Candidato")
    public CandidatoResponse createCandidato(CandidatoRequest request) {
        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionesId());
        Cargo cargo = cargoRepository.findById(request.getCargoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado con ID: " + request.getCargoId()));
        
        Partido partido = null;
        if (request.getPartidoId() != null) {
            partido = partidoRepository.findById(request.getPartidoId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Partido no encontrado con ID: " + request.getPartidoId()));
            
            if (!"LISTA".equals(cargo.getTipoVotacion().name())) {
                boolean existeCandidato = candidatoRepository.existsByEleccionesIdAndPartidoIdAndCargoId(
                    request.getEleccionesId(), request.getPartidoId(), request.getCargoId());
                if (existeCandidato) {
                    throw new DuplicateEntityException("Ya existe un candidato del partido '" + partido.getNombre() + 
                        "' para el cargo de '" + cargo.getNombre() + "' en esta elección");
                }
            }
        }
        
        Map<String, Object> datosValidacion = new HashMap<>();
        datosValidacion.put("nombre", request.getNombre());
        datosValidacion.put("apellido", request.getApellido());
        datosValidacion.put("partidoId", request.getPartidoId());
        datosValidacion.put("cargoId", request.getCargoId());
        datosValidacion.put("eleccionesId", request.getEleccionesId());
        datosValidacion.put("tipo", request.getTipo());
        datosValidacion.put("principal", request.getPrincipal());
        datosValidacion.put("edad", 25);

        List<ReglaNegocio> reglasValidacion = reglaNegocioService.obtenerReglasActivas("CANDIDATOS", "VALIDACION");
        List<EvaluacionReglaResponse.ErrorRegla> errores = ruleEngine.evaluarReglas(reglasValidacion, datosValidacion);
        if (!errores.isEmpty()) {
            String mensaje = errores.stream()
                    .map(EvaluacionReglaResponse.ErrorRegla::getMensaje)
                    .collect(Collectors.joining("; "));
            throw new ValidacionException(mensaje);
        }

        ListaElectoral lista = request.getListaId() != null
                ? listaElectoralRepository.findById(request.getListaId()).orElse(null) : null;

        Candidato candidato = Candidato.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .partido(partido)
                .cargo(cargo)
                .lista(lista)
                .fotoUrl(request.getFotoUrl())
                .elecciones(eleccion)
                .provincia(request.getProvinciaId() != null
                        ? provinciaRepository.findById(request.getProvinciaId()).orElse(null) : null)
                .canton(request.getCantonId() != null
                        ? cantonRepository.findById(request.getCantonId()).orElse(null) : null)
                .parroquia(request.getParroquiaId() != null
                        ? parroquiaRepository.findById(request.getParroquiaId()).orElse(null) : null)
                .tipoCircunscripcion(request.getTipoCircunscripcionId() != null
                        ? tipoCircunscripcionRepository.findById(request.getTipoCircunscripcionId()).orElse(null) : null)
                .posicionLista(request.getPosicionLista())
                .ordenAparicion(request.getOrdenAparicion())
                .ordenEnLista(request.getOrdenEnLista())
                .tipo(request.getTipo() != null ? request.getTipo() : "PRINCIPAL")
                .principal(request.getPrincipal() != null ? request.getPrincipal() : true)
                .build();
        
        log.info("Creando {}: {}", "Candidato", candidato.getNombre() + " " + candidato.getApellido());
        Candidato saved = candidatoRepository.save(candidato);
        return mapToResponse(saved);
    }

    @Transactional
    @Auditable(entidad = "Candidato")
    public CandidatoResponse updateCandidato(Long id, CandidatoRequest request) {
        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id));

        Cargo cargoActual = candidato.getCargo();
        Long cargoIdNuevo = request.getCargoId() != null ? request.getCargoId() : cargoActual.getId();
        Cargo cargoFinal = cargoRepository.findById(cargoIdNuevo)
                .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado con ID: " + cargoIdNuevo));

        Long partidoId = request.getPartidoId() != null ? request.getPartidoId() :
                (candidato.getPartido() != null ? candidato.getPartido().getId() : null);
        if (partidoId != null && !"LISTA".equals(cargoFinal.getTipoVotacion().name()) &&
                (!partidoId.equals(candidato.getPartido() != null ? candidato.getPartido().getId() : null) ||
                 !cargoIdNuevo.equals(cargoActual.getId())) &&
                candidatoRepository.existsByEleccionesIdAndPartidoIdAndCargoId(
                    candidato.getElecciones().getId(), partidoId, cargoIdNuevo)) {
            throw new DuplicateEntityException("Ya existe un candidato para este partido y cargo en esta elección");
        }
        log.info("Actualizando {} con ID: {}", "Candidato", id);
        candidato.setNombre(request.getNombre());
        candidato.setApellido(request.getApellido());
        candidato.setFotoUrl(request.getFotoUrl());
        candidato.setProvincia(request.getProvinciaId() != null
                ? provinciaRepository.findById(request.getProvinciaId()).orElse(null) : null);
        candidato.setCanton(request.getCantonId() != null
                ? cantonRepository.findById(request.getCantonId()).orElse(null) : null);
        candidato.setParroquia(request.getParroquiaId() != null
                ? parroquiaRepository.findById(request.getParroquiaId()).orElse(null) : null);
        candidato.setTipoCircunscripcion(request.getTipoCircunscripcionId() != null
                ? tipoCircunscripcionRepository.findById(request.getTipoCircunscripcionId()).orElse(null) : null);
        if (request.getListaId() != null) {
            candidato.setLista(listaElectoralRepository.findById(request.getListaId()).orElse(null));
        }
        if (request.getPosicionLista() != null) candidato.setPosicionLista(request.getPosicionLista());
        if (request.getOrdenAparicion() != null) candidato.setOrdenAparicion(request.getOrdenAparicion());
        if (request.getOrdenEnLista() != null) candidato.setOrdenEnLista(request.getOrdenEnLista());
        if (request.getTipo() != null) candidato.setTipo(request.getTipo());
        if (request.getPrincipal() != null) candidato.setPrincipal(request.getPrincipal());
        
        if (request.getCargoId() != null) {
            Cargo cargo = cargoRepository.findById(request.getCargoId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado con ID: " + request.getCargoId()));
            candidato.setCargo(cargo);
        }
        
        if (request.getPartidoId() != null) {
            Partido partido = partidoRepository.findById(request.getPartidoId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Partido no encontrado con ID: " + request.getPartidoId()));
            candidato.setPartido(partido);
        }
        
        Candidato saved = candidatoRepository.save(candidato);
        return mapToResponse(saved);
    }

    @Transactional
    public CandidatoResponse asignarLista(Long candidatoId, Long listaId) {
        Candidato candidato = candidatoRepository.findById(candidatoId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Candidato no encontrado con ID: " + candidatoId));
        if (listaId != null) {
            ListaElectoral lista = listaElectoralRepository.findById(listaId)
                    .orElseThrow(() -> new RecursoNoEncontradoException("Lista no encontrada con ID: " + listaId));
            candidato.setLista(lista);
        } else {
            candidato.setLista(null);
        }
        Candidato saved = candidatoRepository.save(candidato);
        return mapToResponse(saved);
    }

    @Transactional
    @Auditable(entidad = "Candidato")
    public void deleteCandidato(Long id) {
        if (!candidatoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id);
        }
        log.warn("Eliminando {} con ID: {}", "Candidato", id);
        candidatoRepository.deleteById(id);
    }

    private CandidatoResponse mapToResponse(Candidato candidato) {
        return CandidatoResponse.builder()
                .id(candidato.getId())
                .nombre(candidato.getNombre())
                .apellido(candidato.getApellido())
                .nombreCompleto(candidato.getNombreCompleto())
                .partidoId(candidato.getPartido() != null ? candidato.getPartido().getId() : null)
                .partidoNombre(candidato.getPartido() != null ? candidato.getPartido().getNombre() : "Independiente")
                .partidoSigla(candidato.getPartido() != null ? candidato.getPartido().getSigla() : null)
                .cargoId(candidato.getCargo() != null ? candidato.getCargo().getId() : null)
                .cargoNombre(candidato.getCargo() != null ? candidato.getCargo().getNombre() : null)
                .listaId(candidato.getLista() != null ? candidato.getLista().getId() : null)
                .listaNombre(candidato.getLista() != null ? candidato.getLista().getNombre() : null)
                .numeroLista(candidato.getLista() != null ? candidato.getLista().getNumeroLista() : null)
                .fotoUrl(candidato.getFotoUrl())
                .tieneFoto(candidato.getFoto() != null && candidato.getFoto().length > 0)
                .eleccionesId(candidato.getElecciones() != null ? candidato.getElecciones().getId() : null)
                .provinciaId(candidato.getProvincia() != null ? candidato.getProvincia().getId() : null)
                .provinciaNombre(candidato.getProvincia() != null ? candidato.getProvincia().getNombre() : null)
                .cantonId(candidato.getCanton() != null ? candidato.getCanton().getId() : null)
                .cantonNombre(candidato.getCanton() != null ? candidato.getCanton().getNombre() : null)
                .parroquiaId(candidato.getParroquia() != null ? candidato.getParroquia().getId() : null)
                .parroquiaNombre(candidato.getParroquia() != null ? candidato.getParroquia().getNombre() : null)
                .tipoCircunscripcionId(candidato.getTipoCircunscripcion() != null ? candidato.getTipoCircunscripcion().getId() : null)
                .tipoCircunscripcionCodigo(candidato.getTipoCircunscripcion() != null ? candidato.getTipoCircunscripcion().getCodigo() : null)
                .posicionLista(candidato.getPosicionLista())
                .ordenAparicion(candidato.getOrdenAparicion())
                .ordenEnLista(candidato.getOrdenEnLista())
                .tipo(candidato.getTipo())
                .principal(candidato.getPrincipal())
                .activo(candidato.getActivo())
                .build();
    }
}