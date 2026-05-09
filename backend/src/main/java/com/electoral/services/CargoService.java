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
public class CargoService {
    private final CargoRepository cargoRepository;
    private final EleccionService eleccionService;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;

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
        log.info("Creando {}: {}", "Cargo", cargo.getNombre());
        Cargo saved = cargoRepository.save(cargo);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "Cargo",
            saved.getId(),
            null,
            Map.of("nombre", saved.getNombre(), "descripcion", saved.getDescripcion())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public CargoResponse updateCargo(Long id, CargoRequest request) {
        Cargo cargo = cargoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Cargo no encontrado con ID: " + id));
        if (!cargo.getNombre().equals(request.getNombre()) &&
                cargoRepository.existsByNombreAndEleccionesIdAndIdNot(request.getNombre(), cargo.getElecciones().getId(), id)) {
            throw new DuplicateEntityException("Ya existe un cargo con el nombre '" + request.getNombre() + "' en esta elección");
        }
        log.info("Actualizando {} con ID: {}", "Cargo", id);
        Map<String, Object> datosAnteriores = Map.of("nombre", cargo.getNombre(), "descripcion", cargo.getDescripcion());
        cargo.setNombre(request.getNombre());
        cargo.setDescripcion(request.getDescripcion());
        Cargo saved = cargoRepository.save(cargo);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "Cargo",
            id,
            datosAnteriores,
            Map.of("nombre", saved.getNombre(), "descripcion", saved.getDescripcion())
        );
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteCargo(Long id) {
        if (!cargoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Cargo no encontrado con ID: " + id);
        }
        log.warn("Eliminando {} con ID: {}", "Cargo", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "Cargo",
            id,
            null,
            null
        );
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