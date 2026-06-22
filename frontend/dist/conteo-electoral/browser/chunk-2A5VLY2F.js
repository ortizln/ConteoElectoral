import {
  AuthService,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-TFOW3E4S.js";
import {
  CommonModule,
  NgForOf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7A5LCT4I.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/layout/admin-layout.component.ts
function AdminLayoutComponent_a_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 20)(1, "span", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "span", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r1.path);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
var AdminLayoutComponent = class _AdminLayoutComponent {
  get userRole() {
    const user = this.authService.getCurrentUser();
    return user?.rol || "";
  }
  get userName() {
    const user = this.authService.getCurrentUser();
    return user?.nombre + " " + user?.apellido || "";
  }
  get filteredNavItems() {
    return this.navItems.filter((item) => item.roles.includes(this.userRole));
  }
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.navItems = [
      { path: "elecciones", icon: "\u{1F3DB}\uFE0F", label: "Elecciones", roles: ["ADMIN", "SUPERVISOR"] },
      { path: "zonas", icon: "\u{1F30D}", label: "Zonas", roles: ["ADMIN"] },
      { path: "provincias", icon: "\u{1F4CD}", label: "Provincias", roles: ["ADMIN"] },
      { path: "cantones", icon: "\u{1F3D8}\uFE0F", label: "Cantones", roles: ["ADMIN"] },
      { path: "parroquias", icon: "\u{1F3D8}\uFE0F", label: "Parroquias", roles: ["ADMIN"] },
      { path: "instituciones", icon: "\u{1F3EB}", label: "Instituciones", roles: ["ADMIN", "SUPERVISOR"] },
      { path: "partidos", icon: "\u{1F3AF}", label: "Partidos", roles: ["ADMIN", "SUPERVISOR"] },
      { path: "cargos", icon: "\u{1F4CB}", label: "Cargos", roles: ["ADMIN", "SUPERVISOR"] },
      { path: "candidatos", icon: "\u{1F464}", label: "Candidatos", roles: ["ADMIN", "SUPERVISOR"] },
      { path: "mesas", icon: "\u{1F5F3}\uFE0F", label: "Mesas", roles: ["ADMIN", "SUPERVISOR"] },
      { path: "usuarios", icon: "\u{1F465}", label: "Usuarios", roles: ["ADMIN"] },
      { path: "asignar-mesas", icon: "\u{1F4DD}", label: "Asignar Mesas", roles: ["ADMIN", "SUPERVISOR"] },
      { path: "importar", icon: "\u{1F4E5}", label: "Importar Datos", roles: ["ADMIN"] }
    ];
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  static {
    this.\u0275fac = function AdminLayoutComponent_Factory(t) {
      return new (t || _AdminLayoutComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLayoutComponent, selectors: [["app-admin-layout"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 40, vars: 8, consts: [[1, "admin-layout"], [1, "sidebar"], [1, "sidebar-header"], [1, "sidebar-subtitle"], [1, "user-info"], [1, "user-avatar"], [1, "user-details"], [1, "user-name"], [1, "user-role-badge"], [1, "sidebar-nav"], [1, "nav-section-title"], ["routerLinkActive", "active", "class", "nav-item", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "extra-links"], ["routerLink", "/dashboard", 1, "nav-item"], [1, "nav-icon"], [1, "nav-text"], ["routerLink", "/mesa", 1, "nav-item"], [1, "sidebar-footer"], [1, "btn-logout-sidebar", 3, "click"], [1, "main-content"], ["routerLinkActive", "active", 1, "nav-item", 3, "routerLink"], [1, "nav-indicator"]], template: function AdminLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "div")(4, "h2");
        \u0275\u0275text(5, "Conteo Electoral");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "span", 3);
        \u0275\u0275text(7, "Sistema de Votaci\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(8, "div", 4)(9, "div", 5);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 6)(12, "span", 7);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span", 8);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "nav", 9)(17, "span", 10);
        \u0275\u0275text(18, "Men\xFA Principal");
        \u0275\u0275elementEnd();
        \u0275\u0275template(19, AdminLayoutComponent_a_19_Template, 6, 3, "a", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 12)(21, "span", 10);
        \u0275\u0275text(22, "Enlaces R\xE1pidos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "a", 13)(24, "span", 14);
        \u0275\u0275text(25, "\u{1F4CA}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "span", 15);
        \u0275\u0275text(27, "Dashboard Electoral");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "a", 16)(29, "span", 14);
        \u0275\u0275text(30, "\u{1F5F3}\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "span", 15);
        \u0275\u0275text(32, "M\xF3dulo de Votaci\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(33, "div", 17)(34, "button", 18);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_34_listener() {
          return ctx.logout();
        });
        \u0275\u0275elementStart(35, "span");
        \u0275\u0275text(36, "\u{1F6AA}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(37, " Cerrar Sesi\xF3n ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(38, "main", 19);
        \u0275\u0275element(39, "router-outlet");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275textInterpolate(ctx.userName[0] || "U");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.userName);
        \u0275\u0275advance();
        \u0275\u0275classProp("admin", ctx.userRole === "ADMIN")("supervisor", ctx.userRole === "SUPERVISOR");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.userRole === "ADMIN" ? "Administrador" : "Supervisor", " ");
        \u0275\u0275advance(4);
        \u0275\u0275property("ngForOf", ctx.filteredNavItems);
      }
    }, dependencies: [CommonModule, NgForOf, RouterLink, RouterLinkActive, RouterOutlet], styles: ["\n\n.admin-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 270px;\n  background:\n    linear-gradient(\n      180deg,\n      #0f172a 0%,\n      #1e293b 100%);\n  color: white;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.15);\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  z-index: 100;\n  overflow-y: auto;\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  padding: 24px 20px 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n.sidebar-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 800;\n  background:\n    linear-gradient(\n      135deg,\n      #60a5fa,\n      #a78bfa);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.sidebar-subtitle[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #475569;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 16px 20px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  font-weight: 700;\n  color: white;\n  flex-shrink: 0;\n}\n.user-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #f1f5f9;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-role-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 6px;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  align-self: flex-start;\n}\n.user-role-badge.admin[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.2);\n  color: #93c5fd;\n}\n.user-role-badge.supervisor[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.2);\n  color: #fcd34d;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 12px;\n  overflow-y: auto;\n}\n.nav-section-title[_ngcontent-%COMP%] {\n  display: block;\n  padding: 12px 12px 6px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #475569;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 14px;\n  margin-bottom: 2px;\n  border-radius: 10px;\n  color: #94a3b8;\n  text-decoration: none;\n  transition: all 0.2s ease;\n  font-size: 14px;\n  font-weight: 500;\n  position: relative;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #e2e8f0;\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.2),\n      rgba(99, 102, 241, 0.1));\n  color: white;\n}\n.nav-item.active[_ngcontent-%COMP%]   .nav-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -2px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 3px;\n  height: 20px;\n  background:\n    linear-gradient(\n      180deg,\n      #3b82f6,\n      #6366f1);\n  border-radius: 0 3px 3px 0;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 24px;\n  text-align: center;\n  flex-shrink: 0;\n}\n.nav-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.extra-links[_ngcontent-%COMP%] {\n  padding: 0 12px 8px;\n  border-top: 1px solid rgba(255, 255, 255, 0.06);\n  margin-top: 4px;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-top: 1px solid rgba(255, 255, 255, 0.06);\n}\n.btn-logout-sidebar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  padding: 12px 16px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  color: #fca5a5;\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.btn-logout-sidebar[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.2);\n  color: #fecaca;\n}\n.main-content[_ngcontent-%COMP%] {\n  margin-left: 270px;\n  flex: 1;\n  background: #f1f5f9;\n  min-height: 100vh;\n  overflow-y: auto;\n  padding: 0;\n}\n/*# sourceMappingURL=admin-layout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLayoutComponent, { className: "AdminLayoutComponent", filePath: "app\\features\\admin\\layout\\admin-layout.component.ts", lineNumber: 20 });
})();
export {
  AdminLayoutComponent
};
//# sourceMappingURL=chunk-2A5VLY2F.js.map
