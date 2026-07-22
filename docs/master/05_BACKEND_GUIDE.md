# 05 — GUÍA DE DESARROLLO BACKEND (SPRING BOOT)

> Estándares, patrones y buenas prácticas para el desarrollo del backend del ERP Electoral.

---

## 1. STACK TECNOLÓGICO

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Java | 17+ (21 objetivo) | Lenguaje |
| Spring Boot | 3.2.1+ | Framework |
| Spring Security | 6.x | Autenticación/autorización |
| JPA / Hibernate | 3.x / 6.x | ORM |
| PostgreSQL | 18 | Base de datos principal |
| Flyway | 9.x+ (futuro) | Migraciones |
| Lombok | 1.18.x | Reducción boilerplate |
| MapStruct | 1.5.x (futuro) | Mapeo DTO ↔ Entity |
| jjwt | 0.12.3 | JWT |
| iText | 7.2.5 | Generación PDF |
| Apache POI | 5.2.5 | Generación Excel |
| SpringDoc | 2.3.0 | OpenAPI / Swagger |
| WebSocket | Spring | Tiempo real |

---

## 2. ESTRUCTURA DE UN MÓDULO

Cada módulo de negocio debe seguir esta estructura:

```
com.electoral
├── entity/Candidato.java           ← Entidad JPA
├── repository/CandidatoRepository.java ← Spring Data
├── service/CandidatoService.java   ← Lógica de negocio
├── controller/CandidatoController.java ← REST API
├── dto/
│   ├── request/CandidatoRequest.java   ← Crear/Actualizar
│   └── response/CandidatoResponse.java ← Respuesta
└── mapper/CandidatoMapper.java     ← Mapper (opcional)
```

### Dependencia entre capas
```
Controller → DTO Request → Service → Entity
                                            ↓
Controller ← DTO Response ← Service ← Repository
```

---

## 3. ENTIDADES JPA — ESTÁNDARES

### 3.1 Anotaciones Base
```java
@Entity
@Table(name = "candidatos")
@EntityListeners(AuditEntityListener.class)
public class Candidato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String nombres;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ...
}
```

### 3.2 Reglas
- `@Table(name = "nombre_plural")` — nombre en snake_case plural
- `@Column(name = "snake_case")` — columnas en snake_case
- `@Id @GeneratedValue(IDENTITY)` para IDs numéricos
- **NUNCA** FetchType.EAGER — siempre LAZY
- `@ManyToMany` prohibido — usar entidad intermedia con `@OneToMany` + `@ManyToOne`
- Relaciones bidireccionales solo cuando es necesario
- `@JsonIgnore` o DTOs para evitar serialización circular
- `@PrePersist` / `@PreUpdate` para timestamps (o EntityListener)
- `@SQLDelete` para soft delete si aplica

### 3.3 Tipos de Relaciones
```java
// Unidireccional (preferida)
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "eleccion_id")
private Eleccion eleccion;

// Colección (siempre LAZY)
@OneToMany(mappedBy = "eleccion", fetch = FetchType.LAZY)
private List<Partido> partidos;

// Entidad intermedia (en vez de @ManyToMany)
public class TipoEleccionCargo {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_eleccion_id")
    private TipoEleccion tipoEleccion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cargo_id")
    private Cargo cargo;

    private Integer orden;
}
```

---

## 4. REPOSITORIES — ESTÁNDARES

```java
@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, Long> {

    // Query methods
    List<Candidato> findByEleccionId(Long eleccionId);

    Page<Candidato> findByEleccionId(Long eleccionId, Pageable pageable);

    // JPQL con JOIN FETCH para evitar N+1
    @Query("SELECT c FROM Candidato c JOIN FETCH c.partido JOIN FETCH c.cargo WHERE c.eleccion.id = :eleccionId ORDER BY c.ordenEnLista")
    List<Candidato> findByEleccionIdWithDetails(@Param("eleccionId") Long eleccionId);

    // Native query solo para consultas complejas
    @Query(value = "SELECT c.*, p.nombre AS partido_nombre FROM candidatos c JOIN partidos p ON c.partido_id = p.id WHERE c.eleccion_id = ?1",
           nativeQuery = true)
    List<Object[]> findRawByEleccionId(Long eleccionId);

    // Count
    long countByEleccionId(Long eleccionId);

    // Exist
    boolean existsByCedulaAndEleccionId(String cedula, Long eleccionId);
}
```

### Reglas
- Usar `Pageable` + `Page` para listados paginados
- Usar `JOIN FETCH` para evitar N+1 en consultas con relaciones
- Preferir JPQL sobre Native Queries
- Nombrar métodos descriptivos: `findByCampo`, `findByCampoAndOtro`, `countByCampo`
- No exponer `List` sin paginación si puede haber muchos registros

---

## 5. SERVICES — ESTÁNDARES

```java
@Service
@Transactional
public class CandidatoService {

    private final CandidatoRepository candidatoRepository;
    private final AuditoriaService auditoriaService;

    public CandidatoService(CandidatoRepository candidatoRepository, AuditoriaService auditoriaService) {
        this.candidatoRepository = candidatoRepository;
        this.auditoriaService = auditoriaService;
    }

    public Page<CandidatoResponse> listar(Long eleccionId, Pageable pageable) {
        return candidatoRepository.findByEleccionId(eleccionId, pageable)
            .map(this::toResponse);
    }

    public CandidatoResponse obtener(Long id) {
        Candidato candidato = candidatoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Candidato no encontrado con id: " + id));
        return toResponse(candidato);
    }

    @Transactional
    public CandidatoResponse crear(CandidatoRequest request) {
        // Validaciones de negocio
        validarUnicidad(request.getCedula(), request.getEleccionId());

        Candidato candidato = toEntity(request);
        candidato = candidatoRepository.save(candidato);

        auditoriaService.registrar("CANDIDATOS", "CREATE", candidato.getId(),
            null, toJson(candidato));

        return toResponse(candidato);
    }

    @Transactional
    public CandidatoResponse actualizar(Long id, CandidatoRequest request) {
        Candidato candidato = candidatoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Candidato no encontrado con id: " + id));

        String valorAnterior = toJson(candidato);

        // Actualizar campos
        candidato.setNombres(request.getNombres());
        candidato.setApellidos(request.getApellidos());
        // ...

        candidato = candidatoRepository.save(candidato);

        auditoriaService.registrar("CANDIDATOS", "UPDATE", id,
            valorAnterior, toJson(candidato));

        return toResponse(candidato);
    }

    @Transactional
    public void eliminar(Long id) {
        Candidato candidato = candidatoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Candidato no encontrado con id: " + id));

        String valorAnterior = toJson(candidato);
        candidatoRepository.delete(candidato);

        auditoriaService.registrar("CANDIDATOS", "DELETE", id,
            valorAnterior, null);
    }

    private CandidatoResponse toResponse(Candidato c) {
        CandidatoResponse r = new CandidatoResponse();
        r.setId(c.getId());
        r.setNombres(c.getNombres());
        r.setApellidos(c.getApellidos());
        r.setPartidoNombre(c.getPartido().getNombre());
        r.setCargoNombre(c.getCargo().getNombre());
        return r;
    }

    private Candidato toEntity(CandidatoRequest r) {
        Candidato c = new Candidato();
        c.setNombres(r.getNombres());
        c.setApellidos(r.getApellidos());
        c.setEleccion(entityManager.getReference(Eleccion.class, r.getEleccionId()));
        c.setCargo(entityManager.getReference(Cargo.class, r.getCargoId()));
        return c;
    }
}
```

### Reglas
- `@Transactional` a nivel de clase o método público
- Inyectar por constructor (no `@Autowired` en campo)
- Auditoría en cada método de escritura
- Validaciones de negocio antes de guardar
- Usar `getReferenceById` (JPA proxy) para FK existentes
- Lanzar excepciones personalizadas con mensajes descriptivos

---

## 6. CONTROLLERS — ESTÁNDARES

```java
@RestController
@RequestMapping("/api/candidatos")
@PreAuthorize("hasRole('ADMIN')")
public class CandidatoController {

    private final CandidatoService candidatoService;

    public CandidatoController(CandidatoService candidatoService) {
        this.candidatoService = candidatoService;
    }

    @GetMapping
    public ResponseEntity<Page<CandidatoResponse>> listar(
            @RequestParam(required = false) Long eleccionId,
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(candidatoService.listar(eleccionId, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidatoResponse> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(candidatoService.obtener(id));
    }

    @PostMapping
    public ResponseEntity<CandidatoResponse> crear(@Valid @RequestBody CandidatoRequest request) {
        CandidatoResponse response = candidatoService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidatoResponse> actualizar(
            @PathVariable Long id, @Valid @RequestBody CandidatoRequest request) {
        return ResponseEntity.ok(candidatoService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        candidatoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/export/excel")
    public void exportarExcel(HttpServletResponse response, ...) throws IOException {
        // Exportación Excel
    }

    @GetMapping("/export/pdf")
    public void exportarPdf(HttpServletResponse response, ...) throws IOException {
        // Exportación PDF
    }
}
```

### Reglas
- `@Valid` en request body para validación automática
- `@PreAuthorize` a nivel de clase o método
- `ResponseEntity<T>` como tipo de retorno
- Códigos HTTP correctos: 201 POST, 200 GET/PUT, 204 DELETE
- `@PageableDefault` para paginación con defaults
- `@RequestParam(required = false)` para filtros opcionales
- NO lógica de negocio en controlador — delegar a Service
- NO acceso directo a repositorio desde controlador

---

## 7. DTOs — ESTÁNDARES

### Request
```java
public class CandidatoRequest {

    @NotNull(message = "El ID de la elección es obligatorio")
    private Long eleccionId;

    @NotBlank(message = "Los nombres son obligatorios")
    @Size(max = 255, message = "Los nombres no pueden exceder 255 caracteres")
    private String nombres;

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(max = 255)
    private String apellidos;

    @Pattern(regexp = "\\d{10}", message = "Cédula debe tener 10 dígitos")
    private String cedula;

    @NotNull
    private Long partidoId;

    @NotNull
    private Long cargoId;

    private Long listaId;
    private String tipo; // PRINCIPAL, SUPLENTE
    private Integer ordenEnLista;
}
```

### Response
```java
public class CandidatoResponse {
    private Long id;
    private String nombres;
    private String apellidos;
    private String cedula;
    private String tipo;
    private Integer ordenEnLista;
    private String partidoNombre;
    private String cargoNombre;
    private String listaNombre;
    private String fotoUrl;
    private Boolean activo;
}
```

### Reglas DTO
- Usar Bean Validation (`@NotBlank`, `@NotNull`, `@Size`, `@Pattern`)
- Response DTOs con datos desnormalizados para el frontend
- No incluir relaciones JPA en Response (aplanar con nombres)
- Usar `String` para enums en DTOs (no el enum directamente)
- No incluir `passwordHash` o datos sensibles en ningún DTO

---

## 8. EXCEPCIONES — ESTÁNDARES

### Excepciones Personalizadas
```java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
```

### GlobalExceptionHandler
```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(404, "Not Found", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .toList();
        return ResponseEntity.badRequest()
            .body(new ErrorResponse(400, "Validation Error", String.join(", ", errors)));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(new ErrorResponse(403, "Forbidden", "No tiene permisos para esta acción"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        log.error("Error no manejado: ", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse(500, "Internal Server Error", "Error interno del servidor"));
    }
}
```

---

## 9. EXPORTACIÓN PDF/EXCEL

### Patrón Template Method
```java
public abstract class ExportService {

    public void exportar(HttpServletResponse response, String nombreArchivo, List<?> datos) {
        response.setContentType(getContentType());
        response.setHeader("Content-Disposition", "attachment; filename=" + nombreArchivo);
        generarContenido(response.getOutputStream(), datos);
    }

    protected abstract String getContentType();
    protected abstract void generarContenido(OutputStream out, List<?> datos);
}
```

### Implementación PDF (iText 7)
```java
public class PdfExportService extends ExportService {
    @Override
    protected String getContentType() { return "application/pdf"; }

    @Override
    protected void generarContenido(OutputStream out, List<?> datos) {
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);
        document.add(new Paragraph("Reporte de Candidatos"));
        // Agregar tabla con datos
        document.close();
    }
}
```

### Implementación Excel (Apache POI)
```java
public class ExcelExportService extends ExportService {
    @Override
    protected String getContentType() {
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }

    @Override
    protected void generarContenido(OutputStream out, List<?> datos) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Candidatos");
        // Crear fila de encabezados
        // Crear filas de datos
        workbook.write(out);
        workbook.close();
    }
}
```

---

## 10. WEBSOCKET — CONFIGURACIÓN

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
            .setAllowedOrigins("*")
            .withSockJS();
    }
}
```

### Envío de Actualizaciones
```java
@Service
public class ResultadoWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public ResultadoWebSocketService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notificarResultados(Long eleccionId, DashboardData data) {
        messagingTemplate.convertAndSend("/topic/resultados/" + eleccionId, data);
    }

    public void notificarEstadoMesa(Long eleccionId, MesaEstado estado) {
        messagingTemplate.convertAndSend("/topic/mesa-estado/" + eleccionId, estado);
    }
}
```

---

## 11. SEGURIDAD — CONFIGURACIÓN

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .cors(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sm -> sm.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/carousel/**").permitAll()
                .requestMatchers("/api/configuracion/logo", "/api/configuracion/apk", "/api/configuracion/manual").permitAll()
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .requestMatchers("/ws/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
```

---

## 12. EXTRAS Y BUENAS PRÁCTICAS

### Logging
```java
private static final Logger log = LoggerFactory.getLogger(CandidatoService.class);
// Usar SLF4J con placeholders: log.info("Candidato {} creado para elección {}", id, eleccionId);
```

### Cache (futuro)
```java
@Cacheable("candidatos")
public List<CandidatoResponse> listarActivos(Long eleccionId) { ... }

@CacheEvict(value = "candidatos", key = "#request.eleccionId")
public CandidatoResponse crear(CandidatoRequest request) { ... }
```

### Async (futuro)
```java
@Async
public CompletableFuture<Void> generarPapeletasAsync(Long eleccionId) {
    // Generación pesada en segundo plano
    return CompletableFuture.completedFuture(null);
}
```

### Programación de Tareas (futuro)
```java
@Scheduled(cron = "0 0 0 * * ?") // Diario a medianoche
public void cerrarEleccionesVencidas() {
    // Lógica automática
}
```
