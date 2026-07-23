import {
  WebSocketService
} from "./chunk-7OWRCG7O.js";
import {
  Chart,
  registerables
} from "./chunk-RWZWOR5Y.js";
import {
  AuthService,
  Router
} from "./chunk-KZU2HTPH.js";
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
  ChangeDetectorRef,
  CommonModule,
  DecimalPipe,
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
function DashboardComponent_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.ultimaActualizacion, " ");
  }
}
function DashboardComponent_option_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
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
function DashboardComponent_option_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
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
function DashboardComponent_option_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
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
function DashboardComponent_option_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
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
function DashboardComponent_option_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
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
function DashboardComponent_option_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
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
function DashboardComponent_option_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
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
function DashboardComponent_div_81_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
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
function DashboardComponent_div_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "label");
    \u0275\u0275text(2, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 23);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_div_81_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.filtroMesaId, $event) || (ctx_r1.filtroMesaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function DashboardComponent_div_81_Template_select_change_3_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onMesaChange());
    });
    \u0275\u0275elementStart(4, "option", 24);
    \u0275\u0275text(5, "Todas");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DashboardComponent_div_81_option_6_Template, 2, 3, "option", 25);
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
function DashboardComponent_div_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50)(2, "div", 51);
    \u0275\u0275text(3, "\u{1F5F3}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 52)(5, "span", 53);
    \u0275\u0275text(6, "Total Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 54);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 55)(11, "div", 51);
    \u0275\u0275text(12, "\u274C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 52)(14, "span", 53);
    \u0275\u0275text(15, "Votos Nulos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 54);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 56)(20, "div", 51);
    \u0275\u0275text(21, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 52)(23, "span", 53);
    \u0275\u0275text(24, "Mesas Totales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 54);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 57);
    \u0275\u0275listener("click", function DashboardComponent_div_82_Template_div_click_27_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.verMesasCerradas());
    });
    \u0275\u0275elementStart(28, "div", 51);
    \u0275\u0275text(29, "\u{1F512}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 52)(31, "span", 53);
    \u0275\u0275text(32, "Mesas Cerradas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 54);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 58);
    \u0275\u0275element(36, "div", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 60)(38, "div", 51);
    \u0275\u0275text(39, "\u{1F4C8}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 52)(41, "span", 53);
    \u0275\u0275text(42, "Progreso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span", 54);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 58);
    \u0275\u0275element(47, "div", 61);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 9, ctx_r1.dashboard.totalVotos));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 11, ctx_r1.dashboard.totalVotosNulos));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.dashboard.totalMesas);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.dashboard.mesasCerradas);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.dashboard.porcentajeMesasCerradas, "%");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(45, 13, ctx_r1.dashboard.porcentajeMesasCerradas, "1.1-1"), "%");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r1.dashboard.porcentajeMesasCerradas, "%");
  }
}
function DashboardComponent_tr_144_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 62);
    \u0275\u0275listener("click", function DashboardComponent_tr_144_Template_tr_click_0_listener() {
      const r_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(r_r14.candidatoId !== 0 && ctx_r1.verDetalleCandidato(r_r14.candidatoId));
    });
    \u0275\u0275elementStart(1, "td")(2, "div", 63)(3, "span", 64);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 65);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td")(8, "span", 66);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 67)(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 67)(17, "span", 68);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r14 = ctx.$implicit;
    const i_r15 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.getRowClass(r_r14));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getRankClass(r_r14));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getRankLabel(r_r14, i_r15));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r14.nombreCompleto);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r14.partidoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r14.cargoNombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 10, r_r14.totalVotos));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(19, 12, r_r14.porcentaje, "1.1-1"), "%");
  }
}
function DashboardComponent_tr_145_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 69);
    \u0275\u0275text(2, "No hay resultados disponibles");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_146_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275listener("click", function DashboardComponent_div_146_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleFullscreen("none"));
    });
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_147_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 71);
  }
}
function DashboardComponent_div_148_h5_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h5");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4CA} ", ctx_r1.detalleCandidato.nombreCompleto, "");
  }
}
function DashboardComponent_div_148_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "div", 82)(2, "span", 83);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_148_div_8_li_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 90);
    \u0275\u0275listener("click", function DashboardComponent_div_148_div_8_li_18_Template_li_click_0_listener() {
      const tab_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.geoDetalleTab = tab_r19.key);
    });
    \u0275\u0275elementStart(1, "a", 91);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tab_r19 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.geoDetalleTab === tab_r19.key);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.geoDetalleTab === tab_r19.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", tab_r19.label, " (", tab_r19.count, ")");
  }
}
function DashboardComponent_div_148_div_8_div_19_tr_16_Template(rf, ctx) {
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
    \u0275\u0275elementStart(10, "td", 67)(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const v_r20 = ctx.$implicit;
    const i_r21 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r21 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r20.mesaNumero);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r20.institucion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r20.parroquia);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 5, v_r20.votos));
  }
}
function DashboardComponent_div_148_div_8_div_19_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 96);
    \u0275\u0275text(2, "Sin votos registrados");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_148_div_8_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92)(1, "div", 93)(2, "table", 94)(3, "thead")(4, "tr")(5, "th");
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
    \u0275\u0275elementStart(13, "th", 67);
    \u0275\u0275text(14, "Votos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275template(16, DashboardComponent_div_148_div_8_div_19_tr_16_Template, 14, 7, "tr", 95)(17, DashboardComponent_div_148_div_8_div_19_tr_17_Template, 3, 0, "tr", 43);
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
function DashboardComponent_div_148_div_8_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275element(1, "geo-group-table", 97);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r1.detalleCandidato.zonas)("title", "Zona");
  }
}
function DashboardComponent_div_148_div_8_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275element(1, "geo-group-table", 97);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r1.detalleCandidato.provincias)("title", "Provincia");
  }
}
function DashboardComponent_div_148_div_8_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275element(1, "geo-group-table", 97);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r1.detalleCandidato.cantones)("title", "Cant\xF3n");
  }
}
function DashboardComponent_div_148_div_8_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275element(1, "geo-group-table", 97);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r1.detalleCandidato.parroquias)("title", "Parroquia");
  }
}
function DashboardComponent_div_148_div_8_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275element(1, "geo-group-table", 97);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r1.detalleCandidato.instituciones)("title", "Instituci\xF3n");
  }
}
function DashboardComponent_div_148_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 84)(2, "div", 85)(3, "span")(4, "strong");
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
    \u0275\u0275elementStart(14, "span", 86);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "ul", 87);
    \u0275\u0275template(18, DashboardComponent_div_148_div_8_li_18_Template, 3, 6, "li", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, DashboardComponent_div_148_div_8_div_19_Template, 18, 2, "div", 89)(20, DashboardComponent_div_148_div_8_div_20_Template, 2, 2, "div", 89)(21, DashboardComponent_div_148_div_8_div_21_Template, 2, 2, "div", 89)(22, DashboardComponent_div_148_div_8_div_22_Template, 2, 2, "div", 89)(23, DashboardComponent_div_148_div_8_div_23_Template, 2, 2, "div", 89)(24, DashboardComponent_div_148_div_8_div_24_Template, 2, 2, "div", 89);
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
function DashboardComponent_div_148_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 73)(2, "div", 74)(3, "div", 75);
    \u0275\u0275template(4, DashboardComponent_div_148_h5_4_Template, 2, 1, "h5", 43);
    \u0275\u0275elementStart(5, "button", 76);
    \u0275\u0275listener("click", function DashboardComponent_div_148_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarDetalle());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 77);
    \u0275\u0275template(7, DashboardComponent_div_148_div_7_Template, 4, 0, "div", 78)(8, DashboardComponent_div_148_div_8_Template, 25, 12, "div", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 79)(10, "button", 80);
    \u0275\u0275listener("click", function DashboardComponent_div_148_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r17);
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
function DashboardComponent_div_149_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 71);
  }
}
function DashboardComponent_div_150_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "div", 82)(2, "span", 83);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_150_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101);
    \u0275\u0275text(1, " No hay mesas cerradas ");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_150_div_10_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 104);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 104);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 67)(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 103)(17, "button", 105);
    \u0275\u0275listener("click", function DashboardComponent_div_150_div_10_tr_21_Template_button_click_17_listener() {
      const m_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.descargarActa(m_r24.id));
    });
    \u0275\u0275element(18, "i", 106);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 103)(20, "button", 107);
    \u0275\u0275listener("click", function DashboardComponent_div_150_div_10_tr_21_Template_button_click_20_listener() {
      const m_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmarReabrirMesa(m_r24));
    });
    \u0275\u0275element(21, "i", 108);
    \u0275\u0275text(22, " Reabrir ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r24 = ctx.$implicit;
    const i_r25 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r25 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r24.numero);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r24.sexo);
    \u0275\u0275advance();
    \u0275\u0275property("title", m_r24.institucionNombre);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r24.institucionNombre);
    \u0275\u0275advance();
    \u0275\u0275property("title", m_r24.parroquiaNombre);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r24.parroquiaNombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 8, m_r24.totalVotos));
  }
}
function DashboardComponent_div_150_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "table", 94)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Mesa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Sexo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 102);
    \u0275\u0275text(11, "Instituci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 102);
    \u0275\u0275text(13, "Parroquia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 67);
    \u0275\u0275text(15, "Votos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 103);
    \u0275\u0275text(17, "Acta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 103);
    \u0275\u0275text(19, "Acci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275template(21, DashboardComponent_div_150_div_10_tr_21_Template, 23, 10, "tr", 95);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r1.mesasCerradasList);
  }
}
function DashboardComponent_div_150_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 98)(2, "div", 74)(3, "div", 75)(4, "h5");
    \u0275\u0275text(5, "\u{1F512} Mesas Cerradas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 76);
    \u0275\u0275listener("click", function DashboardComponent_div_150_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarMesasCerradas());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 77);
    \u0275\u0275template(8, DashboardComponent_div_150_div_8_Template, 4, 0, "div", 78)(9, DashboardComponent_div_150_div_9_Template, 2, 0, "div", 99)(10, DashboardComponent_div_150_div_10_Template, 22, 1, "div", 100);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 79)(12, "button", 80);
    \u0275\u0275listener("click", function DashboardComponent_div_150_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarMesasCerradas());
    });
    \u0275\u0275text(13, "Cerrar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r1.mesasCerradasLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.mesasCerradasLoading && ctx_r1.mesasCerradasList.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.mesasCerradasLoading && ctx_r1.mesasCerradasList.length > 0);
  }
}
function DashboardComponent_div_151_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 71);
  }
}
function DashboardComponent_div_152_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.reabrirError);
  }
}
function DashboardComponent_div_152_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 109)(2, "div", 74)(3, "div", 75)(4, "h5");
    \u0275\u0275text(5, "Confirmar contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 76);
    \u0275\u0275listener("click", function DashboardComponent_div_152_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarReabrir());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 77)(8, "p");
    \u0275\u0275text(9, "Ingrese su contrase\xF1a para reabrir la mesa ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, ":");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 110);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_div_152_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.reabrirPassword, $event) || (ctx_r1.reabrirPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function DashboardComponent_div_152_Template_input_keyup_enter_13_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ejecutarReabrir());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, DashboardComponent_div_152_div_14_Template, 2, 1, "div", 111);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 79)(16, "button", 80);
    \u0275\u0275listener("click", function DashboardComponent_div_152_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarReabrir());
    });
    \u0275\u0275text(17, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 112);
    \u0275\u0275listener("click", function DashboardComponent_div_152_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r26);
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
    this.top3Cargos = /* @__PURE__ */ new Map();
    const user = this.authService.getCurrentUser();
    this.userRole = user?.rol || "";
  }
  toggleMinimize(card) {
    if (card === "barChart")
      this.barChartMinimized = !this.barChartMinimized;
    else if (card === "pieChart")
      this.pieChartMinimized = !this.pieChartMinimized;
    else if (card === "resultados")
      this.resultadosMinimized = !this.resultadosMinimized;
  }
  toggleFullscreen(card) {
    const activating = card === "barChart" ? !this.barChartFullscreen : card === "pieChart" ? !this.pieChartFullscreen : !this.resultadosFullscreen;
    this.barChartFullscreen = false;
    this.pieChartFullscreen = false;
    this.resultadosFullscreen = false;
    if (activating) {
      if (card === "barChart")
        this.barChartFullscreen = true;
      else if (card === "pieChart")
        this.pieChartFullscreen = true;
      else if (card === "resultados")
        this.resultadosFullscreen = true;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setTimeout(() => {
      this.barChart?.resize();
      this.pieChart?.resize();
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
      }
    });
  }
  procesarResultados(data) {
    const resultados = [...data.resultados || []];
    const totalVotosNulos = data.totalVotosNulos || 0;
    if (totalVotosNulos > 0) {
      const totalGeneral = data.totalVotos + totalVotosNulos;
      resultados.push({
        candidatoId: 0,
        nombreCompleto: "Votos Nulos",
        partidoNombre: "\u2014",
        cargoNombre: "\u2014",
        totalVotos: totalVotosNulos,
        porcentaje: totalGeneral > 0 ? Math.round(totalVotosNulos * 1e4 / totalGeneral) / 100 : 0
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
      this.updateCharts();
    }, 100);
  }
  loadDataComplete() {
    this.updateCharts();
    this.ultimaActualizacion = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  }
  ngOnDestroy() {
    this.wsSubscription?.unsubscribe();
    this.barChart?.destroy();
    this.pieChart?.destroy();
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
    this.wsSubscription = this.wsService.subscribeToResultados(this.selectedEleccionId).pipe(catchError((err) => {
      console.warn("WebSocket error:", err);
      return of(null);
    })).subscribe((data) => {
      if (data) {
        this.dashboard = data;
        this.procesarResultados(data);
        this.ordenarResultados();
        this.loadDataComplete();
      }
    });
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
      if (r.candidatoId === 0)
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
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter((x) => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0)].sort((a, b) => b.totalVotos - a.totalVotos).findIndex((x) => x.nombreCompleto === r.nombreCompleto);
      return "candidato-row top-" + (idx + 1);
    }
    return "candidato-row";
  }
  getRankClass(r) {
    if (r.candidatoId === 0)
      return "candidato-rank rank-nulos";
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter((x) => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0)].sort((a, b) => b.totalVotos - a.totalVotos).findIndex((x) => x.nombreCompleto === r.nombreCompleto);
      return "candidato-rank rank-top-" + (idx + 1);
    }
    return "candidato-rank";
  }
  getRankLabel(r, i) {
    if (r.candidatoId === 0)
      return "\u2717";
    const topSet = this.top3Cargos.get(r.cargoNombre);
    if (topSet?.has(r.nombreCompleto)) {
      const idx = [...this.resultadosOrdenados.filter((x) => x.cargoNombre === r.cargoNombre && x.candidatoId !== 0)].sort((a, b) => b.totalVotos - a.totalVotos).findIndex((x) => x.nombreCompleto === r.nombreCompleto);
      return ["\u{1F947}", "\u{1F948}", "\u{1F949}"][idx] || (i + 1).toString();
    }
    return (i + 1).toString();
  }
  getSortIcon(col) {
    if (this.sortColumn !== col)
      return "\u21C5";
    return this.sortDirection === "asc" ? "\u2191" : "\u2193";
  }
  initCharts() {
    if (this.barChartRef?.nativeElement) {
      if (this.barChart)
        this.barChart.destroy();
      this.barChart = new Chart(this.barChartRef.nativeElement, {
        type: "bar",
        data: { labels: [], datasets: [] },
        options: { responsive: true, animation: false, plugins: { legend: { display: false } } }
      });
    }
    if (this.pieChartRef?.nativeElement) {
      if (this.pieChart)
        this.pieChart.destroy();
      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: "pie",
        data: { labels: [], datasets: [] },
        options: { responsive: true, animation: false, plugins: { legend: { position: "bottom" } } }
      });
    }
  }
  updateCharts() {
    if (!this.dashboard?.resultados)
      return;
    const resultados = this.dashboard.resultados;
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];
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
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.barChartRef = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.pieChartRef = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 153, vars: 90, consts: [["barChart", ""], ["pieChart", ""], [1, "dashboard-container"], [1, "dashboard-header"], [1, "header-left"], [1, "header-icon"], [1, "header-badges"], [1, "eleccion-badge"], [1, "live-badge", "active"], [1, "live-dot"], ["class", "update-time", 4, "ngIf"], [1, "header-actions"], ["title", "Exportar a Excel", 1, "btn", "btn-excel", 3, "click"], ["title", "Exportar a PDF", 1, "btn", "btn-pdf", 3, "click"], [1, "btn", "btn-refresh", 3, "click"], [1, "filtros-card"], [1, "filtros-header"], [1, "filtros-title"], [1, "card-buttons"], [1, "btn", "btn-clean", 3, "click"], [1, "btn-card-action", 3, "click", "title"], [1, "filtros-grid"], [1, "filtro-group"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-select", 3, "ngModelChange", "change", "ngModel", "disabled"], ["class", "filtro-group", 4, "ngIf"], ["class", "stats-grid", 4, "ngIf"], [1, "charts-grid"], [1, "chart-card"], [1, "card-header-actions"], ["title", "Pantalla completa", 1, "btn-card-action", 3, "click"], [1, "card-body"], [1, "table-card"], [1, "table-header"], [1, "table-count"], [1, "table-wrapper"], [1, "table-moderno"], [1, "sortable", 3, "click"], [1, "sort-icon"], [1, "sortable", "text-right", 3, "click"], [3, "class", "click", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "fullscreen-backdrop", 3, "click", 4, "ngIf"], ["class", "modal-backdrop show", 4, "ngIf"], ["class", "modal show", "style", "display:block;", 4, "ngIf"], [1, "update-time"], [3, "value"], [1, "stats-grid"], [1, "stat-card", "stat-votos"], [1, "stat-icon"], [1, "stat-info"], [1, "stat-label"], [1, "stat-value"], [1, "stat-card", "stat-nulos"], [1, "stat-card", "stat-mesas"], ["title", "Ver detalle de mesas cerradas", 1, "stat-card", "stat-cerradas", 2, "cursor", "pointer", 3, "click"], [1, "stat-bar"], [1, "stat-bar-fill"], [1, "stat-card", "stat-progreso"], [1, "stat-bar-fill", "progress-fill"], [3, "click"], [1, "candidato-info-cell"], [1, "candidato-rank"], [1, "candidato-name"], [1, "partido-badge"], [1, "text-right"], [1, "porcentaje-badge"], ["colspan", "5", 1, "text-center", "empty-msg"], [1, "fullscreen-backdrop", 3, "click"], [1, "modal-backdrop", "show"], [1, "modal", "show", 2, "display", "block"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], ["class", "text-center py-4", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "text-center", "py-4"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "detalle-header"], [1, "detalle-info"], [1, "detalle-total"], ["id", "detalleTabs", 1, "nav", "nav-tabs", "detalle-tabs"], ["class", "nav-item", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "detalle-tab-content", 4, "ngIf"], [1, "nav-item", 3, "click"], [1, "nav-link"], [1, "detalle-tab-content"], [1, "detalle-tabla-wrapper"], [1, "table", "table-striped"], [4, "ngFor", "ngForOf"], ["colspan", "5", 1, "text-center", "py-3"], [3, "items", "title"], [1, "modal-dialog", "modal-lg", "modal-dialog-scrollable"], ["class", "text-center py-4 text-muted", 4, "ngIf"], ["class", "detalle-tabla-wrapper", 4, "ngIf"], [1, "text-center", "py-4", "text-muted"], [1, "col-text-wrap"], [1, "text-center"], [1, "col-text-wrap", 3, "title"], ["title", "Descargar acta", 1, "btn-card-action", 3, "click"], [1, "bi", "bi-filetype-pdf", 2, "color", "#ef4444", "font-size", "16px"], ["title", "Reabrir mesa", 1, "btn-reabrir", 3, "click"], [1, "bi", "bi-unlock", 2, "font-size", "16px"], [1, "modal-dialog", "modal-sm", "modal-dialog-centered"], ["type", "password", "placeholder", "Contrase\xF1a", "autofocus", "", 1, "form-control", 3, "ngModelChange", "keyup.enter", "ngModel"], ["class", "text-danger mt-2 small", 4, "ngIf"], [1, "btn", "btn-warning", 3, "click", "disabled"], [1, "text-danger", "mt-2", "small"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "h1")(4, "span", 5);
        \u0275\u0275text(5, "\u{1F4CA}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Dashboard Electoral");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 6)(8, "span", 7);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span", 8);
        \u0275\u0275element(11, "span", 9);
        \u0275\u0275text(12, " EN VIVO ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, DashboardComponent_span_13_Template, 2, 1, "span", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 11)(15, "button", 12);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_15_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.exportarExcel());
        });
        \u0275\u0275text(16, "\u{1F4CA} Excel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "button", 13);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_17_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.exportarPdf());
        });
        \u0275\u0275text(18, "\u{1F4C4} PDF");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "button", 14);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_19_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.recargarSilencioso());
        });
        \u0275\u0275text(20, "\u21BB");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "div", 15)(22, "div", 16)(23, "div", 17)(24, "h3");
        \u0275\u0275text(25, "\u{1F50D} Filtros de B\xFAsqueda");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 18)(27, "button", 19);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_27_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.limpiarFiltros());
        });
        \u0275\u0275text(28, "Limpiar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "button", 20);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_29_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.filtrosMinimized = !ctx.filtrosMinimized);
        });
        \u0275\u0275element(30, "i");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(31, "div", 21)(32, "div", 22)(33, "label");
        \u0275\u0275text(34, "Zona");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "select", 23);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_35_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroZonaId, $event) || (ctx.filtroZonaId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_35_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onZonaChange());
        });
        \u0275\u0275elementStart(36, "option", 24);
        \u0275\u0275text(37, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(38, DashboardComponent_option_38_Template, 2, 2, "option", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "div", 22)(40, "label");
        \u0275\u0275text(41, "Provincia");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "select", 26);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_42_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroProvinciaId, $event) || (ctx.filtroProvinciaId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_42_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onProvinciaChange());
        });
        \u0275\u0275elementStart(43, "option", 24);
        \u0275\u0275text(44, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(45, DashboardComponent_option_45_Template, 2, 2, "option", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(46, "div", 22)(47, "label");
        \u0275\u0275text(48, "Cant\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "select", 26);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_49_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroCantonId, $event) || (ctx.filtroCantonId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_49_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onCantonChange());
        });
        \u0275\u0275elementStart(50, "option", 24);
        \u0275\u0275text(51, "Todos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(52, DashboardComponent_option_52_Template, 2, 2, "option", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(53, "div", 22)(54, "label");
        \u0275\u0275text(55, "Parroquia");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "select", 26);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_56_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroParroquiaId, $event) || (ctx.filtroParroquiaId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_56_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onParroquiaChange());
        });
        \u0275\u0275elementStart(57, "option", 24);
        \u0275\u0275text(58, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(59, DashboardComponent_option_59_Template, 2, 2, "option", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(60, "div", 22)(61, "label");
        \u0275\u0275text(62, "Instituci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "select", 26);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_63_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroInstitucionId, $event) || (ctx.filtroInstitucionId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_63_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onInstitucionChange());
        });
        \u0275\u0275elementStart(64, "option", 24);
        \u0275\u0275text(65, "Todas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(66, DashboardComponent_option_66_Template, 2, 2, "option", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(67, "div", 22)(68, "label");
        \u0275\u0275text(69, "Cargo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "select", 23);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_70_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroCargoId, $event) || (ctx.filtroCargoId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_70_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.aplicarFiltros());
        });
        \u0275\u0275elementStart(71, "option", 24);
        \u0275\u0275text(72, "Todos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(73, DashboardComponent_option_73_Template, 2, 2, "option", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(74, "div", 22)(75, "label");
        \u0275\u0275text(76, "Partido");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "select", 23);
        \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_select_ngModelChange_77_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.filtroPartidoId, $event) || (ctx.filtroPartidoId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function DashboardComponent_Template_select_change_77_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.aplicarFiltros());
        });
        \u0275\u0275elementStart(78, "option", 24);
        \u0275\u0275text(79, "Todos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(80, DashboardComponent_option_80_Template, 2, 2, "option", 25);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(81, DashboardComponent_div_81_Template, 7, 3, "div", 27);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(82, DashboardComponent_div_82_Template, 48, 16, "div", 28);
        \u0275\u0275elementStart(83, "div", 29)(84, "div", 30)(85, "div", 31)(86, "h3");
        \u0275\u0275text(87, "\u{1F4CA} Votos por Candidato");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(88, "div", 18)(89, "button", 20);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_89_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleMinimize("barChart"));
        });
        \u0275\u0275element(90, "i");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(91, "button", 32);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_91_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleFullscreen("barChart"));
        });
        \u0275\u0275element(92, "i");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(93, "div", 33);
        \u0275\u0275element(94, "canvas", null, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(96, "div", 30)(97, "div", 31)(98, "h3");
        \u0275\u0275text(99, "\u{1F967} Distribuci\xF3n de Votos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(100, "div", 18)(101, "button", 20);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_101_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleMinimize("pieChart"));
        });
        \u0275\u0275element(102, "i");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(103, "button", 32);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_103_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleFullscreen("pieChart"));
        });
        \u0275\u0275element(104, "i");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(105, "div", 33);
        \u0275\u0275element(106, "canvas", null, 1);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(108, "div", 34)(109, "div", 35)(110, "h3");
        \u0275\u0275text(111, "\u{1F4CB} Resultados por Candidato");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "div", 18)(113, "span", 36);
        \u0275\u0275text(114);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(115, "button", 20);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_115_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleMinimize("resultados"));
        });
        \u0275\u0275element(116, "i");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(117, "button", 32);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_117_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleFullscreen("resultados"));
        });
        \u0275\u0275element(118, "i");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(119, "div", 37)(120, "table", 38)(121, "thead")(122, "tr")(123, "th", 39);
        \u0275\u0275listener("click", function DashboardComponent_Template_th_click_123_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.setSortColumn("nombreCompleto"));
        });
        \u0275\u0275text(124, " Candidato ");
        \u0275\u0275elementStart(125, "span", 40);
        \u0275\u0275text(126);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(127, "th", 39);
        \u0275\u0275listener("click", function DashboardComponent_Template_th_click_127_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.setSortColumn("partidoNombre"));
        });
        \u0275\u0275text(128, " Partido ");
        \u0275\u0275elementStart(129, "span", 40);
        \u0275\u0275text(130);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(131, "th", 39);
        \u0275\u0275listener("click", function DashboardComponent_Template_th_click_131_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.setSortColumn("cargoNombre"));
        });
        \u0275\u0275text(132, " Cargo ");
        \u0275\u0275elementStart(133, "span", 40);
        \u0275\u0275text(134);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(135, "th", 41);
        \u0275\u0275listener("click", function DashboardComponent_Template_th_click_135_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.setSortColumn("votos"));
        });
        \u0275\u0275text(136, " Votos ");
        \u0275\u0275elementStart(137, "span", 40);
        \u0275\u0275text(138);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(139, "th", 41);
        \u0275\u0275listener("click", function DashboardComponent_Template_th_click_139_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.setSortColumn("porcentaje"));
        });
        \u0275\u0275text(140, " % ");
        \u0275\u0275elementStart(141, "span", 40);
        \u0275\u0275text(142);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(143, "tbody");
        \u0275\u0275template(144, DashboardComponent_tr_144_Template, 20, 15, "tr", 42)(145, DashboardComponent_tr_145_Template, 3, 0, "tr", 43);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(146, DashboardComponent_div_146_Template, 1, 0, "div", 44)(147, DashboardComponent_div_147_Template, 1, 0, "div", 45)(148, DashboardComponent_div_148_Template, 12, 3, "div", 46)(149, DashboardComponent_div_149_Template, 1, 0, "div", 45)(150, DashboardComponent_div_150_Template, 14, 3, "div", 46)(151, DashboardComponent_div_151_Template, 1, 0, "div", 45)(152, DashboardComponent_div_152_Template, 20, 5, "div", 46);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.eleccionNombre);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.ultimaActualizacion);
        \u0275\u0275advance(16);
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
        \u0275\u0275advance(5);
        \u0275\u0275property("title", ctx.barChartMinimized ? "Expandir" : "Minimizar");
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.barChartMinimized ? "bi bi-plus" : "bi bi-dash");
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.barChartFullscreen ? "bi bi-fullscreen-exit" : "bi bi-arrows-angle-expand");
        \u0275\u0275advance();
        \u0275\u0275classProp("hidden", ctx.barChartMinimized);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("minimized", ctx.pieChartMinimized)("fullscreen", ctx.pieChartFullscreen)("dimmed", ctx.barChartFullscreen || ctx.resultadosFullscreen);
        \u0275\u0275advance(5);
        \u0275\u0275property("title", ctx.pieChartMinimized ? "Expandir" : "Minimizar");
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.pieChartMinimized ? "bi bi-plus" : "bi bi-dash");
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.pieChartFullscreen ? "bi bi-fullscreen-exit" : "bi bi-arrows-angle-expand");
        \u0275\u0275advance();
        \u0275\u0275classProp("hidden", ctx.pieChartMinimized);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("minimized", ctx.resultadosMinimized)("fullscreen", ctx.resultadosFullscreen)("dimmed", ctx.barChartFullscreen || ctx.pieChartFullscreen);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1("", ctx.resultados.length, " candidatos");
        \u0275\u0275advance();
        \u0275\u0275property("title", ctx.resultadosMinimized ? "Expandir" : "Minimizar");
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.resultadosMinimized ? "bi bi-plus" : "bi bi-dash");
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.resultadosFullscreen ? "bi bi-fullscreen-exit" : "bi bi-arrows-angle-expand");
        \u0275\u0275advance();
        \u0275\u0275classProp("hidden", ctx.resultadosMinimized);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.getSortIcon("nombreCompleto"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.getSortIcon("partidoNombre"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.getSortIcon("cargoNombre"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.getSortIcon("votos"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.getSortIcon("porcentaje"));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.resultadosOrdenados);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.resultadosOrdenados.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.barChartFullscreen || ctx.pieChartFullscreen || ctx.resultadosFullscreen);
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
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, GeoGroupTableComponent], styles: ['\n\n.dashboard-container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 24px;\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 24px;\n}\n.header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 700;\n  margin: 0 0 8px 0;\n  color: #0f172a;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.header-badges[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.eleccion-badge[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  padding: 4px 14px;\n  border-radius: 20px;\n  font-size: 13px;\n  font-weight: 500;\n}\n.live-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  background: #f1f5f9;\n  color: #64748b;\n  border: 1px solid #e2e8f0;\n}\n.live-badge.active[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n  border-color: #86efac;\n}\n.live-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #94a3b8;\n  transition: all 0.3s;\n}\n.live-badge.active[_ngcontent-%COMP%]   .live-dot[_ngcontent-%COMP%] {\n  background: #16a34a;\n  animation: _ngcontent-%COMP%_pulse-dot 2s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);\n  }\n  50% {\n    opacity: 0.7;\n    box-shadow: 0 0 0 4px rgba(22, 163, 74, 0);\n  }\n}\n.update-time[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.btn-refresh[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border: 1px solid #e2e8f0;\n  background: white;\n  border-radius: 10px;\n  font-size: 18px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  color: #64748b;\n}\n.btn-refresh[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n  color: #3b82f6;\n  border-color: #3b82f6;\n}\n.filtros-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 20px 24px;\n  margin-bottom: 24px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f1f5f9;\n}\n.filtros-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.filtros-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.filtros-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: #0f172a;\n}\n.btn-clean[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  border: 1px solid #e2e8f0;\n  background: white;\n  border-radius: 8px;\n  color: #64748b;\n  font-size: 13px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-clean[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n  color: #ef4444;\n  border-color: #fca5a5;\n}\n.filtros-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n  overflow: hidden;\n  transition:\n    max-height 0.35s ease,\n    opacity 0.35s ease,\n    margin 0.35s ease;\n  max-height: 200px;\n  opacity: 1;\n  margin-top: 16px;\n}\n.filtros-grid.hidden[_ngcontent-%COMP%] {\n  max-height: 0;\n  opacity: 0;\n  margin-top: 0;\n  pointer-events: none;\n}\n.filtro-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.filtro-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin: 0;\n}\n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 7px 10px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 13px;\n  background: #fafafa;\n  transition: all 0.2s;\n  cursor: pointer;\n}\n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  background: white;\n}\n.form-select[_ngcontent-%COMP%]:disabled {\n  background: #f1f5f9;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 14px 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f1f5f9;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);\n}\n.stat-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n}\n.stat-votos[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6,\n      #6366f1);\n}\n.stat-nulos[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #dc2626,\n      #ef4444);\n}\n.stat-mesas[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #f59e0b,\n      #f97316);\n}\n.stat-cerradas[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #ef4444,\n      #dc2626);\n}\n.stat-progreso[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #10b981,\n      #059669);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  line-height: 1;\n}\n.stat-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #64748b;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: #0f172a;\n  line-height: 1.1;\n}\n.stat-trend[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  font-size: 10px;\n  font-weight: 600;\n  padding: 1px 6px;\n  border-radius: 4px;\n}\n.stat-trend.up[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n}\n.stat-bar[_ngcontent-%COMP%] {\n  height: 4px;\n  background: #f1f5f9;\n  border-radius: 2px;\n  overflow: hidden;\n  margin-top: 2px;\n}\n.stat-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6,\n      #6366f1);\n  transition: width 0.8s ease;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #10b981,\n      #059669);\n}\n.charts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  margin-bottom: 24px;\n  transition: all 0.3s;\n}\n.charts-grid.fullscreen-mode[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.chart-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f1f5f9;\n  transition: all 0.3s;\n  position: relative;\n}\n.chart-card.minimized[_ngcontent-%COMP%] {\n  padding-bottom: 12px;\n}\n.chart-card.minimized[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  display: none;\n}\n.chart-card.minimized[_ngcontent-%COMP%]   .card-header-actions[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.chart-card.dimmed[_ngcontent-%COMP%] {\n  visibility: hidden;\n  height: 0;\n  min-height: 0;\n  padding: 0 20px;\n  margin: 0;\n  border: none;\n  overflow: hidden;\n}\n.chart-card.fullscreen[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  left: 20px;\n  right: 20px;\n  bottom: 20px;\n  z-index: 1050;\n  padding: 24px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  border-color: #3b82f6;\n  display: flex;\n  flex-direction: column;\n  visibility: visible;\n  height: auto;\n  min-height: auto;\n  margin: 0;\n}\n.chart-card.fullscreen[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n}\n.chart-card.fullscreen[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n  max-height: calc(100vh - 160px);\n}\n.chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 0;\n  color: #0f172a;\n}\n.card-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.card-header-actions[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.card-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn-card-action[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border: none;\n  background: #f1f5f9;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #64748b;\n  transition: all 0.2s;\n  font-size: 14px;\n}\n.btn-card-action[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n  color: #0f172a;\n}\n.col-text-wrap[_ngcontent-%COMP%] {\n  word-break: break-word;\n  max-width: 200px;\n}\n.btn-reabrir[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border: 1px solid #fbbf24;\n  background: #fffbeb;\n  color: #b45309;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-reabrir[_ngcontent-%COMP%]:hover {\n  background: #fef3c7;\n  border-color: #f59e0b;\n}\n.card-body[_ngcontent-%COMP%] {\n  transition: all 0.3s;\n}\n.card-body.hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n.table-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f1f5f9;\n  overflow: hidden;\n  transition: all 0.3s;\n}\n.table-card.minimized[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%] {\n  display: none;\n}\n.table-card.dimmed[_ngcontent-%COMP%] {\n  visibility: hidden;\n  height: 0;\n  min-height: 0;\n  padding: 0 24px;\n  margin: 0;\n  border: none;\n  overflow: hidden;\n}\n.table-card.fullscreen[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  left: 20px;\n  right: 20px;\n  bottom: 20px;\n  z-index: 1050;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  border-color: #3b82f6;\n  visibility: visible;\n  height: auto;\n  min-height: auto;\n  margin: 0;\n}\n.table-card.fullscreen[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n}\n.table-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px 16px;\n}\n.table-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  color: #0f172a;\n}\n.table-count[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #94a3b8;\n  background: #f1f5f9;\n  padding: 2px 10px;\n  border-radius: 12px;\n  margin-right: 6px;\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  padding: 0 24px 20px;\n}\n.table-wrapper.hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n.table-moderno[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n}\n.table-moderno[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 12px;\n  font-size: 12px;\n  font-weight: 700;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 2px solid #f1f5f9;\n  background: #fafafa;\n  white-space: nowrap;\n}\n.table-moderno[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child {\n  border-radius: 10px 0 0 0;\n}\n.table-moderno[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 10px 0 0;\n}\n.table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 12px;\n  border-bottom: 1px solid #f1f5f9;\n  font-size: 14px;\n  color: #334155;\n  vertical-align: middle;\n}\n.table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: background 0.2s;\n}\n.table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n}\n.table-moderno[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s;\n}\n.sortable[_ngcontent-%COMP%]:hover {\n  color: #3b82f6;\n}\n.sort-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin-left: 4px;\n  opacity: 0.5;\n  display: inline-block;\n}\n.sortable[_ngcontent-%COMP%]:hover   .sort-icon[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.candidato-info-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.candidato-rank[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #f1f5f9;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n  color: #64748b;\n  flex-shrink: 0;\n}\n.candidato-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n}\n.partido-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 12px;\n  background: #eff6ff;\n  color: #3b82f6;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n}\n.porcentaje-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  background: #f0fdf4;\n  color: #16a34a;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 600;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  padding: 40px !important;\n  color: #94a3b8;\n  font-size: 15px;\n}\n.candidato-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.candidato-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #eef2ff !important;\n}\n.top-1[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: #fefce8 !important;\n}\n.top-1[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #fef9c3 !important;\n}\n.top-2[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: #f8fafc !important;\n}\n.top-2[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #f1f5f9 !important;\n}\n.top-3[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: #fff7ed !important;\n}\n.top-3[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #ffedd5 !important;\n}\n.rank-top-1[_ngcontent-%COMP%] {\n  background: #fbbf24 !important;\n  color: #78350f !important;\n}\n.rank-top-2[_ngcontent-%COMP%] {\n  background: #e2e8f0 !important;\n  color: #334155 !important;\n}\n.rank-top-3[_ngcontent-%COMP%] {\n  background: #fdba74 !important;\n  color: #7c2d12 !important;\n}\n.rank-nulos[_ngcontent-%COMP%] {\n  background: #fecaca !important;\n  color: #991b1b !important;\n}\n.nulos-row[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.nulos-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: #fef2f2 !important;\n  border-top: 2px dashed #fca5a5;\n}\n.nulos-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #fef2f2 !important;\n}\n.fullscreen-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1049;\n}\n.detalle-header[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-radius: 10px;\n  padding: 16px 20px;\n  margin-bottom: 16px;\n}\n.detalle-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  flex-wrap: wrap;\n}\n.detalle-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #475569;\n}\n.detalle-total[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  font-size: 18px;\n  font-weight: 700;\n}\n.detalle-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  margin-bottom: 16px;\n  border-bottom: 2px solid #e2e8f0;\n  flex-wrap: wrap;\n  padding: 0;\n  list-style: none;\n}\n.detalle-tabs[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.detalle-tabs[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #64748b;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  transition: all 0.2s;\n  white-space: nowrap;\n  display: block;\n  text-decoration: none;\n}\n.detalle-tabs[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  border-bottom-color: #3b82f6;\n}\n.detalle-tabs[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  color: #1d4ed8;\n}\n.detalle-tab-content[_ngcontent-%COMP%] {\n}\n.detalle-tabla-wrapper[_ngcontent-%COMP%] {\n  max-height: 400px;\n  overflow-y: auto;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n}\n.detalle-tabla-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.detalle-tabla-wrapper[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 1;\n}\n@media (max-width: 1100px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .charts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 700px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .dashboard-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .filtros-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "app\\features\\dashboard\\dashboard.component.ts", lineNumber: 23 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-PD7EJY2T.js.map
