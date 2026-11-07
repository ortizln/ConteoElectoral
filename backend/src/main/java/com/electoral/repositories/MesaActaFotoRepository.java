package com.electoral.repositories;

import com.electoral.entities.MesaActaFoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MesaActaFotoRepository extends JpaRepository<MesaActaFoto, Long> {
    List<MesaActaFoto> findByMesaIdOrderByCreatedAtDesc(Long mesaId);
    List<MesaActaFoto> findByMesaIdInOrderByMesaId(List<Long> mesaIds);
    boolean existsByMesaId(Long mesaId);
    long countByMesaId(Long mesaId);
    void deleteByMesaId(Long mesaId);
}
