package com.electoral.repositories;

import com.electoral.entities.Recinto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecintoRepository extends JpaRepository<Recinto, Long> {
    List<Recinto> findByEleccionesId(Long eleccionesId);
}