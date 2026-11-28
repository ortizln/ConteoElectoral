package com.electoral.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WhatsappEstadoResponse {
    private String sessionId;
    private String nombreSesion;
    private String status;
    private String phone;
    private boolean ready;
    private boolean apiKeyConfigured;
    private boolean activo;
    private String mensaje;
}
