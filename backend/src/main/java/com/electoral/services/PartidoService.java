package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartidoService {
    private final PartidoRepository partidoRepository;
    private final EleccionService eleccionService;

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
        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionesId());
        Partido partido = Partido.builder()
                .nombre(request.getNombre())
                .sigla(request.getSigla())
                .logoUrl(request.getLogoUrl())
                .elecciones(eleccion)
                .build();
        return mapToResponse(partidoRepository.save(partido));
    }

    @Transactional
    public PartidoResponse updatePartido(Long id, PartidoRequest request) {
        Partido partido = partidoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Partido no encontrado con ID: " + id));
        partido.setNombre(request.getNombre());
        partido.setSigla(request.getSigla());
        partido.setLogoUrl(request.getLogoUrl());
        return mapToResponse(partidoRepository.save(partido));
    }

    @Transactional
    public void deletePartido(Long id) {
        if (!partidoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Partido no encontrado con ID: " + id);
        }
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