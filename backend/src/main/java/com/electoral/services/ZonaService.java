package com.electoral.services;

import com.electoral.entities.Zona;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.repositories.ZonaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ZonaService {
    private final ZonaRepository zonaRepository;

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
        return zonaRepository.save(zona);
    }

    @Transactional
    public Zona update(Long id, Zona zona) {
        Zona existing = zonaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zona no encontrada"));
        if (!existing.getNombre().equals(zona.getNombre()) && zonaRepository.existsByNombre(zona.getNombre())) {
            throw new DuplicateEntityException("Ya existe una zona con el nombre '" + zona.getNombre() + "'");
        }
        existing.setNombre(zona.getNombre());
        existing.setDescripcion(zona.getDescripcion());
        return zonaRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        zonaRepository.deleteById(id);
    }
}
