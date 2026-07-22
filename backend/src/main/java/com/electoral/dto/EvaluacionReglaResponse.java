package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluacionReglaResponse {
    private String modulo;
    private String entidad;
    private Long entidadId;
    private boolean valido;
    private List<ErrorRegla> errores;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ErrorRegla {
        private Long reglaId;
        private String nombreRegla;
        private String mensaje;
        private String accion;
    }
}
