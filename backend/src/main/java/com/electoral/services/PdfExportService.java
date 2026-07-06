package com.electoral.services;

import com.electoral.dto.DashboardResponse;
import com.electoral.dto.ResultadoCandidato;
import com.electoral.dto.ResultadoRecinto;
import com.electoral.entities.Mesa;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.events.Event;
import com.itextpdf.kernel.events.IEventHandler;
import com.itextpdf.kernel.events.PdfDocumentEvent;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.kernel.pdf.xobject.PdfFormXObject;
import com.itextpdf.layout.Canvas;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.AreaBreak;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.itextpdf.layout.properties.VerticalAlignment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PdfExportService {

    private final ConfiguracionSistemaService configService;

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    private static final DeviceRgb[] CHART_COLORS = {
        new DeviceRgb(139, 92, 246),
        new DeviceRgb(99, 102, 241),
        new DeviceRgb(59, 130, 246),
        new DeviceRgb(6, 182, 212),
        new DeviceRgb(34, 197, 94),
        new DeviceRgb(234, 179, 8),
        new DeviceRgb(249, 115, 22),
        new DeviceRgb(239, 68, 68),
        new DeviceRgb(236, 72, 153),
        new DeviceRgb(168, 85, 247),
    };

    private static final DeviceRgb C_DARK = new DeviceRgb(15, 23, 42);
    private static final DeviceRgb C_GRAY = new DeviceRgb(100, 116, 139);
    private static final DeviceRgb C_LIGHT_BG = new DeviceRgb(248, 250, 252);
    private static final DeviceRgb C_MUTED = new DeviceRgb(241, 245, 249);
    private static final DeviceRgb C_PRIMARY = new DeviceRgb(139, 92, 246);
    private static final DeviceRgb C_INFO = new DeviceRgb(6, 182, 212);
    private static final DeviceRgb C_SUCCESS = new DeviceRgb(34, 197, 94);
    private static final DeviceRgb C_WARNING = new DeviceRgb(249, 115, 22);
    private static final DeviceRgb C_WHITE = new DeviceRgb(255, 255, 255);
    private static final DeviceRgb C_BORDER = new DeviceRgb(226, 232, 240);
    private static final DeviceRgb C_HEADER_BG = new DeviceRgb(30, 41, 59);
    private static final DeviceRgb C_SUBTLE = new DeviceRgb(148, 163, 184);

    // ── Headers & Footers ──────────────────────────────────────────────

    private void configurarDocumento(PdfDocument pdf, Document document, String titulo) {
        String partyName = configService.getConfiguracion().getNombrePartido();
        byte[] logoBytes = configService.getLogo();
        document.setMargins(65, 36, 50, 36);
        pdf.addEventHandler(PdfDocumentEvent.END_PAGE, new PdfFooterEventHandler());
        pdf.addEventHandler(PdfDocumentEvent.START_PAGE, new PdfHeaderEventHandler(partyName, logoBytes));
    }

    private static class PdfHeaderEventHandler implements IEventHandler {
        private final String partyName;
        private final byte[] logoBytes;

        PdfHeaderEventHandler(String partyName, byte[] logoBytes) {
            this.partyName = partyName;
            this.logoBytes = logoBytes;
        }

        @Override
        public void handleEvent(Event event) {
            PdfDocumentEvent docEvent = (PdfDocumentEvent) event;
            PdfDocument pdf = docEvent.getDocument();
            PdfPage page = docEvent.getPage();
            Rectangle ps = page.getPageSize();
            PdfCanvas canvas = new PdfCanvas(page.newContentStreamBefore(), page.getResources(), pdf);

            try (Canvas hc = new Canvas(canvas, new Rectangle(ps.getLeft() + 36, ps.getTop() - 55, ps.getWidth() - 72, 45))) {
                float cw = (ps.getWidth() - 72) / 3;
                if (logoBytes != null && logoBytes.length > 0) {
                    try {
                        Image logo = new Image(ImageDataFactory.create(logoBytes));
                        logo.scaleToFit(35, 35);
                        hc.add(logo.setFixedPosition(ps.getLeft() + 36, ps.getTop() - 50, 35));
                    } catch (Exception e) { /* ignore */ }
                }
                hc.add(new Paragraph(partyName).setFontSize(10).setBold().setTextAlignment(TextAlignment.CENTER)
                        .setFixedPosition(ps.getLeft() + 36 + cw, ps.getTop() - 48, cw));
                hc.add(new Paragraph("ALANTEK").setFontSize(9).setBold().setTextAlignment(TextAlignment.RIGHT)
                        .setFixedPosition(ps.getLeft() + 36 + cw * 2, ps.getTop() - 48, cw));
            }
            canvas.setStrokeColor(ColorConstants.LIGHT_GRAY);
            canvas.moveTo(ps.getLeft() + 36, ps.getTop() - 60);
            canvas.lineTo(ps.getRight() - 36, ps.getTop() - 60);
            canvas.stroke();
        }
    }

    private static class PdfFooterEventHandler implements IEventHandler {
        @Override
        public void handleEvent(Event event) {
            PdfDocumentEvent docEvent = (PdfDocumentEvent) event;
            PdfDocument pdf = docEvent.getDocument();
            PdfPage page = docEvent.getPage();
            Rectangle ps = page.getPageSize();
            PdfCanvas canvas = new PdfCanvas(page.newContentStreamBefore(), page.getResources(), pdf);

            canvas.setStrokeColor(ColorConstants.LIGHT_GRAY);
            canvas.moveTo(ps.getLeft() + 36, ps.getBottom() + 40);
            canvas.lineTo(ps.getRight() - 36, ps.getBottom() + 40);
            canvas.stroke();

            try (Canvas fc = new Canvas(canvas, new Rectangle(ps.getLeft() + 36, ps.getBottom() + 10, ps.getWidth() - 72, 25))) {
                float cw = (ps.getWidth() - 72) / 3;
                String now = LocalDateTime.now().format(DATE_FMT);
                fc.add(new Paragraph("Impreso: " + now).setFontSize(7).setFontColor(ColorConstants.GRAY)
                        .setFixedPosition(ps.getLeft() + 36, ps.getBottom() + 12, cw));
                String pn = "Pag. " + pdf.getPageNumber(page) + " de " + pdf.getNumberOfPages();
                fc.add(new Paragraph(pn).setFontSize(7).setFontColor(ColorConstants.GRAY).setTextAlignment(TextAlignment.CENTER)
                        .setFixedPosition(ps.getLeft() + 36 + cw, ps.getBottom() + 12, cw));
                fc.add(new Paragraph("Sistema de Conteo Electoral").setFontSize(7).setFontColor(ColorConstants.GRAY)
                        .setTextAlignment(TextAlignment.RIGHT)
                        .setFixedPosition(ps.getLeft() + 36 + cw * 2, ps.getBottom() + 12, cw));
            }
        }
    }

    // ── Dashboard PDF (enhanced) ──────────────────────────────────────

    public byte[] exportDashboardPdf(DashboardResponse data) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (PdfWriter writer = new PdfWriter(baos);
             PdfDocument pdf = new PdfDocument(writer);
             Document doc = new Document(pdf)) {

            configurarDocumento(pdf, doc, "Resultados Electorales");

            addTitle(doc, data);
            doc.add(new Paragraph(" ").setFontSize(6));
            addStatCards(doc, data);
            doc.add(new Paragraph(" ").setFontSize(8));
            addBarChart(doc, pdf, data.getResultados());
            doc.add(new Paragraph(" ").setFontSize(8));
            addPieChart(doc, pdf, data.getResultados());

            doc.add(new AreaBreak());
            addDetailTable(doc, data);

            if (data.getResultadosRecinto() != null && !data.getResultadosRecinto().isEmpty()) {
                doc.add(new Paragraph(" ").setFontSize(10));
                addRecintoTable(doc, data);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al generar PDF", e);
        }
        return baos.toByteArray();
    }

    // ── Title ─────────────────────────────────────────────────────────

    private void addTitle(Document doc, DashboardResponse data) {
        doc.add(new Paragraph("INFORME DE RESULTADOS ELECTORALES")
                .setFontSize(22).setBold().setTextAlignment(TextAlignment.CENTER)
                .setFontColor(C_DARK));
        doc.add(new Paragraph(data.getEleccionNombre())
                .setFontSize(15).setTextAlignment(TextAlignment.CENTER)
                .setFontColor(C_GRAY));
        doc.add(new Paragraph("Generado: " + LocalDateTime.now().format(DATE_FMT))
                .setFontSize(8).setTextAlignment(TextAlignment.CENTER)
                .setFontColor(C_SUBTLE));
    }

    // ── Stat Cards ────────────────────────────────────────────────────

    private void addStatCards(Document doc, DashboardResponse data) {
        Table grid = new Table(UnitValue.createPercentArray(new float[]{1, 1, 1, 1}));
        grid.setWidth(UnitValue.createPercentValue(100));
        grid.addCell(statCell("Total Votos", String.format("%,d", data.getTotalVotos()), C_PRIMARY));
        grid.addCell(statCell("Total Mesas", String.format("%,d", data.getTotalMesas()), C_INFO));
        grid.addCell(statCell("Mesas Cerradas", String.format("%,d", data.getMesasCerradas()), C_SUCCESS));
        grid.addCell(statCell("Mesas Abiertas", String.format("%,d", data.getMesasAbiertas()), C_WARNING));
        doc.add(grid);

        Table row2 = new Table(UnitValue.createPercentArray(new float[]{1, 1, 1, 1}));
        row2.setWidth(UnitValue.createPercentValue(100));
        row2.addCell(statCell("% Escrutinio", String.format("%.1f%%", data.getPorcentajeMesasCerradas()), C_PRIMARY));
        for (int i = 0; i < 3; i++) {
            Cell e = new Cell(); e.setBorder(Border.NO_BORDER); e.setBackgroundColor(C_LIGHT_BG); row2.addCell(e);
        }
        doc.add(row2);
    }

    private Cell statCell(String label, String value, Color accent) {
        Cell c = new Cell();
        c.setBorder(Border.NO_BORDER);
        c.setBackgroundColor(C_LIGHT_BG);
        c.setPadding(10);
        c.setVerticalAlignment(VerticalAlignment.MIDDLE);
        c.add(new Paragraph(label).setFontSize(8).setFontColor(C_GRAY).setTextAlignment(TextAlignment.CENTER));
        c.add(new Paragraph(value).setFontSize(18).setBold().setFontColor(accent).setTextAlignment(TextAlignment.CENTER));
        return c;
    }

    // ── Bar Chart ─────────────────────────────────────────────────────

    private void addBarChart(Document doc, PdfDocument pdf, List<ResultadoCandidato> resultados) {
        if (resultados == null || resultados.isEmpty()) return;
        doc.add(new Paragraph("Distribucion de Votos por Candidato")
                .setFontSize(13).setBold().setFontColor(C_DARK));

        List<ResultadoCandidato> top = resultados.size() > 10 ? resultados.subList(0, 10) : resultados;
        long maxV = top.stream().mapToLong(ResultadoCandidato::getTotalVotos).max().orElse(1);

        float cw = 500f, bh = 18f, gap = 7f, pd = 8f;
        float nw = 130f, vw = 55f, bw = cw - nw - vw - pd * 2;
        float ch = pd * 2 + top.size() * (bh + gap);

        PdfFormXObject xo = new PdfFormXObject(new Rectangle(cw, ch));
        PdfCanvas cv = new PdfCanvas(xo, pdf);
        cv.saveState(); cv.setFillColor(C_LIGHT_BG); cv.rectangle(0, 0, cw, ch); cv.fill(); cv.restoreState();

        float y = ch - pd - bh;
        for (int i = 0; i < top.size(); i++) {
            ResultadoCandidato r = top.get(i);
            float bw2 = Math.max((float) r.getTotalVotos() / maxV * bw, 2);
            Color co = CHART_COLORS[i % CHART_COLORS.length];
            cv.saveState(); cv.setFillColor(co); cv.roundRectangle(nw + pd, y, bw2, bh, 3); cv.fill(); cv.restoreState();
            cv.saveState(); cv.setFillColor(co); cv.circle(10f, y + bh / 2, 6f); cv.fill(); cv.restoreState();
            y -= (bh + gap);
        }

        Canvas ctx = new Canvas(cv, new Rectangle(cw, ch));
        y = ch - pd - bh;
        for (int i = 0; i < top.size(); i++) {
            ResultadoCandidato r = top.get(i);
            String nm = r.getNombreCompleto();
            if (nm.length() > 22) nm = nm.substring(0, 20) + "..";

            ctx.add(new Paragraph(String.valueOf(i + 1)).setFontSize(7).setBold()
                    .setFontColor(C_WHITE).setFixedPosition(4f, y + 1f, 13f)
                    .setTextAlignment(TextAlignment.CENTER));

            ctx.add(new Paragraph(nm).setFontSize(7).setFontColor(C_DARK)
                    .setFixedPosition(22f, y + 0.5f, nw - 22f));

            ctx.add(new Paragraph(String.format("%,d", r.getTotalVotos())).setFontSize(8).setBold()
                    .setFontColor(C_DARK).setTextAlignment(TextAlignment.RIGHT)
                    .setFixedPosition(nw + pd, y + 0.5f, bw + 5f));

            ctx.add(new Paragraph(String.format("%.1f%%", r.getPorcentaje())).setFontSize(7)
                    .setFontColor(ColorConstants.GRAY).setTextAlignment(TextAlignment.RIGHT)
                    .setFixedPosition(nw + pd + bw + 5f, y + 0.5f, vw - 5f));

            y -= (bh + gap);
        }
        ctx.close();

        doc.add(new Image(xo).setWidth(UnitValue.createPercentValue(100)));
    }

    // ── Pie Chart ─────────────────────────────────────────────────────

    private void addPieChart(Document doc, PdfDocument pdf, List<ResultadoCandidato> resultados) {
        if (resultados == null || resultados.isEmpty()) return;
        doc.add(new Paragraph("Proporcion de Votos por Candidato")
                .setFontSize(13).setBold().setFontColor(C_DARK));

        long total = resultados.stream().mapToLong(ResultadoCandidato::getTotalVotos).sum();
        if (total == 0) return;

        List<ResultadoCandidato> top = resultados.size() > 8 ? resultados.subList(0, 8) : resultados;
        long otros = total - top.stream().mapToLong(ResultadoCandidato::getTotalVotos).sum();

        float cw = 500f, ch = 280f, r = 90f, cx = 140f, cy = ch / 2f;
        float lx = 270f, ly = ch - 35f;

        PdfFormXObject xo = new PdfFormXObject(new Rectangle(cw, ch));
        PdfCanvas cv = new PdfCanvas(xo, pdf);
        cv.saveState(); cv.setFillColor(C_WHITE); cv.rectangle(0, 0, cw, ch); cv.fill(); cv.restoreState();

        float sa = 90f;
        for (int i = 0; i < top.size(); i++) {
            ResultadoCandidato cand = top.get(i);
            float sw = -(float) cand.getTotalVotos() / total * 360f;
            if (Math.abs(sw) < 0.5) continue;
            Color co = CHART_COLORS[i % CHART_COLORS.length];
            double rad = Math.toRadians(sa);
            float sx = cx + r * (float) Math.cos(rad), sy = cy + r * (float) Math.sin(rad);
            cv.saveState(); cv.setFillColor(co); cv.moveTo(cx, cy); cv.lineTo(sx, sy);
            cv.arc(cx - r, cy - r, cx + r, cy + r, sa, sw); cv.closePath(); cv.fill(); cv.restoreState();
            sa += sw;
        }
        if (otros > 0) {
            float sw = -(float) otros / total * 360f;
            double rad = Math.toRadians(sa);
            float sx = cx + r * (float) Math.cos(rad), sy = cy + r * (float) Math.sin(rad);
            cv.saveState(); cv.setFillColor(new DeviceRgb(203, 213, 225));
            cv.moveTo(cx, cy); cv.lineTo(sx, sy);
            cv.arc(cx - r, cy - r, cx + r, cy + r, sa, sw); cv.closePath(); cv.fill(); cv.restoreState();
        }
        cv.saveState(); cv.setStrokeColor(C_BORDER); cv.setLineWidth(1); cv.circle(cx, cy, r); cv.stroke(); cv.restoreState();

        Canvas ctx = new Canvas(cv, new Rectangle(cw, ch));
        ctx.add(new Paragraph(String.format("%,d", total)).setFontSize(14).setBold()
                .setFontColor(C_DARK).setFixedPosition(cx - 35f, cy - 12f, 70f)
                .setTextAlignment(TextAlignment.CENTER));
        ctx.add(new Paragraph("Votos").setFontSize(7).setFontColor(C_GRAY)
                .setFixedPosition(cx - 35f, cy - 26f, 70f)
                .setTextAlignment(TextAlignment.CENTER));

        for (int i = 0; i < top.size(); i++) {
            ResultadoCandidato cnd = top.get(i);
            Color co2 = CHART_COLORS[i % CHART_COLORS.length];
            String pct = String.format("%.1f%%", cnd.getPorcentaje());
            String nm = cnd.getNombreCompleto();
            if (nm.length() > 25) nm = nm.substring(0, 23) + "..";
            ctx.add(new Paragraph("\u25A0").setFontSize(10).setFontColor(co2)
                    .setFixedPosition(lx, ly - 1f, 15f));
            ctx.add(new Paragraph(nm + "  " + pct).setFontSize(7).setFontColor(C_DARK)
                    .setFixedPosition(lx + 14f, ly - 3f, 200f));
            ly -= 20f;
        }
        if (otros > 0) {
            double op = (double) otros / total * 100;
            ctx.add(new Paragraph("\u25A0").setFontSize(10).setFontColor(new DeviceRgb(203, 213, 225))
                    .setFixedPosition(lx, ly - 1f, 15f));
            ctx.add(new Paragraph("Otros  " + String.format("%.1f%%", op)).setFontSize(7).setFontColor(C_DARK)
                    .setFixedPosition(lx + 14f, ly - 3f, 200f));
        }
        ctx.close();

        doc.add(new Image(xo).setWidth(UnitValue.createPercentValue(100)));
    }

    // ── Detail Table ──────────────────────────────────────────────────

    private void addDetailTable(Document doc, DashboardResponse data) {
        doc.add(new Paragraph("Detalle de Resultados por Candidato")
                .setFontSize(14).setBold().setFontColor(C_DARK));

        Table t = new Table(UnitValue.createPercentArray(new float[]{0.5f, 3f, 2.5f, 2f, 1.5f, 1.5f}));
        t.setWidth(UnitValue.createPercentValue(100));
        String[] hd = {"#", "Candidato", "Partido", "Cargo", "Votos", "%"};
        for (String h : hd) {
            Cell hc = new Cell().add(new Paragraph(h).setBold().setFontSize(8).setFontColor(C_WHITE));
            hc.setBackgroundColor(C_HEADER_BG); hc.setPadding(6); hc.setTextAlignment(TextAlignment.CENTER);
            t.addHeaderCell(hc);
        }
        if (data.getResultados() != null) {
            for (int i = 0; i < data.getResultados().size(); i++) {
                ResultadoCandidato r = data.getResultados().get(i);
                boolean odd = i % 2 == 1;
                t.addCell(td(String.valueOf(i + 1), odd, TextAlignment.CENTER));
                t.addCell(td(r.getNombreCompleto(), odd, TextAlignment.LEFT));
                t.addCell(td(r.getPartidoNombre(), odd, TextAlignment.LEFT));
                t.addCell(td(r.getCargoNombre(), odd, TextAlignment.LEFT));
                t.addCell(td(String.format("%,d", r.getTotalVotos()), odd, TextAlignment.RIGHT));
                t.addCell(td(String.format("%.1f%%", r.getPorcentaje()), odd, TextAlignment.RIGHT));
            }
        }
        doc.add(t);
    }

    private Cell td(String text, boolean odd, TextAlignment align) {
        Cell c = new Cell().add(new Paragraph(text).setFontSize(8).setFontColor(C_DARK));
        c.setTextAlignment(align); c.setPadding(5);
        if (odd) c.setBackgroundColor(C_MUTED);
        return c;
    }

    // ── Recinto Table ─────────────────────────────────────────────────

    private void addRecintoTable(Document doc, DashboardResponse data) {
        doc.add(new Paragraph("Resultados por Institucion")
                .setFontSize(14).setBold().setFontColor(C_DARK));

        Table t = new Table(UnitValue.createPercentArray(new float[]{0.5f, 4f, 1.5f, 1.5f}));
        t.setWidth(UnitValue.createPercentValue(100));
        String[] hd = {"#", "Institucion", "Votos", "%"};
        for (String h : hd) {
            Cell hc = new Cell().add(new Paragraph(h).setBold().setFontSize(8).setFontColor(C_WHITE));
            hc.setBackgroundColor(C_HEADER_BG); hc.setPadding(6); hc.setTextAlignment(TextAlignment.CENTER);
            t.addHeaderCell(hc);
        }
        if (data.getResultadosRecinto() != null) {
            for (int i = 0; i < data.getResultadosRecinto().size(); i++) {
                ResultadoRecinto r = data.getResultadosRecinto().get(i);
                boolean odd = i % 2 == 1;
                t.addCell(td(String.valueOf(i + 1), odd, TextAlignment.CENTER));
                t.addCell(td(r.getRecintoNombre(), odd, TextAlignment.LEFT));
                t.addCell(td(String.format("%,d", r.getTotalVotos()), odd, TextAlignment.RIGHT));
                t.addCell(td(String.format("%.1f%%", r.getPorcentaje()), odd, TextAlignment.RIGHT));
            }
        }
        doc.add(t);
    }

    // ── Legacy PDF exports ────────────────────────────────────────────

    public byte[] exportTablePdf(String title, String[] headers, List<String[]> data, float[] columnWidths) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (PdfWriter writer = new PdfWriter(baos);
             PdfDocument pdf = new PdfDocument(writer);
             Document document = new Document(pdf)) {

            configurarDocumento(pdf, document, title);
            document.add(new Paragraph(" ").setFontSize(14));
            document.add(new Paragraph(title).setFontSize(18).setBold().setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(" "));

            Table table = new Table(UnitValue.createPercentArray(columnWidths));
            table.setWidth(UnitValue.createPercentValue(100));
            for (String header : headers) {
                table.addHeaderCell(new Cell().add(new Paragraph(header).setBold()));
            }
            if (data != null) {
                for (String[] row : data) {
                    for (String cell : row) {
                        table.addCell(new Cell().add(new Paragraph(cell != null ? cell : "")));
                    }
                }
            }
            document.add(table);
        } catch (Exception e) {
            throw new RuntimeException("Error al generar PDF", e);
        }
        return baos.toByteArray();
    }

    public byte[] exportActaMesa(Mesa mesa, String institucionNombre, String parroquiaNombre,
                                  String cantonNombre, String provinciaNombre, String zonaNombre,
                                  String eleccionNombre, List<String[]> resultados,
                                  Long totalVotos, LocalDateTime fechaCierre) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (PdfWriter writer = new PdfWriter(baos);
             PdfDocument pdf = new PdfDocument(writer);
             Document document = new Document(pdf)) {

            configurarDocumento(pdf, document, "ACTA DE CIERRE DE MESA");

            document.add(new Paragraph(" ").setFontSize(14));
            document.add(new Paragraph("ACTA DE CIERRE DE MESA")
                    .setFontSize(22).setBold().setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(" ").setFontSize(4));

            document.add(new Paragraph("DATOS DE LA ELECCION").setFontSize(14).setBold()
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(eleccionNombre).setFontSize(12).setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("INFORMACION DE LA MESA").setFontSize(14).setBold().setUnderline());
            document.add(new Paragraph("Mesa Nro: " + mesa.getNumero()));
            document.add(new Paragraph("Sexo: " + mesa.getSexo().name()));
            document.add(new Paragraph("Institucion: " + institucionNombre));
            document.add(new Paragraph("Parroquia: " + parroquiaNombre));
            document.add(new Paragraph("Canton: " + cantonNombre));
            document.add(new Paragraph("Provincia: " + provinciaNombre));
            document.add(new Paragraph("Zona: " + zonaNombre));
            document.add(new Paragraph("Fecha de Cierre: " + fechaCierre.format(DATE_FMT)));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("RESULTADOS DE VOTACION").setFontSize(14).setBold().setUnderline());
            document.add(new Paragraph("Total Votos Emitidos: " + totalVotos));
            document.add(new Paragraph(" "));

            float[] colWidths = {4, 3, 2, 2};
            Table table = new Table(UnitValue.createPercentArray(colWidths));
            table.setWidth(UnitValue.createPercentValue(100));
            String[] hdrs = {"Candidato", "Partido", "Cargo", "Votos"};
            for (String h : hdrs) {
                table.addHeaderCell(new Cell().add(new Paragraph(h).setBold()));
            }
            if (resultados != null) {
                for (String[] row : resultados) {
                    for (String cell : row) {
                        table.addCell(new Cell().add(new Paragraph(cell != null ? cell : "")));
                    }
                }
            }
            document.add(table);
            document.add(new Paragraph(" "));

            document.add(new Paragraph("FIRMAS DE RESPONSABILIDAD").setFontSize(14).setBold().setUnderline());
            document.add(new Paragraph(" "));

            float[] sigCols = {3, 3, 3};
            Table sigTable = new Table(UnitValue.createPercentArray(sigCols));
            sigTable.setWidth(UnitValue.createPercentValue(100));
            String[] cargos = {"PRESIDENTE", "SECRETARIO", "VOCAL"};
            for (String cargo : cargos) {
                Cell cell = new Cell();
                cell.add(new Paragraph(" ").setFontSize(8));
                cell.add(new Paragraph("____________________________").setTextAlignment(TextAlignment.CENTER));
                cell.add(new Paragraph(cargo).setBold().setTextAlignment(TextAlignment.CENTER));
                cell.add(new Paragraph(" ").setFontSize(4));
                cell.add(new Paragraph("Nombres: ___________________").setFontSize(10));
                cell.add(new Paragraph("C.I.: _______________________").setFontSize(10));
                sigTable.addCell(cell);
            }
            document.add(sigTable);
        } catch (Exception e) {
            throw new RuntimeException("Error al generar acta de cierre", e);
        }
        return baos.toByteArray();
    }
}
