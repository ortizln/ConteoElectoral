package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EscrutinioResumenResponse {
    private long reconteosPendientes;
    private long impugnacionesPendientes;
    private long totalObservaciones;
    private long totalResoluciones;
}
