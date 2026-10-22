import "./chunk-ASLTLD6L.js";

// src/app/features/admin/admin.routes.ts
var ADMIN_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-V6FL5DID.js").then((m) => m.AdminLayoutComponent),
    children: [
      { path: "", redirectTo: "elecciones", pathMatch: "full" },
      {
        path: "zonas",
        loadComponent: () => import("./chunk-HS3ZOSNG.js").then((m) => m.ZonasComponent)
      },
      {
        path: "provincias",
        loadComponent: () => import("./chunk-25SFEVQD.js").then((m) => m.ProvinciasComponent)
      },
      {
        path: "cantones",
        loadComponent: () => import("./chunk-ISFKD2X4.js").then((m) => m.CantonesComponent)
      },
      {
        path: "parroquias",
        loadComponent: () => import("./chunk-MDONMHTY.js").then((m) => m.ParroquiasComponent)
      },
      {
        path: "instituciones",
        loadComponent: () => import("./chunk-ZBWONK4U.js").then((m) => m.InstitucionesComponent)
      },
      {
        path: "elecciones",
        loadComponent: () => import("./chunk-7I4NMNOD.js").then((m) => m.EleccionesComponent)
      },
      {
        path: "partidos",
        loadComponent: () => import("./chunk-CIXWAUDZ.js").then((m) => m.PartidosComponent)
      },
      {
        path: "cargos",
        loadComponent: () => import("./chunk-JIN4QC4K.js").then((m) => m.CargosComponent)
      },
      {
        path: "candidatos",
        loadComponent: () => import("./chunk-P3B3QYBK.js").then((m) => m.CandidatosComponent)
      },
      {
        path: "mesas",
        loadComponent: () => import("./chunk-L77PLDDN.js").then((m) => m.MesasComponent)
      },
      {
        path: "asignar-mesas",
        loadComponent: () => import("./chunk-5OAHLZ2U.js").then((m) => m.AsignarMesasComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-CBS7FL5U.js").then((m) => m.ConfiguracionComponent)
      },
      {
        path: "tipos-eleccion",
        loadComponent: () => import("./chunk-FIULVJSE.js").then((m) => m.TiposEleccionComponent)
      },
      {
        path: "listas-electorales",
        loadComponent: () => import("./chunk-BEBNNMB4.js").then((m) => m.ListasElectoralesComponent)
      },
      {
        path: "papeletas",
        loadComponent: () => import("./chunk-M7UFF334.js").then((m) => m.PapeletasComponent)
      },
      {
        path: "reglas-negocio",
        loadComponent: () => import("./chunk-GZEAK3QH.js").then((m) => m.ReglasNegocioComponent)
      },
      {
        path: "circunscripciones",
        loadComponent: () => import("./chunk-75V5W3X7.js").then((m) => m.CircunscripcionesComponent)
      },
      {
        path: "escrutinio",
        loadComponent: () => import("./chunk-AGJKMPZP.js").then((m) => m.EscrutinioComponent)
      },
      {
        path: "dashboard-geografico",
        loadComponent: () => import("./chunk-XH4JXSYZ.js").then((m) => m.DashboardGeograficoComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-N4PQZLWD.js").then((m) => m.ReportesComponent)
      },
      {
        path: "usuarios",
        loadComponent: () => import("./chunk-C3Z5HK7F.js").then((m) => m.UsuariosComponent)
      },
      {
        path: "roles",
        loadComponent: () => import("./chunk-J6TZLKYM.js").then((m) => m.RolesComponent)
      }
    ]
  }
];
export {
  ADMIN_ROUTES
};
//# sourceMappingURL=chunk-UPUQE5E4.js.map
