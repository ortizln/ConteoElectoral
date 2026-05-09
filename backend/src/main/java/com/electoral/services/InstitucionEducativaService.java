package com.electoral.services;

import com.electoral.entities.InstitucionEducativa;
import com.electoral.entities.Parroquia;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.repositories.InstitucionEducativaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import com.electoral.entities.Auditoria;
import com.electoral.util.SecurityUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class InstitucionEducativaService {
    private final InstitucionEducativaRepository institucionRepository;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;

    @Transactional(readOnly = true)
    public List<InstitucionEducativa> findAll() {
        return institucionRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<InstitucionEducativa> findByParroquiaId(Long parroquiaId) {
        return institucionRepository.findByParroquiaId(parroquiaId);
    }

    @Transactional(readOnly = true)
    public InstitucionEducativa findById(Long id) {
        return institucionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institución Educativa no encontrada"));
    }

    @Transactional
    public InstitucionEducativa save(InstitucionEducativa institucion) {
        if (institucionRepository.existsByNombre(institucion.getNombre())) {
            throw new DuplicateEntityException("Ya existe una institución educativa con el nombre '" + institucion.getNombre() + "'");
        }
        if (institucion.getCodigo() != null && !institucion.getCodigo().isEmpty()
                && institucionRepository.existsByCodigo(institucion.getCodigo())) {
            throw new DuplicateEntityException("Ya existe una institución educativa con el código '" + institucion.getCodigo() + "'");
        }
        log.info("Creando {}: {}", "InstitucionEducativa", institucion.getNombre());
        InstitucionEducativa saved = institucionRepository.save(institucion);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "InstitucionEducativa",
            saved.getId(),
            null,
            Map.of("nombre", saved.getNombre(), "direccion", saved.getDireccion(), "codigo", saved.getCodigo(), "tipo", saved.getTipo())
        );
        return saved;
    }

    @Transactional
    public InstitucionEducativa update(Long id, InstitucionEducativa institucion) {
        InstitucionEducativa existing = institucionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institución Educativa no encontrada"));
        if (!existing.getNombre().equals(institucion.getNombre())
                && institucionRepository.existsByNombre(institucion.getNombre())) {
            throw new DuplicateEntityException("Ya existe una institución educativa con el nombre '" + institucion.getNombre() + "'");
        }
        if (institucion.getCodigo() != null && !institucion.getCodigo().isEmpty()
                && !institucion.getCodigo().equals(existing.getCodigo())
                && institucionRepository.existsByCodigo(institucion.getCodigo())) {
            throw new DuplicateEntityException("Ya existe una institución educativa con el código '" + institucion.getCodigo() + "'");
        }
        log.info("Actualizando {} con ID: {}", "InstitucionEducativa", id);
        Map<String, Object> datosAnteriores = Map.of("nombre", existing.getNombre(), "direccion", existing.getDireccion(), "codigo", existing.getCodigo(), "tipo", existing.getTipo());
        existing.setNombre(institucion.getNombre());
        existing.setDireccion(institucion.getDireccion());
        existing.setParroquia(institucion.getParroquia());
        existing.setCodigo(institucion.getCodigo());
        existing.setTipo(institucion.getTipo());
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "InstitucionEducativa",
            id,
            datosAnteriores,
            Map.of("nombre", existing.getNombre(), "direccion", existing.getDireccion(), "codigo", existing.getCodigo(), "tipo", existing.getTipo())
        );
        return institucionRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        log.warn("Eliminando {} con ID: {}", "InstitucionEducativa", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "InstitucionEducativa",
            id,
            null,
            null
        );
        institucionRepository.deleteById(id);
    }
}
