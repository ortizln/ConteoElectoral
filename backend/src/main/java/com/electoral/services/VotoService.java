package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.*;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class VotoService {
    private final VotoRepository votoRepository;
    private final CandidatoRepository candidatoRepository;
    private final MesaRepository mesaRepository;
    private final EleccionService eleccionService;
    private final MesaService mesaService;
    private final AuditoriaService auditoriaService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ListaElectoralRepository listaElectoralRepository;

    @Transactional(readOnly = true)
    public List<VotoResponse> getVotosByMesa(Long mesaId) {
        return votoRepository.findByMesaId(mesaId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<VotoResponse> getVotosByEleccion(Long eleccionesId) {
        return votoRepository.findByEleccionesId(eleccionesId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public VotoResponse getVotoById(Long id) {
        Voto voto = votoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Voto no encontrado con ID: " + id));
        return mapToResponse(voto);
    }

    @Transactional
    public List<VotoResponse> registrarVoto(VotoRequest request, Long usuarioId) {
        Mesa mesa = mesaService.getMesaEntityById(request.getMesaId());

        if (mesa.getCerrada()) {
            throw new MesaCerradaException("No se puede registrar votos en una mesa cerrada");
        }

        if (!mesaService.usuarioPerteneceAMesa(usuarioId, mesa.getId())) {
            throw new AccesoDenegadoException("No tiene permisos para registrar votos en esta mesa");
        }

        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionesId());
        List<Voto> savedVotos = new ArrayList<>();

        if (request.getListaId() != null) {
            List<Candidato> candidatosLista = candidatoRepository.findByListaIdOrderByOrdenEnLista(request.getListaId());
            if (candidatosLista.isEmpty()) {
                throw new RecursoNoEncontradoException(
                        "No hay candidatos en la lista ID: " + request.getListaId());
            }
            for (Candidato candidato : candidatosLista) {
                Voto voto = upsertVoto(candidato, mesa, eleccion, request.getCantidadVotos(), usuarioId, request.getListaId());
                savedVotos.add(voto);
            }
        } else if (request.getCandidatoId() != null) {
            Candidato candidato = candidatoRepository.findById(request.getCandidatoId())
                    .orElseThrow(() -> new RecursoNoEncontradoException(
                            "Candidato no encontrado con ID: " + request.getCandidatoId()));
            Voto voto = upsertVoto(candidato, mesa, eleccion, request.getCantidadVotos(), usuarioId, null);
            savedVotos.add(voto);
        } else {
            throw new IllegalArgumentException("Debe proporcionar candidatoId o listaId");
        }

        auditoriaService.registrarAccion(
                usuarioId,
                Auditoria.TipoAccion.CREATE,
                "votos",
                null,
                null,
                mapToJsonList(savedVotos));

        notifyDashboardUpdate(eleccion.getId());

        return savedVotos.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private Voto upsertVoto(Candidato candidato, Mesa mesa, Eleccion eleccion, Integer cantidad, Long usuarioId, Long listaId) {
        Voto voto = votoRepository.findByMesaIdAndCandidatoId(mesa.getId(), candidato.getId())
                .map(existingVoto -> {
                    existingVoto.setCantidadVotos(existingVoto.getCantidadVotos() + cantidad);
                    existingVoto.setListaId(listaId);
                    return existingVoto;
                })
                .orElseGet(() -> Voto.builder()
                        .candidato(candidato)
                        .mesa(mesa)
                        .elecciones(eleccion)
                        .cantidadVotos(cantidad)
                        .createdBy(Usuario.builder().id(usuarioId).build())
                        .listaId(listaId)
                        .build());
        return votoRepository.save(voto);
    }

    @Transactional
    public VotoResponse actualizarVoto(Long id, VotoRequest request, Long usuarioId) {
        Voto voto = votoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Voto no encontrado con ID: " + id));

        if (voto.getMesa().getCerrada()) {
            throw new MesaCerradaException("No se puede modificar votos en una mesa cerrada");
        }

        if (!mesaService.usuarioPerteneceAMesa(usuarioId, voto.getMesa().getId())) {
            throw new AccesoDenegadoException("No tiene permisos para modificar votos en esta mesa");
        }

        voto.setCantidadVotos(request.getCantidadVotos());
        if (request.getListaId() != null) {
            voto.setListaId(request.getListaId());
        }
        Voto updatedVoto = votoRepository.save(voto);

        auditoriaService.registrarAccion(
                usuarioId,
                Auditoria.TipoAccion.UPDATE,
                "votos",
                updatedVoto.getId(),
                mapToJson(voto),
                mapToJson(updatedVoto));

        notifyDashboardUpdate(updatedVoto.getElecciones().getId());

        return mapToResponse(updatedVoto);
    }

    @Transactional
    public void eliminarVoto(Long id, Long usuarioId) {
        Voto voto = votoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Voto no encontrado con ID: " + id));

        if (voto.getMesa().getCerrada()) {
            throw new MesaCerradaException("No se puede eliminar votos en una mesa cerrada");
        }

        if (!mesaService.usuarioPerteneceAMesa(usuarioId, voto.getMesa().getId())) {
            throw new AccesoDenegadoException("No tiene permisos para eliminar votos en esta mesa");
        }

        auditoriaService.registrarAccion(
                usuarioId,
                Auditoria.TipoAccion.DELETE,
                "votos",
                id,
                mapToJson(voto),
                null);

        votoRepository.delete(voto);

        notifyDashboardUpdate(voto.getElecciones().getId());
    }

    private void notifyDashboardUpdate(Long eleccionId) {
        try {
            DashboardResponse dashboard = getDashboardData(eleccionId);
            messagingTemplate.convertAndSend("/topic/resultados/" + eleccionId, dashboard);
        } catch (Exception e) {
        }
    }

    @Transactional(readOnly = true)
    public CandidatoDetalleResponse getDetalleCandidato(Long candidatoId, Long eleccionId) {
        Candidato candidato = candidatoRepository.findById(candidatoId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Candidato no encontrado"));

        List<Object[]> rows = votoRepository.findVotosByCandidatoAndEleccion(candidatoId, eleccionId);
        Long totalVotos = rows.stream().mapToLong(r -> ((Number) r[4]).longValue()).sum();

        List<CandidatoDetalleResponse.VotoPorMesa> votosPorMesa = rows.stream()
                .map(r -> CandidatoDetalleResponse.VotoPorMesa.builder()
                        .mesaId(((Number) r[0]).longValue())
                        .mesaNumero((String) r[1])
                        .institucion((String) r[2])
                        .parroquia(r[3] != null ? (String) r[3] : "")
                        .votos(((Number) r[4]).longValue())
                        .build())
                .collect(Collectors.toList());

        List<CandidatoDetalleResponse.GeoGroup> zonas = mapGeoGroup(votoRepository.sumVotosByZona(candidatoId, eleccionId), totalVotos);
        List<CandidatoDetalleResponse.GeoGroup> provincias = mapGeoGroup(votoRepository.sumVotosByProvincia(candidatoId, eleccionId), totalVotos);
        List<CandidatoDetalleResponse.GeoGroup> cantones = mapGeoGroup(votoRepository.sumVotosByCanton(candidatoId, eleccionId), totalVotos);
        List<CandidatoDetalleResponse.GeoGroup> parroquias = mapGeoGroup(votoRepository.sumVotosByParroquia(candidatoId, eleccionId), totalVotos);
        List<CandidatoDetalleResponse.GeoGroup> instituciones = mapGeoGroup(votoRepository.sumVotosByInstitucion(candidatoId, eleccionId), totalVotos);

        return CandidatoDetalleResponse.builder()
                .candidatoId(candidatoId)
                .nombreCompleto(candidato.getNombreCompleto())
                .partidoNombre(candidato.getPartido() != null ? candidato.getPartido().getNombre() : "Independiente")
                .cargoNombre(candidato.getCargo().getNombre())
                .totalVotos(totalVotos)
                .votosPorMesa(votosPorMesa)
                .zonas(zonas)
                .provincias(provincias)
                .cantones(cantones)
                .parroquias(parroquias)
                .instituciones(instituciones)
                .build();
    }

    private List<CandidatoDetalleResponse.GeoGroup> mapGeoGroup(List<Object[]> rows, Long totalVotos) {
        return rows.stream()
                .map(r -> CandidatoDetalleResponse.GeoGroup.builder()
                        .id(((Number) r[0]).longValue())
                        .nombre((String) r[1])
                        .votos(((Number) r[2]).longValue())
                        .porcentaje(totalVotos > 0 ? Math.round(((Number) r[2]).longValue() * 10000.0 / totalVotos) / 100.0 : 0)
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DashboardResponse getDashboardData(Long eleccionId) {
        return getDashboardDataConFiltros(eleccionId, null, null, null, null, null, null, null, null);
    }

    @Transactional(readOnly = true)
    public DashboardResponse getDashboardDataConFiltros(Long eleccionId, Long cargoId, Long partidoId,
            Long zonaId, Long provinciaId, Long cantonId, Long parroquiaId, Long institucionId, Long mesaId) {
        Eleccion eleccion = eleccionService.getEleccionEntityById(eleccionId);

        List<Mesa> mesas = mesaRepository.findByEleccionesId(eleccionId);

        if (mesaId != null) {
            mesas = mesas.stream().filter(m -> m.getId().equals(mesaId)).collect(Collectors.toList());
        } else if (institucionId != null) {
            mesas = mesas.stream().filter(m -> m.getInstitucion() != null &&
                    m.getInstitucion().getId().equals(institucionId)).collect(Collectors.toList());
        } else if (parroquiaId != null) {
            mesas = mesas.stream().filter(m -> m.getInstitucion() != null &&
                    m.getInstitucion().getParroquia() != null &&
                    m.getInstitucion().getParroquia().getId().equals(parroquiaId)).collect(Collectors.toList());
        } else if (cantonId != null) {
            mesas = mesas.stream().filter(m -> m.getInstitucion() != null &&
                    m.getInstitucion().getParroquia() != null &&
                    m.getInstitucion().getParroquia().getCanton() != null &&
                    m.getInstitucion().getParroquia().getCanton().getId().equals(cantonId)).collect(Collectors.toList());
        } else if (provinciaId != null) {
            mesas = mesas.stream().filter(m -> m.getInstitucion() != null &&
                    m.getInstitucion().getParroquia() != null &&
                    m.getInstitucion().getParroquia().getCanton() != null &&
                    m.getInstitucion().getParroquia().getCanton().getProvincia() != null &&
                    m.getInstitucion().getParroquia().getCanton().getProvincia().getId().equals(provinciaId))
                    .collect(Collectors.toList());
        } else if (zonaId != null) {
            mesas = mesas.stream().filter(m -> m.getInstitucion() != null &&
                    m.getInstitucion().getParroquia() != null &&
                    m.getInstitucion().getParroquia().getCanton() != null &&
                    m.getInstitucion().getParroquia().getCanton().getProvincia() != null &&
                    m.getInstitucion().getParroquia().getCanton().getProvincia().getZona() != null &&
                    m.getInstitucion().getParroquia().getCanton().getProvincia().getZona().getId().equals(zonaId))
                    .collect(Collectors.toList());
        }

        List<Long> mesaIds = mesas.stream().map(Mesa::getId).collect(Collectors.toList());

        Long totalVotos = votoRepository.sumVotosByEleccionAndMesaIds(eleccionId, mesaIds);
        Long totalVotosNulos = mesaIds.isEmpty() ? 0L : mesaRepository.sumVotosNulosByMesaIds(mesaIds);
        Long totalVotosBlanco = mesaIds.isEmpty() ? 0L : mesaRepository.sumVotosBlancoByMesaIds(mesaIds);
        Long mesasCerradas = mesas.stream().filter(Mesa::getCerrada).count();

        List<Object[]> votosPorCandidato = votoRepository.sumVotosGroupByCandidatoAndMesaIds(eleccionId, mesaIds);
        List<Candidato> candidatos = candidatoRepository.findByEleccionesId(eleccionId);

        if (cargoId != null) {
            candidatos = candidatos.stream().filter(c -> c.getCargo().getId().equals(cargoId))
                    .collect(Collectors.toList());
        }
        if (partidoId != null) {
            candidatos = candidatos.stream()
                    .filter(c -> c.getPartido() != null && c.getPartido().getId().equals(partidoId))
                    .collect(Collectors.toList());
        }

        List<ResultadoCandidato> resultados = candidatos.stream()
                .map(c -> {
                    Long votos = votosPorCandidato.stream()
                            .filter(o -> ((Number) o[0]).longValue() == c.getId())
                            .map(o -> ((Number) o[1]).longValue())
                            .findFirst()
                            .orElse(0L);
                    double porcentaje = totalVotos > 0 ? (votos * 100.0 / totalVotos) : 0;

                    return ResultadoCandidato.builder()
                            .candidatoId(c.getId())
                            .nombreCompleto(c.getNombreCompleto())
                            .partidoNombre(c.getPartido() != null ? c.getPartido().getNombre() : "Independiente")
                            .cargoNombre(c.getCargo().getNombre())
                            .totalVotos(votos)
                            .porcentaje(Math.round(porcentaje * 100.0) / 100.0)
                            .build();
                })
                .sorted((a, b) -> Long.compare(b.getTotalVotos(), a.getTotalVotos()))
                .collect(Collectors.toList());

        List<ResultadoGeo> resultadosProvincia = mesaIds.isEmpty() ? List.of()
                : votoRepository.sumVotosByProvinciaDashboard(eleccionId, mesaIds)
                .stream().map(r -> ResultadoGeo.builder()
                        .id(((Number) r[0]).longValue())
                        .nombre((String) r[1])
                        .totalVotos(((Number) r[2]).longValue())
                        .porcentaje(totalVotos > 0 ? Math.round(((Number) r[2]).longValue() * 10000.0 / totalVotos) / 100.0 : 0)
                        .build())
                .collect(Collectors.toList());

        List<ResultadoGeo> resultadosParroquia = mesaIds.isEmpty() ? List.of()
                : votoRepository.sumVotosByParroquiaDashboard(eleccionId, mesaIds)
                .stream().map(r -> ResultadoGeo.builder()
                        .id(((Number) r[0]).longValue())
                        .nombre((String) r[1])
                        .totalVotos(((Number) r[2]).longValue())
                        .porcentaje(totalVotos > 0 ? Math.round(((Number) r[2]).longValue() * 10000.0 / totalVotos) / 100.0 : 0)
                        .build())
                .collect(Collectors.toList());

        List<ResultadoLista> resultadosListas = new ArrayList<>();
        if (!mesaIds.isEmpty()) {
            List<Object[]> votosPorLista = votoRepository.sumVotosGroupByListaAndMesaIds(eleccionId, mesaIds);
            if (votosPorLista != null && !votosPorLista.isEmpty()) {
                Map<Long, Long> votosListaMap = votosPorLista.stream()
                        .collect(Collectors.toMap(r -> ((Number) r[0]).longValue(), r -> ((Number) r[1]).longValue()));
                List<ListaElectoral> listas = listaElectoralRepository.findByEleccionId(eleccionId);
                for (ListaElectoral l : listas) {
                    Long votos = votosListaMap.get(l.getId());
                    if (votos == null) continue;
                    double pct = totalVotos > 0 ? (double) votos / totalVotos * 100.0 : 0.0;
                    resultadosListas.add(ResultadoLista.builder()
                            .listaId(l.getId())
                            .listaNombre(l.getNombre())
                            .numeroLista(l.getNumeroLista())
                            .partidoNombre(l.getPartido() != null ? l.getPartido().getNombre() : null)
                            .partidoSigla(l.getPartido() != null ? l.getPartido().getSigla() : null)
                            .cargoNombre(l.getCargo() != null ? l.getCargo().getNombre() : null)
                            .totalVotos(votos)
                            .porcentaje(Math.round(pct * 100.0) / 100.0)
                            .build());
                }
                resultadosListas.sort((a, b) -> Long.compare(b.getTotalVotos(), a.getTotalVotos()));
            }
        }

        return DashboardResponse.builder()
                .eleccionId(eleccion.getId())
                .eleccionNombre(eleccion.getNombre())
                .totalVotos(totalVotos)
                .totalVotosNulos(totalVotosNulos)
                .totalVotosBlanco(totalVotosBlanco)
                .totalMesas((long) mesas.size())
                .mesasCerradas(mesasCerradas)
                .mesasAbiertas((long) mesas.size() - mesasCerradas)
                .porcentajeMesasCerradas(
                        mesas.isEmpty() ? 0.0 : Math.round((mesasCerradas * 100.0 / mesas.size()) * 100.0) / 100.0)
                .resultados(resultados)
                .resultadosProvincia(resultadosProvincia)
                .resultadosParroquia(resultadosParroquia)
                .resultadosListas(resultadosListas)
                .build();
    }

    private VotoResponse mapToResponse(Voto voto) {
        return VotoResponse.builder()
                .id(voto.getId())
                .candidatoId(voto.getCandidato().getId())
                .candidatoNombre(voto.getCandidato().getNombre())
                .candidatoApellido(voto.getCandidato().getApellido())
                .partidoNombre(voto.getCandidato().getPartido() != null ? 
                    voto.getCandidato().getPartido().getNombre() : "Independiente")
                .mesaId(voto.getMesa().getId())
                .mesaNumero(voto.getMesa().getNumero())
                .cantidadVotos(voto.getCantidadVotos())
                .eleccionesId(voto.getElecciones().getId())
                .listaId(voto.getListaId())
                .build();
    }

    private Map<String, Object> mapToJson(Voto voto) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", voto.getId());
        map.put("candidatoId", voto.getCandidato().getId());
        map.put("mesaId", voto.getMesa().getId());
        map.put("cantidadVotos", voto.getCantidadVotos());
        map.put("listaId", voto.getListaId());
        return map;
    }

    private Map<String, Object> mapToJsonList(List<Voto> votos) {
        Map<String, Object> map = new HashMap<>();
        map.put("tipo", "votos");
        map.put("total", votos.size());
        map.put("cantidadTotal", votos.stream().mapToInt(Voto::getCantidadVotos).sum());
        map.put("listaId", votos.get(0).getListaId());
        return map;
    }
}