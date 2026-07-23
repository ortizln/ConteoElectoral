import {
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
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3DSQS3EE.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/listas-electorales/listas-electorales.component.ts
function ListasElectoralesComponent_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function ListasElectoralesComponent_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openForm());
    });
    \u0275\u0275element(1, "i", 37);
    \u0275\u0275text(2, " Nueva Lista ");
    \u0275\u0275elementEnd();
  }
}
function ListasElectoralesComponent_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function ListasElectoralesComponent_button_12_Template_button_click_0_listener() {
      const e_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectEleccion(e_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", (ctx_r1.selectedEleccion == null ? null : ctx_r1.selectedEleccion.id) === e_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r4.nombre);
  }
}
function ListasElectoralesComponent_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function ListasElectoralesComponent_button_19_Template_button_click_0_listener() {
      const l_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.verDetalle(l_r6.id));
    });
    \u0275\u0275elementStart(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 40);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 41);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const l_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", (ctx_r1.listaDetalle == null ? null : ctx_r1.listaDetalle.id) === l_r6.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Lista ", l_r6.numeroLista, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r6.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getPartidoSigla(l_r6.partidoId) || "IND");
  }
}
function ListasElectoralesComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275text(1, " Sin listas registradas ");
    \u0275\u0275elementEnd();
  }
}
function ListasElectoralesComponent_div_21_tr_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 52);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r7.ordenEnLista);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r7.nombreCompleto);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-primary", c_r7.tipo === "PRINCIPAL")("bg-secondary", c_r7.tipo !== "PRINCIPAL");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r7.tipo);
  }
}
function ListasElectoralesComponent_div_21_tr_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 53);
    \u0275\u0275text(2, "Sin candidatos");
    \u0275\u0275elementEnd()();
  }
}
function ListasElectoralesComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 6)(2, "div", 7)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 44)(7, "div", 21)(8, "small", 45);
    \u0275\u0275text(9, "Cargo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div")(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 21)(14, "small", 45);
    \u0275\u0275text(15, "Partido:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div")(17, "strong");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 46);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 21)(22, "small", 45);
    \u0275\u0275text(23, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 47);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "h6", 48);
    \u0275\u0275text(27, "Candidatos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "table", 49)(29, "thead")(30, "tr")(31, "th");
    \u0275\u0275text(32, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "th");
    \u0275\u0275text(34, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "th");
    \u0275\u0275text(36, "Tipo");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "tbody");
    \u0275\u0275template(38, ListasElectoralesComponent_div_21_tr_38_Template, 8, 7, "tr", 50)(39, ListasElectoralesComponent_div_21_tr_39_Template, 3, 0, "tr", 51);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Lista ", ctx_r1.listaDetalle.numeroLista, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", ctx_r1.listaDetalle.nombre, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.listaDetalle.cargoNombre);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.listaDetalle.partidoNombre || "Independiente");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.listaDetalle.partidoSigla);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.listaDetalle.estado);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.listaDetalle.candidatos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.listaDetalle.candidatos || ctx_r1.listaDetalle.candidatos.length === 0);
  }
}
function ListasElectoralesComponent_option_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    \u0275\u0275property("value", c_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r8.nombre);
  }
}
function ListasElectoralesComponent_option_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    \u0275\u0275property("value", p_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", p_r9.nombre, " (", p_r9.sigla, ")");
  }
}
var ListasElectoralesComponent = class _ListasElectoralesComponent {
  constructor(api) {
    this.api = api;
    this.elecciones = [];
    this.selectedEleccion = null;
    this.listas = [];
    this.listaDetalle = null;
    this.partidos = [];
    this.cargos = [];
    this.showForm = false;
    this.formData = {
      eleccionId: null,
      cargoId: null,
      partidoId: null,
      circunscripcionTipo: "",
      circunscripcionId: null,
      numeroLista: null,
      nombre: ""
    };
  }
  ngOnInit() {
    this.api.getElecciones().subscribe((data) => this.elecciones = data);
  }
  selectEleccion(e) {
    this.selectedEleccion = e;
    this.loadListas();
    this.api.getPartidosByEleccion(e.id).subscribe((p) => this.partidos = p);
    this.api.getCargosByEleccion(e.id).subscribe((c) => this.cargos = c);
  }
  loadListas() {
    if (!this.selectedEleccion)
      return;
    this.api.getListasByEleccion(this.selectedEleccion.id).subscribe((data) => {
      this.listas = data;
      this.listaDetalle = null;
    });
  }
  verDetalle(id) {
    this.api.getListaDetalle(id).subscribe((data) => this.listaDetalle = data);
  }
  openForm() {
    this.formData = {
      eleccionId: this.selectedEleccion?.id,
      cargoId: null,
      partidoId: null,
      circunscripcionTipo: "NACIONAL",
      circunscripcionId: null,
      numeroLista: null,
      nombre: ""
    };
    this.showForm = true;
  }
  crearLista() {
    this.formData.eleccionId = this.selectedEleccion?.id;
    this.api.crearListaElectoral(this.formData).subscribe(() => {
      this.loadListas();
      this.showForm = false;
    });
  }
  getCargoNombre(id) {
    return this.cargos.find((c) => c.id === id)?.nombre || "-";
  }
  getPartidoNombre(id) {
    return this.partidos.find((p) => p.id === id)?.nombre || "Independiente";
  }
  getPartidoSigla(id) {
    return this.partidos.find((p) => p.id === id)?.sigla || "";
  }
  static {
    this.\u0275fac = function ListasElectoralesComponent_Factory(t) {
      return new (t || _ListasElectoralesComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListasElectoralesComponent, selectors: [["app-listas-electorales"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 73, vars: 16, consts: [[1, "container-fluid", "mt-3"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "mb-0"], ["class", "btn btn-primary", 3, "click", 4, "ngIf"], [1, "row"], [1, "col-md-3"], [1, "card"], [1, "card-header"], [1, "list-group", "list-group-flush"], ["class", "list-group-item list-group-item-action", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "col-md-4"], ["class", "list-group-item list-group-item-action d-flex justify-content-between align-items-center", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-muted text-center", 4, "ngIf"], ["class", "col-md-5", 4, "ngIf"], ["tabindex", "-1", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], [1, "btn-close", 3, "click"], [1, "modal-body"], [1, "mb-3"], [1, "form-label"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "number", 1, "form-control", 3, "ngModelChange", "ngModel"], ["placeholder", "Ej: Revoluci\xF3n Ciudadana", 1, "form-control", 3, "ngModelChange", "ngModel"], ["value", "NACIONAL"], ["value", "PROVINCIAL"], ["value", "CANTONAL"], ["value", "URBANA"], ["value", "RURAL"], ["value", "PARROQUIAL"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click"], [1, "bi", "bi-plus-lg"], [1, "list-group-item", "list-group-item-action", 3, "click"], [1, "list-group-item", "list-group-item-action", "d-flex", "justify-content-between", "align-items-center", 3, "click"], [1, "d-block", "text-muted"], [1, "badge", "bg-secondary"], [1, "list-group-item", "text-muted", "text-center"], [1, "col-md-5"], [1, "card-body"], [1, "text-muted"], [1, "badge", "bg-secondary", "ms-2"], [1, "badge", "bg-success", "ms-1"], [1, "mt-3"], [1, "table", "table-sm"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "badge"], ["colspan", "3", 1, "text-muted", "text-center"], [3, "value"]], template: function ListasElectoralesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h4", 2);
        \u0275\u0275text(3, "Listas Electorales");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, ListasElectoralesComponent_button_4_Template, 3, 0, "button", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "div", 7)(9, "strong");
        \u0275\u0275text(10, "Elecciones");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 8);
        \u0275\u0275template(12, ListasElectoralesComponent_button_12_Template, 2, 3, "button", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(13, "div", 10)(14, "div", 6)(15, "div", 7)(16, "strong");
        \u0275\u0275text(17, "Listas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 8);
        \u0275\u0275template(19, ListasElectoralesComponent_button_19_Template, 8, 5, "button", 11)(20, ListasElectoralesComponent_div_20_Template, 2, 0, "div", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(21, ListasElectoralesComponent_div_21_Template, 40, 8, "div", 13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 14)(23, "div", 15)(24, "div", 16)(25, "div", 17)(26, "h5", 18);
        \u0275\u0275text(27, "Nueva Lista Electoral");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "button", 19);
        \u0275\u0275listener("click", function ListasElectoralesComponent_Template_button_click_28_listener() {
          return ctx.showForm = false;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 20)(30, "div", 21)(31, "label", 22);
        \u0275\u0275text(32, "Cargo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "select", 23);
        \u0275\u0275twoWayListener("ngModelChange", function ListasElectoralesComponent_Template_select_ngModelChange_33_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.formData.cargoId, $event) || (ctx.formData.cargoId = $event);
          return $event;
        });
        \u0275\u0275elementStart(34, "option", 24);
        \u0275\u0275text(35, "Seleccione...");
        \u0275\u0275elementEnd();
        \u0275\u0275template(36, ListasElectoralesComponent_option_36_Template, 2, 2, "option", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 21)(38, "label", 22);
        \u0275\u0275text(39, "Partido");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "select", 23);
        \u0275\u0275twoWayListener("ngModelChange", function ListasElectoralesComponent_Template_select_ngModelChange_40_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.formData.partidoId, $event) || (ctx.formData.partidoId = $event);
          return $event;
        });
        \u0275\u0275elementStart(41, "option", 24);
        \u0275\u0275text(42, "Independiente");
        \u0275\u0275elementEnd();
        \u0275\u0275template(43, ListasElectoralesComponent_option_43_Template, 2, 3, "option", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 21)(45, "label", 22);
        \u0275\u0275text(46, "N\xFAmero de Lista");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "input", 26);
        \u0275\u0275twoWayListener("ngModelChange", function ListasElectoralesComponent_Template_input_ngModelChange_47_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.formData.numeroLista, $event) || (ctx.formData.numeroLista = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "div", 21)(49, "label", 22);
        \u0275\u0275text(50, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "input", 27);
        \u0275\u0275twoWayListener("ngModelChange", function ListasElectoralesComponent_Template_input_ngModelChange_51_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.formData.nombre, $event) || (ctx.formData.nombre = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "div", 21)(53, "label", 22);
        \u0275\u0275text(54, "Circunscripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "select", 23);
        \u0275\u0275twoWayListener("ngModelChange", function ListasElectoralesComponent_Template_select_ngModelChange_55_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.formData.circunscripcionTipo, $event) || (ctx.formData.circunscripcionTipo = $event);
          return $event;
        });
        \u0275\u0275elementStart(56, "option", 28);
        \u0275\u0275text(57, "Nacional");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "option", 29);
        \u0275\u0275text(59, "Provincial");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "option", 30);
        \u0275\u0275text(61, "Cantonal");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "option", 31);
        \u0275\u0275text(63, "Urbana");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "option", 32);
        \u0275\u0275text(65, "Rural");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "option", 33);
        \u0275\u0275text(67, "Parroquial");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(68, "div", 34)(69, "button", 35);
        \u0275\u0275listener("click", function ListasElectoralesComponent_Template_button_click_69_listener() {
          return ctx.showForm = false;
        });
        \u0275\u0275text(70, "Cancelar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "button", 36);
        \u0275\u0275listener("click", function ListasElectoralesComponent_Template_button_click_71_listener() {
          return ctx.crearLista();
        });
        \u0275\u0275text(72, "Crear Lista");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.selectedEleccion);
        \u0275\u0275advance(8);
        \u0275\u0275property("ngForOf", ctx.elecciones);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngForOf", ctx.listas);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.listas.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.listaDetalle);
        \u0275\u0275advance();
        \u0275\u0275styleProp("display", ctx.showForm ? "block" : "none");
        \u0275\u0275classProp("show", ctx.showForm);
        \u0275\u0275advance(11);
        \u0275\u0275twoWayProperty("ngModel", ctx.formData.cargoId);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.cargos);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.formData.partidoId);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.partidos);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.formData.numeroLista);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.formData.nombre);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.formData.circunscripcionTipo);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListasElectoralesComponent, { className: "ListasElectoralesComponent", filePath: "app\\features\\admin\\pages\\listas-electorales\\listas-electorales.component.ts", lineNumber: 13 });
})();
export {
  ListasElectoralesComponent
};
//# sourceMappingURL=chunk-CZJK3NDU.js.map
