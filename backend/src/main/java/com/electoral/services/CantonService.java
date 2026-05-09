package com.electoral.services;

import com.electoral.entities.Canton;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.repositories.CantonRepository;
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
public class CantonService {
    private final CantonRepository cantonRepository;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;

    @Transactional(readOnly = true)
    public List<Canton> findAll() {
        return cantonRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Canton> findByProvinciaId(Long provinciaId) {
        return cantonRepository.findByProvinciaId(provinciaId);
    }

    @Transactional(readOnly = true)
    public Canton findById(Long id) {
        return cantonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cantón no encontrado"));
    }

    @Transactional
    public Canton save(Canton canton) {
        if (cantonRepository.existsByNombreAndProvinciaId(canton.getNombre(), canton.getProvincia().getId())) {
            throw new DuplicateEntityException("Ya existe un cantón con el nombre '" + canton.getNombre() + "' en esta provincia");
        }
        log.info("Creando {}: {}", "Canton", canton.getNombre());
        Canton saved = cantonRepository.save(canton);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "Canton",
            saved.getId(),
            null,
            Map.of("nombre", saved.getNombre(), "descripcion", saved.getDescripcion())
        );
        return saved;
    }

    @Transactional
    public Canton update(Long id, Canton canton) {
        Canton existing = cantonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cantón no encontrado"));
        if (!existing.getNombre().equals(canton.getNombre())
                && cantonRepository.existsByNombreAndProvinciaId(canton.getNombre(), canton.getProvincia().getId())) {
            throw new DuplicateEntityException("Ya existe un cantón con el nombre '" + canton.getNombre() + "' en esta provincia");
        }
        log.info("Actualizando {} con ID: {}", "Canton", id);
        Map<String, Object> datosAnteriores = Map.of("nombre", existing.getNombre(), "descripcion", existing.getDescripcion());
        existing.setNombre(canton.getNombre());
        existing.setDescripcion(canton.getDescripcion());
        existing.setProvincia(canton.getProvincia());
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "Canton",
            id,
            datosAnteriores,
            Map.of("nombre", existing.getNombre(), "descripcion", existing.getDescripcion())
        );
        return cantonRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        log.warn("Eliminando {} con ID: {}", "Canton", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "Canton",
            id,
            null,
            null
        );
        cantonRepository.deleteById(id);
    }
}
