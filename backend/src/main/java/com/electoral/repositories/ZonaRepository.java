package com.electoral.repositories;

import com.electoral.entities.Zona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZonaRepository extends JpaRepository<Zona, Long> {
    boolean existsByNombre(String nombre);
    boolean existsByNombreAndIdNot(String nombre, Long id);
}
