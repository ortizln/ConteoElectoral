package com.electoral.services;

import com.electoral.dto.EvaluacionReglaResponse;
import com.electoral.entities.ReglaNegocio;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class RuleEngineTest {

    private RuleEngine ruleEngine;

    @BeforeEach
    void setUp() {
        ruleEngine = new RuleEngine(new ObjectMapper());
    }

    @Test
    void evaluarRegla_edadMayorOIgual18_cumple() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("Edad mínima").activa(true)
                .condicion("{\"condition\":\"AND\",\"rules\":[{\"field\":\"edad\",\"operator\":\"GREATER_THAN_OR_EQUAL\",\"value\":18}]}")
                .mensajeError("Debe tener al menos 18 años")
                .build();

        Map<String, Object> datos = Map.of("edad", 25);
        List<EvaluacionReglaResponse.ErrorRegla> errores = ruleEngine.evaluarReglas(List.of(regla), datos);

        assertTrue(errores.isEmpty());
    }

    @Test
    void evaluarRegla_edadMenor18_noCumple() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("Edad mínima").activa(true)
                .condicion("{\"condition\":\"AND\",\"rules\":[{\"field\":\"edad\",\"operator\":\"GREATER_THAN_OR_EQUAL\",\"value\":18}]}")
                .mensajeError("Debe tener al menos 18 años")
                .build();

        Map<String, Object> datos = Map.of("edad", 15);
        List<EvaluacionReglaResponse.ErrorRegla> errores = ruleEngine.evaluarReglas(List.of(regla), datos);

        assertFalse(errores.isEmpty());
        assertEquals(1, errores.size());
        assertEquals("Debe tener al menos 18 años", errores.get(0).getMensaje());
    }

    @Test
    void evaluarRegla_notNull_cumple() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("Nombre obligatorio").activa(true)
                .condicion("{\"condition\":\"AND\",\"rules\":[{\"field\":\"nombre\",\"operator\":\"NOT_NULL\"}]}")
                .mensajeError("El nombre es obligatorio")
                .build();

        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("nombre", "Juan")).isEmpty());
        assertFalse(ruleEngine.evaluarReglas(List.of(regla), Map.of()).isEmpty());
    }

    @Test
    void evaluarRegla_notEmpty_cumple() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("No vacío").activa(true)
                .condicion("{\"condition\":\"AND\",\"rules\":[{\"field\":\"nombre\",\"operator\":\"NOT_EMPTY\"}]}")
                .mensajeError("No debe estar vacío")
                .build();

        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("nombre", "Juan")).isEmpty());
        assertFalse(ruleEngine.evaluarReglas(List.of(regla), Map.of("nombre", "")).isEmpty());
    }

    @Test
    void evaluarRegla_equals_cumple() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("Tipo igual").activa(true)
                .condicion("{\"condition\":\"AND\",\"rules\":[{\"field\":\"tipo\",\"operator\":\"EQUALS\",\"value\":\"PRINCIPAL\"}]}")
                .build();

        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("tipo", "PRINCIPAL")).isEmpty());
        assertFalse(ruleEngine.evaluarReglas(List.of(regla), Map.of("tipo", "SUPLENTE")).isEmpty());
    }

    @Test
    void evaluarRegla_conditionOR_cumple() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("OR condition").activa(true)
                .condicion("{\"condition\":\"OR\",\"rules\":[{\"field\":\"edad\",\"operator\":\"LESS_THAN\",\"value\":18},{\"field\":\"edad\",\"operator\":\"GREATER_THAN\",\"value\":60}]}")
                .build();

        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 15)).isEmpty());
        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 70)).isEmpty());
        assertFalse(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 30)).isEmpty());
    }

    @Test
    void evaluarRegla_in_cumple() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("IN operator").activa(true)
                .condicion("{\"condition\":\"AND\",\"rules\":[{\"field\":\"rol\",\"operator\":\"IN\",\"value\":[\"ADMIN\",\"SUPERVISOR\"]}]}")
                .build();

        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("rol", "ADMIN")).isEmpty());
        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("rol", "SUPERVISOR")).isEmpty());
        assertFalse(ruleEngine.evaluarReglas(List.of(regla), Map.of("rol", "MIEMBRO_MESA")).isEmpty());
    }

    @Test
    void evaluarRegla_between_cumple() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("BETWEEN operator").activa(true)
                .condicion("{\"condition\":\"AND\",\"rules\":[{\"field\":\"edad\",\"operator\":\"BETWEEN\",\"value\":[18,65]}]}")
                .build();

        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 30)).isEmpty());
        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 18)).isEmpty());
        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 65)).isEmpty());
        assertFalse(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 17)).isEmpty());
        assertFalse(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 66)).isEmpty());
    }

    @Test
    void evaluarRegla_inactiva_noEvalua() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("Regla inactiva").activa(false)
                .condicion("{\"condition\":\"AND\",\"rules\":[{\"field\":\"edad\",\"operator\":\"GREATER_THAN_OR_EQUAL\",\"value\":18}]}")
                .mensajeError("Error")
                .build();

        List<EvaluacionReglaResponse.ErrorRegla> errores = ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 15));

        assertTrue(errores.isEmpty());
    }

    @Test
    void evaluarRegla_jsonInvalido_noLanzaExcepcion() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("JSON inválido").activa(true)
                .condicion("no-es-json")
                .mensajeError("Error")
                .build();

        List<EvaluacionReglaResponse.ErrorRegla> errores = ruleEngine.evaluarReglas(List.of(regla), Map.of());

        assertTrue(errores.isEmpty());
    }

    @Test
    void evaluarRegla_conNestedCondition() {
        ReglaNegocio regla = ReglaNegocio.builder()
                .id(1L).nombre("Nested AND/OR").activa(true)
                .condicion("{\"condition\":\"AND\",\"rules\":[{\"field\":\"edad\",\"operator\":\"GREATER_THAN_OR_EQUAL\",\"value\":18},{\"condition\":\"OR\",\"rules\":[{\"field\":\"rol\",\"operator\":\"EQUALS\",\"value\":\"ADMIN\"},{\"field\":\"rol\",\"operator\":\"EQUALS\",\"value\":\"SUPERVISOR\"}]}]}")
                .mensajeError("No cumple")
                .build();

        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 25, "rol", "ADMIN")).isEmpty());
        assertTrue(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 25, "rol", "SUPERVISOR")).isEmpty());
        assertFalse(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 25, "rol", "MIEMBRO_MESA")).isEmpty());
        assertFalse(ruleEngine.evaluarReglas(List.of(regla), Map.of("edad", 15, "rol", "ADMIN")).isEmpty());
    }
}
