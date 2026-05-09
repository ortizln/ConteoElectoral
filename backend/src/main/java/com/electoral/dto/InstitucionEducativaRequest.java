package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstitucionEducativaRequest {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    @NotNull(message = "La parroquia es requerida")
    private Long parroquiaId;
    private String direccion;
    private String codigo;
    private String tipo;
}
