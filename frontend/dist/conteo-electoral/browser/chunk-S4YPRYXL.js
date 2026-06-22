import {
  AuthService,
  Router
} from "./chunk-TFOW3E4S.js";
import {
  ApiService
} from "./chunk-5ZU65LVT.js";
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
} from "./chunk-XIYYPGDW.js";
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
} from "./chunk-7A5LCT4I.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-ASLTLD6L.js";

// src/app/features/mesa/mesa-votacion/mesa-votacion.component.ts
var _c0 = ["cantidadInput"];
function MesaVotacionComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "span", 43);
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
function MesaVotacionComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 45);
    \u0275\u0275text(2, "\u{1F512}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 46)(4, "strong");
    \u0275\u0275text(5, "Mesa Cerrada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Esta mesa ha sido cerrada. No se pueden registrar ni modificar votos.");
    \u0275\u0275elementEnd()()();
  }
}
function MesaVotacionComponent_div_13_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function MesaVotacionComponent_div_13_button_4_Template_button_click_0_listener() {
      const m_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.seleccionarMesa(m_r3));
    });
    \u0275\u0275elementStart(1, "span", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 54);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 55);
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
function MesaVotacionComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48);
    \u0275\u0275text(2, "\u{1F4CC} Selecciona una mesa para trabajar:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49);
    \u0275\u0275template(4, MesaVotacionComponent_div_13_button_4_Template, 9, 13, "button", 50);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.mesasDisponibles);
  }
}
function MesaVotacionComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 57)(2, "div", 58);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 59)(5, "span");
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
function MesaVotacionComponent_option_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", p_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.nombre);
  }
}
function MesaVotacionComponent_option_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275property("ngValue", c_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.nombre);
  }
}
function MesaVotacionComponent_tr_55_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "input", 69, 0);
    \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_tr_55_div_17_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.cantidadVotos, $event) || (ctx_r0.cantidadVotos = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function MesaVotacionComponent_tr_55_div_17_Template_input_keyup_enter_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.registrarVoto());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 70);
    \u0275\u0275listener("click", function MesaVotacionComponent_tr_55_div_17_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.registrarVoto());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.cantidadVotos);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.animando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.animando ? "..." : "Registrar", " ");
  }
}
function MesaVotacionComponent_tr_55_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 71);
    \u0275\u0275listener("click", function MesaVotacionComponent_tr_55_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const c_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.seleccionarCandidato(c_r8));
    });
    \u0275\u0275text(1, " Votar ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_tr_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 60);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "div", 61)(6, "div", 62);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div")(9, "div", 63);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "td")(12, "span", 64);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 65);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 41);
    \u0275\u0275template(17, MesaVotacionComponent_tr_55_div_17_Template, 5, 3, "div", 66)(18, MesaVotacionComponent_tr_55_button_18_Template, 2, 0, "button", 67);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    const i_r9 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("animation-delay", i_r9 * 0.02 + "s");
    \u0275\u0275classProp("selected", (ctx_r0.candidatoSeleccionado == null ? null : ctx_r0.candidatoSeleccionado.id) === c_r8.id)("disabled", ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r9 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", c_r8.colorPartido);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", c_r8.nombre[0], "", c_r8.apellido[0], " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", c_r8.nombre, " ", c_r8.apellido, "");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", c_r8.colorPartido + "20")("color", c_r8.colorPartido);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r8.partidoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r8.cargoNombre);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (ctx_r0.candidatoSeleccionado == null ? null : ctx_r0.candidatoSeleccionado.id) === c_r8.id && !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.candidatoSeleccionado == null ? null : ctx_r0.candidatoSeleccionado.id) !== c_r8.id && !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
  }
}
function MesaVotacionComponent_tr_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 72);
    \u0275\u0275text(2, "No hay candidatos que coincidan");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionComponent_button_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 73);
    \u0275\u0275listener("click", function MesaVotacionComponent_button_66_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.imprimirActa());
    });
    \u0275\u0275text(1, " \u{1F4C4} Imprimir Acta ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_button_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 74);
    \u0275\u0275listener("click", function MesaVotacionComponent_button_67_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarMesa());
    });
    \u0275\u0275text(1, " \u{1F512} Cerrar Acta ");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_th_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 75);
    \u0275\u0275text(1, "Acci\xF3n");
    \u0275\u0275elementEnd();
  }
}
function MesaVotacionComponent_tr_88_td_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 41)(1, "button", 78);
    \u0275\u0275listener("click", function MesaVotacionComponent_tr_88_td_12_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const v_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.eliminarVoto(v_r13.id));
    });
    \u0275\u0275text(2, "\u2715");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionComponent_tr_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 60);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span", 64);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 41)(10, "strong", 76);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, MesaVotacionComponent_tr_88_td_12_Template, 3, 0, "td", 77);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r13 = ctx.$implicit;
    const i_r14 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("animation-delay", i_r14 * 0.03 + "s");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r14 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", v_r13.candidatoNombre, " ", v_r13.candidatoApellido, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r13.partidoNombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r13.cantidadVotos);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.mesaActual == null ? null : ctx_r0.mesaActual.cerrada));
  }
}
function MesaVotacionComponent_tr_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 72);
    \u0275\u0275text(2, "No hay votos registrados a\xFAn");
    \u0275\u0275elementEnd()();
  }
}
function MesaVotacionComponent_td_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "td");
  }
}
var MesaVotacionComponent = class _MesaVotacionComponent {
  constructor(api, authService, router) {
    this.api = api;
    this.authService = authService;
    this.router = router;
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
    this.colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#e11d48"];
  }
  ngOnInit() {
    this.api.getEleccionesActivas().subscribe((elecciones) => {
      this.elecciones = elecciones;
      if (elecciones.length > 0) {
        const eleccion = elecciones[0];
        this.loadData(eleccion.id);
      }
    });
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
    if (!confirm("\xBFEst\xE1 seguro de eliminar este registro?"))
      return;
    this.api.deleteVoto(id).subscribe(() => this.loadVotos());
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
      return new (t || _MesaVotacionComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
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
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 99, vars: 28, consts: [["cantidadInput", ""], [1, "mesa-container"], [1, "mesa-header"], [1, "header-left"], [1, "header-icon"], [1, "header-meta"], [3, "class", 4, "ngIf"], [1, "header-actions"], [1, "btn", "btn-logout", 3, "click"], ["class", "alert-cerrada", 4, "ngIf"], ["class", "mesa-selector-card", 4, "ngIf"], ["class", "mesa-actual-card", 4, "ngIf"], [1, "content-grid"], [1, "card", "candidatos-card"], [1, "card-header"], [1, "card-badge"], [1, "filtros-rapidos"], ["type", "text", "placeholder", "Buscar candidato...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "btn", "btn-clean", 3, "click"], [1, "table-wrapper"], [1, "table-candidatos"], [2, "width", "40px"], [1, "sortable", 3, "click"], [1, "sort-icon"], [1, "text-right", 2, "width", "140px"], [3, "selected", "disabled", "animation-delay", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "card", "votos-card"], [1, "card-header-actions"], [1, "total-votos-badge"], ["class", "btn btn-acta", 3, "click", 4, "ngIf"], ["class", "btn btn-cerrar", 3, "click", 4, "ngIf"], [1, "table-votos"], [1, "sortable", "text-right", 2, "width", "100px", 3, "click"], ["style", "width: 80px", "class", "text-right", 4, "ngIf"], [3, "animation-delay", 4, "ngFor", "ngForOf"], [1, "total-row"], ["colspan", "3"], [1, "text-right"], [1, "voto-count-total"], [1, "estado-dot"], [1, "alert-cerrada"], [1, "alert-icon"], [1, "alert-content"], [1, "mesa-selector-card"], [1, "selector-label"], [1, "mesa-opciones"], ["class", "mesa-opcion", 3, "active", "cerrada", "click", 4, "ngFor", "ngForOf"], [1, "mesa-opcion", 3, "click"], [1, "mesa-numero"], [1, "mesa-sexo"], [1, "mesa-institucion"], [1, "mesa-estado-tag"], [1, "mesa-actual-card"], [1, "mesa-actual-info"], [1, "mesa-actual-numero"], [1, "mesa-actual-detalles"], [1, "row-num"], [1, "candidato-cell"], [1, "candidato-avatar"], [1, "candidato-nombre"], [1, "partido-tag"], [1, "cargo-cell"], ["class", "voto-input-group", 4, "ngIf"], ["class", "btn btn-seleccionar", 3, "click", 4, "ngIf"], [1, "voto-input-group"], ["type", "number", "min", "1", 1, "voto-input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "btn", "btn-registrar", 3, "click", "disabled"], [1, "btn", "btn-seleccionar", 3, "click"], ["colspan", "5", 1, "empty-msg"], [1, "btn", "btn-acta", 3, "click"], [1, "btn", "btn-cerrar", 3, "click"], [1, "text-right", 2, "width", "80px"], [1, "voto-count"], ["class", "text-right", 4, "ngIf"], [1, "btn", "btn-eliminar", 3, "click"]], template: function MesaVotacionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "div", 3)(3, "h1")(4, "span", 4);
        \u0275\u0275text(5, "\u{1F5F3}\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Registro de Votos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275template(8, MesaVotacionComponent_span_8_Template, 3, 3, "span", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 7)(10, "button", 8);
        \u0275\u0275listener("click", function MesaVotacionComponent_Template_button_click_10_listener() {
          return ctx.logout();
        });
        \u0275\u0275text(11, "Cerrar Sesi\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(12, MesaVotacionComponent_div_12_Template, 8, 0, "div", 9)(13, MesaVotacionComponent_div_13_Template, 5, 1, "div", 10)(14, MesaVotacionComponent_div_14_Template, 11, 4, "div", 11);
        \u0275\u0275elementStart(15, "div", 12)(16, "div", 13)(17, "div", 14)(18, "h3");
        \u0275\u0275text(19, "\u{1F464} Candidatos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "span", 15);
        \u0275\u0275text(21);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 16)(23, "input", 17);
        \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_Template_input_ngModelChange_23_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtroTexto, $event) || (ctx.filtroTexto = $event);
          return $event;
        });
        \u0275\u0275listener("input", function MesaVotacionComponent_Template_input_input_23_listener() {
          return ctx.aplicarFiltro();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "select", 18);
        \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_Template_select_ngModelChange_24_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtroPartidoId, $event) || (ctx.filtroPartidoId = $event);
          return $event;
        });
        \u0275\u0275listener("change", function MesaVotacionComponent_Template_select_change_24_listener() {
          return ctx.aplicarFiltro();
        });
        \u0275\u0275elementStart(25, "option", 19);
        \u0275\u0275text(26, "Todos los Partidos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(27, MesaVotacionComponent_option_27_Template, 2, 2, "option", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "select", 18);
        \u0275\u0275twoWayListener("ngModelChange", function MesaVotacionComponent_Template_select_ngModelChange_28_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtroCargoId, $event) || (ctx.filtroCargoId = $event);
          return $event;
        });
        \u0275\u0275listener("change", function MesaVotacionComponent_Template_select_change_28_listener() {
          return ctx.aplicarFiltro();
        });
        \u0275\u0275elementStart(29, "option", 19);
        \u0275\u0275text(30, "Todos los Cargos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, MesaVotacionComponent_option_31_Template, 2, 2, "option", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "button", 21);
        \u0275\u0275listener("click", function MesaVotacionComponent_Template_button_click_32_listener() {
          return ctx.limpiarFiltro();
        });
        \u0275\u0275text(33, "Limpiar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "div", 22)(35, "table", 23)(36, "thead")(37, "tr")(38, "th", 24);
        \u0275\u0275text(39, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "th", 25);
        \u0275\u0275listener("click", function MesaVotacionComponent_Template_th_click_40_listener() {
          return ctx.setSortCandidatos("nombre");
        });
        \u0275\u0275text(41, " Candidato ");
        \u0275\u0275elementStart(42, "span", 26);
        \u0275\u0275text(43);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "th", 25);
        \u0275\u0275listener("click", function MesaVotacionComponent_Template_th_click_44_listener() {
          return ctx.setSortCandidatos("partido");
        });
        \u0275\u0275text(45, " Partido ");
        \u0275\u0275elementStart(46, "span", 26);
        \u0275\u0275text(47);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "th", 25);
        \u0275\u0275listener("click", function MesaVotacionComponent_Template_th_click_48_listener() {
          return ctx.setSortCandidatos("cargo");
        });
        \u0275\u0275text(49, " Cargo ");
        \u0275\u0275elementStart(50, "span", 26);
        \u0275\u0275text(51);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "th", 27);
        \u0275\u0275text(53, "Acci\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(54, "tbody");
        \u0275\u0275template(55, MesaVotacionComponent_tr_55_Template, 19, 21, "tr", 28)(56, MesaVotacionComponent_tr_56_Template, 3, 0, "tr", 29);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(57, "div", 30)(58, "div", 14)(59, "h3");
        \u0275\u0275text(60, "\u{1F4CB} Votos Registrados");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "div", 31)(62, "span", 32);
        \u0275\u0275text(63, "Total: ");
        \u0275\u0275elementStart(64, "strong");
        \u0275\u0275text(65);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(66, MesaVotacionComponent_button_66_Template, 2, 0, "button", 33)(67, MesaVotacionComponent_button_67_Template, 2, 0, "button", 34);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(68, "div", 22)(69, "table", 35)(70, "thead")(71, "tr")(72, "th", 24);
        \u0275\u0275text(73, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "th", 25);
        \u0275\u0275listener("click", function MesaVotacionComponent_Template_th_click_74_listener() {
          return ctx.setSortVotos("candidato");
        });
        \u0275\u0275text(75, " Candidato ");
        \u0275\u0275elementStart(76, "span", 26);
        \u0275\u0275text(77);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(78, "th", 25);
        \u0275\u0275listener("click", function MesaVotacionComponent_Template_th_click_78_listener() {
          return ctx.setSortVotos("partido");
        });
        \u0275\u0275text(79, " Partido ");
        \u0275\u0275elementStart(80, "span", 26);
        \u0275\u0275text(81);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(82, "th", 36);
        \u0275\u0275listener("click", function MesaVotacionComponent_Template_th_click_82_listener() {
          return ctx.setSortVotos("votos");
        });
        \u0275\u0275text(83, " Votos ");
        \u0275\u0275elementStart(84, "span", 26);
        \u0275\u0275text(85);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(86, MesaVotacionComponent_th_86_Template, 2, 0, "th", 37);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(87, "tbody");
        \u0275\u0275template(88, MesaVotacionComponent_tr_88_Template, 13, 8, "tr", 38)(89, MesaVotacionComponent_tr_89_Template, 3, 0, "tr", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(90, "tfoot")(91, "tr", 39)(92, "td", 40)(93, "strong");
        \u0275\u0275text(94, "TOTAL");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(95, "td", 41)(96, "strong", 42);
        \u0275\u0275text(97);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(98, MesaVotacionComponent_td_98_Template, 1, 0, "td", 29);
        \u0275\u0275elementEnd()()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.mesaActual);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.mesaActual == null ? null : ctx.mesaActual.cerrada);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesasDisponibles.length > 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesaActual);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("", ctx.candidatosFiltrados.length, " candidatos");
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroTexto);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroPartidoId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.partidos);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.filtroCargoId);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.cargos);
        \u0275\u0275advance(12);
        \u0275\u0275textInterpolate(ctx.getSortIconCandidatos("nombre"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.getSortIconCandidatos("partido"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.getSortIconCandidatos("cargo"));
        \u0275\u0275advance(4);
        \u0275\u0275property("ngForOf", ctx.candidatosFiltrados);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.candidatosFiltrados.length === 0);
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.totalVotos);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mesaActual == null ? null : ctx.mesaActual.cerrada);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !(ctx.mesaActual == null ? null : ctx.mesaActual.cerrada));
        \u0275\u0275advance(10);
        \u0275\u0275textInterpolate(ctx.getSortIconVotos("candidato"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.getSortIconVotos("partido"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.getSortIconVotos("votos"));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !(ctx.mesaActual == null ? null : ctx.mesaActual.cerrada));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.votosRegistrados);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.votosRegistrados.length === 0);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.totalVotos);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !(ctx.mesaActual == null ? null : ctx.mesaActual.cerrada));
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ["\n\n.mesa-container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 24px;\n}\n.mesa-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 24px;\n}\n.header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 700;\n  margin: 0 0 10px 0;\n  color: #0f172a;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.header-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.mesa-estado[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 14px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n.estado-abierta[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n  border: 1px solid #86efac;\n}\n.estado-cerrada[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n  border: 1px solid #fca5a5;\n}\n.estado-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n}\n.estado-abierta[_ngcontent-%COMP%]   .estado-dot[_ngcontent-%COMP%] {\n  background: #16a34a;\n  animation: _ngcontent-%COMP%_pulse-dot 2s infinite;\n}\n.estado-cerrada[_ngcontent-%COMP%]   .estado-dot[_ngcontent-%COMP%] {\n  background: #dc2626;\n}\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);\n  }\n  50% {\n    opacity: 0.7;\n    box-shadow: 0 0 0 4px rgba(22, 163, 74, 0);\n  }\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.btn-logout[_ngcontent-%COMP%] {\n  padding: 8px 20px;\n  border: 1px solid #fca5a5;\n  background: transparent;\n  color: #ef4444;\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-logout[_ngcontent-%COMP%]:hover {\n  background: #ef4444;\n  color: white;\n}\n.alert-cerrada[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 12px;\n  margin-bottom: 20px;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.alert-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.alert-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #991b1b;\n  font-size: 15px;\n}\n.alert-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #b91c1c;\n  font-size: 13px;\n}\n.mesa-selector-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f0f9ff,\n      #eff6ff);\n  border: 1px solid #bae6fd;\n  border-radius: 16px;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n.selector-label[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: #0369a1;\n  margin-bottom: 12px;\n}\n.mesa-opciones[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.mesa-opcion[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 14px 18px;\n  background: white;\n  border: 2px solid #e2e8f0;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n  min-width: 180px;\n  text-align: left;\n}\n.mesa-opcion[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);\n}\n.mesa-opcion.active[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: #eff6ff;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n}\n.mesa-opcion.cerrada[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  border-color: #fecaca;\n}\n.mesa-opcion.cerrada[_ngcontent-%COMP%]:hover {\n  border-color: #ef4444;\n}\n.mesa-numero[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 16px;\n  color: #0f172a;\n}\n.mesa-sexo[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #64748b;\n}\n.mesa-institucion[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n}\n.mesa-estado-tag[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 600;\n}\n.tag-abierta[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #16a34a;\n}\n.tag-cerrada[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.mesa-actual-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1e293b,\n      #334155);\n  border-radius: 16px;\n  padding: 20px 24px;\n  margin-bottom: 20px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);\n}\n.mesa-actual-numero[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: white;\n  margin-bottom: 8px;\n}\n.mesa-actual-detalles[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.mesa-actual-detalles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #94a3b8;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 400px;\n  gap: 20px;\n  align-items: start;\n}\n.card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f1f5f9;\n  overflow: hidden;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 18px 20px 0;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  color: #0f172a;\n}\n.card-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n  background: #f1f5f9;\n  padding: 2px 10px;\n  border-radius: 12px;\n}\n.card-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.total-votos-badge[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n}\n.total-votos-badge[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0f172a;\n  font-size: 18px;\n}\n.filtros-rapidos[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 14px 20px;\n  flex-wrap: wrap;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 140px;\n  padding: 8px 14px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 13px;\n  transition: all 0.2s;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.filter-select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 13px;\n  background: #fafafa;\n  min-width: 140px;\n}\n.filter-select[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  outline: none;\n}\n.btn-clean[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #e2e8f0;\n  background: white;\n  border-radius: 8px;\n  color: #64748b;\n  font-size: 13px;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-clean[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n  color: #ef4444;\n  border-color: #fca5a5;\n}\n.btn-seleccionar[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-seleccionar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\n}\n.btn-cerrar[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #dc2626);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-cerrar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);\n}\n.btn-acta[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #059669,\n      #10b981);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-acta[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);\n}\n.btn-eliminar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 1px solid #fecaca;\n  background: white;\n  color: #ef4444;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.btn-eliminar[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n  border-color: #ef4444;\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  padding: 0 4px 16px;\n}\n.table-candidatos[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n}\n.table-candidatos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 10px;\n  font-size: 11px;\n  font-weight: 700;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 2px solid #f1f5f9;\n  background: #fafafa;\n  white-space: nowrap;\n}\n.table-candidatos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, .table-votos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child {\n  border-radius: 10px 0 0 0;\n}\n.table-candidatos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, .table-votos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 10px 0 0;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 10px;\n  border-bottom: 1px solid #f1f5f9;\n  font-size: 14px;\n  color: #334155;\n  vertical-align: middle;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], .table-votos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: background 0.2s;\n  animation: _ngcontent-%COMP%_fadeInRow 0.35s ease both;\n}\n@keyframes _ngcontent-%COMP%_fadeInRow {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%] {\n  background: #eff6ff;\n}\n.table-candidatos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  pointer-events: none;\n}\n.table-votos[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.table-votos[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 10px;\n  background: #f8fafc;\n  border-top: 2px solid #e2e8f0;\n  font-size: 14px;\n}\n.total-row[_ngcontent-%COMP%] {\n  background: #f1f5f9 !important;\n}\n.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s;\n}\n.sortable[_ngcontent-%COMP%]:hover {\n  color: #3b82f6;\n}\n.sort-icon[_ngcontent-%COMP%] {\n  font-size: 11px;\n  margin-left: 3px;\n  opacity: 0.5;\n}\n.sortable[_ngcontent-%COMP%]:hover   .sort-icon[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.row-num[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  background: #f1f5f9;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #94a3b8;\n}\n.candidato-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.candidato-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 700;\n  font-size: 13px;\n  flex-shrink: 0;\n}\n.candidato-nombre[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n  font-size: 14px;\n}\n.partido-tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 10px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  background: #f1f5f9;\n  color: #475569;\n}\n.cargo-cell[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #64748b;\n}\n.voto-input-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: flex-end;\n}\n.voto-input[_ngcontent-%COMP%] {\n  width: 70px;\n  padding: 6px 8px;\n  border: 2px solid #3b82f6;\n  border-radius: 8px;\n  font-size: 16px;\n  font-weight: 700;\n  text-align: center;\n}\n.voto-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);\n}\n.btn-registrar[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #059669);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.btn-registrar[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);\n}\n.btn-registrar[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.voto-count[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #0f172a;\n}\n.voto-count-total[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #3b82f6;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  padding: 32px !important;\n  color: #94a3b8;\n  text-align: center;\n  font-size: 14px;\n}\n@media (max-width: 1100px) {\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .mesa-actual-detalles[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 4px;\n  }\n  .filtros-rapidos[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .search-input[_ngcontent-%COMP%], .filter-select[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: auto;\n  }\n  .mesa-opciones[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .mesa-opcion[_ngcontent-%COMP%] {\n    min-width: auto;\n  }\n}\n/*# sourceMappingURL=mesa-votacion.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MesaVotacionComponent, { className: "MesaVotacionComponent", filePath: "app\\features\\mesa\\mesa-votacion\\mesa-votacion.component.ts", lineNumber: 20 });
})();
export {
  MesaVotacionComponent
};
//# sourceMappingURL=chunk-S4YPRYXL.js.map
