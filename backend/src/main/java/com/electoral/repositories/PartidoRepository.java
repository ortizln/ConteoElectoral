package com.electoral.repositories;

import com.electoral.entities.Partido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PartidoRepository extends JpaRepository<Partido, Long> {
    List<Partido> findByEleccionesId(Long eleccionesId);
    boolean existsByNombreAndEleccionesId(String nombre, Long eleccionesId);
    boolean existsByNombreAndEleccionesIdAndIdNot(String nombre, Long eleccionesId, Long id);
    long countByEleccionesId(Long eleccionesId);
}