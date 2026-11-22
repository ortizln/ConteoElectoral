package com.electoral.dto;

import com.electoral.entities.TipoParroquia;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParroquiaResponse {
    private Long id;
    private String nombre;
    private Long cantonId;
    private String cantonNombre;
    private String descripcion;
    /** null = "Pendiente de clasificación" (datos legados sin fuente verificada). */
    private TipoParroquia tipoParroquia;
}
