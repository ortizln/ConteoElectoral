package com.electoral.controllers;

import com.electoral.dto.DashboardResponse;
import com.electoral.dto.VotoResponse;
import com.electoral.services.ExcelExportService;
import com.electoral.services.PdfExportService;
import com.electoral.services.VotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final VotoService votoService;
    private final PdfExportService pdfExportService;
    private final ExcelExportService excelExportService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<DashboardResponse> getDashboard(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(votoService.getDashboardData(eleccionesId));
    }

    @GetMapping("/eleccion/{eleccionesId}/filtrar")
    public ResponseEntity<DashboardResponse> getDashboardConFiltros(
            @PathVariable Long eleccionesId,
            @RequestParam(required = false) Long cargoId,
            @RequestParam(required = false) Long partidoId,
            @RequestParam(required = false) Long zonaId,
            @RequestParam(required = false) Long provinciaId,
            @RequestParam(required = false) Long cantonId,
            @RequestParam(required = false) Long parroquiaId,
            @RequestParam(required = false) Long institucionId) {
        return ResponseEntity.ok(votoService.getDashboardDataConFiltros(eleccionesId, cargoId, partidoId, 
                zonaId, provinciaId, cantonId, parroquiaId, institucionId));
    }

    @GetMapping("/eleccion/{eleccionesId}/resultados")
    public ResponseEntity<List<VotoResponse>> getResultados(@PathVariable Long eleccionesId) {
        return ResponseEntity.ok(votoService.getVotosByEleccion(eleccionesId));
    }

    @GetMapping("/eleccion/{eleccionesId}/exportar-pdf")
    public ResponseEntity<byte[]> exportarPdf(
            @PathVariable Long eleccionesId,
            @RequestParam(required = false) Long cargoId,
            @RequestParam(required = false) Long partidoId,
            @RequestParam(required = false) Long zonaId,
            @RequestParam(required = false) Long provinciaId,
            @RequestParam(required = false) Long cantonId,
            @RequestParam(required = false) Long parroquiaId,
            @RequestParam(required = false) Long institucionId) {
        DashboardResponse data = votoService.getDashboardDataConFiltros(eleccionesId, cargoId, partidoId,
                zonaId, provinciaId, cantonId, parroquiaId, institucionId);
        byte[] pdf = pdfExportService.exportDashboardPdf(data);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "resultados.pdf");
        return ResponseEntity.ok().headers(headers).body(pdf);
    }

    @GetMapping("/eleccion/{eleccionesId}/exportar-excel")
    public ResponseEntity<byte[]> exportarExcel(
            @PathVariable Long eleccionesId,
            @RequestParam(required = false) Long cargoId,
            @RequestParam(required = false) Long partidoId,
            @RequestParam(required = false) Long zonaId,
            @RequestParam(required = false) Long provinciaId,
            @RequestParam(required = false) Long cantonId,
            @RequestParam(required = false) Long parroquiaId,
            @RequestParam(required = false) Long institucionId) {
        DashboardResponse data = votoService.getDashboardDataConFiltros(eleccionesId, cargoId, partidoId,
                zonaId, provinciaId, cantonId, parroquiaId, institucionId);
        String[] headers = {"Candidato", "Partido", "Cargo", "Votos", "Porcentaje"};
        List<String[]> rows = data.getResultados().stream()
                .map(r -> new String[]{r.getNombreCompleto(), r.getPartidoNombre(), r.getCargoNombre(),
                        String.valueOf(r.getTotalVotos()), String.format("%.2f%%", r.getPorcentaje())})
                .collect(Collectors.toList());
        byte[] excel = excelExportService.exportExcel("Resultados", headers, rows);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "resultados.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }
}

@RestController
@RequiredArgsConstructor
class WebSocketController {
    private final VotoService votoService;

    @MessageMapping("/actualizar-resultados/{eleccionId}")
    @SendTo("/topic/resultados/{eleccionId}")
    public DashboardResponse actualizarResultados(@PathVariable Long eleccionId) {
        return votoService.getDashboardData(eleccionId);
    }
}
