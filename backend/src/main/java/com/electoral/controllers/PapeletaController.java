package com.electoral.controllers;

import com.electoral.dto.*;
import com.electoral.services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/papeletas")
@RequiredArgsConstructor
public class PapeletaController {

    private final PapeletaService papeletaService;

    @GetMapping("/eleccion/{eleccionId}")
    public ResponseEntity<List<PapeletaResponse>> getPapeletasByEleccion(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(papeletaService.getPapeletasByEleccion(eleccionId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PapeletaResponse> getPapeletaById(@PathVariable Long id) {
        return ResponseEntity.ok(papeletaService.getPapeletaById(id));
    }

    @PostMapping("/generar/{eleccionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PapeletaResponse>> generarPapeletas(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(papeletaService.generarPapeletas(eleccionId));
    }

    @PostMapping("/regenerar/{eleccionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PapeletaResponse>> regenerarPapeletas(@PathVariable Long eleccionId) {
        papeletaService.regenerarPapeletas(eleccionId);
        return ResponseEntity.ok(papeletaService.getPapeletasByEleccion(eleccionId));
    }
}
