package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CantonResponse {
    private Long id;
    private String nombre;
    private Long provinciaId;
    private String provinciaNombre;
    private String descripcion;
}
