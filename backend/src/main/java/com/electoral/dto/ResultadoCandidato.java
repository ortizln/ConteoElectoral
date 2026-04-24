package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoCandidato {
    private Long candidatoId;
    private String nombreCompleto;
    private String partidoNombre;
    private String cargoNombre;
    private Long totalVotos;
    private Double porcentaje;
}