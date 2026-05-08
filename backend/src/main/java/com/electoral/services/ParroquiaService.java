package com.electoral.services;

import com.electoral.entities.Parroquia;
import com.electoral.entities.Canton;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.repositories.ParroquiaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParroquiaService {
    private final ParroquiaRepository parroquiaRepository;

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
        return parroquiaRepository.save(parroquia);
    }

    @Transactional
    public Parroquia update(Long id, Parroquia parroquia) {
        Parroquia existing = parroquiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parroquia no encontrada"));
        if (!existing.getNombre().equals(parroquia.getNombre())
                && parroquiaRepository.existsByNombreAndCantonId(parroquia.getNombre(), parroquia.getCanton().getId())) {
            throw new DuplicateEntityException("Ya existe una parroquia con el nombre '" + parroquia.getNombre() + "' en este cantón");
        }
        existing.setNombre(parroquia.getNombre());
        existing.setDescripcion(parroquia.getDescripcion());
        existing.setCanton(parroquia.getCanton());
        return parroquiaRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        parroquiaRepository.deleteById(id);
    }
}
