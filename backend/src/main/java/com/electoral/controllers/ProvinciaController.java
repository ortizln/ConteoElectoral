package com.electoral.controllers;

import com.electoral.dto.ProvinciaRequest;
import com.electoral.dto.ProvinciaResponse;
import com.electoral.entities.Provincia;
import com.electoral.entities.Zona;
import com.electoral.services.ExcelExportService;
import com.electoral.services.PdfExportService;
import com.electoral.services.ProvinciaService;
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
@RequestMapping("/api/provincias")
@RequiredArgsConstructor
public class ProvinciaController {
    private final ProvinciaService provinciaService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping
    public ResponseEntity<List<ProvinciaResponse>> findAll() {
        List<Provincia> provincias = provinciaService.findAll();
        List<ProvinciaResponse> response = provincias.stream()
                .map(p -> ProvinciaResponse.builder()
                        .id(p.getId())
                        .nombre(p.getNombre())
                        .zonaId(p.getZona().getId())
                        .zonaNombre(p.getZona().getNombre())
                        .descripcion(p.getDescripcion())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/zona/{zonaId}")
    public ResponseEntity<List<ProvinciaResponse>> findByZonaId(@PathVariable Long zonaId) {
        List<Provincia> provincias = provinciaService.findByZonaId(zonaId);
        List<ProvinciaResponse> response = provincias.stream()
                .map(p -> ProvinciaResponse.builder()
                        .id(p.getId())
                        .nombre(p.getNombre())
                        .zonaId(p.getZona().getId())
                        .zonaNombre(p.getZona().getNombre())
                        .descripcion(p.getDescripcion())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProvinciaResponse> findById(@PathVariable Long id) {
        Provincia provincia = provinciaService.findById(id);
        ProvinciaResponse response = ProvinciaResponse.builder()
                .id(provincia.getId())
                .nombre(provincia.getNombre())
                .zonaId(provincia.getZona().getId())
                .zonaNombre(provincia.getZona().getNombre())
                .descripcion(provincia.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<ProvinciaResponse> save(@Valid @RequestBody ProvinciaRequest request) {
        Provincia provincia = Provincia.builder()
                .nombre(request.getNombre())
                .zona(Zona.builder().id(request.getZonaId()).build())
                .descripcion(request.getDescripcion())
                .build();
        Provincia saved = provinciaService.save(provincia);
        ProvinciaResponse response = ProvinciaResponse.builder()
                .id(saved.getId())
                .nombre(saved.getNombre())
                .zonaId(saved.getZona().getId())
                .zonaNombre(saved.getZona().getNombre())
                .descripcion(saved.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<ProvinciaResponse> update(@PathVariable Long id, @Valid @RequestBody ProvinciaRequest request) {
        Provincia provincia = provinciaService.findById(id);
        provincia.setNombre(request.getNombre());
        provincia.setDescripcion(request.getDescripcion());
        Provincia updated = provinciaService.update(id, provincia);
        ProvinciaResponse response = ProvinciaResponse.builder()
                .id(updated.getId())
                .nombre(updated.getNombre())
                .zonaId(updated.getZona().getId())
                .zonaNombre(updated.getZona().getNombre())
                .descripcion(updated.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        provinciaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exportar-excel")
    public ResponseEntity<byte[]> exportarExcel() {
        List<Provincia> provincias = provinciaService.findAll();
        String[] headers = {"ID", "Nombre", "Zona", "Descripcion"};
        List<String[]> data = provincias.stream()
                .map(p -> new String[]{String.valueOf(p.getId()), p.getNombre(), p.getZona().getNombre(), p.getDescripcion()})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Provincias", headers, data);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "provincias.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    @GetMapping("/exportar-pdf")
    public ResponseEntity<byte[]> exportarPdf() {
        List<Provincia> provincias = provinciaService.findAll();
        String[] headers = {"ID", "Nombre", "Zona", "Descripcion"};
        List<String[]> data = provincias.stream()
                .map(p -> new String[]{String.valueOf(p.getId()), p.getNombre(), p.getZona().getNombre(), p.getDescripcion()})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Provincias", headers, data, new float[]{1, 3, 3, 3});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "provincias.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
