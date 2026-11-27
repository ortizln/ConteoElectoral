package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Corrección manual del acta por ADMIN/SUPERVISOR: totales y votos por candidato/lista.
 * Se usan IDs de voto existentes para no recrear registros ni perder auditoría.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActaCorreccionRequest {
    private Integer votosNulos;
    private Integer votosBlanco;
    private Integer ausentes;
    private List<VotoCorreccion> votos;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VotoCorreccion {
        private Long votoId;
        private Integer cantidadVotos;
    }
}
