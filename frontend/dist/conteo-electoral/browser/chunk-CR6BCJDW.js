import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-27N6N5MO.js";
import {
  ApiService
} from "./chunk-QBYPS4NP.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3DSQS3EE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/elecciones/elecciones.component.ts
function EleccionesComponent_li_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 22);
    \u0275\u0275listener("click", function EleccionesComponent_li_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal());
    });
    \u0275\u0275text(2, "+ Nueva Elecci\xF3n");
    \u0275\u0275elementEnd()();
  }
}
function EleccionesComponent_tr_39_li_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 7);
    \u0275\u0275listener("click", function EleccionesComponent_tr_39_li_21_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const e_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit(e_r4));
    });
    \u0275\u0275text(2, "Editar");
    \u0275\u0275elementEnd()();
  }
}
function EleccionesComponent_tr_39_hr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "hr", 6);
  }
}
function EleccionesComponent_tr_39_li_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 26);
    \u0275\u0275listener("click", function EleccionesComponent_tr_39_li_24_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const e_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.delete(e_r4.id));
    });
    \u0275\u0275text(2, "Eliminar");
    \u0275\u0275elementEnd()();
  }
}
function EleccionesComponent_tr_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td")(17, "div", 2)(18, "button", 23);
    \u0275\u0275element(19, "i", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "ul", 4);
    \u0275\u0275template(21, EleccionesComponent_tr_39_li_21_Template, 3, 0, "li", 5);
    \u0275\u0275elementStart(22, "li");
    \u0275\u0275template(23, EleccionesComponent_tr_39_hr_23_Template, 1, 0, "hr", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, EleccionesComponent_tr_39_li_24_Template, 3, 0, "li", 5);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const e_r4 = ctx.$implicit;
    const i_r6 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r1.currentPage - 1) * ctx_r1.pageSize + i_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r4.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r4.descripcion || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 11, e_r4.fechaInicio, "shortDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 14, e_r4.fechaFin, "shortDate"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(e_r4.activa ? "badge bg-success" : "badge bg-secondary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", e_r4.activa ? "Activa" : "Inactiva", " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function EleccionesComponent_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 27);
    \u0275\u0275text(2, "No se encontraron registros");
    \u0275\u0275elementEnd()();
  }
}
function EleccionesComponent_span_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span")(1, "button", 28);
    \u0275\u0275listener("click", function EleccionesComponent_span_49_Template_button_click_1_listener() {
      const p_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(p_r8));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", p_r8 === ctx_r1.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r8);
  }
}
function EleccionesComponent_option_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    \u0275\u0275property("value", s_r9);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r9);
  }
}
function EleccionesComponent_div_59_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function EleccionesComponent_div_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "div", 32)(3, "div", 33)(4, "h5");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 34);
    \u0275\u0275listener("click", function EleccionesComponent_div_59_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 35);
    \u0275\u0275template(9, EleccionesComponent_div_59_div_9_Template, 3, 1, "div", 36);
    \u0275\u0275elementStart(10, "div", 37)(11, "label");
    \u0275\u0275text(12, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function EleccionesComponent_div_59_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.nombre, $event) || (ctx_r1.form.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function EleccionesComponent_div_59_Template_input_input_13_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toUpper(ctx_r1.form, "nombre"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 37)(15, "label");
    \u0275\u0275text(16, "Descripci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 39);
    \u0275\u0275twoWayListener("ngModelChange", function EleccionesComponent_div_59_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.descripcion, $event) || (ctx_r1.form.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function EleccionesComponent_div_59_Template_textarea_input_17_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toUpper(ctx_r1.form, "descripcion"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 37)(19, "label");
    \u0275\u0275text(20, "Fecha Inicio:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", function EleccionesComponent_div_59_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.fechaInicio, $event) || (ctx_r1.form.fechaInicio = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 37)(23, "label");
    \u0275\u0275text(24, "Fecha Fin:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", function EleccionesComponent_div_59_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.fechaFin, $event) || (ctx_r1.form.fechaFin = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 37)(27, "label")(28, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function EleccionesComponent_div_59_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.activa, $event) || (ctx_r1.form.activa = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " Activa ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 42)(31, "button", 43);
    \u0275\u0275listener("click", function EleccionesComponent_div_59_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(32, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 44);
    \u0275\u0275listener("click", function EleccionesComponent_div_59_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(34, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.editMode ? "Editar" : "Nueva", " Elecci\xF3n");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.descripcion);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.fechaInicio);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.fechaFin);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.activa);
  }
}
var EleccionesComponent = class _EleccionesComponent {
  constructor(api) {
    this.api = api;
    this.elecciones = [];
    this.showModal = false;
    this.editMode = false;
    this.selectedId = null;
    this.form = { nombre: "", descripcion: "", fechaInicio: "", fechaFin: "", activa: true };
    this.sortColumn = "";
    this.sortDirection = "asc";
    this.searchText = "";
    this.currentPage = 1;
    this.pageSize = 10;
    this.pageSizes = [5, 10, 25, 50];
    this.Math = Math;
    this.errorMessage = "";
  }
  get isAdmin() {
    try {
      const user = JSON.parse(localStorage.getItem("electoral_user") || "{}");
      return user.rol === "ADMIN";
    } catch {
      return false;
    }
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.api.getElecciones().subscribe((data) => this.elecciones = data);
  }
  sort(column) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }
    this.currentPage = 1;
  }
  get eleccionesOrdenadas() {
    if (!this.sortColumn)
      return this.elecciones;
    return [...this.elecciones].sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];
      if (valA == null)
        return 1;
      if (valB == null)
        return -1;
      if (typeof valA === "boolean") {
        const cmp2 = valA === valB ? 0 : valA ? -1 : 1;
        return this.sortDirection === "asc" ? cmp2 : -cmp2;
      }
      const cmp = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
      return this.sortDirection === "asc" ? cmp : -cmp;
    });
  }
  get eleccionesFiltradas() {
    if (!this.searchText)
      return this.eleccionesOrdenadas;
    const term = this.searchText.toLowerCase();
    return this.eleccionesOrdenadas.filter((item) => Object.values(item).some((v) => v != null && String(v).toLowerCase().includes(term)));
  }
  get eleccionesPaginadas() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.eleccionesFiltradas.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.eleccionesFiltradas.length / this.pageSize) || 1;
  }
  get pages() {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxVisible = 5;
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  goToPage(p) {
    this.currentPage = Math.max(1, Math.min(p, this.totalPages));
  }
  prevPage() {
    this.goToPage(this.currentPage - 1);
  }
  nextPage() {
    this.goToPage(this.currentPage + 1);
  }
  onPageSizeChange() {
    this.currentPage = 1;
  }
  toUpper(obj, prop) {
    if (obj[prop])
      obj[prop] = obj[prop].toUpperCase();
  }
  openModal() {
    this.form = { nombre: "", descripcion: "", fechaInicio: "", fechaFin: "", activa: true };
    this.editMode = false;
    this.errorMessage = "";
    this.showModal = true;
  }
  edit(eleccion) {
    this.form = __spreadValues({}, eleccion);
    this.selectedId = eleccion.id;
    this.editMode = true;
    this.errorMessage = "";
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.selectedId = null;
    this.errorMessage = "";
  }
  save() {
    this.errorMessage = "";
    const data = __spreadProps(__spreadValues({}, this.form), {
      fechaInicio: new Date(this.form.fechaInicio),
      fechaFin: new Date(this.form.fechaFin)
    });
    if (this.editMode && this.selectedId) {
      this.api.updateEleccion(this.selectedId, data).subscribe({
        next: () => {
          this.load();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Error al guardar. Intente de nuevo.";
        }
      });
    } else {
      this.api.createEleccion(data).subscribe({
        next: () => {
          this.load();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Error al guardar. Intente de nuevo.";
        }
      });
    }
  }
  delete(id) {
    if (confirm("Esta seguro de eliminar esta eleccion?")) {
      this.api.deleteEleccion(id).subscribe(() => this.load());
    }
  }
  static {
    this.\u0275fac = function EleccionesComponent_Factory(t) {
      return new (t || _EleccionesComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EleccionesComponent, selectors: [["app-elecciones"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 60, vars: 20, consts: [[1, "container"], [1, "page-header"], [1, "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-primary", "dropdown-toggle"], [1, "dropdown-menu", "dropdown-menu-end"], [4, "ngIf"], [1, "dropdown-divider"], [1, "dropdown-item", 3, "click"], [1, "filters-bar", "mb-4"], [1, "filter-item"], ["type", "text", "autocomplete", "off", "placeholder", "Buscar en tabla...", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "table", "table-striped"], [1, "sortable", 3, "click"], [4, "ngFor", "ngForOf"], [1, "pagination-bar"], [1, "pagination-info"], [1, "pagination-controls"], [3, "click", "disabled"], [1, "pagination-size"], [3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "modal", 4, "ngIf"], [1, "dropdown-item", "fw-bold", 3, "click"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-sm", "btn-outline-secondary", "border-0"], [1, "bi", "bi-three-dots-vertical"], ["class", "dropdown-divider", 4, "ngIf"], [1, "dropdown-item", "text-danger", 3, "click"], ["colspan", "7", 1, "text-center", "py-3"], [3, "click"], [3, "value"], [1, "modal"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], ["class", "mb-3", 4, "ngIf"], [1, "mb-3"], ["type", "text", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], ["autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], ["type", "date", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-danger"]], template: function EleccionesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Gesti\xF3n de Elecciones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
        \u0275\u0275text(6, " Opciones ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "ul", 4);
        \u0275\u0275template(8, EleccionesComponent_li_8_Template, 3, 0, "li", 5);
        \u0275\u0275elementStart(9, "li");
        \u0275\u0275element(10, "hr", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "li")(12, "button", 7);
        \u0275\u0275listener("click", function EleccionesComponent_Template_button_click_12_listener() {
          return ctx.api.exportEleccionesPdf();
        });
        \u0275\u0275text(13, "\u{1F4C4} Imprimir PDF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "li")(15, "button", 7);
        \u0275\u0275listener("click", function EleccionesComponent_Template_button_click_15_listener() {
          return ctx.api.exportEleccionesExcel();
        });
        \u0275\u0275text(16, "\u{1F4CA} Exportar Excel");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(17, "div", 8)(18, "div", 9)(19, "label");
        \u0275\u0275text(20, "Buscar:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function EleccionesComponent_Template_input_ngModelChange_21_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
          return $event;
        });
        \u0275\u0275listener("input", function EleccionesComponent_Template_input_input_21_listener() {
          return ctx.currentPage = 1;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(22, "table", 11)(23, "thead")(24, "tr")(25, "th");
        \u0275\u0275text(26, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "th", 12);
        \u0275\u0275listener("click", function EleccionesComponent_Template_th_click_27_listener() {
          return ctx.sort("nombre");
        });
        \u0275\u0275text(28);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "th", 12);
        \u0275\u0275listener("click", function EleccionesComponent_Template_th_click_29_listener() {
          return ctx.sort("descripcion");
        });
        \u0275\u0275text(30);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "th", 12);
        \u0275\u0275listener("click", function EleccionesComponent_Template_th_click_31_listener() {
          return ctx.sort("fechaInicio");
        });
        \u0275\u0275text(32);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "th", 12);
        \u0275\u0275listener("click", function EleccionesComponent_Template_th_click_33_listener() {
          return ctx.sort("fechaFin");
        });
        \u0275\u0275text(34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "th", 12);
        \u0275\u0275listener("click", function EleccionesComponent_Template_th_click_35_listener() {
          return ctx.sort("activa");
        });
        \u0275\u0275text(36);
        \u0275\u0275elementEnd();
        \u0275\u0275element(37, "th");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "tbody");
        \u0275\u0275template(39, EleccionesComponent_tr_39_Template, 25, 17, "tr", 13)(40, EleccionesComponent_tr_40_Template, 3, 0, "tr", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "div", 14)(42, "div", 15);
        \u0275\u0275text(43);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "div", 16)(45, "button", 17);
        \u0275\u0275listener("click", function EleccionesComponent_Template_button_click_45_listener() {
          return ctx.goToPage(1);
        });
        \u0275\u0275text(46, "\xAB\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "button", 17);
        \u0275\u0275listener("click", function EleccionesComponent_Template_button_click_47_listener() {
          return ctx.prevPage();
        });
        \u0275\u0275text(48, "\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275template(49, EleccionesComponent_span_49_Template, 3, 3, "span", 13);
        \u0275\u0275elementStart(50, "button", 17);
        \u0275\u0275listener("click", function EleccionesComponent_Template_button_click_50_listener() {
          return ctx.nextPage();
        });
        \u0275\u0275text(51, "\xBB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "button", 17);
        \u0275\u0275listener("click", function EleccionesComponent_Template_button_click_52_listener() {
          return ctx.goToPage(ctx.totalPages);
        });
        \u0275\u0275text(53, "\xBB\xBB");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(54, "div", 18)(55, "label");
        \u0275\u0275text(56, "Filas:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "select", 19);
        \u0275\u0275twoWayListener("ngModelChange", function EleccionesComponent_Template_select_ngModelChange_57_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
          return $event;
        });
        \u0275\u0275listener("change", function EleccionesComponent_Template_select_change_57_listener() {
          return ctx.onPageSizeChange();
        });
        \u0275\u0275template(58, EleccionesComponent_option_58_Template, 2, 2, "option", 20);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(59, EleccionesComponent_div_59_Template, 35, 7, "div", 21);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.isAdmin);
        \u0275\u0275advance(13);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("Nombre ", ctx.sortColumn === "nombre" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Descripci\xF3n ", ctx.sortColumn === "descripcion" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Fecha Inicio ", ctx.sortColumn === "fechaInicio" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Fecha Fin ", ctx.sortColumn === "fechaFin" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Estado ", ctx.sortColumn === "activa" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.eleccionesPaginadas);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.eleccionesFiltradas.length === 0);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate3(" Mostrando ", (ctx.currentPage - 1) * ctx.pageSize + 1, " - ", ctx.Math.min(ctx.currentPage * ctx.pageSize, ctx.eleccionesFiltradas.length), " de ", ctx.eleccionesFiltradas.length, " registros ");
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.currentPage === 1);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.currentPage === 1);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.pages);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.currentPage === ctx.totalPages);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.currentPage === ctx.totalPages);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.pageSizes);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showModal);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1e293b;\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.btn-with-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.mb-3[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 2px solid #e2e8f0;\n  background: #f8fafc;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd) {\n  background: #f9fafb;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #4f46e5);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);\n  transform: translateY(-1px);\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  color: white;\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background: #d97706;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.bg-success[_ngcontent-%COMP%] {\n  background: #10b981;\n  color: white;\n}\n.bg-secondary[_ngcontent-%COMP%] {\n  background: #64748b;\n  color: white;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 14px;\n  background: white;\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  border-bottom: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #475569;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #cbd5e1;\n}\n/*# sourceMappingURL=elecciones.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EleccionesComponent, { className: "EleccionesComponent", filePath: "app\\features\\admin\\pages\\elecciones\\elecciones.component.ts", lineNumber: 14 });
})();
export {
  EleccionesComponent
};
//# sourceMappingURL=chunk-CR6BCJDW.js.map
