package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MesaNuloBlancoPorCargoResponse {
    private Long cargoId;
    private String cargoNombre;
    private Integer nulos;
    private Integer blancos;
}
