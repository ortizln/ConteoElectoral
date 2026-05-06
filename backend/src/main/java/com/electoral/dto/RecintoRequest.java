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
public class RecintoRequest {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    
    private String direccion;
    
    @NotNull(message = "La institución educativa es requerida")
    private Long institucionId;
    
    @NotNull(message = "La elección es requerida")
    private Long eleccionesId;
}