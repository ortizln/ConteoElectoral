import {
  ApiService
} from "./chunk-5ZU65LVT.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-XIYYPGDW.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
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
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7A5LCT4I.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/asignar-mesas/asignar-mesas.component.ts
function AsignarMesasComponent_option_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r1 = ctx.$implicit;
    \u0275\u0275property("value", e_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r1.nombre);
  }
}
function AsignarMesasComponent_option_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r2 = ctx.$implicit;
    \u0275\u0275property("value", m_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", m_r2.nombre, " ", m_r2.apellido, "");
  }
}
function AsignarMesasComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 17)(2, "div", 18)(3, "strong");
    \u0275\u0275text(4, "Miembro:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "span", 19);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", (tmp_1_0 = ctx_r2.getMiembroSeleccionado()) == null ? null : tmp_1_0.nombre, " ", (tmp_1_0 = ctx_r2.getMiembroSeleccionado()) == null ? null : tmp_1_0.apellido, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r2.getMiembroSeleccionado()) == null ? null : tmp_2_0.username);
  }
}
function AsignarMesasComponent_tr_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "button", 20);
    \u0275\u0275listener("click", function AsignarMesasComponent_tr_37_Template_button_click_6_listener() {
      const m_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.asignarMesa(m_r5));
    });
    \u0275\u0275text(7, "Asignar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r5.numero);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r5.institucionNombre);
  }
}
function AsignarMesasComponent_tr_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 21);
    \u0275\u0275text(2, "No hay mesas disponibles");
    \u0275\u0275elementEnd()();
  }
}
function AsignarMesasComponent_tr_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "button", 22);
    \u0275\u0275listener("click", function AsignarMesasComponent_tr_55_Template_button_click_6_listener() {
      const m_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.desasignarMesa(m_r7));
    });
    \u0275\u0275text(7, "Quitar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r7.numero);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r7.institucionNombre);
  }
}
function AsignarMesasComponent_tr_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 21);
    \u0275\u0275text(2, "No hay mesas asignadas");
    \u0275\u0275elementEnd()();
  }
}
var AsignarMesasComponent = class _AsignarMesasComponent {
  constructor(api) {
    this.api = api;
    this.elecciones = [];
    this.miembros = [];
    this.mesasDisponibles = [];
    this.mesasAsignadas = [];
    this.todasMesas = [];
    this.eleccionId = null;
    this.usuarioId = null;
  }
  ngOnInit() {
    this.api.getEleccionesActivas().subscribe((e) => {
      this.elecciones = e;
      if (e.length > 0) {
        this.eleccionId = e[0].id;
        this.onEleccionChange();
      }
    });
    this.api.getUsuariosByRol("MIEMBRO_MESA").subscribe((m) => this.miembros = m);
  }
  onEleccionChange() {
    if (this.eleccionId) {
      this.api.getMesasByEleccion(this.eleccionId).subscribe((mesas) => {
        this.todasMesas = mesas;
        if (this.usuarioId) {
          this.onUsuarioChange();
        }
      });
    }
  }
  onUsuarioChange() {
    if (this.usuarioId && this.eleccionId) {
      this.api.getMesasByEleccion(this.eleccionId).subscribe((mesas) => {
        this.todasMesas = mesas;
        this.api.getMesasByUsuario(this.usuarioId, this.eleccionId).subscribe((asignadas) => {
          const idsAsignadas = asignadas.map((m) => m.id);
          this.mesasAsignadas = asignadas;
          this.mesasDisponibles = mesas.filter((m) => !idsAsignadas.includes(m.id) && !m.cerrada);
        });
      });
    } else {
      this.mesasAsignadas = [];
      this.mesasDisponibles = [];
    }
  }
  asignarMesa(mesa) {
    if (this.usuarioId) {
      this.api.asignarUsuarioAMesa(mesa.id, this.usuarioId).subscribe({
        next: () => this.onUsuarioChange(),
        error: (err) => alert(err.error?.message || "Error al asignar la mesa")
      });
    }
  }
  desasignarMesa(mesa) {
    if (this.usuarioId && confirm("Quitar asignacion de esta mesa?")) {
      this.api.desasignarUsuarioDeMesa(mesa.id, this.usuarioId).subscribe(() => {
        this.onUsuarioChange();
      });
    }
  }
  getMiembroSeleccionado() {
    return this.miembros.find((m) => m.id === this.usuarioId);
  }
  static {
    this.\u0275fac = function AsignarMesasComponent_Factory(t) {
      return new (t || _AsignarMesasComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AsignarMesasComponent, selectors: [["app-asignar-mesas"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 57, vars: 11, consts: [[1, "container"], [1, "page-header"], [1, "filters-bar", "mb-4"], [1, "filter-item"], [1, "form-select", 3, "change", "ngModelChange", "ngModel"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "row", 4, "ngIf"], [1, "row"], [1, "col-md-6"], [1, "card"], [1, "card-header"], [1, "card-body", 2, "max-height", "400px", "overflow-y", "auto"], [1, "table", "table-hover"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "value"], [1, "col-12"], [1, "alert", "alert-info"], [1, "badge", "bg-primary"], [1, "btn", "btn-sm", "btn-primary", 3, "click"], ["colspan", "3", 1, "text-center", "text-muted"], [1, "btn", "btn-sm", "btn-danger", 3, "click"]], template: function AsignarMesasComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Asignar Mesas a Miembros");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 2)(5, "div", 3)(6, "label");
        \u0275\u0275text(7, "Elecci\xF3n:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "select", 4);
        \u0275\u0275listener("change", function AsignarMesasComponent_Template_select_change_8_listener() {
          return ctx.onEleccionChange();
        });
        \u0275\u0275twoWayListener("ngModelChange", function AsignarMesasComponent_Template_select_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.eleccionId, $event) || (ctx.eleccionId = $event);
          return $event;
        });
        \u0275\u0275elementStart(9, "option", 5);
        \u0275\u0275text(10, "Seleccione una elecci\xF3n...");
        \u0275\u0275elementEnd();
        \u0275\u0275template(11, AsignarMesasComponent_option_11_Template, 2, 2, "option", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 3)(13, "label");
        \u0275\u0275text(14, "Miembro de Mesa:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "select", 4);
        \u0275\u0275listener("change", function AsignarMesasComponent_Template_select_change_15_listener() {
          return ctx.onUsuarioChange();
        });
        \u0275\u0275twoWayListener("ngModelChange", function AsignarMesasComponent_Template_select_ngModelChange_15_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.usuarioId, $event) || (ctx.usuarioId = $event);
          return $event;
        });
        \u0275\u0275elementStart(16, "option", 5);
        \u0275\u0275text(17, "Seleccione un miembro...");
        \u0275\u0275elementEnd();
        \u0275\u0275template(18, AsignarMesasComponent_option_18_Template, 2, 3, "option", 6);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(19, AsignarMesasComponent_div_19_Template, 8, 3, "div", 7);
        \u0275\u0275elementStart(20, "div", 8)(21, "div", 9)(22, "div", 10)(23, "div", 11)(24, "h5");
        \u0275\u0275text(25, "Mesas Disponibles");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 12)(27, "table", 13)(28, "thead")(29, "tr")(30, "th");
        \u0275\u0275text(31, "Mesa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "th");
        \u0275\u0275text(33, "Instituci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "th");
        \u0275\u0275text(35, "Acci\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(36, "tbody");
        \u0275\u0275template(37, AsignarMesasComponent_tr_37_Template, 8, 2, "tr", 14)(38, AsignarMesasComponent_tr_38_Template, 3, 0, "tr", 15);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(39, "div", 9)(40, "div", 10)(41, "div", 11)(42, "h5");
        \u0275\u0275text(43, "Mesas Asignadas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 12)(45, "table", 13)(46, "thead")(47, "tr")(48, "th");
        \u0275\u0275text(49, "Mesa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "th");
        \u0275\u0275text(51, "Instituci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "th");
        \u0275\u0275text(53, "Acci\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(54, "tbody");
        \u0275\u0275template(55, AsignarMesasComponent_tr_55_Template, 8, 2, "tr", 14)(56, AsignarMesasComponent_tr_56_Template, 3, 0, "tr", 15);
        \u0275\u0275elementEnd()()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.eleccionId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.elecciones);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.usuarioId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.miembros);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.getMiembroSeleccionado());
        \u0275\u0275advance(18);
        \u0275\u0275property("ngForOf", ctx.mesasDisponibles);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesasDisponibles.length === 0);
        \u0275\u0275advance(17);
        \u0275\u0275property("ngForOf", ctx.mesasAsignadas);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesasAsignadas.length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1e293b;\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.btn-with-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  padding: 16px;\n  background: #f8fafc;\n  border-radius: 12px;\n}\n.filter-item[_ngcontent-%COMP%] {\n  flex: 0 0 300px;\n}\n.filter-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.mb-4[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 2px solid #e2e8f0;\n  background: #f8fafc;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd) {\n  background: #f9fafb;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #4f46e5);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);\n  transform: translateY(-1px);\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  color: white;\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background: #d97706;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.bg-info[_ngcontent-%COMP%] {\n  background: #06b6d4 !important;\n  color: white !important;\n}\n.bg-primary[_ngcontent-%COMP%] {\n  background: #3b82f6 !important;\n  color: white !important;\n}\n.bg-warning[_ngcontent-%COMP%] {\n  background: #f59e0b !important;\n  color: white !important;\n}\n.bg-success[_ngcontent-%COMP%] {\n  background: #10b981 !important;\n  color: white !important;\n}\n.bg-danger[_ngcontent-%COMP%] {\n  background: #ef4444 !important;\n  color: white !important;\n}\n.bg-secondary[_ngcontent-%COMP%] {\n  background: #64748b !important;\n  color: white !important;\n}\n.form-select[_ngcontent-%COMP%], .form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.form-select[_ngcontent-%COMP%]:focus, .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  border-bottom: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #475569;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #cbd5e1;\n}\n/*# sourceMappingURL=asignar-mesas.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AsignarMesasComponent, { className: "AsignarMesasComponent", filePath: "app\\features\\admin\\pages\\asignar-mesas\\asignar-mesas.component.ts", lineNumber: 14 });
})();
export {
  AsignarMesasComponent
};
//# sourceMappingURL=chunk-DR6WXE4T.js.map
