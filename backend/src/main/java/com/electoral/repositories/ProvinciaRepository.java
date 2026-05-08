package com.electoral.repositories;

import com.electoral.entities.Provincia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProvinciaRepository extends JpaRepository<Provincia, Long> {
    List<Provincia> findByZonaId(Long zonaId);
    boolean existsByNombreAndZonaId(String nombre, Long zonaId);
    boolean existsByNombreAndZonaIdAndIdNot(String nombre, Long zonaId, Long id);
}
