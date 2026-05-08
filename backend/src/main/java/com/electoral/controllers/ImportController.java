package com.electoral.controllers;

import com.electoral.dto.ImportResponse;
import com.electoral.services.ImportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/import")
@RequiredArgsConstructor
public class ImportController {
    private final ImportService importService;

    @PostMapping("/excel")
    public ResponseEntity<ImportResponse> importarExcel(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(
                ImportResponse.builder().success(false)
                    .errores(List.of("El archivo está vacío")).build()
            );
        }
        ImportResponse response = importService.importarExcel(file);
        return ResponseEntity.ok(response);
    }
}
