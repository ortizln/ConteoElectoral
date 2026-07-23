package com.electoral.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VotoRequest {
    private Long candidatoId;
    
    @NotNull(message = "La mesa es requerida")
    private Long mesaId;
    
    @NotNull(message = "La cantidad de votos es requerida")
    private Integer cantidadVotos;
    
    @NotNull(message = "La elección es requerida")
    private Long eleccionesId;

    private Long listaId;
}