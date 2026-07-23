import "./chunk-S2GG3DE6.js";
import "./chunk-7OWRCG7O.js";
import "./chunk-LG7Z2WBF.js";
import "./chunk-KZU2HTPH.js";
import {
  DefaultValueAccessor,
  FormsModule,
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
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3DSQS3EE.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/escrutinio/escrutinio.component.ts
function EscrutinioComponent_option_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r1 = ctx.$implicit;
    \u0275\u0275property("value", e_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r1.nombre);
  }
}
function EscrutinioComponent_div_16_tr_21_select_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 30);
    \u0275\u0275listener("change", function EscrutinioComponent_div_16_tr_21_select_16_Template_select_change_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const r_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateReconteoEstado(r_r5.id, $event.target.value));
    });
    \u0275\u0275elementStart(1, "option", 31);
    \u0275\u0275text(2, "Cambiar estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "option", 32);
    \u0275\u0275text(4, "Iniciar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 33);
    \u0275\u0275text(6, "Completar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 34);
    \u0275\u0275text(8, "Rechazar");
    \u0275\u0275elementEnd()();
  }
}
function EscrutinioComponent_div_16_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "small", 27);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "span", 28);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275template(16, EscrutinioComponent_div_16_tr_21_select_16_Template, 9, 0, "select", 29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r5.mesaNumero);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r5.institucionNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r5.motivo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r5.solicitadoPor);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getBadgeClass(r_r5.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r5.estado);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r5.resultado || "-");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", r_r5.estado === "PENDIENTE" || r_r5.estado === "EN_PROCESO");
  }
}
function EscrutinioComponent_div_16_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 35);
    \u0275\u0275text(2, "Sin reconteos");
    \u0275\u0275elementEnd()();
  }
}
function EscrutinioComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 22)(2, "button", 23);
    \u0275\u0275listener("click", function EscrutinioComponent_div_16_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openReconteo());
    });
    \u0275\u0275text(3, "+ Solicitar Reconteo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 24)(5, "table", 25)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Motivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Solicitante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Resultado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275template(21, EscrutinioComponent_div_16_tr_21_Template, 17, 9, "tr", 26)(22, EscrutinioComponent_div_16_tr_22_Template, 3, 0, "tr", 10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r2.reconteos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.reconteos.length === 0);
  }
}
function EscrutinioComponent_div_17_tr_21_select_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 30);
    \u0275\u0275listener("change", function EscrutinioComponent_div_17_tr_21_select_14_Template_select_change_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const i_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateImpugnacionEstado(i_r8.id, $event.target.value));
    });
    \u0275\u0275elementStart(1, "option", 31);
    \u0275\u0275text(2, "Cambiar estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "option", 37);
    \u0275\u0275text(4, "En revisi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 38);
    \u0275\u0275text(6, "Aprobar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 39);
    \u0275\u0275text(8, "Rechazar");
    \u0275\u0275elementEnd()();
  }
}
function EscrutinioComponent_div_17_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "span", 28);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275template(14, EscrutinioComponent_div_17_tr_21_select_14_Template, 9, 0, "select", 29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r8.mesaNumero || "-");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r8.tipo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r8.descripcion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r8.solicitante);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getBadgeClass(i_r8.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r8.estado);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", i_r8.estado === "PENDIENTE" || i_r8.estado === "EN_REVISION");
  }
}
function EscrutinioComponent_div_17_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 35);
    \u0275\u0275text(2, "Sin impugnaciones");
    \u0275\u0275elementEnd()();
  }
}
function EscrutinioComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 22)(2, "button", 23);
    \u0275\u0275listener("click", function EscrutinioComponent_div_17_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openImpugnacion());
    });
    \u0275\u0275text(3, "+ Nueva Impugnaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 24)(5, "table", 25)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Solicitante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275template(21, EscrutinioComponent_div_17_tr_21_Template, 15, 8, "tr", 26)(22, EscrutinioComponent_div_17_tr_22_Template, 3, 0, "tr", 10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r2.impugnaciones);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.impugnaciones.length === 0);
  }
}
function EscrutinioComponent_div_18_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 28);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r10.mesaNumero || "-");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-warning", o_r10.tipo === "INCIDENCIA")("bg-info", o_r10.tipo === "OBSERVACION")("bg-success", o_r10.tipo === "SUGERENCIA");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r10.tipo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r10.descripcion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r10.usuarioNombre || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 11, o_r10.fecha, "short"));
  }
}
function EscrutinioComponent_div_18_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 40);
    \u0275\u0275text(2, "Sin observaciones");
    \u0275\u0275elementEnd()();
  }
}
function EscrutinioComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 22)(2, "button", 23);
    \u0275\u0275listener("click", function EscrutinioComponent_div_18_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openObservacion());
    });
    \u0275\u0275text(3, "+ Nueva Observaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 24)(5, "table", 25)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Fecha");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275template(19, EscrutinioComponent_div_18_tr_19_Template, 13, 14, "tr", 26)(20, EscrutinioComponent_div_18_tr_20_Template, 3, 0, "tr", 10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r2.observaciones);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.observaciones.length === 0);
  }
}
function EscrutinioComponent_div_19_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r12 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r12.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r12.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r12.resueltoPor);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r12.impugnacionDescripcion || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 5, r_r12.fechaResolucion, "short"));
  }
}
function EscrutinioComponent_div_19_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 40);
    \u0275\u0275text(2, "Sin resoluciones");
    \u0275\u0275elementEnd()();
  }
}
function EscrutinioComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 22)(2, "button", 23);
    \u0275\u0275listener("click", function EscrutinioComponent_div_19_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openResolucion());
    });
    \u0275\u0275text(3, "+ Nueva Resoluci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 24)(5, "table", 25)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "C\xF3digo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "T\xEDtulo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Resuelto por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Impugnaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Fecha");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275template(19, EscrutinioComponent_div_19_tr_19_Template, 13, 8, "tr", 26)(20, EscrutinioComponent_div_19_tr_20_Template, 3, 0, "tr", 10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r2.resoluciones);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.resoluciones.length === 0);
  }
}
function EscrutinioComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 41)(2, "label", 42);
    \u0275\u0275text(3, "Mesa ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_28_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.reconteoForm.mesaId, $event) || (ctx_r2.reconteoForm.mesaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 41)(6, "label", 42);
    \u0275\u0275text(7, "Motivo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 44);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_28_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.reconteoForm.motivo, $event) || (ctx_r2.reconteoForm.motivo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 41)(10, "label", 42);
    \u0275\u0275text(11, "Solicitante *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_28_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.reconteoForm.solicitadoPor, $event) || (ctx_r2.reconteoForm.solicitadoPor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.reconteoForm.mesaId);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.reconteoForm.motivo);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.reconteoForm.solicitadoPor);
  }
}
function EscrutinioComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 41)(2, "label", 42);
    \u0275\u0275text(3, "Mesa ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_29_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.impugnacionForm.mesaId, $event) || (ctx_r2.impugnacionForm.mesaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 41)(6, "label", 42);
    \u0275\u0275text(7, "Tipo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 46);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_29_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.impugnacionForm.tipo, $event) || (ctx_r2.impugnacionForm.tipo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 47);
    \u0275\u0275text(10, "Voto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 48);
    \u0275\u0275text(12, "Acta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 49);
    \u0275\u0275text(14, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 50);
    \u0275\u0275text(16, "Resultado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 51);
    \u0275\u0275text(18, "Candidato");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 41)(20, "label", 42);
    \u0275\u0275text(21, "Descripci\xF3n *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "textarea", 44);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_29_Template_textarea_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.impugnacionForm.descripcion, $event) || (ctx_r2.impugnacionForm.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 41)(24, "label", 42);
    \u0275\u0275text(25, "Solicitante *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_29_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.impugnacionForm.solicitante, $event) || (ctx_r2.impugnacionForm.solicitante = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.impugnacionForm.mesaId);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.impugnacionForm.tipo);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.impugnacionForm.descripcion);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.impugnacionForm.solicitante);
  }
}
function EscrutinioComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 41)(2, "label", 42);
    \u0275\u0275text(3, "Mesa ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_30_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.observacionForm.mesaId, $event) || (ctx_r2.observacionForm.mesaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 41)(6, "label", 42);
    \u0275\u0275text(7, "Tipo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 46);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_30_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.observacionForm.tipo, $event) || (ctx_r2.observacionForm.tipo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 52);
    \u0275\u0275text(10, "Observaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 53);
    \u0275\u0275text(12, "Incidencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 54);
    \u0275\u0275text(14, "Sugerencia");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 41)(16, "label", 42);
    \u0275\u0275text(17, "Descripci\xF3n *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "textarea", 44);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_30_Template_textarea_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.observacionForm.descripcion, $event) || (ctx_r2.observacionForm.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.observacionForm.mesaId);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.observacionForm.tipo);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.observacionForm.descripcion);
  }
}
function EscrutinioComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 41)(2, "label", 42);
    \u0275\u0275text(3, "C\xF3digo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_31_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.resolucionForm.codigo, $event) || (ctx_r2.resolucionForm.codigo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 41)(6, "label", 42);
    \u0275\u0275text(7, "T\xEDtulo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_31_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.resolucionForm.titulo, $event) || (ctx_r2.resolucionForm.titulo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 41)(10, "label", 42);
    \u0275\u0275text(11, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "textarea", 56);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_31_Template_textarea_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.resolucionForm.descripcion, $event) || (ctx_r2.resolucionForm.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 41)(14, "label", 42);
    \u0275\u0275text(15, "Impugnaci\xF3n ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_31_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.resolucionForm.impugnacionId, $event) || (ctx_r2.resolucionForm.impugnacionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 41)(18, "label", 42);
    \u0275\u0275text(19, "Resuelto por *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_31_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.resolucionForm.resueltoPor, $event) || (ctx_r2.resolucionForm.resueltoPor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 41)(22, "label", 42);
    \u0275\u0275text(23, "Detalle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "textarea", 44);
    \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_div_31_Template_textarea_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.resolucionForm.detalle, $event) || (ctx_r2.resolucionForm.detalle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.resolucionForm.codigo);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.resolucionForm.titulo);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.resolucionForm.descripcion);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.resolucionForm.impugnacionId);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.resolucionForm.resueltoPor);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.resolucionForm.detalle);
  }
}
function EscrutinioComponent_button_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function EscrutinioComponent_button_35_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveReconteo());
    });
    \u0275\u0275text(1, "Guardar");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r2.reconteoForm.motivo || !ctx_r2.reconteoForm.solicitadoPor);
  }
}
function EscrutinioComponent_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function EscrutinioComponent_button_36_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveImpugnacion());
    });
    \u0275\u0275text(1, "Guardar");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r2.impugnacionForm.descripcion || !ctx_r2.impugnacionForm.solicitante);
  }
}
function EscrutinioComponent_button_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function EscrutinioComponent_button_37_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveObservacion());
    });
    \u0275\u0275text(1, "Guardar");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r2.observacionForm.descripcion);
  }
}
function EscrutinioComponent_button_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function EscrutinioComponent_button_38_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveResolucion());
    });
    \u0275\u0275text(1, "Guardar");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r2.resolucionForm.codigo || !ctx_r2.resolucionForm.titulo || !ctx_r2.resolucionForm.resueltoPor);
  }
}
var EscrutinioComponent = class _EscrutinioComponent {
  constructor(api) {
    this.api = api;
    this.activeTab = "reconteos";
    this.elecciones = [];
    this.selectedEleccionId = 0;
    this.resumen = { reconteosPendientes: 0, impugnacionesPendientes: 0, totalObservaciones: 0, totalResoluciones: 0 };
    this.reconteos = [];
    this.impugnaciones = [];
    this.observaciones = [];
    this.resoluciones = [];
    this.showModal = false;
    this.modalType = "";
    this.editing = false;
    this.reconteoForm = {};
    this.impugnacionForm = {};
    this.observacionForm = {};
    this.resolucionForm = {};
  }
  ngOnInit() {
    this.api.getElecciones().subscribe((data) => {
      this.elecciones = data;
      if (data.length > 0) {
        this.selectedEleccionId = data[0].id;
        this.loadData();
      }
    });
  }
  loadData() {
    this.api.getEscrutinioResumen().subscribe((r) => this.resumen = r);
    if (this.selectedEleccionId) {
      this.api.getReconteos(this.selectedEleccionId).subscribe((r) => this.reconteos = r);
      this.api.getImpugnaciones(this.selectedEleccionId).subscribe((r) => this.impugnaciones = r);
      this.api.getObservaciones(this.selectedEleccionId).subscribe((r) => this.observaciones = r);
    }
    this.api.getResoluciones().subscribe((r) => this.resoluciones = r);
  }
  openReconteo() {
    this.modalType = "reconteo";
    this.reconteoForm = { mesaId: void 0, motivo: "", solicitadoPor: "" };
    this.showModal = true;
  }
  openImpugnacion() {
    this.modalType = "impugnacion";
    this.impugnacionForm = { tipo: "VOTO", descripcion: "", solicitante: "" };
    this.showModal = true;
  }
  openObservacion() {
    this.modalType = "observacion";
    this.observacionForm = { tipo: "OBSERVACION", descripcion: "" };
    this.showModal = true;
  }
  openResolucion() {
    this.modalType = "resolucion";
    this.resolucionForm = { codigo: "", titulo: "", resueltoPor: "", detalle: "" };
    this.showModal = true;
  }
  saveReconteo() {
    if (!this.reconteoForm.motivo || !this.reconteoForm.solicitadoPor)
      return;
    this.api.createReconteo(this.reconteoForm).subscribe(() => {
      this.showModal = false;
      this.loadData();
    });
  }
  saveImpugnacion() {
    if (!this.impugnacionForm.descripcion || !this.impugnacionForm.solicitante)
      return;
    this.api.createImpugnacion(this.impugnacionForm).subscribe(() => {
      this.showModal = false;
      this.loadData();
    });
  }
  saveObservacion() {
    if (!this.observacionForm.descripcion)
      return;
    this.api.createObservacion(this.observacionForm).subscribe(() => {
      this.showModal = false;
      this.loadData();
    });
  }
  saveResolucion() {
    if (!this.resolucionForm.codigo || !this.resolucionForm.titulo || !this.resolucionForm.resueltoPor)
      return;
    this.api.createResolucion(this.resolucionForm).subscribe(() => {
      this.showModal = false;
      this.loadData();
    });
  }
  updateReconteoEstado(id, estado) {
    this.api.updateReconteoEstado(id, estado).subscribe(() => this.loadData());
  }
  updateImpugnacionEstado(id, estado) {
    this.api.updateImpugnacionEstado(id, estado).subscribe(() => this.loadData());
  }
  getBadgeClass(estado) {
    const map = {
      "PENDIENTE": "bg-warning",
      "EN_PROCESO": "bg-info",
      "EN_REVISION": "bg-info",
      "COMPLETADO": "bg-success",
      "APROBADA": "bg-success",
      "RECHAZADO": "bg-danger",
      "RECHAZADA": "bg-danger"
    };
    return map[estado] || "bg-secondary";
  }
  static {
    this.\u0275fac = function EscrutinioComponent_Factory(t) {
      return new (t || _EscrutinioComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EscrutinioComponent, selectors: [["app-escrutinio"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 39, vars: 27, consts: [[1, "page-container"], [1, "page-header"], [1, "d-flex", "gap-2"], [1, "form-select", "w-auto", 3, "ngModelChange", "ngModel"], ["value", "reconteos"], ["value", "impugnaciones"], ["value", "observaciones"], ["value", "resoluciones"], [1, "form-select", "w-auto", 3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "modal"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], ["class", "btn btn-primary", 3, "disabled", "click", 4, "ngIf"], [3, "value"], [1, "mb-2"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "table-container"], [1, "table"], [4, "ngFor", "ngForOf"], [1, "text-muted"], [1, "badge"], ["class", "form-select form-select-sm", 3, "change", 4, "ngIf"], [1, "form-select", "form-select-sm", 3, "change"], ["value", ""], ["value", "EN_PROCESO"], ["value", "COMPLETADO"], ["value", "RECHAZADO"], ["colspan", "6", 1, "text-center", "text-muted"], [1, "badge", "bg-secondary"], ["value", "EN_REVISION"], ["value", "APROBADA"], ["value", "RECHAZADA"], ["colspan", "5", 1, "text-center", "text-muted"], [1, "mb-3"], [1, "form-label"], ["type", "number", 1, "form-control", 3, "ngModelChange", "ngModel"], ["rows", "3", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "VOTO"], ["value", "ACTA"], ["value", "MESA"], ["value", "RESULTADO"], ["value", "CANDIDATO"], ["value", "OBSERVACION"], ["value", "INCIDENCIA"], ["value", "SUGERENCIA"], ["placeholder", "Ej: RES-001", 1, "form-control", 3, "ngModelChange", "ngModel"], ["rows", "2", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"]], template: function EscrutinioComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Escrutinio Avanzado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "select", 3);
        \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_Template_select_ngModelChange_5_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.activeTab, $event) || (ctx.activeTab = $event);
          return $event;
        });
        \u0275\u0275elementStart(6, "option", 4);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "option", 5);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "option", 6);
        \u0275\u0275text(11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "option", 7);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "select", 8);
        \u0275\u0275twoWayListener("ngModelChange", function EscrutinioComponent_Template_select_ngModelChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedEleccionId, $event) || (ctx.selectedEleccionId = $event);
          return $event;
        });
        \u0275\u0275listener("change", function EscrutinioComponent_Template_select_change_14_listener() {
          return ctx.loadData();
        });
        \u0275\u0275template(15, EscrutinioComponent_option_15_Template, 2, 2, "option", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(16, EscrutinioComponent_div_16_Template, 23, 2, "div", 10)(17, EscrutinioComponent_div_17_Template, 23, 2, "div", 10)(18, EscrutinioComponent_div_18_Template, 21, 2, "div", 10)(19, EscrutinioComponent_div_19_Template, 21, 2, "div", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 11)(21, "div", 12)(22, "div", 13)(23, "div", 14)(24, "h5", 15);
        \u0275\u0275text(25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "button", 16);
        \u0275\u0275listener("click", function EscrutinioComponent_Template_button_click_26_listener() {
          return ctx.showModal = false;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "div", 17);
        \u0275\u0275template(28, EscrutinioComponent_div_28_Template, 13, 3, "div", 10)(29, EscrutinioComponent_div_29_Template, 27, 4, "div", 10)(30, EscrutinioComponent_div_30_Template, 19, 3, "div", 10)(31, EscrutinioComponent_div_31_Template, 25, 6, "div", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 18)(33, "button", 19);
        \u0275\u0275listener("click", function EscrutinioComponent_Template_button_click_33_listener() {
          return ctx.showModal = false;
        });
        \u0275\u0275text(34, "Cancelar");
        \u0275\u0275elementEnd();
        \u0275\u0275template(35, EscrutinioComponent_button_35_Template, 2, 1, "button", 20)(36, EscrutinioComponent_button_36_Template, 2, 1, "button", 20)(37, EscrutinioComponent_button_37_Template, 2, 1, "button", 20)(38, EscrutinioComponent_button_38_Template, 2, 1, "button", 20);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.activeTab);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Reconteos (", ctx.resumen.reconteosPendientes, ")");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Impugnaciones (", ctx.resumen.impugnacionesPendientes, ")");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Observaciones (", ctx.resumen.totalObservaciones, ")");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Resoluciones (", ctx.resumen.totalResoluciones, ")");
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedEleccionId);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.elecciones);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeTab === "reconteos");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeTab === "impugnaciones");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeTab === "observaciones");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.activeTab === "resoluciones");
        \u0275\u0275advance();
        \u0275\u0275styleProp("display", ctx.showModal ? "block" : "none");
        \u0275\u0275classProp("show", ctx.showModal);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate4(" ", ctx.modalType === "reconteo" ? "Solicitar Reconteo" : "", " ", ctx.modalType === "impugnacion" ? "Nueva Impugnaci\xF3n" : "", " ", ctx.modalType === "observacion" ? "Nueva Observaci\xF3n" : "", " ", ctx.modalType === "resolucion" ? "Nueva Resoluci\xF3n" : "", " ");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.modalType === "reconteo");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.modalType === "impugnacion");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.modalType === "observacion");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.modalType === "resolucion");
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.modalType === "reconteo");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.modalType === "impugnacion");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.modalType === "observacion");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.modalType === "resolucion");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EscrutinioComponent, { className: "EscrutinioComponent", filePath: "app\\features\\admin\\pages\\escrutinio\\escrutinio.component.ts", lineNumber: 12 });
})();
export {
  EscrutinioComponent
};
//# sourceMappingURL=chunk-XY4OMNWF.js.map
