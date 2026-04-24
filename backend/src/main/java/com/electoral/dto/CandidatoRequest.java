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
public class CandidatoRequest {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    
    @NotBlank(message = "El apellido es requerido")
    private String apellido;
    
    private Long partidoId;
    
    @NotNull(message = "El cargo es requerido")
    private Long cargoId;
    
    private String fotoUrl;
    
    @NotNull(message = "La elección es requerida")
    private Long eleccionesId;
}