package com.electoral.repositories;

import com.electoral.entities.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {
    @Query("SELECT m FROM Mesa m LEFT JOIN FETCH m.recinto LEFT JOIN FETCH m.elecciones WHERE m.recinto.id = :recintoId")
    List<Mesa> findByRecintoId(Long recintoId);

    @Query("SELECT m FROM Mesa m LEFT JOIN FETCH m.recinto LEFT JOIN FETCH m.elecciones WHERE m.elecciones.id = :eleccionesId")
    List<Mesa> findByEleccionesId(Long eleccionesId);

    List<Mesa> findByEleccionesIdAndCerrada(Long eleccionesId, Boolean cerrada);
    Long countByEleccionesId(Long eleccionesId);
    Long countByEleccionesIdAndCerrada(Long eleccionesId, Boolean cerrada);
    boolean existsByNumeroAndRecintoId(String numero, Long recintoId);
    boolean existsByNumeroAndRecintoIdAndIdNot(String numero, Long recintoId, Long id);
}