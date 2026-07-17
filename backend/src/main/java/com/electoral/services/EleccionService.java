package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import java.util.HashMap;
import java.util.Map;
import com.electoral.util.SecurityUtil;
import com.electoral.repositories.TipoEleccionRepository;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class EleccionService {
    private final EleccionRepository eleccionRepository;
    private final MesaRepository mesaRepository;
    private final VotoRepository votoRepository;
    private final TipoEleccionRepository tipoEleccionRepository;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;

    public List<EleccionResponse> getAllElecciones() {
        return eleccionRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public EleccionResponse getEleccionById(Long id) {
        Eleccion eleccion = eleccionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Elección no encontrada con ID: " + id));
        return mapToResponse(eleccion);
    }

    public Eleccion getEleccionEntityById(Long id) {
        return eleccionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Elección no encontrada con ID: " + id));
    }

    public List<EleccionResponse> getEleccionesActivas() {
        return eleccionRepository.findByActivaTrue().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public Eleccion getEleccionActiva() {
        return eleccionRepository.findFirstByActivaTrue()
                .orElseThrow(() -> new RecursoNoEncontradoException("No hay elecciones activas"));
    }

    @Transactional
    public EleccionResponse createEleccion(EleccionRequest request) {
        if (eleccionRepository.existsByNombre(request.getNombre())) {
            throw new DuplicateEntityException("Ya existe una elección con el nombre '" + request.getNombre() + "'");
        }
        TipoEleccion tipoEleccion = null;
        if (request.getTipoEleccionId() != null) {
            tipoEleccion = tipoEleccionRepository.findById(request.getTipoEleccionId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Tipo de elección no encontrado"));
        }
        Eleccion eleccion = Eleccion.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .fechaInicio(request.getFechaInicio())
                .fechaFin(request.getFechaFin())
                .activa(request.getActiva())
                .tipoEleccion(tipoEleccion)
                .build();
        
        log.info("Creando {}: {}", "Eleccion", eleccion.getNombre());
        Eleccion saved = eleccionRepository.save(eleccion);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "Eleccion",
            saved.getId(),
            null,
            Map.of("nombre", saved.getNombre(), "descripcion", saved.getDescripcion())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public EleccionResponse updateEleccion(Long id, EleccionRequest request) {
        Eleccion eleccion = eleccionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Elección no encontrada con ID: " + id));
        if (!eleccion.getNombre().equals(request.getNombre()) &&
                eleccionRepository.existsByNombreAndIdNot(request.getNombre(), id)) {
            throw new DuplicateEntityException("Ya existe una elección con el nombre '" + request.getNombre() + "'");
        }
        log.info("Actualizando {} con ID: {}", "Eleccion", id);
        Map<String, Object> datosAnteriores = Map.of("nombre", eleccion.getNombre(), "descripcion", eleccion.getDescripcion());
        eleccion.setNombre(request.getNombre());
        eleccion.setDescripcion(request.getDescripcion());
        eleccion.setFechaInicio(request.getFechaInicio());
        eleccion.setFechaFin(request.getFechaFin());
        eleccion.setActiva(request.getActiva());
        if (request.getTipoEleccionId() != null) {
            TipoEleccion tipoEleccion = tipoEleccionRepository.findById(request.getTipoEleccionId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Tipo de elección no encontrado"));
            eleccion.setTipoEleccion(tipoEleccion);
        }

        Eleccion saved = eleccionRepository.save(eleccion);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "Eleccion",
            id,
            datosAnteriores,
            Map.of("nombre", saved.getNombre(), "descripcion", saved.getDescripcion())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteEleccion(Long id) {
        if (!eleccionRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Elección no encontrada con ID: " + id);
        }
        log.warn("Eliminando {} con ID: {}", "Eleccion", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "Eleccion",
            id,
            null,
            null
        );
        eleccionRepository.deleteById(id);
    }

    private EleccionResponse mapToResponse(Eleccion eleccion) {
        Long totalVotos = votoRepository.sumVotosByEleccion(eleccion.getId());
        Long totalMesas = mesaRepository.countByEleccionesId(eleccion.getId());
        Long mesasCerradas = mesaRepository.countByEleccionesIdAndCerrada(eleccion.getId(), true);

        return EleccionResponse.builder()
                .id(eleccion.getId())
                .nombre(eleccion.getNombre())
                .descripcion(eleccion.getDescripcion())
                .fechaInicio(eleccion.getFechaInicio())
                .fechaFin(eleccion.getFechaFin())
                .activa(eleccion.getActiva())
                .totalVotos(totalVotos)
                .totalMesas(totalMesas)
                .mesasCerradas(mesasCerradas)
                .tipoEleccionId(eleccion.getTipoEleccion() != null ? eleccion.getTipoEleccion().getId() : null)
                .tipoEleccionNombre(eleccion.getTipoEleccion() != null ? eleccion.getTipoEleccion().getNombre() : null)
                .build();
    }
}