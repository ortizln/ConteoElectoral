package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MesaResponse {
    private Long id;
    private String numero;
    private String sexo;
    private Long recintoId;
    private String recintoNombre;
    private Long eleccionesId;
    private Boolean cerrada;
    private Long usuarioId;
    private String usuarioNombre;
}