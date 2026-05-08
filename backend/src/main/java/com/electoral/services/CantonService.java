package com.electoral.services;

import com.electoral.entities.Canton;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.repositories.CantonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CantonService {
    private final CantonRepository cantonRepository;

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
        return cantonRepository.save(canton);
    }

    @Transactional
    public Canton update(Long id, Canton canton) {
        Canton existing = cantonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cantón no encontrado"));
        if (!existing.getNombre().equals(canton.getNombre())
                && cantonRepository.existsByNombreAndProvinciaId(canton.getNombre(), canton.getProvincia().getId())) {
            throw new DuplicateEntityException("Ya existe un cantón con el nombre '" + canton.getNombre() + "' en esta provincia");
        }
        existing.setNombre(canton.getNombre());
        existing.setDescripcion(canton.getDescripcion());
        existing.setProvincia(canton.getProvincia());
        return cantonRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        cantonRepository.deleteById(id);
    }
}
