package com.electoral.repositories;

import com.electoral.entities.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {
    @Query("SELECT m FROM Mesa m LEFT JOIN FETCH m.institucion LEFT JOIN FETCH m.elecciones WHERE m.institucion.id = :institucionId")
    List<Mesa> findByInstitucionId(Long institucionId);

    @Query("SELECT m FROM Mesa m LEFT JOIN FETCH m.institucion LEFT JOIN FETCH m.elecciones WHERE m.elecciones.id = :eleccionesId")
    List<Mesa> findByEleccionesId(Long eleccionesId);

    List<Mesa> findByEleccionesIdAndCerrada(Long eleccionesId, Boolean cerrada);
    Long countByEleccionesId(Long eleccionesId);
    Long countByEleccionesIdAndCerrada(Long eleccionesId, Boolean cerrada);
    boolean existsByNumeroAndInstitucionId(String numero, Long institucionId);
    boolean existsByNumeroAndInstitucionIdAndIdNot(String numero, Long institucionId, Long id);
}