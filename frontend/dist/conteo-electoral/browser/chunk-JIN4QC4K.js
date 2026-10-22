import {
  readSync,
  utils,
  writeFileSync
} from "./chunk-TMB2UGAI.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
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
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6TL4F4J6.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/cargos/cargos.component.ts
function CargosComponent_li_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 28);
    \u0275\u0275listener("click", function CargosComponent_li_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal());
    });
    \u0275\u0275text(2, "+ Nuevo Cargo");
    \u0275\u0275elementEnd()();
  }
}
function CargosComponent_option_36_Template(rf, ctx) {
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
function CargosComponent_tr_56_li_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 7);
    \u0275\u0275listener("click", function CargosComponent_tr_56_li_18_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const c_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit(c_r5));
    });
    \u0275\u0275text(2, "Editar");
    \u0275\u0275elementEnd()();
  }
}
function CargosComponent_tr_56_hr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "hr", 6);
  }
}
function CargosComponent_tr_56_li_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 35);
    \u0275\u0275listener("click", function CargosComponent_tr_56_li_21_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const c_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.delete(c_r5.id));
    });
    \u0275\u0275text(2, "Eliminar");
    \u0275\u0275elementEnd()();
  }
}
function CargosComponent_tr_56_Template(rf, ctx) {
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
    \u0275\u0275elementStart(8, "td")(9, "small");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 31);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "div", 2)(15, "button", 32);
    \u0275\u0275element(16, "i", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "ul", 4);
    \u0275\u0275template(18, CargosComponent_tr_56_li_18_Template, 3, 0, "li", 5);
    \u0275\u0275elementStart(19, "li");
    \u0275\u0275template(20, CargosComponent_tr_56_hr_20_Template, 1, 0, "hr", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, CargosComponent_tr_56_li_21_Template, 3, 0, "li", 5);
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
    \u0275\u0275classProp("bg-info", c_r5.tipoVotacion === "LISTA")("bg-primary", c_r5.tipoVotacion === "INDIVIDUAL");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.tipoVotacion || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r5.tipoCircunscripcionCodigo || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.cantidadDignidades || 1);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function CargosComponent_tr_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 36);
    \u0275\u0275text(2, "No se encontraron registros");
    \u0275\u0275elementEnd()();
  }
}
function CargosComponent_span_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span")(1, "button", 37);
    \u0275\u0275listener("click", function CargosComponent_span_66_Template_button_click_1_listener() {
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
function CargosComponent_option_75_Template(rf, ctx) {
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
function CargosComponent_div_76_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275text(2, " Seleccionar archivo Excel...");
    \u0275\u0275elementEnd();
  }
}
function CargosComponent_div_76_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 55);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.importFile.name, "");
  }
}
function CargosComponent_div_76_div_23_tr_15_Template(rf, ctx) {
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
    \u0275\u0275textInterpolate(row_r12.eleccion);
  }
}
function CargosComponent_div_76_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "p")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 57)(5, "table", 58)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "eleccion");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, CargosComponent_div_76_div_23_tr_15_Template, 7, 3, "tr", 20);
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
function CargosComponent_div_76_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
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
function CargosComponent_div_76_div_25_li_5_Template(rf, ctx) {
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
function CargosComponent_div_76_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Errores:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "ul");
    \u0275\u0275template(5, CargosComponent_div_76_div_25_li_5_Template, 2, 1, "li", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.importErrors);
  }
}
function CargosComponent_div_76_button_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function CargosComponent_div_76_button_29_Template_button_click_0_listener() {
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
function CargosComponent_div_76_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40)(3, "div", 41)(4, "h5");
    \u0275\u0275element(5, "i", 9);
    \u0275\u0275text(6, " Importar Cargos desde Excel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 42);
    \u0275\u0275listener("click", function CargosComponent_div_76_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeImportModal());
    });
    \u0275\u0275text(8, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 43)(10, "p", 44);
    \u0275\u0275text(11, "Selecciona un archivo Excel (.xlsx) con las columnas: ");
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13, "nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, ", ");
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16, "eleccion");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, ".");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 45)(19, "input", 46);
    \u0275\u0275listener("change", function CargosComponent_div_76_Template_input_change_19_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onImportFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "label", 47);
    \u0275\u0275template(21, CargosComponent_div_76_span_21_Template, 3, 0, "span", 5)(22, CargosComponent_div_76_span_22_Template, 3, 1, "span", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, CargosComponent_div_76_div_23_Template, 16, 2, "div", 48)(24, CargosComponent_div_76_div_24_Template, 2, 5, "div", 49)(25, CargosComponent_div_76_div_25_Template, 6, 1, "div", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 51)(27, "button", 52);
    \u0275\u0275listener("click", function CargosComponent_div_76_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeImportModal());
    });
    \u0275\u0275text(28, "Cerrar");
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, CargosComponent_div_76_button_29_Template, 2, 2, "button", 53);
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
function CargosComponent_div_77_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 77);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function CargosComponent_div_77_option_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tc_r16 = ctx.$implicit;
    \u0275\u0275property("value", tc_r16.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", tc_r16.codigo, " \u2014 ", tc_r16.nombre, "");
  }
}
function CargosComponent_div_77_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40)(3, "div", 41)(4, "h5");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 42);
    \u0275\u0275listener("click", function CargosComponent_div_77_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 43);
    \u0275\u0275template(9, CargosComponent_div_77_div_9_Template, 3, 1, "div", 62);
    \u0275\u0275elementStart(10, "div", 63)(11, "label");
    \u0275\u0275text(12, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 64);
    \u0275\u0275twoWayListener("ngModelChange", function CargosComponent_div_77_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.nombre, $event) || (ctx_r1.form.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function CargosComponent_div_77_Template_input_input_13_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toUpper(ctx_r1.form, "nombre"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 63)(15, "label");
    \u0275\u0275text(16, "Descripci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 65);
    \u0275\u0275twoWayListener("ngModelChange", function CargosComponent_div_77_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.descripcion, $event) || (ctx_r1.form.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function CargosComponent_div_77_Template_textarea_input_17_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toUpper(ctx_r1.form, "descripcion"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 63)(19, "label");
    \u0275\u0275text(20, "Tipo de Votaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 66);
    \u0275\u0275twoWayListener("ngModelChange", function CargosComponent_div_77_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.tipoVotacion, $event) || (ctx_r1.form.tipoVotacion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(22, "option", 67);
    \u0275\u0275text(23, "Individual (un candidato)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 68);
    \u0275\u0275text(25, "Lista (voto por partido)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 69);
    \u0275\u0275text(27, "Plurinominal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 70);
    \u0275\u0275text(29, "Preferencial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 71);
    \u0275\u0275text(31, "Mixto");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 63)(33, "label");
    \u0275\u0275text(34, "Circunscripci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "select", 66);
    \u0275\u0275twoWayListener("ngModelChange", function CargosComponent_div_77_Template_select_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.tipoCircunscripcionId, $event) || (ctx_r1.form.tipoCircunscripcionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(36, "option", 15);
    \u0275\u0275text(37, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(38, CargosComponent_div_77_option_38_Template, 2, 3, "option", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 72)(40, "div", 73)(41, "label");
    \u0275\u0275text(42, "Cant. Dignidades:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function CargosComponent_div_77_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.cantidadDignidades, $event) || (ctx_r1.form.cantidadDignidades = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 73)(45, "label");
    \u0275\u0275text(46, "Max Candidatos/Lista:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "input", 75);
    \u0275\u0275twoWayListener("ngModelChange", function CargosComponent_div_77_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.maxCandidatosLista, $event) || (ctx_r1.form.maxCandidatosLista = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "div", 51)(49, "button", 52);
    \u0275\u0275listener("click", function CargosComponent_div_77_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(50, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "button", 76);
    \u0275\u0275listener("click", function CargosComponent_div_77_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(52, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.editMode ? "Editar" : "Nuevo", " Cargo");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.descripcion);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.tipoVotacion);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.tipoCircunscripcionId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.tiposCircunscripcion);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.cantidadDignidades);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.maxCandidatosLista);
  }
}
var CargosComponent = class _CargosComponent {
  constructor(api) {
    this.api = api;
    this.cargos = [];
    this.elecciones = [];
    this.showModal = false;
    this.editMode = false;
    this.selectedId = null;
    this.tiposCircunscripcion = [];
    this.form = { nombre: "", descripcion: "", eleccionesId: null, tipoVotacion: "LISTA", tipoCircunscripcionId: null, cantidadDignidades: 1, maxCandidatosLista: null };
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
    this.api.getTiposCircunscripcion().subscribe((tc) => this.tiposCircunscripcion = tc);
  }
  load(eleccionId) {
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
  get cargosOrdenados() {
    if (!this.sortColumn)
      return this.cargos;
    return [...this.cargos].sort((a, b) => {
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
  get cargosFiltrados() {
    if (!this.searchText)
      return this.cargosOrdenados;
    const term = this.searchText.toLowerCase();
    return this.cargosOrdenados.filter((item) => Object.values(item).some((v) => v != null && String(v).toLowerCase().includes(term)));
  }
  get cargosPaginados() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.cargosFiltrados.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.cargosFiltrados.length / this.pageSize) || 1;
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
    this.form = { nombre: "", descripcion: "", eleccionesId: this.elecciones[0]?.id, tipoVotacion: "LISTA", tipoCircunscripcionId: null, cantidadDignidades: 1, maxCandidatosLista: null };
    this.errorMessage = "";
    this.showModal = true;
  }
  edit(cargo) {
    this.editMode = true;
    this.selectedId = cargo.id;
    this.form = { nombre: cargo.nombre, descripcion: cargo.descripcion, eleccionesId: cargo.eleccionesId || this.form.eleccionesId, tipoVotacion: cargo.tipoVotacion || "LISTA", tipoCircunscripcionId: cargo.tipoCircunscripcionId, cantidadDignidades: cargo.cantidadDignidades || 1, maxCandidatosLista: cargo.maxCandidatosLista };
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
      this.api.updateCargo(this.selectedId, this.form).subscribe({
        next: () => {
          this.load(this.form.eleccionesId);
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Error al guardar. Intente de nuevo.";
        }
      });
    } else {
      this.api.createCargo(this.form).subscribe({
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
    if (confirm("Esta seguro de eliminar este cargo?")) {
      this.api.deleteCargo(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
  descargarTemplate() {
    const data = [["nombre", "eleccion"], ["CARGO EJEMPLO", "ELECCION EJEMPLO"]];
    const ws = utils.aoa_to_sheet(data);
    ws["!cols"] = [{ wch: 30 }, { wch: 30 }];
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Cargos");
    writeFileSync(wb, "plantilla_cargos.xlsx");
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
    this.api.getElecciones().subscribe((elecciones) => this.elecciones = elecciones);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = readSync(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = utils.sheet_to_json(sheet);
      this.importPreview = json.map((row, i) => ({ index: i + 2, nombre: row["nombre"] || "", eleccion: row["eleccion"] || "" }));
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
      const eleccion = this.elecciones.find((e) => e.nombre === item.eleccion);
      if (!item.eleccion || !eleccion) {
        errors++;
        this.importErrors.push(`Fila ${item.index}: elecci\xF3n "${item.eleccion}" no encontrada`);
        completed++;
        return;
      }
      this.api.createCargo({ nombre: item.nombre, eleccionesId: eleccion.id }).subscribe({
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
    this.\u0275fac = function CargosComponent_Factory(t) {
      return new (t || _CargosComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CargosComponent, selectors: [["app-cargos"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 78, vars: 19, consts: [[1, "container"], [1, "page-header"], [1, "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-primary", "dropdown-toggle"], [1, "dropdown-menu", "dropdown-menu-end"], [4, "ngIf"], [1, "dropdown-divider"], [1, "dropdown-item", 3, "click"], [1, "bi", "bi-file-earmark-arrow-down"], [1, "bi", "bi-box-arrow-in-down"], [1, "bi", "bi-printer"], [1, "bi", "bi-file-earmark-spreadsheet"], [1, "filters-bar", "mb-4"], [1, "filter-item"], [1, "form-select", 3, "change", "ngModelChange", "ngModel"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "autocomplete", "off", "placeholder", "Buscar en tabla...", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "table", "table-striped"], [1, "sortable", 3, "click"], [4, "ngFor", "ngForOf"], [1, "pagination-bar"], [1, "pagination-info"], [1, "pagination-controls"], [3, "click", "disabled"], [1, "pagination-size"], [3, "ngModelChange", "change", "ngModel"], ["class", "modal", 4, "ngIf"], [1, "dropdown-item", "fw-bold", 3, "click"], [3, "value"], [1, "badge"], [1, "text-center"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-sm", "btn-outline-secondary", "border-0"], [1, "bi", "bi-three-dots-vertical"], ["class", "dropdown-divider", 4, "ngIf"], [1, "dropdown-item", "text-danger", 3, "click"], ["colspan", "6", 1, "text-center", "py-3"], [3, "click"], [1, "modal"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], [1, "text-muted", "mb-3"], [1, "upload-section", "mb-3"], ["type", "file", "autocomplete", "off", "accept", ".xlsx,.xls", "id", "importFileInput", 3, "change"], ["for", "importFileInput", 1, "file-label"], ["class", "import-preview", 4, "ngIf"], ["class", "alert", 3, "alert-success", "alert-warning", 4, "ngIf"], ["class", "errores-list", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], ["class", "btn btn-primary", 3, "disabled", "click", 4, "ngIf"], [1, "bi", "bi-folder2-open"], [1, "bi", "bi-file-earmark-text"], [1, "import-preview"], [1, "preview-table-wrapper"], [1, "table", "table-sm"], [1, "alert"], [1, "errores-list"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "mb-3", 4, "ngIf"], [1, "mb-3"], ["type", "text", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], ["autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "INDIVIDUAL"], ["value", "LISTA"], ["value", "PLURINOMINAL"], ["value", "PREFERENCIAL"], ["value", "MIXTO"], [1, "row", "g-2"], [1, "col-6", "mb-3"], ["type", "number", "min", "1", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-danger"]], template: function CargosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Gesti\xF3n de Cargos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
        \u0275\u0275text(6, " Opciones ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "ul", 4);
        \u0275\u0275template(8, CargosComponent_li_8_Template, 3, 0, "li", 5);
        \u0275\u0275elementStart(9, "li");
        \u0275\u0275element(10, "hr", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "li")(12, "button", 7);
        \u0275\u0275listener("click", function CargosComponent_Template_button_click_12_listener() {
          return ctx.descargarTemplate();
        });
        \u0275\u0275element(13, "i", 8);
        \u0275\u0275text(14, " Descargar Plantilla");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "li")(16, "button", 7);
        \u0275\u0275listener("click", function CargosComponent_Template_button_click_16_listener() {
          return ctx.openImportModal();
        });
        \u0275\u0275element(17, "i", 9);
        \u0275\u0275text(18, " Importar desde Excel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "li");
        \u0275\u0275element(20, "hr", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "li")(22, "button", 7);
        \u0275\u0275listener("click", function CargosComponent_Template_button_click_22_listener() {
          return ctx.api.exportCargosPdf();
        });
        \u0275\u0275element(23, "i", 10);
        \u0275\u0275text(24, " Imprimir PDF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "li")(26, "button", 7);
        \u0275\u0275listener("click", function CargosComponent_Template_button_click_26_listener() {
          return ctx.api.exportCargosExcel();
        });
        \u0275\u0275element(27, "i", 11);
        \u0275\u0275text(28, " Exportar Excel");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(29, "div", 12)(30, "div", 13)(31, "label");
        \u0275\u0275text(32, "Elecci\xF3n:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "select", 14);
        \u0275\u0275listener("change", function CargosComponent_Template_select_change_33_listener() {
          ctx.load(ctx.form.eleccionesId);
          return ctx.currentPage = 1;
        });
        \u0275\u0275twoWayListener("ngModelChange", function CargosComponent_Template_select_ngModelChange_33_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.eleccionesId, $event) || (ctx.form.eleccionesId = $event);
          return $event;
        });
        \u0275\u0275elementStart(34, "option", 15);
        \u0275\u0275text(35, "Seleccione...");
        \u0275\u0275elementEnd();
        \u0275\u0275template(36, CargosComponent_option_36_Template, 2, 2, "option", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 13)(38, "label");
        \u0275\u0275text(39, "Buscar:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "input", 17);
        \u0275\u0275twoWayListener("ngModelChange", function CargosComponent_Template_input_ngModelChange_40_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
          return $event;
        });
        \u0275\u0275listener("input", function CargosComponent_Template_input_input_40_listener() {
          return ctx.currentPage = 1;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(41, "table", 18)(42, "thead")(43, "tr")(44, "th");
        \u0275\u0275text(45, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "th", 19);
        \u0275\u0275listener("click", function CargosComponent_Template_th_click_46_listener() {
          return ctx.sort("nombre");
        });
        \u0275\u0275text(47, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "th");
        \u0275\u0275text(49, "Votaci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "th");
        \u0275\u0275text(51, "Circunscripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "th");
        \u0275\u0275text(53, "Dignidades");
        \u0275\u0275elementEnd();
        \u0275\u0275element(54, "th");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(55, "tbody");
        \u0275\u0275template(56, CargosComponent_tr_56_Template, 22, 12, "tr", 20)(57, CargosComponent_tr_57_Template, 3, 0, "tr", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "div", 21)(59, "div", 22);
        \u0275\u0275text(60);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "div", 23)(62, "button", 24);
        \u0275\u0275listener("click", function CargosComponent_Template_button_click_62_listener() {
          return ctx.goToPage(1);
        });
        \u0275\u0275text(63, "\xAB\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "button", 24);
        \u0275\u0275listener("click", function CargosComponent_Template_button_click_64_listener() {
          return ctx.prevPage();
        });
        \u0275\u0275text(65, "\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275template(66, CargosComponent_span_66_Template, 3, 3, "span", 20);
        \u0275\u0275elementStart(67, "button", 24);
        \u0275\u0275listener("click", function CargosComponent_Template_button_click_67_listener() {
          return ctx.nextPage();
        });
        \u0275\u0275text(68, "\xBB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "button", 24);
        \u0275\u0275listener("click", function CargosComponent_Template_button_click_69_listener() {
          return ctx.goToPage(ctx.totalPages);
        });
        \u0275\u0275text(70, "\xBB\xBB");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(71, "div", 25)(72, "label");
        \u0275\u0275text(73, "Filas:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "select", 26);
        \u0275\u0275twoWayListener("ngModelChange", function CargosComponent_Template_select_ngModelChange_74_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
          return $event;
        });
        \u0275\u0275listener("change", function CargosComponent_Template_select_change_74_listener() {
          return ctx.onPageSizeChange();
        });
        \u0275\u0275template(75, CargosComponent_option_75_Template, 2, 2, "option", 16);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(76, CargosComponent_div_76_Template, 30, 6, "div", 27)(77, CargosComponent_div_77_Template, 53, 10, "div", 27);
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
        \u0275\u0275advance(16);
        \u0275\u0275property("ngForOf", ctx.cargosPaginados);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.cargosFiltrados.length === 0);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate3(" Mostrando ", (ctx.currentPage - 1) * ctx.pageSize + 1, " - ", ctx.Math.min(ctx.currentPage * ctx.pageSize, ctx.cargosFiltrados.length), " de ", ctx.cargosFiltrados.length, " registros ");
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
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--alantek-text);\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.btn-with-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  padding: 16px;\n  background: var(--alantek-surface);\n  border-radius: 12px;\n}\n.filter-item[_ngcontent-%COMP%] {\n  flex: 0 0 300px;\n}\n.filter-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--alantek-text-secondary);\n}\n.mb-4[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 2px solid var(--alantek-border);\n  background: var(--alantek-background);\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  color: var(--alantek-text-muted);\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid var(--alantek-border);\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd) {\n  background: var(--alantek-background);\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--alantek-primary);\n  color: white;\n  box-shadow: 0 2px 8px rgba(27, 36, 29, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-primary-strong);\n  box-shadow: 0 4px 12px rgba(27, 36, 29, 0.4);\n  transform: translateY(-1px);\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background: var(--alantek-warning);\n  color: white;\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-accent);\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: var(--alantek-danger);\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-danger);\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.bg-info[_ngcontent-%COMP%] {\n  background: var(--alantek-info) !important;\n  color: white !important;\n}\n.form-select[_ngcontent-%COMP%], .form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid var(--alantek-border-strong);\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.form-select[_ngcontent-%COMP%]:focus, .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--alantek-primary);\n  box-shadow: 0 0 0 3px rgba(217, 119, 50, 0.1);\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  border-bottom: 1px solid var(--alantek-border);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid var(--alantek-border);\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: var(--alantek-text-muted);\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: var(--alantek-border);\n  color: var(--alantek-text-secondary);\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-border-strong);\n}\n.upload-section[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.upload-section[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.file-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 18px;\n  background: var(--alantek-background);\n  border: 1.5px dashed var(--alantek-border-strong);\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 13px;\n  color: var(--alantek-text-secondary);\n  transition: all 0.2s;\n}\n.file-label[_ngcontent-%COMP%]:hover {\n  border-color: var(--alantek-primary);\n  background: var(--alantek-info-bg);\n  color: var(--alantek-primary-dark);\n}\n.import-preview[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.preview-table-wrapper[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow-y: auto;\n  border: 1px solid var(--alantek-border);\n  border-radius: 8px;\n}\n.preview-table-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.preview-table-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n}\n.errores-list[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg);\n  border-radius: 8px;\n  padding: 12px 16px;\n  border: 1px solid var(--alantek-danger);\n  margin-top: 8px;\n}\n.errores-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-weight: 600;\n  color: var(--alantek-danger);\n  font-size: 13px;\n}\n.errores-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0 0 0 20px;\n}\n.errores-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--alantek-danger);\n  margin-bottom: 2px;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-top: 8px;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: var(--alantek-success-bg);\n  color: var(--alantek-success);\n  border: 1px solid var(--alantek-success);\n}\n.alert-warning[_ngcontent-%COMP%] {\n  background: var(--alantek-warning-bg);\n  color: var(--alantek-warning);\n  border: 1px solid var(--alantek-warning);\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted);\n  font-size: 13px;\n}\n/*# sourceMappingURL=cargos.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CargosComponent, { className: "CargosComponent", filePath: "app\\features\\admin\\pages\\cargos\\cargos.component.ts", lineNumber: 15 });
})();
export {
  CargosComponent
};
//# sourceMappingURL=chunk-JIN4QC4K.js.map
