package com.electoral.repositories;

import com.electoral.entities.ListaElectoral;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ListaElectoralRepository extends JpaRepository<ListaElectoral, Long> {
    List<ListaElectoral> findByEleccionId(Long eleccionId);
    List<ListaElectoral> findByEleccionIdAndCargoId(Long eleccionId, Long cargoId);
    List<ListaElectoral> findByEleccionIdAndCargoIdAndCircunscripcionIdAndCircunscripcionTipo(
        Long eleccionId, Long cargoId, Long circunscripcionId, String circunscripcionTipo);
    boolean existsByEleccionIdAndCargoIdAndPartidoIdAndCircunscripcionTipoAndCircunscripcionId(
        Long eleccionId, Long cargoId, Long partidoId, String circunscripcionTipo, Long circunscripcionId);
}
