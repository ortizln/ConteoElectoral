import "./chunk-ASLTLD6L.js";

// src/app/features/admin/admin.routes.ts
var ADMIN_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-T7MTEYPI.js").then((m) => m.AdminLayoutComponent),
    children: [
      { path: "", redirectTo: "elecciones", pathMatch: "full" },
      {
        path: "zonas",
        loadComponent: () => import("./chunk-O5QZ4ACT.js").then((m) => m.ZonasComponent)
      },
      {
        path: "provincias",
        loadComponent: () => import("./chunk-OLKLHLTV.js").then((m) => m.ProvinciasComponent)
      },
      {
        path: "cantones",
        loadComponent: () => import("./chunk-DQDBX476.js").then((m) => m.CantonesComponent)
      },
      {
        path: "parroquias",
        loadComponent: () => import("./chunk-RSEG3HY2.js").then((m) => m.ParroquiasComponent)
      },
      {
        path: "instituciones",
        loadComponent: () => import("./chunk-RWDB4P6O.js").then((m) => m.InstitucionesComponent)
      },
      {
        path: "elecciones",
        loadComponent: () => import("./chunk-CR6BCJDW.js").then((m) => m.EleccionesComponent)
      },
      {
        path: "partidos",
        loadComponent: () => import("./chunk-YJGTEDXW.js").then((m) => m.PartidosComponent)
      },
      {
        path: "cargos",
        loadComponent: () => import("./chunk-YGHPRQTN.js").then((m) => m.CargosComponent)
      },
      {
        path: "candidatos",
        loadComponent: () => import("./chunk-RR7W3S5S.js").then((m) => m.CandidatosComponent)
      },
      {
        path: "mesas",
        loadComponent: () => import("./chunk-GXEVNPCK.js").then((m) => m.MesasComponent)
      },
      {
        path: "asignar-mesas",
        loadComponent: () => import("./chunk-GR4NYCJF.js").then((m) => m.AsignarMesasComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-RXWO3SLD.js").then((m) => m.ConfiguracionComponent)
      },
      {
        path: "tipos-eleccion",
        loadComponent: () => import("./chunk-WGPI6SKQ.js").then((m) => m.TiposEleccionComponent)
      },
      {
        path: "listas-electorales",
        loadComponent: () => import("./chunk-CZJK3NDU.js").then((m) => m.ListasElectoralesComponent)
      },
      {
        path: "papeletas",
        loadComponent: () => import("./chunk-XENEFXQM.js").then((m) => m.PapeletasComponent)
      },
      {
        path: "reglas-negocio",
        loadComponent: () => import("./chunk-KB7DVB6I.js").then((m) => m.ReglasNegocioComponent)
      },
      {
        path: "circunscripciones",
        loadComponent: () => import("./chunk-DR3EGODN.js").then((m) => m.CircunscripcionesComponent)
      },
      {
        path: "escrutinio",
        loadComponent: () => import("./chunk-XY4OMNWF.js").then((m) => m.EscrutinioComponent)
      },
      {
        path: "dashboard-geografico",
        loadComponent: () => import("./chunk-O7C5AK7V.js").then((m) => m.DashboardGeograficoComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-CGIUXJAW.js").then((m) => m.ReportesComponent)
      },
      {
        path: "usuarios",
        loadComponent: () => import("./chunk-ITECKUYX.js").then((m) => m.UsuariosComponent)
      },
      {
        path: "roles",
        loadComponent: () => import("./chunk-L4I6OOAJ.js").then((m) => m.RolesComponent)
      }
    ]
  }
];
export {
  ADMIN_ROUTES
};
//# sourceMappingURL=chunk-MXKBRNO2.js.map
