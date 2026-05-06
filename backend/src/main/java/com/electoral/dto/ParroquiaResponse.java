package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParroquiaResponse {
    private Long id;
    private String nombre;
    private Long cantonId;
    private String cantonNombre;
    private String descripcion;
}
