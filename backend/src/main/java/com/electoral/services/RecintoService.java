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
public class RecintoService {
    private final RecintoRepository recintoRepository;
    private final MesaRepository mesaRepository;
    private final EleccionService eleccionService;

    public List<RecintoResponse> getRecintosByEleccion(Long eleccionesId) {
        return recintoRepository.findByEleccionesId(eleccionesId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public RecintoResponse getRecintoById(Long id) {
        Recinto recinto = recintoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Recinto no encontrado con ID: " + id));
        return mapToResponse(recinto);
    }

    @Transactional
    public RecintoResponse createRecinto(RecintoRequest request) {
        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionesId());
        Recinto recinto = Recinto.builder()
                .nombre(request.getNombre())
                .direccion(request.getDireccion())
                .elecciones(eleccion)
                .build();
        return mapToResponse(recintoRepository.save(recinto));
    }

    @Transactional
    public RecintoResponse updateRecinto(Long id, RecintoRequest request) {
        Recinto recinto = recintoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Recinto no encontrado con ID: " + id));
        recinto.setNombre(request.getNombre());
        recinto.setDireccion(request.getDireccion());
        return mapToResponse(recintoRepository.save(recinto));
    }

    @Transactional
    public void deleteRecinto(Long id) {
        if (!recintoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Recinto no encontrado con ID: " + id);
        }
        recintoRepository.deleteById(id);
    }

    private RecintoResponse mapToResponse(Recinto recinto) {
        Integer totalMesas = mesaRepository.findByRecintoId(recinto.getId()).size();
        return RecintoResponse.builder()
                .id(recinto.getId())
                .nombre(recinto.getNombre())
                .direccion(recinto.getDireccion())
                .eleccionesId(recinto.getElecciones().getId())
                .totalMesas(totalMesas)
                .build();
    }
}