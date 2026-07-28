import "./chunk-H4MYKVU2.js";

// src/app/features/admin/admin.routes.ts
var ADMIN_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-3TA5YZLS.js").then((m) => m.AdminLayoutComponent),
    children: [
      { path: "", redirectTo: "elecciones", pathMatch: "full" },
      {
        path: "zonas",
        loadComponent: () => import("./chunk-ESGAEDO4.js").then((m) => m.ZonasComponent)
      },
      {
        path: "provincias",
        loadComponent: () => import("./chunk-BXRHEXXT.js").then((m) => m.ProvinciasComponent)
      },
      {
        path: "cantones",
        loadComponent: () => import("./chunk-JK2BVHCB.js").then((m) => m.CantonesComponent)
      },
      {
        path: "parroquias",
        loadComponent: () => import("./chunk-2NF6UQ2R.js").then((m) => m.ParroquiasComponent)
      },
      {
        path: "instituciones",
        loadComponent: () => import("./chunk-NCCET45C.js").then((m) => m.InstitucionesComponent)
      },
      {
        path: "elecciones",
        loadComponent: () => import("./chunk-ZW7TEA4M.js").then((m) => m.EleccionesComponent)
      },
      {
        path: "partidos",
        loadComponent: () => import("./chunk-IRGSCVL4.js").then((m) => m.PartidosComponent)
      },
      {
        path: "cargos",
        loadComponent: () => import("./chunk-CTFFCUF6.js").then((m) => m.CargosComponent)
      },
      {
        path: "candidatos",
        loadComponent: () => import("./chunk-JXVME7F7.js").then((m) => m.CandidatosComponent)
      },
      {
        path: "mesas",
        loadComponent: () => import("./chunk-GWD5IWUS.js").then((m) => m.MesasComponent)
      },
      {
        path: "asignar-mesas",
        loadComponent: () => import("./chunk-DQJZHLTJ.js").then((m) => m.AsignarMesasComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-W7CRLSO3.js").then((m) => m.ConfiguracionComponent)
      },
      {
        path: "tipos-eleccion",
        loadComponent: () => import("./chunk-QHJDHK2W.js").then((m) => m.TiposEleccionComponent)
      },
      {
        path: "listas-electorales",
        loadComponent: () => import("./chunk-TKUA22VL.js").then((m) => m.ListasElectoralesComponent)
      },
      {
        path: "papeletas",
        loadComponent: () => import("./chunk-3FA6WCQF.js").then((m) => m.PapeletasComponent)
      },
      {
        path: "reglas-negocio",
        loadComponent: () => import("./chunk-PYOUM6FV.js").then((m) => m.ReglasNegocioComponent)
      },
      {
        path: "circunscripciones",
        loadComponent: () => import("./chunk-44CWHLD3.js").then((m) => m.CircunscripcionesComponent)
      },
      {
        path: "escrutinio",
        loadComponent: () => import("./chunk-XW2352HB.js").then((m) => m.EscrutinioComponent)
      },
      {
        path: "dashboard-geografico",
        loadComponent: () => import("./chunk-KJXARPVY.js").then((m) => m.DashboardGeograficoComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-7MN5DFA4.js").then((m) => m.ReportesComponent)
      },
      {
        path: "usuarios",
        loadComponent: () => import("./chunk-AKTN3BM3.js").then((m) => m.UsuariosComponent)
      },
      {
        path: "roles",
        loadComponent: () => import("./chunk-XJPCM22O.js").then((m) => m.RolesComponent)
      }
    ]
  }
];
export {
  ADMIN_ROUTES
};
