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
@RequestMapping("/api/partidos")
@RequiredArgsConstructor
public class PartidoController {
    private final PartidoService partidoService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<PartidoResponse>> getPartidosByEleccion(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(partidoService.getPartidosByEleccion(eleccionesId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartidoResponse> getPartidoById(@PathVariable Long id) {
        return ResponseEntity.ok(partidoService.getPartidoById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PartidoResponse> createPartido(@Valid @RequestBody PartidoRequest request) {
        return ResponseEntity.ok(partidoService.createPartido(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PartidoResponse> updatePartido(@PathVariable Long id, @Valid @RequestBody PartidoRequest request) {
        return ResponseEntity.ok(partidoService.updatePartido(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePartido(@PathVariable Long id) {
        partidoService.deletePartido(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exportar-excel")
    public ResponseEntity<byte[]> exportarExcel(@RequestParam(required = false) Long eleccionesId) {
        List<PartidoResponse> partidos;
        if (eleccionesId != null) {
            partidos = partidoService.getPartidosByEleccion(eleccionesId);
        } else {
            partidos = partidoService.getPartidosByEleccion(null);
        }
        String[] headers = {"ID", "Nombre", "Sigla", "Eleccion"};
        List<String[]> data = partidos.stream()
                .map(p -> new String[]{String.valueOf(p.getId()), p.getNombre(), p.getSigla(), String.valueOf(p.getEleccionesId())})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Partidos", headers, data);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "partidos.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    @GetMapping("/exportar-pdf")
    public ResponseEntity<byte[]> exportarPdf(@RequestParam(required = false) Long eleccionesId) {
        List<PartidoResponse> partidos;
        if (eleccionesId != null) {
            partidos = partidoService.getPartidosByEleccion(eleccionesId);
        } else {
            partidos = partidoService.getPartidosByEleccion(null);
        }
        String[] headers = {"ID", "Nombre", "Sigla", "Eleccion"};
        List<String[]> data = partidos.stream()
                .map(p -> new String[]{String.valueOf(p.getId()), p.getNombre(), p.getSigla(), String.valueOf(p.getEleccionesId())})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Partidos", headers, data, new float[]{1, 3, 2, 3});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "partidos.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
