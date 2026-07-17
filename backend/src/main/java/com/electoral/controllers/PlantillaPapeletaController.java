package com.electoral.controllers;

import com.electoral.dto.PlantillaPapeletaResponse;
import com.electoral.services.PlantillaPapeletaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/plantillas-papeleta")
@RequiredArgsConstructor
public class PlantillaPapeletaController {

    private final PlantillaPapeletaService plantillaService;

    @GetMapping
    public ResponseEntity<List<PlantillaPapeletaResponse>> getAll() {
        return ResponseEntity.ok(plantillaService.getAll());
    }
}
