package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "papeleta", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"eleccion_id", "cargo_id", "circunscripcion_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Papeleta {
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
    @JoinColumn(name = "tipo_circunscripcion_id", nullable = false)
    private TipoCircunscripcion tipoCircunscripcion;

    @Column(name = "circunscripcion_id")
    private Long circunscripcionId;

    @Column(nullable = false, length = 300)
    private String titulo;

    @Column(nullable = false)
    @Builder.Default
    private Integer orden = 0;

    @Column(name = "color_hex", length = 7)
    private String colorHex;

    @Column(name = "color_nombre", length = 50)
    private String colorNombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plantilla_id")
    private PlantillaPapeleta plantilla;

    @Column(name = "imagen_fondo_url", length = 500)
    private String imagenFondoUrl;

    @Column(name = "cantidad_max_votos")
    private Integer cantidadMaxVotos;

    @Builder.Default
    @Column(name = "permite_voto_cruzado")
    private Boolean permiteVotoCruzado = false;

    @Builder.Default
    @Column(name = "permite_voto_lista_completa")
    private Boolean permiteVotoListaCompleta = true;

    @Column(name = "numero_listas_visibles")
    private Integer numeroListasVisibles;

    @Column(name = "cantidad_candidatos_por_lista")
    private Integer cantidadCandidatosPorLista;

    @Column(name = "orden_impresion")
    private Integer ordenImpresion;

    @Builder.Default
    @Column(nullable = false)
    private Boolean activa = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
