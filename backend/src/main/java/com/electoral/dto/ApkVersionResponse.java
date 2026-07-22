package com.electoral.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApkVersionResponse {
    private Long id;
    private String version;
    private String nombreArchivo;
    private String fechaSubida;
}
