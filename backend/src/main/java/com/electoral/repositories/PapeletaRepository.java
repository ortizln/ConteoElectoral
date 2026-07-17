package com.electoral.repositories;

import com.electoral.entities.Papeleta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PapeletaRepository extends JpaRepository<Papeleta, Long> {
    List<Papeleta> findByEleccionIdOrderByOrden(Long eleccionId);
    List<Papeleta> findByEleccionIdAndCargoId(Long eleccionId, Long cargoId);
    void deleteByEleccionId(Long eleccionId);
}
