package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Resultado por mesa para el drill-down del dashboard supervisor:
 * votos de candidatos + nulos/blancos de la mesa.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoMesa {
    private Long mesaId;
    private String mesaNumero;
    private String sexo;
    private String institucionNombre;
    private String parroquiaNombre;
    private Boolean cerrada;
    private Long votosCandidatos;
    private Long votosNulos;
    private Long votosBlanco;
    private Long totalVotos;
    private Double porcentaje;
}
