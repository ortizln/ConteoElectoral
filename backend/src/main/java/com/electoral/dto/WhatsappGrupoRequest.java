package com.electoral.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WhatsappGrupoRequest {
    @NotBlank(message = "El chatId del grupo es requerido")
    private String chatId;

    @NotBlank(message = "El nombre del grupo es requerido")
    private String nombre;

    private Boolean activo;
}
