package com.electoral.repositories;

import com.electoral.entities.ReglaNegocio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReglaNegocioRepository extends JpaRepository<ReglaNegocio, Long> {
    List<ReglaNegocio> findByModuloAndActivaTrueOrderByPrioridadDesc(String modulo);
    List<ReglaNegocio> findByTipoAndActivaTrueOrderByPrioridadDesc(String tipo);
    List<ReglaNegocio> findByModuloAndTipoAndActivaTrueOrderByPrioridadDesc(String modulo, String tipo);
    List<ReglaNegocio> findByModulo(String modulo);
    List<ReglaNegocio> findByActivaTrueOrderByPrioridadDesc();
    boolean existsByNombreAndModulo(String nombre, String modulo);
    boolean existsByNombreAndModuloAndIdNot(String nombre, String modulo, Long id);
}
