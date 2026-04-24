package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRequest {
    @NotBlank(message = "El username es requerido")
    private String username;
    
    @NotBlank(message = "El password es requerido")
    private String password;
    
    @NotBlank(message = "El nombre es requerido")
    private String nombre;
    
    @NotBlank(message = "El apellido es requerido")
    private String apellido;
    
    private String email;
    
    @NotNull(message = "El rol es requerido")
    private Long rolId;
    
    @Builder.Default
    private Boolean activo = true;
}