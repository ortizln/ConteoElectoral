package com.electoral.controllers;

import com.electoral.dto.MesaActaFotoResponse;
import com.electoral.dto.MesaActaFotosDeMesaResponse;
import com.electoral.entities.Mesa;
import com.electoral.entities.MesaActaFoto;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.exception.ValidacionException;
import com.electoral.repositories.MesaActaFotoRepository;
import com.electoral.repositories.MesaRepository;
import com.electoral.util.SecurityUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Fotos del acta física: respaldo obligatorio al cerrar la mesa.
 * La sube el miembro de mesa (app móvil o web) y las revisa el supervisor
 * (dashboard detalle de mesa y página "Actas").
 */
@RestController
@RequestMapping("/api/mesas")
@RequiredArgsConstructor
public class MesaActaFotoController {

    private static final long MAX_TAMANO_BYTES = 10 * 1024 * 1024; // 10 MB

    private final MesaRepository mesaRepository;
    private final MesaActaFotoRepository fotoRepository;
    private final SecurityUtil securityUtil;

    @PostMapping("/{mesaId}/acta-fotos")
    @PreAuthorize("hasRole('MIEMBRO_MESA') or hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<MesaActaFotoResponse> subirActaFoto(@PathVariable Long mesaId,
            @RequestParam("file") MultipartFile file) throws IOException {
        Mesa mesa = mesaRepository.findById(mesaId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Mesa no encontrada con ID: " + mesaId));
        validarImagen(file);

        MesaActaFoto foto = MesaActaFoto.builder()
                .mesa(mesa)
                .foto(file.getBytes())
                .contentType(normalizarContentType(file))
                .nombreArchivo(file.getOriginalFilename())
                .subidoPor(securityUtil.getCurrentUser())
                .build();
        MesaActaFoto guardada = fotoRepository.save(foto);
        return ResponseEntity.ok(toResponse(guardada));
    }

    @GetMapping("/{mesaId}/acta-fotos")
    public ResponseEntity<List<MesaActaFotoResponse>> listarActaFotos(@PathVariable Long mesaId) {
        if (!mesaRepository.existsById(mesaId)) {
            throw new RecursoNoEncontradoException("Mesa no encontrada con ID: " + mesaId);
        }
        List<MesaActaFotoResponse> response = fotoRepository.findByMesaIdOrderByCreatedAtDesc(mesaId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{mesaId}/acta-fotos/{fotoId}")
    public void obtenerActaFoto(@PathVariable Long mesaId, @PathVariable Long fotoId,
            HttpServletResponse response) throws IOException {
        MesaActaFoto foto = fotoRepository.findById(fotoId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Foto no encontrada con ID: " + fotoId));
        if (foto.getMesa() == null || !foto.getMesa().getId().equals(mesaId)) {
            throw new RecursoNoEncontradoException("La foto no pertenece a la mesa " + mesaId);
        }
        response.setContentType(foto.getContentType() != null ? foto.getContentType() : MediaType.IMAGE_JPEG_VALUE);
        response.setContentLength(foto.getFoto().length);
        response.getOutputStream().write(foto.getFoto());
        response.getOutputStream().flush();
    }

    @DeleteMapping("/{mesaId}/acta-fotos/{fotoId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarActaFoto(@PathVariable Long mesaId, @PathVariable Long fotoId) {
        MesaActaFoto foto = fotoRepository.findById(fotoId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Foto no encontrada con ID: " + fotoId));
        if (foto.getMesa() == null || !foto.getMesa().getId().equals(mesaId)) {
            throw new RecursoNoEncontradoException("La foto no pertenece a la mesa " + mesaId);
        }
        fotoRepository.delete(foto);
        return ResponseEntity.noContent().build();
    }

    /**
     * Resumen para la página "Actas" del supervisor: mesas de la elección con
     * sus fotos (las mesas sin foto aparecen con lista vacía para identificar
     * cuáles cerraron sin respaldo).
     */
    @GetMapping("/acta-fotos")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPERVISOR')")
    public ResponseEntity<List<MesaActaFotosDeMesaResponse>> actaFotosPorEleccion(
            @RequestParam(required = false) Long eleccionId) {
        List<Mesa> mesas = mesaRepository.findByEleccionesId(eleccionId);
        List<Long> mesaIds = mesas.stream().map(Mesa::getId).collect(Collectors.toList());
        Map<Long, List<MesaActaFoto>> fotosPorMesa = mesaIds.isEmpty() ? Map.of()
                : fotoRepository.findByMesaIdInOrderByMesaId(mesaIds).stream()
                        .collect(Collectors.groupingBy(f -> f.getMesa().getId()));

        List<MesaActaFotosDeMesaResponse> response = new ArrayList<>();
        for (Mesa mesa : mesas) {
            List<MesaActaFotoResponse> fotos = fotosPorMesa.getOrDefault(mesa.getId(), List.of()).stream()
                    .map(this::toResponse)
                    .collect(Collectors.toList());
            response.add(MesaActaFotosDeMesaResponse.builder()
                    .mesaId(mesa.getId())
                    .mesaNumero(mesa.getNumero())
                    .sexo(mesa.getSexo() != null ? mesa.getSexo().name() : null)
                    .institucionNombre(mesa.getInstitucion() != null ? mesa.getInstitucion().getNombre() : null)
                    .parroquiaNombre(mesa.getInstitucion() != null && mesa.getInstitucion().getParroquia() != null
                            ? mesa.getInstitucion().getParroquia().getNombre()
                            : null)
                    .cerrada(mesa.getCerrada())
                    .fotos(fotos)
                    .build());
        }
        return ResponseEntity.ok(response);
    }

    private void validarImagen(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ValidacionException("La foto del acta es requerida");
        }
        if (file.getSize() > MAX_TAMANO_BYTES) {
            throw new ValidacionException("La foto no puede superar los 10 MB");
        }
        String contentType = file.getContentType();
        if (contentType != null && contentType.startsWith("image/")) return;
        // Tolera content-type vacío si la extensión es de imagen
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

    private MesaActaFotoResponse toResponse(MesaActaFoto foto) {
        return MesaActaFotoResponse.builder()
                .id(foto.getId())
                .mesaId(foto.getMesa() != null ? foto.getMesa().getId() : null)
                .contentType(foto.getContentType())
                .nombreArchivo(foto.getNombreArchivo())
                .subidoPor(foto.getSubidoPor() != null ? foto.getSubidoPor().getId() : null)
                .subidoPorNombre(foto.getSubidoPor() != null
                        ? foto.getSubidoPor().getNombre() + " " + foto.getSubidoPor().getApellido()
                        : null)
                .createdAt(foto.getCreatedAt())
                .tamanoBytes(foto.getFoto() != null ? (long) foto.getFoto().length : null)
                .build();
    }
}
