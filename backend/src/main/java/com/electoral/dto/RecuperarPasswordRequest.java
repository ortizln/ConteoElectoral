package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecuperarPasswordRequest {
    @NotBlank(message = "El usuario es requerido")
    private String username;

    @NotBlank(message = "La identificación es requerida")
    private String identificacion;

    @NotBlank(message = "El celular de WhatsApp es requerido")
    private String celular;
}
