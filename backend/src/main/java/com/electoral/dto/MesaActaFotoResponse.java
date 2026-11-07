package com.electoral.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MesaActaFotoResponse {
    private Long id;
    private Long mesaId;
    private String contentType;
    private String nombreArchivo;
    private Long subidoPor;
    private String subidoPorNombre;
    private LocalDateTime createdAt;
    private Long tamanoBytes;
}
