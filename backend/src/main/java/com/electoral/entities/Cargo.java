package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cargos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 255)
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "elecciones_id", nullable = false)
    private Eleccion elecciones;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_votacion", length = 20)
    private TipoVotacion tipoVotacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_circunscripcion_id")
    private TipoCircunscripcion tipoCircunscripcion;

    @Column(name = "cantidad_dignidades")
    @Builder.Default
    private Integer cantidadDignidades = 1;

    @Column(name = "max_candidatos_lista")
    private Integer maxCandidatosLista;

    @Builder.Default
    @Column(nullable = false)
    private Boolean activo = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}