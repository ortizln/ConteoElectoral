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
public class ImpugnacionResponse {
    private Long id;
    private Long mesaId;
    private String mesaNumero;
    private String tipo;
    private String descripcion;
    private String solicitante;
    private LocalDateTime fechaImpugnacion;
    private String estado;
    private LocalDateTime createdAt;
}
