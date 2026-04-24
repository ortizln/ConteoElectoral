package com.electoral.repositories;

import com.electoral.entities.Voto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VotoRepository extends JpaRepository<Voto, Long> {
    List<Voto> findByMesaId(Long mesaId);
    List<Voto> findByEleccionesId(Long eleccionesId);
    List<Voto> findByCandidatoId(Long candidatoId);
    
    Optional<Voto> findByMesaIdAndCandidatoId(Long mesaId, Long candidatoId);
    
    @Query("SELECT COALESCE(SUM(v.cantidadVotos), 0) FROM Voto v WHERE v.elecciones.id = :eleccionId")
    Long sumVotosByEleccion(Long eleccionId);
    
    @Query("SELECT COALESCE(SUM(v.cantidadVotos), 0) FROM Voto v WHERE v.candidato.id = :candidatoId")
    Long sumVotosByCandidato(Long candidatoId);
    
    @Query("SELECT v.candidato.id, SUM(v.cantidadVotos) FROM Voto v WHERE v.elecciones.id = :eleccionId GROUP BY v.candidato.id")
    List<Object[]> sumVotosGroupByCandidato(Long eleccionId);
    
    @Query("SELECT v.mesa.recinto.id, SUM(v.cantidadVotos) FROM Voto v WHERE v.elecciones.id = :eleccionId GROUP BY v.mesa.recinto.id")
    List<Object[]> sumVotosGroupByRecinto(Long eleccionId);
}