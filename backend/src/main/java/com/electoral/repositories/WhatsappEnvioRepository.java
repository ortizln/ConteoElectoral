package com.electoral.repositories;

import com.electoral.entities.WhatsappEnvio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WhatsappEnvioRepository extends JpaRepository<WhatsappEnvio, Long> {
    Optional<WhatsappEnvio> findByFotoIdAndGrupoId(Long fotoId, Long grupoId);

    List<WhatsappEnvio> findTop100ByOrderByIdDesc();
}
