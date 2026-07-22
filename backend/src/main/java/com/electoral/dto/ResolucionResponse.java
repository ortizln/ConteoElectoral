package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResolucionResponse {
    private Long id;
    private String codigo;
    private String titulo;
    private String descripcion;
    private Long impugnacionId;
    private String impugnacionDescripcion;
    private String resueltoPor;
    private LocalDateTime fechaResolucion;
    private String detalle;
    private LocalDateTime createdAt;
}
