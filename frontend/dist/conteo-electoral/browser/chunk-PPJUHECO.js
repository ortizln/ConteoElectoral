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
        loadComponent: () => import("./chunk-JHMU24FW.js").then((m) => m.ZonasComponent)
      },
      {
        path: "provincias",
        loadComponent: () => import("./chunk-R75TOFKR.js").then((m) => m.ProvinciasComponent)
      },
      {
        path: "cantones",
        loadComponent: () => import("./chunk-7OZ4BITA.js").then((m) => m.CantonesComponent)
      },
      {
        path: "parroquias",
        loadComponent: () => import("./chunk-LVIM4I5M.js").then((m) => m.ParroquiasComponent)
      },
      {
        path: "instituciones",
        loadComponent: () => import("./chunk-5TQKBRUV.js").then((m) => m.InstitucionesComponent)
      },
      {
        path: "elecciones",
        loadComponent: () => import("./chunk-YLFNLEDN.js").then((m) => m.EleccionesComponent)
      },
      {
        path: "partidos",
        loadComponent: () => import("./chunk-MBYFZSCO.js").then((m) => m.PartidosComponent)
      },
      {
        path: "cargos",
        loadComponent: () => import("./chunk-6UNLZISS.js").then((m) => m.CargosComponent)
      },
      {
        path: "candidatos",
        loadComponent: () => import("./chunk-AQ2FGRRZ.js").then((m) => m.CandidatosComponent)
      },
      {
        path: "mesas",
        loadComponent: () => import("./chunk-ETRDKIA5.js").then((m) => m.MesasComponent)
      },
      {
        path: "asignar-mesas",
        loadComponent: () => import("./chunk-DT7HRK5A.js").then((m) => m.AsignarMesasComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-I2AS6CPN.js").then((m) => m.ConfiguracionComponent)
      },
      {
        path: "tipos-eleccion",
        loadComponent: () => import("./chunk-WXDT3H4G.js").then((m) => m.TiposEleccionComponent)
      },
      {
        path: "listas-electorales",
        loadComponent: () => import("./chunk-ZZN4IQAP.js").then((m) => m.ListasElectoralesComponent)
      },
      {
        path: "papeletas",
        loadComponent: () => import("./chunk-WKWKD2SQ.js").then((m) => m.PapeletasComponent)
      },
      {
        path: "reglas-negocio",
        loadComponent: () => import("./chunk-ZFGC6M5R.js").then((m) => m.ReglasNegocioComponent)
      },
      {
        path: "circunscripciones",
        loadComponent: () => import("./chunk-A2HFTRRP.js").then((m) => m.CircunscripcionesComponent)
      },
      {
        path: "escrutinio",
        loadComponent: () => import("./chunk-4HY5XQSR.js").then((m) => m.EscrutinioComponent)
      },
      {
        path: "dashboard-geografico",
        loadComponent: () => import("./chunk-O6EQ2PY4.js").then((m) => m.DashboardGeograficoComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-ICIKQDCR.js").then((m) => m.ReportesComponent)
      },
      {
        path: "usuarios",
        loadComponent: () => import("./chunk-ZNKSE6KU.js").then((m) => m.UsuariosComponent)
      },
      {
        path: "roles",
        loadComponent: () => import("./chunk-PAYYRM7L.js").then((m) => m.RolesComponent)
      }
    ]
  }
];
export {
  ADMIN_ROUTES
};
