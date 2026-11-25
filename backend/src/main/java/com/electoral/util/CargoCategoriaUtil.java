package com.electoral.util;

import java.text.Normalizer;

/**
 * Clasificación de cargos en las cuatro categorías usadas por los reportes
 * (dashboard, Excel y PDF). Se basa en el nombre del cargo para no depender de
 * identificadores cambiantes en la base de datos.
 */
public final class CargoCategoriaUtil {

    public static final String ALCALDES = "Alcaldes";
    public static final String CONSEJALES_URBANOS = "Consejales Urbanos";
    public static final String CONSEJALES_RURALES = "Consejales Rurales";
    public static final String JUNTAS_PARROQUIALES = "Juntas Parroquiales";

    private static final String[] ORDEN = {
            ALCALDES, CONSEJALES_URBANOS, CONSEJALES_RURALES, JUNTAS_PARROQUIALES
    };

    private CargoCategoriaUtil() {
    }

    /** Categoría canónica de un cargo; si no es conocida devuelve su nombre. */
    public static String categoria(String nombre) {
        String n = normalizar(nombre);
        if (n.isEmpty()) return "Otros";
        if (n.contains("ALCALDE")) return ALCALDES;
        if ((n.contains("JUNTA") && n.contains("PARROQUI")) || n.contains("VOCAL")) {
            return JUNTAS_PARROQUIALES;
        }
        if (n.contains("CONCEJAL") || n.contains("CONCEJALES") || n.contains("CONCEJO")) {
            if (n.contains("URBAN")) return CONSEJALES_URBANOS;
            if (n.contains("RURAL")) return CONSEJALES_RURALES;
        }
        return nombre == null || nombre.isBlank() ? "Otros" : nombre.trim();
    }

    /** Etiqueta en singular para la columna de postulación en los reportes. */
    public static String postulacion(String categoria) {
        String c = categoria(categoria);
        switch (c) {
            case ALCALDES: return "Alcalde";
            case CONSEJALES_URBANOS: return "Consejal Urbano";
            case CONSEJALES_RURALES: return "Consejal Rural";
            case JUNTAS_PARROQUIALES: return "Junta Parroquial";
            default: return "Postulación";
        }
    }

    /** Orden fijo en el que se generan las hojas/secciones. */
    public static String[] categoriasOrdenadas() {
        return ORDEN.clone();
    }

    private static String normalizar(String s) {
        if (s == null) return "";
        String sinAcentos = Normalizer.normalize(s, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        return sinAcentos.toUpperCase().trim();
    }
}
