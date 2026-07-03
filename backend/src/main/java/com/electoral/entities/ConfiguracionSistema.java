package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "configuracion_sistema")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConfiguracionSistema {
    @Id
    private Long id;

    @Column(name = "nombre_partido", nullable = false, length = 200)
    private String nombrePartido;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "logo", columnDefinition = "bytea")
    private byte[] logo;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
