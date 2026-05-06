package com.electoral.services;

import com.electoral.entities.Zona;
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
        return zonaRepository.save(zona);
    }

    @Transactional
    public void delete(Long id) {
        zonaRepository.deleteById(id);
    }
}
