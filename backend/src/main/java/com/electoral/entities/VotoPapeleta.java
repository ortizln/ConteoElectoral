package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "voto_papeleta", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"opcion_papeleta_id", "mesa_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VotoPapeleta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "opcion_papeleta_id", nullable = false)
    private OpcionPapeleta opcionPapeleta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesa_id", nullable = false)
    private Mesa mesa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "elecciones_id", nullable = false)
    private Eleccion elecciones;

    @Column(name = "cantidad_votos", nullable = false)
    private Integer cantidadVotos;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
