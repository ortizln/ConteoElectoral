package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "listas_electorales", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"eleccion_id", "cargo_id", "partido_id", "circunscripcion_tipo", "circunscripcion_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListaElectoral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eleccion_id", nullable = false)
    private Eleccion eleccion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cargo_id", nullable = false)
    private Cargo cargo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partido_id")
    private Partido partido;

    @Column(name = "circunscripcion_tipo", length = 30)
    private String circunscripcionTipo;

    @Column(name = "circunscripcion_id")
    private Long circunscripcionId;

    @Column(name = "numero_lista", nullable = false)
    private Integer numeroLista;

    @Column(nullable = false, length = 200)
    private String nombre;

    @Column(length = 20)
    @Builder.Default
    private String estado = "ACTIVA";

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
