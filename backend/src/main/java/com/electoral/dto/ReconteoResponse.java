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
public class ReconteoResponse {
    private Long id;
    private Long mesaId;
    private String mesaNumero;
    private String institucionNombre;
    private String motivo;
    private String solicitadoPor;
    private LocalDateTime fechaSolicitud;
    private String estado;
    private String resultado;
    private String realizadoPor;
    private LocalDateTime fechaRealizacion;
    private LocalDateTime createdAt;
}
