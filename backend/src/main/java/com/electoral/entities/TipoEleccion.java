package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tipo_eleccion")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoEleccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100, unique = true)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

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
