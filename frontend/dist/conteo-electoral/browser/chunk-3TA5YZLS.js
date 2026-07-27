import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-FKSIPI65.js";
import {
  AuthService
} from "./chunk-5FM4GU5C.js";
import {
  BehaviorSubject,
  CommonModule,
  NgForOf,
  NgIf,
  RendererFactory2,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-MCJ4XKPH.js";
import "./chunk-H4MYKVU2.js";

// src/app/core/services/theme.service.ts
var ThemeService = class _ThemeService {
  constructor(rendererFactory) {
    this.darkModeSubject = new BehaviorSubject(false);
    this.darkMode$ = this.darkModeSubject.asObservable();
    this.renderer = rendererFactory.createRenderer(null, null);
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      const isDark = stored === "true";
      this.darkModeSubject.next(isDark);
      this.applyTheme(isDark);
    }
  }
  toggleDarkMode() {
    const newValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newValue);
    localStorage.setItem("darkMode", String(newValue));
    this.applyTheme(newValue);
  }
  isDarkMode() {
    return this.darkModeSubject.value;
  }
  applyTheme(isDark) {
    if (isDark) {
      this.renderer.setAttribute(document.body, "data-theme", "dark");
    } else {
      this.renderer.removeAttribute(document.body, "data-theme");
    }
  }
  static {
    this.\u0275fac = function ThemeService_Factory(t) {
      return new (t || _ThemeService)(\u0275\u0275inject(RendererFactory2));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/admin/layout/admin-layout.component.ts
function AdminLayoutComponent_ng_container_10_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 24);
    \u0275\u0275listener("click", function AdminLayoutComponent_ng_container_10_a_3_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSidebar());
    });
    \u0275\u0275elementStart(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "span", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r3.path);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.label);
  }
}
function AdminLayoutComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 22);
    \u0275\u0275text(2, "Administraci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AdminLayoutComponent_ng_container_10_a_3_Template, 6, 3, "a", 23);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.adminNavItemsFiltered);
  }
}
function AdminLayoutComponent_ng_container_11_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 24);
    \u0275\u0275listener("click", function AdminLayoutComponent_ng_container_11_a_3_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSidebar());
    });
    \u0275\u0275elementStart(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "span", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r5.path);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.label);
  }
}
function AdminLayoutComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 28);
    \u0275\u0275text(2, "Men\xFA Principal");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AdminLayoutComponent_ng_container_11_a_3_Template, 6, 3, "a", 23);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.navItemsFiltered);
  }
}
var AdminLayoutComponent = class _AdminLayoutComponent {
  get navItemsFiltered() {
    return this.navItems.filter((item) => item.roles.includes(this.userRole));
  }
  get adminNavItemsFiltered() {
    return this.adminNavItems.filter((item) => item.roles.includes(this.userRole));
  }
  get userRole() {
    const user = this.authService.getCurrentUser();
    return user?.rol || "";
  }
  get userName() {
    const user = this.authService.getCurrentUser();
    return user?.nombre + " " + user?.apellido || "";
  }
  get isDark() {
    return this.themeService.isDarkMode();
  }
  get isMobile() {
    return window.innerWidth <= 991;
  }
  constructor(authService, router, themeService) {
    this.authService = authService;
    this.router = router;
    this.themeService = themeService;
    this.sidebarOpen = false;
    this.baseAdminPath = "/admin";
    this.adminPrefix = (path) => `${this.baseAdminPath}/${path}`;
    this.navItems = [
      { path: "/dashboard", icon: "\u{1F4CA}", label: "Dashboard Electoral", roles: ["ADMIN", "SUPERVISOR"] },
      { path: "/mesa", icon: "\u{1F5F3}\uFE0F", label: "M\xF3dulo de Votaci\xF3n", roles: ["ADMIN", "MIEMBRO_MESA"] }
    ];
    this.adminNavItems = [
      { path: "/admin/elecciones", icon: "\u{1F3DB}\uFE0F", label: "Elecciones", roles: ["ADMIN"] },
      { path: "/admin/zonas", icon: "\u{1F30D}", label: "Zonas", roles: ["ADMIN"] },
      { path: "/admin/provincias", icon: "\u{1F4CD}", label: "Provincias", roles: ["ADMIN"] },
      { path: "/admin/cantones", icon: "\u{1F3D8}\uFE0F", label: "Cantones", roles: ["ADMIN"] },
      { path: "/admin/parroquias", icon: "\u{1F3D8}\uFE0F", label: "Parroquias", roles: ["ADMIN"] },
      { path: "/admin/instituciones", icon: "\u{1F3EB}", label: "Instituciones", roles: ["ADMIN"] },
      { path: "/admin/partidos", icon: "\u{1F3AF}", label: "Partidos", roles: ["ADMIN"] },
      { path: "/admin/cargos", icon: "\u{1F4CB}", label: "Cargos", roles: ["ADMIN"] },
      { path: "/admin/candidatos", icon: "\u{1F464}", label: "Candidatos", roles: ["ADMIN"] },
      { path: "/admin/mesas", icon: "\u{1F5F3}\uFE0F", label: "Mesas", roles: ["ADMIN"] },
      { path: "/admin/asignar-mesas", icon: "\u{1F4DD}", label: "Asignar Mesas", roles: ["ADMIN"] },
      { path: "/admin/listas-electorales", icon: "\u{1F4CB}", label: "Listas Electorales", roles: ["ADMIN"] },
      { path: "/admin/tipos-eleccion", icon: "\u2699\uFE0F", label: "Config. Electoral", roles: ["ADMIN"] },
      { path: "/admin/papeletas", icon: "\u{1F4C4}", label: "Papeletas", roles: ["ADMIN"] },
      { path: "/admin/circunscripciones", icon: "\u{1F5FA}\uFE0F", label: "Circunscripciones", roles: ["ADMIN"] },
      { path: "/admin/escrutinio", icon: "\u{1F50D}", label: "Escrutinio", roles: ["ADMIN"] },
      { path: "/admin/dashboard-geografico", icon: "\u{1F5FA}\uFE0F", label: "Dashboard Geogr\xE1fico", roles: ["ADMIN"] },
      { path: "/admin/reportes", icon: "\u{1F4CA}", label: "Reportes", roles: ["ADMIN"] },
      { path: "/admin/usuarios", icon: "\u{1F465}", label: "Usuarios", roles: ["ADMIN"] },
      { path: "/admin/roles", icon: "\u{1F510}", label: "Roles y Permisos", roles: ["ADMIN"] },
      { path: "/admin/reglas-negocio", icon: "\u2696\uFE0F", label: "Reglas de Negocio", roles: ["ADMIN"] },
      { path: "/admin/configuracion", icon: "\u2699\uFE0F", label: "Configuraci\xF3n", roles: ["ADMIN"] }
    ];
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  closeSidebar() {
    if (this.isMobile)
      this.sidebarOpen = false;
  }
  onResize() {
    if (!this.isMobile)
      this.sidebarOpen = false;
  }
  toggleTheme() {
    this.themeService.toggleDarkMode();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  static {
    this.\u0275fac = function AdminLayoutComponent_Factory(t) {
      return new (t || _AdminLayoutComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ThemeService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLayoutComponent, selectors: [["app-admin-layout"]], hostBindings: function AdminLayoutComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("resize", function AdminLayoutComponent_resize_HostBindingHandler() {
          return ctx.onResize();
        }, false, \u0275\u0275resolveWindow);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 40, vars: 14, consts: [[1, "admin-layout"], [1, "sidebar-overlay", 3, "click"], [1, "sidebar"], [1, "sidebar-header"], [1, "sidebar-subtitle"], [1, "sidebar-nav"], [4, "ngIf"], [1, "content-wrapper"], [1, "top-header"], [1, "header-left"], ["aria-label", "Toggle sidebar", 1, "sidebar-toggle", 3, "click"], [1, "header-brand"], [1, "header-right"], [1, "header-user-info"], [1, "header-user-name"], [1, "header-role-badge"], [1, "theme-toggle", 3, "click", "title"], [1, "btn", "btn-outline-light", "btn-sm", "header-logout", 3, "click"], [1, "main-content"], [1, "app-footer"], [1, "footer-brand"], [1, "footer-logo-placeholder"], [1, "nav-section-title"], ["routerLinkActive", "active", "class", "nav-item", 3, "routerLink", "click", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "nav-item", 3, "click", "routerLink"], [1, "nav-icon"], [1, "nav-text"], [1, "nav-indicator"], [1, "nav-section-title", 2, "margin-top", "8px"]], template: function AdminLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_div_click_1_listener() {
          return ctx.closeSidebar();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "aside", 2)(3, "div", 3)(4, "div")(5, "h2");
        \u0275\u0275text(6, "Conteo Electoral");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "span", 4);
        \u0275\u0275text(8, "Sistema de Votaci\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "nav", 5);
        \u0275\u0275template(10, AdminLayoutComponent_ng_container_10_Template, 4, 1, "ng-container", 6)(11, AdminLayoutComponent_ng_container_11_Template, 4, 1, "ng-container", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 7)(13, "header", 8)(14, "div", 9)(15, "button", 10);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_15_listener() {
          return ctx.toggleSidebar();
        });
        \u0275\u0275text(16, "\u2630");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "span", 11);
        \u0275\u0275text(18, "Conteo Electoral");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "div", 12)(20, "div", 13)(21, "span", 14);
        \u0275\u0275text(22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span", 15);
        \u0275\u0275text(24);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "button", 16);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_25_listener() {
          return ctx.toggleTheme();
        });
        \u0275\u0275text(26);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "button", 17);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_27_listener() {
          return ctx.logout();
        });
        \u0275\u0275elementStart(28, "span");
        \u0275\u0275text(29, "\u{1F6AA}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(30, " Salir ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(31, "main", 18);
        \u0275\u0275element(32, "router-outlet");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "footer", 19)(34, "div", 20);
        \u0275\u0275element(35, "span", 21);
        \u0275\u0275elementStart(36, "strong");
        \u0275\u0275text(37, "ALANTEK");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "span");
        \u0275\u0275text(39, "\xA9 2026 Sistema de Conteo Electoral. Todos los derechos reservados.");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275classProp("visible", ctx.sidebarOpen);
        \u0275\u0275advance();
        \u0275\u0275classProp("open", ctx.sidebarOpen);
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.adminNavItemsFiltered.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.navItemsFiltered.length > 0);
        \u0275\u0275advance(11);
        \u0275\u0275textInterpolate(ctx.userName);
        \u0275\u0275advance();
        \u0275\u0275classProp("admin", ctx.userRole === "ADMIN")("supervisor", ctx.userRole === "SUPERVISOR");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.userRole === "ADMIN" ? "Administrador" : "Supervisor", " ");
        \u0275\u0275advance();
        \u0275\u0275property("title", ctx.isDark ? "Modo claro" : "Modo oscuro");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isDark ? "\u2600\uFE0F" : "\u{1F319}", " ");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, RouterLink, RouterLinkActive, RouterOutlet], styles: ["\n\n.admin-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 270px;\n  background:\n    linear-gradient(\n      180deg,\n      #0f172a 0%,\n      #1e293b 100%);\n  color: white;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.15);\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  z-index: 100;\n  overflow-y: auto;\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  padding: 24px 20px 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n.sidebar-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 800;\n  background:\n    linear-gradient(\n      135deg,\n      #60a5fa,\n      #a78bfa);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.sidebar-subtitle[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #475569;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 12px;\n  overflow-y: auto;\n}\n.nav-section-title[_ngcontent-%COMP%] {\n  display: block;\n  padding: 12px 12px 6px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #475569;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 14px;\n  margin-bottom: 2px;\n  border-radius: 10px;\n  color: #94a3b8;\n  text-decoration: none;\n  transition: all 0.2s ease;\n  font-size: 14px;\n  font-weight: 500;\n  position: relative;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #e2e8f0;\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.2),\n      rgba(99, 102, 241, 0.1));\n  color: white;\n}\n.nav-item.active[_ngcontent-%COMP%]   .nav-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -2px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 3px;\n  height: 20px;\n  background:\n    linear-gradient(\n      180deg,\n      #3b82f6,\n      #6366f1);\n  border-radius: 0 3px 3px 0;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 24px;\n  text-align: center;\n  flex-shrink: 0;\n}\n.nav-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.extra-links[_ngcontent-%COMP%] {\n  padding: 0 12px 8px;\n  border-top: 1px solid rgba(255, 255, 255, 0.06);\n  margin-top: 4px;\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  margin-left: 270px;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.top-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary-color),\n      var(--secondary-color));\n  color: white;\n  padding: 0 2rem;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: sticky;\n  top: 0;\n  z-index: 99;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.header-brand[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  letter-spacing: 0.3px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.header-user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.header-user-name[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.header-role-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 6px;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.header-role-badge.admin[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n}\n.header-role-badge.supervisor[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n}\n.theme-toggle[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.15);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  transition: all 0.2s ease;\n}\n.theme-toggle[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.25);\n  border-color: rgba(255, 255, 255, 0.5);\n}\n.header-logout[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, 0.4) !important;\n  color: white !important;\n  font-size: 0.8rem;\n  padding: 0.3rem 0.75rem;\n}\n.header-logout[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15) !important;\n  border-color: rgba(255, 255, 255, 0.6) !important;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  background: var(--bg-light);\n  padding: 1.5rem 2rem 4rem;\n  overflow-y: auto;\n}\n.app-footer[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 270px;\n  right: 0;\n  z-index: 98;\n  background: var(--bg-light);\n  border-top: 1px solid var(--border-color);\n  padding: 0.75rem 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1.5rem;\n  font-size: 0.8rem;\n  color: var(--text-muted);\n}\n.footer-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  color: var(--text-muted);\n  letter-spacing: 0.5px;\n}\n.footer-logo-placeholder[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border: 1.5px dashed var(--text-muted);\n  border-radius: 6px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .app-footer[_ngcontent-%COMP%] {\n  background: #1e293b;\n  border-top-color: #334155;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .main-content[_ngcontent-%COMP%] {\n  background: #0f172a;\n}\n.sidebar-toggle[_ngcontent-%COMP%] {\n  display: none;\n  background: none;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  padding: 4px;\n  line-height: 1;\n}\n.sidebar-overlay[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (max-width: 991px) {\n  .sidebar[_ngcontent-%COMP%] {\n    transform: translateX(-100%);\n    transition: transform 0.3s ease;\n  }\n  .sidebar.open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  .sidebar-overlay[_ngcontent-%COMP%] {\n    display: none;\n    position: fixed;\n    inset: 0;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 99;\n  }\n  .sidebar-overlay.visible[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .sidebar-toggle[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n  .content-wrapper[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .main-content[_ngcontent-%COMP%] {\n    padding: 1rem 1rem 4rem;\n  }\n  .top-header[_ngcontent-%COMP%] {\n    padding: 0 1rem;\n  }\n  .header-user-name[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .header-role-badge[_ngcontent-%COMP%] {\n    font-size: 9px;\n    padding: 1px 6px;\n  }\n  .app-footer[_ngcontent-%COMP%] {\n    left: 0;\n    padding: 0.5rem 1rem;\n    font-size: 0.7rem;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n  }\n}\n@media (max-width: 480px) {\n  .header-right[_ngcontent-%COMP%] {\n    gap: 0.4rem;\n  }\n  .header-brand[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  .theme-toggle[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    font-size: 16px;\n  }\n  .header-logout[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n    padding: 0.25rem 0.5rem;\n  }\n  .main-content[_ngcontent-%COMP%] {\n    padding: 0.75rem 0.75rem 4rem;\n  }\n}"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLayoutComponent, { className: "AdminLayoutComponent", filePath: "app\\features\\admin\\layout\\admin-layout.component.ts", lineNumber: 22 });
})();
export {
  AdminLayoutComponent
};
