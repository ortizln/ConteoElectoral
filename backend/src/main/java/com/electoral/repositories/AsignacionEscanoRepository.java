package com.electoral.repositories;

import com.electoral.entities.AsignacionEscano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AsignacionEscanoRepository extends JpaRepository<AsignacionEscano, Long> {
    List<AsignacionEscano> findByCircunscripcionIdOrderByEscanosAsignadosDesc(Long circunscripcionId);
    Optional<AsignacionEscano> findByCircunscripcionIdAndPartidoId(Long circunscripcionId, Long partidoId);
    void deleteByCircunscripcionId(Long circunscripcionId);
}
