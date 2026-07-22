package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resoluciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resolucion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String codigo;

    @Column(nullable = false, length = 200)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "impugnacion_id")
    private Impugnacion impugnacion;

    @Column(name = "resuelto_por", nullable = false, length = 200)
    private String resueltoPor;

    @Column(name = "fecha_resolucion")
    private LocalDateTime fechaResolucion;

    @Column(columnDefinition = "TEXT")
    private String detalle;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (fechaResolucion == null) fechaResolucion = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
