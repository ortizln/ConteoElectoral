package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.*;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public VotoResponse registrarVoto(VotoRequest request, Long usuarioId) {
        Mesa mesa = mesaService.getMesaEntityById(request.getMesaId());

        if (mesa.getCerrada()) {
            throw new MesaCerradaException("No se puede registrar votos en una mesa cerrada");
        }

        if (!mesaService.usuarioPerteneceAMesa(usuarioId, mesa.getId())) {
            throw new AccesoDenegadoException("No tiene permisos para registrar votos en esta mesa");
        }

        Candidato candidato = candidatoRepository.findById(request.getCandidatoId())
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Candidato no encontrado con ID: " + request.getCandidatoId()));

        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionesId());

        Usuario usuario = Usuario.builder().id(usuarioId).build();

        Voto voto = votoRepository.findByMesaIdAndCandidatoId(mesa.getId(), candidato.getId())
                .map(existingVoto -> {
                    existingVoto.setCantidadVotos(existingVoto.getCantidadVotos() + request.getCantidadVotos());
                    return existingVoto;
                })
                .orElseGet(() -> Voto.builder()
                        .candidato(candidato)
                        .mesa(mesa)
                        .elecciones(eleccion)
                        .cantidadVotos(request.getCantidadVotos())
                        .createdBy(usuario)
                        .build());

        Voto savedVoto = votoRepository.save(voto);

        auditoriaService.registrarAccion(
                usuarioId,
                Auditoria.TipoAccion.CREATE,
                "votos",
                savedVoto.getId(),
                null,
                mapToJson(savedVoto));

        notifyDashboardUpdate(eleccion.getId());

        return mapToResponse(savedVoto);
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

    private void notifyDashboardUpdate(Long eleccionId) {
        try {
            DashboardResponse dashboard = getDashboardData(eleccionId);
            messagingTemplate.convertAndSend("/topic/resultados/" + eleccionId, dashboard);
        } catch (Exception e) {
        }
    }

    @Transactional(readOnly = true)
    public DashboardResponse getDashboardData(Long eleccionId) {
        return getDashboardDataConFiltros(eleccionId, null, null, null, null, null, null, null, null);
    }

    @Transactional(readOnly = true)
    public DashboardResponse getDashboardDataConFiltros(Long eleccionId, Long cargoId, Long partidoId, Long recintoId,
            Long zonaId, Long provinciaId, Long cantonId, Long parroquiaId, Long institucionId) {
        Eleccion eleccion = eleccionService.getEleccionEntityById(eleccionId);

        List<Mesa> mesas = mesaRepository.findByEleccionesId(eleccionId);

        if (zonaId != null || provinciaId != null || cantonId != null || parroquiaId != null || institucionId != null) {
            mesas = mesas.stream().filter(m -> {
                Recinto recinto = m.getRecinto();
                if (institucionId != null) {
                    return recinto.getInstitucion() != null &&
                            recinto.getInstitucion().getId().equals(institucionId);
                }
                if (parroquiaId != null) {
                    return recinto.getInstitucion() != null &&
                            recinto.getInstitucion().getParroquia() != null &&
                            recinto.getInstitucion().getParroquia().getId().equals(parroquiaId);
                }
                if (cantonId != null) {
                    return recinto.getInstitucion() != null &&
                            recinto.getInstitucion().getParroquia() != null &&
                            recinto.getInstitucion().getParroquia().getCanton() != null &&
                            recinto.getInstitucion().getParroquia().getCanton().getId().equals(cantonId);
                }
                if (provinciaId != null) {
                    return recinto.getInstitucion() != null &&
                            recinto.getInstitucion().getParroquia() != null &&
                            recinto.getInstitucion().getParroquia().getCanton() != null &&
                            recinto.getInstitucion().getParroquia().getCanton().getProvincia() != null &&
                            recinto.getInstitucion().getParroquia().getCanton().getProvincia().getId()
                                    .equals(provinciaId);
                }
                if (zonaId != null) {
                    return recinto.getInstitucion() != null &&
                            recinto.getInstitucion().getParroquia() != null &&
                            recinto.getInstitucion().getParroquia().getCanton() != null &&
                            recinto.getInstitucion().getParroquia().getCanton().getProvincia() != null &&
                            recinto.getInstitucion().getParroquia().getCanton().getProvincia().getZona() != null &&
                            recinto.getInstitucion().getParroquia().getCanton().getProvincia().getZona().getId()
                                    .equals(zonaId);
                }
                return true;
            }).collect(Collectors.toList());
        }

        if (recintoId != null) {
            mesas = mesas.stream().filter(m -> m.getRecinto().getId().equals(recintoId)).collect(Collectors.toList());
        }

        List<Long> mesaIds = mesas.stream().map(Mesa::getId).collect(Collectors.toList());

        Long totalVotos = votoRepository.sumVotosByEleccionAndMesaIds(eleccionId, mesaIds);
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

        return DashboardResponse.builder()
                .eleccionId(eleccion.getId())
                .eleccionNombre(eleccion.getNombre())
                .totalVotos(totalVotos)
                .totalMesas((long) mesas.size())
                .mesasCerradas(mesasCerradas)
                .mesasAbiertas((long) mesas.size() - mesasCerradas)
                .porcentajeMesasCerradas(
                        mesas.isEmpty() ? 0.0 : Math.round((mesasCerradas * 100.0 / mesas.size()) * 100.0) / 100.0)
                .resultados(resultados)
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
                .build();
    }

    private Map<String, Object> mapToJson(Voto voto) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", voto.getId());
        map.put("candidatoId", voto.getCandidato().getId());
        map.put("mesaId", voto.getMesa().getId());
        map.put("cantidadVotos", voto.getCantidadVotos());
        return map;
    }
}