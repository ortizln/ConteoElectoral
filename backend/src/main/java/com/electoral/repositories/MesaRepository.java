package com.electoral.repositories;

import com.electoral.entities.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    boolean existsByNumeroAndSexoAndInstitucionId(String numero, Mesa.SexoMesa sexo, Long institucionId);
    boolean existsByNumeroAndSexoAndInstitucionIdAndIdNot(String numero, Mesa.SexoMesa sexo, Long institucionId, Long id);

    @Query("SELECT m FROM Mesa m LEFT JOIN FETCH m.institucion i LEFT JOIN FETCH i.parroquia p LEFT JOIN FETCH p.canton c LEFT JOIN FETCH c.provincia pro LEFT JOIN FETCH pro.zona LEFT JOIN FETCH m.elecciones WHERE m.id = :id")
    java.util.Optional<Mesa> findByIdWithAll(@Param("id") Long id);

    @Query("SELECT COALESCE(SUM(m.votosNulos), 0) FROM Mesa m WHERE m.id IN :mesaIds")
    Long sumVotosNulosByMesaIds(@Param("mesaIds") List<Long> mesaIds);
}