package com.electoral.services;

import com.electoral.entities.Canton;
import com.electoral.entities.Provincia;
import com.electoral.repositories.CantonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CantonService {
    private final CantonRepository cantonRepository;

    public List<Canton> findAll() {
        return cantonRepository.findAll();
    }

    public List<Canton> findByProvinciaId(Long provinciaId) {
        return cantonRepository.findByProvinciaId(provinciaId);
    }

    public Canton findById(Long id) {
        return cantonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cantón no encontrado"));
    }

    @Transactional
    public Canton save(Canton canton) {
        return cantonRepository.save(canton);
    }

    @Transactional
    public void delete(Long id) {
        cantonRepository.deleteById(id);
    }
}
