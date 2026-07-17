package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipo_circunscripcion")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoCircunscripcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30, unique = true)
    private String codigo;

    @Column(nullable = false, length = 100)
    private String nombre;
}
