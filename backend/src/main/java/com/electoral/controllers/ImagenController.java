package com.electoral.controllers;

import com.electoral.entities.Candidato;
import com.electoral.entities.ListaElectoral;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.exception.ValidacionException;
import com.electoral.repositories.CandidatoRepository;
import com.electoral.repositories.ListaElectoralRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Logos/imagenes: logo de lista electoral y foto de candidato individual.
 * Se guardan como bytea en DB (mismo patron que logo de configuracion / APK).
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ImagenController {

    private static final long MAX_TAMANO_BYTES = 5 * 1024 * 1024; // 5 MB

    private final ListaElectoralRepository listaRepository;
    private final CandidatoRepository candidatoRepository;

    // ===== Logo de lista electoral =====

    @PostMapping("/listas/{id}/logo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> subirLogoLista(@PathVariable Long id, @RequestParam("file") MultipartFile file)
            throws IOException {
        ListaElectoral lista = listaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Lista no encontrada con ID: " + id));
        validarImagen(file);
        lista.setLogo(file.getBytes());
        lista.setLogoContentType(normalizarContentType(file));
        listaRepository.save(lista);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/listas/{id}/logo")
    public void obtenerLogoLista(@PathVariable Long id, HttpServletResponse response) throws IOException {
        ListaElectoral lista = listaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Lista no encontrada con ID: " + id));
        if (lista.getLogo() == null || lista.getLogo().length == 0) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
        escribirImagen(response, lista.getLogo(), lista.getLogoContentType());
    }

    @DeleteMapping("/listas/{id}/logo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarLogoLista(@PathVariable Long id) {
        ListaElectoral lista = listaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Lista no encontrada con ID: " + id));
        lista.setLogo(null);
        lista.setLogoContentType(null);
        listaRepository.save(lista);
        return ResponseEntity.noContent().build();
    }

    // ===== Foto de candidato =====

    @PostMapping("/candidatos/{id}/foto")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> subirFotoCandidato(@PathVariable Long id, @RequestParam("file") MultipartFile file)
            throws IOException {
        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id));
        validarImagen(file);
        candidato.setFoto(file.getBytes());
        candidato.setFotoContentType(normalizarContentType(file));
        candidatoRepository.save(candidato);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/candidatos/{id}/foto")
    public void obtenerFotoCandidato(@PathVariable Long id, HttpServletResponse response) throws IOException {
        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id));
        if (candidato.getFoto() == null || candidato.getFoto().length == 0) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
        escribirImagen(response, candidato.getFoto(), candidato.getFotoContentType());
    }

    @DeleteMapping("/candidatos/{id}/foto")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarFotoCandidato(@PathVariable Long id) {
        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Candidato no encontrado con ID: " + id));
        candidato.setFoto(null);
        candidato.setFotoContentType(null);
        candidatoRepository.save(candidato);
        return ResponseEntity.noContent().build();
    }

    // ===== Helpers =====

    private void validarImagen(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ValidacionException("La imagen es requerida");
        }
        if (file.getSize() > MAX_TAMANO_BYTES) {
            throw new ValidacionException("La imagen no puede superar los 5 MB");
        }
        String contentType = file.getContentType();
        if (contentType != null && contentType.startsWith("image/")) return;
        String nombre = file.getOriginalFilename() != null ? file.getOriginalFilename().toLowerCase() : "";
        boolean esImagen = nombre.endsWith(".jpg") || nombre.endsWith(".jpeg")
                || nombre.endsWith(".png") || nombre.endsWith(".webp");
        if (!esImagen) {
            throw new ValidacionException("Solo se permiten imágenes (JPG, PNG, WEBP)");
        }
    }

    private String normalizarContentType(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType != null && contentType.startsWith("image/")) return contentType;
        String nombre = file.getOriginalFilename() != null ? file.getOriginalFilename().toLowerCase() : "";
        if (nombre.endsWith(".png")) return MediaType.IMAGE_PNG_VALUE;
        if (nombre.endsWith(".webp")) return "image/webp";
        return MediaType.IMAGE_JPEG_VALUE;
    }

    private void escribirImagen(HttpServletResponse response, byte[] bytes, String contentType) throws IOException {
        response.setContentType(contentType != null ? contentType : MediaType.IMAGE_JPEG_VALUE);
        response.setContentLength(bytes.length);
        response.getOutputStream().write(bytes);
        response.getOutputStream().flush();
    }
}
