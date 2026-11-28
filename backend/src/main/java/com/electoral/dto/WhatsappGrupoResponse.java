package com.electoral.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WhatsappGrupoResponse {
    private Long id;
    private String chatId;
    private String nombre;
    private boolean activo;
    private boolean configurado;
    private boolean esGrupo;
}
