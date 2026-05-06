package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProvinciaResponse {
    private Long id;
    private String nombre;
    private Long zonaId;
    private String zonaNombre;
    private String descripcion;
}
