package com.electoral.services;

import com.electoral.dto.ImportResponse;
import com.electoral.entities.*;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ImportService {

    private final ZonaRepository zonaRepository;
    private final ProvinciaRepository provinciaRepository;
    private final CantonRepository cantonRepository;
    private final ParroquiaRepository parroquiaRepository;
    private final InstitucionEducativaRepository institucionRepository;

    @Transactional
    public ImportResponse importarExcel(MultipartFile file) {
        List<String> errores = new ArrayList<>();
        int totalFilas = 0;
        int[] creados = new int[5];

        try (InputStream is = file.getInputStream(); Workbook workbook = new XSSFWorkbook(is)) {
            Sheet sheet = workbook.getSheetAt(0);
            if (sheet.getPhysicalNumberOfRows() == 0) {
                return ImportResponse.builder().success(false)
                        .errores(List.of("El archivo está vacío")).build();
            }

            Row headerRow = sheet.getRow(0);
            Map<String, Integer> colIndex = new HashMap<>();
            for (Cell cell : headerRow) {
                String header = getCellValueAsString(cell).toLowerCase().trim();
                colIndex.put(header, cell.getColumnIndex());
            }

            String[] requiredColumns = {"zona", "provincia", "canton", "parroquia"};
            for (String col : requiredColumns) {
                if (!colIndex.containsKey(col)) {
                    return ImportResponse.builder().success(false)
                            .errores(List.of("Columna requerida no encontrada: '" + col
                                    + "'. Columnas detectadas: " + colIndex.keySet()))
                            .build();
                }
            }

            boolean hasInstitucion = colIndex.containsKey("institucion") || colIndex.containsKey("recinto");
            String institucionCol = colIndex.containsKey("institucion") ? "institucion" : "recinto";

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                String zonaNombre = getCellValueAsString(row.getCell(colIndex.get("zona"))).trim().toUpperCase();
                String provinciaNombre = getCellValueAsString(row.getCell(colIndex.get("provincia"))).trim().toUpperCase();
                String cantonNombre = getCellValueAsString(row.getCell(colIndex.get("canton"))).trim().toUpperCase();
                String parroquiaNombre = getCellValueAsString(row.getCell(colIndex.get("parroquia"))).trim().toUpperCase();

                if (zonaNombre.isEmpty() || provinciaNombre.isEmpty()
                        || cantonNombre.isEmpty() || parroquiaNombre.isEmpty()) {
                    continue;
                }

                totalFilas++;

                try {
                    Zona zona = zonaRepository.findByNombre(zonaNombre).orElseGet(() -> {
                        Zona nueva = Zona.builder().nombre(zonaNombre).build();
                        creados[0]++;
                        return zonaRepository.save(nueva);
                    });

                    Provincia provincia = provinciaRepository
                            .findByNombreAndZonaId(provinciaNombre, zona.getId()).orElseGet(() -> {
                                Provincia nueva = Provincia.builder().nombre(provinciaNombre).zona(zona).build();
                                creados[1]++;
                                return provinciaRepository.save(nueva);
                            });

                    Canton canton = cantonRepository
                            .findByNombreAndProvinciaId(cantonNombre, provincia.getId()).orElseGet(() -> {
                                Canton nuevo = Canton.builder().nombre(cantonNombre).provincia(provincia).build();
                                creados[2]++;
                                return cantonRepository.save(nuevo);
                            });

                    Parroquia parroquia = parroquiaRepository
                            .findByNombreAndCantonId(parroquiaNombre, canton.getId()).orElseGet(() -> {
                                Parroquia nueva = Parroquia.builder().nombre(parroquiaNombre).canton(canton).build();
                                creados[3]++;
                                return parroquiaRepository.save(nueva);
                            });

                    if (hasInstitucion) {
                        String institucionNombre = getCellValueAsString(
                                row.getCell(colIndex.get(institucionCol))).trim().toUpperCase();
                        if (!institucionNombre.isEmpty()) {
                            institucionRepository.findByNombre(institucionNombre).orElseGet(() -> {
                                InstitucionEducativa nueva = InstitucionEducativa.builder()
                                        .nombre(institucionNombre)
                                        .parroquia(parroquia)
                                        .build();
                                creados[4]++;
                                return institucionRepository.save(nueva);
                            });
                        }
                    }
                } catch (Exception e) {
                    errores.add("Fila " + (i + 1) + ": " + e.getMessage());
                }
            }
        } catch (IOException e) {
            return ImportResponse.builder().success(false)
                    .errores(List.of("Error al leer el archivo: " + e.getMessage())).build();
        }

        return ImportResponse.builder()
                .success(errores.isEmpty())
                .totalFilas(totalFilas)
                .zonasCreadas(creados[0])
                .provinciasCreadas(creados[1])
                .cantonesCreados(creados[2])
                .parroquiasCreadas(creados[3])
                .institucionesCreadas(creados[4])
                .errores(errores)
                .build();
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> {
                double val = cell.getNumericCellValue();
                if (val == Math.floor(val) && !Double.isInfinite(val)) {
                    yield String.valueOf((long) val);
                }
                yield String.valueOf(val);
            }
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            default -> "";
        };
    }
}
