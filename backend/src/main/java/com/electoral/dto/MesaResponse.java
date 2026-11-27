package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MesaResponse {
    private Long id;
    private String numero;
    private String sexo;
    private Long institucionId;
    private String institucionNombre;
    private Long parroquiaId;
    private String parroquiaNombre;
    private Long cantonId;
    private String cantonNombre;
    private Long provinciaId;
    private String provinciaNombre;
    private Long eleccionesId;
    private Boolean cerrada;
    private Integer votosNulos;
    private Integer votosBlanco;
    private Integer ausentes;
    private Boolean aprobada;
    /** Electores del padrón del recinto/institución (para comparar con ausentes). */
    private Integer electoresRegistrados;
    private Long usuarioId;
    private String usuarioNombre;
}