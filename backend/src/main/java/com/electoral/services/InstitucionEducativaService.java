package com.electoral.services;

import com.electoral.entities.InstitucionEducativa;
import com.electoral.entities.Parroquia;
import com.electoral.repositories.InstitucionEducativaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InstitucionEducativaService {
    private final InstitucionEducativaRepository institucionRepository;

    public List<InstitucionEducativa> findAll() {
        return institucionRepository.findAll();
    }

    public List<InstitucionEducativa> findByParroquiaId(Long parroquiaId) {
        return institucionRepository.findByParroquiaId(parroquiaId);
    }

    public InstitucionEducativa findById(Long id) {
        return institucionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institución Educativa no encontrada"));
    }

    @Transactional
    public InstitucionEducativa save(InstitucionEducativa institucion) {
        return institucionRepository.save(institucion);
    }

    @Transactional
    public void delete(Long id) {
        institucionRepository.deleteById(id);
    }
}
