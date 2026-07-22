package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultadoDHondtResponse {
    private Long circunscripcionId;
    private String circunscripcionNombre;
    private Integer totalEscanos;
    private Integer totalVotosValidos;
    private Double umbralElectoral;
    private List<AsignacionDto> asignaciones;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AsignacionDto {
        private Long partidoId;
        private String partidoNombre;
        private String partidoSigla;
        private Long listaId;
        private String listaNombre;
        private Integer votosValidos;
        private Double porcentajeVotos;
        private Integer escanosAsignados;
        private List<Double> cocientes;
    }
}
