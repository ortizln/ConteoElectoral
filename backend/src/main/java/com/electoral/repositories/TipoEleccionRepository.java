package com.electoral.repositories;

import com.electoral.entities.TipoEleccion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipoEleccionRepository extends JpaRepository<TipoEleccion, Long> {
    Optional<TipoEleccion> findByNombre(String nombre);
}
