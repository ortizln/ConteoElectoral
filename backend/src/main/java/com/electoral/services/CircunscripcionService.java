package com.electoral.services;

import com.electoral.annotation.Auditable;
import com.electoral.dto.*;
import com.electoral.entities.*;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class CircunscripcionService {

    private final CircunscripcionRepository circunscripcionRepository;
    private final EleccionService eleccionService;
    private final TipoCircunscripcionRepository tipoCircunscripcionRepository;
    private final DHondtService dhondtService;

    @Transactional(readOnly = true)
    public List<CircunscripcionResponse> findByEleccion(Long eleccionId) {
        return circunscripcionRepository.findByEleccionIdOrderByNombre(eleccionId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CircunscripcionResponse findById(Long id) {
        Circunscripcion circ = circunscripcionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Circunscripción no encontrada: " + id));
        return mapToResponse(circ);
    }

    @Transactional
    @Auditable(entidad = "Circunscripcion")
    public CircunscripcionResponse create(CircunscripcionRequest request) {
        Eleccion eleccion = eleccionService.getEleccionEntityById(request.getEleccionId());

        TipoCircunscripcion tipoCircunscripcion = request.getTipoCircunscripcionId() != null
                ? tipoCircunscripcionRepository.findById(request.getTipoCircunscripcionId()).orElse(null) : null;

        Circunscripcion circ = Circunscripcion.builder()
                .eleccion(eleccion)
                .tipoCircunscripcion(tipoCircunscripcion)
                .nombre(request.getNombre())
                .codigo(request.getCodigo())
                .escanos(request.getEscanos() != null ? request.getEscanos() : 1)
                .umbralElectoral(request.getUmbralElectoral())
                .metodoAsignacion(request.getMetodoAsignacion() != null ? request.getMetodoAsignacion() : "D_HONDT")
                .activa(request.getActiva() != null ? request.getActiva() : true)
                .build();

        Circunscripcion saved = circunscripcionRepository.save(circ);
        log.info("Circunscripción creada: {} - {} ({} escaños)", saved.getNombre(), saved.getEleccion().getNombre(), saved.getEscanos());
        return mapToResponse(saved);
    }

    @Transactional
    @Auditable(entidad = "Circunscripcion")
    public CircunscripcionResponse update(Long id, CircunscripcionRequest request) {
        Circunscripcion circ = circunscripcionRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Circunscripción no encontrada: " + id));

        if (request.getEleccionId() != null) {
            circ.setEleccion(eleccionService.getEleccionEntityById(request.getEleccionId()));
        }
        if (request.getTipoCircunscripcionId() != null) {
            circ.setTipoCircunscripcion(
                    tipoCircunscripcionRepository.findById(request.getTipoCircunscripcionId()).orElse(null));
        }
        if (request.getNombre() != null) circ.setNombre(request.getNombre());
        if (request.getCodigo() != null) circ.setCodigo(request.getCodigo());
        if (request.getEscanos() != null) circ.setEscanos(request.getEscanos());
        if (request.getUmbralElectoral() != null) circ.setUmbralElectoral(request.getUmbralElectoral());
        if (request.getMetodoAsignacion() != null) circ.setMetodoAsignacion(request.getMetodoAsignacion());
        if (request.getActiva() != null) circ.setActiva(request.getActiva());

        Circunscripcion saved = circunscripcionRepository.save(circ);
        return mapToResponse(saved);
    }

    @Transactional
    @Auditable(entidad = "Circunscripcion")
    public void delete(Long id) {
        if (!circunscripcionRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Circunscripción no encontrada: " + id);
        }
        circunscripcionRepository.deleteById(id);
    }

    @Transactional
    public ResultadoDHondtResponse calcularDHondt(Long id) {
        return dhondtService.calcular(id);
    }

    @Transactional(readOnly = true)
    public ResultadoDHondtResponse consultarDHondt(Long id) {
        return dhondtService.consultarResultado(id);
    }

    private CircunscripcionResponse mapToResponse(Circunscripcion circ) {
        return CircunscripcionResponse.builder()
                .id(circ.getId())
                .eleccionId(circ.getEleccion().getId())
                .eleccionNombre(circ.getEleccion().getNombre())
                .tipoCircunscripcionId(circ.getTipoCircunscripcion() != null ? circ.getTipoCircunscripcion().getId() : null)
                .tipoCircunscripcionCodigo(circ.getTipoCircunscripcion() != null ? circ.getTipoCircunscripcion().getCodigo() : null)
                .tipoCircunscripcionNombre(circ.getTipoCircunscripcion() != null ? circ.getTipoCircunscripcion().getNombre() : null)
                .nombre(circ.getNombre())
                .codigo(circ.getCodigo())
                .escanos(circ.getEscanos())
                .umbralElectoral(circ.getUmbralElectoral())
                .metodoAsignacion(circ.getMetodoAsignacion())
                .activa(circ.getActiva())
                .createdAt(circ.getCreatedAt())
                .build();
    }
}
