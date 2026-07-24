package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteListaDTO {
    private Long listaId;
    private String listaNombre;
    private Integer numeroLista;
    private Long partidoId;
    private String partidoNombre;
    private String partidoSigla;
    private Long cargoId;
    private String cargoNombre;
    private long totalVotos;
    private double porcentaje;
}
