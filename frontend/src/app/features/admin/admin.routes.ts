import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'elecciones', pathMatch: 'full' },
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
      }
    ]
  }
];