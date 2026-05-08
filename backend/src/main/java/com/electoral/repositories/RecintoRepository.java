package com.electoral.repositories;

import com.electoral.entities.Recinto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecintoRepository extends JpaRepository<Recinto, Long> {
    List<Recinto> findByEleccionesId(Long eleccionesId);
    List<Recinto> findByInstitucionId(Long institucionId);
    List<Recinto> findByInstitucionParroquiaId(Long parroquiaId);
    List<Recinto> findByInstitucionParroquiaCantonId(Long cantonId);
    List<Recinto> findByInstitucionParroquiaCantonProvinciaId(Long provinciaId);
    List<Recinto> findByInstitucionParroquiaCantonProvinciaZonaId(Long zonaId);
    boolean existsByNombreAndEleccionesId(String nombre, Long eleccionesId);
    boolean existsByNombreAndEleccionesIdAndIdNot(String nombre, Long eleccionesId, Long id);
}