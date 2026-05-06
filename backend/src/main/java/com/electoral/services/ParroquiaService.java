package com.electoral.services;

import com.electoral.entities.Parroquia;
import com.electoral.entities.Canton;
import com.electoral.repositories.ParroquiaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParroquiaService {
    private final ParroquiaRepository parroquiaRepository;

    public List<Parroquia> findAll() {
        return parroquiaRepository.findAll();
    }

    public List<Parroquia> findByCantonId(Long cantonId) {
        return parroquiaRepository.findByCantonId(cantonId);
    }

    public Parroquia findById(Long id) {
        return parroquiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parroquia no encontrada"));
    }

    @Transactional
    public Parroquia save(Parroquia parroquia) {
        return parroquiaRepository.save(parroquia);
    }

    @Transactional
    public void delete(Long id) {
        parroquiaRepository.deleteById(id);
    }
}
