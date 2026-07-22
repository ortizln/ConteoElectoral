package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.repositories.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
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
    private final ObjectMapper objectMapper;

    @Transactional
    public SyncPushResponse processPush(SyncPushRequest request, Long usuarioId) {
        List<SyncResultDTO> results = new ArrayList<>();
        for (SyncOperationDTO op : request.getOperations()) {
            try {
                SyncResultDTO result = processOperation(op, usuarioId);
                results.add(result);
            } catch (Exception e) {
                log.error("Error processing sync operation {}: {}", op.getOperationId(), e.getMessage());
                results.add(SyncResultDTO.builder()
                        .operationId(op.getOperationId())
                        .success(false)
                        .error(e.getMessage())
                        .build());
            }
        }
        return SyncPushResponse.builder().results(results).build();
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
                Long candidatoId = Long.valueOf(data.get("candidatoId").toString());
                Long mesaId = Long.valueOf(data.get("mesaId").toString());
                Integer cantidad = data.containsKey("cantidadVotos")
                        ? Integer.valueOf(data.get("cantidadVotos").toString()) : 1;
                Long rawEleccionId = data.containsKey("eleccionesId")
                        ? Long.valueOf(data.get("eleccionesId").toString())
                        : (data.containsKey("eleccionId") ? Long.valueOf(data.get("eleccionId").toString()) : null);
                final Long eleccionId = resolveEleccionId(rawEleccionId, candidatoId);

                Optional<Voto> existing = votoRepository.findByMesaIdAndCandidatoId(mesaId, candidatoId);
                Voto voto;
                if (existing.isPresent()) {
                    voto = existing.get();
                    voto.setCantidadVotos(voto.getCantidadVotos() + cantidad);
                } else {
                    Candidato candidato = candidatoRepository.findById(candidatoId)
                            .orElseThrow(() -> new IllegalArgumentException("Candidato not found: " + candidatoId));
                    Mesa mesa = mesaRepository.findById(mesaId)
                            .orElseThrow(() -> new IllegalArgumentException("Mesa not found: " + mesaId));
                    Eleccion eleccion = eleccionRepository.findById(eleccionId)
                            .orElseThrow(() -> new IllegalArgumentException("Eleccion not found: " + eleccionId));
                    voto = Voto.builder()
                            .candidato(candidato).mesa(mesa).elecciones(eleccion)
                            .cantidadVotos(cantidad)
                            .createdBy(Usuario.builder().id(usuarioId).build())
                            .build();
                }
                voto = votoRepository.save(voto);
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(true)
                        .serverId(voto.getId()).build();
            }
            case "UPDATE": {
                Long votoId = op.getEntityId();
                Voto voto = votoRepository.findById(votoId)
                        .orElseThrow(() -> new IllegalArgumentException("Voto not found: " + votoId));
                if (data.containsKey("cantidadVotos")) {
                    voto.setCantidadVotos(Integer.valueOf(data.get("cantidadVotos").toString()));
                }
                votoRepository.save(voto);
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(true)
                        .serverId(votoId).build();
            }
            case "DELETE": {
                Long votoId = op.getEntityId();
                votoRepository.deleteById(votoId);
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(true)
                        .serverId(votoId).build();
            }
            default:
                return SyncResultDTO.builder()
                        .operationId(op.getOperationId()).success(false)
                        .error("Unknown action: " + op.getAction()).build();
        }
    }

    private SyncResultDTO processMesaOperation(SyncOperationDTO op, Long usuarioId) {
        Map<String, Object> data = op.getData();
        switch (op.getAction()) {
            case "CERRAR": {
                Long mesaId = op.getEntityId();
                Mesa mesa = mesaRepository.findById(mesaId)
                        .orElseThrow(() -> new IllegalArgumentException("Mesa not found: " + mesaId));
                mesa.setCerrada(true);
                mesaRepository.save(mesa);
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

        LocalDateTime since = sinceTimestamp != null ? LocalDateTime.parse(sinceTimestamp) : LocalDateTime.now().minusDays(1);

        List<Voto> votos = votoRepository.findByEleccionesId(eleccionId);
        for (Voto v : votos) {
            if (v.getCreatedAt() != null && v.getCreatedAt().isAfter(since)) {
                Map<String, Object> data = new HashMap<>();
                data.put("id", v.getId());
                data.put("candidatoId", v.getCandidato().getId());
                data.put("mesaId", v.getMesa().getId());
                data.put("cantidadVotos", v.getCantidadVotos());
                data.put("eleccionesId", v.getElecciones().getId());

                operations.add(SyncOperationDTO.builder()
                        .operationId("srv-" + v.getId())
                        .entity("voto").action("CREATE")
                        .entityId(v.getId()).data(data)
                        .timestamp(v.getCreatedAt().toString())
                        .build());
            }
        }

        return SyncPullResponse.builder()
                .operations(operations)
                .serverTimestamp(LocalDateTime.now().toString())
                .build();
    }
}
