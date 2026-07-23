package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "votos", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"candidato_id", "mesa_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Voto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidato_id", nullable = false)
    private Candidato candidato;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesa_id", nullable = false)
    private Mesa mesa;

    @Builder.Default
    @Column(name = "cantidad_votos", nullable = false)
    private Integer cantidadVotos = 1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "elecciones_id", nullable = false)
    private Eleccion elecciones;

    @Column(name = "lista_id")
    private Long listaId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private Usuario createdBy;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}