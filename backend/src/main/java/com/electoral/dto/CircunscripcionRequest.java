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
public class CircunscripcionRequest {
    @NotNull(message = "La elección es requerida")
    private Long eleccionId;

    private Long tipoCircunscripcionId;

    @NotBlank(message = "El nombre es requerido")
    private String nombre;

    private String codigo;

    private Integer escanos;

    private Double umbralElectoral;

    private String metodoAsignacion;

    private Boolean activa;
}
