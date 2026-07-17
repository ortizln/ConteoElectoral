package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VotoPapeletaResponse {
    private Long id;
    private Long opcionPapeletaId;
    private String opcionEtiqueta;
    private Long mesaId;
    private Integer cantidadVotos;
}
