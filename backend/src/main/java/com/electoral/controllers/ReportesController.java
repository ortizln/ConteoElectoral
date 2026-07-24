package com.electoral.controllers;

import com.electoral.dto.ReporteCandidatoDTO;
import com.electoral.dto.ReporteListaDTO;
import com.electoral.dto.ReportePartidoDTO;
import com.electoral.dto.ReporteResumenDTO;
import com.electoral.services.ReportesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@RequiredArgsConstructor
public class ReportesController {

    private final ReportesService reportesService;

    @GetMapping("/{eleccionId}/resumen")
    public ResponseEntity<ReporteResumenDTO> resumen(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(reportesService.getResumen(eleccionId));
    }

    @GetMapping("/{eleccionId}/candidatos")
    public ResponseEntity<List<ReporteCandidatoDTO>> candidatos(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(reportesService.getResultadosCandidatos(eleccionId));
    }

    @GetMapping("/{eleccionId}/partidos")
    public ResponseEntity<List<ReportePartidoDTO>> partidos(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(reportesService.getResultadosPartidos(eleccionId));
    }

    @GetMapping("/{eleccionId}/listas")
    public ResponseEntity<List<ReporteListaDTO>> listas(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(reportesService.getResultadosListas(eleccionId));
    }

    @GetMapping("/{eleccionId}/exportar/csv")
    public ResponseEntity<byte[]> exportarCsv(@PathVariable Long eleccionId) {
        String csv = reportesService.exportCsv(eleccionId);
        byte[] bytes = csv.getBytes();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.setContentDispositionFormData("attachment", "reporte-votos.csv");
        return ResponseEntity.ok().headers(headers).body(bytes);
    }
}
