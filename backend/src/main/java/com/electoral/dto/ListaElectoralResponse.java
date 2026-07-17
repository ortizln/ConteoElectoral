package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListaElectoralResponse {
    private Long id;
    private Integer numeroLista;
    private String nombre;
    private Long eleccionId;
    private Long cargoId;
    private String cargoNombre;
    private Long partidoId;
    private String partidoNombre;
    private String partidoSigla;
    private String circunscripcionTipo;
    private Long circunscripcionId;
    private String estado;
}
