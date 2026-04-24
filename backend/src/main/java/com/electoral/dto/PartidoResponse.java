package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartidoResponse {
    private Long id;
    private String nombre;
    private String sigla;
    private String logoUrl;
    private Long eleccionesId;
}