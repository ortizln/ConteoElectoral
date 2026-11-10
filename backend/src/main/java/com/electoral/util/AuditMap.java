package com.electoral.util;

import java.util.HashMap;
import java.util.Map;

/**
 * Mapa de auditoría null-safe.
 *
 * {@link Map#of} lanza NullPointerException si algún valor es null
 * (p.ej. una entidad creada sin descripcion). En auditoría queremos
 * registrar el dato aunque esté vacío, así que usamos HashMap y
 * convertimos null a cadena vacía.
 */
public final class AuditMap {

    private AuditMap() {
    }

    /**
     * Crea un mapa a partir de pares clave/valor.
     * Los valores null se guardan como "" para evitar NPE y JSON inválido.
     *
     * @param keyValues pares (clave, valor, clave, valor, ...)
     */
    public static Map<String, Object> of(Object... keyValues) {
        Map<String, Object> map = new HashMap<>();
        for (int i = 0; i + 1 < keyValues.length; i += 2) {
            Object key = keyValues[i];
            Object value = keyValues[i + 1];
            map.put(String.valueOf(key), value == null ? "" : value);
        }
        return map;
    }
}
