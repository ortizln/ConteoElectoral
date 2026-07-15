package com.electoral.controllers;

import com.electoral.dto.*;
import com.electoral.security.CustomUserDetails;
import com.electoral.services.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/votos")
@RequiredArgsConstructor
public class VotoController {
    private final VotoService votoService;

    @GetMapping("/mesa/{mesaId}")
    public ResponseEntity<List<VotoResponse>> getVotosByMesa(@PathVariable Long mesaId) {
        return ResponseEntity.ok(votoService.getVotosByMesa(mesaId));
    }

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<VotoResponse>> getVotosByEleccion(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(votoService.getVotosByEleccion(eleccionesId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VotoResponse> getVotoById(@PathVariable Long id) {
        return ResponseEntity.ok(votoService.getVotoById(id));
    }

    @GetMapping("/candidato/{candidatoId}/detalle")
    public ResponseEntity<CandidatoDetalleResponse> getDetalleCandidato(
            @PathVariable Long candidatoId,
            @RequestParam Long eleccionId) {
        return ResponseEntity.ok(votoService.getDetalleCandidato(candidatoId, eleccionId));
    }

    @PostMapping
    @PreAuthorize("hasRole('MIEMBRO_MESA') or hasRole('ADMIN')")
    public ResponseEntity<VotoResponse> registrarVoto(@Valid @RequestBody VotoRequest request) {
        Long usuarioId = getCurrentUserId();
        return ResponseEntity.ok(votoService.registrarVoto(request, usuarioId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('MIEMBRO_MESA') or hasRole('ADMIN')")
    public ResponseEntity<VotoResponse> actualizarVoto(@PathVariable Long id, @Valid @RequestBody VotoRequest request) {
        Long usuarioId = getCurrentUserId();
        return ResponseEntity.ok(votoService.actualizarVoto(id, request, usuarioId));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MIEMBRO_MESA') or hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarVoto(@PathVariable Long id) {
        Long usuarioId = getCurrentUserId();
        votoService.eliminarVoto(id, usuarioId);
        return ResponseEntity.noContent().build();
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return userDetails.getId();
    }
}