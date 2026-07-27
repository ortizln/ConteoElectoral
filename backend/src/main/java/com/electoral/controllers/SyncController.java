package com.electoral.controllers;

import com.electoral.dto.SyncPullResponse;
import com.electoral.dto.SyncPushRequest;
import com.electoral.dto.SyncPushResponse;
import com.electoral.services.SyncService;
import com.electoral.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sync")
@RequiredArgsConstructor
public class SyncController {

    private final SyncService syncService;
    private final SecurityUtil securityUtil;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/push")
    public ResponseEntity<SyncPushResponse> push(
            @RequestBody SyncPushRequest request) {
        Long usuarioId = securityUtil.getCurrentUserId();
        SyncPushResponse response = syncService.processPush(request, usuarioId);

        if (response.getResults() != null && !response.getResults().isEmpty()) {
            messagingTemplate.convertAndSend("/topic/sync", response);

            if (request.getOperations() != null) {
                for (SyncOperationDTO op : request.getOperations()) {
                    if (op.getData() != null && op.getData().containsKey("eleccionesId")) {
                        Object raw = op.getData().get("eleccionesId");
                        if (raw != null) {
                            Long eleccionId = Long.valueOf(raw.toString());
                            messagingTemplate.convertAndSend("/topic/resultados/" + eleccionId,
                                    java.util.Map.of("tipo", "data-changed"));
                            break;
                        }
                    }
                }
            }
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/pull")
    public ResponseEntity<SyncPullResponse> pull(
            @RequestParam Long eleccionId,
            @RequestParam(required = false) String since) {
        return ResponseEntity.ok(syncService.pullChanges(eleccionId, since));
    }
}
