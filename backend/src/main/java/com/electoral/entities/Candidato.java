package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "candidatos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String apellido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partido_id")
    private Partido partido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cargo_id")
    private Cargo cargo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lista_id")
    private ListaElectoral lista;

    @Column(name = "foto_url", length = 500)
    private String fotoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "elecciones_id")
    private Eleccion elecciones;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provincia_id")
    private Provincia provincia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "canton_id")
    private Canton canton;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parroquia_id")
    private Parroquia parroquia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_circunscripcion_id")
    private TipoCircunscripcion tipoCircunscripcion;

    @Column(name = "posicion_lista")
    private Integer posicionLista;

    @Column(name = "orden_aparicion")
    private Integer ordenAparicion;

    @Column(name = "orden_en_lista")
    private Integer ordenEnLista;

    @Column(length = 20)
    @Builder.Default
    private String tipo = "PRINCIPAL";

    @Builder.Default
    @Column(nullable = false)
    private Boolean principal = true;

    @Builder.Default
    @Column(nullable = false)
    private Boolean activo = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public String getNombreCompleto() {
        return nombre + " " + apellido;
    }
}