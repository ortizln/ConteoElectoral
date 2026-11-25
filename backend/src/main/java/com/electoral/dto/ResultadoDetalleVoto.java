package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Fila de detalle por candidato/lista y mesa para los reportes. */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoDetalleVoto {
    private Long cargoId;
    private String cargoNombre;
    private String categoria;
    private boolean lista;
    private Long postulacionId;
    private String postulacionNombre;
    private String partidoNombre;
    private String cantonNombre;
    private String parroquiaNombre;
    private String recintoNombre;
    private String mesaNumero;
    private Long totalVotos;
}
