package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecintoResponse {
    private Long id;
    private String nombre;
    private String direccion;
    private Long institucionId;
    private String institucionNombre;
    private Long parroquiaId;
    private String parroquiaNombre;
    private Long cantonId;
    private String cantonNombre;
    private Long provinciaId;
    private String provinciaNombre;
    private Long zonaId;
    private String zonaNombre;
    private Long eleccionesId;
    private Integer totalMesas;
}