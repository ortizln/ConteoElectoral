package com.electoral.repositories;

import com.electoral.entities.MesaNuloBlanco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MesaNuloBlancoRepository extends JpaRepository<MesaNuloBlanco, Long> {
    List<MesaNuloBlanco> findByMesaId(Long mesaId);
    Optional<MesaNuloBlanco> findByMesaIdAndCargoIdAndTipo(Long mesaId, Long cargoId, String tipo);
}
