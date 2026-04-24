package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidatoResponse {
    private Long id;
    private String nombre;
    private String apellido;
    private String nombreCompleto;
    private Long partidoId;
    private String partidoNombre;
    private String partidoSigla;
    private Long cargoId;
    private String cargoNombre;
    private String fotoUrl;
    private Long eleccionesId;
}