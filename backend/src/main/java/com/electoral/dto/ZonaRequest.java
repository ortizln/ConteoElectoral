package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ZonaRequest {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    private String descripcion;
}
