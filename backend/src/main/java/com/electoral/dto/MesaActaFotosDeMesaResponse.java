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
    private Long institucionId;
    private String institucionNombre;
    private Long parroquiaId;
    private String parroquiaNombre;
    private Long cantonId;
    private String cantonNombre;
    private Long provinciaId;
    private String provinciaNombre;
    private Boolean cerrada;
    private Integer votosNulos;
    private Integer votosBlanco;
    private Integer ausentes;
    private Boolean aprobada;
    /** Observaciones opcionales registradas por el miembro de mesa (UTF-8). */
    private String observaciones;
    private Integer electoresRegistrados;
    private List<MesaActaFotoResponse> fotos;
}
