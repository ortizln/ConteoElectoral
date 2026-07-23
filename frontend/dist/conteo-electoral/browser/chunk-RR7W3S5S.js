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

// src/app/features/admin/pages/candidatos/candidatos.component.ts
function CandidatosComponent_li_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 24);
    \u0275\u0275listener("click", function CandidatosComponent_li_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal());
    });
    \u0275\u0275text(2, "+ Nuevo Candidato");
    \u0275\u0275elementEnd()();
  }
}
function CandidatosComponent_option_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
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
function CandidatosComponent_tr_52_li_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 7);
    \u0275\u0275listener("click", function CandidatosComponent_tr_52_li_16_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const c_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit(c_r5));
    });
    \u0275\u0275text(2, "Editar");
    \u0275\u0275elementEnd()();
  }
}
function CandidatosComponent_tr_52_hr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "hr", 6);
  }
}
function CandidatosComponent_tr_52_li_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 29);
    \u0275\u0275listener("click", function CandidatosComponent_tr_52_li_19_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const c_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.delete(c_r5.id));
    });
    \u0275\u0275text(2, "Eliminar");
    \u0275\u0275elementEnd()();
  }
}
function CandidatosComponent_tr_52_Template(rf, ctx) {
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
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "div", 2)(13, "button", 26);
    \u0275\u0275element(14, "i", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ul", 4);
    \u0275\u0275template(16, CandidatosComponent_tr_52_li_16_Template, 3, 0, "li", 5);
    \u0275\u0275elementStart(17, "li");
    \u0275\u0275template(18, CandidatosComponent_tr_52_hr_18_Template, 1, 0, "hr", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, CandidatosComponent_tr_52_li_19_Template, 3, 0, "li", 5);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r1.currentPage - 1) * ctx_r1.pageSize + i_r7 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.apellido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.partidoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.cargoNombre);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function CandidatosComponent_tr_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 30);
    \u0275\u0275text(2, "No se encontraron registros");
    \u0275\u0275elementEnd()();
  }
}
function CandidatosComponent_span_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span")(1, "button", 31);
    \u0275\u0275listener("click", function CandidatosComponent_span_62_Template_button_click_1_listener() {
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
function CandidatosComponent_option_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
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
function CandidatosComponent_div_72_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F4C2} Seleccionar archivo Excel...");
    \u0275\u0275elementEnd();
  }
}
function CandidatosComponent_div_72_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4C4} ", ctx_r1.importFile.name, "");
  }
}
function CandidatosComponent_div_72_div_28_tr_19_Template(rf, ctx) {
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
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.index);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.apellido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.partido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.cargo);
  }
}
function CandidatosComponent_div_72_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "p")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 49)(5, "table", 50)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "apellido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "cargo");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275template(19, CandidatosComponent_div_72_div_28_tr_19_Template, 11, 5, "tr", 16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Vista previa (", ctx_r1.importPreview.length, " filas):");
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.importPreview);
  }
}
function CandidatosComponent_div_72_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
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
function CandidatosComponent_div_72_div_30_li_5_Template(rf, ctx) {
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
function CandidatosComponent_div_72_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Errores:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "ul");
    \u0275\u0275template(5, CandidatosComponent_div_72_div_30_li_5_Template, 2, 1, "li", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.importErrors);
  }
}
function CandidatosComponent_div_72_button_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function CandidatosComponent_div_72_button_34_Template_button_click_0_listener() {
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
function CandidatosComponent_div_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "div", 34)(3, "div", 35)(4, "h5");
    \u0275\u0275text(5, "\u{1F4E5} Importar Candidatos desde Excel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 36);
    \u0275\u0275listener("click", function CandidatosComponent_div_72_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeImportModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 37)(9, "p", 38);
    \u0275\u0275text(10, "Selecciona un archivo Excel (.xlsx) con las columnas: ");
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12, "nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, ", ");
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15, "apellido");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, ", ");
    \u0275\u0275elementStart(17, "strong");
    \u0275\u0275text(18, "partido");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, ", ");
    \u0275\u0275elementStart(20, "strong");
    \u0275\u0275text(21, "cargo");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22, ".");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 39)(24, "input", 40);
    \u0275\u0275listener("change", function CandidatosComponent_div_72_Template_input_change_24_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onImportFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "label", 41);
    \u0275\u0275template(26, CandidatosComponent_div_72_span_26_Template, 2, 0, "span", 5)(27, CandidatosComponent_div_72_span_27_Template, 2, 1, "span", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(28, CandidatosComponent_div_72_div_28_Template, 20, 2, "div", 42)(29, CandidatosComponent_div_72_div_29_Template, 2, 5, "div", 43)(30, CandidatosComponent_div_72_div_30_Template, 6, 1, "div", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 45)(32, "button", 46);
    \u0275\u0275listener("click", function CandidatosComponent_div_72_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeImportModal());
    });
    \u0275\u0275text(33, "Cerrar");
    \u0275\u0275elementEnd();
    \u0275\u0275template(34, CandidatosComponent_div_72_button_34_Template, 2, 2, "button", 47);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(26);
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
function CandidatosComponent_div_73_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function CandidatosComponent_div_73_option_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r16 = ctx.$implicit;
    \u0275\u0275property("value", p_r16.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r16.nombre);
  }
}
function CandidatosComponent_div_73_option_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r17 = ctx.$implicit;
    \u0275\u0275property("value", c_r17.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r17.nombre);
  }
}
function CandidatosComponent_div_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "div", 34)(3, "div", 35)(4, "h5");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 36);
    \u0275\u0275listener("click", function CandidatosComponent_div_73_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 37);
    \u0275\u0275template(9, CandidatosComponent_div_73_div_9_Template, 3, 1, "div", 54);
    \u0275\u0275elementStart(10, "div", 55)(11, "label");
    \u0275\u0275text(12, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function CandidatosComponent_div_73_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.nombre, $event) || (ctx_r1.form.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function CandidatosComponent_div_73_Template_input_input_13_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toUpper(ctx_r1.form, "nombre"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 55)(15, "label");
    \u0275\u0275text(16, "Apellido:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function CandidatosComponent_div_73_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.apellido, $event) || (ctx_r1.form.apellido = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function CandidatosComponent_div_73_Template_input_input_17_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toUpper(ctx_r1.form, "apellido"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 55)(19, "label");
    \u0275\u0275text(20, "Partido:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 57);
    \u0275\u0275twoWayListener("ngModelChange", function CandidatosComponent_div_73_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.partidoId, $event) || (ctx_r1.form.partidoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(22, "option", 11);
    \u0275\u0275text(23, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, CandidatosComponent_div_73_option_24_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 55)(26, "label");
    \u0275\u0275text(27, "Cargo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "select", 57);
    \u0275\u0275twoWayListener("ngModelChange", function CandidatosComponent_div_73_Template_select_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.cargoId, $event) || (ctx_r1.form.cargoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(29, "option", 11);
    \u0275\u0275text(30, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, CandidatosComponent_div_73_option_31_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 45)(33, "button", 46);
    \u0275\u0275listener("click", function CandidatosComponent_div_73_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(34, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 58);
    \u0275\u0275listener("click", function CandidatosComponent_div_73_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(36, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.editMode ? "Editar" : "Nuevo", " Candidato");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.apellido);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.partidoId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.partidos);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.cargoId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.cargos);
  }
}
var CandidatosComponent = class _CandidatosComponent {
  constructor(api) {
    this.api = api;
    this.candidatos = [];
    this.elecciones = [];
    this.partidos = [];
    this.cargos = [];
    this.showModal = false;
    this.editMode = false;
    this.selectedId = null;
    this.form = { nombre: "", apellido: "", partidoId: null, cargoId: null, eleccionesId: null };
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
      if (e.length > 0) {
        this.form.eleccionesId = e[0].id;
        this.load(e[0].id);
      }
    });
  }
  load(eleccionId) {
    this.api.getCandidatosByEleccion(eleccionId).subscribe((d) => this.candidatos = d);
    this.api.getPartidosByEleccion(eleccionId).subscribe((d) => this.partidos = d);
    this.api.getCargosByEleccion(eleccionId).subscribe((d) => this.cargos = d);
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
  get candidatosOrdenados() {
    if (!this.sortColumn)
      return this.candidatos;
    return [...this.candidatos].sort((a, b) => {
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
  get candidatosFiltrados() {
    if (!this.searchText)
      return this.candidatosOrdenados;
    const term = this.searchText.toLowerCase();
    return this.candidatosOrdenados.filter((item) => Object.values(item).some((v) => v != null && String(v).toLowerCase().includes(term)));
  }
  get candidatosPaginados() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.candidatosFiltrados.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.candidatosFiltrados.length / this.pageSize) || 1;
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
    this.form = { nombre: "", apellido: "", partidoId: null, cargoId: this.cargos[0]?.id, eleccionesId: this.form.eleccionesId };
    this.errorMessage = "";
    this.showModal = true;
  }
  edit(c) {
    this.editMode = true;
    this.selectedId = c.id;
    this.form = { nombre: c.nombre, apellido: c.apellido, partidoId: c.partidoId, cargoId: c.cargoId, eleccionesId: c.eleccionesId };
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
      this.api.updateCandidato(this.selectedId, this.form).subscribe({
        next: () => {
          this.load(this.form.eleccionesId);
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Error al guardar. Intente de nuevo.";
        }
      });
    } else {
      this.api.createCandidato(this.form).subscribe({
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
    if (confirm("Esta seguro de eliminar este candidato?")) {
      this.api.deleteCandidato(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
  descargarTemplate() {
    const data = [["nombre", "apellido", "partido", "cargo"], ["NOMBRE EJEMPLO", "APELLIDO EJEMPLO", "PARTIDO EJEMPLO", "CARGO EJEMPLO"]];
    const ws = utils.aoa_to_sheet(data);
    ws["!cols"] = [{ wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }];
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Candidatos");
    writeFileSync(wb, "plantilla_candidatos.xlsx");
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
    const elecId = this.form.eleccionesId;
    if (elecId) {
      this.api.getPartidosByEleccion(elecId).subscribe((d) => this.partidos = d);
      this.api.getCargosByEleccion(elecId).subscribe((d) => this.cargos = d);
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = readSync(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = utils.sheet_to_json(sheet);
      this.importPreview = json.map((row, i) => ({ index: i + 2, nombre: row["nombre"] || "", apellido: row["apellido"] || "", partido: row["partido"] || "", cargo: row["cargo"] || "" }));
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
      if (!item.apellido) {
        errors++;
        this.importErrors.push(`Fila ${item.index}: apellido requerido`);
        completed++;
        return;
      }
      const partido = this.partidos.find((p) => p.nombre === item.partido);
      if (!item.partido || !partido) {
        errors++;
        this.importErrors.push(`Fila ${item.index}: partido "${item.partido}" no encontrado`);
        completed++;
        return;
      }
      const cargo = this.cargos.find((c) => c.nombre === item.cargo);
      if (!item.cargo || !cargo) {
        errors++;
        this.importErrors.push(`Fila ${item.index}: cargo "${item.cargo}" no encontrado`);
        completed++;
        return;
      }
      this.api.createCandidato({ nombre: item.nombre, apellido: item.apellido, partidoId: partido.id, cargoId: cargo.id }).subscribe({
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
    this.load(this.form.eleccionesId);
  }
  static {
    this.\u0275fac = function CandidatosComponent_Factory(t) {
      return new (t || _CandidatosComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CandidatosComponent, selectors: [["app-candidatos"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 74, vars: 23, consts: [[1, "container"], [1, "page-header"], [1, "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-primary", "dropdown-toggle"], [1, "dropdown-menu", "dropdown-menu-end"], [4, "ngIf"], [1, "dropdown-divider"], [1, "dropdown-item", 3, "click"], [1, "filters-bar", "mb-4"], [1, "filter-item"], [1, "form-select", 3, "change", "ngModelChange", "ngModel"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "autocomplete", "off", "placeholder", "Buscar en tabla...", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "table", "table-striped"], [1, "sortable", 3, "click"], [4, "ngFor", "ngForOf"], [1, "pagination-bar"], [1, "pagination-info"], [1, "pagination-controls"], [3, "click", "disabled"], [1, "pagination-size"], [3, "ngModelChange", "change", "ngModel"], ["class", "modal", 4, "ngIf"], [1, "dropdown-item", "fw-bold", 3, "click"], [3, "value"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-sm", "btn-outline-secondary", "border-0"], [1, "bi", "bi-three-dots-vertical"], ["class", "dropdown-divider", 4, "ngIf"], [1, "dropdown-item", "text-danger", 3, "click"], ["colspan", "6", 1, "text-center", "py-3"], [3, "click"], [1, "modal"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], [1, "text-muted", "mb-3"], [1, "upload-section", "mb-3"], ["type", "file", "autocomplete", "off", "accept", ".xlsx,.xls", "id", "importFileInput", 3, "change"], ["for", "importFileInput", 1, "file-label"], ["class", "import-preview", 4, "ngIf"], ["class", "alert", 3, "alert-success", "alert-warning", 4, "ngIf"], ["class", "errores-list", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], ["class", "btn btn-primary", 3, "disabled", "click", 4, "ngIf"], [1, "import-preview"], [1, "preview-table-wrapper"], [1, "table", "table-sm"], [1, "alert"], [1, "errores-list"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "mb-3", 4, "ngIf"], [1, "mb-3"], ["type", "text", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-danger"]], template: function CandidatosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Gesti\xF3n de Candidatos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
        \u0275\u0275text(6, " Opciones ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "ul", 4);
        \u0275\u0275template(8, CandidatosComponent_li_8_Template, 3, 0, "li", 5);
        \u0275\u0275elementStart(9, "li");
        \u0275\u0275element(10, "hr", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "li")(12, "button", 7);
        \u0275\u0275listener("click", function CandidatosComponent_Template_button_click_12_listener() {
          return ctx.descargarTemplate();
        });
        \u0275\u0275text(13, "\u{1F4C4} Descargar Plantilla");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "li")(15, "button", 7);
        \u0275\u0275listener("click", function CandidatosComponent_Template_button_click_15_listener() {
          return ctx.openImportModal();
        });
        \u0275\u0275text(16, "\u{1F4E5} Importar desde Excel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "li");
        \u0275\u0275element(18, "hr", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "li")(20, "button", 7);
        \u0275\u0275listener("click", function CandidatosComponent_Template_button_click_20_listener() {
          return ctx.api.exportCandidatosPdf();
        });
        \u0275\u0275text(21, "\u{1F4C4} Imprimir PDF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "li")(23, "button", 7);
        \u0275\u0275listener("click", function CandidatosComponent_Template_button_click_23_listener() {
          return ctx.api.exportCandidatosExcel();
        });
        \u0275\u0275text(24, "\u{1F4CA} Exportar Excel");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(25, "div", 8)(26, "div", 9)(27, "label");
        \u0275\u0275text(28, "Elecci\xF3n:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "select", 10);
        \u0275\u0275listener("change", function CandidatosComponent_Template_select_change_29_listener() {
          ctx.load(ctx.form.eleccionesId);
          return ctx.currentPage = 1;
        });
        \u0275\u0275twoWayListener("ngModelChange", function CandidatosComponent_Template_select_ngModelChange_29_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.eleccionesId, $event) || (ctx.form.eleccionesId = $event);
          return $event;
        });
        \u0275\u0275elementStart(30, "option", 11);
        \u0275\u0275text(31, "Seleccione...");
        \u0275\u0275elementEnd();
        \u0275\u0275template(32, CandidatosComponent_option_32_Template, 2, 2, "option", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "div", 9)(34, "label");
        \u0275\u0275text(35, "Buscar:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "input", 13);
        \u0275\u0275twoWayListener("ngModelChange", function CandidatosComponent_Template_input_ngModelChange_36_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
          return $event;
        });
        \u0275\u0275listener("input", function CandidatosComponent_Template_input_input_36_listener() {
          return ctx.currentPage = 1;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(37, "table", 14)(38, "thead")(39, "tr")(40, "th");
        \u0275\u0275text(41, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "th", 15);
        \u0275\u0275listener("click", function CandidatosComponent_Template_th_click_42_listener() {
          return ctx.sort("nombre");
        });
        \u0275\u0275text(43);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "th", 15);
        \u0275\u0275listener("click", function CandidatosComponent_Template_th_click_44_listener() {
          return ctx.sort("apellido");
        });
        \u0275\u0275text(45);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "th", 15);
        \u0275\u0275listener("click", function CandidatosComponent_Template_th_click_46_listener() {
          return ctx.sort("partidoNombre");
        });
        \u0275\u0275text(47);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "th", 15);
        \u0275\u0275listener("click", function CandidatosComponent_Template_th_click_48_listener() {
          return ctx.sort("cargoNombre");
        });
        \u0275\u0275text(49);
        \u0275\u0275elementEnd();
        \u0275\u0275element(50, "th");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(51, "tbody");
        \u0275\u0275template(52, CandidatosComponent_tr_52_Template, 20, 8, "tr", 16)(53, CandidatosComponent_tr_53_Template, 3, 0, "tr", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(54, "div", 17)(55, "div", 18);
        \u0275\u0275text(56);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "div", 19)(58, "button", 20);
        \u0275\u0275listener("click", function CandidatosComponent_Template_button_click_58_listener() {
          return ctx.goToPage(1);
        });
        \u0275\u0275text(59, "\xAB\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "button", 20);
        \u0275\u0275listener("click", function CandidatosComponent_Template_button_click_60_listener() {
          return ctx.prevPage();
        });
        \u0275\u0275text(61, "\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275template(62, CandidatosComponent_span_62_Template, 3, 3, "span", 16);
        \u0275\u0275elementStart(63, "button", 20);
        \u0275\u0275listener("click", function CandidatosComponent_Template_button_click_63_listener() {
          return ctx.nextPage();
        });
        \u0275\u0275text(64, "\xBB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "button", 20);
        \u0275\u0275listener("click", function CandidatosComponent_Template_button_click_65_listener() {
          return ctx.goToPage(ctx.totalPages);
        });
        \u0275\u0275text(66, "\xBB\xBB");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(67, "div", 21)(68, "label");
        \u0275\u0275text(69, "Filas:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "select", 22);
        \u0275\u0275twoWayListener("ngModelChange", function CandidatosComponent_Template_select_ngModelChange_70_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
          return $event;
        });
        \u0275\u0275listener("change", function CandidatosComponent_Template_select_change_70_listener() {
          return ctx.onPageSizeChange();
        });
        \u0275\u0275template(71, CandidatosComponent_option_71_Template, 2, 2, "option", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(72, CandidatosComponent_div_72_Template, 35, 6, "div", 23)(73, CandidatosComponent_div_73_Template, 37, 10, "div", 23);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.isAdmin);
        \u0275\u0275advance(21);
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
        \u0275\u0275textInterpolate1("Apellido ", ctx.sortColumn === "apellido" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Partido ", ctx.sortColumn === "partidoNombre" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Cargo ", ctx.sortColumn === "cargoNombre" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.candidatosPaginados);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.candidatosFiltrados.length === 0);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate3(" Mostrando ", (ctx.currentPage - 1) * ctx.pageSize + 1, " - ", ctx.Math.min(ctx.currentPage * ctx.pageSize, ctx.candidatosFiltrados.length), " de ", ctx.candidatosFiltrados.length, " registros ");
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
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1e293b;\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.btn-with-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  padding: 16px;\n  background: #f8fafc;\n  border-radius: 12px;\n}\n.filter-item[_ngcontent-%COMP%] {\n  flex: 0 0 300px;\n}\n.filter-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.mb-3[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 2px solid #e2e8f0;\n  background: #f8fafc;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd) {\n  background: #f9fafb;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #4f46e5);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);\n  transform: translateY(-1px);\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  color: white;\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background: #d97706;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n}\n.form-select[_ngcontent-%COMP%], .form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.form-select[_ngcontent-%COMP%]:focus, .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  border-bottom: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #475569;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #cbd5e1;\n}\n.upload-section[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.upload-section[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.file-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 18px;\n  background: #f8fafc;\n  border: 1.5px dashed #cbd5e1;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 13px;\n  color: #475569;\n  transition: all 0.2s;\n}\n.file-label[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  background: #eff6ff;\n  color: #1e40af;\n}\n.import-preview[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.preview-table-wrapper[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow-y: auto;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}\n.preview-table-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.preview-table-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n}\n.errores-list[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border-radius: 8px;\n  padding: 12px 16px;\n  border: 1px solid #fecaca;\n  margin-top: 8px;\n}\n.errores-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-weight: 600;\n  color: #991b1b;\n  font-size: 13px;\n}\n.errores-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0 0 0 20px;\n}\n.errores-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #991b1b;\n  margin-bottom: 2px;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-top: 8px;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #166534;\n  border: 1px solid #bbf7d0;\n}\n.alert-warning[_ngcontent-%COMP%] {\n  background: #fefce8;\n  color: #854d0e;\n  border: 1px solid #fef08a;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 13px;\n}\n/*# sourceMappingURL=candidatos.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CandidatosComponent, { className: "CandidatosComponent", filePath: "app\\features\\admin\\pages\\candidatos\\candidatos.component.ts", lineNumber: 15 });
})();
export {
  CandidatosComponent
};
//# sourceMappingURL=chunk-RR7W3S5S.js.map
