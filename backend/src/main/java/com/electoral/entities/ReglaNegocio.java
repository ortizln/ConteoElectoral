package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDateTime;

@Entity
@Table(name = "reglas_negocio")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReglaNegocio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String tipo;

    @Column(nullable = false, length = 30)
    private String modulo;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "condicion", nullable = false)
    private String condicion;

    @Column(name = "mensaje_error", length = 500)
    private String mensajeError;

    @Column(length = 50)
    private String accion;

    @Builder.Default
    @Column(nullable = false)
    private Boolean activa = true;

    @Builder.Default
    @Column(nullable = false)
    private Integer prioridad = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
