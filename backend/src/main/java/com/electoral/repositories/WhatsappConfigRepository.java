package com.electoral.repositories;

import com.electoral.entities.WhatsappConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WhatsappConfigRepository extends JpaRepository<WhatsappConfig, Long> {
}
