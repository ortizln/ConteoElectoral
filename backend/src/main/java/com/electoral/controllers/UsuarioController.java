package com.electoral.controllers;

import com.electoral.dto.*;
import com.electoral.services.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UsuarioResponse>> getAllUsuarios() {
        return ResponseEntity.ok(usuarioService.getAllUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> getUsuarioById(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.getUsuarioById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> createUsuario(@Valid @RequestBody UsuarioRequest request) {
        return ResponseEntity.ok(usuarioService.createUsuario(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> updateUsuario(@PathVariable Long id, @Valid @RequestBody UsuarioUpdateRequest request) {
        return ResponseEntity.ok(usuarioService.updateUsuario(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/reset-password")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> resetPassword(@PathVariable Long id, @Valid @RequestBody ResetPasswordRequest request) {
        usuarioService.resetPassword(id, request.getNuevaPassword());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/rol/{rolNombre}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UsuarioResponse>> getUsuariosByRol(@PathVariable String rolNombre) {
        return ResponseEntity.ok(usuarioService.getUsuariosByRol(rolNombre));
    }

    @GetMapping("/exportar-excel")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> exportarExcel() {
        List<UsuarioResponse> usuarios = usuarioService.getAllUsuarios();
        String[] headers = {"ID", "Username", "Nombre", "Apellido", "Email", "Rol", "Activo"};
        List<String[]> data = usuarios.stream()
                .map(u -> new String[]{String.valueOf(u.getId()), u.getUsername(), u.getNombre(),
                        u.getApellido(), u.getEmail(), u.getRol(), u.getActivo() ? "Si" : "No"})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Usuarios", headers, data);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "usuarios.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    @GetMapping("/exportar-pdf")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> exportarPdf() {
        List<UsuarioResponse> usuarios = usuarioService.getAllUsuarios();
        String[] headers = {"ID", "Username", "Nombre", "Apellido", "Email", "Rol", "Activo"};
        List<String[]> data = usuarios.stream()
                .map(u -> new String[]{String.valueOf(u.getId()), u.getUsername(), u.getNombre(),
                        u.getApellido(), u.getEmail(), u.getRol(), u.getActivo() ? "Si" : "No"})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Usuarios", headers, data, new float[]{1, 2, 2, 2, 2, 1, 1});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "usuarios.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
