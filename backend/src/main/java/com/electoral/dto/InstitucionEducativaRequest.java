package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstitucionEducativaRequest {
    private String nombre;
    private Long parroquiaId;
    private String direccion;
    private String codigo;
    private String tipo;
}
