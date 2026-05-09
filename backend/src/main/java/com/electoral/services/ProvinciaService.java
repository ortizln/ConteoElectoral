package com.electoral.services;

import com.electoral.entities.Provincia;
import com.electoral.entities.Zona;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.repositories.ProvinciaRepository;
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
public class ProvinciaService {
    private final ProvinciaRepository provinciaRepository;
    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;

    @Transactional(readOnly = true)
    public List<Provincia> findAll() {
        return provinciaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Provincia> findByZonaId(Long zonaId) {
        return provinciaRepository.findByZonaId(zonaId);
    }

    @Transactional(readOnly = true)
    public Provincia findById(Long id) {
        return provinciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provincia no encontrada"));
    }

    @Transactional
    public Provincia save(Provincia provincia) {
        if (provinciaRepository.existsByNombreAndZonaId(provincia.getNombre(), provincia.getZona().getId())) {
            throw new DuplicateEntityException("Ya existe una provincia con el nombre '" + provincia.getNombre() + "' en esta zona");
        }
        log.info("Creando {}: {}", "Provincia", provincia.getNombre());
        Provincia saved = provinciaRepository.save(provincia);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.CREATE,
            "Provincia",
            saved.getId(),
            null,
            Map.of("nombre", saved.getNombre(), "descripcion", saved.getDescripcion())
        );
        return saved;
    }

    @Transactional
    public Provincia update(Long id, Provincia provincia) {
        Provincia existing = provinciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provincia no encontrada"));
        if (!existing.getNombre().equals(provincia.getNombre())
                && provinciaRepository.existsByNombreAndZonaId(provincia.getNombre(), provincia.getZona().getId())) {
            throw new DuplicateEntityException("Ya existe una provincia con el nombre '" + provincia.getNombre() + "' en esta zona");
        }
        log.info("Actualizando {} con ID: {}", "Provincia", id);
        Map<String, Object> datosAnteriores = Map.of("nombre", existing.getNombre(), "descripcion", existing.getDescripcion());
        existing.setNombre(provincia.getNombre());
        existing.setDescripcion(provincia.getDescripcion());
        existing.setZona(provincia.getZona());
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.UPDATE,
            "Provincia",
            id,
            datosAnteriores,
            Map.of("nombre", existing.getNombre(), "descripcion", existing.getDescripcion())
        );
        return provinciaRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        log.warn("Eliminando {} con ID: {}", "Provincia", id);
        auditoriaService.registrarAccion(
            securityUtil.getCurrentUserId(),
            Auditoria.TipoAccion.DELETE,
            "Provincia",
            id,
            null,
            null
        );
        provinciaRepository.deleteById(id);
    }
}
