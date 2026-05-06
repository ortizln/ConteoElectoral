package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CantonRequest {
    private String nombre;
    private Long provinciaId;
    private String descripcion;
}
