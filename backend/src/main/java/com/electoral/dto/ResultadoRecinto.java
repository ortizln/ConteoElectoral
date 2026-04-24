package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoRecinto {
    private Long recintoId;
    private String recintoNombre;
    private Long totalVotos;
    private Double porcentaje;
}