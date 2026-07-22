package com.electoral.controllers;

import com.electoral.dto.DatoGeograficoDTO;
import com.electoral.dto.GeoResumenDTO;
import com.electoral.services.DashboardGeograficoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard/geografico")
@RequiredArgsConstructor
public class DashboardGeograficoController {

    private final DashboardGeograficoService service;

    @GetMapping("/{eleccionId}/provincias")
    public ResponseEntity<GeoResumenDTO> getProvincias(
            @PathVariable Long eleccionId,
            @RequestParam(required = false) Long candidatoId) {
        return ResponseEntity.ok(service.getResumenProvincias(eleccionId, candidatoId));
    }

    @GetMapping("/{eleccionId}/provincias/{provinciaId}/cantones")
    public ResponseEntity<List<DatoGeograficoDTO>> getCantones(
            @PathVariable Long eleccionId,
            @PathVariable Long provinciaId,
            @RequestParam(required = false) Long candidatoId) {
        return ResponseEntity.ok(service.getCantonesByProvincia(eleccionId, provinciaId, candidatoId));
    }

    @GetMapping("/{eleccionId}/cantones/{cantonId}/parroquias")
    public ResponseEntity<List<DatoGeograficoDTO>> getParroquias(
            @PathVariable Long eleccionId,
            @PathVariable Long cantonId,
            @RequestParam(required = false) Long candidatoId) {
        return ResponseEntity.ok(service.getParroquiasByCanton(eleccionId, cantonId, candidatoId));
    }
}
