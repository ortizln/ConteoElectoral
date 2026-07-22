package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reconteos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reconteo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesa_id", nullable = false)
    private Mesa mesa;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String motivo;

    @Column(name = "solicitado_por", nullable = false, length = 200)
    private String solicitadoPor;

    @Column(name = "fecha_solicitud")
    private LocalDateTime fechaSolicitud;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String estado = "PENDIENTE";

    @Column(columnDefinition = "TEXT")
    private String resultado;

    @Column(name = "realizado_por", length = 200)
    private String realizadoPor;

    @Column(name = "fecha_realizacion")
    private LocalDateTime fechaRealizacion;

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
