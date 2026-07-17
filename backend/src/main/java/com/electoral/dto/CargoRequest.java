package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CargoRequest {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    
    private String descripcion;
    
    @NotNull(message = "La elección es requerida")
    private Long eleccionesId;

    private String tipoVotacion;
    private Long tipoCircunscripcionId;
    private Integer cantidadDignidades;
    private Integer maxCandidatosLista;
}