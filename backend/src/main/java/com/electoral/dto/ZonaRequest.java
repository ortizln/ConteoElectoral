package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ZonaRequest {
    private String nombre;
    private String descripcion;
}
