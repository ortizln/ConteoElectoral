package com.electoral.controllers;

import com.electoral.dto.InstitucionEducativaRequest;
import com.electoral.dto.InstitucionEducativaResponse;
import com.electoral.entities.InstitucionEducativa;
import com.electoral.entities.Parroquia;
import com.electoral.services.InstitucionEducativaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/instituciones")
@RequiredArgsConstructor
public class InstitucionEducativaController {
    private final InstitucionEducativaService institucionService;

    @GetMapping
    public ResponseEntity<List<InstitucionEducativaResponse>> findAll() {
        List<InstitucionEducativa> instituciones = institucionService.findAll();
        List<InstitucionEducativaResponse> response = instituciones.stream()
                .map(i -> InstitucionEducativaResponse.builder()
                        .id(i.getId())
                        .nombre(i.getNombre())
                        .parroquiaId(i.getParroquia().getId())
                        .parroquiaNombre(i.getParroquia().getNombre())
                        .direccion(i.getDireccion())
                        .codigo(i.getCodigo())
                        .tipo(i.getTipo())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/parroquia/{parroquiaId}")
    public ResponseEntity<List<InstitucionEducativaResponse>> findByParroquiaId(@PathVariable Long parroquiaId) {
        List<InstitucionEducativa> instituciones = institucionService.findByParroquiaId(parroquiaId);
        List<InstitucionEducativaResponse> response = instituciones.stream()
                .map(i -> InstitucionEducativaResponse.builder()
                        .id(i.getId())
                        .nombre(i.getNombre())
                        .parroquiaId(i.getParroquia().getId())
                        .parroquiaNombre(i.getParroquia().getNombre())
                        .direccion(i.getDireccion())
                        .codigo(i.getCodigo())
                        .tipo(i.getTipo())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstitucionEducativaResponse> findById(@PathVariable Long id) {
        InstitucionEducativa institucion = institucionService.findById(id);
        InstitucionEducativaResponse response = InstitucionEducativaResponse.builder()
                .id(institucion.getId())
                .nombre(institucion.getNombre())
                .parroquiaId(institucion.getParroquia().getId())
                .parroquiaNombre(institucion.getParroquia().getNombre())
                .direccion(institucion.getDireccion())
                .codigo(institucion.getCodigo())
                .tipo(institucion.getTipo())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<InstitucionEducativaResponse> save(@RequestBody InstitucionEducativaRequest request) {
        InstitucionEducativa institucion = InstitucionEducativa.builder()
                .nombre(request.getNombre())
                .parroquia(Parroquia.builder().id(request.getParroquiaId()).build())
                .direccion(request.getDireccion())
                .codigo(request.getCodigo())
                .tipo(request.getTipo())
                .build();
        InstitucionEducativa saved = institucionService.save(institucion);
        InstitucionEducativaResponse response = InstitucionEducativaResponse.builder()
                .id(saved.getId())
                .nombre(saved.getNombre())
                .parroquiaId(saved.getParroquia().getId())
                .parroquiaNombre(saved.getParroquia().getNombre())
                .direccion(saved.getDireccion())
                .codigo(saved.getCodigo())
                .tipo(saved.getTipo())
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InstitucionEducativaResponse> update(@PathVariable Long id, @RequestBody InstitucionEducativaRequest request) {
        InstitucionEducativa institucion = institucionService.findById(id);
        institucion.setNombre(request.getNombre());
        institucion.setDireccion(request.getDireccion());
        institucion.setCodigo(request.getCodigo());
        institucion.setTipo(request.getTipo());
        InstitucionEducativa updated = institucionService.update(id, institucion);
        InstitucionEducativaResponse response = InstitucionEducativaResponse.builder()
                .id(updated.getId())
                .nombre(updated.getNombre())
                .parroquiaId(updated.getParroquia().getId())
                .parroquiaNombre(updated.getParroquia().getNombre())
                .direccion(updated.getDireccion())
                .codigo(updated.getCodigo())
                .tipo(updated.getTipo())
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        institucionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
