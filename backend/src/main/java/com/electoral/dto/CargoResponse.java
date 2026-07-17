package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CargoResponse {
    private Long id;
    private String nombre;
    private String descripcion;
    private Long eleccionesId;
    private String tipoVotacion;
    private Long tipoCircunscripcionId;
    private String tipoCircunscripcionCodigo;
    private String tipoCircunscripcionNombre;
    private Integer cantidadDignidades;
    private Integer maxCandidatosLista;
    private Boolean activo;
}