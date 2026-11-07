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

    private InstitucionEducativaResponse toResponse(InstitucionEducativa i) {
        return InstitucionEducativaResponse.builder()
                .id(i.getId())
                .nombre(i.getNombre())
                .parroquiaId(i.getParroquia() != null ? i.getParroquia().getId() : null)
                .parroquiaNombre(i.getParroquia() != null ? i.getParroquia().getNombre() : null)
                .direccion(i.getDireccion())
                .codigo(i.getCodigo())
                .tipo(i.getTipo())
                .latitud(i.getLatitud())
                .longitud(i.getLongitud())
                .electoresRegistrados(i.getElectoresRegistrados())
                .build();
    }

    private InstitucionEducativa fromRequest(InstitucionEducativaRequest request) {
        return InstitucionEducativa.builder()
                .nombre(request.getNombre())
                .parroquia(Parroquia.builder().id(request.getParroquiaId()).build())
                .direccion(request.getDireccion())
                .codigo(request.getCodigo())
                .tipo(request.getTipo())
                .latitud(request.getLatitud())
                .longitud(request.getLongitud())
                .electoresRegistrados(request.getElectoresRegistrados())
                .build();
    }

    @GetMapping
    public ResponseEntity<List<InstitucionEducativaResponse>> findAll() {
        List<InstitucionEducativaResponse> response = institucionService.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/parroquia/{parroquiaId}")
    public ResponseEntity<List<InstitucionEducativaResponse>> findByParroquiaId(@PathVariable Long parroquiaId) {
        List<InstitucionEducativaResponse> response = institucionService.findByParroquiaId(parroquiaId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstitucionEducativaResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(toResponse(institucionService.findById(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InstitucionEducativaResponse> save(@Valid @RequestBody InstitucionEducativaRequest request) {
        InstitucionEducativa saved = institucionService.save(fromRequest(request));
        return ResponseEntity.ok(toResponse(saved));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InstitucionEducativaResponse> update(@PathVariable Long id, @Valid @RequestBody InstitucionEducativaRequest request) {
        InstitucionEducativa institucion = institucionService.findById(id);
        institucion.setNombre(request.getNombre());
        institucion.setDireccion(request.getDireccion());
        institucion.setCodigo(request.getCodigo());
        institucion.setTipo(request.getTipo());
        institucion.setLatitud(request.getLatitud());
        institucion.setLongitud(request.getLongitud());
        institucion.setElectoresRegistrados(request.getElectoresRegistrados());
        InstitucionEducativa updated = institucionService.update(id, institucion);
        return ResponseEntity.ok(toResponse(updated));
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
        String[] headers = {"ID", "Nombre", "Parroquia", "Direccion", "Codigo", "Tipo", "Latitud", "Longitud", "Electores"};
        List<String[]> data = instituciones.stream()
                .map(i -> new String[]{String.valueOf(i.getId()), i.getNombre(), i.getParroquia().getNombre(),
                        i.getDireccion(), i.getCodigo(), i.getTipo(),
                        i.getLatitud() != null ? String.valueOf(i.getLatitud()) : "",
                        i.getLongitud() != null ? String.valueOf(i.getLongitud()) : "",
                        i.getElectoresRegistrados() != null ? String.valueOf(i.getElectoresRegistrados()) : ""})
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
        String[] headers = {"ID", "Nombre", "Parroquia", "Direccion", "Codigo", "Tipo", "Latitud", "Longitud", "Electores"};
        List<String[]> data = instituciones.stream()
                .map(i -> new String[]{String.valueOf(i.getId()), i.getNombre(), i.getParroquia().getNombre(),
                        i.getDireccion(), i.getCodigo(), i.getTipo(),
                        i.getLatitud() != null ? String.valueOf(i.getLatitud()) : "",
                        i.getLongitud() != null ? String.valueOf(i.getLongitud()) : "",
                        i.getElectoresRegistrados() != null ? String.valueOf(i.getElectoresRegistrados()) : ""})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Instituciones Educativas", headers, data, new float[]{1, 3, 2, 3, 1, 1, 1, 1, 1});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "instituciones.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
