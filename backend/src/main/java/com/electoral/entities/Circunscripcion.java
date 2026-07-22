package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "circunscripciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Circunscripcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eleccion_id", nullable = false)
    private Eleccion eleccion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_circunscripcion_id")
    private TipoCircunscripcion tipoCircunscripcion;

    @Column(nullable = false, length = 200)
    private String nombre;

    @Column(length = 30)
    private String codigo;

    @Builder.Default
    @Column(nullable = false)
    private Integer escanos = 1;

    @Column(name = "umbral_electoral")
    private Double umbralElectoral;

    @Column(name = "metodo_asignacion", length = 20)
    @Builder.Default
    private String metodoAsignacion = "D_HONDT";

    @Builder.Default
    @Column(nullable = false)
    private Boolean activa = true;

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
