# 08 — SEGURIDAD DEL SISTEMA

> Políticas, mecanismos y estándares de seguridad del ERP Electoral.

---

## 1. PRINCIPIOS DE SEGURIDAD

- **Nunca confiar en el Frontend** — toda validación duplicada en backend
- **Defense in depth** — múltiples capas de seguridad
- **Principio de mínimo privilegio** — cada rol tiene solo los permisos necesarios
- **Seguridad por diseño** — considerar seguridad desde la arquitectura
- **OWASP Top 10** — seguir las recomendaciones

---

## 2. AUTENTICACIÓN (JWT)

### 2.1 Flujo de Autenticación
```
Cliente → POST /api/auth/login { username, password }
  → Server verifica credenciales (BCrypt)
  → Server genera JWT (24h de expiración)
  → Response { token, type: "Bearer", username, rol }

Cliente → GET /api/recurso (Header: Authorization: Bearer <token>)
  → JwtAuthenticationFilter valida token
  → Si válido: establece SecurityContext
  → Si inválido: 401 Unauthorized
```

### 2.2 JWT — Estructura
```json
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "admin",
  "userId": 1,
  "rol": "ADMIN",
  "iat": 1700000000,
  "exp": 1700086400
}

// Signature
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secretKey)
```

### 2.3 Configuración JWT
```properties
# application.properties
jwt.secret=aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQo=
jwt.expiration=86400000  # 24 horas en ms
```

### 2.4 JwtService
```java
@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationMs;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", userDetails.getAuthorities().iterator().next().getAuthority());
        return createToken(claims, userDetails.getUsername());
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}
```

---

## 3. AUTORIZACIÓN (ROLES Y PERMISOS)

### 3.1 Jerarquía de Roles
```
ADMIN → Acceso total
SUPERVISOR → Dashboard + admin parcial (sin configuración)
MIEMBRO_MESA → Solo votación
OPERADOR → Registro de votos por papeleta
```

### 3.2 Matriz de Permisos
| Módulo | ADMIN | SUPERVISOR | MIEMBRO_MESA | OPERADOR |
|--------|-------|-----------|-------------|----------|
| Dashboard | V | V | - | - |
| Elecciones | V/C/E/D | V | - | - |
| Partidos | V/C/E/D | V | - | - |
| Cargos | V/C/E/D | V | - | - |
| Candidatos | V/C/E/D | V | - | - |
| Mesas | V/C/E/D | V | - | - |
| Asignar Mesas | V/C/E/D | V | - | - |
| Papeletas | V/C/E/D | V | - | - |
| Zonas | V/C/E/D | - | - | - |
| Provincias | V/C/E/D | - | - | - |
| Cantones | V/C/E/D | - | - | - |
| Parroquias | V/C/E/D | - | - | - |
| Instituciones | V/C/E/D | V | - | - |
| Usuarios | V/C/E/D | - | - | - |
| Configuración | V/C/E/D | - | - | - |
| Votación | V | V | V | V |

### 3.3 Implementación en Backend
```java
// A nivel de clase (todas las operaciones requieren seguridad)
@RestController
@RequestMapping("/api/candidatos")
@PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
public class CandidatoController { ... }

// A nivel de método (casos específicos)
@PostMapping
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<CandidatoResponse> crear(@Valid @RequestBody CandidatoRequest request) { ... }

// Endpoints públicos
@GetMapping("/activas")
@PreAuthorize("permitAll()")
public ResponseEntity<List<EleccionResponse>> listarActivas() { ... }
```

### 3.4 Permisos Dinámicos (Tabla roles_permisos)
```java
@Service
public class PermisoService {

    public boolean tienePermiso(Long rolId, String modulo, String accion) {
        // Verificar en tabla roles_permisos
        return rolesPermisosRepository
            .findByRolIdAndModulo(rolId, modulo)
            .map(permiso -> switch (accion) {
                case "VER" -> permiso.isPuedeVer();
                case "CREAR" -> permiso.isPuedeCrear();
                case "EDITAR" -> permiso.isPuedeEditar();
                case "ELIMINAR" -> permiso.isPuedeEliminar();
                default -> false;
            })
            .orElse(false);
    }
}
```

---

## 4. PROTECCIÓN DE CONTRASEÑAS

### BCrypt
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(10); // Strength 10
}

// Hash
String hash = passwordEncoder.encode("admin123");

// Verificar
boolean matches = passwordEncoder.matches("admin123", hash);
```

### Políticas de Contraseña (recomendadas)
- Mínimo 8 caracteres
- Al menos 1 mayúscula, 1 minúscula, 1 número
- Al menos 1 carácter especial
- No puede ser igual al username
- Cambio obligatorio cada 90 días
- No reutilizar las últimas 5 contraseñas

---

## 5. SEGURIDAD EN API

### 5.1 Configuración CORS
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList(
        "http://localhost:4200",
        "http://192.168.100.215:4200"
    ));
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(Arrays.asList("*"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
```

### 5.2 Rate Limiting (futuro)
```java
// Con Bucket4j o Spring Filter
@Bean
public Filter rateLimitFilter() {
    return (request, response, chain) -> {
        String ip = request.getRemoteAddr();
        if (rateLimiter.tryConsume(ip)) {
            chain.doFilter(request, response);
        } else {
            ((HttpServletResponse) response).setStatus(429);
        }
    };
}
```

### 5.3 Headers de Seguridad
```java
http.headers(headers -> headers
    .xssProtection(XXssProtectionHeaderWriter.XXssProtection.ENABLED_MODE_BLOCK)
    .contentSecurityPolicy(csp -> csp.policyDirectives("default-src 'self'"))
    .frameOptions(FrameOptionsHeaderWriter.FrameOptionsMode.DENY)
    .contentTypeOptions(Customizer.withDefaults())
);
```

---

## 6. VALIDACIONES SERVER-SIDE

### 6.1 Validaciones de Entrada
```java
public class CandidatoRequest {
    @NotNull(message = "El ID de elección es obligatorio")
    private Long eleccionId;

    @NotBlank(message = "Los nombres son obligatorios")
    @Size(max = 255)
    private String nombres;

    @Pattern(regexp = "\\d{10}", message = "Cédula inválida")
    private String cedula;

    @NotNull
    private Long partidoId;
}
```

### 6.2 Validaciones de Negocio
```java
@Service
public class CandidatoValidator {

    public void validarCreacion(CandidatoRequest request) {
        // Verificar que la elección existe y está activa
        // Verificar que el partido existe
        // Verificar que el cargo existe
        // Verificar unicidad de cédula en esta elección
        // Verificar límite de candidatos por cargo
        // Verificar cupo de género
    }
}
```

### 6.3 Prevención SQL Injection
```java
// SEGURO — JPA parametrizado automáticamente
@Query("SELECT c FROM Candidato c WHERE c.cedula = :cedula")
List<Candidato> findByCedula(@Param("cedula") String cedula);

// SEGURO — Criteria API
// INSEGURO — NUNCA concatenar strings en consultas
// @Query(value = "SELECT * FROM candidatos WHERE cedula = '" + cedula + "'", nativeQuery = true)  // ❌
```

---

## 7. SEGURIDAD EN FRONTEND

### 7.1 Almacenamiento de Token
```typescript
// ✅ SEGURO - localStorage con httpOnly (no accesible por JS)
// El token se almacena en localStorage pero no hay scripts XSS
localStorage.setItem('token', token);

// ❌ INSEGURO - cookies sin httpOnly ni Secure
```

### 7.2 Interceptor para Adjuntar Token
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token');
        if (token) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        return next.handle(req);
    }
}
```

### 7.3 Protección de Rutas
```typescript
const routes: Routes = [
    { path: 'admin', loadChildren: ..., canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] }},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SUPERVISOR'] }},
];
```

---

## 8. SEGURIDAD EN FLUTTER

### 8.1 Almacenamiento Seguro de Token
```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();

// Guardar
await storage.write(key: 'jwt_token', value: token);

// Leer
final token = await storage.read(key: 'jwt_token');

// Eliminar
await storage.delete(key: 'jwt_token');
```

### 8.2 Verificación de Conexión
```dart
// No enviar datos sensibles si no hay conexión segura
if (await Connectivity().checkConnectivity() == ConnectivityResult.wifi ||
    await Connectivity().checkConnectivity() == ConnectivityResult.mobile) {
    // Enviar datos
}
```

---

## 9. AUDITORÍA DE SEGURIDAD

### Eventos a Auditar
| Evento | Descripción |
|--------|-------------|
| LOGIN_EXITOSO | Inicio de sesión correcto |
| LOGIN_FALLIDO | Intento de inicio de sesión fallido |
| ACCESO_DENEGADO | Intento de acceso sin permisos |
| CAMBIO_PASSWORD | Cambio de contraseña |
| CIERRE_ACTA | Cierre de acta de mesa |
| REAPERTURA_ACTA | Reapertura de acta |

### Logs de Seguridad
```java
// En un archivo separado (security.log)
log.warn("Intento de acceso denegado: usuario={}, ruta={}, ip={}",
    SecurityUtil.getCurrentUsername(), request.getRequestURI(), request.getRemoteAddr());
```

---

## 10. RECOMENDACIONES ADICIONALES

1. **HTTPS** en producción — cifrar toda la comunicación
2. **Rotación de secretos** — cambiar JWT secret periódicamente
3. **Deshabilitar usuarios** en lugar de eliminar (soft delete)
4. **Session timeout** — cerrar sesión después de N minutos de inactividad
5. **No loguear datos sensibles** — passwords, tokens, PINs
6. **Validar todo en backend** — nunca confiar en datos del frontend
7. **CSRF token** si se usan cookies (con JWT en header no es necesario)
8. **Content-Type validation** — rechazar peticiones sin Content-Type adecuado
9. **Tamaño máximo de request** — configurar en servidor
10. **Auditar cambios** en configuración de seguridad
