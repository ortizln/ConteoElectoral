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
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
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

// src/app/features/admin/pages/papeletas/papeletas.component.ts
function PapeletasComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "button", 14);
    \u0275\u0275listener("click", function PapeletasComponent_div_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generar());
    });
    \u0275\u0275element(2, "i", 15);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 16);
    \u0275\u0275listener("click", function PapeletasComponent_div_4_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.regenerar());
    });
    \u0275\u0275element(5, "i", 17);
    \u0275\u0275text(6, " Regenerar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.generando);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.generando ? "Generando..." : "Generar Papeletas", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.generando);
  }
}
function PapeletasComponent_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function PapeletasComponent_button_12_Template_button_click_0_listener() {
      const e_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectEleccion(e_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "small", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", (ctx_r1.selectedEleccion == null ? null : ctx_r1.selectedEleccion.id) === e_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", e_r4.nombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r4.activa ? "Activa" : "Inactiva");
  }
}
function PapeletasComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "div", 21);
    \u0275\u0275elementEnd();
  }
}
function PapeletasComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 22);
    \u0275\u0275text(2, " Seleccione una elecci\xF3n para ver sus papeletas ");
    \u0275\u0275elementEnd()();
  }
}
function PapeletasComponent_div_16_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275element(4, "i");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const op_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(op_r5.orden);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("bi ", ctx_r1.getOptionIcon(op_r5.tipoOpcion), " me-2");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", op_r5.etiqueta, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(op_r5.tipoOpcion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(op_r5.partidoSigla || "-");
  }
}
function PapeletasComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "span")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 26)(8, "table", 27)(9, "thead")(10, "tr")(11, "th");
    \u0275\u0275text(12, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Opci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "Partido");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275template(20, PapeletasComponent_div_16_tr_20_Template, 11, 7, "tr", 28);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r6.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r6.tipoVotacion);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", p_r6.opciones);
  }
}
function PapeletasComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 22);
    \u0275\u0275text(2, ' No hay papeletas generadas para esta elecci\xF3n. Presione "Generar Papeletas". ');
    \u0275\u0275elementEnd()();
  }
}
var PapeletasComponent = class _PapeletasComponent {
  constructor(api) {
    this.api = api;
    this.elecciones = [];
    this.selectedEleccion = null;
    this.papeletas = [];
    this.loading = false;
    this.generando = false;
  }
  ngOnInit() {
    this.api.getElecciones().subscribe((data) => this.elecciones = data);
  }
  selectEleccion(eleccion) {
    this.selectedEleccion = eleccion;
    this.loadPapeletas();
  }
  loadPapeletas() {
    if (!this.selectedEleccion)
      return;
    this.loading = true;
    this.api.getPapeletasByEleccion(this.selectedEleccion.id).subscribe({
      next: (data) => {
        this.papeletas = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  generar() {
    if (!this.selectedEleccion)
      return;
    this.generando = true;
    this.api.generarPapeletas(this.selectedEleccion.id).subscribe({
      next: (data) => {
        this.papeletas = data;
        this.generando = false;
      },
      error: () => this.generando = false
    });
  }
  regenerar() {
    if (!this.selectedEleccion || !confirm("\xBFRegenerar todas las papeletas? Se perder\xE1n los cambios manuales."))
      return;
    this.generando = true;
    this.api.regenerarPapeletas(this.selectedEleccion.id).subscribe({
      next: (data) => {
        this.papeletas = data;
        this.generando = false;
      },
      error: () => this.generando = false
    });
  }
  getOptionIcon(tipo) {
    switch (tipo) {
      case "CANDIDATO":
        return "bi-person-badge";
      case "PARTIDO":
        return "bi-people";
      case "NULO":
        return "bi-x-circle";
      case "BLANCO":
        return "bi-square";
      default:
        return "bi-question-circle";
    }
  }
  static {
    this.\u0275fac = function PapeletasComponent_Factory(t) {
      return new (t || _PapeletasComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PapeletasComponent, selectors: [["app-papeletas"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 18, vars: 6, consts: [[1, "container-fluid", "mt-3"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "mb-0"], [4, "ngIf"], [1, "row"], [1, "col-md-3"], [1, "card"], [1, "card-header"], [1, "list-group", "list-group-flush"], ["class", "list-group-item list-group-item-action", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "col-md-9"], ["class", "text-center py-4", 4, "ngIf"], ["class", "card", 4, "ngIf"], ["class", "card mb-3", 4, "ngFor", "ngForOf"], [1, "btn", "btn-success", "me-2", 3, "click", "disabled"], [1, "bi", "bi-plus-circle"], [1, "btn", "btn-warning", 3, "click", "disabled"], [1, "bi", "bi-arrow-clockwise"], [1, "list-group-item", "list-group-item-action", 3, "click"], [1, "d-block", "text-muted"], [1, "text-center", "py-4"], ["role", "status", 1, "spinner-border"], [1, "card-body", "text-center", "text-muted", "py-5"], [1, "card", "mb-3"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "badge", "bg-info"], [1, "card-body", "p-0"], [1, "table", "table-hover", "mb-0"], [4, "ngFor", "ngForOf"], [1, "badge", "bg-secondary"]], template: function PapeletasComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h4", 2);
        \u0275\u0275text(3, "Papeletas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, PapeletasComponent_div_4_Template, 7, 3, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "div", 7)(9, "strong");
        \u0275\u0275text(10, "Elecciones");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 8);
        \u0275\u0275template(12, PapeletasComponent_button_12_Template, 4, 4, "button", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(13, "div", 10);
        \u0275\u0275template(14, PapeletasComponent_div_14_Template, 2, 0, "div", 11)(15, PapeletasComponent_div_15_Template, 3, 0, "div", 12)(16, PapeletasComponent_div_16_Template, 21, 3, "div", 13)(17, PapeletasComponent_div_17_Template, 3, 0, "div", 12);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.selectedEleccion);
        \u0275\u0275advance(8);
        \u0275\u0275property("ngForOf", ctx.elecciones);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.selectedEleccion && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.papeletas);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedEleccion && ctx.papeletas.length === 0 && !ctx.loading);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PapeletasComponent, { className: "PapeletasComponent", filePath: "app\\features\\admin\\pages\\papeletas\\papeletas.component.ts", lineNumber: 12 });
})();
export {
  PapeletasComponent
};
//# sourceMappingURL=chunk-XENEFXQM.js.map
