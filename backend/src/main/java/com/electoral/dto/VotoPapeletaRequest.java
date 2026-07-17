package com.electoral.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VotoPapeletaRequest {
    @NotNull
    private Long opcionPapeletaId;

    @NotNull
    private Long mesaId;

    @NotNull
    private Integer cantidadVotos;
}
