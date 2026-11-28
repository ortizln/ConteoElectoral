package com.electoral.controllers;

import com.electoral.dto.*;
import com.electoral.services.WhatsappService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Configuracion de WhatsApp y bandeja de envios de fotos del acta. */
@RestController
@RequestMapping("/api/whatsapp")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class WhatsappController {
    private final WhatsappService whatsappService;

    @GetMapping("/estado")
    public ResponseEntity<WhatsappEstadoResponse> estado() {
        return ResponseEntity.ok(whatsappService.estado());
    }

    @PutMapping("/config")
    public ResponseEntity<WhatsappEstadoResponse> actualizarConfig(@Valid @RequestBody WhatsappConfigRequest request) {
        return ResponseEntity.ok(whatsappService.actualizarConfig(request));
    }

    @GetMapping("/grupos")
    public ResponseEntity<List<WhatsappGrupoResponse>> listarGrupos() {
        return ResponseEntity.ok(whatsappService.listarGrupos());
    }

    @PostMapping("/grupos")
    public ResponseEntity<WhatsappGrupoResponse> guardarGrupo(@Valid @RequestBody WhatsappGrupoRequest request) {
        return ResponseEntity.ok(whatsappService.guardarGrupo(request));
    }

    @PutMapping("/grupos/{id}")
    public ResponseEntity<WhatsappGrupoResponse> actualizarGrupo(@PathVariable Long id,
                                                                 @Valid @RequestBody WhatsappGrupoRequest request) {
        return ResponseEntity.ok(whatsappService.actualizarGrupo(id, request));
    }

    @DeleteMapping("/grupos/{id}")
    public ResponseEntity<Void> eliminarGrupo(@PathVariable Long id) {
        whatsappService.eliminarGrupo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/envios")
    public ResponseEntity<List<WhatsappEnvioResponse>> listarEnvios() {
        return ResponseEntity.ok(whatsappService.listarEnvios());
    }

    @PostMapping("/envios/{id}/reenviar")
    public ResponseEntity<WhatsappEnvioResponse> reenviar(@PathVariable Long id) {
        return ResponseEntity.ok(whatsappService.reenviar(id));
    }
}
