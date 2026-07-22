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
public class ReconteoRequest {
    @NotNull(message = "La mesa es requerida")
    private Long mesaId;

    @NotBlank(message = "El motivo es requerido")
    private String motivo;

    @NotBlank(message = "El solicitante es requerido")
    private String solicitadoPor;

    private String estado;
    private String resultado;
    private String realizadoPor;
}
