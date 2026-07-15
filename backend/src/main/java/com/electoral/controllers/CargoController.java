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
@RequestMapping("/api/cargos")
@RequiredArgsConstructor
public class CargoController {
    private final CargoService cargoService;
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<List<CargoResponse>> getCargosByEleccion(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(cargoService.getCargosByEleccion(eleccionesId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CargoResponse> getCargoById(@PathVariable Long id) {
        return ResponseEntity.ok(cargoService.getCargoById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CargoResponse> createCargo(@Valid @RequestBody CargoRequest request) {
        return ResponseEntity.ok(cargoService.createCargo(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CargoResponse> updateCargo(@PathVariable Long id, @Valid @RequestBody CargoRequest request) {
        return ResponseEntity.ok(cargoService.updateCargo(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCargo(@PathVariable Long id) {
        cargoService.deleteCargo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exportar-excel")
    public ResponseEntity<byte[]> exportarExcel(@RequestParam(required = false) Long eleccionesId) {
        List<CargoResponse> cargos;
        if (eleccionesId != null) {
            cargos = cargoService.getCargosByEleccion(eleccionesId);
        } else {
            cargos = cargoService.getCargosByEleccion(null);
        }
        String[] headers = {"ID", "Nombre", "Descripcion", "Eleccion"};
        List<String[]> data = cargos.stream()
                .map(c -> new String[]{String.valueOf(c.getId()), c.getNombre(), c.getDescripcion(), String.valueOf(c.getEleccionesId())})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Cargos", headers, data);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "cargos.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    @GetMapping("/exportar-pdf")
    public ResponseEntity<byte[]> exportarPdf(@RequestParam(required = false) Long eleccionesId) {
        List<CargoResponse> cargos;
        if (eleccionesId != null) {
            cargos = cargoService.getCargosByEleccion(eleccionesId);
        } else {
            cargos = cargoService.getCargosByEleccion(null);
        }
        String[] headers = {"ID", "Nombre", "Descripcion", "Eleccion"};
        List<String[]> data = cargos.stream()
                .map(c -> new String[]{String.valueOf(c.getId()), c.getNombre(), c.getDescripcion(), String.valueOf(c.getEleccionesId())})
                .collect(Collectors.toList());
        byte[] pdf = pdfExportService.exportTablePdf("Cargos", headers, data, new float[]{1, 3, 3, 3});
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData("attachment", "cargos.pdf");
        return ResponseEntity.ok().headers(httpHeaders).body(pdf);
    }
}
