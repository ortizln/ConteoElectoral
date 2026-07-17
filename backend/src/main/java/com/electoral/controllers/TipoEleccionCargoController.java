package com.electoral.controllers;

import com.electoral.entities.*;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tipo-eleccion-cargo")
@RequiredArgsConstructor
public class TipoEleccionCargoController {

    private final TipoEleccionCargoRepository repository;
    private final TipoEleccionRepository tipoEleccionRepository;
    private final CargoRepository cargoRepository;

    @GetMapping("/{tipoEleccionId}")
    public ResponseEntity<List<Map<String, Object>>> getCargosByTipoEleccion(@PathVariable Long tipoEleccionId) {
        List<Map<String, Object>> result = repository.findByTipoEleccionIdOrderByOrden(tipoEleccionId).stream()
                .map(tec -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", tec.getId());
                    m.put("cargoId", tec.getCargo().getId());
                    m.put("cargoNombre", tec.getCargo().getNombre());
                    m.put("orden", tec.getOrden());
                    return m;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @Transactional
    @PostMapping("/{tipoEleccionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> addCargoToTipoEleccion(
            @PathVariable Long tipoEleccionId, @RequestBody Map<String, Long> body) {
        TipoEleccion te = tipoEleccionRepository.findById(tipoEleccionId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Tipo de elección no encontrado"));
        Cargo cargo = cargoRepository.findById(body.get("cargoId"))
                .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado"));
        repository.save(TipoEleccionCargo.builder()
                .tipoEleccion(te).cargo(cargo)
                .orden(body.get("orden") != null ? body.get("orden").intValue() : 0)
                .build());
        return ResponseEntity.ok().build();
    }

    @Transactional
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> updateCargoOrden(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        TipoEleccionCargo tec = repository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Asignación no encontrada"));
        if (body.containsKey("orden")) {
            tec.setOrden(body.get("orden").intValue());
        }
        repository.save(tec);
        return ResponseEntity.ok().build();
    }

    @Transactional
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removeCargoFromTipoEleccion(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
