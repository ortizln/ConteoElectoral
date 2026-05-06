package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProvinciaRequest {
    private String nombre;
    private Long zonaId;
    private String descripcion;
}
