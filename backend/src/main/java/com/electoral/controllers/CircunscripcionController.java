package com.electoral.controllers;

import com.electoral.dto.*;
import com.electoral.services.CircunscripcionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/circunscripciones")
@RequiredArgsConstructor
public class CircunscripcionController {

    private final CircunscripcionService circunscripcionService;

    @GetMapping("/eleccion/{eleccionId}")
    public ResponseEntity<List<CircunscripcionResponse>> findByEleccion(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(circunscripcionService.findByEleccion(eleccionId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CircunscripcionResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(circunscripcionService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CircunscripcionResponse> create(@Valid @RequestBody CircunscripcionRequest request) {
        return ResponseEntity.ok(circunscripcionService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CircunscripcionResponse> update(@PathVariable Long id,
                                                          @Valid @RequestBody CircunscripcionRequest request) {
        return ResponseEntity.ok(circunscripcionService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        circunscripcionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/calcular-dhondt")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResultadoDHondtResponse> calcularDHondt(@PathVariable Long id) {
        return ResponseEntity.ok(circunscripcionService.calcularDHondt(id));
    }

    @GetMapping("/{id}/resultados-dhondt")
    public ResponseEntity<ResultadoDHondtResponse> consultarDHondt(@PathVariable Long id) {
        ResultadoDHondtResponse resultado = circunscripcionService.consultarDHondt(id);
        if (resultado == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(resultado);
    }
}
