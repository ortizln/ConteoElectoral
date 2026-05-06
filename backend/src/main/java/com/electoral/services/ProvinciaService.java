package com.electoral.services;

import com.electoral.entities.Provincia;
import com.electoral.entities.Zona;
import com.electoral.repositories.ProvinciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProvinciaService {
    private final ProvinciaRepository provinciaRepository;

    public List<Provincia> findAll() {
        return provinciaRepository.findAll();
    }

    public List<Provincia> findByZonaId(Long zonaId) {
        return provinciaRepository.findByZonaId(zonaId);
    }

    public Provincia findById(Long id) {
        return provinciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provincia no encontrada"));
    }

    @Transactional
    public Provincia save(Provincia provincia) {
        return provinciaRepository.save(provincia);
    }

    @Transactional
    public void delete(Long id) {
        provinciaRepository.deleteById(id);
    }
}
