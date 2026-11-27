package com.electoral.controllers;

import com.electoral.dto.DashboardResponse;
import com.electoral.dto.ResultadoCandidato;
import com.electoral.dto.ResultadoDetalleVoto;
import com.electoral.dto.ResultadoLista;
import com.electoral.dto.ResultadoMesa;
import com.electoral.dto.SyncPushRequest;
import com.electoral.dto.SyncPushResponse;
import com.electoral.dto.VotoResponse;
import com.electoral.services.ExcelExportService;
import com.electoral.services.PdfExportService;
import com.electoral.services.SyncService;
import com.electoral.services.VotoService;
import com.electoral.util.CargoCategoriaUtil;
import com.electoral.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final VotoService votoService;
    private final PdfExportService pdfExportService;
    private final ExcelExportService excelExportService;

    @GetMapping("/eleccion/{eleccionesId}")
    public ResponseEntity<DashboardResponse> getDashboard(
            @PathVariable Long eleccionesId,
            @RequestParam(defaultValue = "false") boolean publico) {
        return ResponseEntity.ok(votoService.getDashboardData(eleccionesId, publico));
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
            @RequestParam(required = false) Long institucionId,
            @RequestParam(required = false) Long mesaId,
            @RequestParam(defaultValue = "false") boolean publico) {
        return ResponseEntity.ok(votoService.getDashboardDataConFiltros(eleccionesId, cargoId, partidoId, 
                zonaId, provinciaId, cantonId, parroquiaId, institucionId, mesaId, publico));
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
            @RequestParam(required = false) Long institucionId,
            @RequestParam(required = false) Long mesaId) {
        DashboardResponse data = votoService.getDashboardDataConFiltros(eleccionesId, cargoId, partidoId,
                zonaId, provinciaId, cantonId, parroquiaId, institucionId, mesaId);
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
            @RequestParam(required = false) Long institucionId,
            @RequestParam(required = false) Long mesaId) {
        DashboardResponse data = votoService.getDashboardDataConFiltros(eleccionesId, cargoId, partidoId,
                zonaId, provinciaId, cantonId, parroquiaId, institucionId, mesaId);

        // ── Totales globales ─────────────────────────────────────────────
        List<String[]> rowsTotales = new ArrayList<>();
        rowsTotales.add(new String[]{"Total Votos", String.valueOf(data.getTotalVotos())});
        rowsTotales.add(new String[]{"Votos Nulos", String.valueOf(data.getTotalVotosNulos())});
        rowsTotales.add(new String[]{"Votos en Blanco", String.valueOf(data.getTotalVotosBlanco())});
        rowsTotales.add(new String[]{"Ausentes", String.valueOf(data.getTotalAusentes())});
        long totalVotantes = (data.getTotalVotos() == null ? 0L : data.getTotalVotos())
                + (data.getTotalVotosNulos() == null ? 0L : data.getTotalVotosNulos())
                + (data.getTotalVotosBlanco() == null ? 0L : data.getTotalVotosBlanco());
        rowsTotales.add(new String[]{"Total General", String.valueOf(totalVotantes)});
        rowsTotales.add(new String[]{"Electores registrados (padrón)",
                String.valueOf(data.getTotalElectoresRegistrados())});
        rowsTotales.add(new String[]{"Votaron + ausentes",
                String.valueOf(totalVotantes + (data.getTotalAusentes() == null ? 0L : data.getTotalAusentes()))});
        rowsTotales.add(new String[]{"Total Mesas", String.valueOf(data.getTotalMesas())});
        rowsTotales.add(new String[]{"Mesas Cerradas", String.valueOf(data.getMesasCerradas())});
        rowsTotales.add(new String[]{"Mesas Abiertas", String.valueOf(data.getMesasAbiertas())});
        rowsTotales.add(new String[]{"% Escrutinio", String.format("%.2f%%", data.getPorcentajeMesasCerradas())});
        byte[] excel = excelExportService.exportExcel(
                "Resumen General", new String[]{"Concepto", "Cantidad"}, rowsTotales);

        // Detalle por candidato/lista y mesa → número de mesas por postulación
        List<ResultadoDetalleVoto> detalle = votoService.getDetalleResultadosParaExport(
                eleccionesId, cargoId, partidoId, zonaId, provinciaId, cantonId,
                parroquiaId, institucionId, mesaId);
        Map<String, Set<String>> mesasPorPostulacion = new HashMap<>();
        for (ResultadoDetalleVoto d : detalle) {
            String key = (d.isLista() ? "L" : "C") + d.getPostulacionId();
            mesasPorPostulacion.computeIfAbsent(key, k -> new HashSet<>())
                    .add(d.getRecintoNombre() + " | " + d.getMesaNumero());
        }

        // ── Una hoja por cargo ───────────────────────────────────────────
        for (String categoria : CargoCategoriaUtil.categoriasOrdenadas()) {
            boolean esLista = !CargoCategoriaUtil.ALCALDES.equals(categoria);
            String etiqueta = CargoCategoriaUtil.postulacion(categoria);
            String[] headers = esLista
                    ? new String[]{"Cargo", etiqueta, "N°", "Partido", "Votos", "Porcentaje", "Mesas"}
                    : new String[]{"Cargo", etiqueta, "Partido", "Votos", "Porcentaje", "Mesas"};
            List<String[]> rows = new ArrayList<>();

            if (!esLista && data.getResultados() != null) {
                for (ResultadoCandidato r : data.getResultados()) {
                    if (r.getCandidatoId() == null || r.getCandidatoId() <= 0) continue;
                    if (!categoria.equalsIgnoreCase(
                            CargoCategoriaUtil.categoria(r.getCargoNombre()))) continue;
                    Set<String> mesas = mesasPorPostulacion.get("C" + r.getCandidatoId());
                    rows.add(new String[]{r.getCargoNombre(), r.getNombreCompleto(), r.getPartidoNombre(),
                            String.valueOf(r.getTotalVotos()), porcentaje(r.getPorcentaje()),
                            String.valueOf(mesas == null ? 0 : mesas.size())});
                }
            }
            if (esLista && data.getResultadosListas() != null) {
                for (ResultadoLista r : data.getResultadosListas()) {
                    if (!categoria.equalsIgnoreCase(
                            CargoCategoriaUtil.categoria(r.getCargoNombre()))) continue;
                    Set<String> mesas = mesasPorPostulacion.get("L" + r.getListaId());
                    rows.add(new String[]{r.getCargoNombre(), r.getListaNombre(),
                            String.valueOf(r.getNumeroLista()),
                            r.getPartidoNombre() != null ? r.getPartidoNombre() : "—",
                            String.valueOf(r.getTotalVotos()), porcentaje(r.getPorcentaje()),
                            String.valueOf(mesas == null ? 0 : mesas.size())});
                }
            }
            excel = excelExportService.appendSheetToExcel(excel, categoria, headers, rows);
        }

        // ── Desglose por mesa ────────────────────────────────────────────
        List<String[]> rowsDetalle = detalle.stream()
                .map(d -> new String[]{d.getCategoria(), d.getCantonNombre(), d.getParroquiaNombre(),
                        d.getRecintoNombre(), d.getMesaNumero(), d.getPostulacionNombre(),
                        d.getPartidoNombre(), String.valueOf(d.getTotalVotos())})
                .collect(Collectors.toList());
        excel = excelExportService.appendSheetToExcel(excel, "Detalle por Mesa",
                new String[]{"Categoría", "Cantón", "Parroquia", "Recinto", "Mesa",
                        "Postulación", "Partido", "Votos"}, rowsDetalle);

        // ── Control de ausentes por mesa ────────────────────────────────
        List<String[]> rowsControl = new ArrayList<>();
        if (data.getResultadosMesa() != null) {
            for (ResultadoMesa m : data.getResultadosMesa()) {
                long total = m.getTotalVotos() == null ? 0L : m.getTotalVotos();
                long ausentes = m.getAusentes() == null ? 0L : m.getAusentes();
                Integer padron = m.getElectoresRegistrados();
                rowsControl.add(new String[]{
                        m.getMesaNumero(),
                        m.getInstitucionNombre() != null ? m.getInstitucionNombre() : "",
                        Boolean.TRUE.equals(m.getCerrada()) ? "Cerrada" : "Abierta",
                        String.valueOf(total),
                        String.valueOf(m.getVotosNulos() == null ? 0L : m.getVotosNulos()),
                        String.valueOf(m.getVotosBlanco() == null ? 0L : m.getVotosBlanco()),
                        String.valueOf(ausentes),
                        padron == null ? "" : String.valueOf(padron),
                        padron == null ? "" : String.valueOf(padron - total - ausentes)
                });
            }
        }
        excel = excelExportService.appendSheetToExcel(excel, "Control por Mesa",
                new String[]{"Mesa", "Recinto", "Estado", "Votos", "Nulos", "Blancos",
                        "Ausentes", "Electores registrados", "Padrón - (votos + ausentes)"},
                rowsControl);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("attachment", "resultados.xlsx");
        return ResponseEntity.ok().headers(httpHeaders).body(excel);
    }

    private static String porcentaje(Double valor) {
        return String.format("%.2f%%", valor == null ? 0.0 : valor);
    }
}

@RestController
@RequiredArgsConstructor
class WebSocketController {
    private final VotoService votoService;
    private final SyncService syncService;
    private final SecurityUtil securityUtil;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/actualizar-resultados/{eleccionId}")
    @SendTo("/topic/resultados/{eleccionId}")
    public DashboardResponse actualizarResultados(@PathVariable Long eleccionId) {
        return votoService.getDashboardData(eleccionId);
    }

    @MessageMapping("/sync/push")
    public void syncPush(SyncPushRequest request) {
        Long usuarioId = securityUtil.getCurrentUserId();
        SyncPushResponse response = syncService.processPush(request, usuarioId);
        if (response.getResults() != null && !response.getResults().isEmpty()) {
            messagingTemplate.convertAndSend("/topic/sync", response);
            if (request.getOperations() != null) {
                for (com.electoral.dto.SyncOperationDTO op : request.getOperations()) {
                    if (op.getData() != null && op.getData().containsKey("eleccionesId")) {
                        Object raw = op.getData().get("eleccionesId");
                        if (raw != null) {
                            Long eleccionId = Long.valueOf(raw.toString());
                            messagingTemplate.convertAndSend("/topic/resultados/" + eleccionId,
                                    java.util.Map.of("tipo", "data-changed"));
                            break;
                        }
                    }
                }
            }
        }
    }
}
