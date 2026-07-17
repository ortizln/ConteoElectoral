package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpcionPapeletaResponse {
    private Long id;
    private String tipoOpcion;
    private Long candidatoId;
    private String candidatoNombre;
    private Long listaId;
    private Integer numeroLista;
    private String listaNombre;
    private Long partidoId;
    private String partidoNombre;
    private String partidoSigla;
    private String etiqueta;
    private Integer orden;
}
