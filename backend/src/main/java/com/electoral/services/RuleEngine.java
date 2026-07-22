package com.electoral.services;

import com.electoral.entities.ReglaNegocio;
import com.electoral.dto.EvaluacionReglaResponse.ErrorRegla;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RuleEngine {

    private final ObjectMapper objectMapper;

    public List<ErrorRegla> evaluarReglas(List<ReglaNegocio> reglas, Map<String, Object> datos) {
        List<ErrorRegla> errores = new ArrayList<>();
        for (ReglaNegocio regla : reglas) {
            if (!regla.getActiva()) continue;
            try {
                boolean cumple = evaluarCondicion(regla.getCondicion(), datos);
                if (!cumple) {
                    errores.add(ErrorRegla.builder()
                            .reglaId(regla.getId())
                            .nombreRegla(regla.getNombre())
                            .mensaje(regla.getMensajeError() != null ? regla.getMensajeError() :
                                    "No cumple la regla: " + regla.getNombre())
                            .accion(regla.getAccion())
                            .build());
                }
            } catch (Exception e) {
                log.warn("Error evaluando regla {}: {}", regla.getId(), e.getMessage());
            }
        }
        return errores;
    }

    public boolean evaluarCondicion(String condicionJson, Map<String, Object> datos) {
        try {
            NodoRegla nodo = objectMapper.readValue(condicionJson, NodoRegla.class);
            return evaluarCondicionRecursiva(nodo, datos);
        } catch (JsonProcessingException e) {
            log.error("Error parseando condición: {}", e.getMessage());
            return true;
        }
    }

    private boolean evaluarCondicionRecursiva(NodoRegla nodo, Map<String, Object> datos) {
        if (nodo.getRules() == null || nodo.getRules().isEmpty()) return true;
        boolean isAnd = "AND".equalsIgnoreCase(nodo.getCondition());
        for (NodoRegla sub : nodo.getRules()) {
            boolean resultado;
            if (sub.getCondition() != null) {
                resultado = evaluarCondicionRecursiva(sub, datos);
            } else {
                resultado = evaluarOperador(sub, datos);
            }
            if (isAnd && !resultado) return false;
            if (!isAnd && resultado) return true;
        }
        return isAnd;
    }

    @SuppressWarnings("unchecked")
    private boolean evaluarOperador(NodoRegla regla, Map<String, Object> datos) {
        Object valorReal = obtenerValorCampo(regla.getField(), datos);
        Object valorEsperado = regla.getValue();
        String operador = regla.getOperator();

        if (operador == null) return true;

        return switch (operador) {
            case "EQUALS" -> comparar(valorReal, valorEsperado) == 0;
            case "NOT_EQUALS" -> comparar(valorReal, valorEsperado) != 0;
            case "GREATER_THAN" -> comparar(valorReal, valorEsperado) > 0;
            case "LESS_THAN" -> comparar(valorReal, valorEsperado) < 0;
            case "GREATER_THAN_OR_EQUAL" -> comparar(valorReal, valorEsperado) >= 0;
            case "LESS_THAN_OR_EQUAL" -> comparar(valorReal, valorEsperado) <= 0;
            case "CONTAINS" -> valorReal != null && valorReal.toString().toLowerCase()
                    .contains(valorEsperado.toString().toLowerCase());
            case "IN" -> valorEsperado instanceof List && ((List<Object>) valorEsperado).contains(valorReal);
            case "NOT_IN" -> valorEsperado instanceof List && !((List<Object>) valorEsperado).contains(valorReal);
            case "BETWEEN" -> {
                if (valorEsperado instanceof List && ((List<?>) valorEsperado).size() == 2) {
                    List<Object> rango = (List<Object>) valorEsperado;
                    yield comparar(valorReal, rango.get(0)) >= 0 && comparar(valorReal, rango.get(1)) <= 0;
                }
                yield false;
            }
            case "IS_NULL" -> valorReal == null;
            case "NOT_NULL" -> valorReal != null;
            case "IS_EMPTY" -> valorReal == null || valorReal.toString().trim().isEmpty();
            case "NOT_EMPTY" -> valorReal != null && !valorReal.toString().trim().isEmpty();
            case "TRUE" -> Boolean.TRUE.equals(valorReal);
            case "FALSE" -> Boolean.FALSE.equals(valorReal);
            default -> {
                log.warn("Operador no soportado: {}", operador);
                yield true;
            }
        };
    }

    private Object obtenerValorCampo(String field, Map<String, Object> datos) {
        if (field == null || field.isEmpty()) return null;
        String[] partes = field.split("\\.");
        Object valor = datos;
        for (String parte : partes) {
            if (valor instanceof Map) {
                valor = ((Map<String, Object>) valor).get(parte);
            } else {
                return null;
            }
        }
        return valor;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private int comparar(Object a, Object b) {
        if (a == null && b == null) return 0;
        if (a == null) return -1;
        if (b == null) return 1;
        if (a instanceof Number na && b instanceof Number nb) {
            return Double.compare(na.doubleValue(), nb.doubleValue());
        }
        if (a instanceof Boolean ba && b instanceof Boolean bb) {
            return Boolean.compare(ba, bb);
        }
        return a.toString().compareToIgnoreCase(b.toString());
    }

    private static class NodoRegla {
        private String condition;
        private List<NodoRegla> rules;
        private String field;
        private String operator;
        private Object value;
        public String getCondition() { return condition; }
        public void setCondition(String condition) { this.condition = condition; }
        public List<NodoRegla> getRules() { return rules; }
        public void setRules(List<NodoRegla> rules) { this.rules = rules; }
        public String getField() { return field; }
        public void setField(String field) { this.field = field; }
        public String getOperator() { return operator; }
        public void setOperator(String operator) { this.operator = operator; }
        public Object getValue() { return value; }
        public void setValue(Object value) { this.value = value; }
    }
}
