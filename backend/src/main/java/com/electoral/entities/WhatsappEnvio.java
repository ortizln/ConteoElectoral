package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/** Bandeja de envios (caja) de fotos del acta hacia los grupos de WhatsApp. */
@Entity
@Table(name = "whatsapp_envios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WhatsappEnvio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "foto_id", nullable = false)
    private Long fotoId;

    @Column(name = "mesa_id", nullable = false)
    private Long mesaId;

    @Column(name = "grupo_id", nullable = false)
    private Long grupoId;

    @Builder.Default
    @Column(nullable = false, length = 20)
    private String estado = "PENDIENTE";

    @Column(name = "message_id", length = 100)
    private String messageId;

    @Column(columnDefinition = "text")
    private String error;

    @Builder.Default
    @Column(nullable = false)
    private Integer intentos = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "enviado_at")
    private LocalDateTime enviadoAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
