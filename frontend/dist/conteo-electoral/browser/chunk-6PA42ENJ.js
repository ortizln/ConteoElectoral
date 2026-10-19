import {
  WebSocketService
} from "./chunk-H63LK4X3.js";
import {
  Router
} from "./chunk-WPO3M3N7.js";
import {
  AuthService
} from "./chunk-XHSQRK35.js";
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
} from "./chunk-Y3MBZ57Z.js";
import {
  ApiService
} from "./chunk-ZGAD4T5T.js";
import {
  CommonModule,
  NgClass,
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
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
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
} from "./chunk-SNDXQHAQ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-ASLTLD6L.js";

// src/app/features/mesa/mesa-votacion/mesa-votacion.component.ts
var _c0 = ["cantidadInput"];
var _c1 = () => [];
function MesaVotacionComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "span", 15);
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
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 17);
    \u0275\u0275element(2, "i", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19)(4, "strong");
    \u0275\u0275text(5, "Mesa Cerrada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Esta mesa ha sido cerrada. No se pueden registrar ni modificar votos.");
    \u0275\u0275elementEnd()()();
  }
}
function MesaVotacionComponent_div_10_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_10_button_5_Template_button_click_0_listener() {
      const m_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.seleccionarMesa(m_r3));
    });
    \u0275\u0275elementStart(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 27);
    \u0275\u0275element(4, "i", 28);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 29);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 30);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", m_r3.id === (ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.id))("cerrada", m_r3.cerrada);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Mesa #", m_r3.numero, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", m_r3.sexo === "HOMBRES" ? "bi-gender-male" : m_r3.sexo === "MUJERES" ? "bi-gender-female" : "bi-gender-ambiguous");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r3.sexo, "");
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
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21);
    \u0275\u0275element(2, "i", 22);
    \u0275\u0275text(3, " Selecciona una mesa para trabajar:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 23);
    \u0275\u0275template(5, MesaVotacionComponent_div_10_button_5_Template, 10, 13, "button", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r0.mesasDisponibles);
  }
}
function MesaVotacionComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "div", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 34)(5, "span");
    \u0275\u0275element(6, "i", 35);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275element(9, "i", 36);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275element(12, "i", 37);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Mesa #", ctx_r0.mesaActual.numero, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.mesaActual.institucionNombre, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.mesaActual.sexo, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.totalVotos, " votos registrados");
  }
}
function MesaVotacionComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 17);
    \u0275\u0275element(2, "i", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19)(4, "strong");
    \u0275\u0275text(5, "Sin mesas asignadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "No tiene mesas asignadas para esta elecci\xF3n. Contacte al administrador si considera que esto es un error.");
    \u0275\u0275elementEnd()()();
  }
}
function MesaVotacionComponent_div_13_option_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
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
function MesaVotacionComponent_div_13_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
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
function MesaVotacionComponent_div_13_ng_container_41_tr_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Lista #", l_r7.numeroLista, "");
  }
}
function MesaVotacionComponent_div_13_ng_container_41_tr_1_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 91);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_ng_container_41_tr_1_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const l_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.abrirListaModal(l_r7));
    });
    \u0275\u0275text(1, " Ver ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_div_13_ng_container_41_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 82);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "div", 83)(6, "div", 84);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div")(9, "div", 85);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, MesaVotacionComponent_div_13_ng_container_41_tr_1_div_11_Template, 2, 1, "div", 86);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "td")(13, "span", 87);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 88);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 70);
    \u0275\u0275template(18, MesaVotacionComponent_div_13_ng_container_41_tr_1_button_18_Template, 2, 0, "button", 89);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const l_r7 = ctx.$implicit;
    const i_r9 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("disabled", ctx_r0.mesaActual.cerrada);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r9 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", l_r7.colorPartido);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", l_r7.numeroLista || "?", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(l_r7.nombre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", l_r7.numeroLista);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", (l_r7.colorPartido || "#666") + "20")("color", l_r7.colorPartido || "#666");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(l_r7.partidoNombre || "Independiente");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r7.cargoNombre || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
  }
}
function MesaVotacionComponent_div_13_ng_container_41_tr_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 92);
    \u0275\u0275text(2, "No hay listas que coincidan");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionComponent_div_13_ng_container_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MesaVotacionComponent_div_13_ng_container_41_tr_1_Template, 19, 15, "tr", 81)(2, MesaVotacionComponent_div_13_ng_container_41_tr_2_Template, 3, 0, "tr", 57);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.listasFiltradas);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.listasFiltradas.length === 0);
  }
}
function MesaVotacionComponent_div_13_ng_container_42_tr_1_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 95)(1, "input", 96, 0);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_ng_container_42_tr_1_div_17_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.cantidadVotos, $event) || (ctx_r0.cantidadVotos = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function MesaVotacionComponent_div_13_ng_container_42_tr_1_div_17_Template_input_keyup_enter_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.registrarVoto());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 97);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_ng_container_42_tr_1_div_17_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.registrarVoto());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 98);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_ng_container_42_tr_1_div_17_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.cancelarSeleccion());
    });
    \u0275\u0275text(6, "Cancelar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.cantidadVotos);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.animando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.animando ? "..." : "Registrar", " ");
  }
}
function MesaVotacionComponent_div_13_ng_container_42_tr_1_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 91);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_ng_container_42_tr_1_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const c_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.seleccionarCandidato(c_r12));
    });
    \u0275\u0275text(1, " Votar ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_div_13_ng_container_42_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 82);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "div", 83)(6, "div", 84);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div")(9, "div", 85);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "td")(12, "span", 87);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 88);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 70);
    \u0275\u0275template(17, MesaVotacionComponent_div_13_ng_container_42_tr_1_div_17_Template, 7, 3, "div", 94)(18, MesaVotacionComponent_div_13_ng_container_42_tr_1_button_18_Template, 2, 0, "button", 89);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r12 = ctx.$implicit;
    const i_r13 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", (ctx_r0.candidatoSeleccionado == null ? null : ctx_r0.candidatoSeleccionado.id) === c_r12.id)("disabled", ctx_r0.mesaActual.cerrada);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r13 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", c_r12.colorPartido);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", c_r12.nombre[0], "", c_r12.apellido[0], " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", c_r12.nombre, " ", c_r12.apellido, "");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", c_r12.colorPartido + "20")("color", c_r12.colorPartido);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r12.partidoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r12.cargoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (ctx_r0.candidatoSeleccionado == null ? null : ctx_r0.candidatoSeleccionado.id) === c_r12.id && !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.candidatoSeleccionado == null ? null : ctx_r0.candidatoSeleccionado.id) !== c_r12.id && !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
  }
}
function MesaVotacionComponent_div_13_ng_container_42_tr_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 92);
    \u0275\u0275text(2, "No hay candidatos que coincidan");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionComponent_div_13_ng_container_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MesaVotacionComponent_div_13_ng_container_42_tr_1_Template, 19, 19, "tr", 93)(2, MesaVotacionComponent_div_13_ng_container_42_tr_2_Template, 3, 0, "tr", 57);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.candidatosFiltrados);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.candidatosFiltrados.length === 0);
  }
}
function MesaVotacionComponent_div_13_button_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 99);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_button_53_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.imprimirActa());
    });
    \u0275\u0275element(1, "i", 100);
    \u0275\u0275text(2, " Imprimir Acta ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_div_13_button_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 101);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_button_54_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cerrarMesa());
    });
    \u0275\u0275element(1, "i", 18);
    \u0275\u0275text(2, " Cerrar Acta ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_div_13_th_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 102);
    \u0275\u0275text(1, "Acci\xF3n");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_div_13_tr_75_td_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 70)(1, "button", 105);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_tr_75_td_12_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r16);
      const v_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.eliminarVoto(v_r17.id));
    });
    \u0275\u0275element(2, "i", 106);
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionComponent_div_13_tr_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 82);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span", 87);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 70)(10, "strong", 103);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, MesaVotacionComponent_div_13_tr_75_td_12_Template, 3, 0, "td", 104);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r17 = ctx.$implicit;
    const i_r18 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r18 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r17.candidatoNombre ? v_r17.candidatoNombre + " " + (v_r17.candidatoApellido || "") : v_r17.listaId ? "Lista #" + v_r17.listaId : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r17.partidoNombre || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r17.cantidadVotos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
  }
}
function MesaVotacionComponent_div_13_tr_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 92);
    \u0275\u0275text(2, "No hay votos registrados a\xFAn");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionComponent_div_13_td_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "td");
  }
}
function MesaVotacionComponent_div_13_span_93_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 107)(1, "button", 108);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_span_93_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.decrementarNulos());
    });
    \u0275\u0275text(2, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 109);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_span_93_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.votosNulos, $event) || (ctx_r0.votosNulos = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesaVotacionComponent_div_13_span_93_Template_input_change_3_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.guardarVotosNulos());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 110);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_span_93_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r19);
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
function MesaVotacionComponent_div_13_strong_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong", 111);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.votosNulos);
  }
}
function MesaVotacionComponent_div_13_td_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "td");
  }
}
function MesaVotacionComponent_div_13_span_103_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 107)(1, "button", 108);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_span_103_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.decrementarBlanco());
    });
    \u0275\u0275text(2, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 109);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_span_103_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.votosBlanco, $event) || (ctx_r0.votosBlanco = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesaVotacionComponent_div_13_span_103_Template_input_change_3_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.guardarVotosBlanco());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 110);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_span_103_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r20);
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
function MesaVotacionComponent_div_13_strong_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong", 112);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.votosBlanco);
  }
}
function MesaVotacionComponent_div_13_td_105_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "td");
  }
}
function MesaVotacionComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41)(2, "div", 42)(3, "h3");
    \u0275\u0275element(4, "i", 43);
    \u0275\u0275text(5, " Candidatos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 44);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 45)(9, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filtroTexto, $event) || (ctx_r0.filtroTexto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function MesaVotacionComponent_div_13_Template_input_input_9_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.aplicarFiltro());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "select", 47);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_Template_select_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filtroPartidoId, $event) || (ctx_r0.filtroPartidoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesaVotacionComponent_div_13_Template_select_change_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.aplicarFiltro());
    });
    \u0275\u0275elementStart(11, "option", 48);
    \u0275\u0275text(12, "Todos los Partidos");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, MesaVotacionComponent_div_13_option_13_Template, 2, 2, "option", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "select", 47);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_13_Template_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filtroCargoId, $event) || (ctx_r0.filtroCargoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function MesaVotacionComponent_div_13_Template_select_change_14_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.aplicarFiltro());
    });
    \u0275\u0275elementStart(15, "option", 48);
    \u0275\u0275text(16, "Todos los Cargos");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, MesaVotacionComponent_div_13_option_17_Template, 2, 2, "option", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 50);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.limpiarFiltro());
    });
    \u0275\u0275text(19, "Limpiar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 51)(21, "table", 52)(22, "thead")(23, "tr")(24, "th", 53);
    \u0275\u0275text(25, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th", 54);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_26_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(!ctx_r0.mostrarListas && ctx_r0.setSortCandidatos("nombre"));
    });
    \u0275\u0275text(27);
    \u0275\u0275elementStart(28, "span", 55);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "th", 54);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_30_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortCandidatos("partido"));
    });
    \u0275\u0275text(31, " Partido ");
    \u0275\u0275elementStart(32, "span", 55);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "th", 54);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_34_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortCandidatos("cargo"));
    });
    \u0275\u0275text(35, " Cargo ");
    \u0275\u0275elementStart(36, "span", 55);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "th", 56);
    \u0275\u0275text(39, "Acci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "tbody");
    \u0275\u0275template(41, MesaVotacionComponent_div_13_ng_container_41_Template, 3, 2, "ng-container", 57)(42, MesaVotacionComponent_div_13_ng_container_42_Template, 3, 2, "ng-container", 57);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(43, "div", 58)(44, "div", 42)(45, "h3");
    \u0275\u0275element(46, "i", 59);
    \u0275\u0275text(47, " Votos Registrados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 60)(49, "span", 61);
    \u0275\u0275text(50, "Total: ");
    \u0275\u0275elementStart(51, "strong");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(53, MesaVotacionComponent_div_13_button_53_Template, 3, 0, "button", 62)(54, MesaVotacionComponent_div_13_button_54_Template, 3, 0, "button", 63);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 51)(56, "table", 64)(57, "thead")(58, "tr")(59, "th", 53);
    \u0275\u0275text(60, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "th", 54);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_61_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortVotos("candidato"));
    });
    \u0275\u0275text(62, " Candidato ");
    \u0275\u0275elementStart(63, "span", 55);
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "th", 54);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_65_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortVotos("partido"));
    });
    \u0275\u0275text(66, " Partido ");
    \u0275\u0275elementStart(67, "span", 55);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "th", 65);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_Template_th_click_69_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSortVotos("votos"));
    });
    \u0275\u0275text(70, " Votos ");
    \u0275\u0275elementStart(71, "span", 55);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(73, MesaVotacionComponent_div_13_th_73_Template, 2, 0, "th", 66);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(74, "tbody");
    \u0275\u0275template(75, MesaVotacionComponent_div_13_tr_75_Template, 13, 5, "tr", 67)(76, MesaVotacionComponent_div_13_tr_76_Template, 3, 0, "tr", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "tfoot")(78, "tr", 68)(79, "td", 69)(80, "strong");
    \u0275\u0275text(81, "TOTAL");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(82, "td", 70)(83, "strong", 71);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(85, MesaVotacionComponent_div_13_td_85_Template, 1, 0, "td", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "tr", 72);
    \u0275\u0275element(87, "td");
    \u0275\u0275elementStart(88, "td", 73)(89, "span", 74);
    \u0275\u0275element(90, "i", 5);
    \u0275\u0275text(91, " Votos Nulos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "td", 70);
    \u0275\u0275template(93, MesaVotacionComponent_div_13_span_93_Template, 6, 1, "span", 75)(94, MesaVotacionComponent_div_13_strong_94_Template, 2, 1, "strong", 76);
    \u0275\u0275elementEnd();
    \u0275\u0275template(95, MesaVotacionComponent_div_13_td_95_Template, 1, 0, "td", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "tr", 77);
    \u0275\u0275element(97, "td");
    \u0275\u0275elementStart(98, "td", 73)(99, "span", 78);
    \u0275\u0275element(100, "i", 79);
    \u0275\u0275text(101, " Votos en Blanco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "td", 70);
    \u0275\u0275template(103, MesaVotacionComponent_div_13_span_103_Template, 6, 1, "span", 75)(104, MesaVotacionComponent_div_13_strong_104_Template, 2, 1, "strong", 80);
    \u0275\u0275elementEnd();
    \u0275\u0275template(105, MesaVotacionComponent_div_13_td_105_Template, 1, 0, "td", 57);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
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
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" ", ctx_r0.mostrarListas ? "Lista" : "Candidato", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getSortIconCandidatos("nombre"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.getSortIconCandidatos("partido"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.getSortIconCandidatos("cargo"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.mostrarListas);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.mostrarListas);
    \u0275\u0275advance(10);
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
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
  }
}
function MesaVotacionComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 113);
  }
}
function MesaVotacionComponent_div_15_div_9_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "strong");
    \u0275\u0275text(2, "N\xB0:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.listaLlamada.numeroLista, "");
  }
}
function MesaVotacionComponent_div_15_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 124)(1, "span")(2, "strong");
    \u0275\u0275text(3, "Partido:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, MesaVotacionComponent_div_15_div_9_span_5_Template, 4, 1, "span", 57);
    \u0275\u0275elementStart(6, "span")(7, "strong");
    \u0275\u0275text(8, "Candidatos:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.listaLlamada.partidoNombre || "Independiente", "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.listaLlamada.numeroLista);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (ctx_r0.listaLlamada.candidatos || \u0275\u0275pureFunction0(3, _c1)).length, "");
  }
}
function MesaVotacionComponent_div_15_table_10_tr_10_Template(rf, ctx) {
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
    const c_r22 = ctx.$implicit;
    const i_r23 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r23 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", c_r22.nombre, " ", c_r22.apellido, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r22.cargoNombre || "\u2014");
  }
}
function MesaVotacionComponent_div_15_table_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 125)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Candidato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Cargo");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275template(10, MesaVotacionComponent_div_15_table_10_tr_10_Template, 7, 4, "tr", 67);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r0.listaLlamada.candidatos);
  }
}
function MesaVotacionComponent_div_15_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 126);
    \u0275\u0275text(1, " Cargando candidatos... ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_div_15_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 127)(1, "label");
    \u0275\u0275text(2, "Cantidad de votos para toda la lista:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 128)(4, "button", 108);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_15_div_12_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.decrementarCantidadLista());
    });
    \u0275\u0275text(5, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 129);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_15_div_12_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.cantidadLista, $event) || (ctx_r0.cantidadLista = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 110);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_15_div_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.incrementarCantidadLista());
    });
    \u0275\u0275text(8, "+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 130);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_15_div_12_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.votarLista());
    });
    \u0275\u0275text(10, "Votar Lista");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.cantidadLista);
  }
}
function MesaVotacionComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 114)(1, "div", 115)(2, "div", 116)(3, "div", 117)(4, "h5");
    \u0275\u0275element(5, "i", 59);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 118);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarListaModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 119);
    \u0275\u0275template(9, MesaVotacionComponent_div_15_div_9_Template, 10, 4, "div", 120)(10, MesaVotacionComponent_div_15_table_10_Template, 11, 1, "table", 121)(11, MesaVotacionComponent_div_15_div_11_Template, 2, 0, "div", 122)(12, MesaVotacionComponent_div_15_div_12_Template, 11, 1, "div", 123);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (ctx_r0.listaLlamada == null ? null : ctx_r0.listaLlamada.nombre) || "Lista", "");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.listaLlamada);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.listaLlamada == null ? null : ctx_r0.listaLlamada.candidatos) && ctx_r0.listaLlamada.candidatos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.listaLlamada == null ? null : ctx_r0.listaLlamada.candidatos) || ctx_r0.listaLlamada.candidatos.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
  }
}
function MesaVotacionComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 113);
  }
}
function MesaVotacionComponent_div_17_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 138);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.deleteError);
  }
}
function MesaVotacionComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 114)(1, "div", 131)(2, "div", 116)(3, "div", 117)(4, "h5");
    \u0275\u0275element(5, "i", 132);
    \u0275\u0275text(6, " Eliminar voto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 118);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_17_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelarDeleteVoto());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 119)(9, "p");
    \u0275\u0275text(10, "Ingrese su contrase\xF1a para confirmar la eliminaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 133);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_div_17_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.deletePassword, $event) || (ctx_r0.deletePassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function MesaVotacionComponent_div_17_Template_input_keyup_enter_11_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.ejecutarDeleteVoto());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, MesaVotacionComponent_div_17_div_12_Template, 2, 1, "div", 134);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 135)(14, "button", 136);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_17_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelarDeleteVoto());
    });
    \u0275\u0275text(15, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 137);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_17_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.ejecutarDeleteVoto());
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
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
    this.listas = [];
    this.listasFiltradas = [];
    this.showListaModal = false;
    this.listaLlamada = null;
    this.cantidadLista = 1;
    this.cargosConLista = [];
    this.mostrarListas = false;
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
      this.cargosConLista = data.filter((c) => c.tipoVotacion === "LISTA");
    });
    this.api.getListasByEleccion(eleccionId).subscribe((data) => {
      this.listas = data;
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
    const cargo = this.cargos.find((c) => c.id === this.filtroCargoId);
    this.mostrarListas = cargo?.tipoVotacion === "LISTA";
    if (this.mostrarListas) {
      this.candidatoSeleccionado = null;
      let filtradas = [...this.listas];
      if (this.filtroPartidoId) {
        filtradas = filtradas.filter((l) => l.partidoId === this.filtroPartidoId);
      }
      if (this.filtroTexto) {
        const texto = this.filtroTexto.toLowerCase();
        filtradas = filtradas.filter((l) => l.nombre.toLowerCase().includes(texto) || l.partidoNombre && l.partidoNombre.toLowerCase().includes(texto));
      }
      this.listasFiltradas = filtradas.map((l) => __spreadProps(__spreadValues({}, l), {
        colorPartido: this.getColorPartido(l.partidoNombre || l.nombre)
      }));
      return;
    }
    let filtrados = [...this.candidatosAux];
    filtrados = filtrados.filter((c) => !c.listaId);
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
          return dir * ((a.candidatoNombre ?? "") + (a.candidatoApellido ?? "")).localeCompare((b.candidatoNombre ?? "") + (b.candidatoApellido ?? ""));
        case "partido":
          return dir * (a.partidoNombre ?? "").localeCompare(b.partidoNombre ?? "");
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
  abrirListaModal(lista) {
    this.listaLlamada = lista;
    this.cantidadLista = 1;
    this.showListaModal = true;
    if (!lista.candidatos || lista.candidatos.length === 0) {
      this.api.getListaDetalle(lista.id).subscribe((detalle) => {
        if (this.listaLlamada?.id === lista.id) {
          this.listaLlamada = __spreadProps(__spreadValues({}, lista), { candidatos: detalle.candidatos || [] });
        }
      });
    }
  }
  decrementarCantidadLista() {
    if (this.cantidadLista > 1)
      this.cantidadLista--;
  }
  incrementarCantidadLista() {
    this.cantidadLista++;
  }
  cerrarListaModal() {
    this.showListaModal = false;
    this.listaLlamada = null;
    this.cantidadLista = 1;
  }
  votarLista() {
    if (!this.mesaActual || !this.listaLlamada || this.mesaActual.cerrada)
      return;
    const cant = this.cantidadLista || 1;
    this.api.registrarVoto({
      listaId: this.listaLlamada.id,
      mesaId: this.mesaActual.id,
      cantidadVotos: cant,
      eleccionesId: this.mesaActual.eleccionesId
    }).subscribe(() => {
      this.cerrarListaModal();
      this.loadVotos();
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
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 18, vars: 10, consts: [["cantidadInput", ""], [1, "mesa-container"], [1, "mesa-header"], [1, "header-left"], [1, "header-icon"], [1, "bi", "bi-check2-square"], [1, "header-meta"], [3, "class", 4, "ngIf"], ["class", "alert-cerrada", 4, "ngIf"], ["class", "mesa-selector-card", 4, "ngIf"], ["class", "mesa-actual-card", 4, "ngIf"], ["class", "alert alert-info", 4, "ngIf"], ["class", "content-grid", 4, "ngIf"], ["class", "modal-backdrop show", 4, "ngIf"], ["class", "modal show", "style", "display:block;", 4, "ngIf"], [1, "estado-dot"], [1, "alert-cerrada"], [1, "alert-icon"], [1, "bi", "bi-lock-fill"], [1, "alert-content"], [1, "mesa-selector-card"], [1, "selector-label"], [1, "bi", "bi-pin-map"], [1, "mesa-opciones"], ["class", "mesa-opcion", 3, "active", "cerrada", "click", 4, "ngFor", "ngForOf"], [1, "mesa-opcion", 3, "click"], [1, "mesa-numero"], [1, "mesa-sexo"], [1, "bi", 3, "ngClass"], [1, "mesa-institucion"], [1, "mesa-estado-tag"], [1, "mesa-actual-card"], [1, "mesa-actual-info"], [1, "mesa-actual-numero"], [1, "mesa-actual-detalles"], [1, "bi", "bi-geo-alt"], [1, "bi", "bi-gender-ambiguous"], [1, "bi", "bi-bar-chart-fill"], [1, "alert", "alert-info"], [1, "bi", "bi-info-circle-fill"], [1, "content-grid"], [1, "card", "candidatos-card"], [1, "card-header"], [1, "bi", "bi-person"], [1, "card-badge"], [1, "filtros-rapidos"], ["type", "text", "placeholder", "Buscar candidato...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "btn", "btn-clean", 3, "click"], [1, "table-wrapper"], [1, "table-candidatos"], [2, "width", "40px"], [1, "sortable", 3, "click"], [1, "sort-icon"], [1, "text-right", 2, "width", "140px"], [4, "ngIf"], [1, "card", "votos-card"], [1, "bi", "bi-clipboard-data"], [1, "card-header-actions"], [1, "total-votos-badge"], ["class", "btn btn-acta", 3, "click", 4, "ngIf"], ["class", "btn btn-cerrar", 3, "click", 4, "ngIf"], [1, "table-votos"], [1, "sortable", "text-right", 2, "width", "100px", 3, "click"], ["style", "width: 80px", "class", "text-right", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "total-row"], ["colspan", "3"], [1, "text-right"], [1, "voto-count-total"], [1, "nulos-row"], ["colspan", "2"], [1, "nulos-label"], ["class", "nulos-input-group", 4, "ngIf"], ["class", "voto-count-nulos", 4, "ngIf"], [1, "blanco-row"], [1, "blanco-label"], [1, "bi", "bi-square"], ["class", "voto-count-blanco", 4, "ngIf"], [3, "disabled", 4, "ngFor", "ngForOf"], [1, "row-num"], [1, "candidato-cell"], [1, "candidato-avatar"], [1, "candidato-nombre"], ["class", "candidato-lista-detalle", 4, "ngIf"], [1, "partido-tag"], [1, "cargo-cell"], ["class", "btn btn-seleccionar", 3, "click", 4, "ngIf"], [1, "candidato-lista-detalle"], [1, "btn", "btn-seleccionar", 3, "click"], ["colspan", "5", 1, "empty-msg"], [3, "selected", "disabled", 4, "ngFor", "ngForOf"], ["class", "voto-input-group", 4, "ngIf"], [1, "voto-input-group"], ["type", "number", "min", "1", 1, "voto-input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "btn", "btn-registrar", 3, "click", "disabled"], [1, "btn", "btn-cancelar", 3, "click"], [1, "btn", "btn-acta", 3, "click"], [1, "bi", "bi-printer"], [1, "btn", "btn-cerrar", 3, "click"], [1, "text-right", 2, "width", "80px"], [1, "voto-count"], ["class", "text-right", 4, "ngIf"], [1, "btn", "btn-eliminar", 3, "click"], [1, "bi", "bi-x-lg"], [1, "nulos-input-group"], [1, "btn-nulos-minus", 3, "click"], ["type", "number", "min", "0", 1, "nulos-input", 3, "ngModelChange", "change", "ngModel"], [1, "btn-nulos-plus", 3, "click"], [1, "voto-count-nulos"], [1, "voto-count-blanco"], [1, "modal-backdrop", "show"], [1, "modal", "show", 2, "display", "block"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content"], [1, "modal-header"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], ["class", "lista-info-bar", 4, "ngIf"], ["class", "table-lista-candidatos", 4, "ngIf"], ["class", "empty-msg", 4, "ngIf"], ["class", "voto-lista-section", 4, "ngIf"], [1, "lista-info-bar"], [1, "table-lista-candidatos"], [1, "empty-msg"], [1, "voto-lista-section"], [1, "voto-lista-controls"], ["type", "number", "min", "1", 1, "voto-input", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-registrar", 3, "click"], [1, "modal-dialog", "modal-sm", "modal-dialog-centered"], [1, "bi", "bi-trash3"], ["type", "password", "placeholder", "Contrase\xF1a", "autofocus", "", 1, "form-control", 3, "ngModelChange", "keyup.enter", "ngModel"], ["class", "text-danger mt-2 small", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-danger", 3, "click", "disabled"], [1, "text-danger", "mt-2", "small"]], template: function MesaVotacionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "h1")(4, "span", 4);
        \u0275\u0275element(5, "i", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Registro de Votos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 6);
        \u0275\u0275template(8, MesaVotacionComponent_span_8_Template, 3, 3, "span", 7);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(9, MesaVotacionComponent_div_9_Template, 8, 0, "div", 8)(10, MesaVotacionComponent_div_10_Template, 6, 1, "div", 9)(11, MesaVotacionComponent_div_11_Template, 14, 4, "div", 10)(12, MesaVotacionComponent_div_12_Template, 8, 0, "div", 11)(13, MesaVotacionComponent_div_13_Template, 106, 31, "div", 12)(14, MesaVotacionComponent_div_14_Template, 1, 0, "div", 13)(15, MesaVotacionComponent_div_15_Template, 13, 5, "div", 14)(16, MesaVotacionComponent_div_16_Template, 1, 0, "div", 13)(17, MesaVotacionComponent_div_17_Template, 18, 4, "div", 14);
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
        \u0275\u0275property("ngIf", ctx.showListaModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showListaModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDeleteConfirm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDeleteConfirm);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ["\n\n.mesa-container[_ngcontent-%COMP%] {\n  max-width: 100%;\n  margin: 0 auto;\n  padding: 24px 32px;\n}\n.mesa-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 24px;\n}\n.header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 700;\n  margin: 0 0 10px 0;\n  color: var(--alantek-text);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.header-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.mesa-estado[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 14px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n.estado-abierta[_ngcontent-%COMP%] {\n  background: var(--alantek-success-bg);\n  color: var(--alantek-success);\n  border: 1px solid var(--alantek-success);\n}\n.estado-cerrada[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg);\n  color: var(--alantek-danger);\n  border: 1px solid var(--alantek-danger);\n}\n.estado-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n}\n.estado-abierta[_ngcontent-%COMP%]   .estado-dot[_ngcontent-%COMP%] {\n  background: var(--alantek-success);\n  animation: _ngcontent-%COMP%_pulse-dot 2s infinite;\n}\n.estado-cerrada[_ngcontent-%COMP%]   .estado-dot[_ngcontent-%COMP%] {\n  background: var(--alantek-danger);\n}\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 0 0 rgba(47, 125, 79, 0.4);\n  }\n  50% {\n    opacity: 0.7;\n    box-shadow: 0 0 0 4px rgba(47, 125, 79, 0);\n  }\n}\n.alert-cerrada[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n  background: var(--alantek-danger-bg);\n  border: 1px solid var(--alantek-danger);\n  border-radius: 12px;\n  margin-bottom: 20px;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.alert-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.alert-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--alantek-danger);\n  font-size: 15px;\n}\n.alert-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: var(--alantek-danger);\n  font-size: 13px;\n}\n.mesa-selector-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--alantek-info-bg),\n      var(--alantek-surface));\n  border: 1px solid var(--alantek-info);\n  border-radius: 16px;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n.selector-label[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--alantek-info);\n  margin-bottom: 12px;\n}\n.mesa-opciones[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.mesa-opcion[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 14px 18px;\n  background: var(--alantek-surface);\n  border: 2px solid var(--alantek-border);\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n  min-width: 180px;\n  text-align: left;\n}\n.mesa-opcion[_ngcontent-%COMP%]:hover {\n  border-color: var(--alantek-primary);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(217, 119, 50, 0.15);\n}\n.mesa-opcion.active[_ngcontent-%COMP%] {\n  border-color: var(--alantek-primary);\n  background: var(--alantek-info-bg);\n  box-shadow: 0 0 0 3px rgba(217, 119, 50, 0.15);\n}\n.mesa-opcion.cerrada[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  border-color: var(--alantek-danger);\n}\n.mesa-opcion.cerrada[_ngcontent-%COMP%]:hover {\n  border-color: var(--alantek-danger);\n}\n.mesa-numero[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 16px;\n  color: var(--alantek-text);\n}\n.mesa-sexo[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--alantek-text-muted);\n}\n.mesa-institucion[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--alantek-text-muted);\n}\n.mesa-estado-tag[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 600;\n}\n.tag-abierta[_ngcontent-%COMP%] {\n  background: var(--alantek-success-bg);\n  color: var(--alantek-success);\n}\n.tag-cerrada[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg);\n  color: var(--alantek-danger);\n}\n.mesa-actual-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--alantek-primary-dark),\n      var(--alantek-primary-strong));\n  border-radius: 16px;\n  padding: 20px 24px;\n  margin-bottom: 20px;\n  box-shadow: var(--alantek-shadow-md);\n}\n.mesa-actual-numero[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: white;\n  margin-bottom: 8px;\n}\n.mesa-actual-detalles[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.mesa-actual-detalles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--alantek-text-muted);\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 0.8fr;\n  gap: 24px;\n  align-items: start;\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 16px;\n  box-shadow: var(--alantek-shadow-sm);\n  border: 1px solid var(--alantek-border);\n  overflow: hidden;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 18px 20px 0;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  color: var(--alantek-text);\n}\n.card-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--alantek-text-muted);\n  background: var(--alantek-background);\n  padding: 2px 10px;\n  border-radius: 12px;\n}\n.card-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.total-votos-badge[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--alantek-text-muted);\n}\n.total-votos-badge[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--alantek-text);\n  font-size: 18px;\n}\n.filtros-rapidos[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 14px 20px;\n  flex-wrap: wrap;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 140px;\n  padding: 8px 14px;\n  border: 1px solid var(--alantek-border);\n  border-radius: 8px;\n  font-size: 13px;\n  transition: all 0.2s;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--alantek-primary);\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(217, 119, 50, 0.1);\n}\n.filter-select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid var(--alantek-border);\n  border-radius: 8px;\n  font-size: 13px;\n  background: var(--alantek-background);\n  min-width: 140px;\n}\n.filter-select[_ngcontent-%COMP%]:focus {\n  border-color: var(--alantek-primary);\n  outline: none;\n}\n.btn-clean[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid var(--alantek-border);\n  background: var(--alantek-surface);\n  border-radius: 8px;\n  color: var(--alantek-text-muted);\n  font-size: 13px;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-clean[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n  color: var(--alantek-danger);\n  border-color: var(--alantek-danger);\n}\n.btn-seleccionar[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--alantek-primary),\n      var(--alantek-primary-strong));\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-seleccionar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(217, 119, 50, 0.3);\n}\n.btn-cerrar[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: var(--alantek-danger);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-cerrar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(192, 57, 43, 0.3);\n}\n.btn-acta[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: var(--alantek-success);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-acta[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(47, 125, 79, 0.3);\n}\n.btn-eliminar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 1px solid var(--alantek-danger);\n  background: var(--alantek-surface);\n  color: var(--alantek-danger);\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.btn-eliminar[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-danger-bg);\n  border-color: var(--alantek-danger);\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  padding: 0 4px 16px;\n}\n.table-candidatos[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n}\n.table-candidatos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 10px;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--alantek-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 2px solid var(--alantek-border);\n  background: var(--alantek-background);\n  white-space: nowrap;\n}\n.table-candidatos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, .table-votos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child {\n  border-radius: 10px 0 0 0;\n}\n.table-candidatos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, .table-votos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 10px 0 0;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 14px;\n  border-bottom: 1px solid var(--alantek-border);\n  font-size: 14px;\n  color: var(--alantek-text-secondary);\n  vertical-align: middle;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: background 0.2s;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%] {\n  background: var(--alantek-info-bg);\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  pointer-events: none;\n}\n.table-votos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.table-votos[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 10px;\n  background: var(--alantek-background);\n  border-top: 2px solid var(--alantek-border);\n  font-size: 14px;\n}\n.total-row[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n}\n.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s;\n}\n.sortable[_ngcontent-%COMP%]:hover {\n  color: var(--alantek-primary);\n}\n.sort-icon[_ngcontent-%COMP%] {\n  font-size: 11px;\n  margin-left: 3px;\n  opacity: 0.5;\n}\n.sortable[_ngcontent-%COMP%]:hover   .sort-icon[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.row-num[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  background: var(--alantek-background);\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--alantek-text-muted);\n}\n.candidato-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.candidato-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 700;\n  font-size: 13px;\n  flex-shrink: 0;\n}\n.candidato-nombre[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--alantek-text);\n  font-size: 14px;\n}\n.partido-tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 10px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  background: var(--alantek-background);\n  color: var(--alantek-text-secondary);\n}\n.cargo-cell[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--alantek-text-muted);\n}\n.voto-input-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: flex-end;\n}\n.voto-input[_ngcontent-%COMP%] {\n  width: 70px;\n  padding: 6px 8px;\n  border: 2px solid var(--alantek-primary);\n  border-radius: 8px;\n  font-size: 16px;\n  font-weight: 700;\n  text-align: center;\n}\n.voto-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(217, 119, 50, 0.2);\n}\n.btn-registrar[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: var(--alantek-success);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-registrar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(47, 125, 79, 0.3);\n}\n.btn-registrar[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.btn-cancelar[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: var(--alantek-surface);\n  border: 1px solid var(--alantek-border);\n  color: var(--alantek-text-muted);\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-cancelar[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n  border-color: var(--alantek-border-strong);\n  color: var(--alantek-text-secondary);\n}\n.voto-count[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--alantek-text);\n}\n.voto-count-total[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--alantek-primary);\n}\n.voto-count-nulos[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--alantek-danger);\n}\n.nulos-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-top: 2px solid var(--alantek-border);\n  padding: 12px 14px;\n  background: var(--alantek-warning-bg);\n}\n.nulos-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--alantek-warning);\n  font-size: 14px;\n}\n.nulos-input-group[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.nulos-input[_ngcontent-%COMP%] {\n  width: 60px;\n  padding: 4px 6px;\n  border: 2px solid var(--alantek-highlight);\n  border-radius: 6px;\n  font-size: 16px;\n  font-weight: 700;\n  text-align: center;\n  color: var(--alantek-warning);\n}\n.nulos-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(230, 185, 79, 0.2);\n}\n.btn-nulos-minus[_ngcontent-%COMP%], .btn-nulos-plus[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 1px solid var(--alantek-highlight);\n  background: var(--alantek-warning-bg);\n  border-radius: 6px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--alantek-warning);\n  transition: all 0.15s;\n}\n.btn-nulos-minus[_ngcontent-%COMP%]:hover, .btn-nulos-plus[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-warning-bg);\n  border-color: var(--alantek-highlight);\n}\n.empty-msg[_ngcontent-%COMP%] {\n  padding: 32px !important;\n  color: var(--alantek-text-muted);\n  text-align: center;\n  font-size: 14px;\n}\n@media (max-width: 1100px) {\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.listas-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.listas-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 10px;\n}\n.lista-tile[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  background: var(--alantek-background);\n  border: 1px solid var(--alantek-border);\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.lista-tile[_ngcontent-%COMP%]:hover {\n  border-color: var(--alantek-primary);\n  background: var(--alantek-info-bg);\n  transform: translateY(-1px);\n}\n.lista-numero[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--alantek-primary);\n  color: white;\n  font-weight: 700;\n  border-radius: 10px;\n  font-size: 16px;\n  flex-shrink: 0;\n}\n.lista-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.lista-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  color: var(--alantek-text);\n}\n.lista-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: var(--alantek-text-muted);\n}\n.btn-votar-lista[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  background: var(--alantek-primary);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.btn-votar-lista[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-primary-strong);\n}\n.lista-info-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  padding: 12px;\n  background: var(--alantek-background);\n  border-radius: 8px;\n  margin-bottom: 16px;\n  font-size: 13px;\n  color: var(--alantek-text-secondary);\n}\n.table-lista-candidatos[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 16px;\n}\n.table-lista-candidatos[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 8px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--alantek-text-muted);\n  text-transform: uppercase;\n  border-bottom: 2px solid var(--alantek-border);\n}\n.table-lista-candidatos[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 8px;\n  font-size: 13px;\n  color: var(--alantek-text-secondary);\n  border-bottom: 1px solid var(--alantek-border);\n}\n.voto-lista-section[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--alantek-border);\n  padding-top: 16px;\n}\n.voto-lista-section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--alantek-text-secondary);\n  margin-bottom: 8px;\n}\n.voto-lista-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.voto-lista-controls[_ngcontent-%COMP%]   .voto-input[_ngcontent-%COMP%] {\n  width: 80px;\n}\n@media (max-width: 640px) {\n  .mesa-actual-detalles[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 4px;\n  }\n  .filtros-rapidos[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .search-input[_ngcontent-%COMP%], .filter-select[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: auto;\n  }\n  .mesa-opciones[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .mesa-opcion[_ngcontent-%COMP%] {\n    min-width: auto;\n  }\n  .listas-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=mesa-votacion.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MesaVotacionComponent, { className: "MesaVotacionComponent", filePath: "app\\features\\mesa\\mesa-votacion\\mesa-votacion.component.ts", lineNumber: 22 });
})();
export {
  MesaVotacionComponent
};
//# sourceMappingURL=chunk-6PA42ENJ.js.map
