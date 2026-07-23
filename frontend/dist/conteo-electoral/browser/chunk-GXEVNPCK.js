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

// src/app/features/admin/pages/mesas/mesas.component.ts
function MesasComponent_li_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 26);
    \u0275\u0275listener("click", function MesasComponent_li_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal());
    });
    \u0275\u0275text(2, "+ Nueva Mesa");
    \u0275\u0275elementEnd()();
  }
}
function MesasComponent_option_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r3 = ctx.$implicit;
    \u0275\u0275property("ngValue", e_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r3.nombre);
  }
}
function MesasComponent_option_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", i_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r4.nombre);
  }
}
function MesasComponent_tr_51_li_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 7);
    \u0275\u0275listener("click", function MesasComponent_tr_51_li_18_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const m_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit(m_r6));
    });
    \u0275\u0275text(2, "Editar");
    \u0275\u0275elementEnd()();
  }
}
function MesasComponent_tr_51_button_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function MesasComponent_tr_51_button_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const m_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrar(m_r6.id));
    });
    \u0275\u0275text(1, "Cerrar");
    \u0275\u0275elementEnd();
  }
}
function MesasComponent_tr_51_hr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "hr", 6);
  }
}
function MesasComponent_tr_51_li_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 32);
    \u0275\u0275listener("click", function MesasComponent_tr_51_li_23_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const m_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.delete(m_r6.id));
    });
    \u0275\u0275text(2, "Eliminar");
    \u0275\u0275elementEnd()();
  }
}
function MesasComponent_tr_51_Template(rf, ctx) {
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
    \u0275\u0275elementStart(7, "td")(8, "span", 27);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td")(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "div", 2)(15, "button", 28);
    \u0275\u0275element(16, "i", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "ul", 4);
    \u0275\u0275template(18, MesasComponent_tr_51_li_18_Template, 3, 0, "li", 5);
    \u0275\u0275elementStart(19, "li");
    \u0275\u0275template(20, MesasComponent_tr_51_button_20_Template, 2, 0, "button", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "li");
    \u0275\u0275template(22, MesasComponent_tr_51_hr_22_Template, 1, 0, "hr", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, MesasComponent_tr_51_li_23_Template, 3, 0, "li", 5);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const m_r6 = ctx.$implicit;
    const i_r9 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r1.currentPage - 1) * ctx_r1.pageSize + i_r9 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r6.numero);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r6.institucionNombre);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(m_r6.sexo === "MIXTA" ? "bg-info" : m_r6.sexo === "HOMBRES" ? "bg-primary" : "bg-warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r6.sexo);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(m_r6.cerrada ? "badge bg-danger" : "badge bg-success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r6.cerrada ? "CERRADA" : "ABIERTA", " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !m_r6.cerrada);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdmin);
  }
}
function MesasComponent_tr_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 33);
    \u0275\u0275text(2, "No se encontraron registros");
    \u0275\u0275elementEnd()();
  }
}
function MesasComponent_span_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span")(1, "button", 34);
    \u0275\u0275listener("click", function MesasComponent_span_61_Template_button_click_1_listener() {
      const p_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(p_r11));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", p_r11 === ctx_r1.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r11);
  }
}
function MesasComponent_option_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r12 = ctx.$implicit;
    \u0275\u0275property("value", s_r12);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r12);
  }
}
function MesasComponent_div_71_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 57);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function MesasComponent_div_71_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r14 = ctx.$implicit;
    \u0275\u0275property("ngValue", e_r14.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r14.nombre);
  }
}
function MesasComponent_div_71_option_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const z_r15 = ctx.$implicit;
    \u0275\u0275property("ngValue", z_r15.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(z_r15.nombre);
  }
}
function MesasComponent_div_71_option_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r16 = ctx.$implicit;
    \u0275\u0275property("ngValue", p_r16.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r16.nombre);
  }
}
function MesasComponent_div_71_option_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r17 = ctx.$implicit;
    \u0275\u0275property("ngValue", c_r17.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r17.nombre);
  }
}
function MesasComponent_div_71_option_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r18 = ctx.$implicit;
    \u0275\u0275property("ngValue", p_r18.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r18.nombre);
  }
}
function MesasComponent_div_71_option_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r19 = ctx.$implicit;
    \u0275\u0275property("ngValue", i_r19.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r19.nombre);
  }
}
function MesasComponent_div_71_small_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 49);
    \u0275\u0275text(1, "No se encontraron instituciones con los filtros aplicados");
    \u0275\u0275elementEnd();
  }
}
function MesasComponent_div_71_small_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 49);
    \u0275\u0275text(1, "Cargando instituciones...");
    \u0275\u0275elementEnd();
  }
}
function MesasComponent_div_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 37)(2, "div", 38)(3, "div", 39)(4, "h5");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 40);
    \u0275\u0275listener("click", function MesasComponent_div_71_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 41);
    \u0275\u0275template(9, MesasComponent_div_71_div_9_Template, 3, 1, "div", 42);
    \u0275\u0275elementStart(10, "div", 43)(11, "label");
    \u0275\u0275text(12, "Elecci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 44);
    \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_div_71_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.eleccionesId, $event) || (ctx_r1.form.eleccionesId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "option", 11);
    \u0275\u0275text(15, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, MesasComponent_div_71_option_16_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 43)(18, "label");
    \u0275\u0275text(19, "N\xFAmero:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_div_71_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.numero, $event) || (ctx_r1.form.numero = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function MesasComponent_div_71_Template_input_input_20_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toUpper(ctx_r1.form, "numero"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 46)(22, "div", 9)(23, "label");
    \u0275\u0275text(24, "Zona:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "select", 13);
    \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_div_71_Template_select_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.filterZonaId, $event) || (ctx_r1.filterZonaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesasComponent_div_71_Template_select_change_25_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onModalZonaChange());
    });
    \u0275\u0275elementStart(26, "option", 11);
    \u0275\u0275text(27, "Todas");
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, MesasComponent_div_71_option_28_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 9)(30, "label");
    \u0275\u0275text(31, "Provincia:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "select", 47);
    \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_div_71_Template_select_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.filterProvinciaId, $event) || (ctx_r1.filterProvinciaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesasComponent_div_71_Template_select_change_32_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onModalProvinciaChange());
    });
    \u0275\u0275elementStart(33, "option", 11);
    \u0275\u0275text(34, "Todas");
    \u0275\u0275elementEnd();
    \u0275\u0275template(35, MesasComponent_div_71_option_35_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 9)(37, "label");
    \u0275\u0275text(38, "Cant\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "select", 47);
    \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_div_71_Template_select_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.filterCantonId, $event) || (ctx_r1.filterCantonId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesasComponent_div_71_Template_select_change_39_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onModalCantonChange());
    });
    \u0275\u0275elementStart(40, "option", 11);
    \u0275\u0275text(41, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275template(42, MesasComponent_div_71_option_42_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 9)(44, "label");
    \u0275\u0275text(45, "Parroquia:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "select", 47);
    \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_div_71_Template_select_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.filterParroquiaId, $event) || (ctx_r1.filterParroquiaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesasComponent_div_71_Template_select_change_46_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onModalParroquiaChange());
    });
    \u0275\u0275elementStart(47, "option", 11);
    \u0275\u0275text(48, "Todas");
    \u0275\u0275elementEnd();
    \u0275\u0275template(49, MesasComponent_div_71_option_49_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(50, "div", 43)(51, "label");
    \u0275\u0275text(52, "Buscar instituci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_div_71_Template_input_ngModelChange_53_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.buscarInstitucionText, $event) || (ctx_r1.buscarInstitucionText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function MesasComponent_div_71_Template_input_input_53_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.form.institucionId = null);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "small", 49);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 43)(57, "label");
    \u0275\u0275text(58, "Instituci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "select", 44);
    \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_div_71_Template_select_ngModelChange_59_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.institucionId, $event) || (ctx_r1.form.institucionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(60, "option", 11);
    \u0275\u0275text(61, "Seleccione una instituci\xF3n...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(62, MesasComponent_div_71_option_62_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(63, MesasComponent_div_71_small_63_Template, 2, 0, "small", 50)(64, MesasComponent_div_71_small_64_Template, 2, 0, "small", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 43)(66, "label");
    \u0275\u0275text(67, "Sexo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "select", 44);
    \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_div_71_Template_select_ngModelChange_68_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.sexo, $event) || (ctx_r1.form.sexo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(69, "option", 51);
    \u0275\u0275text(70, "Mixta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "option", 52);
    \u0275\u0275text(72, "Hombres");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "option", 53);
    \u0275\u0275text(74, "Mujeres");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(75, "div", 54)(76, "button", 55);
    \u0275\u0275listener("click", function MesasComponent_div_71_Template_button_click_76_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(77, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "button", 56);
    \u0275\u0275listener("click", function MesasComponent_div_71_Template_button_click_78_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(79, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.editMode ? "Editar" : "Nueva", " Mesa");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.eleccionesId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.elecciones);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.numero);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.filterZonaId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.zonas);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.filterProvinciaId);
    \u0275\u0275property("disabled", !ctx_r1.filterZonaId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.provinciasDisponibles);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.filterCantonId);
    \u0275\u0275property("disabled", !ctx_r1.filterProvinciaId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.cantonesDisponibles);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.filterParroquiaId);
    \u0275\u0275property("disabled", !ctx_r1.filterCantonId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.parroquiasDisponibles);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.buscarInstitucionText);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.instituciones.length, " instituciones cargadas");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.institucionId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.filteredInstituciones);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.filteredInstituciones.length === 0 && ctx_r1.institucionesCargadas);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.institucionesCargadas);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.sexo);
  }
}
var MesasComponent = class _MesasComponent {
  constructor(api) {
    this.api = api;
    this.mesas = [];
    this.elecciones = [];
    this.instituciones = [];
    this.showModal = false;
    this.editMode = false;
    this.selectedId = null;
    this.form = { numero: "", sexo: "MIXTA", institucionId: null, eleccionesId: null };
    this.filterInstitucionId = null;
    this.sortColumn = "";
    this.sortDirection = "asc";
    this.searchText = "";
    this.currentPage = 1;
    this.pageSize = 10;
    this.pageSizes = [5, 10, 25, 50];
    this.Math = Math;
    this.errorMessage = "";
    this.zonas = [];
    this.provinciasDisponibles = [];
    this.cantonesDisponibles = [];
    this.parroquiasDisponibles = [];
    this.filterZonaId = null;
    this.filterProvinciaId = null;
    this.filterCantonId = null;
    this.filterParroquiaId = null;
    this.buscarInstitucionText = "";
    this.institucionesCargadas = false;
    this.zonasCargadas = false;
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
    this.api.getZonas().subscribe((d) => {
      this.zonas = d;
      this.zonasCargadas = true;
    });
    this.api.getInstituciones().subscribe((d) => {
      this.instituciones = d;
      this.institucionesCargadas = true;
    });
    this.api.getElecciones().subscribe((e) => {
      this.elecciones = e;
      if (e.length > 0) {
        this.form.eleccionesId = e[0].id;
        this.load(e[0].id);
      }
    });
  }
  get filteredInstituciones() {
    let result = this.instituciones;
    if (this.filterParroquiaId) {
      result = result.filter((i) => Number(i.parroquiaId) === Number(this.filterParroquiaId));
    }
    if (this.buscarInstitucionText) {
      const term = this.buscarInstitucionText.toLowerCase();
      result = result.filter((i) => i.nombre && i.nombre.toLowerCase().includes(term));
    }
    return result;
  }
  load(eleccionId) {
    const obs = this.filterInstitucionId ? this.api.getMesasByInstitucion(this.filterInstitucionId) : this.api.getMesasByEleccion(eleccionId);
    obs.subscribe((d) => this.mesas = d);
  }
  filtrarPorInstitucion() {
    if (this.form.eleccionesId)
      this.load(this.form.eleccionesId);
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
  get mesasOrdenadas() {
    if (!this.sortColumn)
      return this.mesas;
    return [...this.mesas].sort((a, b) => {
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
  get mesasFiltradas() {
    if (!this.searchText)
      return this.mesasOrdenadas;
    const term = this.searchText.toLowerCase();
    return this.mesasOrdenadas.filter((item) => Object.values(item).some((v) => v != null && String(v).toLowerCase().includes(term)));
  }
  get mesasPaginadas() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.mesasFiltradas.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.mesasFiltradas.length / this.pageSize) || 1;
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
    this.form = { numero: "", sexo: "MIXTA", institucionId: null, eleccionesId: this.form.eleccionesId };
    this.errorMessage = "";
    this.resetModalFilters();
    this.showModal = true;
  }
  edit(m) {
    this.editMode = true;
    this.selectedId = m.id;
    this.form = { numero: m.numero, sexo: m.sexo, institucionId: m.institucionId, eleccionesId: m.eleccionesId };
    this.errorMessage = "";
    this.resetModalFilters();
    this.showModal = true;
  }
  resetModalFilters() {
    this.filterZonaId = null;
    this.filterProvinciaId = null;
    this.filterCantonId = null;
    this.filterParroquiaId = null;
    this.provinciasDisponibles = [];
    this.cantonesDisponibles = [];
    this.parroquiasDisponibles = [];
    this.buscarInstitucionText = "";
  }
  onModalZonaChange() {
    this.filterProvinciaId = null;
    this.filterCantonId = null;
    this.filterParroquiaId = null;
    this.form.institucionId = null;
    this.provinciasDisponibles = [];
    this.cantonesDisponibles = [];
    this.parroquiasDisponibles = [];
    if (this.filterZonaId) {
      this.api.getProvinciasByZona(this.filterZonaId).subscribe((d) => this.provinciasDisponibles = d);
    }
  }
  onModalProvinciaChange() {
    this.filterCantonId = null;
    this.filterParroquiaId = null;
    this.form.institucionId = null;
    this.cantonesDisponibles = [];
    this.parroquiasDisponibles = [];
    if (this.filterProvinciaId) {
      this.api.getCantonesByProvincia(this.filterProvinciaId).subscribe((d) => this.cantonesDisponibles = d);
    }
  }
  onModalCantonChange() {
    this.filterParroquiaId = null;
    this.form.institucionId = null;
    this.parroquiasDisponibles = [];
    if (this.filterCantonId) {
      this.api.getParroquiasByCanton(this.filterCantonId).subscribe((d) => this.parroquiasDisponibles = d);
    }
  }
  onModalParroquiaChange() {
    this.form.institucionId = null;
  }
  closeModal() {
    this.showModal = false;
    this.selectedId = null;
    this.errorMessage = "";
  }
  save() {
    this.errorMessage = "";
    if (!this.form.eleccionesId) {
      this.errorMessage = "Debe seleccionar una elecci\xF3n";
      return;
    }
    if (this.editMode && this.selectedId) {
      this.api.updateMesa(this.selectedId, this.form).subscribe({
        next: () => {
          this.load(this.form.eleccionesId);
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Error al guardar. Intente de nuevo.";
        }
      });
    } else {
      this.api.createMesa(this.form).subscribe({
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
  cerrar(id) {
    if (confirm("Cerrar esta mesa?"))
      this.api.cerrarMesa(id).subscribe(() => this.load(this.form.eleccionesId));
  }
  delete(id) {
    if (confirm("Esta seguro de eliminar esta mesa?")) {
      this.api.deleteMesa(id).subscribe(() => this.load(this.form.eleccionesId));
    }
  }
  static {
    this.\u0275fac = function MesasComponent_Factory(t) {
      return new (t || _MesasComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MesasComponent, selectors: [["app-mesas"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 72, vars: 25, consts: [[1, "container"], [1, "page-header"], [1, "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-primary", "dropdown-toggle"], [1, "dropdown-menu", "dropdown-menu-end"], [4, "ngIf"], [1, "dropdown-divider"], [1, "dropdown-item", 3, "click"], [1, "filters-bar", "mb-4"], [1, "filter-item"], [1, "form-select", 3, "change", "ngModelChange", "ngModel"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], ["type", "text", "autocomplete", "off", "placeholder", "Buscar en tabla...", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "table", "table-striped"], [1, "sortable", 3, "click"], [4, "ngFor", "ngForOf"], [1, "pagination-bar"], [1, "pagination-info"], [1, "pagination-controls"], [3, "click", "disabled"], [1, "pagination-size"], [3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "modal", 4, "ngIf"], [1, "dropdown-item", "fw-bold", 3, "click"], [1, "badge"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-sm", "btn-outline-secondary", "border-0"], [1, "bi", "bi-three-dots-vertical"], ["class", "dropdown-item", 3, "click", 4, "ngIf"], ["class", "dropdown-divider", 4, "ngIf"], [1, "dropdown-item", "text-danger", 3, "click"], ["colspan", "6", 1, "text-center", "py-3"], [3, "click"], [3, "value"], [1, "modal"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], ["class", "mb-3", 4, "ngIf"], [1, "mb-3"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["type", "text", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "filter-grid", "mb-3"], [1, "form-select", 3, "ngModelChange", "change", "ngModel", "disabled"], ["type", "text", "autocomplete", "off", "placeholder", "Escriba nombre para filtrar...", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "text-muted"], ["class", "text-muted", 4, "ngIf"], ["value", "MIXTA"], ["value", "HOMBRES"], ["value", "MUJERES"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-danger"]], template: function MesasComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Gesti\xF3n de Mesas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
        \u0275\u0275text(6, " Opciones ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "ul", 4);
        \u0275\u0275template(8, MesasComponent_li_8_Template, 3, 0, "li", 5);
        \u0275\u0275elementStart(9, "li");
        \u0275\u0275element(10, "hr", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "li")(12, "button", 7);
        \u0275\u0275listener("click", function MesasComponent_Template_button_click_12_listener() {
          return ctx.api.exportMesasPdf();
        });
        \u0275\u0275text(13, "\u{1F4C4} Imprimir PDF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "li")(15, "button", 7);
        \u0275\u0275listener("click", function MesasComponent_Template_button_click_15_listener() {
          return ctx.api.exportMesasExcel();
        });
        \u0275\u0275text(16, "\u{1F4CA} Exportar Excel");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(17, "div", 8)(18, "div", 9)(19, "label");
        \u0275\u0275text(20, "Elecci\xF3n:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "select", 10);
        \u0275\u0275listener("change", function MesasComponent_Template_select_change_21_listener() {
          ctx.load(ctx.form.eleccionesId);
          return ctx.currentPage = 1;
        });
        \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_Template_select_ngModelChange_21_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.eleccionesId, $event) || (ctx.form.eleccionesId = $event);
          return $event;
        });
        \u0275\u0275elementStart(22, "option", 11);
        \u0275\u0275text(23, "Seleccione...");
        \u0275\u0275elementEnd();
        \u0275\u0275template(24, MesasComponent_option_24_Template, 2, 2, "option", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "div", 9)(26, "label");
        \u0275\u0275text(27, "Instituci\xF3n:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "select", 13);
        \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_Template_select_ngModelChange_28_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filterInstitucionId, $event) || (ctx.filterInstitucionId = $event);
          return $event;
        });
        \u0275\u0275listener("change", function MesasComponent_Template_select_change_28_listener() {
          return ctx.filtrarPorInstitucion();
        });
        \u0275\u0275elementStart(29, "option", 11);
        \u0275\u0275text(30, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, MesasComponent_option_31_Template, 2, 2, "option", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "div", 9)(33, "label");
        \u0275\u0275text(34, "Buscar:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_Template_input_ngModelChange_35_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
          return $event;
        });
        \u0275\u0275listener("input", function MesasComponent_Template_input_input_35_listener() {
          return ctx.currentPage = 1;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(36, "table", 15)(37, "thead")(38, "tr")(39, "th");
        \u0275\u0275text(40, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "th", 16);
        \u0275\u0275listener("click", function MesasComponent_Template_th_click_41_listener() {
          return ctx.sort("numero");
        });
        \u0275\u0275text(42);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "th", 16);
        \u0275\u0275listener("click", function MesasComponent_Template_th_click_43_listener() {
          return ctx.sort("institucionNombre");
        });
        \u0275\u0275text(44);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "th", 16);
        \u0275\u0275listener("click", function MesasComponent_Template_th_click_45_listener() {
          return ctx.sort("sexo");
        });
        \u0275\u0275text(46);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "th", 16);
        \u0275\u0275listener("click", function MesasComponent_Template_th_click_47_listener() {
          return ctx.sort("cerrada");
        });
        \u0275\u0275text(48);
        \u0275\u0275elementEnd();
        \u0275\u0275element(49, "th");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(50, "tbody");
        \u0275\u0275template(51, MesasComponent_tr_51_Template, 24, 13, "tr", 17)(52, MesasComponent_tr_52_Template, 3, 0, "tr", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(53, "div", 18)(54, "div", 19);
        \u0275\u0275text(55);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "div", 20)(57, "button", 21);
        \u0275\u0275listener("click", function MesasComponent_Template_button_click_57_listener() {
          return ctx.goToPage(1);
        });
        \u0275\u0275text(58, "\xAB\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "button", 21);
        \u0275\u0275listener("click", function MesasComponent_Template_button_click_59_listener() {
          return ctx.prevPage();
        });
        \u0275\u0275text(60, "\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275template(61, MesasComponent_span_61_Template, 3, 3, "span", 17);
        \u0275\u0275elementStart(62, "button", 21);
        \u0275\u0275listener("click", function MesasComponent_Template_button_click_62_listener() {
          return ctx.nextPage();
        });
        \u0275\u0275text(63, "\xBB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "button", 21);
        \u0275\u0275listener("click", function MesasComponent_Template_button_click_64_listener() {
          return ctx.goToPage(ctx.totalPages);
        });
        \u0275\u0275text(65, "\xBB\xBB");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(66, "div", 22)(67, "label");
        \u0275\u0275text(68, "Filas:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "select", 23);
        \u0275\u0275twoWayListener("ngModelChange", function MesasComponent_Template_select_ngModelChange_69_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
          return $event;
        });
        \u0275\u0275listener("change", function MesasComponent_Template_select_change_69_listener() {
          return ctx.onPageSizeChange();
        });
        \u0275\u0275template(70, MesasComponent_option_70_Template, 2, 2, "option", 24);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(71, MesasComponent_div_71_Template, 80, 29, "div", 25);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.isAdmin);
        \u0275\u0275advance(13);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.eleccionesId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.elecciones);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filterInstitucionId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.instituciones);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("N\xFAmero ", ctx.sortColumn === "numero" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Instituci\xF3n ", ctx.sortColumn === "institucionNombre" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Sexo ", ctx.sortColumn === "sexo" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Estado ", ctx.sortColumn === "cerrada" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.mesasPaginadas);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesasFiltradas.length === 0);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate3(" Mostrando ", (ctx.currentPage - 1) * ctx.pageSize + 1, " - ", ctx.Math.min(ctx.currentPage * ctx.pageSize, ctx.mesasFiltradas.length), " de ", ctx.mesasFiltradas.length, " registros ");
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
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1e293b;\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.btn-with-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.filters-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  padding: 16px;\n  background: #f8fafc;\n  border-radius: 12px;\n}\n.filter-item[_ngcontent-%COMP%] {\n  flex: 0 0 300px;\n}\n.filter-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n}\n.mb-4[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 2px solid #e2e8f0;\n  background: #f8fafc;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd) {\n  background: #f9fafb;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #4f46e5);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);\n  transform: translateY(-1px);\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  color: white;\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background: #d97706;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #64748b;\n  color: white;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #475569;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.bg-info[_ngcontent-%COMP%] {\n  background: #06b6d4 !important;\n  color: white !important;\n}\n.bg-primary[_ngcontent-%COMP%] {\n  background: #3b82f6 !important;\n  color: white !important;\n}\n.bg-warning[_ngcontent-%COMP%] {\n  background: #f59e0b !important;\n  color: white !important;\n}\n.bg-success[_ngcontent-%COMP%] {\n  background: #10b981 !important;\n  color: white !important;\n}\n.bg-danger[_ngcontent-%COMP%] {\n  background: #ef4444 !important;\n  color: white !important;\n}\n.form-select[_ngcontent-%COMP%], .form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.form-select[_ngcontent-%COMP%]:focus, .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 13px;\n  margin-top: 4px;\n  display: block;\n}\n.filter-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: 16px;\n  background: #f8fafc;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n}\n.filter-grid[_ngcontent-%COMP%]   .filter-item[_ngcontent-%COMP%] {\n  flex: unset;\n}\n.filter-grid[_ngcontent-%COMP%]   .filter-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  font-weight: 600;\n  color: #64748b;\n}\n.filter-grid[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  font-size: 13px;\n}\n.form-select[_ngcontent-%COMP%]:disabled {\n  background: #f1f5f9;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.modal-dialog.modal-lg[_ngcontent-%COMP%] {\n  max-width: 640px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  border-bottom: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-height: 70vh;\n  overflow-y: auto;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #475569;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #cbd5e1;\n}\n/*# sourceMappingURL=mesas.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MesasComponent, { className: "MesasComponent", filePath: "app\\features\\admin\\pages\\mesas\\mesas.component.ts", lineNumber: 14 });
})();
export {
  MesasComponent
};
//# sourceMappingURL=chunk-GXEVNPCK.js.map
