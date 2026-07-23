import {
  Chart,
  registerables
} from "./chunk-RWZWOR5Y.js";
import {
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
  DecimalPipe,
  NgForOf,
  NgIf,
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
} from "./chunk-3DSQS3EE.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/reportes/reportes.component.ts
var _c0 = ["barChart"];
var _c1 = ["pieChart"];
function ReportesComponent_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 14);
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
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, "Cargando reportes...");
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
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
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "div", 19);
    \u0275\u0275text(3, "\u{1F5F3}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20)(5, "span", 21);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 22);
    \u0275\u0275text(9, "Total Votos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 18)(11, "div", 23);
    \u0275\u0275text(12, "\u2705");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 20)(14, "span", 21);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 22);
    \u0275\u0275text(17, "Mesas Cerradas");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 18)(19, "div", 24);
    \u0275\u0275text(20, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 20)(22, "span", 21);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 22);
    \u0275\u0275text(25, "Participaci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 18)(27, "div", 25);
    \u0275\u0275text(28, "\u{1F464}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 20)(30, "span", 21);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 22);
    \u0275\u0275text(33, "Candidatos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 18)(35, "div", 26);
    \u0275\u0275text(36, "\u{1F3AF}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 20)(38, "span", 21);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 22);
    \u0275\u0275text(41, "Partidos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "div", 18)(43, "div", 27);
    \u0275\u0275text(44, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 20)(46, "span", 21);
    \u0275\u0275text(47);
    \u0275\u0275pipe(48, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span", 22);
    \u0275\u0275text(50, "Nulos + Blanco");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 7, ctx_r2.resumen.totalVotos));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate2("", ctx_r2.resumen.mesasCerradas, " / ", ctx_r2.resumen.totalMesas, "");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r2.resumen.participacion, "%");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.resumen.totalCandidatos);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.resumen.totalPartidos);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(48, 9, ctx_r2.resumen.votosNulos + ctx_r2.resumen.votosBlanco));
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
    \u0275\u0275elementStart(9, "td", 31);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 31);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "div", 32);
    \u0275\u0275element(16, "div", 33);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r5 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r4.nombreCompleto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r4.partidoSigla ? c_r4.partidoSigla : c_r4.partido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r4.cargo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 8, c_r4.totalVotos));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", c_r4.porcentaje, "%");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r2.getMaxVotos() > 0 ? c_r4.totalVotos / ctx_r2.getMaxVotos() * 100 : 0, "%");
  }
}
function ReportesComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "h3");
    \u0275\u0275text(2, "Resultados por Candidato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 29)(4, "thead")(5, "tr")(6, "th");
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
    \u0275\u0275template(21, ReportesComponent_div_19_tr_21_Template, 17, 10, "tr", 30);
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
    \u0275\u0275elementStart(9, "td", 31);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 31);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r7 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r6.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r6.sigla);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r6.totalCandidatos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 6, p_r6.totalVotos));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", p_r6.porcentaje, "%");
  }
}
function ReportesComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "h3");
    \u0275\u0275text(2, "Resultados por Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 29)(4, "thead")(5, "tr")(6, "th");
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
    \u0275\u0275template(19, ReportesComponent_div_20_tr_19_Template, 14, 8, "tr", 30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r2.partidos);
  }
}
Chart.register(...registerables);
var ReportesComponent = class _ReportesComponent {
  constructor(api) {
    this.api = api;
    this.elecciones = [];
    this.selectedEleccionId = null;
    this.resumen = null;
    this.candidatos = [];
    this.partidos = [];
    this.loading = false;
    this.error = "";
  }
  ngOnInit() {
    this.cargarElecciones();
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
      },
      complete: () => this.loading = false
    });
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
  static {
    this.\u0275fac = function ReportesComponent_Factory(t) {
      return new (t || _ReportesComponent)(\u0275\u0275directiveInject(ApiService));
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
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 21, vars: 8, consts: [["barChart", ""], ["pieChart", ""], [1, "reportes-container"], [1, "page-header"], [1, "header-controls"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "btn", "btn-success", 3, "click", "disabled"], ["class", "loading", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], ["class", "resumen-grid", 4, "ngIf"], [1, "charts-row"], [1, "chart-card"], ["class", "table-card", 4, "ngIf"], [3, "value"], [1, "loading"], [1, "alert", "alert-error"], [1, "resumen-grid"], [1, "resumen-card"], [1, "card-icon", "votos"], [1, "card-body"], [1, "card-value"], [1, "card-label"], [1, "card-icon", "cerradas"], [1, "card-icon", "participacion"], [1, "card-icon", "candidatos"], [1, "card-icon", "partidos"], [1, "card-icon", "nulos"], [1, "table-card"], [1, "table"], [4, "ngFor", "ngForOf"], [1, "text-right"], [1, "bar-container"], [1, "bar-fill"]], template: function ReportesComponent_Template(rf, ctx) {
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
        \u0275\u0275template(9, ReportesComponent_div_9_Template, 2, 0, "div", 8)(10, ReportesComponent_div_10_Template, 2, 1, "div", 9)(11, ReportesComponent_div_11_Template, 51, 11, "div", 10);
        \u0275\u0275elementStart(12, "div", 11)(13, "div", 12);
        \u0275\u0275element(14, "canvas", null, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 12);
        \u0275\u0275element(17, "canvas", null, 1);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(19, ReportesComponent_div_19_Template, 22, 1, "div", 13)(20, ReportesComponent_div_20_Template, 20, 1, "div", 13);
        \u0275\u0275elementEnd();
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
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.reportes-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 700;\n  color: #1e293b;\n}\n.header-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.form-select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14px;\n  background: white;\n  min-width: 200px;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  border: none;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-success[_ngcontent-%COMP%] {\n  background: #10b981;\n  color: white;\n}\n.btn-success[_ngcontent-%COMP%]:hover {\n  background: #059669;\n}\n.btn-success[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #64748b;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.resumen-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.resumen-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 56px;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 12px;\n}\n.card-icon.votos[_ngcontent-%COMP%] {\n  background: #eef2ff;\n}\n.card-icon.cerradas[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n}\n.card-icon.participacion[_ngcontent-%COMP%] {\n  background: #fffbeb;\n}\n.card-icon.candidatos[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n}\n.card-icon.partidos[_ngcontent-%COMP%] {\n  background: #fdf2f8;\n}\n.card-icon.nulos[_ngcontent-%COMP%] {\n  background: #fef2f2;\n}\n.card-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.card-value[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #1e293b;\n}\n.card-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #64748b;\n  margin-top: 2px;\n}\n.charts-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.chart-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.chart-card[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n  width: 100% !important;\n  max-height: 350px;\n}\n.table-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  margin-bottom: 24px;\n}\n.table-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: 18px;\n  color: #1e293b;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 12px 8px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 2px solid #e2e8f0;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 8px;\n  font-size: 14px;\n  color: #334155;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #f8fafc;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.bar-container[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 8px;\n  background: #e2e8f0;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #4F46E5,\n      #818CF8);\n  border-radius: 4px;\n  transition: width 0.5s ease;\n}\n@media (max-width: 768px) {\n  .charts-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n    align-items: flex-start;\n  }\n  .header-controls[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n  }\n  .form-select[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .resumen-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n/*# sourceMappingURL=reportes.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportesComponent, { className: "ReportesComponent", filePath: "app\\features\\admin\\pages\\reportes\\reportes.component.ts", lineNumber: 17 });
})();
export {
  ReportesComponent
};
//# sourceMappingURL=chunk-CGIUXJAW.js.map
