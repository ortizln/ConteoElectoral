package com.electoral.repositories;

import com.electoral.entities.Reconteo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReconteoRepository extends JpaRepository<Reconteo, Long> {
    List<Reconteo> findByMesaEleccionesIdOrderByCreatedAtDesc(Long eleccionId);
    List<Reconteo> findByMesaIdOrderByCreatedAtDesc(Long mesaId);
    List<Reconteo> findByEstadoOrderByCreatedAtDesc(String estado);
    long countByEstado(String estado);
}
