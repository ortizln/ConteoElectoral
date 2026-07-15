package com.electoral.controllers;

import com.electoral.dto.RolPermisoRequest;
import com.electoral.dto.RolPermisoResponse;
import com.electoral.entities.Rol;
import com.electoral.repositories.RolRepository;
import com.electoral.services.PermisoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permisos")
@RequiredArgsConstructor
public class PermisoController {
    private final PermisoService permisoService;
    private final RolRepository rolRepository;

    @GetMapping("/roles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Rol>> getRoles() {
        return ResponseEntity.ok(rolRepository.findAll());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<RolPermisoResponse>> getAllPermisos() {
        return ResponseEntity.ok(permisoService.getAllPermisos());
    }

    @GetMapping("/rol/{rolId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<RolPermisoResponse>> getPermisosByRol(@PathVariable Long rolId) {
        return ResponseEntity.ok(permisoService.getPermisosByRol(rolId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RolPermisoResponse> updatePermiso(@PathVariable Long id, @Valid @RequestBody RolPermisoRequest request) {
        return ResponseEntity.ok(permisoService.updatePermiso(id, request));
    }
}
