package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EleccionResponse {
    private Long id;
    private String nombre;
    private String descripcion;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private Boolean activa;
    private Long totalVotos;
    private Long totalMesas;
    private Long mesasCerradas;
    private Long tipoEleccionId;
    private String tipoEleccionNombre;
}