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
public class CandidatoDetalleResponse {
    private Long candidatoId;
    private String nombreCompleto;
    private String partidoNombre;
    private String cargoNombre;
    private Long totalVotos;
    private List<VotoPorMesa> votosPorMesa;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VotoPorMesa {
        private Long mesaId;
        private String mesaNumero;
        private String institucion;
        private String parroquia;
        private Long votos;
    }
}
