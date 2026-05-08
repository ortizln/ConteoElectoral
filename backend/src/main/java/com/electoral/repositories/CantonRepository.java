package com.electoral.repositories;

import com.electoral.entities.Canton;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CantonRepository extends JpaRepository<Canton, Long> {
    List<Canton> findByProvinciaId(Long provinciaId);
    boolean existsByNombreAndProvinciaId(String nombre, Long provinciaId);
    boolean existsByNombreAndProvinciaIdAndIdNot(String nombre, Long provinciaId, Long id);
    java.util.Optional<Canton> findByNombreAndProvinciaId(String nombre, Long provinciaId);
}
