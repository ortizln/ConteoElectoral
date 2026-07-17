package com.electoral.repositories;

import com.electoral.entities.TipoEleccionCargo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoEleccionCargoRepository extends JpaRepository<TipoEleccionCargo, Long> {
    List<TipoEleccionCargo> findByTipoEleccionIdOrderByOrden(Long tipoEleccionId);
    void deleteByTipoEleccionId(Long tipoEleccionId);
}
