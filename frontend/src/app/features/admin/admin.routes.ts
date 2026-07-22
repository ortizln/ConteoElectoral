import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'elecciones', pathMatch: 'full' },
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
        path: 'mesas', 
        loadComponent: () => import('./pages/mesas/mesas.component').then(m => m.MesasComponent) 
      },
      { 
        path: 'asignar-mesas', 
        loadComponent: () => import('./pages/asignar-mesas/asignar-mesas.component').then(m => m.AsignarMesasComponent) 
      },
      { 
        path: 'configuracion', 
        loadComponent: () => import('./pages/configuracion/configuracion.component').then(m => m.ConfiguracionComponent) 
      },
      { 
        path: 'tipos-eleccion', 
        loadComponent: () => import('./pages/tipos-eleccion/tipos-eleccion.component').then(m => m.TiposEleccionComponent) 
      },
      { 
        path: 'listas-electorales', 
        loadComponent: () => import('./pages/listas-electorales/listas-electorales.component').then(m => m.ListasElectoralesComponent) 
      },
      { 
        path: 'papeletas', 
        loadComponent: () => import('./pages/papeletas/papeletas.component').then(m => m.PapeletasComponent) 
      },
      { 
        path: 'reglas-negocio', 
        loadComponent: () => import('./pages/reglas-negocio/reglas-negocio.component').then(m => m.ReglasNegocioComponent) 
      },
      { 
        path: 'circunscripciones', 
        loadComponent: () => import('./pages/circunscripciones/circunscripciones.component').then(m => m.CircunscripcionesComponent) 
      },
      { 
        path: 'escrutinio', 
        loadComponent: () => import('./pages/escrutinio/escrutinio.component').then(m => m.EscrutinioComponent) 
      },
      { 
        path: 'dashboard-geografico', 
        loadComponent: () => import('./pages/dashboard-geografico/dashboard-geografico.component').then(m => m.DashboardGeograficoComponent) 
      },
      { 
        path: 'reportes', 
        loadComponent: () => import('./pages/reportes/reportes.component').then(m => m.ReportesComponent) 
      },
      { 
        path: 'usuarios', 
        loadComponent: () => import('./pages/usuarios/usuarios.component').then(m => m.UsuariosComponent) 
      },
      { 
        path: 'roles', 
        loadComponent: () => import('./pages/roles/roles.component').then(m => m.RolesComponent) 
      }
    ]
  }
];