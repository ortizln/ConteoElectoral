package com.electoral.repositories;

import com.electoral.entities.Candidato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, Long> {
    List<Candidato> findByEleccionesId(Long eleccionesId);
    List<Candidato> findByCargoId(Long cargoId);
    
    @Query("SELECT c FROM Candidato c WHERE c.elecciones.id = :eleccionId ORDER BY c.cargo.nombre, c.apellido")
    List<Candidato> findByEleccionOrderByCargo(Long eleccionId);
}