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
@RequestMapping("/api/partidos")
@RequiredArgsConstructor
public class PartidoController {
    private final PartidoService partidoService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<PartidoResponse>> getPartidosByEleccion(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(partidoService.getPartidosByEleccion(eleccionesId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartidoResponse> getPartidoById(@PathVariable Long id) {
        return ResponseEntity.ok(partidoService.getPartidoById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<PartidoResponse> createPartido(@Valid @RequestBody PartidoRequest request) {
        return ResponseEntity.ok(partidoService.createPartido(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<PartidoResponse> updatePartido(@PathVariable Long id, @Valid @RequestBody PartidoRequest request) {
        return ResponseEntity.ok(partidoService.updatePartido(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePartido(@PathVariable Long id) {
        partidoService.deletePartido(id);
        return ResponseEntity.noContent().build();
    }
}