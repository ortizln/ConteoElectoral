package com.electoral.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WhatsappConfigRequest {
    private String sessionId;
    private Boolean activo;
}
