package com.electoral.services;

import com.electoral.entities.Parroquia;
import com.electoral.entities.Canton;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.repositories.ParroquiaRepository;
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
public class ParroquiaService {
    private final ParroquiaRepository parroquiaRepository;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;

    @Transactional(readOnly = true)
    public List<Parroquia> findAll() {
        return parroquiaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Parroquia> findByCantonId(Long cantonId) {
        return parroquiaRepository.findByCantonId(cantonId);
    }

    @Transactional(readOnly = true)
    public Parroquia findById(Long id) {
        return parroquiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parroquia no encontrada"));
    }

    @Transactional
    public Parroquia save(Parroquia parroquia) {
        if (parroquiaRepository.existsByNombreAndCantonId(parroquia.getNombre(), parroquia.getCanton().getId())) {
            throw new DuplicateEntityException("Ya existe una parroquia con el nombre '" + parroquia.getNombre() + "' en este cantón");
        }
        log.info("Creando {}: {}", "Parroquia", parroquia.getNombre());
        Parroquia saved = parroquiaRepository.save(parroquia);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "Parroquia",
            saved.getId(),
            null,
            Map.of("nombre", saved.getNombre(), "descripcion", saved.getDescripcion())
        );
        return saved;
    }

    @Transactional
    public Parroquia update(Long id, Parroquia parroquia) {
        Parroquia existing = parroquiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parroquia no encontrada"));
        if (!existing.getNombre().equals(parroquia.getNombre())
                && parroquiaRepository.existsByNombreAndCantonId(parroquia.getNombre(), parroquia.getCanton().getId())) {
            throw new DuplicateEntityException("Ya existe una parroquia con el nombre '" + parroquia.getNombre() + "' en este cantón");
        }
        log.info("Actualizando {} con ID: {}", "Parroquia", id);
        Map<String, Object> datosAnteriores = Map.of("nombre", existing.getNombre(), "descripcion", existing.getDescripcion());
        existing.setNombre(parroquia.getNombre());
        existing.setDescripcion(parroquia.getDescripcion());
        existing.setCanton(parroquia.getCanton());
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "Parroquia",
            id,
            datosAnteriores,
            Map.of("nombre", existing.getNombre(), "descripcion", existing.getDescripcion())
        );
        return parroquiaRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        log.warn("Eliminando {} con ID: {}", "Parroquia", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "Parroquia",
            id,
            null,
            null
        );
        parroquiaRepository.deleteById(id);
    }
}
