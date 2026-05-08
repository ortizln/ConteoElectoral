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
@RequestMapping("/api/recintos")
@RequiredArgsConstructor
public class RecintoController {
    private final RecintoService recintoService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<RecintoResponse>> getRecintosByEleccion(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(recintoService.getRecintosByEleccion(eleccionesId));
    }

    @GetMapping("/institucion/{institucionId}")
    public ResponseEntity<List<RecintoResponse>> getRecintosByInstitucion(@PathVariable Long institucionId) {
        return ResponseEntity.ok(recintoService.getRecintosByInstitucion(institucionId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecintoResponse> getRecintoById(@PathVariable Long id) {
        return ResponseEntity.ok(recintoService.getRecintoById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<RecintoResponse> createRecinto(@Valid @RequestBody RecintoRequest request) {
        return ResponseEntity.ok(recintoService.createRecinto(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<RecintoResponse> updateRecinto(@PathVariable Long id, @Valid @RequestBody RecintoRequest request) {
        return ResponseEntity.ok(recintoService.updateRecinto(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteRecinto(@PathVariable Long id) {
        recintoService.deleteRecinto(id);
        return ResponseEntity.noContent().build();
    }
}