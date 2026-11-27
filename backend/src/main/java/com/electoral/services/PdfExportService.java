package com.electoral.services;

import com.electoral.dto.DashboardResponse;
import com.electoral.dto.ResultadoCandidato;
import com.electoral.dto.ResultadoGeo;
import com.electoral.dto.ResultadoLista;
import com.electoral.dto.ResultadoMesa;
import com.electoral.dto.ResultadoRecinto;
import com.electoral.entities.Mesa;
import com.electoral.util.AlantekLogoUtil;
import com.electoral.util.CargoCategoriaUtil;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.events.Event;
import com.itextpdf.kernel.events.IEventHandler;
import com.itextpdf.kernel.events.PdfDocumentEvent;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.kernel.pdf.xobject.PdfFormXObject;
import com.itextpdf.layout.Canvas;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.AreaBreak;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.itextpdf.layout.properties.VerticalAlignment;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class PdfExportService {

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
    private static final DeviceRgb C_BRAND = new DeviceRgb(72, 86, 60);
    private static final DeviceRgb C_BRAND_DARK = new DeviceRgb(44, 54, 38);
    private static final DeviceRgb C_ACCENT = new DeviceRgb(217, 119, 50);

    // ── Headers & Footers ──────────────────────────────────────────────

    private void configurarDocumento(PdfDocument pdf, Document document, String titulo) {
        document.setMargins(92, 36, 52, 36);
        pdf.addEventHandler(PdfDocumentEvent.END_PAGE, new PdfFooterEventHandler());
        // El logo se reduce una sola vez para no repetir una imagen pesada en cada página.
        ImageData logoData = prepararLogo(AlantekLogoUtil.logoBytes());
        pdf.addEventHandler(PdfDocumentEvent.START_PAGE, new PdfHeaderEventHandler(titulo, logoData));
    }

    /** Logo reducido a 256x256 px; si no se puede procesar, se omite. */
    private static ImageData prepararLogo(byte[] logoBytes) {
        if (logoBytes == null || logoBytes.length == 0) return null;
        try {
            java.awt.image.BufferedImage src =
                    javax.imageio.ImageIO.read(new java.io.ByteArrayInputStream(logoBytes));
            if (src == null) return null;
            int max = 256;
            double escala = Math.min(max / (double) src.getWidth(), max / (double) src.getHeight());
            int w = Math.max(1, (int) Math.round(src.getWidth() * escala));
            int h = Math.max(1, (int) Math.round(src.getHeight() * escala));
            java.awt.image.BufferedImage out = new java.awt.image.BufferedImage(
                    w, h, java.awt.image.BufferedImage.TYPE_INT_ARGB);
            java.awt.Graphics2D g = out.createGraphics();
            g.setRenderingHint(java.awt.RenderingHints.KEY_INTERPOLATION,
                    java.awt.RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g.drawImage(src, 0, 0, w, h, null);
            g.dispose();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            javax.imageio.ImageIO.write(out, "PNG", baos);
            return ImageDataFactory.create(baos.toByteArray());
        } catch (Exception e) {
            return null;
        }
    }

    private static class PdfHeaderEventHandler implements IEventHandler {
        private final String titulo;
        private final ImageData logoData;

        PdfHeaderEventHandler(String titulo, ImageData logoData) {
            this.titulo = titulo;
            this.logoData = logoData;
        }

        @Override
        public void handleEvent(Event event) {
            PdfDocumentEvent docEvent = (PdfDocumentEvent) event;
            PdfDocument pdf = docEvent.getDocument();
            PdfPage page = docEvent.getPage();
            Rectangle ps = page.getPageSize();
            PdfCanvas canvas = new PdfCanvas(page.newContentStreamBefore(), page.getResources(), pdf);

            float left = ps.getLeft() + 36;
            float right = ps.getRight() - 36;
            float logoSize = 64f;
            float brandX = left;

            if (logoData != null) {
                try {
                    // Rectangle fija el tamaño en puntos, sin depender del DPI del PNG.
                    canvas.addImageFittedIntoRectangle(logoData,
                            new Rectangle(left, ps.getTop() - 86, logoSize, logoSize), true);
                    brandX = left + logoSize + 14f;
                } catch (Exception e) { /* se conserva solo el texto */ }
            }

            try (Canvas hc = new Canvas(canvas, new Rectangle(brandX, ps.getTop() - 84, right - brandX, 70))) {
                hc.add(new Paragraph("ALANTEK")
                        .setFontSize(21).setBold().setFontColor(C_BRAND_DARK).setMarginBottom(0));
                hc.add(new Paragraph("SISTEMA DE CONTEO ELECTORAL")
                        .setFontSize(8).setBold().setFontColor(C_BRAND).setMarginTop(0));
                if (titulo != null && !titulo.isBlank()) {
                    hc.add(new Paragraph(titulo).setFontSize(9).setFontColor(C_GRAY)
                            .setTextAlignment(TextAlignment.RIGHT).setMarginTop(4));
                }
            }

            // Doble línea: acento ALANTEK + separator institucional.
            canvas.setLineWidth(1.4f);
            canvas.setStrokeColor(C_ACCENT);
            canvas.moveTo(left, ps.getTop() - 92);
            canvas.lineTo(left + 150, ps.getTop() - 92);
            canvas.stroke();
            canvas.setStrokeColor(C_BRAND);
            canvas.moveTo(left + 150, ps.getTop() - 92);
            canvas.lineTo(right, ps.getTop() - 92);
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

            canvas.setLineWidth(0.8f);
            canvas.setStrokeColor(C_BRAND);
            canvas.moveTo(ps.getLeft() + 36, ps.getBottom() + 42);
            canvas.lineTo(ps.getRight() - 36, ps.getBottom() + 42);
            canvas.stroke();

            try (Canvas fc = new Canvas(canvas,
                    new Rectangle(ps.getLeft() + 36, ps.getBottom() + 10, ps.getWidth() - 72, 26))) {
                float cw = (ps.getWidth() - 72) / 3;
                String now = LocalDateTime.now().format(DATE_FMT);
                fc.add(new Paragraph("ALANTEK  ·  Sistema de Conteo Electoral")
                        .setFontSize(7.5f).setFontColor(C_GRAY)
                        .setFixedPosition(ps.getLeft() + 36, ps.getBottom() + 14, cw));
                // En END_PAGE el total aún puede crecer (saltos de página),
                // por eso se muestra solo el número de la página actual.
                fc.add(new Paragraph("Página " + pdf.getPageNumber(page))
                        .setFontSize(7.5f).setFontColor(C_GRAY).setTextAlignment(TextAlignment.CENTER)
                        .setFixedPosition(ps.getLeft() + 36 + cw, ps.getBottom() + 14, cw));
                fc.add(new Paragraph("Emitido: " + now)
                        .setFontSize(7.5f).setFontColor(C_GRAY).setTextAlignment(TextAlignment.RIGHT)
                        .setFixedPosition(ps.getLeft() + 36 + cw * 2, ps.getBottom() + 14, cw));
            }
        }
    }

    // ── Dashboard PDF (enhanced) ──────────────────────────────────────

    public byte[] exportDashboardPdf(DashboardResponse data) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (PdfWriter writer = new PdfWriter(baos);
             PdfDocument pdf = new PdfDocument(writer);
             // Las tablas de detalle son anchas; en A4 horizontal caben sin recortarse.
             Document doc = new Document(pdf, PageSize.A4.rotate())) {

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

            if (data.getResultadosListas() != null && !data.getResultadosListas().isEmpty()) {
                doc.add(new AreaBreak());
                addListasTable(doc, data);
            }

            if (data.getResultadosProvincia() != null && !data.getResultadosProvincia().isEmpty()) {
                doc.add(new AreaBreak());
                addGeoTable(doc, "Resultados por Provincia", data.getResultadosProvincia());
            }

            if (data.getResultadosParroquia() != null && !data.getResultadosParroquia().isEmpty()) {
                doc.add(new AreaBreak());
                addGeoTable(doc, "Resultados por Parroquia", data.getResultadosParroquia());
            }

            if (data.getResultadosRecinto() != null && !data.getResultadosRecinto().isEmpty()) {
                doc.add(new AreaBreak());
                addRecintoTable(doc, data);
            }

            if (data.getResultadosMesa() != null && !data.getResultadosMesa().isEmpty()) {
                doc.add(new AreaBreak());
                addMesaTable(doc, data);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al generar PDF", e);
        }
        return baos.toByteArray();
    }

    // ── Title ─────────────────────────────────────────────────────────

    private void addTitle(Document doc, DashboardResponse data) {
        doc.add(new Paragraph("INFORME EJECUTIVO")
                .setFontSize(9).setBold().setTextAlignment(TextAlignment.CENTER)
                .setFontColor(C_BRAND).setMarginBottom(2));
        doc.add(new Paragraph("RESULTADOS ELECTORALES")
                .setFontSize(26).setBold().setTextAlignment(TextAlignment.CENTER)
                .setFontColor(C_BRAND_DARK).setMarginBottom(2));
        doc.add(new Paragraph(data.getEleccionNombre())
                .setFontSize(14).setTextAlignment(TextAlignment.CENTER)
                .setFontColor(C_DARK).setMarginBottom(3));
        doc.add(new Paragraph("Generado: " + LocalDateTime.now().format(DATE_FMT))
                .setFontSize(8).setTextAlignment(TextAlignment.CENTER)
                .setFontColor(C_SUBTLE));
        doc.add(new Paragraph(" ").setFontSize(2));
    }

    /** Título de sección con barra lateral ALANTEK. */
    private void addSectionTitle(Document doc, String title, String subtitle) {
        Table head = new Table(UnitValue.createPercentArray(new float[]{0.35f, 9.65f}));
        configurarTabla(head);
        Cell bar = new Cell().setBorder(Border.NO_BORDER).setBackgroundColor(C_ACCENT).setHeight(30);
        head.addCell(bar);
        Cell txt = new Cell().setBorder(Border.NO_BORDER).setPaddingLeft(9).setPaddingBottom(4);
        txt.add(new Paragraph(title).setFontSize(15).setBold().setFontColor(C_BRAND_DARK).setMarginBottom(0));
        if (subtitle != null && !subtitle.isBlank()) {
            txt.add(new Paragraph(subtitle).setFontSize(8).setFontColor(C_GRAY).setMarginTop(0));
        }
        head.addCell(txt);
        doc.add(head);
        doc.add(new Paragraph(" ").setFontSize(4));
    }

    // ── Stat Cards ────────────────────────────────────────────────────

    private void addStatCards(Document doc, DashboardResponse data) {
        long nulos = valueOf(data.getTotalVotosNulos());
        long blanco = valueOf(data.getTotalVotosBlanco());
        long totalVotos = valueOf(data.getTotalVotos());

        Table grid = new Table(UnitValue.createPercentArray(new float[]{1, 1, 1, 1}));
        configurarTabla(grid);
        grid.addCell(statCell("Total Votos", String.format("%,d", totalVotos), C_PRIMARY));
        grid.addCell(statCell("Votos Nulos", String.format("%,d", nulos), C_WARNING));
        grid.addCell(statCell("Votos en Blanco", String.format("%,d", blanco), C_INFO));
        grid.addCell(statCell("Total General", String.format("%,d", totalVotos + nulos + blanco), C_SUCCESS));
        doc.add(grid);

        Table row2 = new Table(UnitValue.createPercentArray(new float[]{1, 1, 1, 1}));
        configurarTabla(row2);
        row2.addCell(statCell("Total Mesas", String.format("%,d", valueOf(data.getTotalMesas())), C_INFO));
        row2.addCell(statCell("Mesas Cerradas", String.format("%,d", valueOf(data.getMesasCerradas())), C_SUCCESS));
        row2.addCell(statCell("Mesas Abiertas", String.format("%,d", valueOf(data.getMesasAbiertas())), C_WARNING));
        row2.addCell(statCell("% Escrutinio", String.format("%.1f%%",
                data.getPorcentajeMesasCerradas() == null ? 0 : data.getPorcentajeMesasCerradas()), C_PRIMARY));
        doc.add(row2);
    }

    private static long valueOf(Number n) {
        return n == null ? 0L : n.longValue();
    }

    /** Ancho fijo para que ninguna columna se salga del área imprimible. */
    private static void configurarTabla(Table tabla) {
        tabla.setWidth(UnitValue.createPercentValue(100));
        tabla.setFixedLayout();
    }

    private Cell th(String texto) {
        Cell c = new Cell().add(new Paragraph(texto).setBold().setFontSize(10).setFontColor(C_WHITE));
        c.setBackgroundColor(C_HEADER_BG);
        c.setPadding(6);
        c.setBorder(Border.NO_BORDER);
        c.setBorderBottom(new SolidBorder(C_BRAND_DARK, 0.8f));
        c.setTextAlignment(TextAlignment.CENTER);
        return c;
    }

    private Cell categoriaCell(String categoria, int columnas) {
        return new Cell(1, columnas).setBorder(Border.NO_BORDER)
                .setBorderBottom(new SolidBorder(C_BORDER, 0.5f))
                .setPadding(6)
                .add(new Paragraph(categoria).setBold().setFontSize(10).setFontColor(C_BRAND));
    }

    private static String tituloVotos(List<ResultadoCandidato> resultados) {
        if (resultados != null && !resultados.isEmpty() &&
                resultados.stream().allMatch(r -> CargoCategoriaUtil.ALCALDES.equalsIgnoreCase(
                        CargoCategoriaUtil.categoria(r.getCargoNombre())))) {
            return "Distribución de Votos por Alcalde";
        }
        return "Distribución de Votos por Postulación";
    }

    private Cell statCell(String label, String value, Color accent) {
        Cell c = new Cell();
        c.setBorder(Border.NO_BORDER);
        c.setBorderTop(new SolidBorder(accent, 3f));
        c.setBackgroundColor(C_LIGHT_BG);
        c.setPadding(13);
        c.setVerticalAlignment(VerticalAlignment.MIDDLE);
        c.add(new Paragraph(label).setFontSize(9).setFontColor(C_GRAY)
                .setTextAlignment(TextAlignment.CENTER).setMarginBottom(2));
        c.add(new Paragraph(value).setFontSize(20).setBold().setFontColor(accent)
                .setTextAlignment(TextAlignment.CENTER));
        return c;
    }

    // ── Bar Chart ─────────────────────────────────────────────────────

    private void addBarChart(Document doc, PdfDocument pdf, List<ResultadoCandidato> resultados) {
        if (resultados == null || resultados.isEmpty()) return;
        addSectionTitle(doc, tituloVotos(resultados), null);

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

        doc.add(new Image(xo).setWidth(UnitValue.createPercentValue(100))
                .setBorder(new SolidBorder(C_BORDER, 0.5f)));
    }

    // ── Pie Chart ─────────────────────────────────────────────────────

    private void addPieChart(Document doc, PdfDocument pdf, List<ResultadoCandidato> resultados) {
        if (resultados == null || resultados.isEmpty()) return;
        addSectionTitle(doc, tituloVotos(resultados), null);

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

        doc.add(new Image(xo).setWidth(UnitValue.createPercentValue(100))
                .setBorder(new SolidBorder(C_BORDER, 0.5f)));
    }

    // ── Detail Table ──────────────────────────────────────────────────

    private void addDetailTable(Document doc, DashboardResponse data) {
        addSectionTitle(doc, "Detalle de Resultados por Cargo", null);

        String etiqueta = "Postulación";
        if (data.getResultados() != null && !data.getResultados().isEmpty()) {
            etiqueta = CargoCategoriaUtil.postulacion(
                    CargoCategoriaUtil.categoria(data.getResultados().get(0).getCargoNombre()));
        }
        Table t = new Table(UnitValue.createPercentArray(new float[]{0.5f, 3f, 2.5f, 2f, 1.5f, 1.5f}));
        configurarTabla(t);
        String[] hd = {"#", etiqueta, "Partido", "Cargo", "Votos", "%"};
        for (String h : hd) {
            t.addHeaderCell(th(h));
        }
        if (data.getResultados() != null) {
            String categoriaActual = null;
            for (int i = 0; i < data.getResultados().size(); i++) {
                ResultadoCandidato r = data.getResultados().get(i);
                String categoria = CargoCategoriaUtil.categoria(r.getCargoNombre());
                if (!categoria.equalsIgnoreCase(categoriaActual)) {
                    categoriaActual = categoria;
                    t.addCell(categoriaCell(categoria, hd.length));
                }
                boolean odd = i % 2 == 1;
                t.addCell(td(String.valueOf(i + 1), odd, TextAlignment.CENTER));
                t.addCell(td(r.getNombreCompleto(), odd, TextAlignment.LEFT));
                t.addCell(td(r.getPartidoNombre(), odd, TextAlignment.LEFT));
                t.addCell(td(r.getCargoNombre(), odd, TextAlignment.LEFT));
                t.addCell(td(String.format("%,d", valueOf(r.getTotalVotos())), odd, TextAlignment.RIGHT));
                t.addCell(td(String.format("%.1f%%", r.getPorcentaje() == null ? 0 : r.getPorcentaje()),
                        odd, TextAlignment.RIGHT));
            }
        }
        doc.add(t);
    }

    private void addListasTable(Document doc, DashboardResponse data) {
        addSectionTitle(doc, "Resultados por Cargo", null);

        Table t = new Table(UnitValue.createPercentArray(new float[]{0.5f, 3f, 1f, 2f, 2f, 1.5f, 1.5f}));
        configurarTabla(t);
        String[] hd = {"#", "Postulación", "N°", "Partido", "Cargo", "Votos", "%"};
        for (String h : hd) {
            t.addHeaderCell(th(h));
        }
        if (data.getResultadosListas() != null) {
            String categoriaActual = null;
            for (int i = 0; i < data.getResultadosListas().size(); i++) {
                ResultadoLista r = data.getResultadosListas().get(i);
                String categoria = CargoCategoriaUtil.categoria(r.getCargoNombre());
                if (!categoria.equalsIgnoreCase(categoriaActual)) {
                    categoriaActual = categoria;
                    t.addCell(categoriaCell(categoria, hd.length));
                }
                boolean odd = i % 2 == 1;
                t.addCell(td(String.valueOf(i + 1), odd, TextAlignment.CENTER));
                t.addCell(td(r.getListaNombre(), odd, TextAlignment.LEFT));
                t.addCell(td(String.valueOf(r.getNumeroLista()), odd, TextAlignment.CENTER));
                t.addCell(td(r.getPartidoNombre() != null ? r.getPartidoNombre() : "—", odd, TextAlignment.LEFT));
                t.addCell(td(r.getCargoNombre() != null ? r.getCargoNombre() : "—", odd, TextAlignment.LEFT));
                t.addCell(td(String.format("%,d", valueOf(r.getTotalVotos())), odd, TextAlignment.RIGHT));
                t.addCell(td(String.format("%.1f%%", r.getPorcentaje() == null ? 0 : r.getPorcentaje()),
                        odd, TextAlignment.RIGHT));
            }
        }
        doc.add(t);
    }

    private Cell td(String text, boolean odd, TextAlignment align) {
        Cell c = new Cell().add(new Paragraph(text == null ? "" : text)
                .setFontSize(10).setFontColor(C_DARK));
        c.setTextAlignment(align);
        c.setPadding(6);
        c.setBorder(Border.NO_BORDER);
        c.setBorderBottom(new SolidBorder(C_BORDER, 0.4f));
        if (odd) c.setBackgroundColor(C_MUTED);
        return c;
    }

    // ── Geo Table (Provincia / Parroquia) ────────────────────────────

    private void addGeoTable(Document doc, String title, List<ResultadoGeo> items) {
        addSectionTitle(doc, title, null);

        Table t = new Table(UnitValue.createPercentArray(new float[]{0.5f, 4f, 1.5f, 1.5f}));
        configurarTabla(t);
        String[] hd = {"#", "Nombre", "Votos", "%"};
        for (String h : hd) {
            t.addHeaderCell(th(h));
        }
        for (int i = 0; i < items.size(); i++) {
            ResultadoGeo r = items.get(i);
            boolean odd = i % 2 == 1;
            t.addCell(td(String.valueOf(i + 1), odd, TextAlignment.CENTER));
            t.addCell(td(r.getNombre(), odd, TextAlignment.LEFT));
            t.addCell(td(String.format("%,d", r.getTotalVotos()), odd, TextAlignment.RIGHT));
            t.addCell(td(String.format("%.1f%%", r.getPorcentaje()), odd, TextAlignment.RIGHT));
        }
        doc.add(t);
    }

    // ── Recinto Table ─────────────────────────────────────────────────

    private void addRecintoTable(Document doc, DashboardResponse data) {
        addSectionTitle(doc, "Resultados por Recinto", null);

        Table t = new Table(UnitValue.createPercentArray(new float[]{0.5f, 4f, 1.5f, 1.5f}));
        configurarTabla(t);
        String[] hd = {"#", "Institucion", "Votos", "%"};
        for (String h : hd) {
            t.addHeaderCell(th(h));
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

    // ── Mesa Table ─────────────────────────────────────────────────────

    private void addMesaTable(Document doc, DashboardResponse data) {
        addSectionTitle(doc, "Resultados por Mesa",
                "Incluye nulos y blancos registrados en cada mesa.");

        Table t = new Table(UnitValue.createPercentArray(
                new float[]{0.4f, 0.9f, 3f, 0.7f, 1.2f, 1f, 1f, 1.1f, 0.9f}));
        configurarTabla(t);
        String[] hd = {"#", "Mesa", "Recinto", "Est.", "Votos", "Nulos", "Blancos", "Total", "%"};
        for (String h : hd) {
            t.addHeaderCell(th(h));
        }
        for (int i = 0; i < data.getResultadosMesa().size(); i++) {
            ResultadoMesa r = data.getResultadosMesa().get(i);
            boolean odd = i % 2 == 1;
            t.addCell(td(String.valueOf(i + 1), odd, TextAlignment.CENTER));
            t.addCell(td(r.getMesaNumero(), odd, TextAlignment.CENTER));
            t.addCell(td(r.getInstitucionNombre() != null ? r.getInstitucionNombre() : "—",
                    odd, TextAlignment.LEFT));
            t.addCell(td(Boolean.TRUE.equals(r.getCerrada()) ? "C" : "A", odd, TextAlignment.CENTER));
            t.addCell(td(String.format("%,d", valueOf(r.getVotosCandidatos())), odd, TextAlignment.RIGHT));
            t.addCell(td(String.format("%,d", valueOf(r.getVotosNulos())), odd, TextAlignment.RIGHT));
            t.addCell(td(String.format("%,d", valueOf(r.getVotosBlanco())), odd, TextAlignment.RIGHT));
            t.addCell(td(String.format("%,d", valueOf(r.getTotalVotos())), odd, TextAlignment.RIGHT));
            t.addCell(td(String.format("%.1f%%", r.getPorcentaje() == null ? 0 : r.getPorcentaje()),
                    odd, TextAlignment.RIGHT));
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
             Document doc = new Document(pdf)) {

            configurarDocumento(pdf, doc, "ACTA DE CIERRE DE MESA");

            // ── Top accent line ──
            PdfCanvas cv = new PdfCanvas(pdf.getFirstPage().newContentStreamBefore(), pdf.getFirstPage().getResources(), pdf);
            cv.saveState(); cv.setFillColor(C_PRIMARY);
            cv.rectangle(36, pdf.getFirstPage().getPageSize().getHeight() - 64,
                    pdf.getFirstPage().getPageSize().getWidth() - 72, 3);
            cv.fill(); cv.restoreState();

            // ── Title ──
            doc.add(new Paragraph(" ").setFontSize(16));
            doc.add(new Paragraph("ACTA DE CIERRE DE MESA")
                    .setFontSize(22).setBold().setTextAlignment(TextAlignment.CENTER).setFontColor(C_DARK));
            doc.add(new Paragraph(" ").setFontSize(2));
            doc.add(new Paragraph(eleccionNombre)
                    .setFontSize(12).setTextAlignment(TextAlignment.CENTER).setFontColor(C_GRAY));
            doc.add(new Paragraph(" ").setFontSize(6));

            // ── Divider ──
            PdfCanvas cv2 = new PdfCanvas(pdf.getFirstPage().newContentStreamBefore(), pdf.getFirstPage().getResources(), pdf);
            cv2.saveState(); cv2.setStrokeColor(C_BORDER); cv2.setLineWidth(0.5f);
            cv2.moveTo(36, pdf.getFirstPage().getPageSize().getHeight() - 134);
            cv2.lineTo(pdf.getFirstPage().getPageSize().getWidth() - 36, pdf.getFirstPage().getPageSize().getHeight() - 134);
            cv2.stroke(); cv2.restoreState();

            // ── Mesa Info Card ──
            Table infoCard = new Table(UnitValue.createPercentArray(new float[]{1, 1}));
            infoCard.setWidth(UnitValue.createPercentValue(100));
            infoCard.setBackgroundColor(C_LIGHT_BG);
            infoCard.addCell(infoCell("Mesa N°", mesa.getNumero()));
            infoCard.addCell(infoCell("Sexo", mesa.getSexo().name()));
            infoCard.addCell(infoCell("Institución", institucionNombre));
            infoCard.addCell(infoCell("Parroquia", parroquiaNombre));
            infoCard.addCell(infoCell("Cantón", cantonNombre));
            infoCard.addCell(infoCell("Provincia", provinciaNombre));
            infoCard.addCell(infoCell("Zona", zonaNombre));
            infoCard.addCell(infoCell("Fecha de Cierre", fechaCierre.format(DATE_FMT)));
            doc.add(infoCard);
            doc.add(new Paragraph(" ").setFontSize(8));

            // ── Results section ──
            Table resHeader = new Table(UnitValue.createPercentArray(new float[]{1, 1}));
            resHeader.setWidth(UnitValue.createPercentValue(100));
            Cell leftLabel = new Cell().setBorder(Border.NO_BORDER);
            leftLabel.add(new Paragraph("RESULTADOS DE VOTACIÓN").setFontSize(13).setBold().setFontColor(C_DARK));
            resHeader.addCell(leftLabel);
            Cell rightLabel = new Cell().setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.RIGHT);
            rightLabel.add(new Paragraph("Total Votos: " + totalVotos).setFontSize(13).setBold().setFontColor(C_PRIMARY));
            resHeader.addCell(rightLabel);
            doc.add(resHeader);

            // Results table
            float[] colW = {0.5f, 3.5f, 2.5f, 1.5f};
            Table resTable = new Table(UnitValue.createPercentArray(colW));
            resTable.setWidth(UnitValue.createPercentValue(100));
            String[] hdrs = {"#", "Candidato", "Partido", "Votos"};
            for (String h : hdrs) {
                Cell hc = new Cell().add(new Paragraph(h).setBold().setFontSize(8).setFontColor(C_WHITE));
                hc.setBackgroundColor(C_HEADER_BG); hc.setPadding(6); hc.setTextAlignment(TextAlignment.CENTER);
                resTable.addHeaderCell(hc);
            }
            if (resultados != null) {
                for (int i = 0; i < resultados.size(); i++) {
                    String[] row = resultados.get(i);
                    boolean odd = i % 2 == 1;
                    resTable.addCell(td(String.valueOf(i + 1), odd, TextAlignment.CENTER));
                    resTable.addCell(td(row[0], odd, TextAlignment.LEFT));
                    resTable.addCell(td(row[1], odd, TextAlignment.LEFT));
                    resTable.addCell(td(row[3], odd, TextAlignment.RIGHT));
                }
            }
            doc.add(resTable);
            doc.add(new Paragraph(" ").setFontSize(10));

            // ── Signature section ──
            doc.add(new Paragraph("FIRMAS DE RESPONSABILIDAD")
                    .setFontSize(13).setBold().setFontColor(C_DARK));
            doc.add(new Paragraph(" ").setFontSize(4));

            float[] sigCols = {1, 1, 1};
            Table sigTable = new Table(UnitValue.createPercentArray(sigCols));
            sigTable.setWidth(UnitValue.createPercentValue(100));
            String[][] firmas = {
                {"PRESIDENTE", "Nombres: ___________________", "C.I.: _______________________"},
                {"SECRETARIO", "Nombres: ___________________", "C.I.: _______________________"},
                {"VOCAL",      "Nombres: ___________________", "C.I.: _______________________"}
            };
            for (String[] f : firmas) {
                Cell sc = new Cell().setPadding(8).setBackgroundColor(C_LIGHT_BG);
                sc.setBorder(new com.itextpdf.layout.borders.SolidBorder(C_BORDER, 0.5f));
                sc.add(new Paragraph(" ").setFontSize(10));
                sc.add(new Paragraph("____________________________")
                        .setFontSize(12).setTextAlignment(TextAlignment.CENTER));
                sc.add(new Paragraph(f[0]).setBold().setFontSize(10)
                        .setTextAlignment(TextAlignment.CENTER).setFontColor(C_PRIMARY));
                sc.add(new Paragraph(" ").setFontSize(6));
                sc.add(new Paragraph(f[1]).setFontSize(9).setFontColor(C_GRAY));
                sc.add(new Paragraph(f[2]).setFontSize(9).setFontColor(C_GRAY));
                sc.add(new Paragraph(" ").setFontSize(4));
                sigTable.addCell(sc);
            }
            doc.add(sigTable);

        } catch (Exception e) {
            throw new RuntimeException("Error al generar acta de cierre", e);
        }
        return baos.toByteArray();
    }

    private Cell infoCell(String label, String value) {
        Cell c = new Cell();
        c.setBorder(Border.NO_BORDER);
        c.setPadding(5);
        c.add(new Paragraph(label).setFontSize(7).setBold().setFontColor(C_GRAY)
                .setTextAlignment(TextAlignment.LEFT));
        c.add(new Paragraph(value).setFontSize(10).setFontColor(C_DARK)
                .setTextAlignment(TextAlignment.LEFT));
        return c;
    }
}
