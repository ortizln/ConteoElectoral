package com.electoral.controllers;

import com.electoral.dto.*;
import com.electoral.services.EscrutinioService;
import com.electoral.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/escrutinio")
@RequiredArgsConstructor
public class EscrutinioController {

    private final EscrutinioService escrutinioService;
    private final SecurityUtil securityUtil;

    // === RESUMEN ===
    @GetMapping("/resumen")
    public ResponseEntity<EscrutinioResumenResponse> resumen() {
        return ResponseEntity.ok(escrutinioService.obtenerResumen());
    }

    // === RECONTEOS ===
    @GetMapping("/reconteos")
    public ResponseEntity<List<ReconteoResponse>> listarReconteos(
            @RequestParam(required = false) Long eleccionId,
            @RequestParam(required = false) Long mesaId) {
        if (mesaId != null) return ResponseEntity.ok(escrutinioService.listarReconteosPorMesa(mesaId));
        if (eleccionId != null) return ResponseEntity.ok(escrutinioService.listarReconteos(eleccionId));
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/reconteos/{id}")
    public ResponseEntity<ReconteoResponse> obtenerReconteo(@PathVariable Long id) {
        return ResponseEntity.ok(escrutinioService.obtenerReconteo(id));
    }

    @PostMapping("/reconteos")
    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR')")
    public ResponseEntity<ReconteoResponse> crearReconteo(@Valid @RequestBody ReconteoRequest request) {
        return ResponseEntity.ok(escrutinioService.crearReconteo(request));
    }

    @PatchMapping("/reconteos/{id}/estado")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReconteoResponse> actualizarEstadoReconteo(@PathVariable Long id,
            @RequestParam String estado,
            @RequestParam(required = false) String resultado,
            @RequestParam(required = false) String realizadoPor) {
        return ResponseEntity.ok(escrutinioService.actualizarEstadoReconteo(id, estado, resultado, realizadoPor));
    }

    // === IMPUGNACIONES ===
    @GetMapping("/impugnaciones")
    public ResponseEntity<List<ImpugnacionResponse>> listarImpugnaciones(
            @RequestParam(required = false) Long eleccionId) {
        if (eleccionId != null) return ResponseEntity.ok(escrutinioService.listarImpugnaciones(eleccionId));
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/impugnaciones/{id}")
    public ResponseEntity<ImpugnacionResponse> obtenerImpugnacion(@PathVariable Long id) {
        return ResponseEntity.ok(escrutinioService.obtenerImpugnacion(id));
    }

    @PostMapping("/impugnaciones")
    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR')")
    public ResponseEntity<ImpugnacionResponse> crearImpugnacion(@Valid @RequestBody ImpugnacionRequest request) {
        return ResponseEntity.ok(escrutinioService.crearImpugnacion(request));
    }

    @PatchMapping("/impugnaciones/{id}/estado")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ImpugnacionResponse> actualizarEstadoImpugnacion(@PathVariable Long id,
            @RequestParam String estado) {
        return ResponseEntity.ok(escrutinioService.actualizarEstadoImpugnacion(id, estado));
    }

    // === OBSERVACIONES ===
    @GetMapping("/observaciones")
    public ResponseEntity<List<ObservacionResponse>> listarObservaciones(
            @RequestParam(required = false) Long eleccionId,
            @RequestParam(required = false) Long mesaId) {
        if (mesaId != null) return ResponseEntity.ok(escrutinioService.listarObservacionesPorMesa(mesaId));
        if (eleccionId != null) return ResponseEntity.ok(escrutinioService.listarObservaciones(eleccionId));
        return ResponseEntity.ok(List.of());
    }

    @PostMapping("/observaciones")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ObservacionResponse> crearObservacion(@Valid @RequestBody ObservacionRequest request) {
        Long usuarioId = securityUtil.getCurrentUserId();
        return ResponseEntity.ok(escrutinioService.crearObservacion(request, usuarioId));
    }

    // === RESOLUCIONES ===
    @GetMapping("/resoluciones")
    public ResponseEntity<List<ResolucionResponse>> listarResoluciones() {
        return ResponseEntity.ok(escrutinioService.listarResoluciones());
    }

    @GetMapping("/resoluciones/{id}")
    public ResponseEntity<ResolucionResponse> obtenerResolucion(@PathVariable Long id) {
        return ResponseEntity.ok(escrutinioService.obtenerResolucion(id));
    }

    @PostMapping("/resoluciones")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResolucionResponse> crearResolucion(@Valid @RequestBody ResolucionRequest request) {
        return ResponseEntity.ok(escrutinioService.crearResolucion(request));
    }
}
