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
  NumberValueAccessor
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
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3DSQS3EE.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/mesa/mesa-votacion-papeleta/mesa-votacion-papeleta.component.ts
function MesaVotacionPapeletaComponent_div_0_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275element(1, "i", 26);
    \u0275\u0275text(2, " Mesa cerrada \u2014 solo lectura ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionPapeletaComponent_div_0_div_15_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function MesaVotacionPapeletaComponent_div_0_div_15_button_2_Template_button_click_0_listener() {
      const m_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.seleccionarMesa(m_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("btn-primary", m_r4.id === ctx_r1.mesaActual.id)("btn-outline-secondary", m_r4.id !== ctx_r1.mesaActual.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Mesa ", m_r4.numeroMesa, "");
  }
}
function MesaVotacionPapeletaComponent_div_0_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28);
    \u0275\u0275template(2, MesaVotacionPapeletaComponent_div_0_div_15_button_2_Template, 2, 5, "button", 29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.mesasDisponibles);
  }
}
function MesaVotacionPapeletaComponent_div_0_div_18_li_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 36)(1, "button", 37);
    \u0275\u0275listener("click", function MesaVotacionPapeletaComponent_div_0_div_18_li_3_Template_button_click_1_listener() {
      const p_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.seleccionarPapeleta(p_r6));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", (ctx_r1.papeletaActual == null ? null : ctx_r1.papeletaActual.id) === p_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r6.titulo);
  }
}
function MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const op_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275styleProp("color", ctx_r1.papeletaActual.colorHex || "#0d6efd");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(op_r8.numeroLista);
  }
}
function MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275element(1, "i", 52);
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275element(1, "i", 55);
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const op_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Lista ", op_r8.partidoSigla, "");
  }
}
function MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45);
    \u0275\u0275listener("click", function MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_Template_div_click_1_listener() {
      const op_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.seleccionarOpcion(op_r8));
    });
    \u0275\u0275template(2, MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_2_Template, 2, 3, "div", 46)(3, MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_3_Template, 2, 0, "div", 47)(4, MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_4_Template, 2, 0, "div", 47)(5, MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_5_Template, 2, 0, "div", 47)(6, MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_6_Template, 2, 0, "div", 47);
    \u0275\u0275elementStart(7, "div", 48);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_div_9_Template, 2, 1, "div", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const op_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classProp("border-primary", (ctx_r1.opcionSeleccionada == null ? null : ctx_r1.opcionSeleccionada.id) === op_r8.id)("bg-light", op_r8.tipoOpcion === "NULO" || op_r8.tipoOpcion === "BLANCO");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", op_r8.tipoOpcion === "LISTA" && op_r8.numeroLista);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", op_r8.tipoOpcion === "CANDIDATO");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", op_r8.tipoOpcion === "LISTA" && !op_r8.numeroLista);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", op_r8.tipoOpcion === "NULO");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", op_r8.tipoOpcion === "BLANCO");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(op_r8.etiqueta);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", op_r8.partidoSigla);
  }
}
function MesaVotacionPapeletaComponent_div_0_div_18_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "h6", 3);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "span", 40);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 41);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 42);
    \u0275\u0275template(10, MesaVotacionPapeletaComponent_div_0_div_18_div_4_div_10_Template, 10, 11, "div", 43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("border-top", ctx_r1.papeletaActual.colorHex ? "4px solid " + ctx_r1.papeletaActual.colorHex : "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.papeletaActual.titulo);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.papeletaActual.tipoVotacion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.papeletaActual.tipoCircunscripcion);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.papeletaActual.opciones);
  }
}
function MesaVotacionPapeletaComponent_div_0_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "ul", 33);
    \u0275\u0275template(3, MesaVotacionPapeletaComponent_div_0_div_18_li_3_Template, 3, 3, "li", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, MesaVotacionPapeletaComponent_div_0_div_18_div_4_Template, 11, 6, "div", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.papeletas);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.papeletaActual);
  }
}
function MesaVotacionPapeletaComponent_div_0_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 57)(2, "span", 58);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionPapeletaComponent_div_0_div_19_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.cantidadInput, $event) || (ctx_r1.cantidadInput = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 60);
    \u0275\u0275listener("click", function MesaVotacionPapeletaComponent_div_0_div_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.registrarVoto());
    });
    \u0275\u0275element(6, "i", 61);
    \u0275\u0275text(7, " Registrar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 8);
    \u0275\u0275listener("click", function MesaVotacionPapeletaComponent_div_0_div_19_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.opcionSeleccionada = null;
      return \u0275\u0275resetView(ctx_r1.cantidadInput = 0);
    });
    \u0275\u0275text(9, "Cancelar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Votos para: ", ctx_r1.opcionSeleccionada.etiqueta, "");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.cantidadInput);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.cantidadInput <= 0);
  }
}
function MesaVotacionPapeletaComponent_div_0_tr_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 62);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 63);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r10 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r10.opcionEtiqueta);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r10.papeletaTitulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r10.cantidadVotos);
  }
}
function MesaVotacionPapeletaComponent_div_0_tr_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 64);
    \u0275\u0275text(2, "Sin votos registrados");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionPapeletaComponent_div_0_div_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 65)(1, "button", 66);
    \u0275\u0275listener("click", function MesaVotacionPapeletaComponent_div_0_div_39_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cerrarMesa());
    });
    \u0275\u0275element(2, "i", 67);
    \u0275\u0275text(3, " Cerrar Mesa ");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionPapeletaComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h4", 3);
    \u0275\u0275element(4, "i", 4);
    \u0275\u0275text(5, " Votaci\xF3n por Papeletas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 5);
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "span", 6);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 7)(11, "button", 8);
    \u0275\u0275listener("click", function MesaVotacionPapeletaComponent_div_0_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275element(12, "i", 9);
    \u0275\u0275text(13, " Salir ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(14, MesaVotacionPapeletaComponent_div_0_div_14_Template, 3, 0, "div", 10)(15, MesaVotacionPapeletaComponent_div_0_div_15_Template, 3, 1, "div", 11);
    \u0275\u0275elementStart(16, "div", 12)(17, "div", 13);
    \u0275\u0275template(18, MesaVotacionPapeletaComponent_div_0_div_18_Template, 5, 2, "div", 14)(19, MesaVotacionPapeletaComponent_div_0_div_19_Template, 10, 3, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 16)(21, "div", 17)(22, "div", 18)(23, "span")(24, "strong");
    \u0275\u0275text(25, "Votos Registrados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "span", 19);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 20)(29, "table", 21)(30, "thead")(31, "tr")(32, "th");
    \u0275\u0275text(33, "Opci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "th");
    \u0275\u0275text(35, "Votos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "tbody");
    \u0275\u0275template(37, MesaVotacionPapeletaComponent_div_0_tr_37_Template, 8, 3, "tr", 22)(38, MesaVotacionPapeletaComponent_div_0_tr_38_Template, 3, 0, "tr", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(39, MesaVotacionPapeletaComponent_div_0_div_39_Template, 4, 0, "div", 24);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2(" Mesa ", ctx_r1.mesaActual.numeroMesa, " - ", ctx_r1.mesaActual.institucionNombre || ctx_r1.mesaActual.institucion, " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-success", !ctx_r1.cerrada)("bg-danger", ctx_r1.cerrada);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.cerrada ? "Cerrada" : "Abierta", " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.cerrada);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.mesasDisponibles.length > 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.papeletas.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.opcionSeleccionada && !ctx_r1.cerrada);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r1.totalVotos, " total");
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r1.votosRegistrados);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.votosRegistrados.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.cerrada);
  }
}
function MesaVotacionPapeletaComponent_div_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "button", 71);
    \u0275\u0275listener("click", function MesaVotacionPapeletaComponent_div_1_div_5_Template_button_click_1_listener() {
      const m_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.seleccionarMesa(m_r13));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Mesa ", m_r13.numeroMesa, "");
  }
}
function MesaVotacionPapeletaComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "h4");
    \u0275\u0275element(2, "i", 4);
    \u0275\u0275text(3, " Votaci\xF3n por Papeletas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 68);
    \u0275\u0275template(5, MesaVotacionPapeletaComponent_div_1_div_5_Template, 3, 1, "div", 69);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.mesasDisponibles);
  }
}
function MesaVotacionPapeletaComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 72);
    \u0275\u0275text(2, "No tiene mesas asignadas para votaci\xF3n por papeletas.");
    \u0275\u0275elementEnd()();
  }
}
var MesaVotacionPapeletaComponent = class _MesaVotacionPapeletaComponent {
  constructor(api, auth, ws, router) {
    this.api = api;
    this.auth = auth;
    this.ws = ws;
    this.router = router;
    this.elecciones = [];
    this.mesaActual = null;
    this.mesasDisponibles = [];
    this.papeletas = [];
    this.papeletaActual = null;
    this.opcionSeleccionada = null;
    this.cantidadInput = 0;
    this.votosRegistrados = [];
    this.totalVotos = 0;
    this.cerrada = false;
  }
  ngOnInit() {
    this.api.getEleccionesActivas().subscribe((data) => {
      this.elecciones = data;
      if (this.elecciones.length > 0)
        this.loadMesas();
    });
  }
  ngOnDestroy() {
    if (this.wsSub)
      this.wsSub.unsubscribe();
  }
  loadMesas() {
    this.api.getMesasByCurrentUser(this.elecciones[0]?.id).subscribe((data) => {
      this.mesasDisponibles = data;
      if (this.mesasDisponibles.length === 1) {
        this.seleccionarMesa(this.mesasDisponibles[0]);
      }
    });
  }
  seleccionarMesa(mesa) {
    this.mesaActual = mesa;
    this.cerrada = mesa.cerrada;
    this.loadPapeletas();
    this.loadVotos();
    this.suscribirWS();
  }
  suscribirWS() {
    if (this.wsSub)
      this.wsSub.unsubscribe();
    const eleccionId = this.elecciones[0]?.id;
    if (!eleccionId)
      return;
    this.wsSub = this.ws.subscribeToMesaEstado(eleccionId).subscribe((msg) => {
      if (msg.mesaId === this.mesaActual?.id) {
        this.cerrada = msg.cerrada;
        if (this.mesaActual)
          this.mesaActual.cerrada = msg.cerrada;
      }
    });
  }
  loadPapeletas() {
    if (!this.mesaActual)
      return;
    this.api.getPapeletasByEleccion(this.mesaActual.eleccionesId || this.mesaActual.eleccionId).subscribe((data) => {
      this.papeletas = data;
      if (this.papeletas.length > 0)
        this.seleccionarPapeleta(this.papeletas[0]);
    });
  }
  seleccionarPapeleta(p) {
    this.papeletaActual = p;
    this.opcionSeleccionada = null;
    this.cantidadInput = 0;
  }
  loadVotos() {
    if (!this.mesaActual)
      return;
    this.api.getVotosPapeletaByMesa(this.mesaActual.id).subscribe((data) => {
      this.votosRegistrados = data.map((v) => ({
        opcionPapeletaId: v.opcionPapeletaId,
        papeletaTitulo: this.findPapeletaTitulo(v.opcionPapeletaId),
        opcionEtiqueta: v.opcionEtiqueta,
        cantidadVotos: v.cantidadVotos
      }));
      this.totalVotos = this.votosRegistrados.reduce((s, v) => s + v.cantidadVotos, 0);
    });
  }
  findPapeletaTitulo(opcionPapeletaId) {
    for (const p of this.papeletas) {
      if (p.opciones?.some((o) => o.id === opcionPapeletaId))
        return p.titulo;
    }
    return "";
  }
  seleccionarOpcion(op) {
    if (this.cerrada)
      return;
    this.opcionSeleccionada = op;
    this.cantidadInput = 0;
  }
  getOptionIcon(tipo) {
    switch (tipo) {
      case "CANDIDATO":
        return "bi-person-badge";
      case "PARTIDO":
        return "bi-people";
      case "LISTA":
        return "bi-list-ul";
      case "NULO":
        return "bi-x-circle";
      case "BLANCO":
        return "bi-square";
      default:
        return "bi-question-circle";
    }
  }
  registrarVoto() {
    if (!this.opcionSeleccionada || this.cantidadInput <= 0 || this.cerrada)
      return;
    const existing = this.votosRegistrados.find((v) => v.opcionPapeletaId === this.opcionSeleccionada.id);
    if (existing) {
      existing.cantidadVotos = this.cantidadInput;
    } else {
      this.votosRegistrados.push({
        opcionPapeletaId: this.opcionSeleccionada.id,
        papeletaTitulo: this.papeletaActual?.titulo || "",
        opcionEtiqueta: this.opcionSeleccionada.etiqueta,
        cantidadVotos: this.cantidadInput
      });
    }
    this.totalVotos = this.votosRegistrados.reduce((s, v) => s + v.cantidadVotos, 0);
    this.api.registrarVotoPapeleta({
      opcionPapeletaId: this.opcionSeleccionada.id,
      mesaId: this.mesaActual.id,
      cantidadVotos: this.cantidadInput
    }).subscribe();
    this.opcionSeleccionada = null;
    this.cantidadInput = 0;
  }
  cerrarMesa() {
    if (!this.mesaActual || this.cerrada)
      return;
    if (confirm("\xBFCerrar mesa? No podr\xE1 modificar los votos despu\xE9s.")) {
      this.api.cerrarMesa(this.mesaActual.id).subscribe(() => {
        this.cerrada = true;
        if (this.mesaActual)
          this.mesaActual.cerrada = true;
      });
    }
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  getPartidoSigla(op) {
    if (op.tipoOpcion === "LISTA")
      return "Lista " + (op.numeroLista || "");
    return op.partidoSigla || "";
  }
  static {
    this.\u0275fac = function MesaVotacionPapeletaComponent_Factory(t) {
      return new (t || _MesaVotacionPapeletaComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(WebSocketService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MesaVotacionPapeletaComponent, selectors: [["app-mesa-votacion-papeleta"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 3, consts: [["class", "container-fluid p-3", 4, "ngIf"], [1, "container-fluid", "p-3"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3", "flex-wrap", "gap-2"], [1, "mb-0"], [1, "bi", "bi-vote"], [1, "text-muted"], [1, "badge", "ms-2"], [1, "d-flex", "gap-2"], [1, "btn", "btn-outline-secondary", 3, "click"], [1, "bi", "bi-box-arrow-right"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "mb-3", 4, "ngIf"], [1, "row", "g-3"], [1, "col-md-8"], ["class", "card mb-3", 4, "ngIf"], ["class", "card", 4, "ngIf"], [1, "col-md-4"], [1, "card"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "badge", "bg-primary", "rounded-pill"], [1, "card-body", "p-0"], [1, "table", "table-sm", "mb-0"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "card-footer", 4, "ngIf"], [1, "alert", "alert-danger"], [1, "bi", "bi-lock-fill"], [1, "mb-3"], [1, "btn-group", "flex-wrap"], ["class", "btn btn-sm", 3, "btn-primary", "btn-outline-secondary", "click", 4, "ngFor", "ngForOf"], [1, "btn", "btn-sm", 3, "click"], [1, "card", "mb-3"], [1, "card-header", "p-0"], [1, "nav", "nav-tabs", "card-header-tabs"], ["class", "nav-item", 4, "ngFor", "ngForOf"], ["class", "card-body", 3, "border-top", 4, "ngIf"], [1, "nav-item"], [1, "nav-link", 3, "click"], [1, "card-body"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-2"], [1, "badge", "bg-info", "me-1"], [1, "badge", "bg-secondary"], [1, "row", "g-2"], ["class", "col-6 col-md-4 col-lg-3", 4, "ngFor", "ngForOf"], [1, "col-6", "col-md-4", "col-lg-3"], [1, "card", "h-100", "border", "cursor-pointer", "text-center", "p-2", 3, "click"], ["class", "fw-bold fs-4", 3, "color", 4, "ngIf"], ["class", "mb-1", 4, "ngIf"], [1, "small", "fw-bold", "text-truncate"], ["class", "small text-muted", 4, "ngIf"], [1, "fw-bold", "fs-4"], [1, "mb-1"], [1, "bi", "bi-person-badge", "fs-2", "text-primary"], [1, "bi", "bi-list-ul", "fs-2", "text-success"], [1, "bi", "bi-x-circle", "fs-2", "text-danger"], [1, "bi", "bi-square", "fs-2", "text-warning"], [1, "small", "text-muted"], [1, "card-body", "d-flex", "align-items-center", "gap-3", "flex-wrap"], [1, "fw-bold"], ["type", "number", "min", "0", 1, "form-control", "w-auto", 2, "max-width", "100px", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "bi", "bi-check-circle"], [1, "small", "fw-bold"], [1, "text-center", "fw-bold"], ["colspan", "2", 1, "text-center", "text-muted"], [1, "card-footer"], [1, "btn", "btn-danger", "w-100", 3, "click"], [1, "bi", "bi-lock"], [1, "row", "g-2", "mt-2"], ["class", "col-auto", 4, "ngFor", "ngForOf"], [1, "col-auto"], [1, "btn", "btn-outline-primary", "btn-lg", 3, "click"], [1, "alert", "alert-info"]], template: function MesaVotacionPapeletaComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MesaVotacionPapeletaComponent_div_0_Template, 40, 15, "div", 0)(1, MesaVotacionPapeletaComponent_div_1_Template, 6, 1, "div", 0)(2, MesaVotacionPapeletaComponent_div_2_Template, 3, 0, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.mesaActual);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.mesaActual && ctx.mesasDisponibles.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesasDisponibles.length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ["\n\n.cursor-pointer[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.cursor-pointer[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, .12);\n}\n.nav-tabs[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  font-size: .85rem;\n  padding: .4rem .8rem;\n}\n/*# sourceMappingURL=mesa-votacion-papeleta.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MesaVotacionPapeletaComponent, { className: "MesaVotacionPapeletaComponent", filePath: "app\\features\\mesa\\mesa-votacion-papeleta\\mesa-votacion-papeleta.component.ts", lineNumber: 24 });
})();
export {
  MesaVotacionPapeletaComponent
};
//# sourceMappingURL=chunk-PA63SRJX.js.map
