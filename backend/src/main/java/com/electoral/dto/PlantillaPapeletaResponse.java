package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlantillaPapeletaResponse {
    private Long id;
    private String nombre;
    private String tipoDiseno;
    private Integer cantidadColumnas;
    private Integer cantidadFilas;
    private String posicionLogo;
    private String posicionNumero;
    private String posicionCandidatos;
    private String colorFondo;
    private String descripcion;
}
