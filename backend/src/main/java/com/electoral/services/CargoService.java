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

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class CargoService {
    private final CargoRepository cargoRepository;
    private final EleccionService eleccionService;

    public List<CargoResponse> getCargosByEleccion(Long eleccionesId) {
        return cargoRepository.findByEleccionesId(eleccionesId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CargoResponse getCargoById(Long id) {
        Cargo cargo = cargoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado con ID: " + id));
        return mapToResponse(cargo);
    }

    @Transactional
    public CargoResponse createCargo(CargoRequest request) {
        if (cargoRepository.existsByNombreAndEleccionesId(request.getNombre(), request.getEleccionesId())) {
            throw new DuplicateEntityException("Ya existe un cargo con el nombre '" + request.getNombre() + "' en esta elección");
        }
        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionesId());
        Cargo cargo = Cargo.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .elecciones(eleccion)
                .build();
        return mapToResponse(cargoRepository.save(cargo));
    }

    @Transactional
    public CargoResponse updateCargo(Long id, CargoRequest request) {
        Cargo cargo = cargoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado con ID: " + id));
        if (!cargo.getNombre().equals(request.getNombre()) &&
                cargoRepository.existsByNombreAndEleccionesIdAndIdNot(request.getNombre(), cargo.getElecciones().getId(), id)) {
            throw new DuplicateEntityException("Ya existe un cargo con el nombre '" + request.getNombre() + "' en esta elección");
        }
        cargo.setNombre(request.getNombre());
        cargo.setDescripcion(request.getDescripcion());
        return mapToResponse(cargoRepository.save(cargo));
    }

    @Transactional
    public void deleteCargo(Long id) {
        if (!cargoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Cargo no encontrado con ID: " + id);
        }
        cargoRepository.deleteById(id);
    }

    private CargoResponse mapToResponse(Cargo cargo) {
        return CargoResponse.builder()
                .id(cargo.getId())
                .nombre(cargo.getNombre())
                .descripcion(cargo.getDescripcion())
                .eleccionesId(cargo.getElecciones().getId())
                .build();
    }
}