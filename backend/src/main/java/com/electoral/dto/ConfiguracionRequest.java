package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConfiguracionRequest {
    @NotBlank(message = "El nombre del partido es requerido")
    private String nombrePartido;

    private String descripcion;
}
