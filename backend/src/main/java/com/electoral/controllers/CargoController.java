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
@RequestMapping("/api/cargos")
@RequiredArgsConstructor
public class CargoController {
    private final CargoService cargoService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<CargoResponse>> getCargosByEleccion(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(cargoService.getCargosByEleccion(eleccionesId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CargoResponse> getCargoById(@PathVariable Long id) {
        return ResponseEntity.ok(cargoService.getCargoById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<CargoResponse> createCargo(@Valid @RequestBody CargoRequest request) {
        return ResponseEntity.ok(cargoService.createCargo(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<CargoResponse> updateCargo(@PathVariable Long id, @Valid @RequestBody CargoRequest request) {
        return ResponseEntity.ok(cargoService.updateCargo(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCargo(@PathVariable Long id) {
        cargoService.deleteCargo(id);
        return ResponseEntity.noContent().build();
    }
}