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

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class PartidoService {
    private final PartidoRepository partidoRepository;
    private final EleccionService eleccionService;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;

    public List<PartidoResponse> getPartidosByEleccion(Long eleccionesId) {
        return partidoRepository.findByEleccionesId(eleccionesId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public PartidoResponse getPartidoById(Long id) {
        Partido partido = partidoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Partido no encontrado con ID: " + id));
        return mapToResponse(partido);
    }

    @Transactional
    public PartidoResponse createPartido(PartidoRequest request) {
        if (partidoRepository.existsByNombreAndEleccionesId(request.getNombre(), request.getEleccionesId())) {
            throw new DuplicateEntityException("Ya existe un partido con el nombre '" + request.getNombre() + "' en esta elección");
        }
        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionesId());
        Partido partido = Partido.builder()
                .nombre(request.getNombre())
                .sigla(request.getSigla())
                .logoUrl(request.getLogoUrl())
                .elecciones(eleccion)
                .build();
        log.info("Creando {}: {}", "Partido", partido.getNombre());
        Partido saved = partidoRepository.save(partido);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "Partido",
            saved.getId(),
            null,
            Map.of("nombre", saved.getNombre(), "sigla", saved.getSigla(), "logoUrl", saved.getLogoUrl())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public PartidoResponse updatePartido(Long id, PartidoRequest request) {
        Partido partido = partidoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Partido no encontrado con ID: " + id));
        if (!partido.getNombre().equals(request.getNombre()) &&
                partidoRepository.existsByNombreAndEleccionesIdAndIdNot(request.getNombre(), partido.getElecciones().getId(), id)) {
            throw new DuplicateEntityException("Ya existe un partido con el nombre '" + request.getNombre() + "' en esta elección");
        }
        log.info("Actualizando {} con ID: {}", "Partido", id);
        Map<String, Object> datosAnteriores = Map.of("nombre", partido.getNombre(), "sigla", partido.getSigla(), "logoUrl", partido.getLogoUrl());
        partido.setNombre(request.getNombre());
        partido.setSigla(request.getSigla());
        partido.setLogoUrl(request.getLogoUrl());
        Partido saved = partidoRepository.save(partido);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "Partido",
            id,
            datosAnteriores,
            Map.of("nombre", saved.getNombre(), "sigla", saved.getSigla(), "logoUrl", saved.getLogoUrl())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public void deletePartido(Long id) {
        if (!partidoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Partido no encontrado con ID: " + id);
        }
        log.warn("Eliminando {} con ID: {}", "Partido", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "Partido",
            id,
            null,
            null
        );
        partidoRepository.deleteById(id);
    }

    private PartidoResponse mapToResponse(Partido partido) {
        return PartidoResponse.builder()
                .id(partido.getId())
                .nombre(partido.getNombre())
                .sigla(partido.getSigla())
                .logoUrl(partido.getLogoUrl())
                .eleccionesId(partido.getElecciones().getId())
                .build();
    }
}