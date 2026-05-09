package com.electoral.controllers;

import com.electoral.dto.CantonRequest;
import com.electoral.dto.CantonResponse;
import com.electoral.entities.Canton;
import com.electoral.entities.Provincia;
import com.electoral.services.CantonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cantones")
@RequiredArgsConstructor
public class CantonController {
    private final CantonService cantonService;

    @GetMapping
    public ResponseEntity<List<CantonResponse>> findAll() {
        List<Canton> cantones = cantonService.findAll();
        List<CantonResponse> response = cantones.stream()
                .map(c -> CantonResponse.builder()
                        .id(c.getId())
                        .nombre(c.getNombre())
                        .provinciaId(c.getProvincia().getId())
                        .provinciaNombre(c.getProvincia().getNombre())
                        .descripcion(c.getDescripcion())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/provincia/{provinciaId}")
    public ResponseEntity<List<CantonResponse>> findByProvinciaId(@PathVariable Long provinciaId) {
        List<Canton> cantones = cantonService.findByProvinciaId(provinciaId);
        List<CantonResponse> response = cantones.stream()
                .map(c -> CantonResponse.builder()
                        .id(c.getId())
                        .nombre(c.getNombre())
                        .provinciaId(c.getProvincia().getId())
                        .provinciaNombre(c.getProvincia().getNombre())
                        .descripcion(c.getDescripcion())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CantonResponse> findById(@PathVariable Long id) {
        Canton canton = cantonService.findById(id);
        CantonResponse response = CantonResponse.builder()
                .id(canton.getId())
                .nombre(canton.getNombre())
                .provinciaId(canton.getProvincia().getId())
                .provinciaNombre(canton.getProvincia().getNombre())
                .descripcion(canton.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<CantonResponse> save(@Valid @RequestBody CantonRequest request) {
        Canton canton = Canton.builder()
                .nombre(request.getNombre())
                .provincia(Provincia.builder().id(request.getProvinciaId()).build())
                .descripcion(request.getDescripcion())
                .build();
        Canton saved = cantonService.save(canton);
        CantonResponse response = CantonResponse.builder()
                .id(saved.getId())
                .nombre(saved.getNombre())
                .provinciaId(saved.getProvincia().getId())
                .provinciaNombre(saved.getProvincia().getNombre())
                .descripcion(saved.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<CantonResponse> update(@PathVariable Long id, @Valid @RequestBody CantonRequest request) {
        Canton canton = cantonService.findById(id);
        canton.setNombre(request.getNombre());
        canton.setDescripcion(request.getDescripcion());
        Canton updated = cantonService.update(id, canton);
        CantonResponse response = CantonResponse.builder()
                .id(updated.getId())
                .nombre(updated.getNombre())
                .provinciaId(updated.getProvincia().getId())
                .provinciaNombre(updated.getProvincia().getNombre())
                .descripcion(updated.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        cantonService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
