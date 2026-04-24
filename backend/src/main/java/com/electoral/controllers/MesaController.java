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
@RequestMapping("/api/mesas")
@RequiredArgsConstructor
public class MesaController {
    private final MesaService mesaService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<MesaResponse>> getMesasByEleccion(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(mesaService.getMesasByEleccion(eleccionesId));
    }

    @GetMapping("/recinto/{recintoId}")
    public ResponseEntity<List<MesaResponse>> getMesasByRecinto(@PathVariable Long recintoId) {
        return ResponseEntity.ok(mesaService.getMesasByRecinto(recintoId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MesaResponse> getMesaById(@PathVariable Long id) {
        return ResponseEntity.ok(mesaService.getMesaById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<MesaResponse> createMesa(@Valid @RequestBody MesaRequest request) {
        return ResponseEntity.ok(mesaService.createMesa(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<MesaResponse> updateMesa(@PathVariable Long id, @Valid @RequestBody MesaRequest request) {
        return ResponseEntity.ok(mesaService.updateMesa(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMesa(@PathVariable Long id) {
        mesaService.deleteMesa(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/cerrar")
    @PreAuthorize("hasRole('MIEMBRO_MESA') or hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<MesaResponse> cerrarMesa(@PathVariable Long id) {
        return ResponseEntity.ok(mesaService.cerrarMesa(id));
    }

    @PostMapping("/{mesaId}/asignar-usuario/{usuarioId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<Void> asignarUsuario(@PathVariable Long mesaId, @PathVariable Long usuarioId) {
        mesaService.asignarUsuario(mesaId, usuarioId);
        return ResponseEntity.ok().build();
    }
}