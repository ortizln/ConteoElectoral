package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ZonaResponse {
    private Long id;
    private String nombre;
    private String descripcion;
}
