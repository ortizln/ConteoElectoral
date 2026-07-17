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
public class ListaElectoralRequest {
    @NotNull
    private Long eleccionId;

    @NotNull
    private Long cargoId;

    private Long partidoId;

    private String circunscripcionTipo;

    private Long circunscripcionId;

    @NotNull
    private Integer numeroLista;

    @NotBlank
    private String nombre;
}
