package com.electoral.repositories;

import com.electoral.entities.InstitucionEducativa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InstitucionEducativaRepository extends JpaRepository<InstitucionEducativa, Long> {
    List<InstitucionEducativa> findByParroquiaId(Long parroquiaId);
    boolean existsByNombre(String nombre);
    boolean existsByNombreAndIdNot(String nombre, Long id);
    boolean existsByCodigo(String codigo);
    boolean existsByCodigoAndIdNot(String codigo, Long id);
}
