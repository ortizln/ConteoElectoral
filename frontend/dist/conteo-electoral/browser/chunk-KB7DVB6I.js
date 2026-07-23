import "./chunk-S2GG3DE6.js";
import "./chunk-7OWRCG7O.js";
import "./chunk-LG7Z2WBF.js";
import "./chunk-KZU2HTPH.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
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

// src/app/features/admin/pages/reglas-negocio/reglas-negocio.component.ts
function ReglasNegocioComponent_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r1 = ctx.$implicit;
    \u0275\u0275property("value", m_r1.codigo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r1.nombre);
  }
}
function ReglasNegocioComponent_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    \u0275\u0275property("value", t_r2.codigo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2.nombre);
  }
}
function ReglasNegocioComponent_tr_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "br");
    \u0275\u0275elementStart(5, "small", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td")(8, "span", 44);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td")(11, "span", 45);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "small", 29);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td")(19, "div", 46)(20, "input", 47);
    \u0275\u0275listener("change", function ReglasNegocioComponent_tr_43_Template_input_change_20_listener() {
      const regla_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toggleActiva(regla_r4));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "td")(22, "div", 48)(23, "button", 49);
    \u0275\u0275text(24, "Acciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "ul", 50)(26, "li")(27, "a", 51);
    \u0275\u0275listener("click", function ReglasNegocioComponent_tr_43_Template_a_click_27_listener($event) {
      const regla_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r4.openEdit(regla_r4));
    });
    \u0275\u0275text(28, "Editar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "li")(30, "a", 52);
    \u0275\u0275listener("click", function ReglasNegocioComponent_tr_43_Template_a_click_30_listener($event) {
      const regla_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r4.delete(regla_r4.id));
    });
    \u0275\u0275text(31, "Eliminar");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const regla_r4 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(regla_r4.nombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(regla_r4.descripcion);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.getModuloNombre(regla_r4.modulo));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.getTipoNombre(regla_r4.tipo));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.getCondicionResumen(regla_r4.condicion));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(regla_r4.prioridad);
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", regla_r4.activa);
  }
}
function ReglasNegocioComponent_tr_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 53);
    \u0275\u0275text(2, "No hay reglas de negocio registradas");
    \u0275\u0275elementEnd()();
  }
}
function ReglasNegocioComponent_option_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r6 = ctx.$implicit;
    \u0275\u0275property("value", m_r6.codigo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r6.nombre);
  }
}
function ReglasNegocioComponent_option_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r7 = ctx.$implicit;
    \u0275\u0275property("value", t_r7.codigo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r7.nombre);
  }
}
function ReglasNegocioComponent_div_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "label", 22);
    \u0275\u0275text(2, "Vista previa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "pre", 54)(4, "code");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r4.condicionPreview);
  }
}
var ReglasNegocioComponent = class _ReglasNegocioComponent {
  constructor(api) {
    this.api = api;
    this.reglas = [];
    this.filteredReglas = [];
    this.showModal = false;
    this.editing = false;
    this.selectedRegla = {};
    this.filtroModulo = "";
    this.filtroTipo = "";
    this.filtroActiva = "";
    this.modulos = [];
    this.tipos = [];
    this.condicionPreview = "";
  }
  ngOnInit() {
    this.loadModulos();
    this.loadTipos();
    this.loadReglas();
  }
  loadModulos() {
    this.api.getModulosReglas().subscribe((data) => this.modulos = data);
  }
  loadTipos() {
    this.api.getTiposReglas().subscribe((data) => this.tipos = data);
  }
  loadReglas() {
    this.api.getReglasNegocio().subscribe((data) => {
      this.reglas = data;
      this.applyFilters();
    });
  }
  applyFilters() {
    this.filteredReglas = this.reglas.filter((r) => {
      if (this.filtroModulo && r.modulo !== this.filtroModulo)
        return false;
      if (this.filtroTipo && r.tipo !== this.filtroTipo)
        return false;
      if (this.filtroActiva !== "") {
        const activa = this.filtroActiva === "true";
        if (r.activa !== activa)
          return false;
      }
      return true;
    });
  }
  openCreate() {
    this.editing = false;
    this.selectedRegla = {
      tipo: "VALIDACION",
      modulo: "CANDIDATOS",
      activa: true,
      prioridad: 0,
      condicion: '{"condition":"AND","rules":[{"field":"","operator":"EQUALS","value":""}]}'
    };
    this.updateCondicionPreview();
    this.showModal = true;
  }
  openEdit(regla) {
    this.editing = true;
    this.selectedRegla = __spreadValues({}, regla);
    this.updateCondicionPreview();
    this.showModal = true;
  }
  save() {
    if (!this.selectedRegla.nombre || !this.selectedRegla.condicion)
      return;
    try {
      JSON.parse(this.selectedRegla.condicion);
    } catch {
      return;
    }
    if (this.editing && this.selectedRegla.id) {
      this.api.updateReglaNegocio(this.selectedRegla.id, this.selectedRegla).subscribe(() => {
        this.showModal = false;
        this.loadReglas();
      });
    } else {
      this.api.createReglaNegocio(this.selectedRegla).subscribe(() => {
        this.showModal = false;
        this.loadReglas();
      });
    }
  }
  delete(id) {
    if (confirm("\xBFEliminar esta regla de negocio?")) {
      this.api.deleteReglaNegocio(id).subscribe(() => this.loadReglas());
    }
  }
  toggleActiva(regla) {
    this.api.toggleReglaNegocio(regla.id).subscribe(() => this.loadReglas());
  }
  getModuloNombre(codigo) {
    return this.modulos.find((m) => m.codigo === codigo)?.nombre || codigo;
  }
  getTipoNombre(codigo) {
    return this.tipos.find((t) => t.codigo === codigo)?.nombre || codigo;
  }
  getCondicionResumen(condicion) {
    try {
      const obj = JSON.parse(condicion);
      const rules = obj.rules || [];
      return `${obj.condition || "AND"} (${rules.length} regla${rules.length !== 1 ? "s" : ""})`;
    } catch {
      return "JSON inv\xE1lido";
    }
  }
  updateCondicionPreview() {
    try {
      const obj = JSON.parse(this.selectedRegla.condicion || "{}");
      this.condicionPreview = JSON.stringify(obj, null, 2);
    } catch {
      this.condicionPreview = "JSON inv\xE1lido";
    }
  }
  validateCondicion() {
    try {
      JSON.parse(this.selectedRegla.condicion || "");
      return true;
    } catch {
      return false;
    }
  }
  static {
    this.\u0275fac = function ReglasNegocioComponent_Factory(t) {
      return new (t || _ReglasNegocioComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReglasNegocioComponent, selectors: [["app-reglas-negocio"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 110, vars: 26, consts: [[1, "page-container"], [1, "page-header"], [1, "btn", "btn-primary", 3, "click"], [1, "filters-bar"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["value", "true"], ["value", "false"], [1, "table-container"], [1, "table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "modal"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], [1, "row"], [1, "col-md-6", "mb-3"], [1, "form-label"], ["placeholder", "Nombre de la regla", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-md-3", "mb-3"], [1, "form-select", 3, "ngModelChange", "ngModel"], [1, "mb-3"], ["rows", "2", "placeholder", "Descripci\xF3n de la regla", 1, "form-control", 3, "ngModelChange", "ngModel"], ["rows", "4", "placeholder", '{"condition":"AND","rules":[{"field":"edad","operator":"GREATER_THAN_OR_EQUAL","value":18}]}', 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "text-muted"], ["class", "mb-3", 4, "ngIf"], [1, "col-md-4", "mb-3"], ["placeholder", "Ej: El valor no es v\xE1lido", 1, "form-control", 3, "ngModelChange", "ngModel"], ["value", "RECHAZAR"], ["value", "ADVERTIR"], ["value", "PERMITIR"], [1, "col-md-2", "mb-3"], ["type", "number", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-check", "form-switch", "mt-2"], ["type", "checkbox", 1, "form-check-input", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [3, "value"], [1, "badge", "bg-info"], [1, "badge", "bg-secondary"], [1, "form-check", "form-switch"], ["type", "checkbox", 1, "form-check-input", 3, "change", "checked"], [1, "dropdown"], ["data-bs-toggle", "dropdown", 1, "btn", "btn-sm", "btn-outline-secondary", "dropdown-toggle"], [1, "dropdown-menu"], ["href", "#", 1, "dropdown-item", 3, "click"], ["href", "#", 1, "dropdown-item", "text-danger", 3, "click"], ["colspan", "7", 1, "text-center", "text-muted"], [1, "bg-light", "p-2", "rounded"]], template: function ReglasNegocioComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Reglas de Negocio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 2);
        \u0275\u0275listener("click", function ReglasNegocioComponent_Template_button_click_4_listener() {
          return ctx.openCreate();
        });
        \u0275\u0275elementStart(5, "span");
        \u0275\u0275text(6, "+");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Nueva Regla ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 3)(9, "select", 4);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_select_ngModelChange_9_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtroModulo, $event) || (ctx.filtroModulo = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ReglasNegocioComponent_Template_select_change_9_listener() {
          return ctx.applyFilters();
        });
        \u0275\u0275elementStart(10, "option", 5);
        \u0275\u0275text(11, "Todos los m\xF3dulos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(12, ReglasNegocioComponent_option_12_Template, 2, 2, "option", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "select", 4);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_select_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtroTipo, $event) || (ctx.filtroTipo = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ReglasNegocioComponent_Template_select_change_13_listener() {
          return ctx.applyFilters();
        });
        \u0275\u0275elementStart(14, "option", 5);
        \u0275\u0275text(15, "Todos los tipos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, ReglasNegocioComponent_option_16_Template, 2, 2, "option", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "select", 4);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_select_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtroActiva, $event) || (ctx.filtroActiva = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ReglasNegocioComponent_Template_select_change_17_listener() {
          return ctx.applyFilters();
        });
        \u0275\u0275elementStart(18, "option", 5);
        \u0275\u0275text(19, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "option", 7);
        \u0275\u0275text(21, "Activas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "option", 8);
        \u0275\u0275text(23, "Inactivas");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(24, "div", 9)(25, "table", 10)(26, "thead")(27, "tr")(28, "th");
        \u0275\u0275text(29, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "th");
        \u0275\u0275text(31, "M\xF3dulo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "th");
        \u0275\u0275text(33, "Tipo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "th");
        \u0275\u0275text(35, "Condici\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "th");
        \u0275\u0275text(37, "Prioridad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "th");
        \u0275\u0275text(39, "Activa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "th");
        \u0275\u0275text(41, "Acciones");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(42, "tbody");
        \u0275\u0275template(43, ReglasNegocioComponent_tr_43_Template, 32, 7, "tr", 11)(44, ReglasNegocioComponent_tr_44_Template, 3, 0, "tr", 12);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(45, "div", 13)(46, "div", 14)(47, "div", 15)(48, "div", 16)(49, "h5", 17);
        \u0275\u0275text(50);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "button", 18);
        \u0275\u0275listener("click", function ReglasNegocioComponent_Template_button_click_51_listener() {
          return ctx.showModal = false;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "div", 19)(53, "div", 20)(54, "div", 21)(55, "label", 22);
        \u0275\u0275text(56, "Nombre *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "input", 23);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_input_ngModelChange_57_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRegla.nombre, $event) || (ctx.selectedRegla.nombre = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "div", 24)(59, "label", 22);
        \u0275\u0275text(60, "M\xF3dulo *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "select", 25);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_select_ngModelChange_61_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRegla.modulo, $event) || (ctx.selectedRegla.modulo = $event);
          return $event;
        });
        \u0275\u0275template(62, ReglasNegocioComponent_option_62_Template, 2, 2, "option", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(63, "div", 24)(64, "label", 22);
        \u0275\u0275text(65, "Tipo *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "select", 25);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_select_ngModelChange_66_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRegla.tipo, $event) || (ctx.selectedRegla.tipo = $event);
          return $event;
        });
        \u0275\u0275template(67, ReglasNegocioComponent_option_67_Template, 2, 2, "option", 6);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(68, "div", 26)(69, "label", 22);
        \u0275\u0275text(70, "Descripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "textarea", 27);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_textarea_ngModelChange_71_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRegla.descripcion, $event) || (ctx.selectedRegla.descripcion = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(72, "div", 26)(73, "label", 22);
        \u0275\u0275text(74, "Condici\xF3n (JSON) *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "textarea", 28);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_textarea_ngModelChange_75_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRegla.condicion, $event) || (ctx.selectedRegla.condicion = $event);
          return $event;
        });
        \u0275\u0275listener("input", function ReglasNegocioComponent_Template_textarea_input_75_listener() {
          return ctx.updateCondicionPreview();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(76, "small", 29);
        \u0275\u0275text(77, "Formato: condition (AND/OR), rules con field, operator, value");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(78, ReglasNegocioComponent_div_78_Template, 6, 1, "div", 30);
        \u0275\u0275elementStart(79, "div", 20)(80, "div", 31)(81, "label", 22);
        \u0275\u0275text(82, "Mensaje de Error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "input", 32);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_input_ngModelChange_83_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRegla.mensajeError, $event) || (ctx.selectedRegla.mensajeError = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(84, "div", 31)(85, "label", 22);
        \u0275\u0275text(86, "Acci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(87, "select", 25);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_select_ngModelChange_87_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRegla.accion, $event) || (ctx.selectedRegla.accion = $event);
          return $event;
        });
        \u0275\u0275elementStart(88, "option", 5);
        \u0275\u0275text(89, "Seleccionar...");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(90, "option", 33);
        \u0275\u0275text(91, "Rechazar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(92, "option", 34);
        \u0275\u0275text(93, "Advertir");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(94, "option", 35);
        \u0275\u0275text(95, "Permitir");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(96, "div", 36)(97, "label", 22);
        \u0275\u0275text(98, "Prioridad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(99, "input", 37);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_input_ngModelChange_99_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRegla.prioridad, $event) || (ctx.selectedRegla.prioridad = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(100, "div", 36)(101, "label", 22);
        \u0275\u0275text(102, "Activa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(103, "div", 38)(104, "input", 39);
        \u0275\u0275twoWayListener("ngModelChange", function ReglasNegocioComponent_Template_input_ngModelChange_104_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedRegla.activa, $event) || (ctx.selectedRegla.activa = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(105, "div", 40)(106, "button", 41);
        \u0275\u0275listener("click", function ReglasNegocioComponent_Template_button_click_106_listener() {
          return ctx.showModal = false;
        });
        \u0275\u0275text(107, "Cancelar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(108, "button", 42);
        \u0275\u0275listener("click", function ReglasNegocioComponent_Template_button_click_108_listener() {
          return ctx.save();
        });
        \u0275\u0275text(109);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroModulo);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.modulos);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroTipo);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.tipos);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroActiva);
        \u0275\u0275advance(26);
        \u0275\u0275property("ngForOf", ctx.filteredReglas);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredReglas.length === 0);
        \u0275\u0275advance();
        \u0275\u0275styleProp("display", ctx.showModal ? "block" : "none");
        \u0275\u0275classProp("show", ctx.showModal);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("", ctx.editing ? "Editar" : "Nueva", " Regla de Negocio");
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRegla.nombre);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRegla.modulo);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.modulos);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRegla.tipo);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.tipos);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRegla.descripcion);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRegla.condicion);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.condicionPreview);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRegla.mensajeError);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRegla.accion);
        \u0275\u0275advance(12);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRegla.prioridad);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedRegla.activa);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", !ctx.selectedRegla.nombre || !ctx.validateCondicion());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.editing ? "Actualizar" : "Crear", " ");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReglasNegocioComponent, { className: "ReglasNegocioComponent", filePath: "app\\features\\admin\\pages\\reglas-negocio\\reglas-negocio.component.ts", lineNumber: 12 });
})();
export {
  ReglasNegocioComponent
};
//# sourceMappingURL=chunk-KB7DVB6I.js.map
