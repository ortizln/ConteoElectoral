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
@RequestMapping("/api/candidatos")
@RequiredArgsConstructor
public class CandidatoController {
    private final CandidatoService candidatoService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<CandidatoResponse>> getCandidatosByEleccion(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(candidatoService.getCandidatosByEleccion(eleccionesId));
    }

    @GetMapping("/eleccion/{eleccionesId}/por-cargo")
    public ResponseEntity<List<CandidatoResponse>> getCandidatosOrderByCargo(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(candidatoService.getCandidatosOrderByCargo(eleccionesId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidatoResponse> getCandidatoById(@PathVariable Long id) {
        return ResponseEntity.ok(candidatoService.getCandidatoById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<CandidatoResponse> createCandidato(@Valid @RequestBody CandidatoRequest request) {
        return ResponseEntity.ok(candidatoService.createCandidato(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<CandidatoResponse> updateCandidato(@PathVariable Long id, @Valid @RequestBody CandidatoRequest request) {
        return ResponseEntity.ok(candidatoService.updateCandidato(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCandidato(@PathVariable Long id) {
        candidatoService.deleteCandidato(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exportar-excel")
    public ResponseEntity<byte[]> exportarExcel(@RequestParam(required = false) Long eleccionesId) {
        List<CandidatoResponse> candidatos;
        if (eleccionesId != null) {
            candidatos = candidatoService.getCandidatosByEleccion(eleccionesId);
        } else {
            candidatos = candidatoService.getCandidatosByEleccion(null);
        }
        String[] headers = {"ID", "Nombre", "Apellido", "Partido", "Cargo", "Eleccion"};
        List<String[]> data = candidatos.stream()
                .map(c -> new String[]{String.valueOf(c.getId()), c.getNombre(), c.getApellido(),
                        c.getPartidoNombre(), c.getCargoNombre(), String.valueOf(c.getEleccionesId())})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Candidatos", headers, data);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "candidatos.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    @GetMapping("/exportar-pdf")
    public ResponseEntity<byte[]> exportarPdf(@RequestParam(required = false) Long eleccionesId) {
        List<CandidatoResponse> candidatos;
        if (eleccionesId != null) {
            candidatos = candidatoService.getCandidatosByEleccion(eleccionesId);
        } else {
            candidatos = candidatoService.getCandidatosByEleccion(null);
        }
        String[] headers = {"ID", "Nombre", "Apellido", "Partido", "Cargo", "Eleccion"};
        List<String[]> data = candidatos.stream()
                .map(c -> new String[]{String.valueOf(c.getId()), c.getNombre(), c.getApellido(),
                        c.getPartidoNombre(), c.getCargoNombre(), String.valueOf(c.getEleccionesId())})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Candidatos", headers, data, new float[]{1, 2, 2, 2, 2, 2});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "candidatos.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
