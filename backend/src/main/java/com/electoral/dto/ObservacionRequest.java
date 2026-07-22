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
public class ObservacionRequest {
    private Long mesaId;

    @NotBlank(message = "El tipo es requerido")
    private String tipo;

    @NotBlank(message = "La descripción es requerida")
    private String descripcion;
}
