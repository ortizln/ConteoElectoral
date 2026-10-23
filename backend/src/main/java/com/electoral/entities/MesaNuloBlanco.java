package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mesa_nulos_blancos", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "mesa_id", "cargo_id", "tipo" })
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MesaNuloBlanco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesa_id", nullable = false)
    private Mesa mesa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cargo_id", nullable = false)
    private Cargo cargo;

    @Column(name = "tipo", nullable = false, length = 10)
    private String tipo; // NULO | BLANCO

    @Builder.Default
    @Column(nullable = false)
    private Integer cantidad = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum Tipo {
        NULO, BLANCO
    }
}
