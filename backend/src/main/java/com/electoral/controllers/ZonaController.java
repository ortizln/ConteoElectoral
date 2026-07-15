package com.electoral.controllers;

import com.electoral.dto.ZonaRequest;
import com.electoral.dto.ZonaResponse;
import com.electoral.entities.Zona;
import com.electoral.services.ExcelExportService;
import com.electoral.services.PdfExportService;
import com.electoral.services.ZonaService;
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
@RequestMapping("/api/zonas")
@RequiredArgsConstructor
public class ZonaController {
    private final ZonaService zonaService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping
    public ResponseEntity<List<ZonaResponse>> findAll() {
        List<Zona> zonas = zonaService.findAll();
        List<ZonaResponse> response = zonas.stream()
                .map(z -> ZonaResponse.builder()
                        .id(z.getId())
                        .nombre(z.getNombre())
                        .descripcion(z.getDescripcion())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ZonaResponse> findById(@PathVariable Long id) {
        Zona zona = zonaService.findById(id);
        ZonaResponse response = ZonaResponse.builder()
                .id(zona.getId())
                .nombre(zona.getNombre())
                .descripcion(zona.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ZonaResponse> save(@Valid @RequestBody ZonaRequest request) {
        Zona zona = Zona.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .build();
        Zona saved = zonaService.save(zona);
        ZonaResponse response = ZonaResponse.builder()
                .id(saved.getId())
                .nombre(saved.getNombre())
                .descripcion(saved.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ZonaResponse> update(@PathVariable Long id, @Valid @RequestBody ZonaRequest request) {
        Zona zona = zonaService.findById(id);
        zona.setNombre(request.getNombre());
        zona.setDescripcion(request.getDescripcion());
        Zona updated = zonaService.update(id, zona);
        ZonaResponse response = ZonaResponse.builder()
                .id(updated.getId())
                .nombre(updated.getNombre())
                .descripcion(updated.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        zonaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exportar-excel")
    public ResponseEntity<byte[]> exportarExcel() {
        List<Zona> zonas = zonaService.findAll();
        String[] headers = {"ID", "Nombre", "Descripcion"};
        List<String[]> data = zonas.stream()
                .map(z -> new String[]{String.valueOf(z.getId()), z.getNombre(), z.getDescripcion()})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Zonas", headers, data);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "zonas.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    @GetMapping("/exportar-pdf")
    public ResponseEntity<byte[]> exportarPdf() {
        List<Zona> zonas = zonaService.findAll();
        String[] headers = {"ID", "Nombre", "Descripcion"};
        List<String[]> data = zonas.stream()
                .map(z -> new String[]{String.valueOf(z.getId()), z.getNombre(), z.getDescripcion()})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Zonas", headers, data, new float[]{1, 3, 4});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "zonas.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
