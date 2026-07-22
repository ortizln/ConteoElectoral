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
public class ReglaNegocioRequest {
    @NotBlank(message = "El tipo es requerido")
    private String tipo;

    @NotBlank(message = "El módulo es requerido")
    private String modulo;

    @NotBlank(message = "El nombre es requerido")
    private String nombre;

    private String descripcion;

    @NotNull(message = "La condición es requerida")
    private String condicion;

    private String mensajeError;

    private String accion;

    private Boolean activa;

    private Integer prioridad;
}
