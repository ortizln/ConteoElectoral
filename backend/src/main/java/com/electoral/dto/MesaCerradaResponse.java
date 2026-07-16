package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MesaCerradaResponse {
    private Long id;
    private String numero;
    private String sexo;
    private String institucionNombre;
    private String parroquiaNombre;
    private String cantonNombre;
    private String provinciaNombre;
    private String zonaNombre;
    private Long totalVotos;
}
