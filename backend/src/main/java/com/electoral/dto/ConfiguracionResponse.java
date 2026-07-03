package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConfiguracionResponse {
    private Long id;
    private String nombrePartido;
    private String descripcion;
    private boolean tieneLogo;
    private LocalDateTime updatedAt;
}
