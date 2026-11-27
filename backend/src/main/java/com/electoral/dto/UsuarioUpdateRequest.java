package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioUpdateRequest {
    private String username;

    private String password;

    @NotBlank(message = "El nombre es requerido")
    private String nombre;

    @NotBlank(message = "El apellido es requerido")
    private String apellido;

    private String email;

    @Size(max = 20, message = "La identificación no puede exceder 20 caracteres")
    private String identificacion;

    @Pattern(regexp = "^$|^[0-9]{9,15}$", message = "El celular debe tener entre 9 y 15 dígitos")
    private String celular;

    @NotNull(message = "El rol es requerido")
    private Long rolId;

    @Builder.Default
    private Boolean activo = true;
}
