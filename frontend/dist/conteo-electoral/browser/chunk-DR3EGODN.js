import "./chunk-S2GG3DE6.js";
import "./chunk-7OWRCG7O.js";
import "./chunk-LG7Z2WBF.js";
import "./chunk-KZU2HTPH.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-27N6N5MO.js";
import {
  ApiService
} from "./chunk-QBYPS4NP.js";
import {
  CommonModule,
  DecimalPipe,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3DSQS3EE.js";
import {
  __spreadValues
} from "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/circunscripciones/circunscripciones.component.ts
function CircunscripcionesComponent_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function CircunscripcionesComponent_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreate());
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "+");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nueva Circunscripci\xF3n ");
    \u0275\u0275elementEnd();
  }
}
function CircunscripcionesComponent_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r3 = ctx.$implicit;
    \u0275\u0275property("value", e_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r3.nombre);
  }
}
function CircunscripcionesComponent_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span", 36);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "span", 37);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 38);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "span", 39);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td")(21, "div", 40)(22, "button", 41);
    \u0275\u0275text(23, "Acciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "ul", 42)(25, "li")(26, "a", 43);
    \u0275\u0275listener("click", function CircunscripcionesComponent_tr_29_Template_a_click_26_listener($event) {
      const c_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.openEdit(c_r5));
    });
    \u0275\u0275text(27, "Editar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "li")(29, "a", 43);
    \u0275\u0275listener("click", function CircunscripcionesComponent_tr_29_Template_a_click_29_listener($event) {
      const c_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.calcular(c_r5.id));
    });
    \u0275\u0275text(30, "Calcular D'Hondt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "li")(32, "a", 43);
    \u0275\u0275listener("click", function CircunscripcionesComponent_tr_29_Template_a_click_32_listener($event) {
      const c_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.verResultados(c_r5.id));
    });
    \u0275\u0275text(33, "Ver Resultados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "li")(35, "a", 44);
    \u0275\u0275listener("click", function CircunscripcionesComponent_tr_29_Template_a_click_35_listener($event) {
      const c_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.delete(c_r5.id));
    });
    \u0275\u0275text(36, "Eliminar");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r5.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.codigo || "-");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r5.tipoCircunscripcionNombre || c_r5.tipoCircunscripcionCodigo || "-");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r5.escanos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.umbralElectoral != null ? c_r5.umbralElectoral + "%" : "0%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r5.metodoAsignacion);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-success", c_r5.activa)("bg-danger", !c_r5.activa);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r5.activa ? "S\xED" : "No", " ");
  }
}
function CircunscripcionesComponent_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 45);
    \u0275\u0275text(2, "No hay circunscripciones para esta elecci\xF3n");
    \u0275\u0275elementEnd()();
  }
}
function CircunscripcionesComponent_option_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r6 = ctx.$implicit;
    \u0275\u0275property("value", t_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r6.nombre);
  }
}
function CircunscripcionesComponent_div_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275element(1, "div", 47);
    \u0275\u0275elementStart(2, "p", 48);
    \u0275\u0275text(3, "Calculando distribuci\xF3n D'Hondt...");
    \u0275\u0275elementEnd()();
  }
}
function CircunscripcionesComponent_div_88_table_16_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 54);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "span", 55);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td")(15, "small", 54);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r7.partidoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r7.partidoSigla);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 6, a_r7.votosValidos));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", a_r7.porcentajeVotos, "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r7.escanosAsignados);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r7.cocientes.join(", "));
  }
}
function CircunscripcionesComponent_div_88_table_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 7)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Esca\xF1os");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Cocientes");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275template(14, CircunscripcionesComponent_div_88_table_16_tr_14_Template, 17, 8, "tr", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r1.resultado.asignaciones);
  }
}
function CircunscripcionesComponent_div_88_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Ning\xFAn partido super\xF3 el umbral del ", ctx_r1.resultado.umbralElectoral, "%. ");
  }
}
function CircunscripcionesComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 49)(2, "div", 50)(3, "div", 51)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 50)(7, "div", 51);
    \u0275\u0275text(8, "Esca\xF1os: ");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 50)(12, "div", 51);
    \u0275\u0275text(13, "Votos V\xE1lidos: ");
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(16, CircunscripcionesComponent_div_88_table_16_Template, 15, 1, "table", 52)(17, CircunscripcionesComponent_div_88_div_17_Template, 2, 1, "div", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.resultado.circunscripcionNombre);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.resultado.totalEscanos);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.resultado.totalVotosValidos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.resultado.asignaciones.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.resultado.asignaciones.length === 0);
  }
}
var CircunscripcionesComponent = class _CircunscripcionesComponent {
  constructor(api) {
    this.api = api;
    this.elecciones = [];
    this.selectedEleccionId = 0;
    this.circunscripciones = [];
    this.showModal = false;
    this.editing = false;
    this.selected = {};
    this.tiposCircunscripcion = [];
    this.resultado = null;
    this.resultadoCircId = 0;
    this.loading = false;
  }
  ngOnInit() {
    this.api.getElecciones().subscribe((data) => {
      this.elecciones = data;
      if (data.length > 0) {
        this.selectedEleccionId = data[0].id;
        this.loadCircunscripciones();
      }
    });
    this.api.getTiposCircunscripcion().subscribe((data) => this.tiposCircunscripcion = data);
  }
  loadCircunscripciones() {
    if (this.selectedEleccionId) {
      this.api.getCircunscripcionesByEleccion(this.selectedEleccionId).subscribe((data) => this.circunscripciones = data);
    }
  }
  openCreate() {
    this.editing = false;
    this.selected = { eleccionId: this.selectedEleccionId, escanos: 1, umbralElectoral: 0, metodoAsignacion: "D_HONDT", activa: true };
    this.showModal = true;
  }
  openEdit(c) {
    this.editing = true;
    this.selected = __spreadValues({}, c);
    this.showModal = true;
  }
  save() {
    if (!this.selected.nombre)
      return;
    if (this.editing && this.selected.id) {
      this.api.updateCircunscripcion(this.selected.id, this.selected).subscribe(() => {
        this.showModal = false;
        this.loadCircunscripciones();
      });
    } else {
      this.api.createCircunscripcion(this.selected).subscribe(() => {
        this.showModal = false;
        this.loadCircunscripciones();
      });
    }
  }
  delete(id) {
    if (confirm("Eliminar esta circunscripci\xF3n?")) {
      this.api.deleteCircunscripcion(id).subscribe(() => this.loadCircunscripciones());
    }
  }
  calcular(id) {
    this.loading = true;
    this.resultadoCircId = id;
    this.resultado = null;
    this.api.calcularDHondt(id).subscribe({
      next: (r) => {
        this.resultado = r;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  verResultados(id) {
    this.resultadoCircId = id;
    this.resultado = null;
    this.api.consultarResultadosDHondt(id).subscribe({
      next: (r) => this.resultado = r,
      error: () => {
      }
    });
  }
  cerrarResultados() {
    this.resultado = null;
    this.resultadoCircId = 0;
  }
  static {
    this.\u0275fac = function CircunscripcionesComponent_Factory(t) {
      return new (t || _CircunscripcionesComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CircunscripcionesComponent, selectors: [["app-circunscripciones"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 92, vars: 25, consts: [[1, "page-container"], [1, "page-header"], ["class", "btn btn-primary", 3, "click", 4, "ngIf"], [1, "filters-bar"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "table-container"], [1, "table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "modal"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], [1, "row"], [1, "col-md-6", "mb-3"], [1, "form-label"], ["placeholder", "Ej: Circunscripci\xF3n 1", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-md-3", "mb-3"], ["placeholder", "Ej: CIR-1", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "col-md-4", "mb-3"], ["type", "number", "min", "1", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "number", "step", "0.01", "min", "0", "max", "100", 1, "form-control", 3, "ngModelChange", "ngModel"], ["value", "D_HONDT"], ["value", "HARE"], ["value", "SAINTE_LAGUE"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "text-center py-4", 4, "ngIf"], [1, "btn", "btn-primary", 3, "click"], [1, "badge", "bg-info"], [1, "badge", "bg-primary"], [1, "badge", "bg-secondary"], [1, "badge"], [1, "dropdown"], ["data-bs-toggle", "dropdown", 1, "btn", "btn-sm", "btn-outline-secondary", "dropdown-toggle"], [1, "dropdown-menu"], ["href", "#", 1, "dropdown-item", 3, "click"], ["href", "#", 1, "dropdown-item", "text-danger", 3, "click"], ["colspan", "8", 1, "text-center", "text-muted"], [1, "text-center", "py-4"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "mt-2"], [1, "row", "mb-3"], [1, "col-md-4"], [1, "card", "text-center", "p-2"], ["class", "table", 4, "ngIf"], ["class", "alert alert-warning", 4, "ngIf"], [1, "text-muted"], [1, "badge", "bg-success", "fs-6"], [1, "alert", "alert-warning"]], template: function CircunscripcionesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Circunscripciones");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, CircunscripcionesComponent_button_4_Template, 4, 0, "button", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 3)(6, "select", 4);
        \u0275\u0275twoWayListener("ngModelChange", function CircunscripcionesComponent_Template_select_ngModelChange_6_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedEleccionId, $event) || (ctx.selectedEleccionId = $event);
          return $event;
        });
        \u0275\u0275listener("change", function CircunscripcionesComponent_Template_select_change_6_listener() {
          return ctx.loadCircunscripciones();
        });
        \u0275\u0275template(7, CircunscripcionesComponent_option_7_Template, 2, 2, "option", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 6)(9, "table", 7)(10, "thead")(11, "tr")(12, "th");
        \u0275\u0275text(13, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "th");
        \u0275\u0275text(15, "C\xF3digo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th");
        \u0275\u0275text(17, "Tipo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th");
        \u0275\u0275text(19, "Esca\xF1os");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "th");
        \u0275\u0275text(21, "Umbral %");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "th");
        \u0275\u0275text(23, "M\xE9todo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "th");
        \u0275\u0275text(25, "Activa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "th");
        \u0275\u0275text(27, "Acciones");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "tbody");
        \u0275\u0275template(29, CircunscripcionesComponent_tr_29_Template, 37, 11, "tr", 8)(30, CircunscripcionesComponent_tr_30_Template, 3, 0, "tr", 9);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(31, "div", 10)(32, "div", 11)(33, "div", 12)(34, "div", 13)(35, "h5", 14);
        \u0275\u0275text(36);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "button", 15);
        \u0275\u0275listener("click", function CircunscripcionesComponent_Template_button_click_37_listener() {
          return ctx.showModal = false;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "div", 16)(39, "div", 17)(40, "div", 18)(41, "label", 19);
        \u0275\u0275text(42, "Nombre *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "input", 20);
        \u0275\u0275twoWayListener("ngModelChange", function CircunscripcionesComponent_Template_input_ngModelChange_43_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selected.nombre, $event) || (ctx.selected.nombre = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 21)(45, "label", 19);
        \u0275\u0275text(46, "C\xF3digo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "input", 22);
        \u0275\u0275twoWayListener("ngModelChange", function CircunscripcionesComponent_Template_input_ngModelChange_47_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selected.codigo, $event) || (ctx.selected.codigo = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "div", 21)(49, "label", 19);
        \u0275\u0275text(50, "Tipo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "select", 23);
        \u0275\u0275twoWayListener("ngModelChange", function CircunscripcionesComponent_Template_select_ngModelChange_51_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selected.tipoCircunscripcionId, $event) || (ctx.selected.tipoCircunscripcionId = $event);
          return $event;
        });
        \u0275\u0275elementStart(52, "option", 24);
        \u0275\u0275text(53, "Sin tipo");
        \u0275\u0275elementEnd();
        \u0275\u0275template(54, CircunscripcionesComponent_option_54_Template, 2, 2, "option", 5);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(55, "div", 17)(56, "div", 25)(57, "label", 19);
        \u0275\u0275text(58, "Esca\xF1os");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "input", 26);
        \u0275\u0275twoWayListener("ngModelChange", function CircunscripcionesComponent_Template_input_ngModelChange_59_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selected.escanos, $event) || (ctx.selected.escanos = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(60, "div", 25)(61, "label", 19);
        \u0275\u0275text(62, "Umbral Electoral (%)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "input", 27);
        \u0275\u0275twoWayListener("ngModelChange", function CircunscripcionesComponent_Template_input_ngModelChange_63_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selected.umbralElectoral, $event) || (ctx.selected.umbralElectoral = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(64, "div", 25)(65, "label", 19);
        \u0275\u0275text(66, "M\xE9todo de Asignaci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "select", 23);
        \u0275\u0275twoWayListener("ngModelChange", function CircunscripcionesComponent_Template_select_ngModelChange_67_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selected.metodoAsignacion, $event) || (ctx.selected.metodoAsignacion = $event);
          return $event;
        });
        \u0275\u0275elementStart(68, "option", 28);
        \u0275\u0275text(69, "D'Hondt");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "option", 29);
        \u0275\u0275text(71, "Hare");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "option", 30);
        \u0275\u0275text(73, "Sainte-Lagu\xEB");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(74, "div", 31)(75, "button", 32);
        \u0275\u0275listener("click", function CircunscripcionesComponent_Template_button_click_75_listener() {
          return ctx.showModal = false;
        });
        \u0275\u0275text(76, "Cancelar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "button", 33);
        \u0275\u0275listener("click", function CircunscripcionesComponent_Template_button_click_77_listener() {
          return ctx.save();
        });
        \u0275\u0275text(78, "Guardar");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(79, "div", 10)(80, "div", 11)(81, "div", 12)(82, "div", 13)(83, "h5", 14);
        \u0275\u0275text(84, "Resultados D'Hondt");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "button", 15);
        \u0275\u0275listener("click", function CircunscripcionesComponent_Template_button_click_85_listener() {
          return ctx.cerrarResultados();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(86, "div", 16);
        \u0275\u0275template(87, CircunscripcionesComponent_div_87_Template, 4, 0, "div", 34)(88, CircunscripcionesComponent_div_88_Template, 18, 5, "div", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(89, "div", 31)(90, "button", 32);
        \u0275\u0275listener("click", function CircunscripcionesComponent_Template_button_click_90_listener() {
          return ctx.cerrarResultados();
        });
        \u0275\u0275text(91, "Cerrar");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.selectedEleccionId);
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedEleccionId);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.elecciones);
        \u0275\u0275advance(22);
        \u0275\u0275property("ngForOf", ctx.circunscripciones);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.circunscripciones.length === 0);
        \u0275\u0275advance();
        \u0275\u0275styleProp("display", ctx.showModal ? "block" : "none");
        \u0275\u0275classProp("show", ctx.showModal);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("", ctx.editing ? "Editar" : "Nueva", " Circunscripci\xF3n");
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.selected.nombre);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selected.codigo);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selected.tipoCircunscripcionId);
        \u0275\u0275advance();
        \u0275\u0275property("value", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.tiposCircunscripcion);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.selected.escanos);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selected.umbralElectoral);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selected.metodoAsignacion);
        \u0275\u0275advance(10);
        \u0275\u0275property("disabled", !ctx.selected.nombre);
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("display", ctx.resultado != null || ctx.loading ? "block" : "none");
        \u0275\u0275classProp("show", ctx.resultado != null || ctx.loading);
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.resultado);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CircunscripcionesComponent, { className: "CircunscripcionesComponent", filePath: "app\\features\\admin\\pages\\circunscripciones\\circunscripciones.component.ts", lineNumber: 12 });
})();
export {
  CircunscripcionesComponent
};
//# sourceMappingURL=chunk-DR3EGODN.js.map
