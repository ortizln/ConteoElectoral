package com.electoral.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WhatsappEnvioResponse {
    private Long id;
    private Long fotoId;
    private Long mesaId;
    private String mesaNumero;
    private Long grupoId;
    private String grupoNombre;
    private String estado;
    private String messageId;
    private String error;
    private Integer intentos;
    private LocalDateTime createdAt;
    private LocalDateTime enviadoAt;
}
