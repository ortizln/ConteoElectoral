package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoLista {
    private Long listaId;
    private Long cargoId;
    private String listaNombre;
    private Integer numeroLista;
    private String partidoNombre;
    private String partidoSigla;
    private String cargoNombre;
    private Long totalVotos;
    private Double porcentaje;
}
