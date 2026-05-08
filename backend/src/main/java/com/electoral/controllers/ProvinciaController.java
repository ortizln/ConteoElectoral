package com.electoral.controllers;

import com.electoral.dto.ProvinciaRequest;
import com.electoral.dto.ProvinciaResponse;
import com.electoral.entities.Provincia;
import com.electoral.entities.Zona;
import com.electoral.services.ProvinciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/provincias")
@RequiredArgsConstructor
public class ProvinciaController {
    private final ProvinciaService provinciaService;

    @GetMapping
    public ResponseEntity<List<ProvinciaResponse>> findAll() {
        List<Provincia> provincias = provinciaService.findAll();
        List<ProvinciaResponse> response = provincias.stream()
                .map(p -> ProvinciaResponse.builder()
                        .id(p.getId())
                        .nombre(p.getNombre())
                        .zonaId(p.getZona().getId())
                        .zonaNombre(p.getZona().getNombre())
                        .descripcion(p.getDescripcion())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/zona/{zonaId}")
    public ResponseEntity<List<ProvinciaResponse>> findByZonaId(@PathVariable Long zonaId) {
        List<Provincia> provincias = provinciaService.findByZonaId(zonaId);
        List<ProvinciaResponse> response = provincias.stream()
                .map(p -> ProvinciaResponse.builder()
                        .id(p.getId())
                        .nombre(p.getNombre())
                        .zonaId(p.getZona().getId())
                        .zonaNombre(p.getZona().getNombre())
                        .descripcion(p.getDescripcion())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProvinciaResponse> findById(@PathVariable Long id) {
        Provincia provincia = provinciaService.findById(id);
        ProvinciaResponse response = ProvinciaResponse.builder()
                .id(provincia.getId())
                .nombre(provincia.getNombre())
                .zonaId(provincia.getZona().getId())
                .zonaNombre(provincia.getZona().getNombre())
                .descripcion(provincia.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ProvinciaResponse> save(@RequestBody ProvinciaRequest request) {
        Provincia provincia = Provincia.builder()
                .nombre(request.getNombre())
                .zona(Zona.builder().id(request.getZonaId()).build())
                .descripcion(request.getDescripcion())
                .build();
        Provincia saved = provinciaService.save(provincia);
        ProvinciaResponse response = ProvinciaResponse.builder()
                .id(saved.getId())
                .nombre(saved.getNombre())
                .zonaId(saved.getZona().getId())
                .zonaNombre(saved.getZona().getNombre())
                .descripcion(saved.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProvinciaResponse> update(@PathVariable Long id, @RequestBody ProvinciaRequest request) {
        Provincia provincia = provinciaService.findById(id);
        provincia.setNombre(request.getNombre());
        provincia.setDescripcion(request.getDescripcion());
        Provincia updated = provinciaService.update(id, provincia);
        ProvinciaResponse response = ProvinciaResponse.builder()
                .id(updated.getId())
                .nombre(updated.getNombre())
                .zonaId(updated.getZona().getId())
                .zonaNombre(updated.getZona().getNombre())
                .descripcion(updated.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        provinciaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
