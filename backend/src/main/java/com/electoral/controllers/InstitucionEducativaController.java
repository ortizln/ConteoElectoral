package com.electoral.controllers;

import com.electoral.dto.InstitucionEducativaRequest;
import com.electoral.dto.InstitucionEducativaResponse;
import com.electoral.entities.InstitucionEducativa;
import com.electoral.entities.Parroquia;
import com.electoral.services.ExcelExportService;
import com.electoral.services.PdfExportService;
import com.electoral.services.InstitucionEducativaService;
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
@RequestMapping("/api/instituciones")
@RequiredArgsConstructor
public class InstitucionEducativaController {
    private final InstitucionEducativaService institucionService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping
    public ResponseEntity<List<InstitucionEducativaResponse>> findAll() {
        List<InstitucionEducativa> instituciones = institucionService.findAll();
        List<InstitucionEducativaResponse> response = instituciones.stream()
                .map(i -> InstitucionEducativaResponse.builder()
                        .id(i.getId())
                        .nombre(i.getNombre())
                        .parroquiaId(i.getParroquia().getId())
                        .parroquiaNombre(i.getParroquia().getNombre())
                        .direccion(i.getDireccion())
                        .codigo(i.getCodigo())
                        .tipo(i.getTipo())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/parroquia/{parroquiaId}")
    public ResponseEntity<List<InstitucionEducativaResponse>> findByParroquiaId(@PathVariable Long parroquiaId) {
        List<InstitucionEducativa> instituciones = institucionService.findByParroquiaId(parroquiaId);
        List<InstitucionEducativaResponse> response = instituciones.stream()
                .map(i -> InstitucionEducativaResponse.builder()
                        .id(i.getId())
                        .nombre(i.getNombre())
                        .parroquiaId(i.getParroquia().getId())
                        .parroquiaNombre(i.getParroquia().getNombre())
                        .direccion(i.getDireccion())
                        .codigo(i.getCodigo())
                        .tipo(i.getTipo())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstitucionEducativaResponse> findById(@PathVariable Long id) {
        InstitucionEducativa institucion = institucionService.findById(id);
        InstitucionEducativaResponse response = InstitucionEducativaResponse.builder()
                .id(institucion.getId())
                .nombre(institucion.getNombre())
                .parroquiaId(institucion.getParroquia().getId())
                .parroquiaNombre(institucion.getParroquia().getNombre())
                .direccion(institucion.getDireccion())
                .codigo(institucion.getCodigo())
                .tipo(institucion.getTipo())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InstitucionEducativaResponse> save(@Valid @RequestBody InstitucionEducativaRequest request) {
        InstitucionEducativa institucion = InstitucionEducativa.builder()
                .nombre(request.getNombre())
                .parroquia(Parroquia.builder().id(request.getParroquiaId()).build())
                .direccion(request.getDireccion())
                .codigo(request.getCodigo())
                .tipo(request.getTipo())
                .build();
        InstitucionEducativa saved = institucionService.save(institucion);
        InstitucionEducativaResponse response = InstitucionEducativaResponse.builder()
                .id(saved.getId())
                .nombre(saved.getNombre())
                .parroquiaId(saved.getParroquia().getId())
                .parroquiaNombre(saved.getParroquia().getNombre())
                .direccion(saved.getDireccion())
                .codigo(saved.getCodigo())
                .tipo(saved.getTipo())
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InstitucionEducativaResponse> update(@PathVariable Long id, @Valid @RequestBody InstitucionEducativaRequest request) {
        InstitucionEducativa institucion = institucionService.findById(id);
        institucion.setNombre(request.getNombre());
        institucion.setDireccion(request.getDireccion());
        institucion.setCodigo(request.getCodigo());
        institucion.setTipo(request.getTipo());
        InstitucionEducativa updated = institucionService.update(id, institucion);
        InstitucionEducativaResponse response = InstitucionEducativaResponse.builder()
                .id(updated.getId())
                .nombre(updated.getNombre())
                .parroquiaId(updated.getParroquia().getId())
                .parroquiaNombre(updated.getParroquia().getNombre())
                .direccion(updated.getDireccion())
                .codigo(updated.getCodigo())
                .tipo(updated.getTipo())
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        institucionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exportar-excel")
    public ResponseEntity<byte[]> exportarExcel() {
        List<InstitucionEducativa> instituciones = institucionService.findAll();
        String[] headers = {"ID", "Nombre", "Parroquia", "Direccion", "Codigo", "Tipo"};
        List<String[]> data = instituciones.stream()
                .map(i -> new String[]{String.valueOf(i.getId()), i.getNombre(), i.getParroquia().getNombre(),
                        i.getDireccion(), i.getCodigo(), i.getTipo()})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Instituciones", headers, data);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "instituciones.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    @GetMapping("/exportar-pdf")
    public ResponseEntity<byte[]> exportarPdf() {
        List<InstitucionEducativa> instituciones = institucionService.findAll();
        String[] headers = {"ID", "Nombre", "Parroquia", "Direccion", "Codigo", "Tipo"};
        List<String[]> data = instituciones.stream()
                .map(i -> new String[]{String.valueOf(i.getId()), i.getNombre(), i.getParroquia().getNombre(),
                        i.getDireccion(), i.getCodigo(), i.getTipo()})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Instituciones Educativas", headers, data, new float[]{1, 3, 2, 3, 1, 1});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "instituciones.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
