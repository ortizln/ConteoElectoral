package com.electoral.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstitucionEducativaResponse {
    private Long id;
    private String nombre;
    private Long parroquiaId;
    private String parroquiaNombre;
    private String direccion;
    private String codigo;
    private String tipo;
    private Double latitud;
    private Double longitud;
    private Integer electoresRegistrados;
    // ===== Juntas (mesas) =====
    private Integer junfem;
    private Integer junmas;
    private Integer juninif;
    private Integer junfinf;
    private Integer juninim;
    private Integer junfinm;
    private Integer numjun;
}
