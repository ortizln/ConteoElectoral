package com.electoral.entities;

import com.electoral.config.SexoMesaType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;
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

    @Type(SexoMesaType.class)
    @Column(name = "sexo", nullable = false)
    private SexoMesa sexo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recinto_id", nullable = false)
    private Recinto recinto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "elections_id", nullable = false)
    private Eleccion elecciones;

    @Builder.Default
    @Column(nullable = false)
    private Boolean cerrada = false;

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