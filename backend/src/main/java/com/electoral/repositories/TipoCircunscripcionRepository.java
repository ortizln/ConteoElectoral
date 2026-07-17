package com.electoral.repositories;

import com.electoral.entities.TipoCircunscripcion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipoCircunscripcionRepository extends JpaRepository<TipoCircunscripcion, Long> {
    Optional<TipoCircunscripcion> findByCodigo(String codigo);
}
