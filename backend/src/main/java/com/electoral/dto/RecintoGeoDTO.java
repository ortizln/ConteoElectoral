package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class RecintoGeoDTO {
    private Long id;
    private String nombre;
    private Double latitud;
    private Double longitud;
    private Long totalVotos;
    private Double porcentaje;
    private Long parroquiaId;
    private String parroquiaNombre;
    private Long cantonId;
    private String cantonNombre;
    private Long provinciaId;
    private String provinciaNombre;
    private Integer totalMesas;
}
