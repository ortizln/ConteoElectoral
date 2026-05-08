package com.electoral.services;

import com.electoral.entities.InstitucionEducativa;
import com.electoral.entities.Parroquia;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.repositories.InstitucionEducativaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InstitucionEducativaService {
    private final InstitucionEducativaRepository institucionRepository;

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
        return institucionRepository.save(institucion);
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
        existing.setNombre(institucion.getNombre());
        existing.setDireccion(institucion.getDireccion());
        existing.setParroquia(institucion.getParroquia());
        existing.setCodigo(institucion.getCodigo());
        existing.setTipo(institucion.getTipo());
        return institucionRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        institucionRepository.deleteById(id);
    }
}
