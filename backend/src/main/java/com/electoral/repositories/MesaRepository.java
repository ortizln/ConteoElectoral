package com.electoral.repositories;

import com.electoral.entities.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {
    List<Mesa> findByRecintoId(Long recintoId);
    List<Mesa> findByEleccionesId(Long eleccionesId);
    List<Mesa> findByEleccionesIdAndCerrada(Long eleccionesId, Boolean cerrada);
    Long countByEleccionesId(Long eleccionesId);
    Long countByEleccionesIdAndCerrada(Long eleccionesId, Boolean cerrada);
}