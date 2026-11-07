package com.electoral.entities;

/**
 * Nivel geografico en el que se vota un cargo.
 * Determina el filtro de candidatos por mesa: la mesa tiene parroquia ->
 * canton -> provincia, y el candidato se muestra solo si su territorio
 * coincide con el de la mesa (NACIONAL se muestra siempre).
 */
public enum TipoTerritorio {
    NACIONAL,
    PROVINCIA,
    CANTON,
    PARROQUIA
}
