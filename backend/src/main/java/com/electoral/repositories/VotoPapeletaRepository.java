package com.electoral.repositories;

import com.electoral.entities.VotoPapeleta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface VotoPapeletaRepository extends JpaRepository<VotoPapeleta, Long> {
    List<VotoPapeleta> findByMesaId(Long mesaId);
    List<VotoPapeleta> findByEleccionesId(Long eleccionId);
    Optional<VotoPapeleta> findByOpcionPapeletaIdAndMesaId(Long opcionPapeletaId, Long mesaId);
}
