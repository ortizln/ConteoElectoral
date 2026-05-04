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
@SuppressWarnings("null")
public class EleccionService {
    private final EleccionRepository eleccionRepository;
    private final MesaRepository mesaRepository;
    private final VotoRepository votoRepository;

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

    public List<Eleccion> getEleccionesActivas() {
        return eleccionRepository.findByActivaTrue();
    }

    public Eleccion getEleccionActiva() {
        return eleccionRepository.findFirstByActivaTrue()
                .orElseThrow(() -> new RecursoNoEncontradoException("No hay elecciones activas"));
    }

    @Transactional
    public EleccionResponse createEleccion(EleccionRequest request) {
        Eleccion eleccion = Eleccion.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .fechaInicio(request.getFechaInicio())
                .fechaFin(request.getFechaFin())
                .activa(request.getActiva())
                .build();
        
        return mapToResponse(eleccionRepository.save(eleccion));
    }

    @Transactional
    public EleccionResponse updateEleccion(Long id, EleccionRequest request) {
        Eleccion eleccion = eleccionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Elección no encontrada con ID: " + id));

        eleccion.setNombre(request.getNombre());
        eleccion.setDescripcion(request.getDescripcion());
        eleccion.setFechaInicio(request.getFechaInicio());
        eleccion.setFechaFin(request.getFechaFin());
        eleccion.setActiva(request.getActiva());

        return mapToResponse(eleccionRepository.save(eleccion));
    }

    @Transactional
    public void deleteEleccion(Long id) {
        if (!eleccionRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Elección no encontrada con ID: " + id);
        }
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
                .build();
    }
}