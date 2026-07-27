import {
  Chart,
  registerables
} from "./chunk-XDDFTBN2.js";
import {
  WebSocketService
} from "./chunk-JULW7IX5.js";
import "./chunk-5FM4GU5C.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-QIV2LCV4.js";
import {
  ApiService
} from "./chunk-YQH7J67P.js";
import {
  CommonModule,
  DecimalPipe,
  NgForOf,
  NgIf,
  catchError,
  of,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
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
} from "./chunk-MCJ4XKPH.js";
import "./chunk-H4MYKVU2.js";

// src/app/features/admin/pages/reportes/reportes.component.ts
var _c0 = ["barChart"];
var _c1 = ["pieChart"];
function ReportesComponent_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r2 = ctx.$implicit;
    \u0275\u0275property("value", e_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r2.nombre);
  }
}
function ReportesComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1, "Cargando reportes...");
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.error);
  }
}
function ReportesComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "div", 20);
    \u0275\u0275text(3, "\u{1F5F3}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 21)(5, "span", 22);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 23);
    \u0275\u0275text(9, "Total Votos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 24);
    \u0275\u0275listener("click", function ReportesComponent_div_11_Template_div_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openMesasModal());
    });
    \u0275\u0275elementStart(11, "div", 25);
    \u0275\u0275text(12, "\u2705");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 21)(14, "span", 22);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 23);
    \u0275\u0275text(17, "Mesas Cerradas");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 19)(19, "div", 26);
    \u0275\u0275text(20, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 21)(22, "span", 22);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 23);
    \u0275\u0275text(25, "Participaci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 24);
    \u0275\u0275listener("click", function ReportesComponent_div_11_Template_div_click_26_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openCandidatosModal());
    });
    \u0275\u0275elementStart(27, "div", 27);
    \u0275\u0275text(28, "\u{1F464}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 21)(30, "span", 22);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 23);
    \u0275\u0275text(33, "Candidatos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 24);
    \u0275\u0275listener("click", function ReportesComponent_div_11_Template_div_click_34_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openPartidosModal());
    });
    \u0275\u0275elementStart(35, "div", 28);
    \u0275\u0275text(36, "\u{1F3AF}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 21)(38, "span", 22);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 23);
    \u0275\u0275text(41, "Partidos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "div", 24);
    \u0275\u0275listener("click", function ReportesComponent_div_11_Template_div_click_42_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openNulosModal());
    });
    \u0275\u0275elementStart(43, "div", 29);
    \u0275\u0275text(44, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 21)(46, "span", 22);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 23);
    \u0275\u0275text(49, "Nulos / Blanco");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 8, ctx_r2.resumen.totalVotos));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate2("", ctx_r2.resumen.mesasCerradas, " / ", ctx_r2.resumen.totalMesas, "");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r2.resumen.participacion, "%");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.resumen.totalCandidatos);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.resumen.totalPartidos);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate2("", ctx_r2.resumen.votosNulos, " / ", ctx_r2.resumen.votosBlanco, "");
  }
}
function ReportesComponent_div_19_tr_21_Template(rf, ctx) {
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
    \u0275\u0275elementStart(9, "td", 33);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 33);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "div", 34);
    \u0275\u0275element(16, "div", 35);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const i_r6 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.nombreCompleto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.partidoSigla ? c_r5.partidoSigla : c_r5.partido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.cargo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 8, c_r5.totalVotos));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", c_r5.porcentaje, "%");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r2.getMaxVotos() > 0 ? c_r5.totalVotos / ctx_r2.getMaxVotos() * 100 : 0, "%");
  }
}
function ReportesComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "h3");
    \u0275\u0275text(2, "Resultados por Candidato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 31)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Candidato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Cargo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "Barra");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275template(21, ReportesComponent_div_19_tr_21_Template, 17, 10, "tr", 32);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r2.candidatos);
  }
}
function ReportesComponent_div_20_tr_19_Template(rf, ctx) {
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
    \u0275\u0275elementStart(9, "td", 33);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 33);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    const i_r8 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r8 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r7.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r7.sigla);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r7.totalCandidatos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 6, p_r7.totalVotos));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", p_r7.porcentaje, "%");
  }
}
function ReportesComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "h3");
    \u0275\u0275text(2, "Resultados por Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 31)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Sigla");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Candidatos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "%");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275template(19, ReportesComponent_div_20_tr_19_Template, 14, 8, "tr", 32);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r2.partidos);
  }
}
function ReportesComponent_div_21_tr_21_Template(rf, ctx) {
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
    \u0275\u0275elementStart(9, "td", 33);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 33);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const l_r10 = ctx.$implicit;
    const i_r11 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r11 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r10.listaNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r10.numeroLista);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r10.partidoSigla || l_r10.partidoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 6, l_r10.totalVotos));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", l_r10.porcentaje, "%");
  }
}
function ReportesComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "h3");
    \u0275\u0275text(2, "Resultados por Lista");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 36);
    \u0275\u0275listener("click", function ReportesComponent_div_21_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openListasModal());
    });
    \u0275\u0275text(4, "Ver detalle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "table", 31)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Lista");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "N\xB0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "%");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275template(21, ReportesComponent_div_21_tr_21_Template, 14, 8, "tr", 32);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r2.listas);
  }
}
function ReportesComponent_div_22_div_8_table_1_tr_12_Template(rf, ctx) {
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
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r13 = ctx.$implicit;
    const i_r14 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r14 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r13.numero);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r13.institucionNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r13.sexo);
  }
}
function ReportesComponent_div_22_div_8_table_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 31)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Instituci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Sexo");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, ReportesComponent_div_22_div_8_table_1_tr_12_Template, 9, 4, "tr", 32);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r2.modalMesas);
  }
}
function ReportesComponent_div_22_div_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1, "No hay mesas cerradas");
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_div_22_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, ReportesComponent_div_22_div_8_table_1_Template, 13, 1, "table", 43)(2, ReportesComponent_div_22_div_8_div_2_Template, 2, 0, "div", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.modalMesas.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.modalMesas.length === 0);
  }
}
function ReportesComponent_div_22_div_9_table_1_tr_16_Template(rf, ctx) {
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
    \u0275\u0275elementStart(7, "td", 33);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 33);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 33);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r15 = ctx.$implicit;
    const i_r16 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r16 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r15.numero);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r15.institucionNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r15.votosNulos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r15.votosBlanco);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r15.votosNulos + m_r15.votosBlanco);
  }
}
function ReportesComponent_div_22_div_9_table_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 31)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Instituci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Nulos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Blanco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Total");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275template(16, ReportesComponent_div_22_div_9_table_1_tr_16_Template, 13, 6, "tr", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "tfoot")(18, "tr")(19, "td", 46)(20, "strong");
    \u0275\u0275text(21, "Total");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "td", 33)(23, "strong");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "td", 33)(26, "strong");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "td", 33)(29, "strong");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r2.modalMesas);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.totalNulos());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.totalBlanco());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.totalNulosBlanco());
  }
}
function ReportesComponent_div_22_div_9_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1, "No hay mesas con votos nulos o blancos");
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_div_22_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, ReportesComponent_div_22_div_9_table_1_Template, 31, 4, "table", 43)(2, ReportesComponent_div_22_div_9_div_2_Template, 2, 0, "div", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.modalMesas.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.modalMesas.length === 0);
  }
}
function ReportesComponent_div_22_div_10_tr_18_Template(rf, ctx) {
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
    \u0275\u0275elementStart(9, "td", 33);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 33);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r17 = ctx.$implicit;
    const i_r18 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r18 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r17.nombreCompleto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r17.partidoSigla || c_r17.partido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r17.cargo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r17.totalVotos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", c_r17.porcentaje, "%");
  }
}
function ReportesComponent_div_22_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 47)(2, "table", 31)(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Candidato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Cargo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "%");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, ReportesComponent_div_22_div_10_tr_18_Template, 13, 6, "tr", 32);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r2.modalCandidatos);
  }
}
function ReportesComponent_div_22_div_11_tr_18_Template(rf, ctx) {
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
    \u0275\u0275elementStart(9, "td", 33);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 33);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r19 = ctx.$implicit;
    const i_r20 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r20 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r19.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r19.sigla);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r19.totalCandidatos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r19.totalVotos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", p_r19.porcentaje, "%");
  }
}
function ReportesComponent_div_22_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 47)(2, "table", 31)(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Sigla");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Candidatos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "%");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, ReportesComponent_div_22_div_11_tr_18_Template, 13, 6, "tr", 32);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r2.modalPartidos);
  }
}
function ReportesComponent_div_22_div_12_tr_20_Template(rf, ctx) {
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
    \u0275\u0275elementStart(11, "td", 33);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 33);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const l_r21 = ctx.$implicit;
    const i_r22 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r22 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r21.listaNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r21.numeroLista);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r21.partidoSigla || l_r21.partidoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r21.cargoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r21.totalVotos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", l_r21.porcentaje, "%");
  }
}
function ReportesComponent_div_22_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 47)(2, "table", 31)(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Lista");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "N\xB0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Cargo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "%");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275template(20, ReportesComponent_div_22_div_12_tr_20_Template, 15, 7, "tr", 32);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(20);
    \u0275\u0275property("ngForOf", ctx_r2.modalListas);
  }
}
function ReportesComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275listener("click", function ReportesComponent_div_22_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 38);
    \u0275\u0275listener("click", function ReportesComponent_div_22_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 39)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 40);
    \u0275\u0275listener("click", function ReportesComponent_div_22_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 41);
    \u0275\u0275template(8, ReportesComponent_div_22_div_8_Template, 3, 2, "div", 42)(9, ReportesComponent_div_22_div_9_Template, 3, 2, "div", 42)(10, ReportesComponent_div_22_div_10_Template, 19, 1, "div", 42)(11, ReportesComponent_div_22_div_11_Template, 19, 1, "div", 42)(12, ReportesComponent_div_22_div_12_Template, 21, 1, "div", 42);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.modalTitle);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r2.modalType === "mesas");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.modalType === "nulos");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.modalType === "candidatos");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.modalType === "partidos");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.modalType === "listas");
  }
}
Chart.register(...registerables);
var ReportesComponent = class _ReportesComponent {
  constructor(api, wsService) {
    this.api = api;
    this.wsService = wsService;
    this.elecciones = [];
    this.selectedEleccionId = null;
    this.resumen = null;
    this.candidatos = [];
    this.partidos = [];
    this.listas = [];
    this.loading = false;
    this.error = "";
    this.modalTitle = "";
    this.modalVisible = false;
    this.modalMesas = [];
    this.modalCandidatos = [];
    this.modalPartidos = [];
    this.modalListas = [];
    this.modalType = "";
  }
  openMesasModal() {
    this.modalType = "mesas";
    this.modalTitle = "Mesas Cerradas";
    this.modalMesas = [];
    this.modalVisible = true;
    this.api.getMesasByEleccion(this.selectedEleccionId).subscribe({
      next: (res) => this.modalMesas = res.filter((m) => m.cerrada)
    });
  }
  openCandidatosModal() {
    this.modalType = "candidatos";
    this.modalTitle = "Candidatos";
    this.modalCandidatos = [...this.candidatos];
    this.modalVisible = true;
  }
  openPartidosModal() {
    this.modalType = "partidos";
    this.modalTitle = "Partidos";
    this.modalPartidos = [...this.partidos];
    this.modalVisible = true;
  }
  openListasModal() {
    this.modalType = "listas";
    this.modalTitle = "Resultados por Lista";
    this.modalListas = [...this.listas];
    this.modalVisible = true;
  }
  openNulosModal() {
    this.modalType = "nulos";
    this.modalTitle = "Votos Nulos y Blancos por Mesa";
    this.modalMesas = [];
    this.modalVisible = true;
    this.api.getMesasByEleccion(this.selectedEleccionId).subscribe({
      next: (res) => this.modalMesas = res.filter((m) => m.votosNulos > 0 || m.votosBlanco > 0)
    });
  }
  closeModal() {
    this.modalVisible = false;
    this.modalType = "";
  }
  ngOnInit() {
    this.cargarElecciones();
    this.startAutoRefresh();
  }
  startAutoRefresh() {
    this.stopAutoRefresh();
    this.autoRefreshTimer = setInterval(() => {
      if (this.selectedEleccionId) {
        this.cargarReportes();
      }
    }, 3e4);
  }
  stopAutoRefresh() {
    if (this.autoRefreshTimer) {
      clearInterval(this.autoRefreshTimer);
      this.autoRefreshTimer = void 0;
    }
  }
  ngAfterViewInit() {
    setTimeout(() => this.initCharts(), 300);
  }
  cargarElecciones() {
    this.api.getEleccionesActivas().subscribe({
      next: (res) => {
        this.elecciones = res;
        if (this.elecciones.length > 0) {
          this.selectedEleccionId = this.elecciones[0].id;
          this.cargarReportes();
          this.subscribeToUpdates();
        }
      },
      error: () => this.error = "Error al cargar elecciones"
    });
  }
  cargarReportes() {
    if (!this.selectedEleccionId)
      return;
    this.loading = true;
    this.error = "";
    this.api.getReporteResumen(this.selectedEleccionId).subscribe({
      next: (r) => this.resumen = r,
      error: () => {
      }
    });
    this.api.getReporteCandidatos(this.selectedEleccionId).subscribe({
      next: (r) => {
        this.candidatos = r;
        this.updateCharts();
      },
      error: () => {
      }
    });
    this.api.getReportePartidos(this.selectedEleccionId).subscribe({
      next: (r) => this.partidos = r,
      error: () => {
      }
    });
    this.api.getReporteListas(this.selectedEleccionId).subscribe({
      next: (r) => this.listas = r,
      error: () => {
      },
      complete: () => this.loading = false
    });
  }
  subscribeToUpdates() {
    this.wsSubscription?.unsubscribe();
    if (!this.selectedEleccionId)
      return;
    const subscribe = () => {
      this.wsSubscription = this.wsService.subscribeToResultados(this.selectedEleccionId).pipe(catchError((err) => {
        console.warn("WebSocket error, retrying in 10s:", err);
        setTimeout(subscribe, 1e4);
        return of(null);
      })).subscribe(() => {
        this.cargarReportes();
      });
    };
    subscribe();
  }
  ngOnDestroy() {
    this.wsSubscription?.unsubscribe();
    this.stopAutoRefresh();
  }
  exportarCsv() {
    if (!this.selectedEleccionId)
      return;
    this.api.exportarReporteCsv(this.selectedEleccionId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `reporte-votos-${this.selectedEleccionId}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => this.error = "Error al exportar CSV"
    });
  }
  initCharts() {
    if (this.barChartRef?.nativeElement && !this.barChart) {
      this.barChart = new Chart(this.barChartRef.nativeElement, {
        type: "bar",
        data: { labels: [], datasets: [] },
        options: {
          responsive: true,
          plugins: { legend: { display: false }, title: { display: true, text: "Votos por Candidato" } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
    if (this.pieChartRef?.nativeElement && !this.pieChart) {
      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: "pie",
        data: { labels: [], datasets: [] },
        options: {
          responsive: true,
          plugins: { legend: { position: "right" }, title: { display: true, text: "Distribuci\xF3n de Votos" } }
        }
      });
    }
  }
  updateCharts() {
    if (!this.barChart && !this.pieChart)
      this.initCharts();
    const top10 = this.candidatos.slice(0, 10);
    const labels = top10.map((c) => c.nombreCompleto);
    const data = top10.map((c) => c.totalVotos);
    const colors = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316", "#6366F1", "#84CC16"];
    if (this.barChart) {
      this.barChart.data.labels = labels;
      this.barChart.data.datasets = [{
        label: "Votos",
        data,
        backgroundColor: colors.slice(0, data.length),
        borderRadius: 6
      }];
      this.barChart.update("none");
    }
    if (this.pieChart) {
      this.pieChart.data.labels = labels;
      this.pieChart.data.datasets = [{
        data,
        backgroundColor: colors.slice(0, data.length)
      }];
      this.pieChart.update("none");
    }
  }
  getMaxVotos() {
    if (this.candidatos.length === 0)
      return 0;
    return Math.max(...this.candidatos.map((c) => c.totalVotos));
  }
  totalNulos() {
    return this.modalMesas.reduce((s, m) => s + m.votosNulos, 0);
  }
  totalBlanco() {
    return this.modalMesas.reduce((s, m) => s + m.votosBlanco, 0);
  }
  totalNulosBlanco() {
    return this.modalMesas.reduce((s, m) => s + m.votosNulos + m.votosBlanco, 0);
  }
  static {
    this.\u0275fac = function ReportesComponent_Factory(t) {
      return new (t || _ReportesComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(WebSocketService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportesComponent, selectors: [["app-reportes"]], viewQuery: function ReportesComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.barChartRef = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.pieChartRef = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 10, consts: [["barChart", ""], ["pieChart", ""], [1, "reportes-container"], [1, "page-header"], [1, "header-controls"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "btn", "btn-success", 3, "click", "disabled"], ["class", "loading", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], ["class", "resumen-grid", 4, "ngIf"], [1, "charts-row"], [1, "chart-card"], ["class", "table-card", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [3, "value"], [1, "loading"], [1, "alert", "alert-error"], [1, "resumen-grid"], [1, "resumen-card"], [1, "card-icon", "votos"], [1, "card-body"], [1, "card-value"], [1, "card-label"], [1, "resumen-card", "clickable", 3, "click"], [1, "card-icon", "cerradas"], [1, "card-icon", "participacion"], [1, "card-icon", "candidatos"], [1, "card-icon", "partidos"], [1, "card-icon", "nulos"], [1, "table-card"], [1, "table"], [4, "ngFor", "ngForOf"], [1, "text-right"], [1, "bar-container"], [1, "bar-fill"], [1, "btn", "btn-outline", "float-right", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [4, "ngIf"], ["class", "table", 4, "ngIf"], ["class", "empty-msg", 4, "ngIf"], [1, "empty-msg"], ["colspan", "3", 1, "text-right"], [1, "table-responsive"]], template: function ReportesComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1");
        \u0275\u0275text(3, "Reportes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 4)(5, "select", 5);
        \u0275\u0275twoWayListener("ngModelChange", function ReportesComponent_Template_select_ngModelChange_5_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.selectedEleccionId, $event) || (ctx.selectedEleccionId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function ReportesComponent_Template_select_change_5_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.cargarReportes());
        });
        \u0275\u0275template(6, ReportesComponent_option_6_Template, 2, 2, "option", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 7);
        \u0275\u0275listener("click", function ReportesComponent_Template_button_click_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.exportarCsv());
        });
        \u0275\u0275text(8, " Exportar CSV ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(9, ReportesComponent_div_9_Template, 2, 0, "div", 8)(10, ReportesComponent_div_10_Template, 2, 1, "div", 9)(11, ReportesComponent_div_11_Template, 50, 10, "div", 10);
        \u0275\u0275elementStart(12, "div", 11)(13, "div", 12);
        \u0275\u0275element(14, "canvas", null, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 12);
        \u0275\u0275element(17, "canvas", null, 1);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(19, ReportesComponent_div_19_Template, 22, 1, "div", 13)(20, ReportesComponent_div_20_Template, 20, 1, "div", 13)(21, ReportesComponent_div_21_Template, 22, 1, "div", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275template(22, ReportesComponent_div_22_Template, 13, 6, "div", 14);
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedEleccionId);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.elecciones);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", !ctx.selectedEleccionId);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.resumen);
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.candidatos.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.partidos.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.listas.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.modalVisible);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.reportes-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 700;\n  color: #1e293b;\n}\n.header-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.form-select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14px;\n  background: white;\n  min-width: 200px;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  border: none;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-success[_ngcontent-%COMP%] {\n  background: #10b981;\n  color: white;\n}\n.btn-success[_ngcontent-%COMP%]:hover {\n  background: #059669;\n}\n.btn-success[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #64748b;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.resumen-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.resumen-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 56px;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 12px;\n}\n.card-icon.votos[_ngcontent-%COMP%] {\n  background: #eef2ff;\n}\n.card-icon.cerradas[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n}\n.card-icon.participacion[_ngcontent-%COMP%] {\n  background: #fffbeb;\n}\n.card-icon.candidatos[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n}\n.card-icon.partidos[_ngcontent-%COMP%] {\n  background: #fdf2f8;\n}\n.card-icon.nulos[_ngcontent-%COMP%] {\n  background: #fef2f2;\n}\n.card-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.card-value[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #1e293b;\n}\n.card-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #64748b;\n  margin-top: 2px;\n}\n.charts-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.chart-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.chart-card[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n  width: 100% !important;\n  max-height: 350px;\n}\n.table-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  margin-bottom: 24px;\n}\n.table-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: 18px;\n  color: #1e293b;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 12px 8px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 2px solid #e2e8f0;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 8px;\n  font-size: 14px;\n  color: #334155;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #f8fafc;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.bar-container[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 8px;\n  background: #e2e8f0;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #4F46E5,\n      #818CF8);\n  border-radius: 4px;\n  transition: width 0.5s ease;\n}\n.resumen-card.clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: transform 0.15s, box-shadow 0.15s;\n}\n.resumen-card.clickable[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);\n}\n.empty-msg[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px 16px;\n  color: #94a3b8;\n  font-size: 14px;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2000;\n  padding: 16px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  width: 100%;\n  max-width: 800px;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  overflow: hidden;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  color: #1e293b;\n}\n.modal-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: #f1f5f9;\n  border-radius: 8px;\n  font-size: 18px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #64748b;\n  transition: all 0.15s;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n  color: #1e293b;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px 24px 24px;\n  overflow-y: auto;\n}\n.modal-body[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.modal-body[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.modal-body[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-top: 2px solid #e2e8f0;\n  border-bottom: none;\n  font-size: 13px;\n}\n@media (max-width: 768px) {\n  .charts-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n    align-items: flex-start;\n  }\n  .header-controls[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n  }\n  .form-select[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .resumen-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    max-height: 90vh;\n  }\n  .modal-header[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n}"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportesComponent, { className: "ReportesComponent", filePath: "app\\features\\admin\\pages\\reportes\\reportes.component.ts", lineNumber: 20 });
})();
export {
  ReportesComponent
};
