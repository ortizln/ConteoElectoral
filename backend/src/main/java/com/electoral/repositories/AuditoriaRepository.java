package com.electoral.repositories;

import com.electoral.entities.Auditoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AuditoriaRepository extends JpaRepository<Auditoria, Long> {
    Page<Auditoria> findByUsuarioIdOrderByCreatedAtDesc(Long usuarioId, Pageable pageable);
    Page<Auditoria> findByEntidadAndEntidadIdOrderByCreatedAtDesc(String entidad, Long entidadId, Pageable pageable);
    List<Auditoria> findTop100ByOrderByCreatedAtDesc();
}