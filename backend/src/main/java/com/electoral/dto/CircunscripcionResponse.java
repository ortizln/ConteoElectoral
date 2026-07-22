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
public class CircunscripcionResponse {
    private Long id;
    private Long eleccionId;
    private String eleccionNombre;
    private Long tipoCircunscripcionId;
    private String tipoCircunscripcionCodigo;
    private String tipoCircunscripcionNombre;
    private String nombre;
    private String codigo;
    private Integer escanos;
    private Double umbralElectoral;
    private String metodoAsignacion;
    private Boolean activa;
    private LocalDateTime createdAt;
}
