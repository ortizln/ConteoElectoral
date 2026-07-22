package com.electoral.repositories;

import com.electoral.entities.Impugnacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ImpugnacionRepository extends JpaRepository<Impugnacion, Long> {
    List<Impugnacion> findByMesaEleccionesIdOrderByCreatedAtDesc(Long eleccionId);
    List<Impugnacion> findByMesaIdOrderByCreatedAtDesc(Long mesaId);
    List<Impugnacion> findByEstadoOrderByCreatedAtDesc(String estado);
    long countByEstado(String estado);
}
