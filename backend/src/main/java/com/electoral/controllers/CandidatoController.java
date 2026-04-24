package com.electoral.controllers;

import com.electoral.dto.*;
import com.electoral.services.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidatos")
@RequiredArgsConstructor
public class CandidatoController {
    private final CandidatoService candidatoService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<CandidatoResponse>> getCandidatosByEleccion(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(candidatoService.getCandidatosByEleccion(eleccionesId));
    }

    @GetMapping("/eleccion/{eleccionesId}/por-cargo")
    public ResponseEntity<List<CandidatoResponse>> getCandidatosOrderByCargo(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(candidatoService.getCandidatosOrderByCargo(eleccionesId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidatoResponse> getCandidatoById(@PathVariable Long id) {
        return ResponseEntity.ok(candidatoService.getCandidatoById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<CandidatoResponse> createCandidato(@Valid @RequestBody CandidatoRequest request) {
        return ResponseEntity.ok(candidatoService.createCandidato(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<CandidatoResponse> updateCandidato(@PathVariable Long id, @Valid @RequestBody CandidatoRequest request) {
        return ResponseEntity.ok(candidatoService.updateCandidato(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCandidato(@PathVariable Long id) {
        candidatoService.deleteCandidato(id);
        return ResponseEntity.noContent().build();
    }
}