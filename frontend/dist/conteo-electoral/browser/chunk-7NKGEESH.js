import {
  AuthService,
  Router,
  RouterOutlet
} from "./chunk-KZU2HTPH.js";
import {
  CommonModule,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3DSQS3EE.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/shared/layouts/content-layout.component.ts
var ContentLayoutComponent = class _ContentLayoutComponent {
  get userRole() {
    return this.authService.getCurrentUser()?.rol || "";
  }
  get userName() {
    const user = this.authService.getCurrentUser();
    return user?.nombre + " " + user?.apellido || "";
  }
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  static {
    this.\u0275fac = function ContentLayoutComponent_Factory(t) {
      return new (t || _ContentLayoutComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContentLayoutComponent, selectors: [["app-content-layout"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 24, vars: 2, consts: [[1, "content-layout"], [1, "top-header"], [1, "header-left"], [1, "header-brand"], [1, "header-right"], [1, "header-user-info"], [1, "header-user-name"], [1, "header-role-badge"], [1, "btn", "btn-outline-light", "btn-sm", "header-logout", 3, "click"], [1, "main-content"], [1, "app-footer"], [1, "footer-brand"], [1, "footer-logo-placeholder"]], template: function ContentLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4, "Conteo Electoral");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "span", 6);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "span", 7);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "button", 8);
        \u0275\u0275listener("click", function ContentLayoutComponent_Template_button_click_11_listener() {
          return ctx.logout();
        });
        \u0275\u0275elementStart(12, "span");
        \u0275\u0275text(13, "\u{1F6AA}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(14, " Salir ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(15, "main", 9);
        \u0275\u0275element(16, "router-outlet");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "footer", 10)(18, "div", 11);
        \u0275\u0275element(19, "span", 12);
        \u0275\u0275elementStart(20, "strong");
        \u0275\u0275text(21, "ALANTEK");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "span");
        \u0275\u0275text(23, "\xA9 2026 Sistema de Conteo Electoral. Todos los derechos reservados.");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.userName);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.userRole);
      }
    }, dependencies: [CommonModule, RouterOutlet], styles: ["\n\n.content-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.top-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1e3a8a,\n      #3b82f6);\n  color: white;\n  padding: 0 2rem;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: sticky;\n  top: 0;\n  z-index: 99;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.header-brand[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  letter-spacing: 0.3px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.header-user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.header-user-name[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.header-role-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 6px;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n}\n.header-logout[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, 0.4) !important;\n  color: white !important;\n  font-size: 0.8rem;\n  padding: 0.3rem 0.75rem;\n}\n.header-logout[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15) !important;\n  border-color: rgba(255, 255, 255, 0.6) !important;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #f1f5f9;\n  padding-bottom: 4rem;\n  overflow-y: auto;\n}\n.app-footer[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 98;\n  background: white;\n  border-top: 1px solid #e2e8f0;\n  padding: 0.75rem 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1.5rem;\n  font-size: 0.8rem;\n  color: #64748b;\n}\n.footer-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  color: #334155;\n  letter-spacing: 0.5px;\n}\n.footer-logo-placeholder[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border: 1.5px dashed #94a3b8;\n  border-radius: 6px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n@media (max-width: 768px) {\n  .top-header[_ngcontent-%COMP%] {\n    padding: 0 1rem;\n  }\n  .header-user-name[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .header-role-badge[_ngcontent-%COMP%] {\n    font-size: 9px;\n    padding: 1px 6px;\n  }\n  .app-footer[_ngcontent-%COMP%] {\n    padding: 0.5rem 1rem;\n    font-size: 0.7rem;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n  }\n}\n@media (max-width: 480px) {\n  .header-right[_ngcontent-%COMP%] {\n    gap: 0.4rem;\n  }\n  .header-brand[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  .header-logout[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n/*# sourceMappingURL=content-layout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContentLayoutComponent, { className: "ContentLayoutComponent", filePath: "app\\features\\shared\\layouts\\content-layout.component.ts", lineNumber: 136 });
})();
export {
  ContentLayoutComponent
};
//# sourceMappingURL=chunk-7NKGEESH.js.map
