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
public class PapeletaResponse {
    private Long id;
    private Long eleccionId;
    private String eleccionNombre;
    private Long cargoId;
    private String cargoNombre;
    private String tipoVotacion;
    private String tipoCircunscripcion;
    private Long circunscripcionId;
    private String titulo;
    private Integer orden;
    private String colorHex;
    private String colorNombre;
    private Long plantillaId;
    private String plantillaNombre;
    private Boolean permiteVotoCruzado;
    private Boolean permiteVotoListaCompleta;
    private Integer cantidadMaxVotos;
    private Integer cantidadCandidatosPorLista;
    private Boolean activa;
    private List<OpcionPapeletaResponse> opciones;
}
