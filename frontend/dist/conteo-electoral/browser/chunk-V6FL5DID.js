import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-C67EKLAA.js";
import {
  AuthService
} from "./chunk-7K6Z2GKD.js";
import {
  BehaviorSubject,
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  RendererFactory2,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
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
} from "./chunk-6TL4F4J6.js";
import "./chunk-ASLTLD6L.js";

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
function AdminLayoutComponent_ng_container_15_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 31);
    \u0275\u0275listener("click", function AdminLayoutComponent_ng_container_15_a_3_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSidebar());
    });
    \u0275\u0275element(1, "i", 32);
    \u0275\u0275elementStart(2, "span", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "span", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r3.path)("title", item_r3.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.label);
  }
}
function AdminLayoutComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 29);
    \u0275\u0275text(2, "Administraci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AdminLayoutComponent_ng_container_15_a_3_Template, 5, 4, "a", 30);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.adminNavItemsFiltered);
  }
}
function AdminLayoutComponent_ng_container_16_a_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 31);
    \u0275\u0275listener("click", function AdminLayoutComponent_ng_container_16_a_3_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSidebar());
    });
    \u0275\u0275element(1, "i", 32);
    \u0275\u0275elementStart(2, "span", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "span", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r5.path)("title", item_r5.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r5.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.label);
  }
}
function AdminLayoutComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 35);
    \u0275\u0275text(2, "Men\xFA Principal");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AdminLayoutComponent_ng_container_16_a_3_Template, 5, 4, "a", 30);
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
    this.sidebarCollapsed = false;
    this.baseAdminPath = "/admin";
    this.adminPrefix = (path) => `${this.baseAdminPath}/${path}`;
    this.navItems = [
      { path: "/dashboard", icon: "bi-speedometer2", label: "Dashboard Electoral", roles: ["ADMIN", "SUPERVISOR"] },
      { path: "/mesa", icon: "bi-check2-square", label: "M\xF3dulo de Votaci\xF3n", roles: ["ADMIN", "MIEMBRO_MESA"] }
    ];
    this.adminNavItems = [
      { path: "/admin/elecciones", icon: "bi-bank", label: "Elecciones", roles: ["ADMIN"] },
      { path: "/admin/zonas", icon: "bi-globe-americas", label: "Zonas", roles: ["ADMIN"] },
      { path: "/admin/provincias", icon: "bi-geo-alt", label: "Provincias", roles: ["ADMIN"] },
      { path: "/admin/cantones", icon: "bi-buildings", label: "Cantones", roles: ["ADMIN"] },
      { path: "/admin/parroquias", icon: "bi-house-door", label: "Parroquias", roles: ["ADMIN"] },
      { path: "/admin/instituciones", icon: "bi-mortarboard", label: "Instituciones", roles: ["ADMIN"] },
      { path: "/admin/partidos", icon: "bi-flag", label: "Partidos", roles: ["ADMIN"] },
      { path: "/admin/cargos", icon: "bi-clipboard-data", label: "Cargos", roles: ["ADMIN"] },
      { path: "/admin/candidatos", icon: "bi-person", label: "Candidatos", roles: ["ADMIN"] },
      { path: "/admin/mesas", icon: "bi-check2-square", label: "Mesas", roles: ["ADMIN"] },
      { path: "/admin/asignar-mesas", icon: "bi-pencil-square", label: "Asignar Mesas", roles: ["ADMIN"] },
      { path: "/admin/listas-electorales", icon: "bi-list-check", label: "Listas Electorales", roles: ["ADMIN"] },
      { path: "/admin/tipos-eleccion", icon: "bi-sliders", label: "Config. Electoral", roles: ["ADMIN"] },
      { path: "/admin/papeletas", icon: "bi-file-earmark-text", label: "Papeletas", roles: ["ADMIN"] },
      { path: "/admin/circunscripciones", icon: "bi-map", label: "Circunscripciones", roles: ["ADMIN"] },
      { path: "/admin/escrutinio", icon: "bi-search", label: "Escrutinio", roles: ["ADMIN"] },
      { path: "/admin/dashboard-geografico", icon: "bi-pin-map", label: "Dashboard Geogr\xE1fico", roles: ["ADMIN"] },
      { path: "/admin/reportes", icon: "bi-graph-up", label: "Reportes", roles: ["ADMIN"] },
      { path: "/admin/usuarios", icon: "bi-people", label: "Usuarios", roles: ["ADMIN"] },
      { path: "/admin/roles", icon: "bi-shield-lock", label: "Roles y Permisos", roles: ["ADMIN"] },
      { path: "/admin/reglas-negocio", icon: "bi-journal-text", label: "Reglas de Negocio", roles: ["ADMIN"] },
      { path: "/admin/configuracion", icon: "bi-gear", label: "Configuraci\xF3n", roles: ["ADMIN"] }
    ];
    this.sidebarCollapsed = localStorage.getItem("sidebar_collapsed") === "true";
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  toggleCollapse() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    localStorage.setItem("sidebar_collapsed", String(this.sidebarCollapsed));
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
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 44, vars: 29, consts: [[1, "admin-layout"], [1, "sidebar-overlay", 3, "click"], [1, "sidebar"], [1, "sidebar-header"], [1, "sidebar-brand"], [1, "sidebar-logo-mini"], [1, "sidebar-brand-text"], [1, "sidebar-subtitle"], ["type", "button", 1, "sidebar-collapse-btn", 3, "click", "title"], [1, "bi"], [1, "sidebar-nav"], [4, "ngIf"], [1, "content-wrapper"], [1, "top-header"], [1, "header-left"], ["aria-label", "Toggle sidebar", 1, "sidebar-toggle", 3, "click"], [1, "bi", "bi-list"], [1, "header-brand"], [1, "header-right"], [1, "header-user-info"], [1, "header-user-name"], [1, "header-role-badge"], [1, "theme-toggle", 3, "click", "title"], [1, "btn", "btn-outline-light", "btn-sm", "header-logout", 3, "click"], [1, "bi", "bi-box-arrow-right"], [1, "main-content"], [1, "app-footer"], [1, "footer-brand"], [1, "footer-logo-placeholder"], [1, "nav-section-title"], ["routerLinkActive", "active", "class", "nav-item", 3, "routerLink", "title", "click", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "nav-item", 3, "click", "routerLink", "title"], [1, "nav-icon", "bi", 3, "ngClass"], [1, "nav-text"], [1, "nav-indicator"], [1, "nav-section-title", 2, "margin-top", "8px"]], template: function AdminLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_div_click_1_listener() {
          return ctx.closeSidebar();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "aside", 2)(3, "div", 3)(4, "div", 4)(5, "span", 5);
        \u0275\u0275text(6, "CE");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 6)(8, "h2");
        \u0275\u0275text(9, "Conteo Electoral");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span", 7);
        \u0275\u0275text(11, "Sistema de Votaci\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "button", 8);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_12_listener() {
          return ctx.toggleCollapse();
        });
        \u0275\u0275element(13, "i", 9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "nav", 10);
        \u0275\u0275template(15, AdminLayoutComponent_ng_container_15_Template, 4, 1, "ng-container", 11)(16, AdminLayoutComponent_ng_container_16_Template, 4, 1, "ng-container", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 12)(18, "header", 13)(19, "div", 14)(20, "button", 15);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_20_listener() {
          return ctx.toggleSidebar();
        });
        \u0275\u0275element(21, "i", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "span", 17);
        \u0275\u0275text(23, "Conteo Electoral");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "div", 18)(25, "div", 19)(26, "span", 20);
        \u0275\u0275text(27);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span", 21);
        \u0275\u0275text(29);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "button", 22);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_30_listener() {
          return ctx.toggleTheme();
        });
        \u0275\u0275element(31, "i", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "button", 23);
        \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_32_listener() {
          return ctx.logout();
        });
        \u0275\u0275element(33, "i", 24);
        \u0275\u0275text(34, " Salir ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(35, "main", 25);
        \u0275\u0275element(36, "router-outlet");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "footer", 26)(38, "div", 27);
        \u0275\u0275element(39, "span", 28);
        \u0275\u0275elementStart(40, "strong");
        \u0275\u0275text(41, "ALANTEK");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "span");
        \u0275\u0275text(43, "\xA9 2026 Sistema de Conteo Electoral. Todos los derechos reservados.");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("sidebar-collapsed", ctx.sidebarCollapsed);
        \u0275\u0275advance();
        \u0275\u0275classProp("visible", ctx.sidebarOpen);
        \u0275\u0275advance();
        \u0275\u0275classProp("open", ctx.sidebarOpen)("collapsed", ctx.sidebarCollapsed);
        \u0275\u0275advance(10);
        \u0275\u0275property("title", ctx.sidebarCollapsed ? "Expandir men\xFA" : "Contraer men\xFA");
        \u0275\u0275attribute("aria-label", ctx.sidebarCollapsed ? "Expandir men\xFA" : "Contraer men\xFA")("aria-expanded", !ctx.sidebarCollapsed);
        \u0275\u0275advance();
        \u0275\u0275classProp("bi-chevron-left", !ctx.sidebarCollapsed)("bi-chevron-right", ctx.sidebarCollapsed);
        \u0275\u0275advance(2);
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
        \u0275\u0275attribute("aria-label", ctx.isDark ? "Activar modo claro" : "Activar modo oscuro");
        \u0275\u0275advance();
        \u0275\u0275classProp("bi-sun", ctx.isDark)("bi-moon-stars", !ctx.isDark);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, RouterLink, RouterLinkActive, RouterOutlet], styles: ["\n\n.admin-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 270px;\n  background:\n    linear-gradient(\n      180deg,\n      var(--alantek-primary-dark) 0%,\n      var(--alantek-primary-strong) 100%);\n  color: white;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.18);\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  z-index: 100;\n  overflow-y: auto;\n  overflow-x: hidden;\n  transition: width 0.25s ease;\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  padding: 24px 20px 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  position: relative;\n}\n.sidebar-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  background:\n    linear-gradient(\n      135deg,\n      #f6f0e5,\n      var(--alantek-accent));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  white-space: nowrap;\n}\n.sidebar-subtitle[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9aa896;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  white-space: nowrap;\n}\n.sidebar-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.sidebar-brand-text[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.sidebar-logo-mini[_ngcontent-%COMP%] {\n  display: none;\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--alantek-accent),\n      var(--alantek-highlight));\n  color: #ffffff;\n  font-size: 13px;\n  font-weight: 800;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.sidebar-collapse-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  background: rgba(255, 255, 255, 0.12);\n  color: #f6f0e5;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  line-height: 1;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.sidebar-collapse-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.28);\n  border-color: rgba(255, 255, 255, 0.45);\n}\n.sidebar-collapse-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--alantek-accent);\n  outline-offset: 2px;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 12px;\n  overflow-y: auto;\n}\n.nav-section-title[_ngcontent-%COMP%] {\n  display: block;\n  padding: 12px 12px 6px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #8a987f;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 14px;\n  margin-bottom: 2px;\n  border-radius: 10px;\n  color: #c9d2c4;\n  text-decoration: none;\n  transition: background-color 0.2s ease, color 0.2s ease;\n  font-size: 14px;\n  font-weight: 500;\n  position: relative;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #f6f0e5;\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background: rgba(217, 119, 50, 0.18);\n  color: #ffffff;\n}\n.nav-item.active[_ngcontent-%COMP%]   .nav-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -2px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 3px;\n  height: 20px;\n  background:\n    linear-gradient(\n      180deg,\n      var(--alantek-accent),\n      var(--alantek-highlight));\n  border-radius: 0 3px 3px 0;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n  width: 24px;\n  text-align: center;\n  flex-shrink: 0;\n}\n.nav-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.sidebar.collapsed[_ngcontent-%COMP%] {\n  width: 76px;\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .sidebar-header[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 24px 12px 16px;\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .sidebar-brand-text[_ngcontent-%COMP%] {\n  display: none;\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .sidebar-logo-mini[_ngcontent-%COMP%] {\n  display: inline-flex;\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .sidebar-collapse-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -14px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 2;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .sidebar-nav[_ngcontent-%COMP%] {\n  padding: 12px 10px;\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .nav-section-title[_ngcontent-%COMP%] {\n  display: none;\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 12px 0;\n  gap: 0;\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .nav-text[_ngcontent-%COMP%] {\n  display: none;\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .nav-indicator[_ngcontent-%COMP%] {\n  left: 0;\n}\n.admin-layout.sidebar-collapsed[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%] {\n  margin-left: 76px;\n}\n.admin-layout.sidebar-collapsed[_ngcontent-%COMP%]   .app-footer[_ngcontent-%COMP%] {\n  left: 76px;\n}\n.extra-links[_ngcontent-%COMP%] {\n  padding: 0 12px 8px;\n  border-top: 1px solid rgba(255, 255, 255, 0.08);\n  margin-top: 4px;\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  margin-left: 270px;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  transition: margin-left 0.25s ease;\n}\n.top-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--alantek-primary),\n      var(--alantek-primary-strong));\n  color: white;\n  padding: 0 2rem;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: sticky;\n  top: 0;\n  z-index: 99;\n  box-shadow: var(--alantek-shadow-md);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.header-brand[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  letter-spacing: 0.3px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.header-user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.header-user-name[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.header-role-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: var(--alantek-radius-sm);\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  background: var(--alantek-accent);\n  color: #ffffff;\n}\n.header-role-badge.supervisor[_ngcontent-%COMP%] {\n  background: var(--alantek-highlight);\n  color: var(--alantek-primary-dark);\n}\n.theme-toggle[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.15);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  width: 36px;\n  height: 36px;\n  border-radius: var(--alantek-radius-sm);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  transition: background-color 0.2s ease;\n}\n.theme-toggle[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.25);\n  border-color: rgba(255, 255, 255, 0.5);\n}\n.theme-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--alantek-accent);\n  outline-offset: 2px;\n}\n.header-logout[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, 0.4) !important;\n  color: white !important;\n  font-size: 0.8rem;\n  padding: 0.3rem 0.75rem;\n}\n.header-logout[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15) !important;\n  border-color: rgba(255, 255, 255, 0.6) !important;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  background: var(--alantek-background);\n  padding: 1.5rem 2rem 4rem;\n  overflow-y: auto;\n}\n.app-footer[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 270px;\n  right: 0;\n  z-index: 98;\n  background: var(--alantek-background);\n  border-top: 1px solid var(--alantek-border);\n  padding: 0.75rem 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1.5rem;\n  font-size: 0.8rem;\n  color: var(--alantek-text-muted);\n  transition: left 0.25s ease;\n}\n.footer-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  color: var(--alantek-text-muted);\n  letter-spacing: 0.5px;\n}\n.footer-logo-placeholder[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border: 1.5px dashed var(--alantek-text-muted);\n  border-radius: 6px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .app-footer[_ngcontent-%COMP%] {\n  background: var(--alantek-background);\n  border-top-color: var(--alantek-border);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .main-content[_ngcontent-%COMP%] {\n  background: var(--alantek-background);\n}\n.sidebar-toggle[_ngcontent-%COMP%] {\n  display: none;\n  background: none;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  padding: 4px;\n  line-height: 1;\n}\n.sidebar-overlay[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (max-width: 991px) {\n  .sidebar[_ngcontent-%COMP%] {\n    transform: translateX(-100%);\n    transition: transform 0.25s ease;\n  }\n  .sidebar.open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  .sidebar.collapsed[_ngcontent-%COMP%] {\n    width: 270px;\n  }\n  .sidebar-collapse-btn[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .sidebar-overlay[_ngcontent-%COMP%] {\n    display: none;\n    position: fixed;\n    inset: 0;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 99;\n  }\n  .sidebar-overlay.visible[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .sidebar-toggle[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n  .content-wrapper[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  .main-content[_ngcontent-%COMP%] {\n    padding: 1rem 1rem 4rem;\n  }\n  .top-header[_ngcontent-%COMP%] {\n    padding: 0 1rem;\n  }\n  .header-user-name[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .header-role-badge[_ngcontent-%COMP%] {\n    font-size: 9px;\n    padding: 1px 6px;\n  }\n  .app-footer[_ngcontent-%COMP%] {\n    left: 0;\n    padding: 0.5rem 1rem;\n    font-size: 0.7rem;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n  }\n}\n@media (max-width: 480px) {\n  .header-right[_ngcontent-%COMP%] {\n    gap: 0.4rem;\n  }\n  .header-brand[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  .theme-toggle[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    font-size: 16px;\n  }\n  .header-logout[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n    padding: 0.25rem 0.5rem;\n  }\n  .main-content[_ngcontent-%COMP%] {\n    padding: 0.75rem 0.75rem 4rem;\n  }\n}\n/*# sourceMappingURL=admin-layout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLayoutComponent, { className: "AdminLayoutComponent", filePath: "app\\features\\admin\\layout\\admin-layout.component.ts", lineNumber: 22 });
})();
export {
  AdminLayoutComponent
};
//# sourceMappingURL=chunk-V6FL5DID.js.map
