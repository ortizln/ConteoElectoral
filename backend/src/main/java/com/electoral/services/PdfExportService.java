package com.electoral.services;

import com.electoral.dto.DashboardResponse;
import com.electoral.dto.ResultadoCandidato;
import com.electoral.entities.Mesa;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PdfExportService {

    public byte[] exportDashboardPdf(DashboardResponse data) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (PdfWriter writer = new PdfWriter(baos);
             PdfDocument pdf = new PdfDocument(writer);
             Document document = new Document(pdf)) {

            document.add(new Paragraph("Resultados Electorales")
                    .setFontSize(20).setBold()
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(data.getEleccionNombre())
                    .setFontSize(16)
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Resumen General").setFontSize(14).setBold());
            document.add(new Paragraph("Total Votos: " + data.getTotalVotos()));
            document.add(new Paragraph("Total Mesas: " + data.getTotalMesas()));
            document.add(new Paragraph("Mesas Cerradas: " + data.getMesasCerradas()));
            document.add(new Paragraph("Mesas Abiertas: " + data.getMesasAbiertas()));
            document.add(new Paragraph("Porcentaje Mesas Cerradas: " + String.format("%.2f%%", data.getPorcentajeMesasCerradas())));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Resultados por Candidato").setFontSize(14).setBold());
            Table table = new Table(UnitValue.createPercentArray(new float[]{4, 3, 2, 2, 2}));
            table.setWidth(UnitValue.createPercentValue(100));
            String[] headers = {"Candidato", "Partido", "Cargo", "Votos", "%"};
            for (String header : headers) {
                table.addHeaderCell(new Cell().add(new Paragraph(header).setBold()));
            }
            if (data.getResultados() != null) {
                for (ResultadoCandidato r : data.getResultados()) {
                    table.addCell(new Cell().add(new Paragraph(r.getNombreCompleto())));
                    table.addCell(new Cell().add(new Paragraph(r.getPartidoNombre())));
                    table.addCell(new Cell().add(new Paragraph(r.getCargoNombre())));
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(r.getTotalVotos()))));
                    table.addCell(new Cell().add(new Paragraph(String.format("%.2f%%", r.getPorcentaje()))));
                }
            }
            document.add(table);
        } catch (Exception e) {
            throw new RuntimeException("Error al generar PDF", e);
        }
        return baos.toByteArray();
    }

    public byte[] exportTablePdf(String title, String[] headers, List<String[]> data, float[] columnWidths) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (PdfWriter writer = new PdfWriter(baos);
             PdfDocument pdf = new PdfDocument(writer);
             Document document = new Document(pdf)) {

            document.add(new Paragraph(title)
                    .setFontSize(18).setBold()
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph("Generado: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")))
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.RIGHT));
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
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        try (PdfWriter writer = new PdfWriter(baos);
             PdfDocument pdf = new PdfDocument(writer);
             Document document = new Document(pdf)) {

            document.add(new Paragraph("ACTA DE CIERRE DE MESA")
                    .setFontSize(22).setBold()
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(" ")
                    .setFontSize(4));

            document.add(new Paragraph("DATOS DE LA ELECCION")
                    .setFontSize(14).setBold()
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(eleccionNombre)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.CENTER));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("INFORMACION DE LA MESA")
                    .setFontSize(14).setBold()
                    .setUnderline());
            document.add(new Paragraph("Mesa Nro: " + mesa.getNumero()));
            document.add(new Paragraph("Sexo: " + mesa.getSexo().name()));
            document.add(new Paragraph("Institución: " + institucionNombre));
            document.add(new Paragraph("Parroquia: " + parroquiaNombre));
            document.add(new Paragraph("Cantón: " + cantonNombre));
            document.add(new Paragraph("Provincia: " + provinciaNombre));
            document.add(new Paragraph("Zona: " + zonaNombre));
            document.add(new Paragraph("Fecha de Cierre: " + fechaCierre.format(dtf)));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("RESULTADOS DE VOTACION")
                    .setFontSize(14).setBold()
                    .setUnderline());
            document.add(new Paragraph("Total Votos Emitidos: " + totalVotos));
            document.add(new Paragraph(" "));

            float[] colWidths = {4, 3, 2, 2};
            Table table = new Table(UnitValue.createPercentArray(colWidths));
            table.setWidth(UnitValue.createPercentValue(100));
            String[] headers = {"Candidato", "Partido", "Cargo", "Votos"};
            for (String h : headers) {
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

            document.add(new Paragraph("FIRMAS DE RESPONSABILIDAD")
                    .setFontSize(14).setBold()
                    .setUnderline());
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
