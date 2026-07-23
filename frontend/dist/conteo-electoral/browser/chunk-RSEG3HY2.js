import {
  readSync,
  utils,
  writeFileSync
} from "./chunk-TMB2UGAI.js";
import {
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
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3DSQS3EE.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/parroquias/parroquias.component.ts
function ParroquiasComponent_option_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
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
function ParroquiasComponent_option_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
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
function ParroquiasComponent_tr_59_Template(rf, ctx) {
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
    \u0275\u0275elementStart(9, "td")(10, "div", 2)(11, "button", 26);
    \u0275\u0275element(12, "i", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "ul", 4)(14, "li")(15, "button", 7);
    \u0275\u0275listener("click", function ParroquiasComponent_tr_59_Template_button_click_15_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.edit(p_r4));
    });
    \u0275\u0275text(16, "Editar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "li");
    \u0275\u0275element(18, "hr", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "li")(20, "button", 28);
    \u0275\u0275listener("click", function ParroquiasComponent_tr_59_Template_button_click_20_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.delete(p_r4.id));
    });
    \u0275\u0275text(21, "Eliminar");
    \u0275\u0275elementEnd()()()()()();
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
function ParroquiasComponent_tr_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 29);
    \u0275\u0275text(2, "No se encontraron registros");
    \u0275\u0275elementEnd()();
  }
}
function ParroquiasComponent_span_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span")(1, "button", 30);
    \u0275\u0275listener("click", function ParroquiasComponent_span_69_Template_button_click_1_listener() {
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
function ParroquiasComponent_option_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
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
function ParroquiasComponent_div_79_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F4C2} Seleccionar archivo Excel...");
    \u0275\u0275elementEnd();
  }
}
function ParroquiasComponent_div_79_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4C4} ", ctx_r4.importFile.name, "");
  }
}
function ParroquiasComponent_div_79_div_22_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r11.index);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r11.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r11.canton);
  }
}
function ParroquiasComponent_div_79_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "p")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 48)(5, "table", 49)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "canton");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, ParroquiasComponent_div_79_div_22_tr_15_Template, 7, 3, "tr", 16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Vista previa (", ctx_r4.importPreview.length, " filas):");
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r4.importPreview);
  }
}
function ParroquiasComponent_div_79_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("alert-success", ctx_r4.importErrors.length === 0)("alert-warning", ctx_r4.importErrors.length > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.importSuccess);
  }
}
function ParroquiasComponent_div_79_div_24_li_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(err_r12);
  }
}
function ParroquiasComponent_div_79_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Errores:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "ul");
    \u0275\u0275template(5, ParroquiasComponent_div_79_div_24_li_5_Template, 2, 1, "li", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r4.importErrors);
  }
}
function ParroquiasComponent_div_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "div", 33)(3, "div", 34)(4, "h5");
    \u0275\u0275text(5, "\u{1F4E5} Importar Parroquias desde Excel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 35);
    \u0275\u0275listener("click", function ParroquiasComponent_div_79_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeImportModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 36)(9, "p", 37);
    \u0275\u0275text(10, "Selecciona un archivo Excel (.xlsx) con las columnas: ");
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12, "nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, ", ");
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15, "canton");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, ".");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 38)(18, "input", 39);
    \u0275\u0275listener("change", function ParroquiasComponent_div_79_Template_input_change_18_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onImportFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "label", 40);
    \u0275\u0275template(20, ParroquiasComponent_div_79_span_20_Template, 2, 0, "span", 17)(21, ParroquiasComponent_div_79_span_21_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(22, ParroquiasComponent_div_79_div_22_Template, 16, 2, "div", 41)(23, ParroquiasComponent_div_79_div_23_Template, 2, 5, "div", 42)(24, ParroquiasComponent_div_79_div_24_Template, 6, 1, "div", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 44)(26, "button", 45);
    \u0275\u0275listener("click", function ParroquiasComponent_div_79_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeImportModal());
    });
    \u0275\u0275text(27, "Cerrar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 46);
    \u0275\u0275listener("click", function ParroquiasComponent_div_79_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.importar());
    });
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(20);
    \u0275\u0275property("ngIf", !ctx_r4.importFile);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.importFile);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.importPreview && ctx_r4.importPreview.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.importSuccess);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.importErrors.length > 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r4.importPreview || ctx_r4.importPreview.length === 0 || ctx_r4.importing);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.importing ? "Importando..." : "Importar Datos", " ");
  }
}
function ParroquiasComponent_div_80_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.errorMessage);
  }
}
function ParroquiasComponent_div_80_option_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r14 = ctx.$implicit;
    \u0275\u0275property("value", c_r14.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r14.nombre);
  }
}
function ParroquiasComponent_div_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "div", 33)(3, "div", 34)(4, "h5");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 35);
    \u0275\u0275listener("click", function ParroquiasComponent_div_80_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 36);
    \u0275\u0275template(9, ParroquiasComponent_div_80_div_9_Template, 3, 1, "div", 52);
    \u0275\u0275elementStart(10, "div", 53)(11, "label");
    \u0275\u0275text(12, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_div_80_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.nombre, $event) || (ctx_r4.form.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ParroquiasComponent_div_80_Template_input_input_13_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toUpper(ctx_r4.form, "nombre"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 53)(15, "label");
    \u0275\u0275text(16, "Cant\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 55);
    \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_div_80_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.cantonId, $event) || (ctx_r4.form.cantonId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(18, "option", 11);
    \u0275\u0275text(19, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, ParroquiasComponent_div_80_option_20_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 53)(22, "label");
    \u0275\u0275text(23, "Descripci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "textarea", 56);
    \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_div_80_Template_textarea_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.descripcion, $event) || (ctx_r4.form.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ParroquiasComponent_div_80_Template_textarea_input_24_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toUpper(ctx_r4.form, "descripcion"));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 44)(26, "button", 45);
    \u0275\u0275listener("click", function ParroquiasComponent_div_80_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeModal());
    });
    \u0275\u0275text(27, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 57);
    \u0275\u0275listener("click", function ParroquiasComponent_div_80_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r13);
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
    this.showImportModal = false;
    this.importFile = null;
    this.importing = false;
    this.importPreview = null;
    this.importSuccess = "";
    this.importErrors = [];
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
  descargarTemplate() {
    const data = [["nombre", "canton"], ["PARROQUIA EJEMPLO", "CANTON EJEMPLO"]];
    const ws = utils.aoa_to_sheet(data);
    ws["!cols"] = [{ wch: 30 }, { wch: 30 }];
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Parroquias");
    writeFileSync(wb, "plantilla_parroquias.xlsx");
  }
  openImportModal() {
    this.showImportModal = true;
    this.importFile = null;
    this.importPreview = null;
    this.importSuccess = "";
    this.importErrors = [];
  }
  closeImportModal() {
    this.showImportModal = false;
    this.importFile = null;
    this.importPreview = null;
  }
  onImportFileSelected(event) {
    this.importFile = event.target.files?.[0] || null;
    this.importPreview = null;
    this.importSuccess = "";
    this.importErrors = [];
    if (!this.importFile)
      return;
    this.api.getCantones().subscribe((cantones) => this.cantones = cantones);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = readSync(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = utils.sheet_to_json(sheet);
      this.importPreview = json.map((row, i) => ({ index: i + 2, nombre: row["nombre"] || "", canton: row["canton"] || "" }));
    };
    reader.readAsArrayBuffer(this.importFile);
  }
  importar() {
    if (!this.importPreview || this.importPreview.length === 0)
      return;
    this.importing = true;
    this.importSuccess = "";
    this.importErrors = [];
    let completed = 0;
    let errors = 0;
    this.importPreview.forEach((item) => {
      if (!item.nombre) {
        errors++;
        this.importErrors.push(`Fila ${item.index}: nombre requerido`);
        completed++;
        return;
      }
      const canton = this.cantones.find((c) => c.nombre === item.canton);
      if (!item.canton || !canton) {
        errors++;
        this.importErrors.push(`Fila ${item.index}: cant\xF3n "${item.canton}" no encontrado`);
        completed++;
        return;
      }
      this.api.createParroquia({ nombre: item.nombre, cantonId: canton.id }).subscribe({
        next: () => {
          completed++;
          if (completed === this.importPreview.length)
            this.finishImport(errors);
        },
        error: (err) => {
          errors++;
          this.importErrors.push(`Fila ${item.index}: ${err.error?.message || "Error"}`);
          completed++;
          if (completed === this.importPreview.length)
            this.finishImport(errors);
        }
      });
    });
  }
  finishImport(errors) {
    this.importing = false;
    if (errors === 0)
      this.importSuccess = `\u2705 ${this.importPreview.length} registros importados correctamente.`;
    else
      this.importSuccess = `\u26A0\uFE0F Importaci\xF3n completada con ${errors} error(es).`;
    this.load();
  }
  static {
    this.\u0275fac = function ParroquiasComponent_Factory(t) {
      return new (t || _ParroquiasComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ParroquiasComponent, selectors: [["app-parroquias"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 81, vars: 24, consts: [[1, "container"], [1, "page-header"], [1, "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-primary", "dropdown-toggle"], [1, "dropdown-menu", "dropdown-menu-end"], [1, "dropdown-item", "fw-bold", 3, "click"], [1, "dropdown-divider"], [1, "dropdown-item", 3, "click"], [1, "filters-bar", "mb-4"], [1, "filter-item"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "autocomplete", "off", "placeholder", "Buscar en tabla...", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "table", "table-striped"], [1, "sortable", 3, "click"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "pagination-bar"], [1, "pagination-info"], [1, "pagination-controls"], [3, "click", "disabled"], [1, "pagination-size"], [3, "ngModelChange", "change", "ngModel"], ["class", "modal", 4, "ngIf"], [3, "value"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-sm", "btn-outline-secondary", "border-0"], [1, "bi", "bi-three-dots-vertical"], [1, "dropdown-item", "text-danger", 3, "click"], ["colspan", "5", 1, "text-center", "py-3"], [3, "click"], [1, "modal"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], [1, "text-muted", "mb-3"], [1, "upload-section", "mb-3"], ["type", "file", "autocomplete", "off", "accept", ".xlsx,.xls", "id", "importFileInput", 3, "change"], ["for", "importFileInput", 1, "file-label"], ["class", "import-preview", 4, "ngIf"], ["class", "alert", 3, "alert-success", "alert-warning", 4, "ngIf"], ["class", "errores-list", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "import-preview"], [1, "preview-table-wrapper"], [1, "table", "table-sm"], [1, "alert"], [1, "errores-list"], ["class", "mb-3", 4, "ngIf"], [1, "mb-3"], ["type", "text", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-danger"]], template: function ParroquiasComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Gesti\xF3n de Parroquias");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
        \u0275\u0275text(6, " Opciones ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "ul", 4)(8, "li")(9, "button", 5);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_9_listener() {
          return ctx.openModal();
        });
        \u0275\u0275text(10, "+ Nueva Parroquia");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "li");
        \u0275\u0275element(12, "hr", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "li")(14, "button", 7);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_14_listener() {
          return ctx.descargarTemplate();
        });
        \u0275\u0275text(15, "\u{1F4C4} Descargar Plantilla");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "li")(17, "button", 7);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_17_listener() {
          return ctx.openImportModal();
        });
        \u0275\u0275text(18, "\u{1F4E5} Importar desde Excel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "li");
        \u0275\u0275element(20, "hr", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "li")(22, "button", 7);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_22_listener() {
          return ctx.api.exportParroquiasPdf();
        });
        \u0275\u0275text(23, "\u{1F4C4} Imprimir PDF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "li")(25, "button", 7);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_25_listener() {
          return ctx.api.exportParroquiasExcel();
        });
        \u0275\u0275text(26, "\u{1F4CA} Exportar Excel");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(27, "div", 8)(28, "div", 9)(29, "label");
        \u0275\u0275text(30, "Provincia:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "select", 10);
        \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_Template_select_ngModelChange_31_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filterProvinciaId, $event) || (ctx.filterProvinciaId = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ParroquiasComponent_Template_select_change_31_listener() {
          return ctx.onProvinciaChange();
        });
        \u0275\u0275elementStart(32, "option", 11);
        \u0275\u0275text(33, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(34, ParroquiasComponent_option_34_Template, 2, 2, "option", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(35, "div", 9)(36, "label");
        \u0275\u0275text(37, "Cant\xF3n:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "select", 10);
        \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_Template_select_ngModelChange_38_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filterCantonId, $event) || (ctx.filterCantonId = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ParroquiasComponent_Template_select_change_38_listener() {
          return ctx.filtrarPorCanton();
        });
        \u0275\u0275elementStart(39, "option", 11);
        \u0275\u0275text(40, "Todos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(41, ParroquiasComponent_option_41_Template, 2, 2, "option", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "div", 9)(43, "label");
        \u0275\u0275text(44, "Buscar:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "input", 13);
        \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_Template_input_ngModelChange_45_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
          return $event;
        });
        \u0275\u0275listener("input", function ParroquiasComponent_Template_input_input_45_listener() {
          return ctx.currentPage = 1;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(46, "table", 14)(47, "thead")(48, "tr")(49, "th");
        \u0275\u0275text(50, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "th", 15);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_th_click_51_listener() {
          return ctx.sort("nombre");
        });
        \u0275\u0275text(52);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "th", 15);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_th_click_53_listener() {
          return ctx.sort("cantonNombre");
        });
        \u0275\u0275text(54);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "th", 15);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_th_click_55_listener() {
          return ctx.sort("descripcion");
        });
        \u0275\u0275text(56);
        \u0275\u0275elementEnd();
        \u0275\u0275element(57, "th");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "tbody");
        \u0275\u0275template(59, ParroquiasComponent_tr_59_Template, 22, 4, "tr", 16)(60, ParroquiasComponent_tr_60_Template, 3, 0, "tr", 17);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(61, "div", 18)(62, "div", 19);
        \u0275\u0275text(63);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "div", 20)(65, "button", 21);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_65_listener() {
          return ctx.goToPage(1);
        });
        \u0275\u0275text(66, "\xAB\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "button", 21);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_67_listener() {
          return ctx.prevPage();
        });
        \u0275\u0275text(68, "\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275template(69, ParroquiasComponent_span_69_Template, 3, 3, "span", 16);
        \u0275\u0275elementStart(70, "button", 21);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_70_listener() {
          return ctx.nextPage();
        });
        \u0275\u0275text(71, "\xBB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "button", 21);
        \u0275\u0275listener("click", function ParroquiasComponent_Template_button_click_72_listener() {
          return ctx.goToPage(ctx.totalPages);
        });
        \u0275\u0275text(73, "\xBB\xBB");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(74, "div", 22)(75, "label");
        \u0275\u0275text(76, "Filas:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "select", 23);
        \u0275\u0275twoWayListener("ngModelChange", function ParroquiasComponent_Template_select_ngModelChange_77_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
          return $event;
        });
        \u0275\u0275listener("change", function ParroquiasComponent_Template_select_change_77_listener() {
          return ctx.onPageSizeChange();
        });
        \u0275\u0275template(78, ParroquiasComponent_option_78_Template, 2, 2, "option", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(79, ParroquiasComponent_div_79_Template, 30, 7, "div", 24)(80, ParroquiasComponent_div_80_Template, 30, 7, "div", 24);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(31);
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
        \u0275\u0275advance(3);
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
        \u0275\u0275property("ngIf", ctx.showImportModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showModal);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1e293b;\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.btn-with-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.mb-3[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 2px solid #e2e8f0;\n  background: #f8fafc;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd) {\n  background: #f9fafb;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #4f46e5);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);\n  transform: translateY(-1px);\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  color: white;\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background: #d97706;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n}\n.form-select[_ngcontent-%COMP%], .form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.form-select[_ngcontent-%COMP%]:focus, .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  border-bottom: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #475569;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #cbd5e1;\n}\n.upload-section[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.upload-section[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.file-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 18px;\n  background: #f8fafc;\n  border: 1.5px dashed #cbd5e1;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 13px;\n  color: #475569;\n  transition: all 0.2s;\n}\n.file-label[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  background: #eff6ff;\n  color: #1e40af;\n}\n.import-preview[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.preview-table-wrapper[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow-y: auto;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}\n.preview-table-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.preview-table-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n}\n.errores-list[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border-radius: 8px;\n  padding: 12px 16px;\n  border: 1px solid #fecaca;\n  margin-top: 8px;\n}\n.errores-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-weight: 600;\n  color: #991b1b;\n  font-size: 13px;\n}\n.errores-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0 0 0 20px;\n}\n.errores-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #991b1b;\n  margin-bottom: 2px;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-top: 8px;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #166534;\n  border: 1px solid #bbf7d0;\n}\n.alert-warning[_ngcontent-%COMP%] {\n  background: #fefce8;\n  color: #854d0e;\n  border: 1px solid #fef08a;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 13px;\n}\n/*# sourceMappingURL=parroquias.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ParroquiasComponent, { className: "ParroquiasComponent", filePath: "app\\features\\admin\\pages\\parroquias\\parroquias.component.ts", lineNumber: 15 });
})();
export {
  ParroquiasComponent
};
//# sourceMappingURL=chunk-RSEG3HY2.js.map
