package com.electoral.repositories;

import com.electoral.entities.Observacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ObservacionRepository extends JpaRepository<Observacion, Long> {
    List<Observacion> findByMesaEleccionesIdOrderByCreatedAtDesc(Long eleccionId);
    List<Observacion> findByMesaIdOrderByCreatedAtDesc(Long mesaId);
}
