package com.electoral.repositories;

import com.electoral.entities.Circunscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CircunscripcionRepository extends JpaRepository<Circunscripcion, Long> {
    List<Circunscripcion> findByEleccionIdOrderByNombre(Long eleccionId);
    List<Circunscripcion> findByEleccionIdAndActivaTrueOrderByNombre(Long eleccionId);
}
