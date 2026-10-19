import {
  Chart,
  registerables
} from "./chunk-RWZWOR5Y.js";
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
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-Y3MBZ57Z.js";
import {
  ApiService
} from "./chunk-ZGAD4T5T.js";
import {
  ChangeDetectorRef,
  CommonModule,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf,
  catchError,
  of,
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-SNDXQHAQ.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/dashboard/geo-group-table.component.ts
function GeoGroupTableComponent_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 2);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 2)(10, "span", 5);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r2 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r1.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 4, item_r1.votos));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(12, 6, item_r1.porcentaje, "1.1-1"), "%");
  }
}
function GeoGroupTableComponent_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 6);
    \u0275\u0275text(2, "Sin datos");
    \u0275\u0275elementEnd()();
  }
}
var GeoGroupTableComponent = class _GeoGroupTableComponent {
  constructor() {
    this.items = [];
    this.title = "";
  }
  static {
    this.\u0275fac = function GeoGroupTableComponent_Factory(t) {
      return new (t || _GeoGroupTableComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GeoGroupTableComponent, selectors: [["geo-group-table"]], inputs: { items: "items", title: "title" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 15, vars: 3, consts: [[1, "detalle-tabla-wrapper"], [1, "table", "table-striped"], [1, "text-right"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "porcentaje-badge"], ["colspan", "4", 1, "text-center", "py-3"]], template: function GeoGroupTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "table", 1)(2, "thead")(3, "tr")(4, "th");
        \u0275\u0275text(5, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "th");
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "th", 2);
        \u0275\u0275text(9, "Votos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "th", 2);
        \u0275\u0275text(11, "%");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "tbody");
        \u0275\u0275template(13, GeoGroupTableComponent_tr_13_Template, 13, 9, "tr", 3)(14, GeoGroupTableComponent_tr_14_Template, 3, 0, "tr", 4);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.title);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngForOf", ctx.items);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.items.length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GeoGroupTableComponent, { className: "GeoGroupTableComponent", filePath: "app\\features\\dashboard\\geo-group-table.component.ts", lineNumber: 35 });
})();

// src/app/features/dashboard/dashboard.component.ts
var _c0 = ["barChart"];
var _c1 = ["pieChart"];
var _c2 = ["partyPieChart"];
var _c3 = ["listPieChart"];
function DashboardComponent_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.ultimaActualizacion, " ");
  }
}
function DashboardComponent_option_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const z_r3 = ctx.$implicit;
    \u0275\u0275property("value", z_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(z_r3.nombre);
  }
}
function DashboardComponent_option_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    \u0275\u0275property("value", p_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.nombre);
  }
}
function DashboardComponent_option_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275property("value", c_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.nombre);
  }
}
function DashboardComponent_option_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    \u0275\u0275property("value", p_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r6.nombre);
  }
}
function DashboardComponent_option_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r7 = ctx.$implicit;
    \u0275\u0275property("value", i_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r7.nombre);
  }
}
function DashboardComponent_option_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    \u0275\u0275property("value", c_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r8.nombre);
  }
}
function DashboardComponent_option_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    \u0275\u0275property("value", p_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r9.nombre);
  }
}
function DashboardComponent_div_84_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r11 = ctx.$implicit;
    \u0275\u0275property("value", m_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Mesa ", m_r11.numero, " - ", m_r11.institucionNombre, "");
  }
}
function DashboardComponent_div_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "label");
    \u0275\u0275text(2, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 31);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_div_84_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.filtroMesaId, $event) || (ctx_r1.filtroMesaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function DashboardComponent_div_84_Template_select_change_3_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onMesaChange());
    });
    \u0275\u0275elementStart(4, "option", 32);
    \u0275\u0275text(5, "Todas");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DashboardComponent_div_84_option_6_Template, 2, 3, "option", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.filtroMesaId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.mesas);
  }
}
function DashboardComponent_div_85_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 57)(2, "div", 58);
    \u0275\u0275element(3, "i", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 60)(5, "span", 61);
    \u0275\u0275text(6, "Total Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 62);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 63);
    \u0275\u0275listener("click", function DashboardComponent_div_85_Template_div_click_10_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.verDetalleNulosBlanco("nulos"));
    });
    \u0275\u0275elementStart(11, "div", 58);
    \u0275\u0275element(12, "i", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 60)(14, "span", 61);
    \u0275\u0275text(15, "Votos Nulos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 62);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 65);
    \u0275\u0275listener("click", function DashboardComponent_div_85_Template_div_click_19_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.verDetalleNulosBlanco("blanco"));
    });
    \u0275\u0275elementStart(20, "div", 58);
    \u0275\u0275element(21, "i", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 60)(23, "span", 61);
    \u0275\u0275text(24, "Votos en Blanco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 62);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 67)(29, "div", 58);
    \u0275\u0275element(30, "i", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 60)(32, "span", 61);
    \u0275\u0275text(33, "Mesas Totales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 62);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 68);
    \u0275\u0275listener("click", function DashboardComponent_div_85_Template_div_click_36_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.verMesasCerradas());
    });
    \u0275\u0275elementStart(37, "div", 58);
    \u0275\u0275element(38, "i", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 60)(40, "span", 61);
    \u0275\u0275text(41, "Mesas Cerradas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 62);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 70);
    \u0275\u0275element(45, "div", 71);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 72)(47, "div", 58);
    \u0275\u0275element(48, "i", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 60)(50, "span", 61);
    \u0275\u0275text(51, "Progreso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "span", 62);
    \u0275\u0275text(53);
    \u0275\u0275pipe(54, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 70);
    \u0275\u0275element(56, "div", 74);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 10, ctx_r1.dashboard.totalVotos));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 12, ctx_r1.dashboard.totalVotosNulos));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(27, 14, ctx_r1.dashboard.totalVotosBlanco));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.dashboard.totalMesas);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.dashboard.mesasCerradas);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.dashboard.porcentajeMesasCerradas, "%");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(54, 16, ctx_r1.dashboard.porcentajeMesasCerradas, "1.1-1"), "%");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r1.dashboard.porcentajeMesasCerradas, "%");
  }
}
function DashboardComponent_div_114_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80)(1, "div", 81)(2, "span", 82);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 83);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 70);
    \u0275\u0275element(9, "div", 71);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r14 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r14.partido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(6, 5, p_r14.votos), " (", \u0275\u0275pipeBind2(7, 7, p_r14.porcentaje, "1.1-1"), "%)");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", p_r14.porcentaje, "%");
  }
}
function DashboardComponent_div_114_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "h3");
    \u0275\u0275element(3, "i", 75);
    \u0275\u0275text(4, " Resultados por Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 26)(6, "button", 28);
    \u0275\u0275listener("click", function DashboardComponent_div_114_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleMinimize("partyChart"));
    });
    \u0275\u0275element(7, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 40);
    \u0275\u0275listener("click", function DashboardComponent_div_114_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleFullscreen("partyChart"));
    });
    \u0275\u0275element(9, "i");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 41)(11, "div", 76)(12, "div", 77);
    \u0275\u0275element(13, "canvas", null, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 78);
    \u0275\u0275template(16, DashboardComponent_div_114_div_16_Template, 10, 10, "div", 79);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("minimized", ctx_r1.partyChartMinimized)("fullscreen", ctx_r1.partyChartFullscreen)("dimmed", ctx_r1.barChartFullscreen || ctx_r1.pieChartFullscreen || ctx_r1.listChartFullscreen || ctx_r1.resultadosFullscreen);
    \u0275\u0275advance(6);
    \u0275\u0275property("title", ctx_r1.partyChartMinimized ? "Expandir" : "Minimizar");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.partyChartMinimized ? "bi bi-plus" : "bi bi-dash");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.partyChartFullscreen ? "bi bi-fullscreen-exit" : "bi bi-arrows-angle-expand");
    \u0275\u0275advance();
    \u0275\u0275classProp("hidden", ctx_r1.partyChartMinimized);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.resultadosPorPartido);
  }
}
function DashboardComponent_div_115_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80)(1, "div", 81)(2, "span", 82);
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "small", 84);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 83);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 70);
    \u0275\u0275element(11, "div", 71);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const l_r16 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", l_r16.lista, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(N\xB0", l_r16.numero, ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(8, 6, l_r16.votos), " (", \u0275\u0275pipeBind2(9, 8, l_r16.porcentaje, "1.1-1"), "%)");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", l_r16.porcentaje, "%");
  }
}
function DashboardComponent_div_115_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "h3");
    \u0275\u0275element(3, "i", 46);
    \u0275\u0275text(4, " Resultados por Lista");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 26)(6, "button", 28);
    \u0275\u0275listener("click", function DashboardComponent_div_115_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleMinimize("listChart"));
    });
    \u0275\u0275element(7, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 40);
    \u0275\u0275listener("click", function DashboardComponent_div_115_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleFullscreen("listChart"));
    });
    \u0275\u0275element(9, "i");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 41)(11, "div", 76)(12, "div", 77);
    \u0275\u0275element(13, "canvas", null, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 78);
    \u0275\u0275template(16, DashboardComponent_div_115_div_16_Template, 12, 11, "div", 79);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("minimized", ctx_r1.listChartMinimized)("fullscreen", ctx_r1.listChartFullscreen)("dimmed", ctx_r1.barChartFullscreen || ctx_r1.pieChartFullscreen || ctx_r1.partyChartFullscreen || ctx_r1.resultadosFullscreen);
    \u0275\u0275advance(6);
    \u0275\u0275property("title", ctx_r1.listChartMinimized ? "Expandir" : "Minimizar");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.listChartMinimized ? "bi bi-plus" : "bi bi-dash");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.listChartFullscreen ? "bi bi-fullscreen-exit" : "bi bi-arrows-angle-expand");
    \u0275\u0275advance();
    \u0275\u0275classProp("hidden", ctx_r1.listChartMinimized);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.resultadosListasChart);
  }
}
function DashboardComponent_div_129_tr_28_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "i", 102);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const icon_r20 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", icon_r20);
  }
}
function DashboardComponent_div_129_tr_28_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r20 = \u0275\u0275nextContext();
    const r_r19 = ctx_r20.$implicit;
    const i_r22 = ctx_r20.index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate(ctx_r1.getRankLabel(r_r19, i_r22));
  }
}
function DashboardComponent_div_129_tr_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 94);
    \u0275\u0275listener("click", function DashboardComponent_div_129_tr_28_Template_tr_click_0_listener() {
      const r_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(r_r19.candidatoId > 0 && ctx_r1.verDetalleCandidato(r_r19.candidatoId));
    });
    \u0275\u0275elementStart(1, "td")(2, "div", 95)(3, "span", 96);
    \u0275\u0275template(4, DashboardComponent_div_129_tr_28_ng_container_4_Template, 2, 1, "ng-container", 97)(5, DashboardComponent_div_129_tr_28_ng_template_5_Template, 1, 1, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 98);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "td")(10, "span", 99);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 100)(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 100)(19, "span", 101);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r19 = ctx.$implicit;
    const i_r22 = ctx.index;
    const rankNumber_r23 = \u0275\u0275reference(6);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.getRowClass(r_r19));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getRankClass(r_r19));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getRankIcon(r_r19, i_r22))("ngIfElse", rankNumber_r23);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(r_r19.nombreCompleto);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r19.partidoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r19.cargoNombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 11, r_r19.totalVotos));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(21, 13, r_r19.porcentaje, "1.1-1"), "%");
  }
}
function DashboardComponent_div_129_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 103);
    \u0275\u0275text(2, "No hay candidatos individuales");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_129_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85)(1, "h4", 86);
    \u0275\u0275element(2, "i", 87);
    \u0275\u0275text(3, " Candidatos Individuales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "table", 88)(5, "thead")(6, "tr")(7, "th", 89);
    \u0275\u0275listener("click", function DashboardComponent_div_129_Template_th_click_7_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSortColumn("nombreCompleto"));
    });
    \u0275\u0275text(8, " Candidato ");
    \u0275\u0275elementStart(9, "span", 90);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "th", 89);
    \u0275\u0275listener("click", function DashboardComponent_div_129_Template_th_click_11_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSortColumn("partidoNombre"));
    });
    \u0275\u0275text(12, " Partido ");
    \u0275\u0275elementStart(13, "span", 90);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "th", 89);
    \u0275\u0275listener("click", function DashboardComponent_div_129_Template_th_click_15_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSortColumn("cargoNombre"));
    });
    \u0275\u0275text(16, " Cargo ");
    \u0275\u0275elementStart(17, "span", 90);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "th", 91);
    \u0275\u0275listener("click", function DashboardComponent_div_129_Template_th_click_19_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSortColumn("votos"));
    });
    \u0275\u0275text(20, " Votos ");
    \u0275\u0275elementStart(21, "span", 90);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "th", 91);
    \u0275\u0275listener("click", function DashboardComponent_div_129_Template_th_click_23_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSortColumn("porcentaje"));
    });
    \u0275\u0275text(24, " % ");
    \u0275\u0275elementStart(25, "span", 90);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(27, "tbody");
    \u0275\u0275template(28, DashboardComponent_div_129_tr_28_Template, 22, 16, "tr", 92)(29, DashboardComponent_div_129_tr_29_Template, 3, 0, "tr", 93);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.getSortIcon("nombreCompleto"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getSortIcon("partidoNombre"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getSortIcon("cargoNombre"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getSortIcon("votos"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getSortIcon("porcentaje"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.resultadosOrdenados);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.resultadosOrdenados.length === 0);
  }
}
function DashboardComponent_div_130_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 99);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 100)(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 100)(18, "span", 101);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const l_r24 = ctx.$implicit;
    const i_r25 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r25 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(l_r24.listaNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r24.numeroLista);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(l_r24.partidoNombre || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r24.cargoNombre || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 7, l_r24.totalVotos));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(20, 9, l_r24.porcentaje, "1.1-1"), "%");
  }
}
function DashboardComponent_div_130_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 105);
    \u0275\u0275text(2, "No hay resultados por lista");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_130_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 85)(1, "h4", 86);
    \u0275\u0275element(2, "i", 46);
    \u0275\u0275text(3, " Resultados por Lista");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "table", 88)(5, "thead")(6, "tr")(7, "th");
    \u0275\u0275text(8, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Lista");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "N\xB0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Cargo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 100);
    \u0275\u0275text(18, "Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 100);
    \u0275\u0275text(20, "%");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275template(22, DashboardComponent_div_130_tr_22_Template, 21, 12, "tr", 104)(23, DashboardComponent_div_130_tr_23_Template, 3, 0, "tr", 93);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(22);
    \u0275\u0275property("ngForOf", ctx_r1.resultadosListas);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.resultadosListas.length === 0);
  }
}
function DashboardComponent_div_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106);
    \u0275\u0275text(1, " No hay resultados disponibles ");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_132_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 107);
    \u0275\u0275listener("click", function DashboardComponent_div_132_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleFullscreen("none"));
    });
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_133_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 108);
  }
}
function DashboardComponent_div_134_h5_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h5");
    \u0275\u0275element(1, "i", 9);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.detalleCandidato.nombreCompleto, "");
  }
}
function DashboardComponent_div_134_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 118)(1, "div", 119)(2, "span", 120);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_134_div_8_li_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 127);
    \u0275\u0275listener("click", function DashboardComponent_div_134_div_8_li_18_Template_li_click_0_listener() {
      const tab_r29 = \u0275\u0275restoreView(_r28).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.geoDetalleTab = tab_r29.key);
    });
    \u0275\u0275elementStart(1, "a", 128);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tab_r29 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.geoDetalleTab === tab_r29.key);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.geoDetalleTab === tab_r29.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", tab_r29.label, " (", tab_r29.count, ")");
  }
}
function DashboardComponent_div_134_div_8_div_19_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 100)(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const v_r30 = ctx.$implicit;
    const i_r31 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r31 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r30.mesaNumero);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r30.institucion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r30.parroquia);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 5, v_r30.votos));
  }
}
function DashboardComponent_div_134_div_8_div_19_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 132);
    \u0275\u0275text(2, "Sin votos registrados");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_134_div_8_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 130)(2, "table", 131)(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Instituci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Parroquia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 100);
    \u0275\u0275text(14, "Votos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275template(16, DashboardComponent_div_134_div_8_div_19_tr_16_Template, 14, 7, "tr", 104)(17, DashboardComponent_div_134_div_8_div_19_tr_17_Template, 3, 0, "tr", 93);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.detalleCandidato.votosPorMesa);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.detalleCandidato.votosPorMesa.length === 0);
  }
}
function DashboardComponent_div_134_div_8_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275element(1, "geo-group-table", 133);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r1.detalleCandidato.zonas)("title", "Zona");
  }
}
function DashboardComponent_div_134_div_8_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275element(1, "geo-group-table", 133);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r1.detalleCandidato.provincias)("title", "Provincia");
  }
}
function DashboardComponent_div_134_div_8_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275element(1, "geo-group-table", 133);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r1.detalleCandidato.cantones)("title", "Cant\xF3n");
  }
}
function DashboardComponent_div_134_div_8_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275element(1, "geo-group-table", 133);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r1.detalleCandidato.parroquias)("title", "Parroquia");
  }
}
function DashboardComponent_div_134_div_8_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275element(1, "geo-group-table", 133);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r1.detalleCandidato.instituciones)("title", "Instituci\xF3n");
  }
}
function DashboardComponent_div_134_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 121)(2, "div", 122)(3, "span")(4, "strong");
    \u0275\u0275text(5, "Partido:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span")(8, "strong");
    \u0275\u0275text(9, "Cargo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span")(12, "strong");
    \u0275\u0275text(13, "Total Votos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 123);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "ul", 124);
    \u0275\u0275template(18, DashboardComponent_div_134_div_8_li_18_Template, 3, 6, "li", 125);
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, DashboardComponent_div_134_div_8_div_19_Template, 18, 2, "div", 126)(20, DashboardComponent_div_134_div_8_div_20_Template, 2, 2, "div", 126)(21, DashboardComponent_div_134_div_8_div_21_Template, 2, 2, "div", 126)(22, DashboardComponent_div_134_div_8_div_22_Template, 2, 2, "div", 126)(23, DashboardComponent_div_134_div_8_div_23_Template, 2, 2, "div", 126)(24, DashboardComponent_div_134_div_8_div_24_Template, 2, 2, "div", 126);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.detalleCandidato.partidoNombre, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.detalleCandidato.cargoNombre, "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 10, ctx_r1.detalleCandidato.totalVotos));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.geoDetalleTabs);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.geoDetalleTab === "mesas");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.geoDetalleTab === "zonas");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.geoDetalleTab === "provincias");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.geoDetalleTab === "cantones");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.geoDetalleTab === "parroquias");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.geoDetalleTab === "instituciones");
  }
}
function DashboardComponent_div_134_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 109)(1, "div", 110)(2, "div", 111)(3, "div", 112);
    \u0275\u0275template(4, DashboardComponent_div_134_h5_4_Template, 3, 1, "h5", 93);
    \u0275\u0275elementStart(5, "button", 113);
    \u0275\u0275listener("click", function DashboardComponent_div_134_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarDetalle());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 114);
    \u0275\u0275template(7, DashboardComponent_div_134_div_7_Template, 4, 0, "div", 115)(8, DashboardComponent_div_134_div_8_Template, 25, 12, "div", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 116)(10, "button", 117);
    \u0275\u0275listener("click", function DashboardComponent_div_134_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarDetalle());
    });
    \u0275\u0275text(11, "Cerrar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.detalleCandidato);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.detalleLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.detalleCandidato && !ctx_r1.detalleLoading);
  }
}
function DashboardComponent_div_135_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 108);
  }
}
function DashboardComponent_div_136_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 118)(1, "div", 119)(2, "span", 120);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_136_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 137);
    \u0275\u0275text(1, " No hay mesas cerradas ");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_136_div_11_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 140);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 140);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 100)(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 139)(17, "button", 141);
    \u0275\u0275listener("click", function DashboardComponent_div_136_div_11_tr_21_Template_button_click_17_listener() {
      const m_r34 = \u0275\u0275restoreView(_r33).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.descargarActa(m_r34.id));
    });
    \u0275\u0275element(18, "i", 142);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 139)(20, "button", 143);
    \u0275\u0275listener("click", function DashboardComponent_div_136_div_11_tr_21_Template_button_click_20_listener() {
      const m_r34 = \u0275\u0275restoreView(_r33).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmarReabrirMesa(m_r34));
    });
    \u0275\u0275element(21, "i", 144);
    \u0275\u0275text(22, " Reabrir ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r34 = ctx.$implicit;
    const i_r35 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r35 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r34.numero);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r34.sexo);
    \u0275\u0275advance();
    \u0275\u0275property("title", m_r34.institucionNombre);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r34.institucionNombre);
    \u0275\u0275advance();
    \u0275\u0275property("title", m_r34.parroquiaNombre);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r34.parroquiaNombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 8, m_r34.totalVotos));
  }
}
function DashboardComponent_div_136_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 130)(1, "table", 131)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Sexo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 138);
    \u0275\u0275text(11, "Instituci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 138);
    \u0275\u0275text(13, "Parroquia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 100);
    \u0275\u0275text(15, "Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 139);
    \u0275\u0275text(17, "Acta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 139);
    \u0275\u0275text(19, "Acci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275template(21, DashboardComponent_div_136_div_11_tr_21_Template, 23, 10, "tr", 104);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r1.mesasCerradasList);
  }
}
function DashboardComponent_div_136_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 109)(1, "div", 134)(2, "div", 111)(3, "div", 112)(4, "h5");
    \u0275\u0275element(5, "i", 69);
    \u0275\u0275text(6, " Mesas Cerradas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 113);
    \u0275\u0275listener("click", function DashboardComponent_div_136_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarMesasCerradas());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 114);
    \u0275\u0275template(9, DashboardComponent_div_136_div_9_Template, 4, 0, "div", 115)(10, DashboardComponent_div_136_div_10_Template, 2, 0, "div", 135)(11, DashboardComponent_div_136_div_11_Template, 22, 1, "div", 136);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 116)(13, "button", 117);
    \u0275\u0275listener("click", function DashboardComponent_div_136_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarMesasCerradas());
    });
    \u0275\u0275text(14, "Cerrar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r1.mesasCerradasLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.mesasCerradasLoading && ctx_r1.mesasCerradasList.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.mesasCerradasLoading && ctx_r1.mesasCerradasList.length > 0);
  }
}
function DashboardComponent_div_137_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 108);
  }
}
function DashboardComponent_div_138_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.reabrirError);
  }
}
function DashboardComponent_div_138_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 109)(1, "div", 145)(2, "div", 111)(3, "div", 112)(4, "h5");
    \u0275\u0275text(5, "Confirmar contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 113);
    \u0275\u0275listener("click", function DashboardComponent_div_138_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarReabrir());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 114)(8, "p");
    \u0275\u0275text(9, "Ingrese su contrase\xF1a para reabrir la mesa ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, ":");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 146);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_div_138_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.reabrirPassword, $event) || (ctx_r1.reabrirPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function DashboardComponent_div_138_Template_input_keyup_enter_13_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ejecutarReabrir());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, DashboardComponent_div_138_div_14_Template, 2, 1, "div", 147);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 116)(16, "button", 117);
    \u0275\u0275listener("click", function DashboardComponent_div_138_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarReabrir());
    });
    \u0275\u0275text(17, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 148);
    \u0275\u0275listener("click", function DashboardComponent_div_138_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ejecutarReabrir());
    });
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("#", ctx_r1.reabrirMesaSeleccionada == null ? null : ctx_r1.reabrirMesaSeleccionada.numero, "");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.reabrirPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.reabrirError);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.reabrirCargando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.reabrirCargando ? "..." : "Reabrir mesa", " ");
  }
}
function DashboardComponent_div_139_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 108);
  }
}
function DashboardComponent_div_140_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 118)(1, "div", 119)(2, "span", 120);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_140_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 137);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" No hay votos ", ctx_r1.nulosBlancoTipo === "nulos" ? "nulos" : "en blanco", " registrados ");
  }
}
function DashboardComponent_div_140_div_11_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 140);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 100)(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r38 = ctx.$implicit;
    const i_r39 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r39 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r38.numero);
    \u0275\u0275advance();
    \u0275\u0275property("title", m_r38.institucionNombre);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r38.institucionNombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.nulosBlancoTipo === "nulos" ? m_r38.votosNulos : \u0275\u0275pipeBind1(11, 5, m_r38.votosBlanco));
  }
}
function DashboardComponent_div_140_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 130)(1, "table", 131)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 138);
    \u0275\u0275text(9, "Instituci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 100);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, DashboardComponent_div_140_div_11_tr_13_Template, 12, 7, "tr", 104);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("Votos ", ctx_r1.nulosBlancoTipo === "nulos" ? "Nulos" : "Blanco", "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.nulosBlancoMesas);
  }
}
function DashboardComponent_div_140_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 109)(1, "div", 134)(2, "div", 111)(3, "div", 112)(4, "h5");
    \u0275\u0275element(5, "i", 102);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 113);
    \u0275\u0275listener("click", function DashboardComponent_div_140_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarNulosBlancoDetalle());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 114);
    \u0275\u0275template(9, DashboardComponent_div_140_div_9_Template, 4, 0, "div", 115)(10, DashboardComponent_div_140_div_10_Template, 2, 1, "div", 135)(11, DashboardComponent_div_140_div_11_Template, 14, 2, "div", 136);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 116)(13, "button", 117);
    \u0275\u0275listener("click", function DashboardComponent_div_140_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarNulosBlancoDetalle());
    });
    \u0275\u0275text(14, "Cerrar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r1.nulosBlancoTipo === "nulos" ? "bi-x-circle-fill" : "bi-square");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Votos ", ctx_r1.nulosBlancoTipo === "nulos" ? "Nulos" : "en Blanco", " por Mesa");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.nulosBlancoLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.nulosBlancoLoading && ctx_r1.nulosBlancoMesas.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.nulosBlancoLoading && ctx_r1.nulosBlancoMesas.length > 0);
  }
}
Chart.register(...registerables);
var DashboardComponent = class _DashboardComponent {
  constructor(api, wsService, authService, router, cdr) {
    this.api = api;
    this.wsService = wsService;
    this.authService = authService;
    this.router = router;
    this.cdr = cdr;
    this.elecciones = [];
    this.selectedEleccionId = null;
    this.dashboard = null;
    this.eleccionNombre = "";
    this.resultados = [];
    this.resultadosOrdenados = [];
    this.showListaResults = false;
    this.resultadosListas = [];
    this.resultadosPorPartido = [];
    this.resultadosListasChart = [];
    this.sortColumn = "votos";
    this.sortDirection = "desc";
    this.zonas = [];
    this.provincias = [];
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    this.cargos = [];
    this.partidos = [];
    this.filtroZonaId = null;
    this.filtroProvinciaId = null;
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.filtroCargoId = null;
    this.filtroPartidoId = null;
    this.filtroMesaId = null;
    this.mesas = [];
    this.userRole = "";
    this.ultimaActualizacion = "";
    this.filtrosMinimized = true;
    this.barChartMinimized = false;
    this.barChartFullscreen = false;
    this.pieChartMinimized = false;
    this.pieChartFullscreen = false;
    this.partyChartMinimized = false;
    this.partyChartFullscreen = false;
    this.listChartMinimized = false;
    this.listChartFullscreen = false;
    this.resultadosMinimized = false;
    this.resultadosFullscreen = false;
    this.showDetalle = false;
    this.detalleCandidato = null;
    this.detalleLoading = false;
    this.geoDetalleTab = "mesas";
    this.geoDetalleTabs = [];
    this.showMesasCerradas = false;
    this.mesasCerradasList = [];
    this.mesasCerradasLoading = false;
    this.showReabrirConfirm = false;
    this.reabrirMesaSeleccionada = null;
    this.reabrirPassword = "";
    this.reabrirError = "";
    this.reabrirCargando = false;
    this.showNulosBlancoDetalle = false;
    this.nulosBlancoTipo = "nulos";
    this.nulosBlancoMesas = [];
    this.nulosBlancoLoading = false;
    this.top3Cargos = /* @__PURE__ */ new Map();
    const user = this.authService.getCurrentUser();
    this.userRole = user?.rol || "";
  }
  toggleMinimize(card) {
    if (card === "barChart")
      this.barChartMinimized = !this.barChartMinimized;
    else if (card === "pieChart")
      this.pieChartMinimized = !this.pieChartMinimized;
    else if (card === "partyChart")
      this.partyChartMinimized = !this.partyChartMinimized;
    else if (card === "listChart")
      this.listChartMinimized = !this.listChartMinimized;
    else if (card === "resultados")
      this.resultadosMinimized = !this.resultadosMinimized;
  }
  toggleFullscreen(card) {
    const activating = card === "barChart" ? !this.barChartFullscreen : card === "pieChart" ? !this.pieChartFullscreen : card === "partyChart" ? !this.partyChartFullscreen : card === "listChart" ? !this.listChartFullscreen : !this.resultadosFullscreen;
    this.barChartFullscreen = false;
    this.pieChartFullscreen = false;
    this.partyChartFullscreen = false;
    this.listChartFullscreen = false;
    this.resultadosFullscreen = false;
    if (activating) {
      if (card === "barChart")
        this.barChartFullscreen = true;
      else if (card === "pieChart")
        this.pieChartFullscreen = true;
      else if (card === "partyChart")
        this.partyChartFullscreen = true;
      else if (card === "listChart")
        this.listChartFullscreen = true;
      else if (card === "resultados")
        this.resultadosFullscreen = true;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setTimeout(() => {
      this.barChart?.resize();
      this.pieChart?.resize();
      this.partyPieChart?.resize();
      this.listPieChart?.resize();
    }, 100);
  }
  ngOnInit() {
    this.api.getEleccionesActivas().subscribe((elecciones) => {
      this.elecciones = elecciones;
      if (elecciones.length > 0) {
        this.selectedEleccionId = elecciones[0].id;
        this.eleccionNombre = elecciones[0].nombre;
        this.loadZonas();
        this.loadMesas();
        this.loadDashboard();
        this.subscribeToUpdates();
        this.subscribeToMesaEstado();
        this.startAutoRefresh();
      }
    });
  }
  startAutoRefresh() {
    this.stopAutoRefresh();
    this.autoRefreshTimer = setInterval(() => {
      this.recargarSilencioso();
    }, 3e4);
  }
  stopAutoRefresh() {
    if (this.autoRefreshTimer) {
      clearInterval(this.autoRefreshTimer);
      this.autoRefreshTimer = void 0;
    }
  }
  procesarResultados(data) {
    this.showListaResults = (data.resultadosListas?.length || 0) > 0;
    this.resultadosListas = data.resultadosListas || [];
    const resultados = [...data.resultados || []];
    const totalVotosNulos = data.totalVotosNulos || 0;
    const totalVotosBlanco = data.totalVotosBlanco || 0;
    const totalGeneral = data.totalVotos + totalVotosNulos + totalVotosBlanco;
    if (totalVotosNulos > 0) {
      resultados.push({
        candidatoId: 0,
        nombreCompleto: "Votos Nulos",
        partidoNombre: "\u2014",
        cargoNombre: "\u2014",
        totalVotos: totalVotosNulos,
        porcentaje: totalGeneral > 0 ? Math.round(totalVotosNulos * 1e4 / totalGeneral) / 100 : 0
      });
    }
    if (totalVotosBlanco > 0) {
      resultados.push({
        candidatoId: -1,
        nombreCompleto: "Votos en Blanco",
        partidoNombre: "\u2014",
        cargoNombre: "\u2014",
        totalVotos: totalVotosBlanco,
        porcentaje: totalGeneral > 0 ? Math.round(totalVotosBlanco * 1e4 / totalGeneral) / 100 : 0
      });
    }
    this.resultados = resultados;
  }
  subscribeToMesaEstado() {
    if (!this.selectedEleccionId)
      return;
    this.wsService.subscribeToMesaEstado(this.selectedEleccionId).subscribe({
      next: (msg) => {
        if (msg.tipo === "mesa-estado") {
          this.loadDashboard();
          if (this.showMesasCerradas && !msg.cerrada) {
            this.mesasCerradasList = this.mesasCerradasList.filter((m) => m.id !== msg.mesaId);
          }
        }
      },
      error: () => {
      }
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
      this.initPartyChart();
      this.initListChart();
      this.updateCharts();
      this.updatePartyChart();
      this.updateListChart();
    }, 100);
  }
  loadDataComplete() {
    this.computeResultadosPorPartido();
    this.updateCharts();
    this.updatePartyChart();
    this.updateListChart();
    this.ultimaActualizacion = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  }
  ngOnDestroy() {
    this.wsSubscription?.unsubscribe();
    this.stopAutoRefresh();
    this.barChart?.destroy();
    this.pieChart?.destroy();
    this.partyPieChart?.destroy();
    this.listPieChart?.destroy();
    document.body.style.overflow = "";
  }
  recargarSilencioso() {
    if (!this.selectedEleccionId)
      return;
    const tieneFiltros = this.filtroZonaId || this.filtroProvinciaId || this.filtroCantonId || this.filtroParroquiaId || this.filtroInstitucionId || this.filtroCargoId || this.filtroPartidoId || this.filtroMesaId;
    const obs = tieneFiltros ? this.api.getDashboardConFiltros(this.selectedEleccionId, this.filtroCargoId ?? void 0, this.filtroPartidoId ?? void 0, this.filtroZonaId ?? void 0, this.filtroProvinciaId ?? void 0, this.filtroCantonId ?? void 0, this.filtroParroquiaId ?? void 0, this.filtroInstitucionId ?? void 0, this.filtroMesaId ?? void 0) : this.api.getDashboard(this.selectedEleccionId);
    obs.subscribe((data) => {
      this.dashboard = data;
      this.procesarResultados(data);
      this.ordenarResultados();
      this.loadDataComplete();
    });
  }
  onEleccionChange(event) {
    this.selectedEleccionId = Number(event.target.value);
    const eleccion = this.elecciones.find((e) => e.id === this.selectedEleccionId);
    this.eleccionNombre = eleccion?.nombre || "";
    this.loadDashboard();
    this.subscribeToUpdates();
  }
  loadZonas() {
    this.api.getZonas().subscribe((data) => {
      this.zonas = data;
    });
  }
  onZonaChange() {
    this.filtroProvinciaId = null;
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.provincias = [];
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    if (this.filtroZonaId) {
      this.api.getProvinciasByZona(this.filtroZonaId).subscribe((data) => {
        this.provincias = data;
      });
    }
    this.aplicarFiltros();
  }
  onProvinciaChange() {
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    if (this.filtroProvinciaId) {
      this.api.getCantonesByProvincia(this.filtroProvinciaId).subscribe((data) => {
        this.cantones = data;
      });
    }
    this.aplicarFiltros();
  }
  onCantonChange() {
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.parroquias = [];
    this.instituciones = [];
    if (this.filtroCantonId) {
      this.api.getParroquiasByCanton(this.filtroCantonId).subscribe((data) => {
        this.parroquias = data;
      });
    }
    this.aplicarFiltros();
  }
  onParroquiaChange() {
    this.filtroInstitucionId = null;
    this.instituciones = [];
    if (this.filtroParroquiaId) {
      this.api.getInstitucionesByParroquia(this.filtroParroquiaId).subscribe((data) => {
        this.instituciones = data;
      });
    }
    this.aplicarFiltros();
  }
  onInstitucionChange() {
    this.aplicarFiltros();
  }
  loadDashboard() {
    if (!this.selectedEleccionId)
      return;
    this.api.getDashboard(this.selectedEleccionId).subscribe((data) => {
      this.dashboard = data;
      this.procesarResultados(data);
      this.ordenarResultados();
      this.cdr.detectChanges();
      this.loadDataComplete();
    });
    this.api.getCargosByEleccion(this.selectedEleccionId).subscribe((data) => {
      this.cargos = data;
    });
    this.api.getPartidosByEleccion(this.selectedEleccionId).subscribe((data) => {
      this.partidos = data;
    });
  }
  loadMesas() {
    if (!this.selectedEleccionId)
      return;
    this.api.getMesasByCurrentUser(this.selectedEleccionId).subscribe((data) => {
      this.mesas = data;
    });
  }
  aplicarFiltros() {
    if (!this.selectedEleccionId)
      return;
    this.api.getDashboardConFiltros(this.selectedEleccionId, this.filtroCargoId ?? void 0, this.filtroPartidoId ?? void 0, this.filtroZonaId ?? void 0, this.filtroProvinciaId ?? void 0, this.filtroCantonId ?? void 0, this.filtroParroquiaId ?? void 0, this.filtroInstitucionId ?? void 0, this.filtroMesaId ?? void 0).subscribe((data) => {
      this.dashboard = data;
      this.procesarResultados(data);
      this.ordenarResultados();
      this.cdr.detectChanges();
      this.loadDataComplete();
    });
  }
  onMesaChange() {
    this.aplicarFiltros();
  }
  limpiarFiltros() {
    this.filtroZonaId = null;
    this.filtroProvinciaId = null;
    this.filtroCantonId = null;
    this.filtroParroquiaId = null;
    this.filtroInstitucionId = null;
    this.filtroCargoId = null;
    this.filtroPartidoId = null;
    this.filtroMesaId = null;
    this.provincias = [];
    this.cantones = [];
    this.parroquias = [];
    this.instituciones = [];
    this.loadDashboard();
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
        this.recargarSilencioso();
      });
    };
    subscribe();
  }
  ordenarResultados() {
    const dir = this.sortDirection === "asc" ? 1 : -1;
    this.resultadosOrdenados = [...this.resultados].sort((a, b) => {
      switch (this.sortColumn) {
        case "nombreCompleto":
          return dir * a.nombreCompleto.localeCompare(b.nombreCompleto);
        case "partidoNombre":
          return dir * a.partidoNombre.localeCompare(b.partidoNombre);
        case "cargoNombre":
          return dir * a.cargoNombre.localeCompare(b.cargoNombre);
        case "porcentaje":
          return dir * (a.porcentaje - b.porcentaje);
        default:
          return dir * (a.totalVotos - b.totalVotos);
      }
    });
    this.computeTop3();
  }
  computeTop3() {
    const grupos = /* @__PURE__ */ new Map();
    for (const r of this.resultadosOrdenados) {
      if (r.candidatoId === 0 || r.candidatoId === -1 || (r.candidatoId ?? 0) < -1)
        continue;
      const key = r.cargoNombre;
      if (!grupos.has(key))
        grupos.set(key, []);
      grupos.get(key).push(r);
    }
    const top3 = /* @__PURE__ */ new Map();
    for (const [cargo, items] of grupos) {
      const sorted = [...items].sort((a, b) => b.totalVotos - a.totalVotos);
      const top = /* @__PURE__ */ new Set();
      sorted.slice(0, 3).forEach((r) => top.add(r.nombreCompleto));
      top3.set(cargo, top);
    }
    this.top3Cargos = top3;
  }
  setSortColumn(col) {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = col;
      this.sortDirection = "desc";
    }
    this.ordenarResultados();
  }
  getRowClass(r) {
    if (r.candidatoId === 0)
      return "nulos-row";
    if (r.candidatoId === -1)
      return "blanco-row";
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter((x) => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0 && x.candidatoId !== -1)].sort((a, b) => b.totalVotos - a.totalVotos).findIndex((x) => x.nombreCompleto === r.nombreCompleto);
      return "candidato-row top-" + (idx + 1);
    }
    return "candidato-row";
  }
  getRankClass(r) {
    if (r.candidatoId === 0)
      return "candidato-rank rank-nulos";
    if (r.candidatoId === -1)
      return "candidato-rank rank-blanco";
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter((x) => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0 && x.candidatoId !== -1)].sort((a, b) => b.totalVotos - a.totalVotos).findIndex((x) => x.nombreCompleto === r.nombreCompleto);
      return "candidato-rank rank-top-" + (idx + 1);
    }
    return "candidato-rank";
  }
  getRankIcon(r, i) {
    if (r.candidatoId === 0)
      return "bi-x-circle-fill";
    if (r.candidatoId === -1)
      return "bi-square";
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter((x) => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0 && x.candidatoId !== -1)].sort((a, b) => b.totalVotos - a.totalVotos).findIndex((x) => x.nombreCompleto === r.nombreCompleto);
      return ["bi-trophy-fill", "bi-award-fill", "bi-award"][idx] || "";
    }
    return "";
  }
  getRankLabel(r, i) {
    if (this.getRankIcon(r, i))
      return "";
    return (i + 1).toString();
  }
  getSortIcon(col) {
    if (this.sortColumn !== col)
      return "\u21C5";
    return this.sortDirection === "asc" ? "\u2191" : "\u2193";
  }
  isDarkMode() {
    return document.body.getAttribute("data-theme") === "dark";
  }
  getChartTextColor() {
    return this.isDarkMode() ? "#f2f5f0" : "#263329";
  }
  getChartGridColor() {
    return this.isDarkMode() ? "#3f4d42" : "#e3e7e0";
  }
  getChartColors() {
    return this.isDarkMode() ? ["#7d9a72", "#e08a45", "#e6b94f", "#e8705f", "#6fb3d0", "#5fbb86", "#b98a5e", "#a3ada1"] : ["#48563c", "#d97732", "#e6b94f", "#c0392b", "#2d6a8a", "#2f7d4f", "#78543d", "#6b766f"];
  }
  initCharts() {
    const textColor = this.getChartTextColor();
    if (this.barChartRef?.nativeElement) {
      if (this.barChart)
        this.barChart.destroy();
      this.barChart = new Chart(this.barChartRef.nativeElement, {
        type: "bar",
        data: { labels: [], datasets: [] },
        options: {
          responsive: true,
          animation: false,
          color: textColor,
          scales: {
            x: { ticks: { color: textColor }, grid: { color: this.getChartGridColor() } },
            y: { ticks: { color: textColor }, grid: { color: this.getChartGridColor() } }
          },
          plugins: { legend: { display: false, labels: { color: textColor } } }
        }
      });
    }
    if (this.pieChartRef?.nativeElement) {
      if (this.pieChart)
        this.pieChart.destroy();
      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: "pie",
        data: { labels: [], datasets: [] },
        options: {
          responsive: true,
          animation: false,
          color: textColor,
          plugins: { legend: { position: "bottom", labels: { color: textColor } } }
        }
      });
    }
  }
  updateCharts() {
    if (!this.resultados.length)
      return;
    const resultados = this.resultados;
    const colors = this.getChartColors();
    if (this.barChart) {
      this.barChart.data.labels = resultados.map((r) => r.nombreCompleto);
      this.barChart.data.datasets = [{
        data: resultados.map((r) => r.totalVotos),
        backgroundColor: colors.slice(0, resultados.length)
      }];
      this.barChart.update("none");
    }
    if (this.pieChart) {
      this.pieChart.data.labels = resultados.map((r) => r.nombreCompleto);
      this.pieChart.data.datasets = [{
        data: resultados.map((r) => r.totalVotos),
        backgroundColor: colors.slice(0, resultados.length)
      }];
      this.pieChart.update("none");
    }
  }
  getFiltrosActuales() {
    const f = {};
    if (this.filtroCargoId)
      f.cargoId = this.filtroCargoId;
    if (this.filtroPartidoId)
      f.partidoId = this.filtroPartidoId;
    if (this.filtroZonaId)
      f.zonaId = this.filtroZonaId;
    if (this.filtroProvinciaId)
      f.provinciaId = this.filtroProvinciaId;
    if (this.filtroCantonId)
      f.cantonId = this.filtroCantonId;
    if (this.filtroParroquiaId)
      f.parroquiaId = this.filtroParroquiaId;
    if (this.filtroInstitucionId)
      f.institucionId = this.filtroInstitucionId;
    return f;
  }
  computeResultadosPorPartido() {
    const partidoMap = /* @__PURE__ */ new Map();
    for (const r of this.resultados) {
      if (r.candidatoId === 0 || r.candidatoId === -1 || (r.candidatoId ?? 0) < -1)
        continue;
      const key = r.partidoNombre || "Sin partido";
      partidoMap.set(key, (partidoMap.get(key) || 0) + r.totalVotos);
    }
    const total = Array.from(partidoMap.values()).reduce((a, b) => a + b, 0);
    this.resultadosPorPartido = Array.from(partidoMap.entries()).map(([partido, votos]) => ({ partido, votos, porcentaje: total > 0 ? votos * 100 / total : 0 })).sort((a, b) => b.votos - a.votos);
    if (!this.resultadosListas) {
      this.resultadosListasChart = [];
      return;
    }
    const listaTotal = this.resultadosListas.reduce((s, l) => s + l.totalVotos, 0);
    this.resultadosListasChart = this.resultadosListas.map((l) => ({
      lista: l.listaNombre,
      numero: l.numeroLista,
      partido: l.partidoNombre || "\u2014",
      votos: l.totalVotos,
      porcentaje: listaTotal > 0 ? l.totalVotos * 100 / listaTotal : 0
    }));
  }
  initPartyChart() {
    if (!this.partyPieChartRef?.nativeElement)
      return;
    if (this.partyPieChart)
      this.partyPieChart.destroy();
    this.partyPieChart = new Chart(this.partyPieChartRef.nativeElement, {
      type: "doughnut",
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        animation: false,
        color: this.getChartTextColor(),
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        cutout: "60%"
      }
    });
  }
  initListChart() {
    if (!this.listPieChartRef?.nativeElement)
      return;
    if (this.listPieChart)
      this.listPieChart.destroy();
    this.listPieChart = new Chart(this.listPieChartRef.nativeElement, {
      type: "doughnut",
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        animation: false,
        color: this.getChartTextColor(),
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        cutout: "60%"
      }
    });
  }
  updatePartyChart() {
    if (!this.partyPieChart || !this.resultadosPorPartido.length)
      return;
    const items = this.resultadosPorPartido;
    const colors = this.getChartColors();
    this.partyPieChart.data.labels = items.map((i) => i.partido);
    this.partyPieChart.data.datasets = [{
      data: items.map((i) => i.votos),
      backgroundColor: colors.slice(0, items.length)
    }];
    this.partyPieChart.update("none");
  }
  updateListChart() {
    if (!this.listPieChart || !this.resultadosListasChart.length)
      return;
    const items = this.resultadosListasChart;
    const colors = this.getChartColors();
    this.listPieChart.data.labels = items.map((i) => i.lista);
    this.listPieChart.data.datasets = [{
      data: items.map((i) => i.votos),
      backgroundColor: colors.slice(0, items.length)
    }];
    this.listPieChart.update("none");
  }
  exportarPdf() {
    if (this.selectedEleccionId) {
      this.api.exportDashboardPdf(this.selectedEleccionId, this.getFiltrosActuales());
    }
  }
  exportarExcel() {
    if (this.selectedEleccionId) {
      this.api.exportDashboardExcel(this.selectedEleccionId, this.getFiltrosActuales());
    }
  }
  verDetalleCandidato(candidatoId) {
    if (!this.selectedEleccionId)
      return;
    this.detalleLoading = true;
    this.showDetalle = true;
    this.geoDetalleTab = "mesas";
    this.api.getDetalleCandidato(candidatoId, this.selectedEleccionId).subscribe({
      next: (data) => {
        this.detalleCandidato = data;
        this.detalleLoading = false;
        this.geoDetalleTabs = [
          { key: "mesas", label: "Mesas", count: data.votosPorMesa?.length || 0 },
          { key: "zonas", label: "Zonas", count: data.zonas?.length || 0 },
          { key: "provincias", label: "Provincias", count: data.provincias?.length || 0 },
          { key: "cantones", label: "Cantones", count: data.cantones?.length || 0 },
          { key: "parroquias", label: "Parroquias", count: data.parroquias?.length || 0 },
          { key: "instituciones", label: "Instituciones", count: data.instituciones?.length || 0 }
        ].filter((t) => t.count > 0);
      },
      error: () => {
        this.detalleLoading = false;
      }
    });
  }
  cerrarDetalle() {
    this.showDetalle = false;
    this.detalleCandidato = null;
  }
  verMesasCerradas() {
    if (!this.selectedEleccionId)
      return;
    this.showMesasCerradas = true;
    this.mesasCerradasLoading = true;
    this.api.getMesasCerradas(this.selectedEleccionId).subscribe({
      next: (data) => {
        this.mesasCerradasList = data;
        this.mesasCerradasLoading = false;
      },
      error: () => {
        this.mesasCerradasLoading = false;
      }
    });
  }
  cerrarMesasCerradas() {
    this.showMesasCerradas = false;
    this.mesasCerradasList = [];
  }
  descargarActa(mesaId) {
    this.api.descargarActaMesa(mesaId);
  }
  confirmarReabrirMesa(m) {
    this.reabrirMesaSeleccionada = m;
    this.reabrirPassword = "";
    this.reabrirError = "";
    this.reabrirCargando = false;
    this.showReabrirConfirm = true;
  }
  cancelarReabrir() {
    this.showReabrirConfirm = false;
    this.reabrirMesaSeleccionada = null;
    this.reabrirPassword = "";
    this.reabrirError = "";
  }
  ejecutarReabrir() {
    if (!this.reabrirMesaSeleccionada || !this.reabrirPassword) {
      this.reabrirError = "Ingrese su contrase\xF1a";
      return;
    }
    this.reabrirCargando = true;
    this.reabrirError = "";
    this.api.verifyPassword(this.reabrirPassword).subscribe({
      next: (res) => {
        if (!res.valid) {
          this.reabrirError = "Contrase\xF1a incorrecta";
          this.reabrirCargando = false;
          return;
        }
        this.api.reabrirMesa(this.reabrirMesaSeleccionada.id).subscribe({
          next: () => {
            this.mesasCerradasList = this.mesasCerradasList.filter((m) => m.id !== this.reabrirMesaSeleccionada.id);
            this.cancelarReabrir();
          },
          error: () => {
            this.reabrirError = "Error al reabrir la mesa";
            this.reabrirCargando = false;
          }
        });
      },
      error: () => {
        this.reabrirError = "Error al verificar la contrase\xF1a";
        this.reabrirCargando = false;
      }
    });
  }
  verDetalleNulosBlanco(tipo) {
    if (!this.selectedEleccionId)
      return;
    this.showNulosBlancoDetalle = true;
    this.nulosBlancoTipo = tipo;
    this.nulosBlancoLoading = true;
    this.nulosBlancoMesas = [];
    this.api.getMesasByEleccion(this.selectedEleccionId).subscribe({
      next: (mesas) => {
        this.nulosBlancoMesas = mesas.filter((m) => {
          const valor = tipo === "nulos" ? m.votosNulos : m.votosBlanco;
          return valor != null && valor > 0;
        });
        this.nulosBlancoLoading = false;
      },
      error: () => {
        this.nulosBlancoLoading = false;
      }
    });
  }
  cerrarNulosBlancoDetalle() {
    this.showNulosBlancoDetalle = false;
    this.nulosBlancoMesas = [];
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(WebSocketService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], viewQuery: function DashboardComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
        \u0275\u0275viewQuery(_c2, 5);
        \u0275\u0275viewQuery(_c3, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.barChartRef = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.pieChartRef = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.partyPieChartRef = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listPieChartRef = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 141, vars: 92, consts: [["barChart", ""], ["pieChart", ""], ["partyPieChart", ""], ["listPieChart", ""], ["rankNumber", ""], [1, "dashboard-container", "container-fluid"], [1, "dashboard-header"], [1, "header-left"], [1, "header-icon"], [1, "bi", "bi-bar-chart-fill"], [1, "header-badges"], [1, "eleccion-badge"], [1, "live-badge", "active"], [1, "live-dot"], ["class", "update-time", 4, "ngIf"], [1, "header-actions"], ["title", "Exportar a Excel", 1, "btn", "btn-excel", 3, "click"], [1, "bi", "bi-file-earmark-spreadsheet"], ["title", "Exportar a PDF", 1, "btn", "btn-pdf", 3, "click"], [1, "bi", "bi-filetype-pdf"], [1, "btn", "btn-refresh", 3, "click"], [1, "bi", "bi-arrow-clockwise"], [1, "filtros-card"], [1, "filtros-header"], [1, "filtros-title"], [1, "bi", "bi-search"], [1, "card-buttons"], [1, "btn", "btn-clean", 3, "click"], [1, "btn-card-action", 3, "click", "title"], [1, "filtros-grid"], [1, "filtro-group"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-select", 3, "ngModelChange", "change", "ngModel", "disabled"], ["class", "filtro-group", 4, "ngIf"], ["class", "stats-grid", 4, "ngIf"], [1, "charts-grid"], [1, "chart-card"], [1, "card-header-actions"], ["title", "Pantalla completa", 1, "btn-card-action", 3, "click"], [1, "card-body"], [1, "bi", "bi-pie-chart"], ["class", "chart-card", 3, "minimized", "fullscreen", "dimmed", 4, "ngIf"], [1, "table-card"], [1, "table-header"], [1, "bi", "bi-clipboard-data"], [1, "table-count"], [1, "table-wrapper"], ["class", "resultados-section", 4, "ngIf"], ["class", "empty-msg text-center py-4", 4, "ngIf"], ["class", "fullscreen-backdrop", 3, "click", 4, "ngIf"], ["class", "modal-backdrop show", 4, "ngIf"], ["class", "modal show", "style", "display:block;", 4, "ngIf"], [1, "update-time"], [3, "value"], [1, "stats-grid"], [1, "stat-card", "stat-votos"], [1, "stat-icon"], [1, "bi", "bi-check2-square"], [1, "stat-info"], [1, "stat-label"], [1, "stat-value"], ["title", "Ver detalle por mesa", 1, "stat-card", "stat-nulos", 2, "cursor", "pointer", 3, "click"], [1, "bi", "bi-x-circle-fill"], ["title", "Ver detalle por mesa", 1, "stat-card", "stat-blanco", 2, "cursor", "pointer", 3, "click"], [1, "bi", "bi-square"], [1, "stat-card", "stat-mesas"], ["title", "Ver detalle de mesas cerradas", 1, "stat-card", "stat-cerradas", 2, "cursor", "pointer", 3, "click"], [1, "bi", "bi-lock-fill"], [1, "stat-bar"], [1, "stat-bar-fill"], [1, "stat-card", "stat-progreso"], [1, "bi", "bi-graph-up"], [1, "stat-bar-fill", "progress-fill"], [1, "bi", "bi-bank"], [2, "display", "flex", "gap", "20px", "flex-wrap", "wrap"], [2, "flex", "0 0 auto", "width", "220px", "height", "220px", "margin", "0 auto"], [2, "flex", "1", "min-width", "220px"], ["class", "progress-item", 4, "ngFor", "ngForOf"], [1, "progress-item"], [1, "progress-header"], [1, "progress-label"], [1, "progress-value"], [2, "color", "#94a3b8"], [1, "resultados-section"], [1, "section-title"], [1, "bi", "bi-person"], [1, "table-moderno"], [1, "sortable", 3, "click"], [1, "sort-icon"], [1, "sortable", "text-right", 3, "click"], [3, "class", "click", 4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "click"], [1, "candidato-info-cell"], [1, "candidato-rank"], [4, "ngIf", "ngIfElse"], [1, "candidato-name"], [1, "partido-badge"], [1, "text-right"], [1, "porcentaje-badge"], [1, "bi", 3, "ngClass"], ["colspan", "5", 1, "text-center", "empty-msg"], [4, "ngFor", "ngForOf"], ["colspan", "7", 1, "text-center", "empty-msg"], [1, "empty-msg", "text-center", "py-4"], [1, "fullscreen-backdrop", 3, "click"], [1, "modal-backdrop", "show"], [1, "modal", "show", 2, "display", "block"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], ["class", "text-center py-4", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "text-center", "py-4"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "detalle-header"], [1, "detalle-info"], [1, "detalle-total"], ["id", "detalleTabs", 1, "nav", "nav-tabs", "detalle-tabs"], ["class", "nav-item", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "detalle-tab-content", 4, "ngIf"], [1, "nav-item", 3, "click"], [1, "nav-link"], [1, "detalle-tab-content"], [1, "detalle-tabla-wrapper"], [1, "table", "table-striped"], ["colspan", "5", 1, "text-center", "py-3"], [3, "items", "title"], [1, "modal-dialog", "modal-lg", "modal-dialog-scrollable"], ["class", "text-center py-4 text-muted", 4, "ngIf"], ["class", "detalle-tabla-wrapper", 4, "ngIf"], [1, "text-center", "py-4", "text-muted"], [1, "col-text-wrap"], [1, "text-center"], [1, "col-text-wrap", 3, "title"], ["title", "Descargar acta", 1, "btn-card-action", 3, "click"], [1, "bi", "bi-filetype-pdf", 2, "color", "#ef4444", "font-size", "16px"], ["title", "Reabrir mesa", 1, "btn-reabrir", 3, "click"], [1, "bi", "bi-unlock", 2, "font-size", "16px"], [1, "modal-dialog", "modal-sm", "modal-dialog-centered"], ["type", "password", "placeholder", "Contrase\xF1a", "autofocus", "", 1, "form-control", 3, "ngModelChange", "keyup.enter", "ngModel"], ["class", "text-danger mt-2 small", 4, "ngIf"], [1, "btn", "btn-warning", 3, "click", "disabled"], [1, "text-danger", "mt-2", "small"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "h1")(4, "span", 8);
        \u0275\u0275element(5, "i", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Dashboard Electoral");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 10)(8, "span", 11);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span", 12);
        \u0275\u0275element(11, "span", 13);
        \u0275\u0275text(12, " EN VIVO ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, DashboardComponent_span_13_Template, 2, 1, "span", 14);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 15)(15, "button", 16);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_15_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.exportarExcel());
        });
        \u0275\u0275element(16, "i", 17);
        \u0275\u0275text(17, " Excel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "button", 18);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_18_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.exportarPdf());
        });
        \u0275\u0275element(19, "i", 19);
        \u0275\u0275text(20, " PDF");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "button", 20);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_21_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.recargarSilencioso());
        });
        \u0275\u0275element(22, "i", 21);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(23, "div", 22)(24, "div", 23)(25, "div", 24)(26, "h3");
        \u0275\u0275element(27, "i", 25);
        \u0275\u0275text(28, " Filtros de B\xFAsqueda");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 26)(30, "button", 27);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_30_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.limpiarFiltros());
        });
        \u0275\u0275text(31, "Limpiar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "button", 28);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_32_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.filtrosMinimized = !ctx.filtrosMinimized);
        });
        \u0275\u0275element(33, "i");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(34, "div", 29)(35, "div", 30)(36, "label");
        \u0275\u0275text(37, "Zona");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "select", 31);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_38_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroZonaId, $event) || (ctx.filtroZonaId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_38_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onZonaChange());
        });
        \u0275\u0275elementStart(39, "option", 32);
        \u0275\u0275text(40, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(41, DashboardComponent_option_41_Template, 2, 2, "option", 33);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "div", 30)(43, "label");
        \u0275\u0275text(44, "Provincia");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "select", 34);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_45_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroProvinciaId, $event) || (ctx.filtroProvinciaId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_45_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onProvinciaChange());
        });
        \u0275\u0275elementStart(46, "option", 32);
        \u0275\u0275text(47, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(48, DashboardComponent_option_48_Template, 2, 2, "option", 33);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "div", 30)(50, "label");
        \u0275\u0275text(51, "Cant\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "select", 34);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_52_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroCantonId, $event) || (ctx.filtroCantonId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_52_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onCantonChange());
        });
        \u0275\u0275elementStart(53, "option", 32);
        \u0275\u0275text(54, "Todos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(55, DashboardComponent_option_55_Template, 2, 2, "option", 33);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(56, "div", 30)(57, "label");
        \u0275\u0275text(58, "Parroquia");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "select", 34);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_59_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroParroquiaId, $event) || (ctx.filtroParroquiaId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_59_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onParroquiaChange());
        });
        \u0275\u0275elementStart(60, "option", 32);
        \u0275\u0275text(61, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(62, DashboardComponent_option_62_Template, 2, 2, "option", 33);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(63, "div", 30)(64, "label");
        \u0275\u0275text(65, "Instituci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "select", 34);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_66_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroInstitucionId, $event) || (ctx.filtroInstitucionId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_66_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onInstitucionChange());
        });
        \u0275\u0275elementStart(67, "option", 32);
        \u0275\u0275text(68, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(69, DashboardComponent_option_69_Template, 2, 2, "option", 33);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(70, "div", 30)(71, "label");
        \u0275\u0275text(72, "Cargo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "select", 31);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_73_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroCargoId, $event) || (ctx.filtroCargoId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_73_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.aplicarFiltros());
        });
        \u0275\u0275elementStart(74, "option", 32);
        \u0275\u0275text(75, "Todos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(76, DashboardComponent_option_76_Template, 2, 2, "option", 33);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(77, "div", 30)(78, "label");
        \u0275\u0275text(79, "Partido");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(80, "select", 31);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_80_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroPartidoId, $event) || (ctx.filtroPartidoId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_80_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.aplicarFiltros());
        });
        \u0275\u0275elementStart(81, "option", 32);
        \u0275\u0275text(82, "Todos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(83, DashboardComponent_option_83_Template, 2, 2, "option", 33);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(84, DashboardComponent_div_84_Template, 7, 3, "div", 35);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(85, DashboardComponent_div_85_Template, 57, 19, "div", 36);
        \u0275\u0275elementStart(86, "div", 37)(87, "div", 38)(88, "div", 39)(89, "h3");
        \u0275\u0275element(90, "i", 9);
        \u0275\u0275text(91, " Votos por Candidato");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(92, "div", 26)(93, "button", 28);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_93_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleMinimize("barChart"));
        });
        \u0275\u0275element(94, "i");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "button", 40);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_95_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleFullscreen("barChart"));
        });
        \u0275\u0275element(96, "i");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(97, "div", 41);
        \u0275\u0275element(98, "canvas", null, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(100, "div", 38)(101, "div", 39)(102, "h3");
        \u0275\u0275element(103, "i", 42);
        \u0275\u0275text(104, " Distribuci\xF3n de Votos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(105, "div", 26)(106, "button", 28);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_106_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleMinimize("pieChart"));
        });
        \u0275\u0275element(107, "i");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(108, "button", 40);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_108_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleFullscreen("pieChart"));
        });
        \u0275\u0275element(109, "i");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(110, "div", 41);
        \u0275\u0275element(111, "canvas", null, 1);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(113, "div", 37);
        \u0275\u0275template(114, DashboardComponent_div_114_Template, 17, 14, "div", 43)(115, DashboardComponent_div_115_Template, 17, 14, "div", 43);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(116, "div", 44)(117, "div", 45)(118, "h3");
        \u0275\u0275element(119, "i", 46);
        \u0275\u0275text(120, " Resultados");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(121, "div", 26)(122, "span", 47);
        \u0275\u0275text(123);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(124, "button", 28);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_124_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleMinimize("resultados"));
        });
        \u0275\u0275element(125, "i");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(126, "button", 40);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_126_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleFullscreen("resultados"));
        });
        \u0275\u0275element(127, "i");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(128, "div", 48);
        \u0275\u0275template(129, DashboardComponent_div_129_Template, 30, 7, "div", 49)(130, DashboardComponent_div_130_Template, 24, 2, "div", 49)(131, DashboardComponent_div_131_Template, 2, 0, "div", 50);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(132, DashboardComponent_div_132_Template, 1, 0, "div", 51)(133, DashboardComponent_div_133_Template, 1, 0, "div", 52)(134, DashboardComponent_div_134_Template, 12, 3, "div", 53)(135, DashboardComponent_div_135_Template, 1, 0, "div", 52)(136, DashboardComponent_div_136_Template, 15, 3, "div", 53)(137, DashboardComponent_div_137_Template, 1, 0, "div", 52)(138, DashboardComponent_div_138_Template, 20, 5, "div", 53)(139, DashboardComponent_div_139_Template, 1, 0, "div", 52)(140, DashboardComponent_div_140_Template, 15, 5, "div", 53);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.eleccionNombre);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.ultimaActualizacion);
        \u0275\u0275advance(19);
        \u0275\u0275property("title", ctx.filtrosMinimized ? "Expandir" : "Minimizar");
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.filtrosMinimized ? "bi bi-plus" : "bi bi-dash");
        \u0275\u0275advance();
        \u0275\u0275classProp("hidden", ctx.filtrosMinimized);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroZonaId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.zonas);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroProvinciaId);
        \u0275\u0275property("disabled", !ctx.filtroZonaId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.provincias);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroCantonId);
        \u0275\u0275property("disabled", !ctx.filtroProvinciaId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.cantones);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroParroquiaId);
        \u0275\u0275property("disabled", !ctx.filtroCantonId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.parroquias);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroInstitucionId);
        \u0275\u0275property("disabled", !ctx.filtroParroquiaId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.instituciones);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroCargoId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.cargos);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroPartidoId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.partidos);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesas.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.dashboard);
        \u0275\u0275advance();
        \u0275\u0275classProp("fullscreen-mode", ctx.barChartFullscreen || ctx.pieChartFullscreen);
        \u0275\u0275advance();
        \u0275\u0275classProp("minimized", ctx.barChartMinimized)("fullscreen", ctx.barChartFullscreen)("dimmed", ctx.pieChartFullscreen || ctx.resultadosFullscreen);
        \u0275\u0275advance(6);
        \u0275\u0275property("title", ctx.barChartMinimized ? "Expandir" : "Minimizar");
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.barChartMinimized ? "bi bi-plus" : "bi bi-dash");
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.barChartFullscreen ? "bi bi-fullscreen-exit" : "bi bi-arrows-angle-expand");
        \u0275\u0275advance();
        \u0275\u0275classProp("hidden", ctx.barChartMinimized);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("minimized", ctx.pieChartMinimized)("fullscreen", ctx.pieChartFullscreen)("dimmed", ctx.barChartFullscreen || ctx.resultadosFullscreen);
        \u0275\u0275advance(6);
        \u0275\u0275property("title", ctx.pieChartMinimized ? "Expandir" : "Minimizar");
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.pieChartMinimized ? "bi bi-plus" : "bi bi-dash");
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.pieChartFullscreen ? "bi bi-fullscreen-exit" : "bi bi-arrows-angle-expand");
        \u0275\u0275advance();
        \u0275\u0275classProp("hidden", ctx.pieChartMinimized);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("fullscreen-mode", ctx.barChartFullscreen || ctx.pieChartFullscreen || ctx.partyChartFullscreen || ctx.listChartFullscreen || ctx.resultadosFullscreen);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.resultadosPorPartido.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.resultadosListasChart.length > 0);
        \u0275\u0275advance();
        \u0275\u0275classProp("minimized", ctx.resultadosMinimized)("fullscreen", ctx.resultadosFullscreen)("dimmed", ctx.barChartFullscreen || ctx.pieChartFullscreen || ctx.partyChartFullscreen || ctx.listChartFullscreen);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("", ctx.resultados.length, " candidatos");
        \u0275\u0275advance();
        \u0275\u0275property("title", ctx.resultadosMinimized ? "Expandir" : "Minimizar");
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.resultadosMinimized ? "bi bi-plus" : "bi bi-dash");
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.resultadosFullscreen ? "bi bi-fullscreen-exit" : "bi bi-arrows-angle-expand");
        \u0275\u0275advance();
        \u0275\u0275classProp("hidden", ctx.resultadosMinimized);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.resultados.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showListaResults && ctx.resultadosListas.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.resultados.length === 0 && (!ctx.showListaResults || ctx.resultadosListas.length === 0));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.barChartFullscreen || ctx.pieChartFullscreen || ctx.partyChartFullscreen || ctx.listChartFullscreen || ctx.resultadosFullscreen);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDetalle);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDetalle);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showMesasCerradas);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showMesasCerradas);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showReabrirConfirm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showReabrirConfirm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showNulosBlancoDetalle);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showNulosBlancoDetalle);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, GeoGroupTableComponent], styles: ['\n\n.dashboard-container[_ngcontent-%COMP%] {\n  max-width: 100%;\n  padding: 20px 24px;\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n.header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n  color: var(--alantek-text);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.header-badges[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.eleccion-badge[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--alantek-primary),\n      var(--alantek-primary-strong));\n  color: white;\n  padding: 4px 14px;\n  border-radius: 20px;\n  font-size: 13px;\n  font-weight: 500;\n}\n.live-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  background: var(--alantek-background);\n  color: var(--alantek-text-muted);\n  border: 1px solid var(--alantek-border);\n}\n.live-badge.active[_ngcontent-%COMP%] {\n  background: var(--alantek-success-bg);\n  color: var(--alantek-success);\n  border-color: var(--alantek-success);\n}\n.live-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--alantek-text-muted);\n  transition: all 0.3s;\n}\n.live-badge.active[_ngcontent-%COMP%]   .live-dot[_ngcontent-%COMP%] {\n  background: var(--alantek-success);\n  animation: _ngcontent-%COMP%_pulse-dot 2s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 0 0 rgba(47, 125, 79, 0.4);\n  }\n  50% {\n    opacity: 0.7;\n    box-shadow: 0 0 0 4px rgba(47, 125, 79, 0);\n  }\n}\n.update-time[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--alantek-text-muted);\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.btn-refresh[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border: 1px solid var(--alantek-border);\n  background: var(--alantek-surface);\n  border-radius: 10px;\n  font-size: 18px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  color: var(--alantek-text-muted);\n}\n.btn-refresh[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n  color: var(--alantek-primary);\n  border-color: var(--alantek-primary);\n}\n.filtros-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  padding: 14px 18px;\n  margin-bottom: 16px;\n  box-shadow: var(--alantek-shadow-sm);\n  border: 1px solid var(--alantek-border);\n}\n.filtros-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.filtros-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.filtros-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: var(--alantek-text);\n}\n.btn-clean[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  border: 1px solid var(--alantek-border);\n  background: var(--alantek-surface);\n  border-radius: 8px;\n  color: var(--alantek-text-muted);\n  font-size: 13px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-clean[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n  color: var(--alantek-danger);\n  border-color: var(--alantek-danger);\n}\n.filtros-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n  overflow: hidden;\n  transition:\n    max-height 0.35s ease,\n    opacity 0.35s ease,\n    margin 0.35s ease;\n  max-height: 200px;\n  opacity: 1;\n  margin-top: 16px;\n}\n.filtros-grid.hidden[_ngcontent-%COMP%] {\n  max-height: 0;\n  opacity: 0;\n  margin-top: 0;\n  pointer-events: none;\n}\n.filtro-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.filtro-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--alantek-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin: 0;\n}\n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 7px 10px;\n  border: 1px solid var(--alantek-border);\n  border-radius: 8px;\n  font-size: 13px;\n  background: var(--alantek-background);\n  transition: all 0.2s;\n  cursor: pointer;\n}\n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: var(--alantek-primary);\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(217, 119, 50, 0.1);\n  background: var(--alantek-surface);\n}\n.form-select[_ngcontent-%COMP%]:disabled {\n  background: var(--alantek-background);\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 10px;\n  padding: 12px 14px;\n  box-shadow: var(--alantek-shadow-sm);\n  border: 1px solid var(--alantek-border);\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--alantek-shadow-lg);\n}\n.stat-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n}\n.stat-votos[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      var(--alantek-primary),\n      var(--alantek-primary-strong));\n}\n.stat-nulos[_ngcontent-%COMP%]::before {\n  background: var(--alantek-danger);\n}\n.stat-mesas[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      var(--alantek-highlight),\n      var(--alantek-accent));\n}\n.stat-cerradas[_ngcontent-%COMP%]::before {\n  background: var(--alantek-danger);\n}\n.stat-progreso[_ngcontent-%COMP%]::before {\n  background: var(--alantek-success);\n}\n.stat-blanco[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      var(--alantek-text-muted),\n      var(--alantek-border-strong));\n}\n.stat-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  line-height: 1;\n}\n.stat-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--alantek-text-muted);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--alantek-text);\n  line-height: 1.1;\n}\n.stat-trend[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  font-size: 10px;\n  font-weight: 600;\n  padding: 1px 6px;\n  border-radius: 4px;\n}\n.stat-trend.up[_ngcontent-%COMP%] {\n  background: var(--alantek-success-bg);\n  color: var(--alantek-success);\n}\n.stat-bar[_ngcontent-%COMP%] {\n  height: 4px;\n  background: var(--alantek-background);\n  border-radius: 2px;\n  overflow: hidden;\n  margin-top: 2px;\n}\n.stat-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--alantek-primary),\n      var(--alantek-primary-strong));\n  transition: width 0.8s ease;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  background: var(--alantek-success);\n}\n.charts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n  margin-bottom: 16px;\n  transition: all 0.3s;\n}\n.charts-grid.fullscreen-mode[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.chart-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  padding: 16px;\n  box-shadow: var(--alantek-shadow-sm);\n  border: 1px solid var(--alantek-border);\n  transition: all 0.3s;\n  position: relative;\n}\n.chart-card.minimized[_ngcontent-%COMP%] {\n  padding-bottom: 12px;\n}\n.chart-card.minimized[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  display: none;\n}\n.chart-card.minimized[_ngcontent-%COMP%]   .card-header-actions[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.chart-card.dimmed[_ngcontent-%COMP%] {\n  visibility: hidden;\n  height: 0;\n  min-height: 0;\n  padding: 0 20px;\n  margin: 0;\n  border: none;\n  overflow: hidden;\n}\n.chart-card.fullscreen[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  left: 20px;\n  right: 20px;\n  bottom: 20px;\n  z-index: 1050;\n  padding: 24px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  border-color: var(--alantek-primary);\n  display: flex;\n  flex-direction: column;\n  visibility: visible;\n  height: auto;\n  min-height: auto;\n  margin: 0;\n}\n.chart-card.fullscreen[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n}\n.chart-card.fullscreen[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n  max-height: calc(100vh - 160px);\n}\n.chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 0;\n  color: var(--alantek-text);\n}\n.card-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.card-header-actions[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.card-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn-card-action[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border: none;\n  background: var(--alantek-background);\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--alantek-text-muted);\n  transition: all 0.2s;\n  font-size: 14px;\n}\n.btn-card-action[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-border);\n  color: var(--alantek-text);\n}\n.col-text-wrap[_ngcontent-%COMP%] {\n  word-break: break-word;\n  max-width: 200px;\n}\n.btn-reabrir[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border: 1px solid var(--alantek-highlight);\n  background: var(--alantek-warning-bg);\n  color: var(--alantek-warning);\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-reabrir[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-warning-bg);\n  border-color: var(--alantek-highlight);\n}\n.card-body[_ngcontent-%COMP%] {\n  transition: all 0.3s;\n}\n.card-body.hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n.table-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  box-shadow: var(--alantek-shadow-sm);\n  border: 1px solid var(--alantek-border);\n  overflow: hidden;\n  transition: all 0.3s;\n}\n.table-card.minimized[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%] {\n  display: none;\n}\n.table-card.dimmed[_ngcontent-%COMP%] {\n  visibility: hidden;\n  height: 0;\n  min-height: 0;\n  padding: 0 24px;\n  margin: 0;\n  border: none;\n  overflow: hidden;\n}\n.resultados-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.resultados-section[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--alantek-text);\n  margin: 0 0 12px 0;\n  padding: 8px 16px;\n  background: var(--alantek-background);\n  border-radius: 8px;\n  border-left: 4px solid var(--alantek-primary);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  color: var(--alantek-text);\n  border-left-color: var(--alantek-primary);\n}\n.table-card.fullscreen[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  left: 20px;\n  right: 20px;\n  bottom: 20px;\n  z-index: 1050;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  border-color: var(--alantek-primary);\n  visibility: visible;\n  height: auto;\n  min-height: auto;\n  margin: 0;\n}\n.table-card.fullscreen[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n}\n.table-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 18px 10px;\n}\n.table-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  color: var(--alantek-text);\n}\n.table-count[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--alantek-text-muted);\n  background: var(--alantek-background);\n  padding: 2px 10px;\n  border-radius: 12px;\n  margin-right: 6px;\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  padding: 0 18px 14px;\n}\n.table-wrapper.hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n.table-moderno[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n}\n.table-moderno[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 12px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--alantek-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 2px solid var(--alantek-border);\n  background: var(--alantek-background);\n  white-space: nowrap;\n}\n.table-moderno[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child {\n  border-radius: 10px 0 0 0;\n}\n.table-moderno[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 10px 0 0;\n}\n.table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 12px;\n  border-bottom: 1px solid var(--alantek-border);\n  font-size: 14px;\n  color: var(--alantek-text-secondary);\n  vertical-align: middle;\n}\n.table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: background 0.2s;\n}\n.table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n}\n.table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s;\n}\n.sortable[_ngcontent-%COMP%]:hover {\n  color: var(--alantek-primary);\n}\n.sort-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin-left: 4px;\n  opacity: 0.5;\n  display: inline-block;\n}\n.sortable[_ngcontent-%COMP%]:hover   .sort-icon[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.candidato-info-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.candidato-rank[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--alantek-background);\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--alantek-text-muted);\n  flex-shrink: 0;\n}\n.candidato-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--alantek-text);\n}\n.partido-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 12px;\n  background: var(--alantek-info-bg);\n  color: var(--alantek-primary);\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n}\n.porcentaje-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  background: var(--alantek-success-bg);\n  color: var(--alantek-success);\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 600;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  padding: 40px !important;\n  color: var(--alantek-text-muted);\n  font-size: 15px;\n}\n.candidato-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.candidato-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-info-bg) !important;\n}\n.top-1[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--alantek-warning-bg) !important;\n}\n.top-1[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-highlight) !important;\n}\n.top-2[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n}\n.top-2[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n}\n.top-3[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n}\n.top-3[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-warning-bg) !important;\n}\n.rank-top-1[_ngcontent-%COMP%] {\n  background: var(--alantek-highlight) !important;\n  color: var(--alantek-primary-dark) !important;\n}\n.rank-top-2[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n  color: var(--alantek-text-secondary) !important;\n}\n.rank-top-3[_ngcontent-%COMP%] {\n  background: var(--alantek-accent) !important;\n  color: var(--alantek-primary-dark) !important;\n}\n.rank-nulos[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg) !important;\n  color: var(--alantek-danger) !important;\n}\n.rank-blanco[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n  color: var(--alantek-text-secondary) !important;\n}\n.nulos-row[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.nulos-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg) !important;\n  border-top: 2px dashed var(--alantek-danger);\n}\n.nulos-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg) !important;\n}\n.blanco-row[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.blanco-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n  border-top: 2px dashed var(--alantek-border-strong);\n}\n.blanco-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n}\n.fullscreen-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1049;\n}\n.detalle-header[_ngcontent-%COMP%] {\n  background: var(--alantek-background);\n  border-radius: 10px;\n  padding: 16px 20px;\n  margin-bottom: 16px;\n}\n.detalle-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  flex-wrap: wrap;\n}\n.detalle-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--alantek-text-secondary);\n}\n.detalle-total[_ngcontent-%COMP%] {\n  color: var(--alantek-primary);\n  font-size: 18px;\n  font-weight: 700;\n}\n.detalle-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  margin-bottom: 16px;\n  border-bottom: 2px solid var(--alantek-border);\n  flex-wrap: wrap;\n  padding: 0;\n  list-style: none;\n}\n.detalle-tabs[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.detalle-tabs[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--alantek-text-muted);\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  transition: all 0.2s;\n  white-space: nowrap;\n  display: block;\n  text-decoration: none;\n}\n.detalle-tabs[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  color: var(--alantek-primary);\n  border-bottom-color: var(--alantek-primary);\n}\n.detalle-tabs[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  color: var(--alantek-primary-strong);\n}\n.detalle-tab-content[_ngcontent-%COMP%] {\n}\n.detalle-tabla-wrapper[_ngcontent-%COMP%] {\n  max-height: 400px;\n  overflow-y: auto;\n  border: 1px solid var(--alantek-border);\n  border-radius: 10px;\n}\n.detalle-tabla-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.detalle-tabla-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 1;\n}\n@media (max-width: 1100px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .charts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 700px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .dashboard-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .filtros-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n[data-theme=dark][_ngcontent-%COMP%]   .dashboard-container[_ngcontent-%COMP%] {\n  color: var(--alantek-text);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .filtros-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface) !important;\n  border-color: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .filtros-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .filtro-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface) !important;\n  border-color: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .stat-bar[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface) !important;\n  border-color: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .card-buttons[_ngcontent-%COMP%]   .btn-card-action[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .card-buttons[_ngcontent-%COMP%]   .btn-card-action[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-border-strong) !important;\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface) !important;\n  border-color: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .table-count[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .candidato-name[_ngcontent-%COMP%] {\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .candidato-rank[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .rank-blanco[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n  color: var(--alantek-text-secondary) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .stat-blanco[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      var(--alantek-text-muted),\n      var(--alantek-border-strong));\n}\n[data-theme=dark][_ngcontent-%COMP%]   .partido-badge[_ngcontent-%COMP%] {\n  background: var(--alantek-info-bg) !important;\n  color: var(--alantek-info) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .porcentaje-badge[_ngcontent-%COMP%] {\n  background: var(--alantek-success-bg) !important;\n  color: var(--alantek-success) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .detalle-header[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .detalle-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .live-badge[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n  color: var(--alantek-text-muted) !important;\n  border-color: var(--alantek-border-strong) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .live-badge.active[_ngcontent-%COMP%] {\n  background: var(--alantek-success-bg) !important;\n  color: var(--alantek-success) !important;\n  border-color: var(--alantek-success) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .update-time[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%] {\n  background: var(--alantek-surface) !important;\n  border-color: var(--alantek-border) !important;\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .btn-refresh[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-border) !important;\n  color: var(--alantek-primary) !important;\n  border-color: var(--alantek-primary) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .sortable[_ngcontent-%COMP%]:hover {\n  color: var(--alantek-primary) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .col-text-wrap[_ngcontent-%COMP%] {\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .fullscreen-backdrop[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.7) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .empty-msg[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .btn-clean[_ngcontent-%COMP%] {\n  background: var(--alantek-surface) !important;\n  border-color: var(--alantek-border) !important;\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .btn-clean[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-border) !important;\n  color: var(--alantek-danger) !important;\n  border-color: var(--alantek-danger) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .detalle-tabs[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .detalle-tabs[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  color: var(--alantek-primary) !important;\n  border-bottom-color: var(--alantek-primary) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .detalle-tabs[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  color: var(--alantek-primary) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .detalle-total[_ngcontent-%COMP%] {\n  color: var(--alantek-primary) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .btn-reabrir[_ngcontent-%COMP%] {\n  background: var(--alantek-warning-bg) !important;\n  border-color: var(--alantek-secondary) !important;\n  color: var(--alantek-highlight) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .btn-reabrir[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-secondary) !important;\n  border-color: var(--alantek-highlight) !important;\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .stat-nulos[_ngcontent-%COMP%]:hover, [data-theme=dark][_ngcontent-%COMP%]   .stat-blanco[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-surface) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .candidato-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-info-bg) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .top-1[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--alantek-warning-bg) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .top-1[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-secondary) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .top-2[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--alantek-surface) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .top-2[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .top-3[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .top-3[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-warning-bg) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .rank-top-1[_ngcontent-%COMP%] {\n  background: var(--alantek-secondary) !important;\n  color: var(--alantek-highlight) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .rank-top-2[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n  color: var(--alantek-text-secondary) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .rank-top-3[_ngcontent-%COMP%] {\n  background: var(--alantek-warning-bg) !important;\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .rank-nulos[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg) !important;\n  color: var(--alantek-danger) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .nulos-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg) !important;\n  border-top-color: var(--alantek-danger) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .nulos-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .blanco-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n  border-top-color: var(--alantek-border-strong) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .blanco-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .detalle-tabs[_ngcontent-%COMP%] {\n  border-bottom-color: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .detalle-tabla-wrapper[_ngcontent-%COMP%] {\n  border-color: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .detalle-tabla-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n  border-color: var(--alantek-border) !important;\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]:focus {\n  background: var(--alantek-surface) !important;\n  border-color: var(--alantek-primary) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]:disabled {\n  background: var(--alantek-background) !important;\n  color: var(--alantek-text-muted) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: var(--alantek-text) !important;\n  border-bottom-color: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .table-moderno[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: var(--alantek-background) !important;\n  color: var(--alantek-text-muted) !important;\n  border-bottom-color: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--alantek-border) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted) !important;\n}\n.progress-item[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.progress-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.progress-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 4px;\n}\n.progress-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--alantek-text-secondary);\n}\n.progress-value[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--alantek-text-muted);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .progress-label[_ngcontent-%COMP%] {\n  color: var(--alantek-text) !important;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .progress-value[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted) !important;\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "app\\features\\dashboard\\dashboard.component.ts", lineNumber: 23 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-LUPXP4RR.js.map
