package com.electoral.controllers;

import com.electoral.dto.DashboardResponse;
import com.electoral.dto.VotoResponse;
import com.electoral.services.VotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final VotoService votoService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<DashboardResponse> getDashboard(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(votoService.getDashboardData(eleccionesId));
    }

    @GetMapping("/eleccion/{eleccionesId}/filtrar")
    public ResponseEntity<DashboardResponse> getDashboardConFiltros(
            @PathVariable Long eleccionesId,
            @RequestParam(required = false) Long cargoId,
            @RequestParam(required = false) Long partidoId,
            @RequestParam(required = false) Long recintoId) {
        return ResponseEntity.ok(votoService.getDashboardDataConFiltros(eleccionesId, cargoId, partidoId, recintoId));
    }

    @GetMapping("/eleccion/{eleccionesId}/resultados")
    public ResponseEntity<List<VotoResponse>> getResultados(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(votoService.getVotosByEleccion(eleccionesId));
    }
}

@RestController
@RequiredArgsConstructor
class WebSocketController {
    private final VotoService votoService;

    @MessageMapping("/actualizar-resultados/{eleccionId}")
    @SendTo("/topic/resultados/{eleccionId}")
    public DashboardResponse actualizarResultados(@PathVariable Long eleccionId) {
        return votoService.getDashboardData(eleccionId);
    }
}