package com.electoral.services;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManualService {

    private static final float FONT_SIZE_BODY = 9;
    private static final float FONT_SIZE_H1 = 18;
    private static final float FONT_SIZE_H2 = 14;
    private static final float FONT_SIZE_H3 = 12;
    private static final float FONT_SIZE_H4 = 11;

    public byte[] generatePdf() {
        String md = readMarkdown();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            String[] lines = md.split("\n");
            boolean inCodeBlock = false;
            StringBuilder codeBuffer = new StringBuilder();
            boolean inTable = false;
            boolean tableHeaderDone = false;
            Table table = null;

            for (String rawLine : lines) {
                String line = rawLine.trim();

                if (line.startsWith("```")) {
                    if (inCodeBlock) {
                        document.add(new Paragraph(codeBuffer.toString())
                                .setFontSize(FONT_SIZE_BODY)
                                .setBackgroundColor(ColorConstants.LIGHT_GRAY));
                        codeBuffer = new StringBuilder();
                        inCodeBlock = false;
                    } else {
                        inCodeBlock = true;
                    }
                    continue;
                }

                if (inCodeBlock) {
                    codeBuffer.append(rawLine).append("\n");
                    continue;
                }

                if (line.startsWith("|") && line.endsWith("|")) {
                    String[] parts = line.substring(1, line.length() - 1).split("\\|");
                    if (line.contains("---")) {
                        continue;
                    }
                    if (!inTable) {
                        inTable = true;
                        tableHeaderDone = false;
                        table = new Table(UnitValue.createPercentArray(parts.length)).useAllAvailableWidth();
                    }
                    boolean isHeader = !tableHeaderDone;
                    tableHeaderDone = true;
                    for (String part : parts) {
                        String text = part.trim();
                        Paragraph p = new Paragraph(text).setFontSize(FONT_SIZE_BODY);
                        if (isHeader) p.setBold();
                        Cell cell = new Cell().add(p);
                        if (isHeader) cell.setBackgroundColor(ColorConstants.LIGHT_GRAY);
                        table.addCell(cell);
                    }
                    continue;
                } else if (inTable && table != null) {
                    document.add(table);
                    inTable = false;
                    table = null;
                }

                if (line.isEmpty()) {
                    continue;
                }

                Paragraph p;
                if (line.startsWith("# ")) {
                    p = new Paragraph(line.substring(2).trim()).setBold().setFontSize(FONT_SIZE_H1)
                            .setTextAlignment(TextAlignment.CENTER);
                } else if (line.startsWith("## ")) {
                    p = new Paragraph(line.substring(3).trim()).setBold().setFontSize(FONT_SIZE_H2)
                            .setFontColor(ColorConstants.BLUE);
                } else if (line.startsWith("### ")) {
                    p = new Paragraph(line.substring(4).trim()).setBold().setFontSize(FONT_SIZE_H3);
                } else if (line.startsWith("#### ")) {
                    p = new Paragraph(line.substring(5).trim()).setBold().setFontSize(FONT_SIZE_H4);
                } else if (line.startsWith("- ") || line.startsWith("* ")) {
                    p = new Paragraph("  \u2022 " + line.substring(2)).setFontSize(FONT_SIZE_BODY);
                } else if (line.matches("\\d+\\.\\s.*")) {
                    String text = line.replaceFirst("^\\d+\\.\\s+", "");
                    p = new Paragraph("  " + line.charAt(0) + ". " + text).setFontSize(FONT_SIZE_BODY);
                } else {
                    p = new Paragraph(line).setFontSize(FONT_SIZE_BODY);
                }

                document.add(p);
            }

            if (inTable && table != null) {
                document.add(table);
            }

            document.close();
        } catch (Exception e) {
            log.error("Error generating manual PDF", e);
            throw new RuntimeException("Error al generar el manual PDF", e);
        }
        return baos.toByteArray();
    }

    private String readMarkdown() {
        try (InputStream is = getClass().getResourceAsStream("/manual-usuario.md")) {
            if (is == null) {
                throw new RuntimeException("Archivo manual-usuario.md no encontrado en classpath");
            }
            return new String(is.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("Error al leer manual-usuario.md", e);
        }
    }
}
