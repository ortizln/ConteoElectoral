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
    private List<GeoGroup> zonas;
    private List<GeoGroup> provincias;
    private List<GeoGroup> cantones;
    private List<GeoGroup> parroquias;
    private List<GeoGroup> instituciones;

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

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GeoGroup {
        private Long id;
        private String nombre;
        private Long votos;
        private Double porcentaje;
    }
}
