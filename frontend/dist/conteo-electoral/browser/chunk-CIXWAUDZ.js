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
} from "./chunk-QNZTKR3G.js";
import {
  ApiService
} from "./chunk-4SK2KJWF.js";
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
} from "./chunk-6TL4F4J6.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/partidos/partidos.component.ts
function PartidosComponent_li_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 28);
    \u0275\u0275listener("click", function PartidosComponent_li_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal());
    });
    \u0275\u0275text(2, "+ Nuevo Partido");
    \u0275\u0275elementEnd()();
  }
}
function PartidosComponent_option_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
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
function PartidosComponent_tr_52_li_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 7);
    \u0275\u0275listener("click", function PartidosComponent_tr_52_li_13_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const p_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit(p_r5));
    });
    \u0275\u0275text(2, "Editar");
    \u0275\u0275elementEnd()();
  }
}
function PartidosComponent_tr_52_hr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "hr", 6);
  }
}
function PartidosComponent_tr_52_li_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 34);
    \u0275\u0275listener("click", function PartidosComponent_tr_52_li_16_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const p_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.delete(p_r5.id));
    });
    \u0275\u0275text(2, "Eliminar");
    \u0275\u0275elementEnd()();
  }
}
function PartidosComponent_tr_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 30);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "div", 2)(10, "button", 31);
    \u0275\u0275element(11, "i", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "ul", 4);
    \u0275\u0275template(13, PartidosComponent_tr_52_li_13_Template, 3, 0, "li", 5);
    \u0275\u0275elementStart(14, "li");
    \u0275\u0275template(15, PartidosComponent_tr_52_hr_15_Template, 1, 0, "hr", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, PartidosComponent_tr_52_li_16_Template, 3, 0, "li", 5);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r1.currentPage - 1) * ctx_r1.pageSize + i_r7 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.nombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r5.sigla);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function PartidosComponent_tr_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 35);
    \u0275\u0275text(2, "No se encontraron registros");
    \u0275\u0275elementEnd()();
  }
}
function PartidosComponent_span_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span")(1, "button", 36);
    \u0275\u0275listener("click", function PartidosComponent_span_62_Template_button_click_1_listener() {
      const p_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(p_r9));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", p_r9 === ctx_r1.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r9);
  }
}
function PartidosComponent_option_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r10 = ctx.$implicit;
    \u0275\u0275property("value", s_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r10);
  }
}
function PartidosComponent_div_72_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275text(2, " Seleccionar archivo Excel...");
    \u0275\u0275elementEnd();
  }
}
function PartidosComponent_div_72_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.importFile.name, "");
  }
}
function PartidosComponent_div_72_div_23_tr_15_Template(rf, ctx) {
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
    const row_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.index);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.siglas);
  }
}
function PartidosComponent_div_72_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "p")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 56)(5, "table", 57)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "siglas");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, PartidosComponent_div_72_div_23_tr_15_Template, 7, 3, "tr", 20);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Vista previa (", ctx_r1.importPreview.length, " filas):");
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r1.importPreview);
  }
}
function PartidosComponent_div_72_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("alert-success", ctx_r1.importErrors.length === 0)("alert-warning", ctx_r1.importErrors.length > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.importSuccess);
  }
}
function PartidosComponent_div_72_div_25_li_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(err_r13);
  }
}
function PartidosComponent_div_72_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Errores:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "ul");
    \u0275\u0275template(5, PartidosComponent_div_72_div_25_li_5_Template, 2, 1, "li", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.importErrors);
  }
}
function PartidosComponent_div_72_button_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275listener("click", function PartidosComponent_div_72_button_29_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.importar());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.importPreview || ctx_r1.importPreview.length === 0 || ctx_r1.importing);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.importing ? "Importando..." : "Importar Datos", " ");
  }
}
function PartidosComponent_div_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38)(2, "div", 39)(3, "div", 40)(4, "h5");
    \u0275\u0275element(5, "i", 9);
    \u0275\u0275text(6, " Importar Partidos desde Excel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 41);
    \u0275\u0275listener("click", function PartidosComponent_div_72_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeImportModal());
    });
    \u0275\u0275text(8, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 42)(10, "p", 43);
    \u0275\u0275text(11, "Selecciona un archivo Excel (.xlsx) con las columnas: ");
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13, "nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, ", ");
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16, "siglas");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, ".");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 44)(19, "input", 45);
    \u0275\u0275listener("change", function PartidosComponent_div_72_Template_input_change_19_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onImportFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "label", 46);
    \u0275\u0275template(21, PartidosComponent_div_72_span_21_Template, 3, 0, "span", 5)(22, PartidosComponent_div_72_span_22_Template, 3, 1, "span", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, PartidosComponent_div_72_div_23_Template, 16, 2, "div", 47)(24, PartidosComponent_div_72_div_24_Template, 2, 5, "div", 48)(25, PartidosComponent_div_72_div_25_Template, 6, 1, "div", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 50)(27, "button", 51);
    \u0275\u0275listener("click", function PartidosComponent_div_72_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeImportModal());
    });
    \u0275\u0275text(28, "Cerrar");
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, PartidosComponent_div_72_button_29_Template, 2, 2, "button", 52);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275property("ngIf", !ctx_r1.importFile);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.importFile);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.importPreview && ctx_r1.importPreview.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.importSuccess);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.importErrors.length > 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function PartidosComponent_div_73_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function PartidosComponent_div_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38)(2, "div", 39)(3, "div", 40)(4, "h5");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 41);
    \u0275\u0275listener("click", function PartidosComponent_div_73_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 42);
    \u0275\u0275template(9, PartidosComponent_div_73_div_9_Template, 3, 1, "div", 61);
    \u0275\u0275elementStart(10, "div", 62)(11, "label");
    \u0275\u0275text(12, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function PartidosComponent_div_73_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.nombre, $event) || (ctx_r1.form.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function PartidosComponent_div_73_Template_input_input_13_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toUpper(ctx_r1.form, "nombre"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 62)(15, "label");
    \u0275\u0275text(16, "Sigla:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function PartidosComponent_div_73_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.sigla, $event) || (ctx_r1.form.sigla = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function PartidosComponent_div_73_Template_input_input_17_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toUpper(ctx_r1.form, "sigla"));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 50)(19, "button", 51);
    \u0275\u0275listener("click", function PartidosComponent_div_73_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(20, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 64);
    \u0275\u0275listener("click", function PartidosComponent_div_73_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(22, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.editMode ? "Editar" : "Nuevo", " Partido");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.sigla);
  }
}
var PartidosComponent = class _PartidosComponent {
  constructor(api) {
    this.api = api;
    this.partidos = [];
    this.elecciones = [];
    this.showModal = false;
    this.editMode = false;
    this.selectedId = null;
    this.form = { nombre: "", sigla: "", eleccionesId: null };
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
  get isAdmin() {
    try {
      const user = JSON.parse(localStorage.getItem("electoral_user") || "{}");
      return user.rol === "ADMIN";
    } catch {
      return false;
    }
  }
  ngOnInit() {
    this.api.getElecciones().subscribe((e) => {
      this.elecciones = e;
      if (e.length > 0)
        this.load(e[0].id);
    });
  }
  load(eleccionId) {
    this.api.getPartidosByEleccion(eleccionId).subscribe((d) => this.partidos = d);
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
  get partidosOrdenados() {
    if (!this.sortColumn)
      return this.partidos;
    return [...this.partidos].sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];
      if (valA == null)
        return 1;
      if (valB == null)
        return -1;
      const cmp = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
      return this.sortDirection === "asc" ? cmp : -cmp;
    });
  }
  get partidosFiltrados() {
    if (!this.searchText)
      return this.partidosOrdenados;
    const term = this.searchText.toLowerCase();
    return this.partidosOrdenados.filter((item) => Object.values(item).some((v) => v != null && String(v).toLowerCase().includes(term)));
  }
  get partidosPaginados() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.partidosFiltrados.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.partidosFiltrados.length / this.pageSize) || 1;
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
    this.form = { nombre: "", sigla: "", eleccionesId: this.elecciones[0]?.id };
    this.errorMessage = "";
    this.showModal = true;
  }
  edit(partido) {
    this.editMode = true;
    this.selectedId = partido.id;
    this.form = { nombre: partido.nombre, sigla: partido.sigla, eleccionesId: partido.eleccionesId || this.form.eleccionesId };
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
      this.api.updatePartido(this.selectedId, this.form).subscribe({
        next: () => {
          this.load(this.form.eleccionesId);
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Error al guardar. Intente de nuevo.";
        }
      });
    } else {
      this.api.createPartido(this.form).subscribe({
        next: () => {
          this.load(this.form.eleccionesId);
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Error al guardar. Intente de nuevo.";
        }
      });
    }
  }
  delete(id) {
    if (confirm("Esta seguro de eliminar este partido?")) {
      this.api.deletePartido(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
  descargarTemplate() {
    const data = [["nombre", "siglas"], ["PARTIDO EJEMPLO", "SIGLAS"]];
    const ws = utils.aoa_to_sheet(data);
    ws["!cols"] = [{ wch: 30 }, { wch: 20 }];
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Partidos");
    writeFileSync(wb, "plantilla_partidos.xlsx");
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
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = readSync(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = utils.sheet_to_json(sheet);
      this.importPreview = json.map((row, i) => ({ index: i + 2, nombre: row["nombre"] || "", siglas: row["siglas"] || "" }));
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
      if (!item.siglas) {
        errors++;
        this.importErrors.push(`Fila ${item.index}: siglas requerido`);
        completed++;
        return;
      }
      this.api.createPartido({ nombre: item.nombre, sigla: item.siglas }).subscribe({
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
      this.importSuccess = `${this.importPreview.length} registros importados correctamente.`;
    else
      this.importSuccess = `Importaci\xF3n completada con ${errors} error(es).`;
    this.load(this.form.eleccionesId);
  }
  static {
    this.\u0275fac = function PartidosComponent_Factory(t) {
      return new (t || _PartidosComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PartidosComponent, selectors: [["app-partidos"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 74, vars: 21, consts: [[1, "container"], [1, "page-header"], [1, "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-primary", "dropdown-toggle"], [1, "dropdown-menu", "dropdown-menu-end"], [4, "ngIf"], [1, "dropdown-divider"], [1, "dropdown-item", 3, "click"], [1, "bi", "bi-file-earmark-arrow-down"], [1, "bi", "bi-box-arrow-in-down"], [1, "bi", "bi-printer"], [1, "bi", "bi-file-earmark-spreadsheet"], [1, "filters-bar", "mb-4"], [1, "filter-item"], [1, "form-select", 3, "change", "ngModelChange", "ngModel"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "autocomplete", "off", "placeholder", "Buscar en tabla...", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "table", "table-striped"], [1, "sortable", 3, "click"], [4, "ngFor", "ngForOf"], [1, "pagination-bar"], [1, "pagination-info"], [1, "pagination-controls"], [3, "click", "disabled"], [1, "pagination-size"], [3, "ngModelChange", "change", "ngModel"], ["class", "modal", 4, "ngIf"], [1, "dropdown-item", "fw-bold", 3, "click"], [3, "value"], [1, "badge", "bg-info"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-sm", "btn-outline-secondary", "border-0"], [1, "bi", "bi-three-dots-vertical"], ["class", "dropdown-divider", 4, "ngIf"], [1, "dropdown-item", "text-danger", 3, "click"], ["colspan", "4", 1, "text-center", "py-3"], [3, "click"], [1, "modal"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], [1, "text-muted", "mb-3"], [1, "upload-section", "mb-3"], ["type", "file", "autocomplete", "off", "accept", ".xlsx,.xls", "id", "importFileInput", 3, "change"], ["for", "importFileInput", 1, "file-label"], ["class", "import-preview", 4, "ngIf"], ["class", "alert", 3, "alert-success", "alert-warning", 4, "ngIf"], ["class", "errores-list", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], ["class", "btn btn-primary", 3, "disabled", "click", 4, "ngIf"], [1, "bi", "bi-folder2-open"], [1, "bi", "bi-file-earmark-text"], [1, "import-preview"], [1, "preview-table-wrapper"], [1, "table", "table-sm"], [1, "alert"], [1, "errores-list"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "mb-3", 4, "ngIf"], [1, "mb-3"], ["type", "text", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-danger"]], template: function PartidosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Gesti\xF3n de Partidos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
        \u0275\u0275text(6, " Opciones ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "ul", 4);
        \u0275\u0275template(8, PartidosComponent_li_8_Template, 3, 0, "li", 5);
        \u0275\u0275elementStart(9, "li");
        \u0275\u0275element(10, "hr", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "li")(12, "button", 7);
        \u0275\u0275listener("click", function PartidosComponent_Template_button_click_12_listener() {
          return ctx.descargarTemplate();
        });
        \u0275\u0275element(13, "i", 8);
        \u0275\u0275text(14, " Descargar Plantilla");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "li")(16, "button", 7);
        \u0275\u0275listener("click", function PartidosComponent_Template_button_click_16_listener() {
          return ctx.openImportModal();
        });
        \u0275\u0275element(17, "i", 9);
        \u0275\u0275text(18, " Importar desde Excel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "li");
        \u0275\u0275element(20, "hr", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "li")(22, "button", 7);
        \u0275\u0275listener("click", function PartidosComponent_Template_button_click_22_listener() {
          return ctx.api.exportPartidosPdf();
        });
        \u0275\u0275element(23, "i", 10);
        \u0275\u0275text(24, " Imprimir PDF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "li")(26, "button", 7);
        \u0275\u0275listener("click", function PartidosComponent_Template_button_click_26_listener() {
          return ctx.api.exportPartidosExcel();
        });
        \u0275\u0275element(27, "i", 11);
        \u0275\u0275text(28, " Exportar Excel");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(29, "div", 12)(30, "div", 13)(31, "label");
        \u0275\u0275text(32, "Elecci\xF3n:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "select", 14);
        \u0275\u0275listener("change", function PartidosComponent_Template_select_change_33_listener() {
          ctx.load(ctx.form.eleccionesId);
          return ctx.currentPage = 1;
        });
        \u0275\u0275twoWayListener("ngModelChange", function PartidosComponent_Template_select_ngModelChange_33_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.eleccionesId, $event) || (ctx.form.eleccionesId = $event);
          return $event;
        });
        \u0275\u0275elementStart(34, "option", 15);
        \u0275\u0275text(35, "Seleccione...");
        \u0275\u0275elementEnd();
        \u0275\u0275template(36, PartidosComponent_option_36_Template, 2, 2, "option", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 13)(38, "label");
        \u0275\u0275text(39, "Buscar:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "input", 17);
        \u0275\u0275twoWayListener("ngModelChange", function PartidosComponent_Template_input_ngModelChange_40_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
          return $event;
        });
        \u0275\u0275listener("input", function PartidosComponent_Template_input_input_40_listener() {
          return ctx.currentPage = 1;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(41, "table", 18)(42, "thead")(43, "tr")(44, "th");
        \u0275\u0275text(45, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "th", 19);
        \u0275\u0275listener("click", function PartidosComponent_Template_th_click_46_listener() {
          return ctx.sort("nombre");
        });
        \u0275\u0275text(47);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "th", 19);
        \u0275\u0275listener("click", function PartidosComponent_Template_th_click_48_listener() {
          return ctx.sort("sigla");
        });
        \u0275\u0275text(49);
        \u0275\u0275elementEnd();
        \u0275\u0275element(50, "th");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(51, "tbody");
        \u0275\u0275template(52, PartidosComponent_tr_52_Template, 17, 6, "tr", 20)(53, PartidosComponent_tr_53_Template, 3, 0, "tr", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(54, "div", 21)(55, "div", 22);
        \u0275\u0275text(56);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "div", 23)(58, "button", 24);
        \u0275\u0275listener("click", function PartidosComponent_Template_button_click_58_listener() {
          return ctx.goToPage(1);
        });
        \u0275\u0275text(59, "\xAB\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "button", 24);
        \u0275\u0275listener("click", function PartidosComponent_Template_button_click_60_listener() {
          return ctx.prevPage();
        });
        \u0275\u0275text(61, "\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275template(62, PartidosComponent_span_62_Template, 3, 3, "span", 20);
        \u0275\u0275elementStart(63, "button", 24);
        \u0275\u0275listener("click", function PartidosComponent_Template_button_click_63_listener() {
          return ctx.nextPage();
        });
        \u0275\u0275text(64, "\xBB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "button", 24);
        \u0275\u0275listener("click", function PartidosComponent_Template_button_click_65_listener() {
          return ctx.goToPage(ctx.totalPages);
        });
        \u0275\u0275text(66, "\xBB\xBB");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(67, "div", 25)(68, "label");
        \u0275\u0275text(69, "Filas:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "select", 26);
        \u0275\u0275twoWayListener("ngModelChange", function PartidosComponent_Template_select_ngModelChange_70_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
          return $event;
        });
        \u0275\u0275listener("change", function PartidosComponent_Template_select_change_70_listener() {
          return ctx.onPageSizeChange();
        });
        \u0275\u0275template(71, PartidosComponent_option_71_Template, 2, 2, "option", 16);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(72, PartidosComponent_div_72_Template, 30, 6, "div", 27)(73, PartidosComponent_div_73_Template, 23, 4, "div", 27);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.isAdmin);
        \u0275\u0275advance(25);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.eleccionesId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.elecciones);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("Nombre ", ctx.sortColumn === "nombre" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Sigla ", ctx.sortColumn === "sigla" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.partidosPaginados);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.partidosFiltrados.length === 0);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate3(" Mostrando ", (ctx.currentPage - 1) * ctx.pageSize + 1, " - ", ctx.Math.min(ctx.currentPage * ctx.pageSize, ctx.partidosFiltrados.length), " de ", ctx.partidosFiltrados.length, " registros ");
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
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--alantek-text);\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.btn-with-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  padding: 16px;\n  background: var(--alantek-background);\n  border-radius: 12px;\n}\n.filter-item[_ngcontent-%COMP%] {\n  flex: 0 0 300px;\n}\n.filter-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--alantek-text-secondary);\n}\n.mb-3[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.mb-4[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 2px solid var(--alantek-border);\n  background: var(--alantek-background);\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  color: var(--alantek-text-muted);\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid var(--alantek-border);\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd) {\n  background: var(--alantek-background);\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--alantek-primary);\n  color: white;\n  box-shadow: 0 2px 8px rgba(27, 36, 29, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-primary-strong);\n  box-shadow: 0 4px 12px rgba(27, 36, 29, 0.4);\n  transform: translateY(-1px);\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background: var(--alantek-highlight);\n  color: white;\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-accent);\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: var(--alantek-danger);\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-danger);\n}\n.btn-info[_ngcontent-%COMP%] {\n  background: var(--alantek-info);\n  color: white;\n}\n.btn-info[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-info);\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.bg-danger[_ngcontent-%COMP%] {\n  background: var(--alantek-danger) !important;\n  color: white !important;\n}\n.bg-warning[_ngcontent-%COMP%] {\n  background: var(--alantek-highlight) !important;\n  color: white !important;\n}\n.bg-info[_ngcontent-%COMP%] {\n  background: var(--alantek-info) !important;\n  color: white !important;\n}\n.bg-success[_ngcontent-%COMP%] {\n  background: var(--alantek-success) !important;\n  color: white !important;\n}\n.bg-secondary[_ngcontent-%COMP%] {\n  background: var(--alantek-text-muted) !important;\n  color: white !important;\n}\n.form-select[_ngcontent-%COMP%], .form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid var(--alantek-border-strong);\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.form-select[_ngcontent-%COMP%]:focus, .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--alantek-primary);\n  box-shadow: 0 0 0 3px rgba(217, 119, 50, 0.15);\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  border-bottom: 1px solid var(--alantek-border);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid var(--alantek-border);\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: var(--alantek-text-muted);\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: var(--alantek-border);\n  color: var(--alantek-text-secondary);\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-border-strong);\n}\n.upload-section[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.upload-section[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.file-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 18px;\n  background: var(--alantek-background);\n  border: 1.5px dashed var(--alantek-border-strong);\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 13px;\n  color: var(--alantek-text-secondary);\n  transition: all 0.2s;\n}\n.file-label[_ngcontent-%COMP%]:hover {\n  border-color: var(--alantek-primary);\n  background: var(--alantek-info-bg);\n  color: var(--alantek-primary-strong);\n}\n.import-preview[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.preview-table-wrapper[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow-y: auto;\n  border: 1px solid var(--alantek-border);\n  border-radius: 8px;\n}\n.preview-table-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.preview-table-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n}\n.errores-list[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg);\n  border-radius: 8px;\n  padding: 12px 16px;\n  border: 1px solid var(--alantek-danger);\n  margin-top: 8px;\n}\n.errores-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-weight: 600;\n  color: var(--alantek-danger);\n  font-size: 13px;\n}\n.errores-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0 0 0 20px;\n}\n.errores-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--alantek-danger);\n  margin-bottom: 2px;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-top: 8px;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: var(--alantek-success-bg);\n  color: var(--alantek-success);\n  border: 1px solid var(--alantek-success);\n}\n.alert-warning[_ngcontent-%COMP%] {\n  background: var(--alantek-warning-bg);\n  color: var(--alantek-warning);\n  border: 1px solid var(--alantek-highlight);\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted);\n  font-size: 13px;\n}\n/*# sourceMappingURL=partidos.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PartidosComponent, { className: "PartidosComponent", filePath: "app\\features\\admin\\pages\\partidos\\partidos.component.ts", lineNumber: 15 });
})();
export {
  PartidosComponent
};
//# sourceMappingURL=chunk-CIXWAUDZ.js.map
