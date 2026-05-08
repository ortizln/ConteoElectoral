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
public class ImportResponse {
    private int totalFilas;
    private int zonasCreadas;
    private int provinciasCreadas;
    private int cantonesCreados;
    private int parroquiasCreadas;
    private int institucionesCreadas;
    private List<String> errores;
    private boolean success;
}
