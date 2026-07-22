package com.electoral.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReportePartidoDTO {
    private Long id;
    private String nombre;
    private String sigla;
    private long totalVotos;
    private double porcentaje;
    private long totalCandidatos;
}
