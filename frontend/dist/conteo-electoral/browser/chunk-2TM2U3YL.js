import "./chunk-ASLTLD6L.js";

// src/app/features/admin/admin.routes.ts
var ADMIN_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-2A5VLY2F.js").then((m) => m.AdminLayoutComponent),
    children: [
      { path: "", redirectTo: "elecciones", pathMatch: "full" },
      {
        path: "zonas",
        loadComponent: () => import("./chunk-M6TB6RR4.js").then((m) => m.ZonasComponent)
      },
      {
        path: "provincias",
        loadComponent: () => import("./chunk-JJCTRIGY.js").then((m) => m.ProvinciasComponent)
      },
      {
        path: "cantones",
        loadComponent: () => import("./chunk-VHUDKNNP.js").then((m) => m.CantonesComponent)
      },
      {
        path: "parroquias",
        loadComponent: () => import("./chunk-62CP5RFP.js").then((m) => m.ParroquiasComponent)
      },
      {
        path: "instituciones",
        loadComponent: () => import("./chunk-OCUZZZZE.js").then((m) => m.InstitucionesComponent)
      },
      {
        path: "elecciones",
        loadComponent: () => import("./chunk-3SCEFJOS.js").then((m) => m.EleccionesComponent)
      },
      {
        path: "partidos",
        loadComponent: () => import("./chunk-RXNEZYH5.js").then((m) => m.PartidosComponent)
      },
      {
        path: "cargos",
        loadComponent: () => import("./chunk-YKNSVNGQ.js").then((m) => m.CargosComponent)
      },
      {
        path: "candidatos",
        loadComponent: () => import("./chunk-EDH4IYZV.js").then((m) => m.CandidatosComponent)
      },
      {
        path: "mesas",
        loadComponent: () => import("./chunk-WZAPFSBC.js").then((m) => m.MesasComponent)
      },
      {
        path: "usuarios",
        loadComponent: () => import("./chunk-2SYCOVM3.js").then((m) => m.UsuariosComponent)
      },
      {
        path: "asignar-mesas",
        loadComponent: () => import("./chunk-DR6WXE4T.js").then((m) => m.AsignarMesasComponent)
      },
      {
        path: "importar",
        loadComponent: () => import("./chunk-F5WSDASR.js").then((m) => m.ImportarComponent)
      }
    ]
  }
];
export {
  ADMIN_ROUTES
};
//# sourceMappingURL=chunk-2TM2U3YL.js.map
