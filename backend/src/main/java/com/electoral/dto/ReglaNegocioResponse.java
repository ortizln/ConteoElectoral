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
public class ReglaNegocioResponse {
    private Long id;
    private String tipo;
    private String modulo;
    private String nombre;
    private String descripcion;
    private String condicion;
    private String mensajeError;
    private String accion;
    private Boolean activa;
    private Integer prioridad;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
