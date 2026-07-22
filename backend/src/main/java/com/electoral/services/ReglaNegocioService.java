package com.electoral.services;

import com.electoral.dto.*;
import com.electoral.entities.ReglaNegocio;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.exception.RecursoNoEncontradoException;
import com.electoral.repositories.ReglaNegocioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class ReglaNegocioService {

    private final ReglaNegocioRepository reglaNegocioRepository;
    private final RuleEngine ruleEngine;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public List<ReglaNegocioResponse> findAll(String modulo, String tipo, Boolean activa) {
        List<ReglaNegocio> reglas;
        if (modulo != null && tipo != null) {
            reglas = reglaNegocioRepository.findByModulo(modulo).stream()
                    .filter(r -> r.getTipo().equals(tipo))
                    .collect(Collectors.toList());
        } else if (modulo != null) {
            reglas = reglaNegocioRepository.findByModulo(modulo);
        } else {
            reglas = reglaNegocioRepository.findAll();
        }
        if (activa != null) {
            reglas = reglas.stream()
                    .filter(r -> r.getActiva().equals(activa))
                    .collect(Collectors.toList());
        }
        reglas.sort(Comparator.comparingInt(ReglaNegocio::getPrioridad).reversed());
        return reglas.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ReglaNegocioResponse findById(Long id) {
        ReglaNegocio regla = reglaNegocioRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Regla de negocio no encontrada con ID: " + id));
        return mapToResponse(regla);
    }

    @Transactional
    public ReglaNegocioResponse create(ReglaNegocioRequest request) {
        if (reglaNegocioRepository.existsByNombreAndModulo(request.getNombre(), request.getModulo())) {
            throw new DuplicateEntityException("Ya existe una regla con el nombre '" + request.getNombre() +
                    "' en el módulo '" + request.getModulo() + "'");
        }
        validarCondicionJson(request.getCondicion());

        ReglaNegocio regla = ReglaNegocio.builder()
                .tipo(request.getTipo())
                .modulo(request.getModulo())
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .condicion(request.getCondicion())
                .mensajeError(request.getMensajeError())
                .accion(request.getAccion())
                .activa(request.getActiva() != null ? request.getActiva() : true)
                .prioridad(request.getPrioridad() != null ? request.getPrioridad() : 0)
                .build();

        ReglaNegocio saved = reglaNegocioRepository.save(regla);
        log.info("Regla de negocio creada: {} [{} - {}]", saved.getNombre(), saved.getModulo(), saved.getTipo());
        return mapToResponse(saved);
    }

    @Transactional
    public ReglaNegocioResponse update(Long id, ReglaNegocioRequest request) {
        ReglaNegocio regla = reglaNegocioRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Regla de negocio no encontrada con ID: " + id));

        if (!regla.getNombre().equals(request.getNombre()) || !regla.getModulo().equals(request.getModulo())) {
            if (reglaNegocioRepository.existsByNombreAndModuloAndIdNot(request.getNombre(), request.getModulo(), id)) {
                throw new DuplicateEntityException("Ya existe una regla con el nombre '" + request.getNombre() +
                        "' en el módulo '" + request.getModulo() + "'");
            }
        }
        if (request.getCondicion() != null) {
            validarCondicionJson(request.getCondicion());
            regla.setCondicion(request.getCondicion());
        }

        regla.setTipo(request.getTipo());
        regla.setModulo(request.getModulo());
        regla.setNombre(request.getNombre());
        regla.setDescripcion(request.getDescripcion());
        regla.setMensajeError(request.getMensajeError());
        regla.setAccion(request.getAccion());
        regla.setActiva(request.getActiva() != null ? request.getActiva() : regla.getActiva());
        regla.setPrioridad(request.getPrioridad() != null ? request.getPrioridad() : regla.getPrioridad());

        ReglaNegocio saved = reglaNegocioRepository.save(regla);
        log.info("Regla de negocio actualizada: {} [{}]", saved.getNombre(), saved.getId());
        return mapToResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!reglaNegocioRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Regla de negocio no encontrada con ID: " + id);
        }
        reglaNegocioRepository.deleteById(id);
        log.info("Regla de negocio eliminada: {}", id);
    }

    @Transactional
    public ReglaNegocioResponse toggleActiva(Long id) {
        ReglaNegocio regla = reglaNegocioRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Regla de negocio no encontrada con ID: " + id));
        regla.setActiva(!regla.getActiva());
        ReglaNegocio saved = reglaNegocioRepository.save(regla);
        log.info("Regla de negocio {} {}activada: {}", saved.getNombre(),
                saved.getActiva() ? "" : "des", id);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public EvaluacionReglaResponse evaluarReglas(String modulo, Map<String, Object> datos,
                                                   String entidad, Long entidadId) {
        List<ReglaNegocio> reglas = reglaNegocioRepository
                .findByModuloAndTipoAndActivaTrueOrderByPrioridadDesc(modulo, "VALIDACION");
        List<EvaluacionReglaResponse.ErrorRegla> errores = ruleEngine.evaluarReglas(reglas, datos);

        return EvaluacionReglaResponse.builder()
                .modulo(modulo)
                .entidad(entidad)
                .entidadId(entidadId)
                .valido(errores.isEmpty())
                .errores(errores)
                .build();
    }

    @Transactional(readOnly = true)
    public List<ReglaNegocio> obtenerReglasActivas(String modulo, String tipo) {
        return reglaNegocioRepository.findByModuloAndTipoAndActivaTrueOrderByPrioridadDesc(modulo, tipo);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> convertirEntidadAMapa(Object entity) {
        Map<String, Object> mapa = new HashMap<>();
        try {
            String json = objectMapper.writeValueAsString(entity);
            mapa = objectMapper.readValue(json, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            log.warn("Error convirtiendo entidad a mapa: {}", e.getMessage());
        }
        return mapa;
    }

    private void validarCondicionJson(String condicion) {
        try {
            objectMapper.readTree(condicion);
        } catch (Exception e) {
            throw new IllegalArgumentException("La condición no es un JSON válido: " + e.getMessage());
        }
    }

    private ReglaNegocioResponse mapToResponse(ReglaNegocio regla) {
        return ReglaNegocioResponse.builder()
                .id(regla.getId())
                .tipo(regla.getTipo())
                .modulo(regla.getModulo())
                .nombre(regla.getNombre())
                .descripcion(regla.getDescripcion())
                .condicion(regla.getCondicion())
                .mensajeError(regla.getMensajeError())
                .accion(regla.getAccion())
                .activa(regla.getActiva())
                .prioridad(regla.getPrioridad())
                .createdAt(regla.getCreatedAt())
                .updatedAt(regla.getUpdatedAt())
                .build();
    }
}
