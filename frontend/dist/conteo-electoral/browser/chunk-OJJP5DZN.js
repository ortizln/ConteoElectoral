import {
  WebSocketService
} from "./chunk-7OWRCG7O.js";
import {
  AuthService,
  Router
} from "./chunk-KZU2HTPH.js";
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
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
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-3DSQS3EE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-ASLTLD6L.js";

// src/app/features/mesa/mesa-votacion/mesa-votacion.component.ts
var _c0 = ["cantidadInput"];
function MesaVotacionComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "span", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap("mesa-estado " + ctx_r0.getEstadoMesaClass());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getEstadoMesaText(), " ");
  }
}
function MesaVotacionComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 16);
    \u0275\u0275text(2, "\u{1F512}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17)(4, "strong");
    \u0275\u0275text(5, "Mesa Cerrada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Esta mesa ha sido cerrada. No se pueden registrar ni modificar votos.");
    \u0275\u0275elementEnd()()();
  }
}
function MesaVotacionComponent_div_10_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_10_button_4_Template_button_click_0_listener() {
      const m_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.seleccionarMesa(m_r3));
    });
    \u0275\u0275elementStart(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 26);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", m_r3.id === (ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.id))("cerrada", m_r3.cerrada);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Mesa #", m_r3.numero, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", m_r3.sexo === "HOMBRES" ? "\u2642" : m_r3.sexo === "MUJERES" ? "\u2640" : "\u26A4", " ", m_r3.sexo, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r3.institucionNombre);
    \u0275\u0275advance();
    \u0275\u0275classProp("tag-cerrada", m_r3.cerrada)("tag-abierta", !m_r3.cerrada);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r3.cerrada ? "Cerrada" : "Activa", " ");
  }
}
function MesaVotacionComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19);
    \u0275\u0275text(2, "\u{1F4CC} Selecciona una mesa para trabajar:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20);
    \u0275\u0275template(4, MesaVotacionComponent_div_10_button_4_Template, 9, 13, "button", 21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.mesasDisponibles);
  }
}
function MesaVotacionComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28)(2, "div", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 30)(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Mesa #", ctx_r0.mesaActual.numero, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4CD} ", ctx_r0.mesaActual.institucionNombre, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u26A4 ", ctx_r0.mesaActual.sexo, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4CA} ", ctx_r0.totalVotos, " votos registrados");
  }
}
function MesaVotacionComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "span", 16);
    \u0275\u0275text(2, "\u2139\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17)(4, "strong");
    \u0275\u0275text(5, "Sin mesas asignadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "No tiene mesas asignadas para esta elecci\xF3n. Contacte al administrador si considera que esto es un error.");
    \u0275\u0275elementEnd()()();
  }
}
function MesaVotacionComponent_div_13_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275property("ngValue", p_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r5.nombre);
  }
}
function MesaVotacionComponent_div_13_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r6 = ctx.$implicit;
    \u0275\u0275property("ngValue", c_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r6.nombre);
  }
}
function MesaVotacionComponent_div_13_tr_40_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 79)(1, "input", 80, 0);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_tr_40_div_17_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.cantidadVotos, $event) || (ctx_r0.cantidadVotos = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function MesaVotacionComponent_div_13_tr_40_div_17_Template_input_keyup_enter_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.registrarVoto());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 81);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_tr_40_div_17_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.registrarVoto());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 82);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_tr_40_div_17_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.cancelarSeleccion());
    });
    \u0275\u0275text(6, "Cancelar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.cantidadVotos);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.animando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.animando ? "..." : "Registrar", " ");
  }
}
function MesaVotacionComponent_div_13_tr_40_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 83);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_tr_40_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const c_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.seleccionarCandidato(c_r9));
    });
    \u0275\u0275text(1, " Votar ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_div_13_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 71);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "div", 72)(6, "div", 73);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div")(9, "div", 74);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "td")(12, "span", 75);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 76);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 61);
    \u0275\u0275template(17, MesaVotacionComponent_div_13_tr_40_div_17_Template, 7, 3, "div", 77)(18, MesaVotacionComponent_div_13_tr_40_button_18_Template, 2, 0, "button", 78);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", (ctx_r0.candidatoSeleccionado == null ? null : ctx_r0.candidatoSeleccionado.id) === c_r9.id)("disabled", ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r10 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", c_r9.colorPartido);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", c_r9.nombre[0], "", c_r9.apellido[0], " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", c_r9.nombre, " ", c_r9.apellido, "");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", c_r9.colorPartido + "20")("color", c_r9.colorPartido);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r9.partidoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r9.cargoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (ctx_r0.candidatoSeleccionado == null ? null : ctx_r0.candidatoSeleccionado.id) === c_r9.id && !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.candidatoSeleccionado == null ? null : ctx_r0.candidatoSeleccionado.id) !== c_r9.id && !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
  }
}
function MesaVotacionComponent_div_13_tr_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 84);
    \u0275\u0275text(2, "No hay candidatos que coincidan");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionComponent_div_13_button_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_button_51_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.imprimirActa());
    });
    \u0275\u0275text(1, " \u{1F4C4} Imprimir Acta ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_div_13_button_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 86);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_button_52_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cerrarMesa());
    });
    \u0275\u0275text(1, " \u{1F512} Cerrar Acta ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_div_13_th_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 87);
    \u0275\u0275text(1, "Acci\xF3n");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_div_13_tr_73_td_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 61)(1, "button", 90);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_tr_73_td_12_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const v_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.eliminarVoto(v_r14.id));
    });
    \u0275\u0275text(2, "\u2715");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionComponent_div_13_tr_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 71);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span", 75);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 61)(10, "strong", 88);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, MesaVotacionComponent_div_13_tr_73_td_12_Template, 3, 0, "td", 89);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r14 = ctx.$implicit;
    const i_r15 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r15 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", v_r14.candidatoNombre, " ", v_r14.candidatoApellido, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r14.partidoNombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r14.cantidadVotos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
  }
}
function MesaVotacionComponent_div_13_tr_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 84);
    \u0275\u0275text(2, "No hay votos registrados a\xFAn");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionComponent_div_13_td_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "td");
  }
}
function MesaVotacionComponent_div_13_span_90_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 91)(1, "button", 92);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_span_90_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.decrementarNulos());
    });
    \u0275\u0275text(2, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 93);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_span_90_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.votosNulos, $event) || (ctx_r0.votosNulos = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesaVotacionComponent_div_13_span_90_Template_input_change_3_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.guardarVotosNulos());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 94);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_span_90_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.incrementarNulos());
    });
    \u0275\u0275text(5, "+");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.votosNulos);
  }
}
function MesaVotacionComponent_div_13_strong_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong", 95);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.votosNulos);
  }
}
function MesaVotacionComponent_div_13_td_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "td");
  }
}
function MesaVotacionComponent_div_13_span_99_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 91)(1, "button", 92);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_span_99_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.decrementarBlanco());
    });
    \u0275\u0275text(2, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 93);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_span_99_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.votosBlanco, $event) || (ctx_r0.votosBlanco = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesaVotacionComponent_div_13_span_99_Template_input_change_3_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.guardarVotosBlanco());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 94);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_span_99_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.incrementarBlanco());
    });
    \u0275\u0275text(5, "+");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.votosBlanco);
  }
}
function MesaVotacionComponent_div_13_strong_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong", 96);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.votosBlanco);
  }
}
function MesaVotacionComponent_div_13_td_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "td");
  }
}
function MesaVotacionComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "div", 34)(3, "h3");
    \u0275\u0275text(4, "\u{1F464} Candidatos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 36)(8, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filtroTexto, $event) || (ctx_r0.filtroTexto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function MesaVotacionComponent_div_13_Template_input_input_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.aplicarFiltro());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 38);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_Template_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filtroPartidoId, $event) || (ctx_r0.filtroPartidoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesaVotacionComponent_div_13_Template_select_change_9_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.aplicarFiltro());
    });
    \u0275\u0275elementStart(10, "option", 39);
    \u0275\u0275text(11, "Todos los Partidos");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, MesaVotacionComponent_div_13_option_12_Template, 2, 2, "option", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 38);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filtroCargoId, $event) || (ctx_r0.filtroCargoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesaVotacionComponent_div_13_Template_select_change_13_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.aplicarFiltro());
    });
    \u0275\u0275elementStart(14, "option", 39);
    \u0275\u0275text(15, "Todos los Cargos");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, MesaVotacionComponent_div_13_option_16_Template, 2, 2, "option", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 41);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.limpiarFiltro());
    });
    \u0275\u0275text(18, "Limpiar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 42)(20, "table", 43)(21, "thead")(22, "tr")(23, "th", 44);
    \u0275\u0275text(24, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 45);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_25_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortCandidatos("nombre"));
    });
    \u0275\u0275text(26, " Candidato ");
    \u0275\u0275elementStart(27, "span", 46);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "th", 45);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_29_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortCandidatos("partido"));
    });
    \u0275\u0275text(30, " Partido ");
    \u0275\u0275elementStart(31, "span", 46);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "th", 45);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_33_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortCandidatos("cargo"));
    });
    \u0275\u0275text(34, " Cargo ");
    \u0275\u0275elementStart(35, "span", 46);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "th", 47);
    \u0275\u0275text(38, "Acci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "tbody");
    \u0275\u0275template(40, MesaVotacionComponent_div_13_tr_40_Template, 19, 19, "tr", 48)(41, MesaVotacionComponent_div_13_tr_41_Template, 3, 0, "tr", 49);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(42, "div", 50)(43, "div", 34)(44, "h3");
    \u0275\u0275text(45, "\u{1F4CB} Votos Registrados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 51)(47, "span", 52);
    \u0275\u0275text(48, "Total: ");
    \u0275\u0275elementStart(49, "strong");
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(51, MesaVotacionComponent_div_13_button_51_Template, 2, 0, "button", 53)(52, MesaVotacionComponent_div_13_button_52_Template, 2, 0, "button", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 42)(54, "table", 55)(55, "thead")(56, "tr")(57, "th", 44);
    \u0275\u0275text(58, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "th", 45);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_59_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortVotos("candidato"));
    });
    \u0275\u0275text(60, " Candidato ");
    \u0275\u0275elementStart(61, "span", 46);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "th", 45);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_63_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortVotos("partido"));
    });
    \u0275\u0275text(64, " Partido ");
    \u0275\u0275elementStart(65, "span", 46);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "th", 56);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_67_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortVotos("votos"));
    });
    \u0275\u0275text(68, " Votos ");
    \u0275\u0275elementStart(69, "span", 46);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(71, MesaVotacionComponent_div_13_th_71_Template, 2, 0, "th", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "tbody");
    \u0275\u0275template(73, MesaVotacionComponent_div_13_tr_73_Template, 13, 6, "tr", 58)(74, MesaVotacionComponent_div_13_tr_74_Template, 3, 0, "tr", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "tfoot")(76, "tr", 59)(77, "td", 60)(78, "strong");
    \u0275\u0275text(79, "TOTAL");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "td", 61)(81, "strong", 62);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(83, MesaVotacionComponent_div_13_td_83_Template, 1, 0, "td", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "tr", 63);
    \u0275\u0275element(85, "td");
    \u0275\u0275elementStart(86, "td", 64)(87, "span", 65);
    \u0275\u0275text(88, "\u{1F5F3}\uFE0F Votos Nulos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "td", 61);
    \u0275\u0275template(90, MesaVotacionComponent_div_13_span_90_Template, 6, 1, "span", 66)(91, MesaVotacionComponent_div_13_strong_91_Template, 2, 1, "strong", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275template(92, MesaVotacionComponent_div_13_td_92_Template, 1, 0, "td", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "tr", 68);
    \u0275\u0275element(94, "td");
    \u0275\u0275elementStart(95, "td", 64)(96, "span", 69);
    \u0275\u0275text(97, "\u2B1C Votos en Blanco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(98, "td", 61);
    \u0275\u0275template(99, MesaVotacionComponent_div_13_span_99_Template, 6, 1, "span", 66)(100, MesaVotacionComponent_div_13_strong_100_Template, 2, 1, "strong", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275template(101, MesaVotacionComponent_div_13_td_101_Template, 1, 0, "td", 49);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r0.candidatosFiltrados.length, " candidatos");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.filtroTexto);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.filtroPartidoId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.partidos);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.filtroCargoId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.cargos);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r0.getSortIconCandidatos("nombre"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.getSortIconCandidatos("partido"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.getSortIconCandidatos("cargo"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.candidatosFiltrados);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.candidatosFiltrados.length === 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.totalVotos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.getSortIconVotos("candidato"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.getSortIconVotos("partido"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.getSortIconVotos("votos"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.votosRegistrados);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.votosRegistrados.length === 0);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.totalVotos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
  }
}
function MesaVotacionComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 97);
  }
}
function MesaVotacionComponent_div_15_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 109);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.deleteError);
  }
}
function MesaVotacionComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 98)(1, "div", 99)(2, "div", 100)(3, "div", 101)(4, "h5");
    \u0275\u0275text(5, "\u{1F5D1}\uFE0F Eliminar voto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 102);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_15_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelarDeleteVoto());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 103)(8, "p");
    \u0275\u0275text(9, "Ingrese su contrase\xF1a para confirmar la eliminaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 104);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_15_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.deletePassword, $event) || (ctx_r0.deletePassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function MesaVotacionComponent_div_15_Template_input_keyup_enter_10_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.ejecutarDeleteVoto());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, MesaVotacionComponent_div_15_div_11_Template, 2, 1, "div", 105);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 106)(13, "button", 107);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_15_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelarDeleteVoto());
    });
    \u0275\u0275text(14, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 108);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_15_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.ejecutarDeleteVoto());
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.deletePassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.deleteError);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.deleteCargando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.deleteCargando ? "..." : "Eliminar", " ");
  }
}
var MesaVotacionComponent = class _MesaVotacionComponent {
  constructor(api, authService, router, wsService) {
    this.api = api;
    this.authService = authService;
    this.router = router;
    this.wsService = wsService;
    this.elecciones = [];
    this.candidatos = [];
    this.candidatosFiltrados = [];
    this.candidatosAux = [];
    this.mesasDisponibles = [];
    this.mesaActual = null;
    this.votosRegistrados = [];
    this.candidatoSeleccionado = null;
    this.cantidadVotos = 1;
    this.totalVotos = 0;
    this.votosNulos = 0;
    this.votosBlanco = 0;
    this.nulosTimeout = null;
    this.blancoTimeout = null;
    this.filtroTexto = "";
    this.filtroPartidoId = null;
    this.filtroCargoId = null;
    this.partidos = [];
    this.cargos = [];
    this.sortColumnCandidatos = "partido";
    this.sortDirectionCandidatos = "asc";
    this.sortColumnVotos = "votos";
    this.sortDirectionVotos = "desc";
    this.animando = false;
    this.wsSubscription = null;
    this.eleccionId = null;
    this.showDeleteConfirm = false;
    this.deleteVotoId = null;
    this.deletePassword = "";
    this.deleteError = "";
    this.deleteCargando = false;
    this.colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#e11d48"];
  }
  ngOnInit() {
    this.api.getEleccionesActivas().subscribe((elecciones) => {
      this.elecciones = elecciones;
      if (elecciones.length > 0) {
        const eleccion = elecciones[0];
        this.eleccionId = eleccion.id;
        this.loadData(eleccion.id);
        this.subscribeToMesaEstado(eleccion.id);
      }
    });
  }
  subscribeToMesaEstado(eleccionId) {
    this.wsSubscription = this.wsService.subscribeToMesaEstado(eleccionId).subscribe({
      next: (msg) => {
        if (msg.tipo === "mesa-estado") {
          if (this.mesaActual && this.mesaActual.id === msg.mesaId) {
            this.mesaActual.cerrada = msg.cerrada;
          }
          const idx = this.mesasDisponibles.findIndex((m) => m.id === msg.mesaId);
          if (idx >= 0) {
            this.mesasDisponibles[idx] = __spreadProps(__spreadValues({}, this.mesasDisponibles[idx]), { cerrada: msg.cerrada });
          }
        }
      },
      error: () => {
      }
    });
  }
  ngOnDestroy() {
    this.wsSubscription?.unsubscribe();
  }
  loadData(eleccionId) {
    this.api.getCandidatosByEleccion(eleccionId).subscribe((data) => {
      this.candidatos = data;
      this.candidatosAux = data;
      this.aplicarFiltro();
    });
    this.api.getPartidosByEleccion(eleccionId).subscribe((data) => {
      this.partidos = data;
    });
    this.api.getCargosByEleccion(eleccionId).subscribe((data) => {
      this.cargos = data;
    });
    this.api.getMesasByCurrentUser(eleccionId).subscribe((mesas) => {
      this.mesasDisponibles = mesas;
      if (mesas.length > 0) {
        this.seleccionarMesa(mesas[0]);
      }
    });
  }
  seleccionarMesa(mesa) {
    this.mesaActual = mesa;
    this.candidatoSeleccionado = null;
    this.cantidadVotos = 1;
    this.votosNulos = mesa.votosNulos ?? 0;
    this.votosBlanco = mesa.votosBlanco ?? 0;
    this.loadVotos();
  }
  loadVotos() {
    if (!this.mesaActual)
      return;
    this.api.getVotosByMesa(this.mesaActual.id).subscribe((votos) => {
      this.votosRegistrados = votos.map((v, i) => __spreadProps(__spreadValues({}, v), { indice: i + 1 }));
      this.totalVotos = votos.reduce((sum, v) => sum + v.cantidadVotos, 0);
      this.ordenarVotos();
    });
  }
  aplicarFiltro() {
    let filtrados = [...this.candidatosAux];
    if (this.filtroTexto) {
      const texto = this.filtroTexto.toLowerCase();
      filtrados = filtrados.filter((c) => c.nombre.toLowerCase().includes(texto) || c.apellido.toLowerCase().includes(texto));
    }
    if (this.filtroPartidoId) {
      filtrados = filtrados.filter((c) => c.partidoId === this.filtroPartidoId);
    }
    if (this.filtroCargoId) {
      filtrados = filtrados.filter((c) => c.cargoId === this.filtroCargoId);
    }
    this.candidatosFiltrados = filtrados.map((c) => __spreadProps(__spreadValues({}, c), {
      colorPartido: this.getColorPartido(c.partidoNombre)
    }));
    this.ordenarCandidatos();
  }
  getColorPartido(partidoNombre) {
    let hash = 0;
    for (let i = 0; i < partidoNombre.length; i++) {
      hash = partidoNombre.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.colors[Math.abs(hash) % this.colors.length];
  }
  limpiarFiltro() {
    this.filtroTexto = "";
    this.filtroPartidoId = null;
    this.filtroCargoId = null;
    this.aplicarFiltro();
  }
  setSortCandidatos(col) {
    if (this.sortColumnCandidatos === col) {
      this.sortDirectionCandidatos = this.sortDirectionCandidatos === "asc" ? "desc" : "asc";
    } else {
      this.sortColumnCandidatos = col;
      this.sortDirectionCandidatos = "asc";
    }
    this.ordenarCandidatos();
  }
  getSortIconCandidatos(col) {
    if (this.sortColumnCandidatos !== col)
      return "\u21C5";
    return this.sortDirectionCandidatos === "asc" ? "\u2191" : "\u2193";
  }
  ordenarCandidatos() {
    const dir = this.sortDirectionCandidatos === "asc" ? 1 : -1;
    this.candidatosFiltrados = [...this.candidatosFiltrados].sort((a, b) => {
      switch (this.sortColumnCandidatos) {
        case "nombre":
          return dir * (a.nombre + a.apellido).localeCompare(b.nombre + b.apellido);
        case "partido":
          return dir * (a.partidoNombre || "").localeCompare(b.partidoNombre || "");
        case "cargo":
          return dir * a.cargoNombre.localeCompare(b.cargoNombre);
        default:
          return 0;
      }
    });
  }
  setSortVotos(col) {
    if (this.sortColumnVotos === col) {
      this.sortDirectionVotos = this.sortDirectionVotos === "asc" ? "desc" : "asc";
    } else {
      this.sortColumnVotos = col;
      this.sortDirectionVotos = "desc";
    }
    this.ordenarVotos();
  }
  getSortIconVotos(col) {
    if (this.sortColumnVotos !== col)
      return "\u21C5";
    return this.sortDirectionVotos === "asc" ? "\u2191" : "\u2193";
  }
  ordenarVotos() {
    const dir = this.sortDirectionVotos === "asc" ? 1 : -1;
    this.votosRegistrados = [...this.votosRegistrados].sort((a, b) => {
      switch (this.sortColumnVotos) {
        case "candidato":
          return dir * (a.candidatoNombre + a.candidatoApellido).localeCompare(b.candidatoNombre + b.candidatoApellido);
        case "partido":
          return dir * a.partidoNombre.localeCompare(b.partidoNombre);
        case "votos":
          return dir * (a.cantidadVotos - b.cantidadVotos);
        default:
          return 0;
      }
    });
  }
  seleccionarCandidato(candidato) {
    this.candidatoSeleccionado = candidato;
    setTimeout(() => this.cantidadInput?.nativeElement?.focus(), 100);
  }
  cancelarSeleccion() {
    this.candidatoSeleccionado = null;
    this.cantidadVotos = 1;
  }
  incrementarNulos() {
    this.votosNulos = (this.votosNulos || 0) + 1;
    this.guardarVotosNulos();
  }
  decrementarNulos() {
    if ((this.votosNulos || 0) > 0) {
      this.votosNulos = this.votosNulos - 1;
      this.guardarVotosNulos();
    }
  }
  incrementarBlanco() {
    this.votosBlanco = (this.votosBlanco || 0) + 1;
    this.guardarVotosBlanco();
  }
  decrementarBlanco() {
    if ((this.votosBlanco || 0) > 0) {
      this.votosBlanco = this.votosBlanco - 1;
      this.guardarVotosBlanco();
    }
  }
  guardarVotosBlanco() {
    if (!this.mesaActual)
      return;
    if (this.blancoTimeout)
      clearTimeout(this.blancoTimeout);
    this.blancoTimeout = setTimeout(() => {
      this.api.actualizarVotosBlanco(this.mesaActual.id, this.votosBlanco || 0).subscribe({
        next: (m) => {
          this.mesaActual.votosBlanco = m.votosBlanco;
        },
        error: () => {
        }
      });
    }, 400);
  }
  guardarVotosNulos() {
    if (!this.mesaActual)
      return;
    if (this.nulosTimeout)
      clearTimeout(this.nulosTimeout);
    this.nulosTimeout = setTimeout(() => {
      this.api.actualizarVotosNulos(this.mesaActual.id, this.votosNulos || 0).subscribe({
        next: (m) => {
          this.mesaActual.votosNulos = m.votosNulos;
        },
        error: () => {
        }
      });
    }, 400);
  }
  registrarVoto() {
    if (!this.mesaActual || !this.candidatoSeleccionado || this.mesaActual.cerrada)
      return;
    this.animando = true;
    const existingVoto = this.votosRegistrados.find((v) => v.candidatoId === this.candidatoSeleccionado.id);
    const cant = this.cantidadVotos || 1;
    if (existingVoto) {
      this.api.actualizarVoto(existingVoto.id, {
        candidatoId: this.candidatoSeleccionado.id,
        mesaId: this.mesaActual.id,
        cantidadVotos: existingVoto.cantidadVotos + cant,
        eleccionesId: this.mesaActual.eleccionesId
      }).subscribe(() => {
        this.loadVotos();
        this.cantidadVotos = 1;
        this.animando = false;
      });
    } else {
      this.api.registrarVoto({
        candidatoId: this.candidatoSeleccionado.id,
        mesaId: this.mesaActual.id,
        cantidadVotos: cant,
        eleccionesId: this.mesaActual.eleccionesId
      }).subscribe(() => {
        this.loadVotos();
        this.cantidadVotos = 1;
        this.animando = false;
      });
    }
  }
  eliminarVoto(id) {
    this.deleteVotoId = id;
    this.deletePassword = "";
    this.deleteError = "";
    this.deleteCargando = false;
    this.showDeleteConfirm = true;
  }
  cancelarDeleteVoto() {
    this.showDeleteConfirm = false;
    this.deleteVotoId = null;
    this.deletePassword = "";
    this.deleteError = "";
  }
  ejecutarDeleteVoto() {
    if (!this.deleteVotoId || !this.deletePassword) {
      this.deleteError = "Ingrese su contrase\xF1a";
      return;
    }
    this.deleteCargando = true;
    this.deleteError = "";
    this.api.verifyPassword(this.deletePassword).subscribe({
      next: (res) => {
        if (!res.valid) {
          this.deleteError = "Contrase\xF1a incorrecta";
          this.deleteCargando = false;
          return;
        }
        this.api.deleteVoto(this.deleteVotoId).subscribe(() => {
          this.cancelarDeleteVoto();
          this.loadVotos();
        });
      },
      error: () => {
        this.deleteError = "Error al verificar la contrase\xF1a";
        this.deleteCargando = false;
      }
    });
  }
  imprimirActa() {
    if (this.mesaActual) {
      this.api.exportActaMesaPdf(this.mesaActual.id);
    }
  }
  cerrarMesa() {
    if (!this.mesaActual)
      return;
    if (!confirm("\xBFEst\xE1 seguro de cerrar el acta? Una vez cerrada no podr\xE1 modificar los votos."))
      return;
    this.api.cerrarMesa(this.mesaActual.id).subscribe(() => {
      this.mesaActual.cerrada = true;
    });
  }
  getEstadoMesaClass() {
    if (!this.mesaActual)
      return "";
    return this.mesaActual.cerrada ? "estado-cerrada" : "estado-abierta";
  }
  getEstadoMesaText() {
    if (!this.mesaActual)
      return "";
    return this.mesaActual.cerrada ? "CERRADA" : "ABIERTA";
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  static {
    this.\u0275fac = function MesaVotacionComponent_Factory(t) {
      return new (t || _MesaVotacionComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(WebSocketService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MesaVotacionComponent, selectors: [["app-mesa-votacion"]], viewQuery: function MesaVotacionComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.cantidadInput = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 8, consts: [["cantidadInput", ""], [1, "mesa-container"], [1, "mesa-header"], [1, "header-left"], [1, "header-icon"], [1, "header-meta"], [3, "class", 4, "ngIf"], ["class", "alert-cerrada", 4, "ngIf"], ["class", "mesa-selector-card", 4, "ngIf"], ["class", "mesa-actual-card", 4, "ngIf"], ["class", "alert alert-info", 4, "ngIf"], ["class", "content-grid", 4, "ngIf"], ["class", "modal-backdrop show", 4, "ngIf"], ["class", "modal show", "style", "display:block;", 4, "ngIf"], [1, "estado-dot"], [1, "alert-cerrada"], [1, "alert-icon"], [1, "alert-content"], [1, "mesa-selector-card"], [1, "selector-label"], [1, "mesa-opciones"], ["class", "mesa-opcion", 3, "active", "cerrada", "click", 4, "ngFor", "ngForOf"], [1, "mesa-opcion", 3, "click"], [1, "mesa-numero"], [1, "mesa-sexo"], [1, "mesa-institucion"], [1, "mesa-estado-tag"], [1, "mesa-actual-card"], [1, "mesa-actual-info"], [1, "mesa-actual-numero"], [1, "mesa-actual-detalles"], [1, "alert", "alert-info"], [1, "content-grid"], [1, "card", "candidatos-card"], [1, "card-header"], [1, "card-badge"], [1, "filtros-rapidos"], ["type", "text", "placeholder", "Buscar candidato...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "btn", "btn-clean", 3, "click"], [1, "table-wrapper"], [1, "table-candidatos"], [2, "width", "40px"], [1, "sortable", 3, "click"], [1, "sort-icon"], [1, "text-right", 2, "width", "140px"], [3, "selected", "disabled", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "card", "votos-card"], [1, "card-header-actions"], [1, "total-votos-badge"], ["class", "btn btn-acta", 3, "click", 4, "ngIf"], ["class", "btn btn-cerrar", 3, "click", 4, "ngIf"], [1, "table-votos"], [1, "sortable", "text-right", 2, "width", "100px", 3, "click"], ["style", "width: 80px", "class", "text-right", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "total-row"], ["colspan", "3"], [1, "text-right"], [1, "voto-count-total"], [1, "nulos-row"], ["colspan", "2"], [1, "nulos-label"], ["class", "nulos-input-group", 4, "ngIf"], ["class", "voto-count-nulos", 4, "ngIf"], [1, "blanco-row"], [1, "blanco-label"], ["class", "voto-count-blanco", 4, "ngIf"], [1, "row-num"], [1, "candidato-cell"], [1, "candidato-avatar"], [1, "candidato-nombre"], [1, "partido-tag"], [1, "cargo-cell"], ["class", "voto-input-group", 4, "ngIf"], ["class", "btn btn-seleccionar", 3, "click", 4, "ngIf"], [1, "voto-input-group"], ["type", "number", "min", "1", 1, "voto-input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "btn", "btn-registrar", 3, "click", "disabled"], [1, "btn", "btn-cancelar", 3, "click"], [1, "btn", "btn-seleccionar", 3, "click"], ["colspan", "5", 1, "empty-msg"], [1, "btn", "btn-acta", 3, "click"], [1, "btn", "btn-cerrar", 3, "click"], [1, "text-right", 2, "width", "80px"], [1, "voto-count"], ["class", "text-right", 4, "ngIf"], [1, "btn", "btn-eliminar", 3, "click"], [1, "nulos-input-group"], [1, "btn-nulos-minus", 3, "click"], ["type", "number", "min", "0", 1, "nulos-input", 3, "ngModelChange", "change", "ngModel"], [1, "btn-nulos-plus", 3, "click"], [1, "voto-count-nulos"], [1, "voto-count-blanco"], [1, "modal-backdrop", "show"], [1, "modal", "show", 2, "display", "block"], [1, "modal-dialog", "modal-sm", "modal-dialog-centered"], [1, "modal-content"], [1, "modal-header"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], ["type", "password", "placeholder", "Contrase\xF1a", "autofocus", "", 1, "form-control", 3, "ngModelChange", "keyup.enter", "ngModel"], ["class", "text-danger mt-2 small", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-danger", 3, "click", "disabled"], [1, "text-danger", "mt-2", "small"]], template: function MesaVotacionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "h1")(4, "span", 4);
        \u0275\u0275text(5, "\u{1F5F3}\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Registro de Votos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275template(8, MesaVotacionComponent_span_8_Template, 3, 3, "span", 6);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(9, MesaVotacionComponent_div_9_Template, 8, 0, "div", 7)(10, MesaVotacionComponent_div_10_Template, 5, 1, "div", 8)(11, MesaVotacionComponent_div_11_Template, 11, 4, "div", 9)(12, MesaVotacionComponent_div_12_Template, 8, 0, "div", 10)(13, MesaVotacionComponent_div_13_Template, 102, 30, "div", 11)(14, MesaVotacionComponent_div_14_Template, 1, 0, "div", 12)(15, MesaVotacionComponent_div_15_Template, 17, 4, "div", 13);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.mesaActual);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesaActual == null ? null : ctx.mesaActual.cerrada);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesasDisponibles.length > 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesaActual);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesasDisponibles.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesaActual);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDeleteConfirm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDeleteConfirm);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ["\n\n.mesa-container[_ngcontent-%COMP%] {\n  max-width: 100%;\n  margin: 0 auto;\n  padding: 24px 32px;\n}\n.mesa-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 24px;\n}\n.header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 700;\n  margin: 0 0 10px 0;\n  color: #0f172a;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.header-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.mesa-estado[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 14px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n.estado-abierta[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n  border: 1px solid #86efac;\n}\n.estado-cerrada[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n  border: 1px solid #fca5a5;\n}\n.estado-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n}\n.estado-abierta[_ngcontent-%COMP%]   .estado-dot[_ngcontent-%COMP%] {\n  background: #16a34a;\n  animation: _ngcontent-%COMP%_pulse-dot 2s infinite;\n}\n.estado-cerrada[_ngcontent-%COMP%]   .estado-dot[_ngcontent-%COMP%] {\n  background: #dc2626;\n}\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);\n  }\n  50% {\n    opacity: 0.7;\n    box-shadow: 0 0 0 4px rgba(22, 163, 74, 0);\n  }\n}\n.alert-cerrada[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 12px;\n  margin-bottom: 20px;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.alert-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.alert-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #991b1b;\n  font-size: 15px;\n}\n.alert-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #b91c1c;\n  font-size: 13px;\n}\n.mesa-selector-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f0f9ff,\n      #eff6ff);\n  border: 1px solid #bae6fd;\n  border-radius: 16px;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n.selector-label[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: #0369a1;\n  margin-bottom: 12px;\n}\n.mesa-opciones[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.mesa-opcion[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 14px 18px;\n  background: white;\n  border: 2px solid #e2e8f0;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n  min-width: 180px;\n  text-align: left;\n}\n.mesa-opcion[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);\n}\n.mesa-opcion.active[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: #eff6ff;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n}\n.mesa-opcion.cerrada[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  border-color: #fecaca;\n}\n.mesa-opcion.cerrada[_ngcontent-%COMP%]:hover {\n  border-color: #ef4444;\n}\n.mesa-numero[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 16px;\n  color: #0f172a;\n}\n.mesa-sexo[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #64748b;\n}\n.mesa-institucion[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n}\n.mesa-estado-tag[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 600;\n}\n.tag-abierta[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n}\n.tag-cerrada[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.mesa-actual-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1e293b,\n      #334155);\n  border-radius: 16px;\n  padding: 20px 24px;\n  margin-bottom: 20px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);\n}\n.mesa-actual-numero[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: white;\n  margin-bottom: 8px;\n}\n.mesa-actual-detalles[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.mesa-actual-detalles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #94a3b8;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 0.8fr;\n  gap: 24px;\n  align-items: start;\n}\n.card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f1f5f9;\n  overflow: hidden;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 18px 20px 0;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  color: #0f172a;\n}\n.card-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n  background: #f1f5f9;\n  padding: 2px 10px;\n  border-radius: 12px;\n}\n.card-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.total-votos-badge[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n}\n.total-votos-badge[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0f172a;\n  font-size: 18px;\n}\n.filtros-rapidos[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 14px 20px;\n  flex-wrap: wrap;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 140px;\n  padding: 8px 14px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 13px;\n  transition: all 0.2s;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.filter-select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 13px;\n  background: #fafafa;\n  min-width: 140px;\n}\n.filter-select[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  outline: none;\n}\n.btn-clean[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #e2e8f0;\n  background: white;\n  border-radius: 8px;\n  color: #64748b;\n  font-size: 13px;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-clean[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n  color: #ef4444;\n  border-color: #fca5a5;\n}\n.btn-seleccionar[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-seleccionar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\n}\n.btn-cerrar[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #dc2626);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-cerrar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);\n}\n.btn-acta[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #059669,\n      #10b981);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-acta[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);\n}\n.btn-eliminar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 1px solid #fecaca;\n  background: white;\n  color: #ef4444;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.btn-eliminar[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n  border-color: #ef4444;\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  padding: 0 4px 16px;\n}\n.table-candidatos[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n}\n.table-candidatos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 10px;\n  font-size: 11px;\n  font-weight: 700;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 2px solid #f1f5f9;\n  background: #fafafa;\n  white-space: nowrap;\n}\n.table-candidatos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, .table-votos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child {\n  border-radius: 10px 0 0 0;\n}\n.table-candidatos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, .table-votos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 10px 0 0;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 14px;\n  border-bottom: 1px solid #f1f5f9;\n  font-size: 14px;\n  color: #334155;\n  vertical-align: middle;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: background 0.2s;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%] {\n  background: #eff6ff;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  pointer-events: none;\n}\n.table-votos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.table-votos[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 10px;\n  background: #f8fafc;\n  border-top: 2px solid #e2e8f0;\n  font-size: 14px;\n}\n.total-row[_ngcontent-%COMP%] {\n  background: #f1f5f9 !important;\n}\n.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s;\n}\n.sortable[_ngcontent-%COMP%]:hover {\n  color: #3b82f6;\n}\n.sort-icon[_ngcontent-%COMP%] {\n  font-size: 11px;\n  margin-left: 3px;\n  opacity: 0.5;\n}\n.sortable[_ngcontent-%COMP%]:hover   .sort-icon[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.row-num[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  background: #f1f5f9;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #94a3b8;\n}\n.candidato-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.candidato-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 700;\n  font-size: 13px;\n  flex-shrink: 0;\n}\n.candidato-nombre[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n  font-size: 14px;\n}\n.partido-tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 10px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  background: #f1f5f9;\n  color: #475569;\n}\n.cargo-cell[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #64748b;\n}\n.voto-input-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: flex-end;\n}\n.voto-input[_ngcontent-%COMP%] {\n  width: 70px;\n  padding: 6px 8px;\n  border: 2px solid #3b82f6;\n  border-radius: 8px;\n  font-size: 16px;\n  font-weight: 700;\n  text-align: center;\n}\n.voto-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);\n}\n.btn-registrar[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #059669);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-registrar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);\n}\n.btn-registrar[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.btn-cancelar[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: white;\n  border: 1px solid #e2e8f0;\n  color: #64748b;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-cancelar[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n  border-color: #94a3b8;\n  color: #334155;\n}\n.voto-count[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #0f172a;\n}\n.voto-count-total[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #3b82f6;\n}\n.voto-count-nulos[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #dc2626;\n}\n.nulos-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-top: 2px solid #f1f5f9;\n  padding: 12px 14px;\n  background: #fffbeb;\n}\n.nulos-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #b45309;\n  font-size: 14px;\n}\n.nulos-input-group[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.nulos-input[_ngcontent-%COMP%] {\n  width: 60px;\n  padding: 4px 6px;\n  border: 2px solid #f59e0b;\n  border-radius: 6px;\n  font-size: 16px;\n  font-weight: 700;\n  text-align: center;\n  color: #b45309;\n}\n.nulos-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);\n}\n.btn-nulos-minus[_ngcontent-%COMP%], .btn-nulos-plus[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 1px solid #fde68a;\n  background: #fffbeb;\n  border-radius: 6px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  font-weight: 700;\n  color: #b45309;\n  transition: all 0.15s;\n}\n.btn-nulos-minus[_ngcontent-%COMP%]:hover, .btn-nulos-plus[_ngcontent-%COMP%]:hover {\n  background: #fef3c7;\n  border-color: #f59e0b;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  padding: 32px !important;\n  color: #94a3b8;\n  text-align: center;\n  font-size: 14px;\n}\n@media (max-width: 1100px) {\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .mesa-actual-detalles[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 4px;\n  }\n  .filtros-rapidos[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .search-input[_ngcontent-%COMP%], .filter-select[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: auto;\n  }\n  .mesa-opciones[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .mesa-opcion[_ngcontent-%COMP%] {\n    min-width: auto;\n  }\n}\n/*# sourceMappingURL=mesa-votacion.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MesaVotacionComponent, { className: "MesaVotacionComponent", filePath: "app\\features\\mesa\\mesa-votacion\\mesa-votacion.component.ts", lineNumber: 22 });
})();
export {
  MesaVotacionComponent
};
//# sourceMappingURL=chunk-OJJP5DZN.js.map
