package com.electoral.services;

import com.electoral.entities.Provincia;
import com.electoral.entities.Zona;
import com.electoral.exception.DuplicateEntityException;
import com.electoral.repositories.ProvinciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProvinciaService {
    private final ProvinciaRepository provinciaRepository;

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
        return provinciaRepository.save(provincia);
    }

    @Transactional
    public Provincia update(Long id, Provincia provincia) {
        Provincia existing = provinciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provincia no encontrada"));
        if (!existing.getNombre().equals(provincia.getNombre())
                && provinciaRepository.existsByNombreAndZonaId(provincia.getNombre(), provincia.getZona().getId())) {
            throw new DuplicateEntityException("Ya existe una provincia con el nombre '" + provincia.getNombre() + "' en esta zona");
        }
        existing.setNombre(provincia.getNombre());
        existing.setDescripcion(provincia.getDescripcion());
        existing.setZona(provincia.getZona());
        return provinciaRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        provinciaRepository.deleteById(id);
    }
}
