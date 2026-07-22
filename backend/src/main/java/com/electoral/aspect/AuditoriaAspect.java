package com.electoral.aspect;

import com.electoral.annotation.Auditable;
import com.electoral.entities.Auditoria;
import com.electoral.services.AuditoriaService;
import com.electoral.util.SecurityUtil;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import java.util.Map;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class AuditoriaAspect {

    private final AuditoriaService auditoriaService;
    private final SecurityUtil securityUtil;
    private final ObjectMapper objectMapper;

    @Around("@annotation(auditable)")
    public Object auditar(ProceedingJoinPoint joinPoint, Auditable auditable) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();

        Auditoria.TipoAccion accion = determinarAccion(methodName, auditable);

        Map<String, Object> datosAnteriores = null;
        if (accion == Auditoria.TipoAccion.UPDATE && args.length > 0 && args[0] != null) {
            datosAnteriores = convertirAMapa(args[0]);
        }

        Object result = joinPoint.proceed(args);

        Map<String, Object> datosNuevos = null;
        if (result != null && accion != Auditoria.TipoAccion.DELETE) {
            datosNuevos = convertirAMapa(result);
        }

        Long entidadId = extraerId(result, args, methodName, accion);
        Long userId = securityUtil.getCurrentUserId();

        if (userId != null) {
            try {
                auditoriaService.registrarAccion(
                    userId, accion, auditable.entidad(), entidadId,
                    datosAnteriores, datosNuevos
                );
                log.debug("Auditoría registrada: {} - {} #{}", accion, auditable.entidad(), entidadId);
            } catch (Exception e) {
                log.warn("Error registrando auditoría: {}", e.getMessage());
            }
        }

        return result;
    }

    private Auditoria.TipoAccion determinarAccion(String methodName, Auditable auditable) {
        if (!auditable.autoAccion()) {
            return auditable.accion();
        }
        String name = methodName.toLowerCase();
        if (name.startsWith("create") || name.startsWith("save") || name.startsWith("registrar")
                || name.startsWith("generar") || name.startsWith("upload")) {
            return Auditoria.TipoAccion.CREATE;
        }
        if (name.startsWith("update") || name.startsWith("edit") || name.startsWith("modificar")
                || name.startsWith("actualizar") || name.startsWith("asignar")) {
            return Auditoria.TipoAccion.UPDATE;
        }
        if (name.startsWith("delete") || name.startsWith("remove") || name.startsWith("eliminar")
                || name.startsWith("desasignar")) {
            return Auditoria.TipoAccion.DELETE;
        }
        return auditable.accion();
    }

    private Long extraerId(Object result, Object[] args, String methodName, Auditoria.TipoAccion accion) {
        if (accion == Auditoria.TipoAccion.DELETE) {
            for (Object arg : args) {
                if (arg instanceof Long) return (Long) arg;
                if (arg instanceof Integer) return ((Integer) arg).longValue();
            }
        }
        if (result != null) {
            try {
                Map<String, Object> mapa = convertirAMapa(result);
                if (mapa != null && mapa.containsKey("id") && mapa.get("id") != null) {
                    Object idVal = mapa.get("id");
                    if (idVal instanceof Number) return ((Number) idVal).longValue();
                }
            } catch (Exception ignored) {}
        }
        for (Object arg : args) {
            if (arg instanceof Long) return (Long) arg;
        }
        return null;
    }

    private Map<String, Object> convertirAMapa(Object obj) {
        try {
            String json = objectMapper.writeValueAsString(obj);
            return objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            return null;
        }
    }
}
