package com.electoral.controllers;

import com.electoral.dto.TipoEleccionResponse;
import com.electoral.dto.TipoCircunscripcionResponse;
import com.electoral.entities.TipoCircunscripcion;
import com.electoral.services.TipoEleccionService;
import com.electoral.repositories.TipoCircunscripcionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TipoEleccionController {

    private final TipoEleccionService tipoEleccionService;
    private final TipoCircunscripcionRepository tipoCircunscripcionRepository;

    @GetMapping("/tipos-eleccion")
    public ResponseEntity<List<TipoEleccionResponse>> getAllTiposEleccion() {
        return ResponseEntity.ok(tipoEleccionService.getAll());
    }

    @GetMapping("/tipos-eleccion/{id}")
    public ResponseEntity<TipoEleccionResponse> getTipoEleccionById(@PathVariable Long id) {
        return ResponseEntity.ok(tipoEleccionService.getById(id));
    }

    @PostMapping("/tipos-eleccion")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TipoEleccionResponse> createTipoEleccion(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(tipoEleccionService.create(body.get("nombre"), body.get("descripcion")));
    }

    @PutMapping("/tipos-eleccion/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TipoEleccionResponse> updateTipoEleccion(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(tipoEleccionService.update(id, body.get("nombre"), body.get("descripcion")));
    }

    @GetMapping("/tipos-circunscripcion")
    public ResponseEntity<List<TipoCircunscripcionResponse>> getAllTiposCircunscripcion() {
        List<TipoCircunscripcionResponse> list = tipoCircunscripcionRepository.findAll().stream()
                .map(tc -> TipoCircunscripcionResponse.builder()
                        .id(tc.getId()).codigo(tc.getCodigo()).nombre(tc.getNombre()).build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}
