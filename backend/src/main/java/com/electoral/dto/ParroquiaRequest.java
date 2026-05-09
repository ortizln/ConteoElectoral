package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParroquiaRequest {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    @NotNull(message = "El cantón es requerido")
    private Long cantonId;
    private String descripcion;
}
