package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipo_eleccion_cargo", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"tipo_eleccion_id", "cargo_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoEleccionCargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_eleccion_id", nullable = false)
    private TipoEleccion tipoEleccion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cargo_id", nullable = false)
    private Cargo cargo;

    @Column(nullable = false)
    @Builder.Default
    private Integer orden = 0;
}
