package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.repositories.*;
import com.electoral.exception.MesaCerradaException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class SyncService {

    private final VotoRepository votoRepository;
    private final MesaRepository mesaRepository;
    private final CandidatoRepository candidatoRepository;
    private final EleccionRepository eleccionRepository;
    private final MesaService mesaService;
    private final AuditoriaService auditoriaService;
    private final SyncOperationLogRepository syncOperationLogRepository;
    private final ObjectMapper objectMapper;

    /**
     * Procesa un batch de operaciones de sync con idempotencia.
     * Cada operación se procesa en su propia transacción (REQUIRED) para no perder
     * operaciones válidas si una falla. En producción (sin transacción externa),
     * cada operación committea independientemente.
     */
    public SyncPushResponse processPush(SyncPushRequest request, Long usuarioId) {
        List<SyncResultDTO> results = new ArrayList<>();
        for (SyncOperationDTO op : request.getOperations()) {
            SyncResultDTO result;
            try {
                result = processOperationWithIdempotency(op, usuarioId);
            } catch (Exception e) {
                log.error("Error processing sync operation {}: {}", op.getOperationId(), e.getMessage(), e);
                result = SyncResultDTO.builder()
                        .operationId(op.getOperationId())
                        .success(false)
                        .error(e.getMessage())
                        .build();
            }
            results.add(result);
        }
        return SyncPushResponse.builder().results(results).build();
    }

    /**
     * Procesa una operación con verificación de idempotencia por operationId.
     * Si el operationId ya fue procesado, retorna el resultado previo sin re-ejecutar.
     * Usa REQUIRED para heredar la transacción del test (o crear una nueva en producción).
     */
    @Transactional(propagation = Propagation.REQUIRED)
    protected SyncResultDTO processOperationWithIdempotency(SyncOperationDTO op, Long usuarioId) {
        // Verificar idempotencia
        if (op.getOperationId() != null && !op.getOperationId().isEmpty()) {
            Optional<SyncOperationLog> existing = syncOperationLogRepository.findByOperationId(op.getOperationId());
            if (existing.isPresent()) {
                SyncOperationLog logEntry = existing.get();
                log.debug("Duplicate operationId {} detected, returning cached result", op.getOperationId());
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId())
                        .success(logEntry.getResultSuccess())
                        .serverId(logEntry.getServerEntityId())
                        .error(logEntry.getResultError())
                        .build();
            }
        }

        // Procesar la operación
        SyncResultDTO result = processOperation(op, usuarioId);

        // Registrar en log de idempotencia
        if (op.getOperationId() != null && !op.getOperationId().isEmpty()) {
            syncOperationLogRepository.save(SyncOperationLog.builder()
                    .operationId(op.getOperationId())
                    .usuarioId(usuarioId)
                    .entityType(op.getEntity())
                    .entityId(op.getEntityId())
                    .action(op.getAction())
                    .resultSuccess(result.isSuccess())
                    .resultError(result.getError())
                    .serverEntityId(result.getServerId())
                    .build());
        }

        return result;
    }

    private SyncResultDTO processOperation(SyncOperationDTO op, Long usuarioId) {
        switch (op.getEntity()) {
            case "voto":
                return processVotoOperation(op, usuarioId);
            case "mesa":
                return processMesaOperation(op, usuarioId);
            default:
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId())
                        .success(false)
                        .error("Unknown entity: " + op.getEntity())
                        .build();
        }
    }

    @SuppressWarnings("unchecked")
    private SyncResultDTO processVotoOperation(SyncOperationDTO op, Long usuarioId) {
        Map<String, Object> data = op.getData();
        switch (op.getAction()) {
            case "CREATE": {
                Long mesaId = Long.valueOf(data.get("mesaId").toString());

                // Guard: mesa cerrada
                Mesa mesa = mesaRepository.findById(mesaId)
                        .orElseThrow(() -> new IllegalArgumentException("Mesa not found: " + mesaId));
                if (Boolean.TRUE.equals(mesa.getCerrada())) {
                    throw new MesaCerradaException("No se puede registrar votos en mesa cerrada: " + mesaId);
                }

                // Guard: usuario asignado a la mesa
                if (!mesaService.usuarioPerteneceAMesa(usuarioId, mesaId)) {
                    return SyncResultDTO.builder()
                            .operationId(op.getOperationId()).success(false)
                            .error("Usuario no asignado a la mesa " + mesaId)
                            .build();
                }

                Integer cantidad = data.containsKey("cantidadVotos")
                        ? Integer.valueOf(data.get("cantidadVotos").toString()) : 1;
                Long rawEleccionId = data.containsKey("eleccionesId")
                        ? Long.valueOf(data.get("eleccionesId").toString())
                        : (data.containsKey("eleccionId") ? Long.valueOf(data.get("eleccionId").toString()) : null);
                Long listaId = data.containsKey("listaId") && data.get("listaId") != null
                        ? Long.valueOf(data.get("listaId").toString()) : null;
                Long candidatoId = data.containsKey("candidatoId") && data.get("candidatoId") != null
                        ? Long.valueOf(data.get("candidatoId").toString()) : null;

                if (listaId != null && candidatoId == null) {
                    Optional<Voto> existing = votoRepository.findByMesaIdAndListaId(mesaId, listaId);
                    Voto voto;
                    if (existing.isPresent()) {
                        voto = existing.get();
                        voto.setCantidadVotos(cantidad);
                    } else {
                        Eleccion eleccion = rawEleccionId != null
                                ? eleccionRepository.findById(rawEleccionId)
                                        .orElseThrow(() -> new IllegalArgumentException("Eleccion not found: " + rawEleccionId))
                                : null;
                        voto = Voto.builder()
                                .mesa(mesa).elecciones(eleccion)
                                .listaId(listaId)
                                .cantidadVotos(cantidad)
                                .createdBy(Usuario.builder().id(usuarioId).build())
                                .build();
                    }
                    voto = votoRepository.save(voto);
                    auditoriaService.registrarAccion(usuarioId, Auditoria.TipoAccion.CREATE,
                            "voto_sync", voto.getId(), null,
                            Map.of("mesaId", mesaId, "listaId", listaId, "cantidad", cantidad));
                    return SyncResultDTO.builder()
                            .operationId(op.getOperationId()).success(true)
                            .serverId(voto.getId()).build();
                }

                if (candidatoId == null) {
                    return SyncResultDTO.builder()
                            .operationId(op.getOperationId()).success(false)
                            .error("Debe proporcionar candidatoId o listaId")
                            .build();
                }

                final Long eleccionId = resolveEleccionId(rawEleccionId, candidatoId);
                Optional<Voto> existing = votoRepository.findByMesaIdAndCandidatoId(mesaId, candidatoId);
                Voto voto;
                if (existing.isPresent()) {
                    voto = existing.get();
                    voto.setCantidadVotos(cantidad);
                } else {
                    Candidato candidato = candidatoRepository.findById(candidatoId)
                            .orElseThrow(() -> new IllegalArgumentException("Candidato not found: " + candidatoId));
                    Eleccion eleccion = eleccionRepository.findById(eleccionId)
                            .orElseThrow(() -> new IllegalArgumentException("Eleccion not found: " + eleccionId));
                    voto = Voto.builder()
                            .candidato(candidato).mesa(mesa).elecciones(eleccion)
                            .cantidadVotos(cantidad)
                            .createdBy(Usuario.builder().id(usuarioId).build())
                            .build();
                }
                if (listaId != null) {
                    voto.setListaId(listaId);
                }
                voto = votoRepository.save(voto);
                auditoriaService.registrarAccion(usuarioId, Auditoria.TipoAccion.CREATE,
                        "voto_sync", voto.getId(), null,
                        Map.of("mesaId", mesaId, "candidatoId", candidatoId, "cantidad", cantidad));
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(true)
                        .serverId(voto.getId()).build();
            }
            case "UPDATE": {
                Long votoId = op.getEntityId();
                Voto voto = votoRepository.findById(votoId)
                        .orElseThrow(() -> new IllegalArgumentException("Voto not found: " + votoId));

                // Guard: mesa cerrada
                if (Boolean.TRUE.equals(voto.getMesa().getCerrada())) {
                    throw new MesaCerradaException("No se puede modificar votos en mesa cerrada: " + voto.getMesa().getId());
                }

                // Guard: usuario asignado
                if (!mesaService.usuarioPerteneceAMesa(usuarioId, voto.getMesa().getId())) {
                    return SyncResultDTO.builder()
                            .operationId(op.getOperationId()).success(false)
                            .error("Usuario no asignado a la mesa " + voto.getMesa().getId())
                            .build();
                }

                Map<String, Object> prevData = Map.of("cantidadVotos", voto.getCantidadVotos());
                if (data.containsKey("cantidadVotos")) {
                    voto.setCantidadVotos(Integer.valueOf(data.get("cantidadVotos").toString()));
                }
                if (data.containsKey("listaId") && data.get("listaId") != null) {
                    voto.setListaId(Long.valueOf(data.get("listaId").toString()));
                }
                votoRepository.save(voto);
                auditoriaService.registrarAccion(usuarioId, Auditoria.TipoAccion.UPDATE,
                        "voto_sync", votoId, prevData,
                        Map.of("cantidadVotos", voto.getCantidadVotos()));
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(true)
                        .serverId(votoId).build();
            }
            case "DELETE": {
                Long votoId = op.getEntityId();
                Voto voto = votoRepository.findById(votoId).orElse(null);
                if (voto == null) {
                    return SyncResultDTO.builder()
                            .operationId(op.getOperationId()).success(true)
                            .serverId(votoId).build();
                }

                // Guard: mesa cerrada
                if (Boolean.TRUE.equals(voto.getMesa().getCerrada())) {
                    throw new MesaCerradaException("No se puede eliminar votos en mesa cerrada: " + voto.getMesa().getId());
                }

                // Guard: usuario asignado
                if (!mesaService.usuarioPerteneceAMesa(usuarioId, voto.getMesa().getId())) {
                    return SyncResultDTO.builder()
                            .operationId(op.getOperationId()).success(false)
                            .error("Usuario no asignado a la mesa " + voto.getMesa().getId())
                            .build();
                }

                votoRepository.deleteById(votoId);
                auditoriaService.registrarAccion(usuarioId, Auditoria.TipoAccion.DELETE,
                        "voto_sync", votoId,
                        Map.of("mesaId", voto.getMesa().getId(), "cantidad", voto.getCantidadVotos()),
                        null);
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(true)
                        .serverId(votoId).build();
            }
            default:
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId())
                        .success(false)
                        .error("Unknown action: " + op.getAction()).build();
        }
    }

    private SyncResultDTO processMesaOperation(SyncOperationDTO op, Long usuarioId) {
        Map<String, Object> data = op.getData();
        Long mesaId = op.getEntityId();
        Mesa mesa = mesaRepository.findById(mesaId)
                .orElseThrow(() -> new IllegalArgumentException("Mesa not found: " + mesaId));

        // Guard: usuario asignado a la mesa para operaciones de mesa
        if (!mesaService.usuarioPerteneceAMesa(usuarioId, mesaId)) {
            return SyncResultDTO.builder()
                    .operationId(op.getOperationId()).success(false)
                    .error("Usuario no asignado a la mesa " + mesaId)
                    .build();
        }

        switch (op.getAction()) {
            case "CERRAR": {
                if (Boolean.TRUE.equals(mesa.getCerrada())) {
                    return SyncResultDTO.builder()
                            .operationId(op.getOperationId()).success(true)
                            .serverId(mesaId).build();
                }
                mesa.setCerrada(true);
                mesaRepository.save(mesa);
                auditoriaService.registrarAccion(usuarioId, Auditoria.TipoAccion.UPDATE,
                        "mesa_sync", mesaId,
                        Map.of("cerrada", false), Map.of("cerrada", true));
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(true)
                        .serverId(mesaId).build();
            }
            case "NULOS": {
                Integer votosNulos = data.containsKey("votosNulos")
                        ? Integer.valueOf(data.get("votosNulos").toString()) : 0;
                Integer prevNulos = mesa.getVotosNulos();
                mesa.setVotosNulos(votosNulos);
                mesaRepository.save(mesa);
                mesaService.sincronizarDesgloseNulosBlancos(mesaId, "NULOS", votosNulos);
                auditoriaService.registrarAccion(usuarioId, Auditoria.TipoAccion.UPDATE,
                        "mesa_sync", mesaId,
                        Map.of("votosNulos", prevNulos != null ? prevNulos : 0),
                        Map.of("votosNulos", votosNulos));
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(true)
                        .serverId(mesaId).build();
            }
            case "BLANCO": {
                Integer votosBlanco = data.containsKey("votosBlanco")
                        ? Integer.valueOf(data.get("votosBlanco").toString()) : 0;
                Integer prevBlanco = mesa.getVotosBlanco();
                mesa.setVotosBlanco(votosBlanco);
                mesaRepository.save(mesa);
                mesaService.sincronizarDesgloseNulosBlancos(mesaId, "BLANCO", votosBlanco);
                auditoriaService.registrarAccion(usuarioId, Auditoria.TipoAccion.UPDATE,
                        "mesa_sync", mesaId,
                        Map.of("votosBlanco", prevBlanco != null ? prevBlanco : 0),
                        Map.of("votosBlanco", votosBlanco));
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(true)
                        .serverId(mesaId).build();
            }
            default:
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(false)
                        .error("Unknown mesa action: " + op.getAction()).build();
        }
    }

    private Long resolveEleccionId(Long rawEleccionId, Long candidatoId) {
        if (rawEleccionId != null) return rawEleccionId;
        return candidatoRepository.findById(candidatoId)
                .map(c -> c.getElecciones() != null ? c.getElecciones().getId() : null)
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public SyncPullResponse pullChanges(Long eleccionId, String sinceTimestamp) {
        List<SyncOperationDTO> operations = new ArrayList<>();

        LocalDateTime since = LocalDateTime.now().minusDays(1);
        if (sinceTimestamp != null) {
            try {
                since = LocalDateTime.parse(sinceTimestamp.replace("Z", "").replaceAll("\\.[0-9]+$", ""));
            } catch (Exception e) {
                log.warn("Failed to parse since timestamp: {}", sinceTimestamp);
            }
        }

        List<Voto> votos = votoRepository.findByEleccionesId(eleccionId);
        for (Voto v : votos) {
            if (v.getCreatedAt() != null && v.getCreatedAt().isAfter(since)) {
                Map<String, Object> data = new HashMap<>();
                data.put("id", v.getId());
                data.put("candidatoId", v.getCandidato() != null ? v.getCandidato().getId() : null);
                data.put("mesaId", v.getMesa().getId());
                data.put("cantidadVotos", v.getCantidadVotos());
                data.put("eleccionesId", v.getElecciones() != null ? v.getElecciones().getId() : null);
                if (v.getListaId() != null) {
                    data.put("listaId", v.getListaId());
                }
                if (v.getCreatedAt() != null) {
                    data.put("fechaRegistro", v.getCreatedAt().toString());
                }

                operations.add(SyncOperationDTO.builder()
                        .operationId("srv-" + v.getId())
                        .entity("voto").action("CREATE")
                        .entityId(v.getId()).data(data)
                        .timestamp(v.getCreatedAt().toString())
                        .build());
            }
        }

        List<Mesa> mesas = mesaRepository.findByEleccionesId(eleccionId);
        for (Mesa m : mesas) {
            // Solo incluir mesas con estado no-default o si es el primer pull (since muy antiguo)
            boolean isFirstPull = since.isBefore(LocalDateTime.now().minusDays(7));
            boolean hasState = Boolean.TRUE.equals(m.getCerrada())
                    || (m.getVotosNulos() != null && m.getVotosNulos() > 0)
                    || (m.getVotosBlanco() != null && m.getVotosBlanco() > 0);
            if (!isFirstPull && !hasState) continue;

            Map<String, Object> data = new HashMap<>();
            data.put("id", m.getId());
            data.put("votosNulos", m.getVotosNulos());
            data.put("votosBlanco", m.getVotosBlanco());
            data.put("cerrada", m.getCerrada());
            data.put("eleccionesId", m.getElecciones() != null ? m.getElecciones().getId() : null);

            operations.add(SyncOperationDTO.builder()
                    .operationId("mesa-" + m.getId())
                    .entity("mesa").action("MESA_DATA")
                    .entityId(m.getId()).data(data)
                    .timestamp(LocalDateTime.now().toString())
                    .build());
        }

        return SyncPullResponse.builder()
                .operations(operations)
                .serverTimestamp(LocalDateTime.now().toString())
                .build();
    }
}
