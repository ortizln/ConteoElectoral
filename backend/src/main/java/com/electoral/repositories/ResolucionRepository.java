package com.electoral.repositories;

import com.electoral.entities.Resolucion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResolucionRepository extends JpaRepository<Resolucion, Long> {
    Optional<Resolucion> findByCodigo(String codigo);
    List<Resolucion> findByImpugnacionIdOrderByCreatedAtDesc(Long impugnacionId);
    List<Resolucion> findAllByOrderByCreatedAtDesc();
}
