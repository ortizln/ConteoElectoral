package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidatoResponse {
    private Long id;
    private String nombre;
    private String apellido;
    private String nombreCompleto;
    private Long partidoId;
    private String partidoNombre;
    private String partidoSigla;
    private Long cargoId;
    private String cargoNombre;
    /** Tipo de votación del cargo (INDIVIDUAL/LISTA), para filtrar la tabla sin depender de otro catálogo. */
    private String tipoVotacion;
    private Long listaId;
    private String listaNombre;
    private Integer numeroLista;
    private String fotoUrl;
    private Boolean tieneFoto;
    private Long eleccionesId;
    private Long provinciaId;
    private String provinciaNombre;
    private Long cantonId;
    private String cantonNombre;
    private Long parroquiaId;
    private String parroquiaNombre;
    private Long tipoCircunscripcionId;
    private String tipoCircunscripcionCodigo;
    private Integer posicionLista;
    private Integer ordenAparicion;
    private Integer ordenEnLista;
    private String tipo;
    private Boolean principal;
    private Boolean activo;
}