package com.electoral.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReporteResumenDTO {
    private long totalVotos;
    private long totalMesas;
    private long mesasCerradas;
    private long mesasPendientes;
    private long totalCandidatos;
    private long totalPartidos;
    private long votosNulos;
    private long votosBlanco;
    private double participacion;
}
