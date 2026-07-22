package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDateTime;

@Entity
@Table(name = "asignacion_escanos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AsignacionEscano {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "circunscripcion_id", nullable = false)
    private Circunscripcion circunscripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partido_id")
    private Partido partido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lista_id")
    private ListaElectoral lista;

    @Column(name = "votos_validos", nullable = false)
    private Integer votosValidos;

    @Column(name = "porcentaje_votos")
    private Double porcentajeVotos;

    @Builder.Default
    @Column(name = "escanos_asignados", nullable = false)
    private Integer escanosAsignados = 0;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "cocientes")
    private String cocientes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
