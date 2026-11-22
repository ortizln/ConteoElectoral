package com.electoral.entities;

/**
 * Clasificacion territorial de una parroquia, segun el distributivo oficial del CNE.
 * Se resuelve siempre desde la relacion persistida de la mesa (mesa -> institucion -> parroquia),
 * nunca desde un valor enviado por el cliente.
 */
public enum TipoParroquia {
    URBANA,
    RURAL
}
