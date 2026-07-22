package com.electoral.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReporteCandidatoDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String nombreCompleto;
    private String partido;
    private String partidoSigla;
    private String cargo;
    private long totalVotos;
    private double porcentaje;
}
