package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * Foto del acta física subida como respaldo al cerrar la mesa.
 * Obligatoria antes de cerrar (se valida en MesaService.cerrarMesa para el
 * cierre vía REST; la app móvil la captura antes de encolar el cierre).
 */
@Entity
@Table(name = "mesa_acta_fotos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MesaActaFoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesa_id", nullable = false)
    private Mesa mesa;

    @Column(name = "foto", columnDefinition = "bytea", nullable = false)
    private byte[] foto;

    @Column(name = "content_type", length = 50)
    private String contentType;

    @Column(name = "nombre_archivo")
    private String nombreArchivo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subido_por")
    private Usuario subidoPor;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
