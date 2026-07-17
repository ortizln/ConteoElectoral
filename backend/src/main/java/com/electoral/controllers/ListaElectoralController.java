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
@RequestMapping("/api/listas-electorales")
@RequiredArgsConstructor
public class ListaElectoralController {

    private final ListaElectoralService listaService;

    @GetMapping("/eleccion/{eleccionId}")
    public ResponseEntity<List<ListaElectoralResponse>> getListasByEleccion(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(listaService.getListasByEleccion(eleccionId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListaElectoralDetalleResponse> getListaDetalle(@PathVariable Long id) {
        return ResponseEntity.ok(listaService.getListaDetalle(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ListaElectoralResponse> crearLista(@Valid @RequestBody ListaElectoralRequest request) {
        return ResponseEntity.ok(listaService.crearLista(request));
    }
}
