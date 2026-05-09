package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CantonRequest {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    @NotNull(message = "La provincia es requerida")
    private Long provinciaId;
    private String descripcion;
}
