import {
  FormsModule
} from "./chunk-27N6N5MO.js";
import {
  ApiService
} from "./chunk-QBYPS4NP.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3DSQS3EE.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/roles/roles.component.ts
function RolesComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function RolesComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.success);
  }
}
function RolesComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function RolesComponent_button_7_Template_button_click_0_listener() {
      const r_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectRol(r_r3.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.selectedRolId === r_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r3.nombre, " ");
  }
}
function RolesComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "Cargando permisos...");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_div_9_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 15)(4, "button", 18);
    \u0275\u0275listener("click", function RolesComponent_div_9_tr_15_Template_button_click_4_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePermiso(p_r5, "puedeVer"));
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 15)(7, "button", 18);
    \u0275\u0275listener("click", function RolesComponent_div_9_tr_15_Template_button_click_7_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePermiso(p_r5, "puedeCrear"));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 15)(10, "button", 18);
    \u0275\u0275listener("click", function RolesComponent_div_9_tr_15_Template_button_click_10_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePermiso(p_r5, "puedeEditar"));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 15)(13, "button", 18);
    \u0275\u0275listener("click", function RolesComponent_div_9_tr_15_Template_button_click_13_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePermiso(p_r5, "puedeEliminar"));
    });
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.modulo);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", p_r5.puedeVer);
    \u0275\u0275property("disabled", ctx_r0.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r5.puedeVer ? "\u2713" : "\u2717", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", p_r5.puedeCrear);
    \u0275\u0275property("disabled", ctx_r0.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r5.puedeCrear ? "\u2713" : "\u2717", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", p_r5.puedeEditar);
    \u0275\u0275property("disabled", ctx_r0.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r5.puedeEditar ? "\u2713" : "\u2717", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", p_r5.puedeEliminar);
    \u0275\u0275property("disabled", ctx_r0.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r5.puedeEliminar ? "\u2713" : "\u2717", " ");
  }
}
function RolesComponent_div_9_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, "Guardando...");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "table", 14)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "M\xF3dulo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 15);
    \u0275\u0275text(7, "Ver");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 15);
    \u0275\u0275text(9, "Crear");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 15);
    \u0275\u0275text(11, "Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 15);
    \u0275\u0275text(13, "Eliminar");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, RolesComponent_div_9_tr_15_Template, 15, 17, "tr", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(16, RolesComponent_div_9_p_16_Template, 2, 0, "p", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r0.permisos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.saving);
  }
}
function RolesComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, " No hay permisos configurados para este rol. ");
    \u0275\u0275elementEnd();
  }
}
var RolesComponent = class _RolesComponent {
  constructor(api) {
    this.api = api;
    this.roles = [];
    this.permisos = [];
    this.selectedRolId = null;
    this.loading = false;
    this.saving = false;
    this.error = "";
    this.success = "";
  }
  ngOnInit() {
    this.loadRoles();
  }
  loadRoles() {
    this.api.getRoles().subscribe({
      next: (r) => {
        this.roles = r;
        if (r.length > 0) {
          this.selectedRolId = r[0].id;
          this.loadPermisos();
        }
      },
      error: () => this.error = "Error al cargar roles"
    });
  }
  loadPermisos() {
    if (!this.selectedRolId)
      return;
    this.loading = true;
    this.api.getPermisosByRol(this.selectedRolId).subscribe({
      next: (r) => {
        this.permisos = r;
        this.loading = false;
      },
      error: () => {
        this.error = "Error al cargar permisos";
        this.loading = false;
      }
    });
  }
  selectRol(id) {
    this.selectedRolId = id;
    this.loadPermisos();
  }
  togglePermiso(permiso, field) {
    const update = { [field]: !permiso[field] };
    this.saving = true;
    this.api.updatePermiso(permiso.id, update).subscribe({
      next: (r) => {
        Object.assign(permiso, r);
        this.saving = false;
        this.success = "Permiso actualizado";
        setTimeout(() => this.success = "", 2e3);
      },
      error: () => {
        this.error = "Error al actualizar permiso";
        this.saving = false;
      }
    });
  }
  static {
    this.\u0275fac = function RolesComponent_Factory(t) {
      return new (t || _RolesComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RolesComponent, selectors: [["app-roles"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 6, consts: [[1, "roles-container"], [1, "page-header"], ["class", "alert alert-error", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [1, "roles-tabs"], ["class", "tab-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "loading", 4, "ngIf"], ["class", "permisos-table-card", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "alert", "alert-error"], [1, "alert", "alert-success"], [1, "tab-btn", 3, "click"], [1, "loading"], [1, "permisos-table-card"], [1, "table"], [1, "text-center"], [4, "ngFor", "ngForOf"], ["class", "saving-text", 4, "ngIf"], [1, "toggle-btn", 3, "click", "disabled"], [1, "saving-text"], [1, "empty-state"]], template: function RolesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Roles y Permisos");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(4, RolesComponent_div_4_Template, 2, 1, "div", 2)(5, RolesComponent_div_5_Template, 2, 1, "div", 3);
        \u0275\u0275elementStart(6, "div", 4);
        \u0275\u0275template(7, RolesComponent_button_7_Template, 2, 3, "button", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(8, RolesComponent_div_8_Template, 2, 0, "div", 6)(9, RolesComponent_div_9_Template, 17, 2, "div", 7)(10, RolesComponent_div_10_Template, 2, 0, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.success);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.roles);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.permisos.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.permisos.length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule], styles: ["\n\n.roles-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1000px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 700;\n  color: #1e293b;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #059669;\n  border: 1px solid #a7f3d0;\n}\n.roles-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 24px;\n  border-bottom: 2px solid #e2e8f0;\n  padding-bottom: 0;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  background: none;\n  font-size: 14px;\n  font-weight: 500;\n  color: #64748b;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  transition: all 0.2s;\n}\n.tab-btn[_ngcontent-%COMP%]:hover {\n  color: #4F46E5;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  color: #4F46E5;\n  border-bottom-color: #4F46E5;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #64748b;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #94a3b8;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.permisos-table-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 2px solid #e2e8f0;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  font-size: 14px;\n  color: #334155;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #f8fafc;\n}\n.text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  background: white;\n  font-size: 16px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.toggle-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #4F46E5;\n}\n.toggle-btn.active[_ngcontent-%COMP%] {\n  background: #4F46E5;\n  border-color: #4F46E5;\n  color: white;\n}\n.toggle-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.saving-text[_ngcontent-%COMP%] {\n  margin: 12px 0 0;\n  font-size: 13px;\n  color: #64748b;\n  font-style: italic;\n}\n/*# sourceMappingURL=roles.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RolesComponent, { className: "RolesComponent", filePath: "app\\features\\admin\\pages\\roles\\roles.component.ts", lineNumber: 14 });
})();
export {
  RolesComponent
};
//# sourceMappingURL=chunk-L4I6OOAJ.js.map
