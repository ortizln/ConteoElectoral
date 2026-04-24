package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecintoResponse {
    private Long id;
    private String nombre;
    private String direccion;
    private Long eleccionesId;
    private Integer totalMesas;
}