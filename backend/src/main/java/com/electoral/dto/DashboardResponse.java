package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private Long eleccionId;
    private String eleccionNombre;
    private Long totalVotos;
    private Long totalVotosNulos;
    private Long totalMesas;
    private Long mesasCerradas;
    private Long mesasAbiertas;
    private Double porcentajeMesasCerradas;
    private List<ResultadoCandidato> resultados;
    private List<ResultadoRecinto> resultadosRecinto;
    private List<ResultadoGeo> resultadosProvincia;
    private List<ResultadoGeo> resultadosParroquia;
}