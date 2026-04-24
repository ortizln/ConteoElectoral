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
public class MesaRequest {
    @NotBlank(message = "El número de mesa es requerido")
    private String numero;
    
    @NotNull(message = "El sexo es requerido")
    private String sexo;
    
    @NotNull(message = "El recinto es requerido")
    private Long recintoId;
    
    @NotNull(message = "La elección es requerida")
    private Long eleccionesId;
}