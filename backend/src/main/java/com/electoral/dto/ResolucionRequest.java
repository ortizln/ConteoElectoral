package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResolucionRequest {
    @NotBlank(message = "El código es requerido")
    private String codigo;

    @NotBlank(message = "El título es requerido")
    private String titulo;

    private String descripcion;
    private Long impugnacionId;

    @NotBlank(message = "El responsable es requerido")
    private String resueltoPor;

    private String detalle;
}
