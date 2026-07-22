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
public class ObservacionResponse {
    private Long id;
    private Long mesaId;
    private String mesaNumero;
    private Long usuarioId;
    private String usuarioNombre;
    private String tipo;
    private String descripcion;
    private LocalDateTime fecha;
    private LocalDateTime createdAt;
}
