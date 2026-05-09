package com.electoral.services;

import com.electoral.entities.Zona;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.repositories.ZonaRepository;
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
public class ZonaService {
    private final ZonaRepository zonaRepository;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;

    public List<Zona> findAll() {
        return zonaRepository.findAll();
    }

    public Zona findById(Long id) {
        return zonaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zona no encontrada"));
    }

    @Transactional
    public Zona save(Zona zona) {
        if (zonaRepository.existsByNombre(zona.getNombre())) {
            throw new DuplicateEntityException("Ya existe una zona con el nombre '" + zona.getNombre() + "'");
        }
        log.info("Creando {}: {}", "Zona", zona.getNombre());
        Zona saved = zonaRepository.save(zona);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "Zona",
            saved.getId(),
            null,
            Map.of("nombre", saved.getNombre(), "descripcion", saved.getDescripcion())
        );
        return saved;
    }

    @Transactional
    public Zona update(Long id, Zona zona) {
        Zona existing = zonaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zona no encontrada"));
        if (!existing.getNombre().equals(zona.getNombre()) && zonaRepository.existsByNombre(zona.getNombre())) {
            throw new DuplicateEntityException("Ya existe una zona con el nombre '" + zona.getNombre() + "'");
        }
        log.info("Actualizando {} con ID: {}", "Zona", id);
        Map<String, Object> datosAnteriores = Map.of("nombre", existing.getNombre(), "descripcion", existing.getDescripcion());
        existing.setNombre(zona.getNombre());
        existing.setDescripcion(zona.getDescripcion());
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "Zona",
            id,
            datosAnteriores,
            Map.of("nombre", existing.getNombre(), "descripcion", existing.getDescripcion())
        );
        return zonaRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        log.warn("Eliminando {} con ID: {}", "Zona", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "Zona",
            id,
            null,
            null
        );
        zonaRepository.deleteById(id);
    }
}
