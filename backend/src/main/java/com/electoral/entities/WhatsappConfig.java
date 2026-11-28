package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/** Configuracion singleton de la sesion de WhatsApp usada por el sistema. */
@Entity
@Table(name = "whatsapp_config")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WhatsappConfig {
    @Id
    @Builder.Default
    private Long id = 1L;

    @Column(name = "session_id", length = 100)
    private String sessionId;

    @Builder.Default
    @Column(nullable = false)
    private Boolean activo = true;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (id == null) id = 1L;
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
