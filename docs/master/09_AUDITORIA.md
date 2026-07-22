# 09 — AUDITORÍA DEL SISTEMA

> Documento de diseño e implementación del módulo de auditoría del ERP Electoral.

---

## 1. OBJETIVO

Registrar de manera automática e inmutable todas las operaciones de escritura (CREATE, UPDATE, DELETE) realizadas en el sistema, permitiendo la trazabilidad completa de cada cambio.

---

## 2. ESTRUCTURA DE DATOS — TABLA `auditoria`

```sql
CREATE TABLE auditoria (
    id              BIGSERIAL PRIMARY KEY,
    usuario         VARCHAR(100)    NOT NULL,
    fecha           DATE            NOT NULL DEFAULT CURRENT_DATE,
    hora            TIME            NOT NULL DEFAULT CURRENT_TIME,
    equipo          VARCHAR(255),
    ip              VARCHAR(50),
    modulo          VARCHAR(100)    NOT NULL,
    accion          VARCHAR(20)     NOT NULL,  -- CREATE, UPDATE, DELETE
    registro_id     BIGINT,
    valor_anterior  JSONB,                     -- Valores antes del cambio
    valor_nuevo     JSONB,                     -- Valores después del cambio
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para consultas eficientes
CREATE INDEX idx_auditoria_modulo ON auditoria(modulo);
CREATE INDEX idx_auditoria_fecha ON auditoria(fecha);
CREATE INDEX idx_auditoria_usuario ON auditoria(usuario);
CREATE INDEX idx_auditoria_modulo_fecha ON auditoria(modulo, fecha);
```

---

## 3. IMPLEMENTACIÓN BACKEND

### 3.1 Entity Listener para JPA
```java
public class AuditEntityListener {

    @PrePersist
    public void prePersist(Object entity) {
        if (entity instanceof Auditable auditable) {
            auditable.setCreatedAt(LocalDateTime.now());
            auditable.setUpdatedAt(LocalDateTime.now());
        }
    }

    @PreUpdate
    public void preUpdate(Object entity) {
        if (entity instanceof Auditable auditable) {
            auditable.setUpdatedAt(LocalDateTime.now());
        }
    }

    @PostPersist
    public void postPersist(Object entity) {
        if (entity instanceof BaseEntity base) {
            AuditContext.getService().registrar(
                base.getModulo(),
                "CREATE",
                base.getId(),
                null,
                toJson(entity)
            );
        }
    }

    @PostUpdate
    public void postUpdate(Object entity) {
        if (entity instanceof BaseEntity base) {
            AuditContext.getService().registrar(
                base.getModulo(),
                "UPDATE",
                base.getId(),
                base.getValorAnterior(),  // Capturado en @PreUpdate
                toJson(entity)
            );
        }
    }

    @PostRemove
    public void postRemove(Object entity) {
        if (entity instanceof BaseEntity base) {
            AuditContext.getService().registrar(
                base.getModulo(),
                "DELETE",
                base.getId(),
                toJson(entity),
                null
            );
        }
    }
}
```

### 3.2 Servicio de Auditoría
```java
@Service
@Transactional
public class AuditoriaService {

    private final AuditoriaRepository auditoriaRepository;

    public AuditoriaService(AuditoriaRepository auditoriaRepository) {
        this.auditoriaRepository = auditoriaRepository;
    }

    public void registrar(String modulo, String accion, Long registroId,
                          String valorAnterior, String valorNuevo) {
        Auditoria auditoria = new Auditoria();
        auditoria.setUsuario(SecurityUtil.getCurrentUsername());
        auditoria.setFecha(LocalDate.now());
        auditoria.setHora(LocalTime.now());
        auditoria.setIp(SecurityUtil.getCurrentIp());
        auditoria.setEquipo(SecurityUtil.getCurrentHostname());
        auditoria.setModulo(modulo);
        auditoria.setAccion(accion);
        auditoria.setRegistroId(registroId);
        auditoria.setValorAnterior(valorAnterior);
        auditoria.setValorNuevo(valorNuevo);
        auditoriaRepository.save(auditoria);
    }

    public Page<AuditoriaResponse> consultar(String modulo, String accion,
                                             LocalDate desde, LocalDate hasta,
                                             Pageable pageable) {
        // Construir Specification dinámica
        Specification<Auditoria> spec = Specification.where(null);
        if (modulo != null) spec = spec.and((root, query, cb) ->
            cb.equal(root.get("modulo"), modulo));
        if (accion != null) spec = spec.and((root, query, cb) ->
            cb.equal(root.get("accion"), accion));
        if (desde != null) spec = spec.and((root, query, cb) ->
            cb.greaterThanOrEqualTo(root.get("fecha"), desde));
        if (hasta != null) spec = spec.and((root, query, cb) ->
            cb.lessThanOrEqualTo(root.get("fecha"), hasta));

        return auditoriaRepository.findAll(spec, pageable)
            .map(this::toResponse);
    }
}
```

### 3.3 Interfaces y Clases Base
```java
// Interfaz para entidades auditables
public interface Auditable {
    void setCreatedAt(LocalDateTime createdAt);
    void setUpdatedAt(LocalDateTime updatedAt);
}

// Clase base para entidades con auditoría automática
@MappedSuperclass
@EntityListeners(AuditEntityListener.class)
public abstract class BaseEntity implements Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Transient
    private String valorAnterior;  // Capturado para diff

    // Getters, setters
    public abstract String getModulo(); // Cada entidad retorna su módulo
}
```

### 3.4 Entity de Auditoría
```java
@Entity
@Table(name = "auditoria")
public class Auditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String usuario;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    private LocalTime hora;

    @Column(length = 255)
    private String equipo;

    @Column(length = 50)
    private String ip;

    @Column(nullable = false, length = 100)
    private String modulo;

    @Column(nullable = false, length = 20)
    private String accion;

    private Long registroId;

    @Column(columnDefinition = "jsonb")
    private String valorAnterior;

    @Column(columnDefinition = "jsonb")
    private String valorNuevo;

    public Auditoria() {}
}
```

### 3.5 SecurityUtil
```java
@Component
public class SecurityUtil {

    public static String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return "ANONYMOUS";
        return auth.getName();
    }

    public static String getCurrentIp() {
        // Obtener del request context (ServletRequestAttributes)
        RequestAttributes attrs = RequestContextHolder.getRequestAttributes();
        if (attrs instanceof ServletRequestAttributes servlet) {
            return servlet.getRequest().getRemoteAddr();
        }
        return "UNKNOWN";
    }

    public static String getCurrentHostname() {
        try {
            return InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            return "UNKNOWN";
        }
    }
}
```

---

## 4. CONTROLADOR DE AUDITORÍA

```java
@RestController
@RequestMapping("/api/auditoria")
@PreAuthorize("hasRole('ADMIN')")
public class AuditoriaController {

    private final AuditoriaService auditoriaService;

    public AuditoriaController(AuditoriaService auditoriaService) {
        this.auditoriaService = auditoriaService;
    }

    @GetMapping
    public ResponseEntity<Page<AuditoriaResponse>> consultar(
            @RequestParam(required = false) String modulo,
            @RequestParam(required = false) String accion,
            @RequestParam(required = false) LocalDate desde,
            @RequestParam(required = false) LocalDate hasta,
            @PageableDefault(size = 20, sort = "fecha,desc") Pageable pageable) {
        return ResponseEntity.ok(
            auditoriaService.consultar(modulo, accion, desde, hasta, pageable)
        );
    }

    @GetMapping("/modulos")
    public ResponseEntity<List<String>> listarModulos() {
        return ResponseEntity.ok(auditoriaService.listarModulos());
    }
}
```

### DTOs
```java
public class AuditoriaResponse {
    private Long id;
    private String usuario;
    private LocalDate fecha;
    private LocalTime hora;
    private String equipo;
    private String ip;
    private String modulo;
    private String accion;
    private Long registroId;
    private Map<String, Object> valorAnterior;  // JSON parseado
    private Map<String, Object> valorNuevo;     // JSON parseado
}
```

---

## 5. INTEGRACIÓN CON ENTIDADES

### 5.1 Opción 1: Clase Base (Recomendado para nuevas entidades)
```java
@Entity
@Table(name = "candidatos")
public class Candidato extends BaseEntity {
    // Campos de negocio
    // Auditoría automática vía BaseEntity

    @Override
    public String getModulo() {
        return "CANDIDATOS";
    }
}
```

### 5.2 Opción 2: Anotación Personalizada (Para entidades existentes)
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Auditable {
    String modulo();
}

// AOP Aspect
@Aspect
@Component
public class AuditoriaAspect {

    @AfterReturning(pointcut = "@annotation(auditable)", returning = "result")
    public void auditar(JoinPoint joinPoint, Auditable auditable, Object result) {
        // Registrar auditoría basada en el método, parámetros y resultado
    }
}

// Uso
@Service
public class EleccionService {

    @Auditable(modulo = "ELECCIONES")
    public EleccionResponse crear(EleccionRequest request) { ... }
}
```

### 5.3 Opción 3: Manual (Para casos especiales)
```java
@Service
public class CandidatoService {

    private final AuditoriaService auditoriaService;

    @Transactional
    public CandidatoResponse crear(CandidatoRequest request) {
        // Validar
        // Guardar
        // Auditar manualmente
        auditoriaService.registrar(
            "CANDIDATOS", "CREATE", candidato.getId(),
            null, toJson(candidato)
        );
        return toResponse(candidato);
    }
}
```

---

## 6. FRONTEND — PANTALLA DE AUDITORÍA

```html
<div class="container-fluid p-4">
  <h4>Auditoría del Sistema</h4>

  <!-- Filtros -->
  <div class="row mb-3">
    <div class="col-md-3">
      <label>Módulo</label>
      <select class="form-select" [(ngModel)]="filtroModulo">
        <option value="">Todos</option>
        <option *ngFor="let m of modulos" [value]="m">{{ m }}</option>
      </select>
    </div>
    <div class="col-md-2">
      <label>Acción</label>
      <select class="form-select" [(ngModel)]="filtroAccion">
        <option value="">Todas</option>
        <option value="CREATE">Creación</option>
        <option value="UPDATE">Actualización</option>
        <option value="DELETE">Eliminación</option>
      </select>
    </div>
    <div class="col-md-2">
      <label>Desde</label>
      <input type="date" class="form-control" [(ngModel)]="filtroDesde">
    </div>
    <div class="col-md-2">
      <label>Hasta</label>
      <input type="date" class="form-control" [(ngModel)]="filtroHasta">
    </div>
    <div class="col-md-3 d-flex align-items-end">
      <button class="btn btn-primary me-2" (click)="consultar()">
        <i class="bi bi-search"></i> Consultar
      </button>
      <button class="btn btn-secondary" (click)="limpiarFiltros()">
        <i class="bi bi-x-circle"></i> Limpiar
      </button>
    </div>
  </div>

  <!-- Tabla de auditoría -->
  <div class="table-responsive">
    <table class="table table-sm table-striped">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Usuario</th>
          <th>Módulo</th>
          <th>Acción</th>
          <th>Registro</th>
          <th>IP</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of auditoria">
          <td>{{ item.fecha }}</td>
          <td>{{ item.hora }}</td>
          <td>{{ item.usuario }}</td>
          <td><span class="badge bg-info">{{ item.modulo }}</span></td>
          <td>
            <span class="badge" [ngClass]="{
              'bg-success': item.accion === 'CREATE',
              'bg-warning': item.accion === 'UPDATE',
              'bg-danger': item.accion === 'DELETE'
            }">{{ item.accion }}</span>
          </td>
          <td>{{ item.registroId }}</td>
          <td><small>{{ item.ip }}</small></td>
          <td>
            <button class="btn btn-sm btn-outline-secondary" (click)="verDetalle(item)">
              <i class="bi bi-eye"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## 7. MODIFICACIONES PLANIFICADAS

### Para la Fase 2 (mejora del módulo de auditoría):
1. **Automatizar registro vía AOP** — una sola anotación por método
2. **Captura de diff inteligente** — comparar valores antes/después para UPDATE
3. **Historial por registro** — endpoint GET /api/auditoria/registro/{modulo}/{id}
4. **Exportación de auditoría** — PDF/Excel del historial
5. **Retención configurable** — política de limpieza de registros antiguos
6. **Firma digital** — hash de cada registro para integridad
7. **Notificaciones** — alertar sobre operaciones sensibles (eliminar, reabrir acta)
