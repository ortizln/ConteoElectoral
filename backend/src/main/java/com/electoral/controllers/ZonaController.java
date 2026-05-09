package com.electoral.controllers;

import com.electoral.dto.ZonaRequest;
import com.electoral.dto.ZonaResponse;
import com.electoral.entities.Zona;
import com.electoral.services.ZonaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/zonas")
@RequiredArgsConstructor
public class ZonaController {
    private final ZonaService zonaService;

    @GetMapping
    public ResponseEntity<List<ZonaResponse>> findAll() {
        List<Zona> zonas = zonaService.findAll();
        List<ZonaResponse> response = zonas.stream()
                .map(z -> ZonaResponse.builder()
                        .id(z.getId())
                        .nombre(z.getNombre())
                        .descripcion(z.getDescripcion())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ZonaResponse> findById(@PathVariable Long id) {
        Zona zona = zonaService.findById(id);
        ZonaResponse response = ZonaResponse.builder()
                .id(zona.getId())
                .nombre(zona.getNombre())
                .descripcion(zona.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<ZonaResponse> save(@Valid @RequestBody ZonaRequest request) {
        Zona zona = Zona.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .build();
        Zona saved = zonaService.save(zona);
        ZonaResponse response = ZonaResponse.builder()
                .id(saved.getId())
                .nombre(saved.getNombre())
                .descripcion(saved.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<ZonaResponse> update(@PathVariable Long id, @Valid @RequestBody ZonaRequest request) {
        Zona zona = zonaService.findById(id);
        zona.setNombre(request.getNombre());
        zona.setDescripcion(request.getDescripcion());
        Zona updated = zonaService.update(id, zona);
        ZonaResponse response = ZonaResponse.builder()
                .id(updated.getId())
                .nombre(updated.getNombre())
                .descripcion(updated.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        zonaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
