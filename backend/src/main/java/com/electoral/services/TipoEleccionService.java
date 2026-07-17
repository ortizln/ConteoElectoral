package com.electoral.services;

import com.electoral.dto.TipoEleccionResponse;
import com.electoral.entities.TipoEleccion;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.TipoEleccionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TipoEleccionService {

    private final TipoEleccionRepository repository;

    public List<TipoEleccionResponse> getAll() {
        return repository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public TipoEleccionResponse getById(Long id) {
        return mapToResponse(repository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Tipo de elección no encontrado")));
    }

    public TipoEleccion getEntityById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Tipo de elección no encontrado"));
    }

    public TipoEleccionResponse create(String nombre, String descripcion) {
        TipoEleccion te = TipoEleccion.builder().nombre(nombre).descripcion(descripcion).build();
        return mapToResponse(repository.save(te));
    }

    public TipoEleccionResponse update(Long id, String nombre, String descripcion) {
        TipoEleccion te = repository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Tipo de elección no encontrado"));
        if (nombre != null) te.setNombre(nombre);
        if (descripcion != null) te.setDescripcion(descripcion);
        return mapToResponse(repository.save(te));
    }

    private TipoEleccionResponse mapToResponse(TipoEleccion te) {
        return TipoEleccionResponse.builder()
                .id(te.getId()).nombre(te.getNombre())
                .descripcion(te.getDescripcion()).activo(te.getActivo())
                .build();
    }
}
