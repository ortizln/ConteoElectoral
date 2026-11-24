package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioMesaAsignadaDTO {
    private Long usuarioId;
    private String username;
    private String nombre;
    private String apellido;
    private String email;
    private String rol;
    private Boolean activo;
    private Long mesaId;
    private String numeroMesa;
    private String sexo;
    private String institucionNombre;
    private String parroquiaNombre;
    private String cantonNombre;
    private String provinciaNombre;
    private Boolean cerrada;
}
