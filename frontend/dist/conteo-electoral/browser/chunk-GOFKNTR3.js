import "./chunk-ASLTLD6L.js";

// src/app/features/admin/admin.routes.ts
var ADMIN_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-BEFJK456.js").then((m) => m.AdminLayoutComponent),
    children: [
      { path: "", redirectTo: "elecciones", pathMatch: "full" },
      {
        path: "zonas",
        loadComponent: () => import("./chunk-LNKWODOA.js").then((m) => m.ZonasComponent)
      },
      {
        path: "provincias",
        loadComponent: () => import("./chunk-GILRKHCM.js").then((m) => m.ProvinciasComponent)
      },
      {
        path: "cantones",
        loadComponent: () => import("./chunk-232FCKAJ.js").then((m) => m.CantonesComponent)
      },
      {
        path: "parroquias",
        loadComponent: () => import("./chunk-LA4DBLNH.js").then((m) => m.ParroquiasComponent)
      },
      {
        path: "instituciones",
        loadComponent: () => import("./chunk-HBWV4KWC.js").then((m) => m.InstitucionesComponent)
      },
      {
        path: "elecciones",
        loadComponent: () => import("./chunk-IBDCDF2F.js").then((m) => m.EleccionesComponent)
      },
      {
        path: "partidos",
        loadComponent: () => import("./chunk-TBB2ZLRQ.js").then((m) => m.PartidosComponent)
      },
      {
        path: "cargos",
        loadComponent: () => import("./chunk-TMX6O5NE.js").then((m) => m.CargosComponent)
      },
      {
        path: "candidatos",
        loadComponent: () => import("./chunk-XBC66IL4.js").then((m) => m.CandidatosComponent)
      },
      {
        path: "mesas",
        loadComponent: () => import("./chunk-L4AJ47I3.js").then((m) => m.MesasComponent)
      },
      {
        path: "asignar-mesas",
        loadComponent: () => import("./chunk-EK6GXKF2.js").then((m) => m.AsignarMesasComponent)
      },
      {
        path: "configuracion",
        loadComponent: () => import("./chunk-3CMJZBTH.js").then((m) => m.ConfiguracionComponent)
      },
      {
        path: "tipos-eleccion",
        loadComponent: () => import("./chunk-JHLE76BA.js").then((m) => m.TiposEleccionComponent)
      },
      {
        path: "listas-electorales",
        loadComponent: () => import("./chunk-FUCUME43.js").then((m) => m.ListasElectoralesComponent)
      },
      {
        path: "papeletas",
        loadComponent: () => import("./chunk-KFAQ7V6G.js").then((m) => m.PapeletasComponent)
      },
      {
        path: "reglas-negocio",
        loadComponent: () => import("./chunk-3V2KLF6U.js").then((m) => m.ReglasNegocioComponent)
      },
      {
        path: "circunscripciones",
        loadComponent: () => import("./chunk-JL42PBF5.js").then((m) => m.CircunscripcionesComponent)
      },
      {
        path: "escrutinio",
        loadComponent: () => import("./chunk-KUG436AC.js").then((m) => m.EscrutinioComponent)
      },
      {
        path: "dashboard-geografico",
        loadComponent: () => import("./chunk-6D2XSTGW.js").then((m) => m.DashboardGeograficoComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-7WN2QSVL.js").then((m) => m.ReportesComponent)
      },
      {
        path: "usuarios",
        loadComponent: () => import("./chunk-T7Y3YZB5.js").then((m) => m.UsuariosComponent)
      },
      {
        path: "roles",
        loadComponent: () => import("./chunk-DJZVOBQV.js").then((m) => m.RolesComponent)
      }
    ]
  }
];
export {
  ADMIN_ROUTES
};
//# sourceMappingURL=chunk-GOFKNTR3.js.map
