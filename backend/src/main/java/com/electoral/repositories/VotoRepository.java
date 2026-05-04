package com.electoral.repositories;

import com.electoral.entities.Voto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
@SuppressWarnings("null")
public interface VotoRepository extends JpaRepository<Voto, Long> {
    
    @Query("SELECT v FROM Voto v JOIN FETCH v.candidato c LEFT JOIN FETCH c.partido LEFT JOIN FETCH v.mesa m LEFT JOIN FETCH v.elecciones e WHERE v.mesa.id = :mesaId")
    List<Voto> findByMesaId(@Param("mesaId") Long mesaId);
     
    @Query("SELECT v FROM Voto v JOIN FETCH v.candidato c LEFT JOIN FETCH c.partido LEFT JOIN FETCH v.mesa m LEFT JOIN FETCH v.elecciones e WHERE v.elecciones.id = :eleccionesId")
    List<Voto> findByEleccionesId(@Param("eleccionesId") Long eleccionesId);
     
    @Query("SELECT v FROM Voto v JOIN FETCH v.candidato c LEFT JOIN FETCH c.partido LEFT JOIN FETCH v.mesa m LEFT JOIN FETCH v.elecciones e WHERE v.id = :id")
    Optional<Voto> findById(@Param("id") Long id);
     
    List<Voto> findByCandidatoId(Long candidatoId);
     
    Optional<Voto> findByMesaIdAndCandidatoId(Long mesaId, Long candidatoId);
     
    @Query("SELECT COALESCE(SUM(v.cantidadVotos), 0) FROM Voto v WHERE v.elecciones.id = :eleccionId")
    Long sumVotosByEleccion(Long eleccionId);
     
    @Query("SELECT COALESCE(SUM(v.cantidadVotos), 0) FROM Voto v WHERE v.elecciones.id = :eleccionId AND v.mesa.id IN :mesaIds")
    Long sumVotosByEleccionAndMesaIds(@Param("eleccionId") Long eleccionId, @Param("mesaIds") List<Long> mesaIds);
     
    @Query("SELECT COALESCE(SUM(v.cantidadVotos), 0) FROM Voto v WHERE v.candidato.id = :candidatoId")
    Long sumVotosByCandidato(Long candidatoId);
     
    @Query("SELECT v.candidato.id, SUM(v.cantidadVotos) FROM Voto v WHERE v.elecciones.id = :eleccionId GROUP BY v.candidato.id")
    List<Object[]> sumVotosGroupByCandidato(Long eleccionId);
     
    @Query("SELECT v.candidato.id, SUM(v.cantidadVotos) FROM Voto v WHERE v.elecciones.id = :eleccionId AND v.mesa.id IN :mesaIds GROUP BY v.candidato.id")
    List<Object[]> sumVotosGroupByCandidatoAndMesaIds(@Param("eleccionId") Long eleccionId, @Param("mesaIds") List<Long> mesaIds);
     
    @Query("SELECT v.mesa.recinto.id, SUM(v.cantidadVotos) FROM Voto v WHERE v.elecciones.id = :eleccionId GROUP BY v.mesa.recinto.id")
    List<Object[]> sumVotosGroupByRecinto(Long eleccionId);
}
