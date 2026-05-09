package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProvinciaRequest {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    @NotNull(message = "La zona es requerida")
    private Long zonaId;
    private String descripcion;
}
