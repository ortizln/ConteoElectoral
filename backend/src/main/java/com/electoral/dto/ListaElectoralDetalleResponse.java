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
public class ListaElectoralDetalleResponse {
    private Long id;
    private Integer numeroLista;
    private String nombre;
    private Long eleccionId;
    private Long cargoId;
    private String cargoNombre;
    private Long partidoId;
    private String partidoNombre;
    private String partidoSigla;
    private String circunscripcionTipo;
    private Long circunscripcionId;
    private String estado;
    private List<CandidatoResponse> candidatos;
}
