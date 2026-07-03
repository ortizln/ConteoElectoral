import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'admin', 
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'SUPERVISOR'] },
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { 
    path: 'dashboard', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/shared/layouts/content-layout.component').then(m => m.ContentLayoutComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      }
    ]
  },
  { 
    path: 'mesa', 
    canActivate: [authGuard, roleGuard],
    data: { roles: ['MIEMBRO_MESA', 'ADMIN', 'SUPERVISOR'] },
    loadComponent: () => import('./features/shared/layouts/content-layout.component').then(m => m.ContentLayoutComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./features/mesa/mesa-votacion/mesa-votacion.component').then(m => m.MesaVotacionComponent) 
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
