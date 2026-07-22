package com.electoral.controllers;

import com.electoral.dto.*;
import com.electoral.services.ReglaNegocioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reglas-negocio")
@RequiredArgsConstructor
public class ReglaNegocioController {

    private final ReglaNegocioService reglaNegocioService;

    @GetMapping
    public ResponseEntity<List<ReglaNegocioResponse>> findAll(
            @RequestParam(required = false) String modulo,
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) Boolean activa) {
        return ResponseEntity.ok(reglaNegocioService.findAll(modulo, tipo, activa));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReglaNegocioResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(reglaNegocioService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReglaNegocioResponse> create(@Valid @RequestBody ReglaNegocioRequest request) {
        return ResponseEntity.ok(reglaNegocioService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReglaNegocioResponse> update(@PathVariable Long id,
                                                       @Valid @RequestBody ReglaNegocioRequest request) {
        return ResponseEntity.ok(reglaNegocioService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reglaNegocioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReglaNegocioResponse> toggleActiva(@PathVariable Long id) {
        return ResponseEntity.ok(reglaNegocioService.toggleActiva(id));
    }

    @PostMapping("/evaluar/{modulo}")
    public ResponseEntity<EvaluacionReglaResponse> evaluarReglas(
            @PathVariable String modulo,
            @RequestBody Map<String, Object> datos,
            @RequestParam(defaultValue = "Entidad") String entidad,
            @RequestParam(required = false) Long entidadId) {
        return ResponseEntity.ok(reglaNegocioService.evaluarReglas(modulo, datos, entidad, entidadId));
    }

    @GetMapping("/modulos")
    public ResponseEntity<List<Map<String, String>>> getModulos() {
        List<Map<String, String>> modulos = List.of(
            Map.of("codigo", "CANDIDATOS", "nombre", "Candidatos"),
            Map.of("codigo", "VOTOS", "nombre", "Votos"),
            Map.of("codigo", "PAPELETAS", "nombre", "Papeletas"),
            Map.of("codigo", "MESAS", "nombre", "Mesas"),
            Map.of("codigo", "ESCRUTINIO", "nombre", "Escrutinio"),
            Map.of("codigo", "PARTIDOS", "nombre", "Partidos"),
            Map.of("codigo", "LISTAS", "nombre", "Listas Electorales")
        );
        return ResponseEntity.ok(modulos);
    }

    @GetMapping("/tipos")
    public ResponseEntity<List<Map<String, String>>> getTipos() {
        List<Map<String, String>> tipos = List.of(
            Map.of("codigo", "VALIDACION", "nombre", "Validación"),
            Map.of("codigo", "CALCULO", "nombre", "Cálculo"),
            Map.of("codigo", "COMPORTAMIENTO", "nombre", "Comportamiento")
        );
        return ResponseEntity.ok(tipos);
    }
}
