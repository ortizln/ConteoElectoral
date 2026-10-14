# DECISION_MODELO_VOTOS.md — Conteo Electoral

**Fecha:** 2026-10-13  
**Estado:** APROBADO  
**Decisión:** Opción A — Una terminal escritora por mesa

---

## Contexto

El sistema necesita definir cómo manejar la concurrencia cuando múltiples dispositivos intentan registrar votos en la misma mesa. Dos opciones fueron evaluadas:

---

## Opción A — Una Terminal Escritora por Mesa (SELECCIONADA)

### Descripción
- Cada mesa tiene **un solo dispositivo asignado** como escritor autorizado
- Otros dispositivos pueden **leer** pero no escribir en mesa ajena
- El backend valida `usuarioPerteneceAMesa()` en cada operación de sync
- Si un usuario no asignado intenta escribir, se rechaza con `success=false`

### Ventajas
- **Simplicidad:** No se necesita consolidación de incrementos concurrentes
- **Rendimiento:** Sin locking pesado en la base de datos
- **Auditabilidad:** Cada voto tiene un único autor claro
- **Consistencia:** Last-writer-wins es seguro cuando hay un solo escritor

### Desventajas
- **Restricción operativa:** Requiere que la operación garantice exclusividad real
- **Fallo de asignación:** Si la mesa se reasigna durante la jornada, puede haber conflicto

### Implementación

#### Backend (Spring Boot)
```java
// En processVotoOperation - CREATE/UPDATE/DELETE
if (!mesaService.usuarioPerteneceAMesa(usuarioId, mesaId)) {
    return SyncResultDTO.builder()
            .operationId(op.getOperationId()).success(false)
            .error("Usuario no asignado a la mesa " + mesaId)
            .build();
}
```

#### Guards adicionales
- **Mesa cerrada:** `MesaCerradaException` si `mesa.getCerrada() == true`
- **Asignación:** Verificación contra tabla `mesa_usuarios`
- **Audit:** Todas las operaciones de sync generan registro en `auditoria`

#### Migración requerida
```sql
-- Constraint único parcial (prevenir duplicados por races)
ALTER TABLE votos ADD CONSTRAINT uk_voto_mesa_lista 
    UNIQUE (mesa_id, lista_id) WHERE lista_id IS NOT NULL AND candidato_id IS NULL;
```

---

## Opción B — Varias Terminales por Mesa (NO SELECCIONADA)

### Descripción
- Múltiples dispositivos pueden registrar votos en la misma mesa simultáneamente
- Cada voto es un **evento incremento** con UUID único
- El servidor consolida totales al recibir eventos

### Por qué no se seleccionó
- Requiere migración de esquema completo (votos como eventos, no acumulados)
- Necesita conciliación del estado previo (votos existentes)
- Complejidad significativa en lógica de consolidación
- El caso de uso real (elecciones con miembros de mesa asignados) no lo requiere

---

## Reglas Operativas Derivadas

1. **Asignación previa:** Cada mesa debe tener al menos un miembro asignado antes de abrir
2. **Un escritor activo:** Durante la jornada, solo el miembro asignado registra votos
3. **Supervisión:** ADMIN/SUPERVISOR pueden escribir en cualquier mesa (override)
4. **Reasignación:** Si se reasigna una mesa, se debe cerrar la sesión del dispositivo anterior
5. **Auditoría:** Todas las escrituras quedan registradas con usuario, timestamp y valores

---

## Validación de la Decisión

| Criterio | Opción A | Opción B |
|----------|----------|----------|
| Complejidad implementación | Baja | Alta |
| Rendimiento | Alto | Medio |
| Riesgo de pérdida datos | Bajo | Medio |
| Facilidad de auditoría | Alta | Media |
| Requisito operativo | Exclusividad real | No requiere |
| **Selección** | **✅ SÍ** | ❌ NO |

---

## Condiciones para Re-evaluar

Cambiar a Opción B si:
- Se detectan conflictos reales de escritura concurrente en producción
- Se necesita soporte para tabletas de asistencia donde múltiples miembros registran
- Se implementa sistema de delegación/turnos en mesa
