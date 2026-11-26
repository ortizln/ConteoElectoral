package com.electoral.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CargoCategoriaUtilTest {

    @Test
    void clasificaConsejalesConS() {
        assertEquals(CargoCategoriaUtil.CONSEJALES_URBANOS,
                CargoCategoriaUtil.categoria("CONSEJAL - URBANO"));
        assertEquals(CargoCategoriaUtil.CONSEJALES_RURALES,
                CargoCategoriaUtil.categoria("CONSEJAL - RURAL"));
    }

    @Test
    void clasificaVariantesLegadas() {
        assertEquals(CargoCategoriaUtil.CONSEJALES_URBANOS,
                CargoCategoriaUtil.categoria("CONCEJAL - URBANO"));
        assertEquals(CargoCategoriaUtil.CONSEJALES_RURALES,
                CargoCategoriaUtil.categoria("CONCEJO - RURAL"));
    }
}
