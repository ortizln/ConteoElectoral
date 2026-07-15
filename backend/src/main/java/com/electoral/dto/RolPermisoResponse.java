package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolPermisoResponse {
    private Long id;
    private Long rolId;
    private String rolNombre;
    private String modulo;
    private boolean puedeVer;
    private boolean puedeCrear;
    private boolean puedeEditar;
    private boolean puedeEliminar;
}
