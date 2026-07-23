package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VotoResponse {
    private Long id;
    private Long candidatoId;
    private String candidatoNombre;
    private String candidatoApellido;
    private String partidoNombre;
    private Long mesaId;
    private String mesaNumero;
    private Integer cantidadVotos;
    private Long eleccionesId;
    private Long listaId;
}