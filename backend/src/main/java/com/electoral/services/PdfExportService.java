package com.electoral.services;

import com.electoral.dto.DashboardResponse;
import com.electoral.dto.ResultadoCandidato;
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
            document.add(new Paragraph("Porcentaje Mesas Cerradas: " + data.getPorcentajeMesasCerradas() + "%"));
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
}
