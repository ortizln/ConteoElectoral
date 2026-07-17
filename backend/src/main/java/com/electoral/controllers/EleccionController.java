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
@RequestMapping("/api/elecciones")
@RequiredArgsConstructor
public class EleccionController {
    private final EleccionService eleccionService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping
    public ResponseEntity<List<EleccionResponse>> getAllElecciones() {
        return ResponseEntity.ok(eleccionService.getAllElecciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EleccionResponse> getEleccionById(@PathVariable Long id) {
        return ResponseEntity.ok(eleccionService.getEleccionById(id));
    }

    @GetMapping("/activas")
    public ResponseEntity<List<EleccionResponse>> getEleccionesActivas() {
        return ResponseEntity.ok(eleccionService.getEleccionesActivas());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EleccionResponse> createEleccion(@Valid @RequestBody EleccionRequest request) {
        return ResponseEntity.ok(eleccionService.createEleccion(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EleccionResponse> updateEleccion(@PathVariable Long id, @Valid @RequestBody EleccionRequest request) {
        return ResponseEntity.ok(eleccionService.updateEleccion(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEleccion(@PathVariable Long id) {
        eleccionService.deleteEleccion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exportar-excel")
    public ResponseEntity<byte[]> exportarExcel() {
        List<EleccionResponse> elecciones = eleccionService.getAllElecciones();
        String[] headers = {"ID", "Nombre", "Fecha Inicio", "Fecha Fin", "Activa"};
        List<String[]> data = elecciones.stream()
                .map(e -> new String[]{String.valueOf(e.getId()), e.getNombre(),
                        e.getFechaInicio() != null ? e.getFechaInicio().toString() : "",
                        e.getFechaFin() != null ? e.getFechaFin().toString() : "",
                        e.getActiva() ? "Si" : "No"})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Elecciones", headers, data);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "elecciones.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    @GetMapping("/exportar-pdf")
    public ResponseEntity<byte[]> exportarPdf() {
        List<EleccionResponse> elecciones = eleccionService.getAllElecciones();
        String[] headers = {"ID", "Nombre", "Fecha Inicio", "Fecha Fin", "Activa"};
        List<String[]> data = elecciones.stream()
                .map(e -> new String[]{String.valueOf(e.getId()), e.getNombre(),
                        e.getFechaInicio() != null ? e.getFechaInicio().toString() : "",
                        e.getFechaFin() != null ? e.getFechaFin().toString() : "",
                        e.getActiva() ? "Si" : "No"})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Elecciones", headers, data, new float[]{1, 3, 2, 2, 1});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "elecciones.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
