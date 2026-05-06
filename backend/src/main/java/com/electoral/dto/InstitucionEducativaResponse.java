package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstitucionEducativaResponse {
    private Long id;
    private String nombre;
    private Long parroquiaId;
    private String parroquiaNombre;
    private String direccion;
    private String codigo;
    private String tipo;
}
