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
@RequestMapping("/api/voto-papeleta")
@RequiredArgsConstructor
public class VotoPapeletaController {

    private final VotoPapeletaService votoPapeletaService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    public ResponseEntity<VotoPapeletaResponse> registrarVoto(@Valid @RequestBody VotoPapeletaRequest request) {
        return ResponseEntity.ok(votoPapeletaService.registrarVoto(request));
    }

    @GetMapping("/mesa/{mesaId}")
    public ResponseEntity<List<VotoPapeletaResponse>> getVotosByMesa(@PathVariable Long mesaId) {
        return ResponseEntity.ok(votoPapeletaService.getVotosByMesa(mesaId));
    }

    @GetMapping("/eleccion/{eleccionId}")
    public ResponseEntity<List<VotoPapeletaResponse>> getVotosByEleccion(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(votoPapeletaService.getVotosByEleccion(eleccionId));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    public ResponseEntity<Void> eliminarVoto(@PathVariable Long id) {
        votoPapeletaService.eliminarVoto(id);
        return ResponseEntity.noContent().build();
    }
}
