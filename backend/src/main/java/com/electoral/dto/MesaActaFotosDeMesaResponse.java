package com.electoral.dto;

import lombok.*;

import java.util.List;

/**
 * Resumen de fotos del acta por mesa (página "Actas" del supervisor).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MesaActaFotosDeMesaResponse {
    private Long mesaId;
    private String mesaNumero;
    private String sexo;
    private String institucionNombre;
    private String parroquiaNombre;
    private Boolean cerrada;
    private List<MesaActaFotoResponse> fotos;
}
