package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartidoRequest {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    
    private String sigla;
    private String logoUrl;
    
    @NotNull(message = "La elección es requerida")
    private Long eleccionesId;
}