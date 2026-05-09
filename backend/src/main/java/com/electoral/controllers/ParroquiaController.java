package com.electoral.controllers;

import com.electoral.dto.ParroquiaRequest;
import com.electoral.dto.ParroquiaResponse;
import com.electoral.entities.Canton;
import com.electoral.entities.Parroquia;
import com.electoral.services.ExcelExportService;
import com.electoral.services.PdfExportService;
import com.electoral.services.ParroquiaService;
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
@RequestMapping("/api/parroquias")
@RequiredArgsConstructor
public class ParroquiaController {
    private final ParroquiaService parroquiaService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping
    public ResponseEntity<List<ParroquiaResponse>> findAll() {
        List<Parroquia> parroquias = parroquiaService.findAll();
        List<ParroquiaResponse> response = parroquias.stream()
                .map(p -> ParroquiaResponse.builder()
                        .id(p.getId())
                        .nombre(p.getNombre())
                        .cantonId(p.getCanton().getId())
                        .cantonNombre(p.getCanton().getNombre())
                        .descripcion(p.getDescripcion())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/canton/{cantonId}")
    public ResponseEntity<List<ParroquiaResponse>> findByCantonId(@PathVariable Long cantonId) {
        List<Parroquia> parroquias = parroquiaService.findByCantonId(cantonId);
        List<ParroquiaResponse> response = parroquias.stream()
                .map(p -> ParroquiaResponse.builder()
                        .id(p.getId())
                        .nombre(p.getNombre())
                        .cantonId(p.getCanton().getId())
                        .cantonNombre(p.getCanton().getNombre())
                        .descripcion(p.getDescripcion())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParroquiaResponse> findById(@PathVariable Long id) {
        Parroquia parroquia = parroquiaService.findById(id);
        ParroquiaResponse response = ParroquiaResponse.builder()
                .id(parroquia.getId())
                .nombre(parroquia.getNombre())
                .cantonId(parroquia.getCanton().getId())
                .cantonNombre(parroquia.getCanton().getNombre())
                .descripcion(parroquia.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<ParroquiaResponse> save(@Valid @RequestBody ParroquiaRequest request) {
        Parroquia parroquia = Parroquia.builder()
                .nombre(request.getNombre())
                .canton(Canton.builder().id(request.getCantonId()).build())
                .descripcion(request.getDescripcion())
                .build();
        Parroquia saved = parroquiaService.save(parroquia);
        ParroquiaResponse response = ParroquiaResponse.builder()
                .id(saved.getId())
                .nombre(saved.getNombre())
                .cantonId(saved.getCanton().getId())
                .cantonNombre(saved.getCanton().getNombre())
                .descripcion(saved.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<ParroquiaResponse> update(@PathVariable Long id, @Valid @RequestBody ParroquiaRequest request) {
        Parroquia parroquia = parroquiaService.findById(id);
        parroquia.setNombre(request.getNombre());
        parroquia.setDescripcion(request.getDescripcion());
        Parroquia updated = parroquiaService.update(id, parroquia);
        ParroquiaResponse response = ParroquiaResponse.builder()
                .id(updated.getId())
                .nombre(updated.getNombre())
                .cantonId(updated.getCanton().getId())
                .cantonNombre(updated.getCanton().getNombre())
                .descripcion(updated.getDescripcion())
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        parroquiaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exportar-excel")
    public ResponseEntity<byte[]> exportarExcel() {
        List<Parroquia> parroquias = parroquiaService.findAll();
        String[] headers = {"ID", "Nombre", "Canton", "Descripcion"};
        List<String[]> data = parroquias.stream()
                .map(p -> new String[]{String.valueOf(p.getId()), p.getNombre(), p.getCanton().getNombre(), p.getDescripcion()})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Parroquias", headers, data);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "parroquias.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    @GetMapping("/exportar-pdf")
    public ResponseEntity<byte[]> exportarPdf() {
        List<Parroquia> parroquias = parroquiaService.findAll();
        String[] headers = {"ID", "Nombre", "Canton", "Descripcion"};
        List<String[]> data = parroquias.stream()
                .map(p -> new String[]{String.valueOf(p.getId()), p.getNombre(), p.getCanton().getNombre(), p.getDescripcion()})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Parroquias", headers, data, new float[]{1, 3, 3, 3});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "parroquias.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
