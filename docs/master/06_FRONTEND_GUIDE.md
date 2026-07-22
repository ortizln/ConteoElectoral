# 06 — GUÍA DE DESARROLLO FRONTEND (ANGULAR)

> Estándares, patrones y buenas prácticas para el desarrollo del frontend web del ERP Electoral.

---

## 1. STACK TECNOLÓGICO

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Angular | 17.3+ | Framework |
| TypeScript | 5.x | Lenguaje |
| Bootstrap | 5.2.3 | CSS Framework |
| Bootstrap Icons | 1.11.x | Iconografía |
| Chart.js | 4.4.x | Gráficos dashboard |
| STOMP.js | 2.x | WebSocket client |
| SockJS | 1.x | WebSocket fallback |
| xlsx | 0.18.x | Importación Excel |

---

## 2. ESTRUCTURA DEL PROYECTO

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts         ← Login/logout, token management
│   │   │   │   ├── api.service.ts          ← HTTP base (get/post/put/delete)
│   │   │   │   └── websocket.service.ts    ← STOMP connection
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts           ← Requiere autenticación
│   │   │   │   └── role.guard.ts           ← Requiere rol específico
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts     ← Agrega JWT a headers
│   │   │   │   └── error.interceptor.ts    ← Manejo global de errores
│   │   │   └── models/
│   │   │       ├── user.model.ts
│   │   │       └── response.model.ts       ← Page<T>, ErrorResponse
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── modal.component.ts      ← Modal reutilizable
│   │   │   │   ├── search-bar.component.ts ← Input de búsqueda
│   │   │   │   └── loading-spinner.component.ts
│   │   │   ├── pipes/
│   │   │   │   └── filter.pipe.ts
│   │   │   └── directives/
│   │   │       └── has-role.directive.ts   ← Muestra/oculta por rol
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── login.component.ts
│   │   │   │   └── login.component.html
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── admin-layout/
│   │   │   │   │   ├── admin-layout.component.ts  ← Sidebar + router-outlet
│   │   │   │   │   └── admin-layout.component.html
│   │   │   │   ├── elecciones/
│   │   │   │   │   ├── elecciones.component.ts
│   │   │   │   │   ├── elecciones.component.html
│   │   │   │   │   └── elecciones.service.ts
│   │   │   │   ├── candidatos/
│   │   │   │   │   └── ...
│   │   │   │   ├── mesas/
│   │   │   │   │   └── ...
│   │   │   │   └── configuracion/
│   │   │   │       └── ...
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.service.ts
│   │   │   │
│   │   │   └── mesa/
│   │   │       ├── mesa-votacion/
│   │   │       │   ├── mesa-votacion.component.ts
│   │   │       │   ├── mesa-votacion.component.html
│   │   │       │   └── mesa-votacion.service.ts
│   │   │       └── mesa-papeleta/
│   │   │           └── ...
│   │   │
│   │   └── app.routes.ts                 ← Rutas principales
│   │   └── app.config.ts                 ← providers, app initializer
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── manual/
│   │
│   └── environments/
│       ├── environment.ts                ← Desarrollo
│       └── environment.prod.ts           ← Producción
```

---

## 3. COMPONENTES STANDALONE

### 3.1 Estructura Base
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidatos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './candidatos.component.html',
})
export class CandidatosComponent implements OnInit {
  // ...
}
```

### 3.2 Patrón General de Componente CRUD
```typescript
export abstract class BaseCrudComponent<T, R> implements OnInit {

  items: T[] = [];
  itemForm!: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  isLoading = false;
  searchTerm = '';
  currentPage = 0;
  pageSize = 20;
  totalItems = 0;

  constructor(
    protected fb: FormBuilder,
    protected service: BaseService<T, R>,
    protected modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.initForm();
  }

  abstract initForm(): void;

  loadItems(): void {
    this.isLoading = true;
    this.service.listar(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (page) => {
          this.items = page.content;
          this.totalItems = page.totalElements;
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.editingId = null;
    this.itemForm.reset();
    this.modalService.open();
  }

  openEditModal(item: T): void {
    this.isEditing = true;
    this.editingId = item['id'];
    this.itemForm.patchValue(item);
    this.modalService.open();
  }

  save(): void {
    if (this.itemForm.invalid) return;
    const data = this.itemForm.value;
    const obs = this.isEditing
      ? this.service.actualizar(this.editingId!, data)
      : this.service.crear(data);
    obs.subscribe(() => {
      this.modalService.close();
      this.loadItems();
    });
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.service.eliminar(id).subscribe(() => this.loadItems());
    }
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 0;
    this.loadItems();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadItems();
  }
}
```

---

## 4. SERVICIOS — ESTÁNDARES

```typescript
@Injectable({ providedIn: 'root' })
export class CandidatoService {

  private readonly API = `${environment.apiUrl}/candidatos`;

  constructor(private http: HttpClient) {}

  listar(page: number = 0, size: number = 20, search?: string): Observable<Page<CandidatoResponse>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (search) params = params.set('search', search);
    return this.http.get<Page<CandidatoResponse>>(this.API, { params });
  }

  obtener(id: number): Observable<CandidatoResponse> {
    return this.http.get<CandidatoResponse>(`${this.API}/${id}`);
  }

  crear(data: CandidatoRequest): Observable<CandidatoResponse> {
    return this.http.post<CandidatoResponse>(this.API, data);
  }

  actualizar(id: number, data: CandidatoRequest): Observable<CandidatoResponse> {
    return this.http.put<CandidatoResponse>(`${this.API}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  exportarExcel(eleccionId?: number): Observable<Blob> {
    let params = new HttpParams();
    if (eleccionId) params = params.set('eleccionId', eleccionId);
    return this.http.get(`${this.API}/export/excel`, {
      params, responseType: 'blob'
    });
  }
}
```

### Modelos
```typescript
export interface Page<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

export interface CandidatoResponse {
  id: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  tipo: string;
  ordenEnLista: number;
  partidoNombre: string;
  cargoNombre: string;
  activo: boolean;
}

export interface CandidatoRequest {
  eleccionId: number;
  partidoId: number;
  cargoId: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  tipo: string;
  ordenEnLista?: number;
}
```

---

## 5. GUARDS E INTERCEPTORS

### Auth Guard
```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
```

### Role Guard
```typescript
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];
    if (!requiredRoles || requiredRoles.length === 0) return true;
    if (requiredRoles.some(r => this.authService.hasRole(r))) return true;
    this.router.navigate(['/']);
    return false;
  }
}
```

### Auth Interceptor
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(req);
  }
}
```

### Error Interceptor
```typescript
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        const message = error.error?.message || 'Error inesperado';
        // Mostrar notificación
        return throwError(() => error);
      })
    );
  }
}
```

---

## 6. FORMULARIOS REACTIVOS

```typescript
// Componente
initForm(): void {
  this.itemForm = this.fb.group({
    nombres: ['', [Validators.required, Validators.maxLength(255)]],
    apellidos: ['', [Validators.required, Validators.maxLength(255)]],
    cedula: ['', [Validators.required, Validators.pattern('\\d{10}')]],
    partidoId: ['', Validators.required],
    cargoId: ['', Validators.required],
    tipo: ['PRINCIPAL', Validators.required],
    ordenEnLista: [0],
  });
}
```

```html
<!-- Template -->
<form [formGroup]="itemForm" (ngSubmit)="save()">
  <div class="mb-3">
    <label class="form-label">Nombres</label>
    <input type="text" class="form-control" formControlName="nombres"
           [class.is-invalid]="itemForm.get('nombres')?.invalid && itemForm.get('nombres')?.touched">
    <div class="invalid-feedback" *ngIf="itemForm.get('nombres')?.errors?.['required']">
      Los nombres son obligatorios
    </div>
  </div>
  <!-- Más campos -->
  <button type="submit" class="btn btn-primary" [disabled]="itemForm.invalid">
    {{ isEditing ? 'Actualizar' : 'Crear' }}
  </button>
</form>
```

---

## 7. WEB COMPONENTE — PATRÓN TABLE + CRUD

```html
<div class="container-fluid p-4">
  <!-- Header -->
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h4 class="mb-0">Candidatos</h4>
    <button class="btn btn-primary" (click)="openCreateModal()">
      <i class="bi bi-plus-lg"></i> Nuevo
    </button>
  </div>

  <!-- Search -->
  <app-search-bar (search)="onSearch($event)" placeholder="Buscar candidatos..."></app-search-bar>

  <!-- Loading -->
  <app-loading-spinner *ngIf="isLoading"></app-loading-spinner>

  <!-- Table -->
  <div class="table-responsive" *ngIf="!isLoading">
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Cédula</th>
          <th>Partido</th>
          <th>Cargo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items; trackBy: trackById">
          <td>{{ item.nombres }}</td>
          <td>{{ item.apellidos }}</td>
          <td>{{ item.cedula }}</td>
          <td><span class="badge" [style.background]="item.colorHex">{{ item.partidoNombre }}</span></td>
          <td>{{ item.cargoNombre }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-1" (click)="openEditModal(item)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-danger" (click)="delete(item.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
        <tr *ngIf="items.length === 0">
          <td colspan="6" class="text-center py-4">No se encontraron candidatos</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <nav *ngIf="totalItems > pageSize">
    <ul class="pagination justify-content-center">
      <li class="page-item" [class.disabled]="currentPage === 0">
        <a class="page-link" (click)="onPageChange(currentPage - 1)">Anterior</a>
      </li>
      <li class="page-item" [class.disabled]="(currentPage + 1) * pageSize >= totalItems">
        <a class="page-link" (click)="onPageChange(currentPage + 1)">Siguiente</a>
      </li>
    </ul>
  </nav>
</div>
```

---

## 8. DASHBOARD — CHART.JS + WEBSOCKET

```typescript
@ViewChild('resultadosChart') resultadosChart!: ElementRef<HTMLCanvasElement>;
private chart!: Chart;

ngAfterViewInit(): void {
  this.initChart();
  this.connectWebSocket();
}

initChart(): void {
  this.chart = new Chart(this.resultadosChart.nativeElement, {
    type: 'bar',
    data: {
      labels: this.candidatos.map(c => c.nombres),
      datasets: [{
        label: 'Votos',
        data: this.candidatos.map(c => c.totalVotos),
        backgroundColor: this.candidatos.map(c => c.colorHex),
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

connectWebSocket(): void {
  this.wsService.connect(this.eleccionId, (data) => {
    this.candidatos = data.candidatos;
    this.chart.data.datasets[0].data = this.candidatos.map(c => c.totalVotos);
    this.chart.update('none'); // Actualización suave
  });
}
```

---

## 9. RUTAS — CONFIGURACIÓN

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'zonas', loadComponent: () => import('./features/admin/zonas/zonas.component').then(m => m.ZonasComponent), canActivate: [RoleGuard], data: { roles: ['ADMIN'] }},
    { path: 'provincias', loadComponent: () => import('./features/admin/provincias/provincias.component').then(m => m.ProvinciasComponent) },
    { path: 'cantones', ... },
    { path: 'parroquias', ... },
    { path: 'instituciones', ... },
    { path: 'elecciones', ... },
    { path: 'partidos', ... },
    { path: 'cargos', ... },
    { path: 'candidatos', ... },
    { path: 'listas-electorales', ... },
    { path: 'papeletas', ... },
    { path: 'mesas', ... },
    { path: 'asignar-mesas', ... },
    { path: 'tipos-eleccion', ... },
    { path: 'configuracion', ... },
    { path: '', redirectTo: 'elecciones', pathMatch: 'full' }
  ]},

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SUPERVISOR'] }},
  { path: 'mesa', component: MesaVotacionComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'SUPERVISOR', 'MIEMBRO_MESA'] }},
  { path: 'mesa/papeletas', component: MesaVotacionPapeletaComponent, ... },

  { path: '**', redirectTo: '/login' }
];
```

---

## 10. BUENAS PRÁCTICAS

| Práctica | Descripción |
|----------|-------------|
| **OnPush** | Usar ChangeDetectionStrategy.OnPush en componentes |
| **TrackBy** | Siempre usar `trackBy` en *ngFor |
| **Async pipe** | Usar `| async` en templates, no subscribe manual |
| **Unsubscribe** | Usar `takeUntilDestroy` o `takeUntil` con Subject |
| **Lazy loading** | Todas las rutas hijas con `loadComponent` |
| **Signals** | Preferir Signals sobre Zone.js para estado local |
| **Standalone** | Sin NgModules, todo standalone |
| **Reactive forms** | Siempre formularios reactivos, no template-driven |
| **Responsive** | Bootstrap grid + media queries |
| **Loading** | Spinner/skeleton mientras carga datos |
| **Confirmación** | Confirmar antes de eliminar, cerrar acta, etc. |
| **Errores** | Mostrar mensajes amigables, no códigos HTTP |
