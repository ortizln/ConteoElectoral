package com.electoral.controllers;

import com.electoral.dto.*;
import com.electoral.entities.Eleccion;
import com.electoral.services.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/elecciones")
@RequiredArgsConstructor
public class EleccionController {
    private final EleccionService eleccionService;

    @GetMapping
    public ResponseEntity<List<EleccionResponse>> getAllElecciones() {
        return ResponseEntity.ok(eleccionService.getAllElecciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EleccionResponse> getEleccionById(@PathVariable Long id) {
        return ResponseEntity.ok(eleccionService.getEleccionById(id));
    }

    @GetMapping("/activas")
    public ResponseEntity<List<Eleccion>> getEleccionesActivas() {
        return ResponseEntity.ok(eleccionService.getEleccionesActivas());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EleccionResponse> createEleccion(@Valid @RequestBody EleccionRequest request) {
        return ResponseEntity.ok(eleccionService.createEleccion(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EleccionResponse> updateEleccion(@PathVariable Long id, @Valid @RequestBody EleccionRequest request) {
        return ResponseEntity.ok(eleccionService.updateEleccion(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEleccion(@PathVariable Long id) {
        eleccionService.deleteEleccion(id);
        return ResponseEntity.noContent().build();
    }
}