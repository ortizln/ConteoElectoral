package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParroquiaRequest {
    private String nombre;
    private Long cantonId;
    private String descripcion;
}
