package com.electoral.services;

import com.electoral.util.AlantekLogoUtil;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ExcelExportService {

    private static final int BRAND_ROW = 0;
    private static final int SPACER_ROW = 1;
    private static final int HEADER_ROW = 2;

    public byte[] exportExcel(String sheetName, String[] headers, List<String[]> data) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet(sheetName);
            writeSheet(workbook, sheet, headers, data);
            workbook.write(baos);
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar Excel", e);
        }
    }

    public byte[] appendSheetToExcel(byte[] existingBytes, String sheetName, String[] headers, List<String[]> data) {
        try (Workbook workbook = existingBytes == null || existingBytes.length == 0
                ? new XSSFWorkbook()
                : new XSSFWorkbook(new ByteArrayInputStream(existingBytes));
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet(sheetName);
            writeSheet(workbook, sheet, headers, data);
            workbook.write(baos);
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al agregar hoja al Excel", e);
        }
    }

    /**
     * Escribe logo + marca ALANTEK, encabezados y datos en una hoja.
     * El logo se incrusta una sola vez por libro y se comparte entre hojas.
     */
    private void writeSheet(Workbook workbook, Sheet sheet, String[] headers, List<String[]> data) {
        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFillForegroundColor(IndexedColors.ROYAL_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setFont(createHeaderFont(workbook, (short) 14));
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBottomBorderColor(IndexedColors.GREY_50_PERCENT.getIndex());

        CellStyle dataStyle = workbook.createCellStyle();
        dataStyle.setFont(createFont(workbook, false, (short) 12));
        dataStyle.setAlignment(HorizontalAlignment.LEFT);
        dataStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        dataStyle.setBorderBottom(BorderStyle.THIN);
        dataStyle.setBottomBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());

        addAlantekBrand(workbook, sheet, headers.length);

        Row headerRow = sheet.createRow(HEADER_ROW);
        headerRow.setHeightInPoints(24);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        for (int r = 0; r < data.size(); r++) {
            Row row = sheet.createRow(r + HEADER_ROW + 1);
            String[] rowData = data.get(r);
            for (int c = 0; c < rowData.length; c++) {
                Cell cell = row.createCell(c);
                cell.setCellValue(rowData[c] != null ? rowData[c] : "");
                cell.setCellStyle(dataStyle);
            }
        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }
        // Reservar espacio para el logo en las dos primeras columnas.
        sheet.setColumnWidth(0, Math.max(sheet.getColumnWidth(0), 14 * 256));
        if (headers.length > 1) {
            sheet.setColumnWidth(1, Math.max(sheet.getColumnWidth(1), 14 * 256));
        }
    }

    /** Fila de cabecera con el logo y la marca ALANTEK. */
    private void addAlantekBrand(Workbook workbook, Sheet sheet, int columnCount) {
        int lastCol = Math.max(columnCount - 1, 3);

        Row brandRow = sheet.createRow(BRAND_ROW);
        brandRow.setHeightInPoints(42);
        sheet.createRow(SPACER_ROW).setHeightInPoints(8);

        // A:B queda reservado para el logo; desde C se escribe la marca.
        sheet.addMergedRegion(new CellRangeAddress(BRAND_ROW, BRAND_ROW, 0, 1));
        if (lastCol >= 2) {
            sheet.addMergedRegion(new CellRangeAddress(BRAND_ROW, BRAND_ROW, 2, lastCol));
        }

        CellStyle brandStyle = workbook.createCellStyle();
        brandStyle.setFont(createBrandFont(workbook));
        brandStyle.setAlignment(HorizontalAlignment.LEFT);
        brandStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        Cell brandCell = brandRow.createCell(2);
        brandCell.setCellValue("ALANTEK");
        brandCell.setCellStyle(brandStyle);

        byte[] logo = AlantekLogoUtil.logoBytes();
        if (logo.length == 0) {
            return;
        }
        try {
            int pictureIdx = workbook.addPicture(logo, Workbook.PICTURE_TYPE_PNG);
            CreationHelper helper = workbook.getCreationHelper();
            ClientAnchor anchor = helper.createClientAnchor();
            anchor.setCol1(0);
            anchor.setRow1(BRAND_ROW);
            anchor.setCol2(2);
            anchor.setRow2(BRAND_ROW + 1);
            anchor.setAnchorType(ClientAnchor.AnchorType.MOVE_DONT_RESIZE);
            sheet.createDrawingPatriarch().createPicture(anchor, pictureIdx);
        } catch (Exception e) {
            // Si el logo no se puede incrustar, se conserva la marca en texto.
        }
    }

    /** Texto de datos siempre negro (independientemente del color de fondo). */
    private Font createFont(Workbook workbook, boolean bold, short size) {
        Font font = workbook.createFont();
        font.setFontHeightInPoints(size);
        font.setBold(bold);
        font.setColor(IndexedColors.BLACK.getIndex());
        font.setFontName("Arial");
        return font;
    }

    /** Texto blanco exclusivamente para encabezados sobre fondo azul. */
    private Font createHeaderFont(Workbook workbook, short size) {
        Font font = workbook.createFont();
        font.setFontHeightInPoints(size);
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        font.setFontName("Arial");
        return font;
    }

    /** Marca ALANTEK en la cabecera de cada hoja. */
    private Font createBrandFont(Workbook workbook) {
        Font font = workbook.createFont();
        font.setFontHeightInPoints((short) 18);
        font.setBold(true);
        font.setColor(IndexedColors.BLACK.getIndex());
        font.setFontName("Arial");
        return font;
    }
}
