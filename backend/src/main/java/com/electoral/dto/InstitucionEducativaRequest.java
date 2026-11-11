package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstitucionEducativaRequest {
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    @NotNull(message = "La parroquia es requerida")
    private Long parroquiaId;
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
    // numjun es calculado (junfem + junmas): se ignora si viene en el request
}
