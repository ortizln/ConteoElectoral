package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MesaNuloBlancoRequest {
    @NotNull(message = "El cargo es requerido")
    private Long cargoId;

    @NotBlank(message = "El tipo es requerido")
    private String tipo; // NULO | BLANCO

    @NotNull(message = "La cantidad es requerida")
    @PositiveOrZero(message = "La cantidad no puede ser negativa")
    private Integer cantidad;
}
