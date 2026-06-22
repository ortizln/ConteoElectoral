import {
  ApiService
} from "./chunk-5ZU65LVT.js";
import {
  DefaultValueAccessor,
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7A5LCT4I.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/parroquias/parroquias.component.ts
function ParroquiasComponent_option_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275property("value", p_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1.nombre);
  }
}
function ParroquiasComponent_option_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    \u0275\u0275property("value", c_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r2.nombre);
  }
}
function ParroquiasComponent_tr_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
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
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td")(10, "button", 25);
    \u0275\u0275listener("click", function ParroquiasComponent_tr_46_Template_button_click_10_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.edit(p_r4));
    });
    \u0275\u0275text(11, "Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 26);
    \u0275\u0275listener("click", function ParroquiasComponent_tr_46_Template_button_click_12_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.delete(p_r4.id));
    });
    \u0275\u0275text(13, "Eliminar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const i_r6 = ctx.index;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r4.currentPage - 1) * ctx_r4.pageSize + i_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.cantonNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.descripcion || "N/A");
  }
}
function ParroquiasComponent_tr_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 27);
    \u0275\u0275text(2, "No se encontraron registros");
    \u0275\u0275elementEnd()();
  }
}
function ParroquiasComponent_span_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span")(1, "button", 28);
    \u0275\u0275listener("click", function ParroquiasComponent_span_56_Template_button_click_1_listener() {
      const p_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.goToPage(p_r8));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", p_r8 === ctx_r4.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r8);
  }
}
function ParroquiasComponent_option_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
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
function ParroquiasComponent_div_66_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.errorMessage);
  }
}
function ParroquiasComponent_div_66_option_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r11 = ctx.$implicit;
    \u0275\u0275property("value", c_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r11.nombre);
  }
}
function ParroquiasComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30)(2, "div", 31)(3, "div", 32)(4, "h5");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 33);
    \u0275\u0275listener("click", function ParroquiasComponent_div_66_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 34);
    \u0275\u0275template(9, ParroquiasComponent_div_66_div_9_Template, 3, 1, "div", 35);
    \u0275\u0275elementStart(10, "div", 36)(11, "label");
    \u0275\u0275text(12, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_div_66_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.nombre, $event) || (ctx_r4.form.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ParroquiasComponent_div_66_Template_input_input_13_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toUpper(ctx_r4.form, "nombre"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 36)(15, "label");
    \u0275\u0275text(16, "Cant\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 38);
    \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_div_66_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.cantonId, $event) || (ctx_r4.form.cantonId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(18, "option", 10);
    \u0275\u0275text(19, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, ParroquiasComponent_div_66_option_20_Template, 2, 2, "option", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 36)(22, "label");
    \u0275\u0275text(23, "Descripci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "textarea", 39);
    \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_div_66_Template_textarea_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.descripcion, $event) || (ctx_r4.form.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ParroquiasComponent_div_66_Template_textarea_input_24_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toUpper(ctx_r4.form, "descripcion"));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 40)(26, "button", 41);
    \u0275\u0275listener("click", function ParroquiasComponent_div_66_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeModal());
    });
    \u0275\u0275text(27, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 42);
    \u0275\u0275listener("click", function ParroquiasComponent_div_66_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.save());
    });
    \u0275\u0275text(29, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r4.editMode ? "Editar" : "Nueva", " Parroquia");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r4.errorMessage);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.cantonId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r4.cantones);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.descripcion);
  }
}
var ParroquiasComponent = class _ParroquiasComponent {
  constructor(api) {
    this.api = api;
    this.parroquias = [];
    this.cantones = [];
    this.cantonesFiltrados = [];
    this.provincias = [];
    this.showModal = false;
    this.editMode = false;
    this.selectedId = null;
    this.form = { nombre: "", cantonId: null, descripcion: "" };
    this.filterProvinciaId = null;
    this.filterCantonId = null;
    this.sortColumn = "";
    this.sortDirection = "asc";
    this.searchText = "";
    this.currentPage = 1;
    this.pageSize = 10;
    this.pageSizes = [5, 10, 25, 50];
    this.Math = Math;
    this.errorMessage = "";
  }
  ngOnInit() {
    this.api.getProvincias().subscribe((d) => this.provincias = d);
    this.api.getCantones().subscribe((d) => {
      this.cantones = d;
      this.cantonesFiltrados = d;
    });
    this.load();
  }
  load() {
    const obs = this.filterCantonId ? this.api.getParroquiasByCanton(this.filterCantonId) : this.api.getParroquias();
    obs.subscribe((d) => this.parroquias = d);
  }
  onProvinciaChange() {
    this.filterCantonId = null;
    if (this.filterProvinciaId) {
      this.api.getCantonesByProvincia(this.filterProvinciaId).subscribe((d) => {
        this.cantonesFiltrados = d;
      });
    } else {
      this.cantonesFiltrados = this.cantones;
    }
    this.load();
    this.currentPage = 1;
  }
  filtrarPorCanton() {
    this.load();
    this.currentPage = 1;
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
  get parroquiasOrdenadas() {
    if (!this.sortColumn)
      return this.parroquias;
    return [...this.parroquias].sort((a, b) => {
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
  get parroquiasFiltradas() {
    if (!this.searchText)
      return this.parroquiasOrdenadas;
    const term = this.searchText.toLowerCase();
    return this.parroquiasOrdenadas.filter((item) => Object.values(item).some((v) => v != null && String(v).toLowerCase().includes(term)));
  }
  get parroquiasPaginadas() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.parroquiasFiltradas.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.parroquiasFiltradas.length / this.pageSize) || 1;
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
    this.editMode = false;
    this.form = { nombre: "", cantonId: this.cantones[0]?.id || null, descripcion: "" };
    this.errorMessage = "";
    this.showModal = true;
  }
  edit(p) {
    this.editMode = true;
    this.selectedId = p.id;
    this.form = { nombre: p.nombre, cantonId: p.cantonId, descripcion: p.descripcion || "" };
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
    if (this.editMode && this.selectedId) {
      this.api.updateParroquia(this.selectedId, this.form).subscribe({
        next: () => {
          this.load();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Error al guardar. Intente de nuevo.";
        }
      });
    } else {
      this.api.createParroquia(this.form).subscribe({
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
    if (confirm("\xBFEst\xE1 seguro de eliminar esta parroquia?")) {
      this.api.deleteParroquia(id).subscribe(() => this.load());
    }
  }
  static {
    this.\u0275fac = function ParroquiasComponent_Factory(t) {
      return new (t || _ParroquiasComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ParroquiasComponent, selectors: [["app-parroquias"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 67, vars: 23, consts: [[1, "container"], [1, "page-header"], [1, "export-buttons"], ["title", "Exportar a Excel", 1, "btn", "btn-excel", 3, "click"], ["title", "Exportar a PDF", 1, "btn", "btn-pdf", 3, "click"], [1, "btn", "btn-primary", "btn-with-icon", 3, "click"], [1, "btn-icon"], [1, "filters-bar", "mb-4"], [1, "filter-item"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "placeholder", "Buscar en tabla...", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "table", "table-striped"], [1, "sortable", 3, "click"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "pagination-bar"], [1, "pagination-info"], [1, "pagination-controls"], [3, "click", "disabled"], [1, "pagination-size"], [3, "ngModelChange", "change", "ngModel"], ["class", "modal", 4, "ngIf"], [3, "value"], [1, "btn", "btn-sm", "btn-warning", 3, "click"], [1, "btn", "btn-sm", "btn-danger", 3, "click"], ["colspan", "5", 1, "text-center", "py-3"], [3, "click"], [1, "modal"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], ["class", "mb-3", 4, "ngIf"], [1, "mb-3"], ["type", "text", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], [1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-danger"]], template: function ParroquiasComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Gesti\xF3n de Parroquias");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_5_listener() {
          return ctx.api.exportParroquiasExcel();
        });
        \u0275\u0275text(6, "\u{1F4CA} Excel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 4);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_7_listener() {
          return ctx.api.exportParroquiasPdf();
        });
        \u0275\u0275text(8, "\u{1F4C4} PDF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "button", 5);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_9_listener() {
          return ctx.openModal();
        });
        \u0275\u0275elementStart(10, "span", 6);
        \u0275\u0275text(11, "+");
        \u0275\u0275elementEnd();
        \u0275\u0275text(12, " Nueva Parroquia ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 7)(14, "div", 8)(15, "label");
        \u0275\u0275text(16, "Provincia:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "select", 9);
        \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_Template_select_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filterProvinciaId, $event) || (ctx.filterProvinciaId = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ParroquiasComponent_Template_select_change_17_listener() {
          return ctx.onProvinciaChange();
        });
        \u0275\u0275elementStart(18, "option", 10);
        \u0275\u0275text(19, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(20, ParroquiasComponent_option_20_Template, 2, 2, "option", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 8)(22, "label");
        \u0275\u0275text(23, "Cant\xF3n:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "select", 9);
        \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_Template_select_ngModelChange_24_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filterCantonId, $event) || (ctx.filterCantonId = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ParroquiasComponent_Template_select_change_24_listener() {
          return ctx.filtrarPorCanton();
        });
        \u0275\u0275elementStart(25, "option", 10);
        \u0275\u0275text(26, "Todos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(27, ParroquiasComponent_option_27_Template, 2, 2, "option", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "div", 8)(29, "label");
        \u0275\u0275text(30, "Buscar:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "input", 12);
        \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_Template_input_ngModelChange_31_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
          return $event;
        });
        \u0275\u0275listener("input", function ParroquiasComponent_Template_input_input_31_listener() {
          return ctx.currentPage = 1;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(32, "table", 13)(33, "thead")(34, "tr")(35, "th");
        \u0275\u0275text(36, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "th", 14);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_th_click_37_listener() {
          return ctx.sort("nombre");
        });
        \u0275\u0275text(38);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "th", 14);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_th_click_39_listener() {
          return ctx.sort("cantonNombre");
        });
        \u0275\u0275text(40);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "th", 14);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_th_click_41_listener() {
          return ctx.sort("descripcion");
        });
        \u0275\u0275text(42);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "th");
        \u0275\u0275text(44, "Acciones");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(45, "tbody");
        \u0275\u0275template(46, ParroquiasComponent_tr_46_Template, 14, 4, "tr", 15)(47, ParroquiasComponent_tr_47_Template, 3, 0, "tr", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "div", 17)(49, "div", 18);
        \u0275\u0275text(50);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "div", 19)(52, "button", 20);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_52_listener() {
          return ctx.goToPage(1);
        });
        \u0275\u0275text(53, "\xAB\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "button", 20);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_54_listener() {
          return ctx.prevPage();
        });
        \u0275\u0275text(55, "\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275template(56, ParroquiasComponent_span_56_Template, 3, 3, "span", 15);
        \u0275\u0275elementStart(57, "button", 20);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_57_listener() {
          return ctx.nextPage();
        });
        \u0275\u0275text(58, "\xBB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "button", 20);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_59_listener() {
          return ctx.goToPage(ctx.totalPages);
        });
        \u0275\u0275text(60, "\xBB\xBB");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(61, "div", 21)(62, "label");
        \u0275\u0275text(63, "Filas:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "select", 22);
        \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_Template_select_ngModelChange_64_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ParroquiasComponent_Template_select_change_64_listener() {
          return ctx.onPageSizeChange();
        });
        \u0275\u0275template(65, ParroquiasComponent_option_65_Template, 2, 2, "option", 11);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(66, ParroquiasComponent_div_66_Template, 30, 7, "div", 23);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(17);
        \u0275\u0275twoWayProperty("ngModel", ctx.filterProvinciaId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.provincias);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filterCantonId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.cantonesFiltrados);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("Nombre ", ctx.sortColumn === "nombre" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Cant\xF3n ", ctx.sortColumn === "cantonNombre" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Descripci\xF3n ", ctx.sortColumn === "descripcion" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(4);
        \u0275\u0275property("ngForOf", ctx.parroquiasPaginadas);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.parroquiasFiltradas.length === 0);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate3(" Mostrando ", (ctx.currentPage - 1) * ctx.pageSize + 1, " - ", ctx.Math.min(ctx.currentPage * ctx.pageSize, ctx.parroquiasFiltradas.length), " de ", ctx.parroquiasFiltradas.length, " registros ");
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
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1e293b;\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.btn-with-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.mb-3[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 2px solid #e2e8f0;\n  background: #f8fafc;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd) {\n  background: #f9fafb;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #4f46e5);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);\n  transform: translateY(-1px);\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  color: white;\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background: #d97706;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n}\n.form-select[_ngcontent-%COMP%], .form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.form-select[_ngcontent-%COMP%]:focus, .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  border-bottom: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #475569;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #cbd5e1;\n}\n/*# sourceMappingURL=parroquias.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ParroquiasComponent, { className: "ParroquiasComponent", filePath: "app\\features\\admin\\pages\\parroquias\\parroquias.component.ts", lineNumber: 14 });
})();
export {
  ParroquiasComponent
};
//# sourceMappingURL=chunk-62CP5RFP.js.map
