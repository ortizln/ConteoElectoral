package com.electoral.controllers;

import com.electoral.entities.CarouselImage;
import com.electoral.services.CarouselImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/carousel")
@RequiredArgsConstructor
public class CarouselController {
    private final CarouselImageService service;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllImages() {
        List<CarouselImage> images = service.getAllImages();
        List<Map<String, Object>> result = images.stream().map(img -> Map.<String, Object>of(
                "id", img.getId(),
                "caption", img.getCaption(),
                "orden", img.getOrden(),
                "createdAt", img.getCreatedAt() != null ? img.getCreatedAt().toString() : null
        )).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        CarouselImage image = service.getAllImages().stream()
                .filter(img -> img.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Imagen no encontrada: " + id));
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image.getImageData());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createImage(
            @RequestParam("image") MultipartFile file,
            @RequestParam("caption") String caption,
            @RequestParam(value = "orden", required = false) Integer orden) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "El archivo está vacío"));
        }
        CarouselImage saved = service.saveImage(caption, file.getBytes(), orden);
        return ResponseEntity.ok(Map.of("id", saved.getId(), "caption", saved.getCaption(), "orden", saved.getOrden()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateImage(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        String caption = (String) body.get("caption");
        Integer orden = body.get("orden") != null ? ((Number) body.get("orden")).intValue() : null;
        CarouselImage updated = service.updateImage(id, caption, orden);
        return ResponseEntity.ok(Map.of("id", updated.getId(), "caption", updated.getCaption(), "orden", updated.getOrden()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        service.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
}
