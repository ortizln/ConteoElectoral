package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoGeo {
    private Long id;
    private String nombre;
    private Long totalVotos;
    private Double porcentaje;
}
