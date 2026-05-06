import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'zonas', pathMatch: 'full' },
      { 
        path: 'zonas', 
        loadComponent: () => import('./pages/zonas/zonas.component').then(m => m.ZonasComponent) 
      },
      { 
        path: 'provincias', 
        loadComponent: () => import('./pages/provincias/provincias.component').then(m => m.ProvinciasComponent) 
      },
      { 
        path: 'cantones', 
        loadComponent: () => import('./pages/cantones/cantones.component').then(m => m.CantonesComponent) 
      },
      { 
        path: 'parroquias', 
        loadComponent: () => import('./pages/parroquias/parroquias.component').then(m => m.ParroquiasComponent) 
      },
      { 
        path: 'instituciones', 
        loadComponent: () => import('./pages/instituciones/instituciones.component').then(m => m.InstitucionesComponent) 
      },
      { 
        path: 'elecciones', 
        loadComponent: () => import('./pages/elecciones/elecciones.component').then(m => m.EleccionesComponent) 
      },
      { 
        path: 'partidos', 
        loadComponent: () => import('./pages/partidos/partidos.component').then(m => m.PartidosComponent) 
      },
      { 
        path: 'cargos', 
        loadComponent: () => import('./pages/cargos/cargos.component').then(m => m.CargosComponent) 
      },
      { 
        path: 'candidatos', 
        loadComponent: () => import('./pages/candidatos/candidatos.component').then(m => m.CandidatosComponent) 
      },
      { 
        path: 'recintos', 
        loadComponent: () => import('./pages/recintos/recintos.component').then(m => m.RecintosComponent) 
      },
      { 
        path: 'mesas', 
        loadComponent: () => import('./pages/mesas/mesas.component').then(m => m.MesasComponent) 
      },
      { 
        path: 'usuarios', 
        loadComponent: () => import('./pages/usuarios/usuarios.component').then(m => m.UsuariosComponent) 
      },
      { 
        path: 'asignar-mesas', 
        loadComponent: () => import('./pages/asignar-mesas/asignar-mesas.component').then(m => m.AsignarMesasComponent) 
      }
    ]
  }
];