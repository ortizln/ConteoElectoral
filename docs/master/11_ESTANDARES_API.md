# 11 — ESTÁNDARES DE API REST

> Estándares para el diseño y documentación de la API REST del ERP Electoral.

---

## 1. PRINCIPIOS GENERALES

- **RESTful** — recursos, verbos HTTP, representaciones JSON
- **Stateless** — cada petición contiene toda la información necesaria
- **Consistente** — mismos patrones de nomenclatura, errores, paginación
- **Versionado** — URI prefix `/api/` (futuro: `/api/v2/`)
- **JSON** como formato único de intercambio

---

## 2. NOMENCLATURA DE ENDPOINTS

### 2.1 Reglas
| Elemento | Regla | Ejemplo |
|----------|-------|---------|
| Recursos | Sustantivos en plural | `/api/candidatos` |
| Sub-recursos | Anidados con / | `/api/mesas/{id}/votos` |
| Parámetros | camelCase | `?fechaInicio=2026-01-01` |
| Acciones | Verbos HTTP, no en URL | ❌ `/api/candidatos/crear` ✅ `POST /api/candidatos` |
| Filtros | Query params | `?eleccionId=1&activo=true` |
| Paginación | Query params | `?page=0&size=20&sort=id,desc` |

### 2.2 Verbos HTTP por Operación
| Operación | Verbo | Endpoint | Código |
|-----------|-------|----------|--------|
| Listar | GET | `/api/candidatos` | 200 |
| Obtener | GET | `/api/candidatos/{id}` | 200 |
| Crear | POST | `/api/candidatos` | 201 |
| Actualizar | PUT | `/api/candidatos/{id}` | 200 |
| Eliminar | DELETE | `/api/candidatos/{id}` | 204 |
| Listar por filtro | GET | `/api/candidatos?eleccionId=1` | 200 |

### 2.3 Endpoints Especiales
| Caso | Endpoint | Descripción |
|------|----------|-------------|
| Activar/Desactivar | `PUT /api/candidatos/{id}/estado` | Cambiar activo/inactivo |
| Cerrar acta | `PUT /api/mesas/{id}/cerrar` | Cierre de acta |
| Reabrir acta | `PUT /api/mesas/{id}/reabrir` | Reapertura autorizada |
| Importar | `POST /api/import/excel` | Importación masiva |
| Exportar PDF | `GET /api/candidatos/export/pdf` | Reporte PDF |
| Exportar Excel | `GET /api/candidatos/export/excel` | Reporte Excel |
| Generar papeletas | `POST /api/papeletas/generar/{eleccionId}` | Generación automática |

---

## 3. FORMATO DE RESPUESTA

### 3.1 Éxito — Lista Paginada
```http
GET /api/candidatos?page=0&size=20
```
```json
{
  "content": [
    {
      "id": 1,
      "nombres": "Juan",
      "apellidos": "Pérez",
      "cedula": "1234567890",
      "partidoNombre": "Partido Azul",
      "cargoNombre": "Presidente",
      "activo": true
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 150,
  "totalPages": 8,
  "last": false,
  "first": true
}
```

### 3.2 Éxito — Objeto Individual
```http
GET /api/candidatos/1
```
```json
{
  "id": 1,
  "nombres": "Juan",
  "apellidos": "Pérez",
  "cedula": "1234567890",
  "tipo": "PRINCIPAL",
  "ordenEnLista": 1,
  "partidoId": 1,
  "partidoNombre": "Partido Azul",
  "cargoId": 1,
  "cargoNombre": "Presidente",
  "listaNombre": "Lista 1",
  "fotoUrl": null,
  "activo": true
}
```

### 3.3 Error Estándar
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Candidato no encontrado con id: 99",
  "timestamp": "2026-07-20T08:30:00",
  "path": "/api/candidatos/99"
}
```

### 3.4 Error de Validación
```json
{
  "status": 400,
  "error": "Validation Error",
  "message": "nombres: Los nombres son obligatorios, cedula: Cédula debe tener 10 dígitos",
  "timestamp": "2026-07-20T08:30:00",
  "errors": [
    { "field": "nombres", "message": "Los nombres son obligatorios" },
    { "field": "cedula", "message": "Cédula debe tener 10 dígitos" }
  ]
}
```

---

## 4. PARÁMETROS COMUNES

### 4.1 Paginación
| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `page` | int | 0 | Número de página (0-based) |
| `size` | int | 20 | Elementos por página |
| `sort` | string | `id,asc` | Campo + dirección |

### 4.2 Filtros Comunes
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `search` | string | Búsqueda textual |
| `activo` | boolean | Filtrar por estado |
| `eleccionId` | long | Filtrar por elección |
| `fechaInicio` | date | Desde fecha |
| `fechaFin` | date | Hasta fecha |

---

## 5. HEADERS HTTP

### 5.1 Request Headers
| Header | Obligatorio | Descripción |
|--------|-------------|-------------|
| `Authorization` | Sí (excepto endpoints públicos) | `Bearer <jwt_token>` |
| `Content-Type` | Sí (POST/PUT) | `application/json` |
| `Accept` | No | `application/json` |

### 5.2 Response Headers
| Header | Descripción |
|--------|-------------|
| `Content-Type` | `application/json` (o `application/pdf`, `application/vnd.openxmlformats...`) |
| `X-Total-Count` | Total de elementos (respuestas paginadas) |
| `Location` | URI del recurso creado (POST → 201) |

---

## 6. CÓDIGOS DE ESTADO HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | GET, PUT exitosos |
| 201 | Created | POST exitoso |
| 204 | No Content | DELETE exitoso |
| 400 | Bad Request | Validación fallida, datos inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para el recurso |
| 404 | Not Found | Recurso no existe |
| 409 | Conflict | Duplicado, violación de integridad |
| 422 | Unprocessable Entity | Regla de negocio violada |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Internal Server Error | Error no manejado |

---

## 7. ENDPOINTS PÚBLICOS (SIN AUTENTICACIÓN)

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/auth/login` | POST | Inicio de sesión |
| `/api/auth/verify-password` | POST | Verificar contraseña |
| `/api/carousel/**` | GET | Imágenes del carrusel |
| `/api/configuracion/logo` | GET | Logo del partido |
| `/api/configuracion/apk/**` | GET | Descarga APK |
| `/api/configuracion/manual` | GET | Descarga manual PDF |
| `/ws/**` | WebSocket | Conexión WebSocket |
| `/swagger-ui/**` | GET | Documentación Swagger |
| `/v3/api-docs/**` | GET | OpenAPI spec |

---

## 8. ESPECIFICACIÓN OPENAPI (SWAGGER)

### Configuración SpringDoc
```java
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI electoralOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("ERP Electoral API")
                .description("API REST del Sistema de Conteo Electoral")
                .version("1.0.0")
                .contact(new Contact()
                    .name("Soporte Técnico")
                    .email("soporte@electoral.ec")))
            .addSecurityItem(new SecurityRequirement()
                .addList("bearerAuth"))
            .components(new Components()
                .addSecuritySchemes("bearerAuth",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}
```

### Ejemplo de Endpoint Documentado
```java
@Operation(summary = "Listar candidatos", description = "Retorna lista paginada de candidatos filtrada por elección")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Lista obtenida exitosamente"),
    @ApiResponse(responseCode = "401", description = "No autenticado"),
    @ApiResponse(responseCode = "403", description = "Sin permisos")
})
@GetMapping
public ResponseEntity<Page<CandidatoResponse>> listar(
        @Parameter(description = "ID de la elección") @RequestParam(required = false) Long eleccionId,
        @Parameter(hidden = true) @PageableDefault(size = 20) Pageable pageable) {
    return ResponseEntity.ok(candidatoService.listar(eleccionId, pageable));
}
```

---

## 9. VERSIONADO DE API

### Estrategia
- **URI prefix**: `/api/` (v1 implícita)
- **Futuras versiones**: `/api/v2/`, `/api/v3/`
- **Headers**: Opcionalmente `Accept-Version: 2`

### Transición
1. Nueva versión en nueva ruta (`/api/v2/`)
2. Versión anterior sigue funcionando (`/api/`)
3. Documentar breaking changes
4. Deprecar versión anterior con header `Warning: 299 - "API version 1 deprecated"`
5. Eliminar versión anterior después de período de gracia

---

## 10. WEBHOOKS (FUTURO)

### Formato
```json
{
  "event": "MESA_CERRADA",
  "timestamp": "2026-07-20T17:00:00Z",
  "data": {
    "mesaId": 42,
    "eleccionId": 1,
    "totalVotos": 500,
    "actaCerrada": true
  }
}
```

### Eventos Disponibles
| Evento | Disparador |
|--------|------------|
| `MESA_CERRADA` | Cierre de acta |
| `MESA_REABIERTA` | Reapertura de acta |
| `VOTO_REGISTRADO` | Nuevo voto registrado |
| `RESULTADOS_ACTUALIZADOS` | Cambios en resultados |
| `ELECCION_FINALIZADA` | Elección marcada como finalizada |
