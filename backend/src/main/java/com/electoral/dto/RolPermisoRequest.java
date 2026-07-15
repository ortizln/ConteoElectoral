package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolPermisoRequest {
    @NotNull
    private Long rolId;

    @NotBlank
    private String modulo;

    private boolean puedeVer;
    private boolean puedeCrear;
    private boolean puedeEditar;
    private boolean puedeEliminar;
}
