package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mesas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mesa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String numero;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexo", nullable = false)
    private SexoMesa sexo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institucion_id", nullable = false)
    private InstitucionEducativa institucion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "elections_id", nullable = false)
    private Eleccion elecciones;

    @Builder.Default
    @Column(nullable = false)
    private Boolean cerrada = false;

    @Builder.Default
    @Column(name = "votos_nulos", columnDefinition = "integer default 0")
    private Integer votosNulos = 0;

    @Builder.Default
    @Column(name = "votos_blanco", columnDefinition = "integer default 0")
    private Integer votosBlanco = 0;

    /** Ausentes registrados manualmente por el miembro de mesa (o corregidos por el supervisor). */
    @Builder.Default
    @Column(name = "ausentes", columnDefinition = "integer default 0")
    private Integer ausentes = 0;

    /** El acta fue revisada y aprobada por ADMIN/SUPERVISOR: bloquea edición del miembro de mesa. */
    @Builder.Default
    @Column(name = "aprobada", nullable = false)
    private Boolean aprobada = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum SexoMesa {
        MASCULINO, FEMENINO, MIXTA
    }
}