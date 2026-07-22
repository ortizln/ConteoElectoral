# 13 — ESTÁNDARES DE UI/UX

> Estándares de diseño de interfaz de usuario y experiencia de usuario para el ERP Electoral.

---

## 1. PRINCIPIOS DE DISEÑO

- **Intuitivo** — el usuario sabe qué hacer sin instrucciones
- **Consistente** — mismos patrones en todas las pantallas
- **Responsive** — funciona en móvil, tablet y desktop
- **Accesible** — contraste suficiente, etiquetas, roles ARIA
- **Feedback** — confirmación visual para cada acción del usuario
- **Prevención de errores** — confirmar acciones destructivas
- **Rendimiento percibido** — loading states inmediatos

---

## 2. PALETA DE COLORES

### 2.1 Colores Principales
| Color | Código Hex | Uso |
|-------|-----------|-----|
| Primary | `#0d6efd` | Botones principales, links, headers |
| Secondary | `#6c757d` | Botones secundarios, texto secundario |
| Success | `#198754` | Acciones exitosas, CREATE |
| Warning | `#ffc107` | Advertencias, UPDATE |
| Danger | `#dc3545` | Errores, DELETE, cancelar |
| Info | `#0dcaf0` | Información, badges |
| Dark | `#212529` | Texto principal, headers |
| Light | `#f8f9fa` | Fondos alternos |

### 2.2 Colores Electorales (Partidos Políticos)
Los colores de los partidos políticos son configurables (#RRGGBB) y se muestran como badges/círculos en listados y papeletas.

---

## 3. TIPOGRAFÍA

| Elemento | Font | Tamaño | Peso |
|----------|------|--------|------|
| Título página | System UI | 1.5rem (24px) | 600 |
| Subtítulo | System UI | 1.25rem (20px) | 500 |
| Texto cuerpo | System UI | 1rem (16px) | 400 |
| Texto pequeño | System UI | 0.875rem (14px) | 400 |
| Badge/Tag | System UI | 0.75rem (12px) | 600 |
| Tablas | System UI | 0.875rem (14px) | 400 |

---

## 4. COMPONENTES UI

### 4.1 Layout General (Admin)
```
┌─────────────────────────────────────────────────────────────┐
│ Navbar Superior (logo, usuario, cerrar sesión)              │
├──────────┬──────────────────────────────────────────────────┤
│ Sidebar  │  Contenido Principal                             │
│ (menú    │                                                  │
│  vertical│  ┌──────────────────────────────────────────────┐ │
│  por rol)│  │ Header: Título + Botón "Nuevo"              │ │
│          │  ├──────────────────────────────────────────────┤ │
│          │  │ Search Bar                                   │ │
│          │  ├──────────────────────────────────────────────┤ │
│          │  │ Tabla (responsive, stripe, hover)            │ │
│          │  │                                              │ │
│          │  │ Paginación                                   │ │
│          │  └──────────────────────────────────────────────┘ │
└──────────┴──────────────────────────────────────────────────┘
```

### 4.2 Sidebar Dinámico
- Colapsable en móvil (menú hamburguesa)
- Agrupado por módulos (Geografia, Electoral, Administración)
- Icono Bootstrap + texto
- Resalta el módulo activo
- Filtrado por rol del usuario

### 4.3 Tablas
- **Responsive**: `table-responsive` de Bootstrap
- **Striped**: filas alternadas para mejorar legibilidad
- **Hover**: resaltar fila al pasar el mouse
- **Header fijo**: `thead-dark`
- **Acciones**: últimos botones (editar, eliminar, ver)
- **Estado vacío**: mensaje claro cuando no hay datos
- **Loading**: spinner mientras carga

### 4.4 Formularios
- Una columna en móvil, dos en desktop
- Labels arriba del input
- Validación inline (mensaje de error debajo del campo)
- Botón de submit deshabilitado mientras el formulario es inválido
- Botón de cancelar/cerrar modal
- Loading state en botón submit

### 4.5 Modales
- Header con título + botón cerrar (X)
- Body con formulario o contenido
- Footer con botones (Guardar + Cancelar)
- Tamaño: modal-md por defecto, modal-lg para formularios largos
- Cerrar al hacer clic fuera (opcional)
- No cerrar si hay cambios sin guardar

### 4.6 Badges / Tags
| Contexto | Clase Bootstrap | Ejemplo |
|----------|----------------|---------|
| Estado activo | `bg-success` | ACTIVO |
| Estado inactivo | `bg-secondary` | INACTIVO |
| Tipo de votación | `bg-info` | INDIVIDUAL |
| Circunscripción | `bg-primary` | NACIONAL |
| Tipo candidato | `bg-warning text-dark` | PRINCIPAL |
| Acción CREATE | `bg-success` | CREAR |
| Acción UPDATE | `bg-warning text-dark` | ACTUALIZAR |
| Acción DELETE | `bg-danger` | ELIMINAR |

---

## 5. PATRONES DE INTERACCIÓN

### 5.1 Confirmación de Acciones Destructivas
```html
<!-- Modal de confirmación -->
<div class="modal-header bg-danger text-white">
  <h5 class="modal-title">Confirmar Eliminación</h5>
</div>
<div class="modal-body">
  <p>¿Está seguro de eliminar a <strong>{{ item.nombre }}</strong>?</p>
  <p class="text-danger"><small>Esta acción no se puede deshacer.</small></p>
</div>
<div class="modal-footer">
  <button class="btn btn-secondary" (click)="cancel()">Cancelar</button>
  <button class="btn btn-danger" (click)="confirm()">
    <i class="bi bi-trash"></i> Eliminar
  </button>
</div>
```

### 5.2 Notificaciones (Toast)
```html
<!-- Toast de éxito -->
<div class="toast align-items-center text-bg-success border-0">
  <div class="d-flex">
    <div class="toast-body">Candidato creado exitosamente</div>
    <button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
  </div>
</div>

<!-- Toast de error -->
<div class="toast align-items-center text-bg-danger border-0">
  <div class="d-flex">
    <div class="toast-body">Error al guardar: el nombre es obligatorio</div>
    <button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
  </div>
</div>
```

### 5.3 Loading States
```html
<!-- Spinner en botón -->
<button class="btn btn-primary" [disabled]="isLoading">
  <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2"></span>
  {{ isLoading ? 'Guardando...' : 'Guardar' }}
</button>

<!-- Skeleton loader para tabla -->
<div *ngIf="isLoading" class="placeholder-glow">
  <div *ngFor="let _ of [1,2,3,4,5]" class="placeholder col-12 mb-2" style="height: 40px"></div>
</div>
```

---

## 6. RESPONSIVE DESIGN

### 6.1 Breakpoints
| Dispositivo | Ancho | Comportamiento |
|-------------|-------|----------------|
| Móvil | < 576px | Sidebar colapsado, tabla scroll horizontal, 1 columna |
| Tablet | 576-768px | Sidebar colapsado, tabla normal, 2 columnas |
| Desktop | 768-1200px | Sidebar visible, tabla completa, 2-3 columnas |
| Wide | > 1200px | Sidebar visible, tabla completa, 3-4 columnas |

### 6.2 Grid System
```html
<!-- Móvil: 1 columna, Desktop: 2 columnas -->
<div class="row">
  <div class="col-12 col-md-6">
    <label class="form-label">Nombres</label>
    <input class="form-control" formControlName="nombres">
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label">Apellidos</label>
    <input class="form-control" formControlName="apellidos">
  </div>
</div>
```

---

## 7. ESTADOS DE PANTALLA

Toda pantalla debe manejar estos estados:

| Estado | Qué mostrar |
|--------|-------------|
| **Loading** | Spinner o skeleton mientras carga datos iniciales |
| **Empty** | Mensaje claro + icono + acción (ej: "No hay candidatos. Cree el primer candidato.") |
| **Error** | Mensaje de error + botón reintentar |
| **Success** | Datos cargados correctamente |
| **No permissions** | Mensaje de acceso denegado |

### Ejemplo Empty State
```html
<div class="text-center py-5">
  <i class="bi bi-people fs-1 text-muted"></i>
  <h5 class="mt-3 text-muted">No hay candidatos registrados</h5>
  <p class="text-muted">Cree el primer candidato para esta elección.</p>
  <button class="btn btn-primary" (click)="openCreateModal()">
    <i class="bi bi-plus-lg"></i> Nuevo Candidato
  </button>
</div>
```

---

## 8. MENSAJES AL USUARIO

| Situación | Mensaje |
|-----------|---------|
| Guardar exitoso | "Registro guardado exitosamente" |
| Actualizar exitoso | "Registro actualizado exitosamente" |
| Eliminar exitoso | "Registro eliminado exitosamente" |
| Error de red | "Error de conexión. Verifique su conexión a internet." |
| Error de validación | Lista de campos con errores |
| Sin permisos | "No tiene permisos para realizar esta acción" |
| Sesión expirada | "Su sesión ha expirado. Inicie sesión nuevamente." |
| Confirmación eliminar | "¿Está seguro de eliminar [nombre]? Esta acción no se puede deshacer." |
| Confirmación cerrar acta | "¿Está seguro de cerrar el acta? No podrá registrar más votos." |

---

## 9. DASHBOARD — DISEÑO

### 9.1 Layout del Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│ Filtros: [Zona ▼] [Provincia ▼] [Cantón ▼] [Cargo ▼]       │
├──────────┬──────────┬──────────┬────────────────────────────┤
│ Tarjeta  │ Tarjeta  │ Tarjeta  │ Tarjeta                   │
│ Mesas    │ Votos    │ Particip | Blancos                   │
├──────────┴──────────┴──────────┴────────────────────────────┤
│ Gráfico de barras (Chart.js)                                │
│ Resultados por candidato                                    │
├─────────────────────────────────────────────────────────────┤
│ Mapa geográfico (futuro)                                    │
├─────────────────────────────────────────────────────────────┤
│ Tabla detallada de resultados                               │
│ [Candidato] [Partido] [Votos] [%]                           │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Tarjetas de Estadísticas
```html
<div class="card border-0 shadow-sm">
  <div class="card-body">
    <div class="d-flex justify-content-between">
      <div>
        <h6 class="text-muted mb-1">Total Votos</h6>
        <h3 class="fw-bold mb-0">{{ dashboard.totalVotos | number }}</h3>
      </div>
      <div class="rounded-circle bg-primary bg-opacity-10 p-3">
        <i class="bi bi-balloon-heart text-primary fs-4"></i>
      </div>
    </div>
    <small class="text-success">{{ dashboard.participacion }}% participación</small>
  </div>
</div>
```

---

## 10. ACCESIBILIDAD

| Práctica | Implementación |
|----------|---------------|
| **Contraste** | Relación de contraste mínima 4.5:1 (texto normal), 3:1 (texto grande) |
| **Labels** | `<label for="campo">` en todos los inputs |
| **ARIA roles** | `role="alert"` en errores, `role="dialog"` en modales |
| **Focus** | Orden de tabulación lógico, focus visible |
| **Alt text** | `alt` descriptivo en todas las imágenes |
| **Keyboard** | Todas las acciones accesibles por teclado (Enter, Escape, Tab) |
| **Screen reader** | `aria-label` en iconos sin texto |
| **Touch targets** | Mínimo 44x44px para elementos interactivos |
