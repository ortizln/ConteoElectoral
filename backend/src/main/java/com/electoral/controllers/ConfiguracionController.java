package com.electoral.controllers;

import com.electoral.dto.ConfiguracionRequest;
import com.electoral.dto.ConfiguracionResponse;
import com.electoral.services.ApkVersionService;
import com.electoral.services.ConfiguracionSistemaService;
import com.electoral.services.ManualService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/configuracion")
@RequiredArgsConstructor
public class ConfiguracionController {
    private final ConfiguracionSistemaService configuracionService;
    private final ManualService manualService;
    private final ApkVersionService apkVersionService;

    @GetMapping
    public ResponseEntity<ConfiguracionResponse> getConfiguracion() {
        return ResponseEntity.ok(configuracionService.getConfiguracion());
    }

    @GetMapping("/logo")
    public ResponseEntity<byte[]> getLogo() {
        byte[] logo = configuracionService.getLogo();
        if (logo == null) {
            return ResponseEntity.notFound().build();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return ResponseEntity.ok().headers(headers).body(logo);
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ConfiguracionResponse> updateConfiguracion(@Valid @RequestBody ConfiguracionRequest request) {
        return ResponseEntity.ok(configuracionService.updateConfiguracion(request));
    }

    @PostMapping("/logo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ConfiguracionResponse> uploadLogo(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(configuracionService.uploadLogo(file));
    }

    @DeleteMapping("/logo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteLogo() {
        configuracionService.deleteLogo();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/apk")
    public ResponseEntity<byte[]> getApk() {
        byte[] latest = apkVersionService.getLatestData();
        if (latest != null) {
            String nombre = apkVersionService.getLatestNombre();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", nombre != null ? nombre : "app.apk");
            return ResponseEntity.ok().headers(headers).body(latest);
        }
        byte[] apkData = configuracionService.getApkData();
        String apkNombre = configuracionService.getApkNombre();
        if (apkData == null) {
            return ResponseEntity.notFound().build();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", apkNombre != null ? apkNombre : "app.apk");
        return ResponseEntity.ok().headers(headers).body(apkData);
    }

    @PostMapping("/apk")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ConfiguracionResponse> uploadApk(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "version", defaultValue = "1.0.0") String version) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(configuracionService.uploadApk(file, version));
    }

    @DeleteMapping("/apk")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteApk() {
        configuracionService.deleteApk();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/apk/version")
    public ResponseEntity<Map<String, String>> getApkVersion() {
        Map<String, String> info = apkVersionService.getLatestVersionInfo();
        if (info != null) {
            return ResponseEntity.ok(info);
        }
        Map<String, String> response = new java.util.HashMap<>();
        response.put("version", configuracionService.getApkVersion());
        response.put("apkNombre", configuracionService.getApkNombre());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/manual")
    public ResponseEntity<byte[]> descargarManual() {
        byte[] pdf = manualService.generatePdf();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "manual-usuario.pdf");
        return ResponseEntity.ok().headers(headers).body(pdf);
    }
}
