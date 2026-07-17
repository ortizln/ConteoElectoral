package com.electoral.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "plantillas_papeleta")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlantillaPapeleta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(name = "tipo_diseno", length = 50)
    private String tipoDiseno;

    @Column(name = "cantidad_columnas")
    @Builder.Default
    private Integer cantidadColumnas = 1;

    @Column(name = "cantidad_filas")
    @Builder.Default
    private Integer cantidadFilas = 1;

    @Column(name = "posicion_logo", length = 20)
    private String posicionLogo;

    @Column(name = "posicion_numero", length = 20)
    private String posicionNumero;

    @Column(name = "posicion_candidatos", length = 20)
    private String posicionCandidatos;

    @Column(name = "color_fondo", length = 7)
    private String colorFondo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;
}
