package com.electoral.repositories;

import com.electoral.entities.WhatsappGrupo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WhatsappGrupoRepository extends JpaRepository<WhatsappGrupo, Long> {
    Optional<WhatsappGrupo> findByChatId(String chatId);

    List<WhatsappGrupo> findByActivoTrueOrderByNombreAsc();

    List<WhatsappGrupo> findAllByOrderByNombreAsc();
}
