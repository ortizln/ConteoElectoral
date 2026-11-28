package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/** Grupo de WhatsApp configurado para recibir las fotos del acta. */
@Entity
@Table(name = "whatsapp_grupos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WhatsappGrupo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chat_id", nullable = false, unique = true, length = 100)
    private String chatId;

    @Column(nullable = false, length = 255)
    private String nombre;

    @Builder.Default
    @Column(nullable = false)
    private Boolean activo = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
