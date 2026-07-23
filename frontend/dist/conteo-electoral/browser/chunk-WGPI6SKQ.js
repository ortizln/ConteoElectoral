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
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3DSQS3EE.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/tipos-eleccion/tipos-eleccion.component.ts
function TiposEleccionComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 30)(2, "div", 31)(3, "div", 32)(4, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function TiposEleccionComponent_div_7_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.nuevoTipo.nombre, $event) || (ctx_r1.nuevoTipo.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 34)(6, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function TiposEleccionComponent_div_7_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.nuevoTipo.descripcion, $event) || (ctx_r1.nuevoTipo.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 36)(8, "button", 37);
    \u0275\u0275listener("click", function TiposEleccionComponent_div_7_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.crearTipo());
    });
    \u0275\u0275text(9, "Crear");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.nuevoTipo.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.nuevoTipo.descripcion);
  }
}
function TiposEleccionComponent_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function TiposEleccionComponent_button_12_Template_button_click_0_listener() {
      const t_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectTipo(t_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 39);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", (ctx_r1.selectedTipo == null ? null : ctx_r1.selectedTipo.id) === t_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r4.nombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4.activo ? "Activo" : "Inactivo");
  }
}
function TiposEleccionComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275text(1, " No hay tipos de elecci\xF3n registrados ");
    \u0275\u0275elementEnd();
  }
}
function TiposEleccionComponent_div_14_tr_26_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 58);
    \u0275\u0275listener("click", function TiposEleccionComponent_div_14_tr_26_ng_container_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const ca_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startEditarOrden(ca_r7));
    });
    \u0275\u0275element(3, "i", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ca_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ca_r7.orden, " ");
  }
}
function TiposEleccionComponent_div_14_tr_26_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", function TiposEleccionComponent_div_14_tr_26_ng_template_8_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.nuevoOrden, $event) || (ctx_r1.nuevoOrden = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 61);
    \u0275\u0275listener("click", function TiposEleccionComponent_div_14_tr_26_ng_template_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const ca_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.guardarOrden(ca_r7.id));
    });
    \u0275\u0275element(3, "i", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 63);
    \u0275\u0275listener("click", function TiposEleccionComponent_div_14_tr_26_ng_template_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelarEditarOrden());
    });
    \u0275\u0275element(5, "i", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.nuevoOrden);
  }
}
function TiposEleccionComponent_div_14_tr_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 49)(4, "button", 53);
    \u0275\u0275listener("click", function TiposEleccionComponent_div_14_tr_26_Template_button_click_4_listener() {
      const ca_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectedCargoInfo = ctx_r1.selectedCargoInfo === ca_r7.cargoId ? null : ca_r7.cargoId);
    });
    \u0275\u0275element(5, "i", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 49);
    \u0275\u0275template(7, TiposEleccionComponent_div_14_tr_26_ng_container_7_Template, 4, 1, "ng-container", 55)(8, TiposEleccionComponent_div_14_tr_26_ng_template_8_Template, 6, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 49)(11, "button", 56);
    \u0275\u0275listener("click", function TiposEleccionComponent_div_14_tr_26_Template_button_click_11_listener() {
      const ca_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removerCargo(ca_r7.id));
    });
    \u0275\u0275element(12, "i", 57);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ca_r7 = ctx.$implicit;
    const editandoOrden_r10 = \u0275\u0275reference(9);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ca_r7.cargoNombre);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.editandoOrdenId !== ca_r7.id)("ngIfElse", editandoOrden_r10);
  }
}
function TiposEleccionComponent_div_14_tr_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 65);
    \u0275\u0275text(2, "Sin cargos asignados");
    \u0275\u0275elementEnd()();
  }
}
function TiposEleccionComponent_div_14_div_28_ng_container_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275element(2, "br");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const info_r11 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(info_r11.descripcion);
  }
}
function TiposEleccionComponent_div_14_div_28_ng_container_1_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const info_r11 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Circunscripci\xF3n ID: ", info_r11.tipoCircunscripcionId, " ");
  }
}
function TiposEleccionComponent_div_14_div_28_ng_container_1_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const info_r11 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" | Dignidades: ", info_r11.cantidadDignidades, " ");
  }
}
function TiposEleccionComponent_div_14_div_28_ng_container_1_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const info_r11 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" | M\xE1x lista: ", info_r11.maxCandidatosLista, " ");
  }
}
function TiposEleccionComponent_div_14_div_28_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275template(4, TiposEleccionComponent_div_14_div_28_ng_container_1_span_4_Template, 3, 1, "span", 51);
    \u0275\u0275text(5, " Tipo votaci\xF3n: ");
    \u0275\u0275elementStart(6, "span", 67);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "br");
    \u0275\u0275template(9, TiposEleccionComponent_div_14_div_28_ng_container_1_span_9_Template, 2, 1, "span", 51)(10, TiposEleccionComponent_div_14_div_28_ng_container_1_span_10_Template, 2, 1, "span", 51)(11, TiposEleccionComponent_div_14_div_28_ng_container_1_span_11_Template, 2, 1, "span", 51);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const info_r11 = ctx.ngIf;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(info_r11.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", info_r11.descripcion);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getTipoVotacionLabel(info_r11.tipoVotacion));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", info_r11.tipoCircunscripcionId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", info_r11.cantidadDignidades);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", info_r11.maxCandidatosLista);
  }
}
function TiposEleccionComponent_div_14_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275template(1, TiposEleccionComponent_div_14_div_28_ng_container_1_Template, 12, 6, "ng-container", 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getCargoInfo(ctx_r1.selectedCargoInfo));
  }
}
function TiposEleccionComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 9)(2, "div", 42)(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " \u2014 Cargos asignados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "button", 43);
    \u0275\u0275listener("click", function TiposEleccionComponent_div_14_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEditarTipo());
    });
    \u0275\u0275element(9, "i", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 45);
    \u0275\u0275listener("click", function TiposEleccionComponent_div_14_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAsignarCargo());
    });
    \u0275\u0275element(11, "i", 46);
    \u0275\u0275text(12, " Asignar cargo ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 47)(14, "table", 48)(15, "thead")(16, "tr")(17, "th");
    \u0275\u0275text(18, "Cargo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 49);
    \u0275\u0275text(20, "Info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 49);
    \u0275\u0275text(22, "Orden");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 49);
    \u0275\u0275text(24, "Acci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "tbody");
    \u0275\u0275template(26, TiposEleccionComponent_div_14_tr_26_Template, 13, 3, "tr", 50)(27, TiposEleccionComponent_div_14_tr_27_Template, 3, 0, "tr", 51);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(28, TiposEleccionComponent_div_14_div_28_Template, 2, 1, "div", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedTipo.nombre);
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r1.cargosAsignados);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.cargosAsignados.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedCargoInfo);
  }
}
function TiposEleccionComponent_option_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 68);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r12 = ctx.$implicit;
    \u0275\u0275property("value", c_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r12.nombre, " ");
  }
}
var TiposEleccionComponent = class _TiposEleccionComponent {
  constructor(api) {
    this.api = api;
    this.tipos = [];
    this.cargosDisponibles = [];
    this.cargosAsignados = [];
    this.selectedTipo = null;
    this.nuevoTipo = { nombre: "", descripcion: "" };
    this.cargoToAdd = {};
    this.showNuevoTipo = false;
    this.showAsignarCargo = false;
    this.editingTipo = null;
    this.editTipoForm = { nombre: "", descripcion: "" };
    this.showEditarTipo = false;
    this.editandoOrdenId = null;
    this.nuevoOrden = 0;
    this.selectedCargoInfo = null;
  }
  ngOnInit() {
    this.loadTipos();
    this.api.getCargos().subscribe((cargos) => this.cargosDisponibles = cargos);
  }
  loadTipos() {
    this.api.getTiposEleccion().subscribe((data) => this.tipos = data);
  }
  selectTipo(tipo) {
    this.selectedTipo = tipo;
    this.loadCargosAsignados();
  }
  loadCargosAsignados() {
    if (!this.selectedTipo)
      return;
    this.api.getCargosByTipoEleccion(this.selectedTipo.id).subscribe((data) => {
      this.cargosAsignados = data;
    });
  }
  crearTipo() {
    this.api.createTipoEleccion(this.nuevoTipo).subscribe(() => {
      this.loadTipos();
      this.nuevoTipo = { nombre: "", descripcion: "" };
      this.showNuevoTipo = false;
    });
  }
  openEditarTipo() {
    if (!this.selectedTipo)
      return;
    this.editingTipo = this.selectedTipo;
    this.editTipoForm = { nombre: this.selectedTipo.nombre, descripcion: this.selectedTipo.descripcion };
    this.showEditarTipo = true;
  }
  guardarEditarTipo() {
    if (!this.editingTipo)
      return;
    this.api.updateTipoEleccion(this.editingTipo.id, this.editTipoForm).subscribe(() => {
      this.loadTipos();
      this.showEditarTipo = false;
      this.editingTipo = null;
      const updated = this.tipos.find((t) => t.id === this.selectedTipo?.id);
      if (updated)
        this.selectedTipo = updated;
    });
  }
  openAsignarCargo() {
    this.cargoToAdd = { cargoId: null, orden: 0 };
    this.showAsignarCargo = true;
  }
  asignarCargo() {
    if (!this.cargoToAdd.cargoId)
      return;
    this.api.addCargoToTipoEleccion(this.selectedTipo.id, this.cargoToAdd).subscribe(() => {
      this.loadCargosAsignados();
      this.showAsignarCargo = false;
    });
  }
  removerCargo(id) {
    this.api.removeCargoFromTipoEleccion(id).subscribe(() => this.loadCargosAsignados());
  }
  startEditarOrden(ca) {
    this.editandoOrdenId = ca.id;
    this.nuevoOrden = ca.orden;
  }
  guardarOrden(id) {
    this.api.updateCargoOrdenInTipoEleccion(id, { orden: this.nuevoOrden }).subscribe(() => {
      this.editandoOrdenId = null;
      this.loadCargosAsignados();
    });
  }
  cancelarEditarOrden() {
    this.editandoOrdenId = null;
  }
  getCargoInfo(cargoId) {
    return this.cargosDisponibles.find((c) => c.id === cargoId);
  }
  getTipoVotacionLabel(tv) {
    const labels = {
      INDIVIDUAL: "Individual",
      LISTA: "Lista",
      PLURINOMINAL: "Plurinominal",
      PREFERENCIAL: "Preferencial",
      MIXTO: "Mixto"
    };
    return labels[tv] || tv;
  }
  static {
    this.\u0275fac = function TiposEleccionComponent_Factory(t) {
      return new (t || _TiposEleccionComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TiposEleccionComponent, selectors: [["app-tipos-eleccion"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 60, vars: 19, consts: [["editandoOrden", ""], [1, "container-fluid", "mt-3"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "mb-0"], [1, "btn", "btn-primary", 3, "click"], [1, "bi", "bi-plus-lg"], ["class", "card", 4, "ngIf"], [1, "row"], [1, "col-md-5"], [1, "card"], [1, "list-group", "list-group-flush"], ["class", "list-group-item list-group-item-action d-flex justify-content-between align-items-center", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-muted text-center", 4, "ngIf"], ["class", "col-md-7", 4, "ngIf"], ["tabindex", "-1", 1, "modal", "fade"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], [1, "mb-3"], [1, "form-label"], [1, "form-control", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "number", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "card-body"], [1, "row", "g-2"], [1, "col-md-4"], ["placeholder", "Nombre (ej: GENERALES)", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-md-6"], ["placeholder", "Descripci\xF3n", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-md-2"], [1, "btn", "btn-success", "w-100", 3, "click"], [1, "list-group-item", "list-group-item-action", "d-flex", "justify-content-between", "align-items-center", 3, "click"], [1, "badge", "bg-secondary", "rounded-pill"], [1, "list-group-item", "text-muted", "text-center"], [1, "col-md-7"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], ["title", "Editar tipo", 1, "btn", "btn-sm", "btn-outline-secondary", "me-1", 3, "click"], [1, "bi", "bi-pencil"], [1, "btn", "btn-sm", "btn-outline-primary", 3, "click"], [1, "bi", "bi-plus-circle"], [1, "card-body", "p-0"], [1, "table", "table-hover", "mb-0"], [1, "text-center"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "card-footer bg-light small", 4, "ngIf"], ["title", "Ver informaci\xF3n del cargo", 1, "btn", "btn-sm", "btn-outline-info", 3, "click"], [1, "bi", "bi-info-circle"], [4, "ngIf", "ngIfElse"], [1, "btn", "btn-sm", "btn-outline-danger", 3, "click"], [1, "bi", "bi-trash"], ["title", "Editar orden", 1, "btn", "btn-sm", "btn-outline-secondary", "ms-1", 3, "click"], [1, "d-inline-flex", "align-items-center", "gap-1"], ["type", "number", 1, "form-control", "form-control-sm", 2, "width", "70px", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-sm", "btn-success", 3, "click"], [1, "bi", "bi-check"], [1, "btn", "btn-sm", "btn-secondary", 3, "click"], [1, "bi", "bi-x"], ["colspan", "4", 1, "text-center", "text-muted"], [1, "card-footer", "bg-light", "small"], [1, "badge", "bg-info"], [3, "value"]], template: function TiposEleccionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h4", 3);
        \u0275\u0275text(3, "Tipos de Elecci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 4);
        \u0275\u0275listener("click", function TiposEleccionComponent_Template_button_click_4_listener() {
          return ctx.showNuevoTipo = !ctx.showNuevoTipo;
        });
        \u0275\u0275element(5, "i", 5);
        \u0275\u0275text(6, " Nuevo Tipo ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, TiposEleccionComponent_div_7_Template, 10, 2, "div", 6);
        \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "div", 9)(11, "div", 10);
        \u0275\u0275template(12, TiposEleccionComponent_button_12_Template, 4, 4, "button", 11)(13, TiposEleccionComponent_div_13_Template, 2, 0, "div", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(14, TiposEleccionComponent_div_14_Template, 29, 4, "div", 13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 14)(16, "div", 15)(17, "div", 16)(18, "div", 17)(19, "h5", 18);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "button", 19);
        \u0275\u0275listener("click", function TiposEleccionComponent_Template_button_click_21_listener() {
          return ctx.showEditarTipo = false;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 20)(23, "div", 21)(24, "label", 22);
        \u0275\u0275text(25, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "input", 23);
        \u0275\u0275twoWayListener("ngModelChange", function TiposEleccionComponent_Template_input_ngModelChange_26_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.editTipoForm.nombre, $event) || (ctx.editTipoForm.nombre = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "div", 21)(28, "label", 22);
        \u0275\u0275text(29, "Descripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "input", 23);
        \u0275\u0275twoWayListener("ngModelChange", function TiposEleccionComponent_Template_input_ngModelChange_30_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.editTipoForm.descripcion, $event) || (ctx.editTipoForm.descripcion = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(31, "div", 24)(32, "button", 25);
        \u0275\u0275listener("click", function TiposEleccionComponent_Template_button_click_32_listener() {
          return ctx.showEditarTipo = false;
        });
        \u0275\u0275text(33, "Cancelar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "button", 4);
        \u0275\u0275listener("click", function TiposEleccionComponent_Template_button_click_34_listener() {
          return ctx.guardarEditarTipo();
        });
        \u0275\u0275text(35, "Guardar");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(36, "div", 14)(37, "div", 15)(38, "div", 16)(39, "div", 17)(40, "h5", 18);
        \u0275\u0275text(41);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "button", 19);
        \u0275\u0275listener("click", function TiposEleccionComponent_Template_button_click_42_listener() {
          return ctx.showAsignarCargo = false;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "div", 20)(44, "div", 21)(45, "label", 22);
        \u0275\u0275text(46, "Cargo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "select", 26);
        \u0275\u0275twoWayListener("ngModelChange", function TiposEleccionComponent_Template_select_ngModelChange_47_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.cargoToAdd.cargoId, $event) || (ctx.cargoToAdd.cargoId = $event);
          return $event;
        });
        \u0275\u0275elementStart(48, "option", 27);
        \u0275\u0275text(49, "Seleccione...");
        \u0275\u0275elementEnd();
        \u0275\u0275template(50, TiposEleccionComponent_option_50_Template, 2, 2, "option", 28);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(51, "div", 21)(52, "label", 22);
        \u0275\u0275text(53, "Orden");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "input", 29);
        \u0275\u0275twoWayListener("ngModelChange", function TiposEleccionComponent_Template_input_ngModelChange_54_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.cargoToAdd.orden, $event) || (ctx.cargoToAdd.orden = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(55, "div", 24)(56, "button", 25);
        \u0275\u0275listener("click", function TiposEleccionComponent_Template_button_click_56_listener() {
          return ctx.showAsignarCargo = false;
        });
        \u0275\u0275text(57, "Cancelar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "button", 4);
        \u0275\u0275listener("click", function TiposEleccionComponent_Template_button_click_58_listener() {
          return ctx.asignarCargo();
        });
        \u0275\u0275text(59, "Asignar");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", ctx.showNuevoTipo);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngForOf", ctx.tipos);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tipos.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedTipo);
        \u0275\u0275advance();
        \u0275\u0275styleProp("display", ctx.showEditarTipo ? "block" : "none");
        \u0275\u0275classProp("show", ctx.showEditarTipo);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("Editar ", ctx.editTipoForm.nombre, "");
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.editTipoForm.nombre);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.editTipoForm.descripcion);
        \u0275\u0275advance(6);
        \u0275\u0275styleProp("display", ctx.showAsignarCargo ? "block" : "none");
        \u0275\u0275classProp("show", ctx.showAsignarCargo);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("Asignar Cargo a ", ctx.selectedTipo == null ? null : ctx.selectedTipo.nombre, "");
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.cargoToAdd.cargoId);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.cargosDisponibles);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.cargoToAdd.orden);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.modal-backdrop[_ngcontent-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=tipos-eleccion.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TiposEleccionComponent, { className: "TiposEleccionComponent", filePath: "app\\features\\admin\\pages\\tipos-eleccion\\tipos-eleccion.component.ts", lineNumber: 13 });
})();
export {
  TiposEleccionComponent
};
//# sourceMappingURL=chunk-WGPI6SKQ.js.map
