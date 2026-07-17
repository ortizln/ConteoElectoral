package com.electoral.repositories;

import com.electoral.entities.OpcionPapeleta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OpcionPapeletaRepository extends JpaRepository<OpcionPapeleta, Long> {
    List<OpcionPapeleta> findByPapeletaIdOrderByOrden(Long papeletaId);
    void deleteByPapeletaIdIn(List<Long> papeletaIds);
    void deleteByPapeletaId(Long papeletaId);
}
