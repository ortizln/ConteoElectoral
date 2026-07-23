import {
  CheckboxControlValueAccessor,
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

// src/app/features/admin/pages/usuarios/usuarios.component.ts
function UsuariosComponent_option_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r1 = ctx.$implicit;
    \u0275\u0275property("value", r_r1.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r1.label);
  }
}
function UsuariosComponent_tr_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
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
    \u0275\u0275elementStart(11, "td")(12, "span", 25);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td")(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "div", 1)(19, "button", 26);
    \u0275\u0275element(20, "i", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "ul", 3)(22, "li")(23, "button", 6);
    \u0275\u0275listener("click", function UsuariosComponent_tr_49_Template_button_click_23_listener() {
      const u_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openEditModal(u_r3));
    });
    \u0275\u0275text(24, "Editar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "li")(26, "button", 6);
    \u0275\u0275listener("click", function UsuariosComponent_tr_49_Template_button_click_26_listener() {
      const u_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openResetPasswordModal(u_r3));
    });
    \u0275\u0275text(27, "Reset Pass");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "li");
    \u0275\u0275element(29, "hr", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "li")(31, "button", 28);
    \u0275\u0275listener("click", function UsuariosComponent_tr_49_Template_button_click_31_listener() {
      const u_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.deleteUsuario(u_r3));
    });
    \u0275\u0275text(32, "Eliminar");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const u_r3 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r3.currentPage - 1) * ctx_r3.pageSize + i_r5 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r3.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r3.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r3.apellido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r3.email);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(u_r3.rol === "ADMIN" ? "bg-danger" : u_r3.rol === "SUPERVISOR" ? "bg-warning" : "bg-info");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r3.rol);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(u_r3.activo ? "badge bg-success" : "badge bg-secondary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", u_r3.activo ? "Activo" : "Inactivo", " ");
  }
}
function UsuariosComponent_tr_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 29);
    \u0275\u0275text(2, "No se encontraron registros");
    \u0275\u0275elementEnd()();
  }
}
function UsuariosComponent_span_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span")(1, "button", 30);
    \u0275\u0275listener("click", function UsuariosComponent_span_59_Template_button_click_1_listener() {
      const p_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToPage(p_r7));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", p_r7 === ctx_r3.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r7);
  }
}
function UsuariosComponent_option_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r8 = ctx.$implicit;
    \u0275\u0275property("value", s_r8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r8);
  }
}
function UsuariosComponent_div_69_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.errorMessage);
  }
}
function UsuariosComponent_div_69_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "label");
    \u0275\u0275text(2, "Username:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_div_69_div_10_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.form.username, $event) || (ctx_r3.form.username = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.username);
  }
}
function UsuariosComponent_div_69_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "label");
    \u0275\u0275text(2, "Username:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r3.form.username);
  }
}
function UsuariosComponent_div_69_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "label");
    \u0275\u0275text(2, "Password:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_div_69_div_12_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.form.password, $event) || (ctx_r3.form.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.password);
  }
}
function UsuariosComponent_div_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "div", 33)(3, "div", 34)(4, "h5");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 35);
    \u0275\u0275listener("click", function UsuariosComponent_div_69_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 36);
    \u0275\u0275template(9, UsuariosComponent_div_69_div_9_Template, 3, 1, "div", 37)(10, UsuariosComponent_div_69_div_10_Template, 4, 1, "div", 37)(11, UsuariosComponent_div_69_div_11_Template, 4, 1, "div", 37)(12, UsuariosComponent_div_69_div_12_Template, 4, 1, "div", 37);
    \u0275\u0275elementStart(13, "div", 38)(14, "label");
    \u0275\u0275text(15, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_div_69_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form.nombre, $event) || (ctx_r3.form.nombre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function UsuariosComponent_div_69_Template_input_input_16_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toUpper(ctx_r3.form, "nombre"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 38)(18, "label");
    \u0275\u0275text(19, "Apellido:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_div_69_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form.apellido, $event) || (ctx_r3.form.apellido = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function UsuariosComponent_div_69_Template_input_input_20_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toUpper(ctx_r3.form, "apellido"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 38)(22, "label");
    \u0275\u0275text(23, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_div_69_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form.email, $event) || (ctx_r3.form.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 38)(26, "label");
    \u0275\u0275text(27, "Rol:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "select", 41);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_div_69_Template_select_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form.rolId, $event) || (ctx_r3.form.rolId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(29, "option", 10);
    \u0275\u0275text(30, "ADMIN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 10);
    \u0275\u0275text(32, "SUPERVISOR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 10);
    \u0275\u0275text(34, "MIEMBRO_MESA");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 38)(36, "label")(37, "input", 42);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_div_69_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form.activo, $event) || (ctx_r3.form.activo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(38, " Activo ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 43)(40, "button", 44);
    \u0275\u0275listener("click", function UsuariosComponent_div_69_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeModal());
    });
    \u0275\u0275text(41, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 45);
    \u0275\u0275listener("click", function UsuariosComponent_div_69_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.save());
    });
    \u0275\u0275text(43, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r3.editingUser ? "Editar" : "Nuevo", " Usuario");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r3.errorMessage);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r3.editingUser);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.editingUser);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r3.editingUser);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.apellido);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.email);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.rolId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 3);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form.activo);
  }
}
function UsuariosComponent_div_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "div", 33)(3, "div", 34)(4, "h5");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 35);
    \u0275\u0275listener("click", function UsuariosComponent_div_70_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeResetModal());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 36)(9, "div", 38)(10, "label");
    \u0275\u0275text(11, "Nueva Password:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_div_70_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newPassword, $event) || (ctx_r3.newPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 38)(14, "label");
    \u0275\u0275text(15, "Confirmar Password:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_div_70_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.confirmPassword, $event) || (ctx_r3.confirmPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 43)(18, "button", 44);
    \u0275\u0275listener("click", function UsuariosComponent_div_70_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeResetModal());
    });
    \u0275\u0275text(19, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 45);
    \u0275\u0275listener("click", function UsuariosComponent_div_70_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.resetPassword());
    });
    \u0275\u0275text(21, "Resetear");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Reset Password - ", ctx_r3.resetUser == null ? null : ctx_r3.resetUser.username, "");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newPassword);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.confirmPassword);
  }
}
var UsuariosComponent = class _UsuariosComponent {
  constructor(api) {
    this.api = api;
    this.usuarios = [];
    this.showModal = false;
    this.showResetModal = false;
    this.editingUser = null;
    this.resetUser = null;
    this.newPassword = "";
    this.confirmPassword = "";
    this.form = { username: "", password: "", nombre: "", apellido: "", email: "", rolId: 3, activo: true };
    this.filterRol = null;
    this.sortColumn = "";
    this.sortDirection = "asc";
    this.searchText = "";
    this.currentPage = 1;
    this.pageSize = 10;
    this.pageSizes = [5, 10, 25, 50];
    this.Math = Math;
    this.errorMessage = "";
    this.roles = [
      { value: "ADMIN", label: "ADMIN" },
      { value: "SUPERVISOR", label: "SUPERVISOR" },
      { value: "MIEMBRO_MESA", label: "MIEMBRO MESA" }
    ];
  }
  ngOnInit() {
    this.load();
  }
  load() {
    const obs = this.filterRol ? this.api.getUsuariosByRol(this.filterRol) : this.api.getUsuarios();
    obs.subscribe((d) => this.usuarios = d);
  }
  filtrarPorRol() {
    this.load();
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
  get usuariosOrdenados() {
    if (!this.sortColumn)
      return this.usuarios;
    return [...this.usuarios].sort((a, b) => {
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
  get usuariosFiltrados() {
    if (!this.searchText)
      return this.usuariosOrdenados;
    const term = this.searchText.toLowerCase();
    return this.usuariosOrdenados.filter((item) => Object.values(item).some((v) => v != null && String(v).toLowerCase().includes(term)));
  }
  get usuariosPaginados() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.usuariosFiltrados.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.usuariosFiltrados.length / this.pageSize) || 1;
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
    this.editingUser = null;
    this.form = { username: "", password: "", nombre: "", apellido: "", email: "", rolId: 3, activo: true };
    this.errorMessage = "";
    this.showModal = true;
  }
  openEditModal(user) {
    this.editingUser = user;
    this.form = {
      username: user.username,
      password: "",
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      rolId: user.rol === "ADMIN" ? 1 : user.rol === "SUPERVISOR" ? 2 : 3,
      activo: user.activo
    };
    this.errorMessage = "";
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.editingUser = null;
    this.errorMessage = "";
  }
  openResetPasswordModal(user) {
    this.resetUser = user;
    this.newPassword = "";
    this.confirmPassword = "";
    this.showResetModal = true;
  }
  closeResetModal() {
    this.showResetModal = false;
    this.resetUser = null;
  }
  save() {
    this.errorMessage = "";
    if (this.editingUser) {
      this.api.updateUsuario(this.editingUser.id, this.form).subscribe({
        next: () => {
          this.load();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Error al guardar. Intente de nuevo.";
        }
      });
    } else {
      this.api.createUsuario(this.form).subscribe({
        next: () => {
          this.load();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Error al guardar. Intente de nuevo.";
        }
      });
    }
  }
  resetPassword() {
    if (this.resetUser && this.newPassword === this.confirmPassword) {
      this.api.resetPassword(this.resetUser.id, this.newPassword).subscribe(() => {
        this.closeResetModal();
        alert("Password reseteada exitosamente para: " + this.resetUser.username);
      });
    }
  }
  deleteUsuario(user) {
    if (confirm("Esta seguro de eliminar al usuario: " + user.username + "?")) {
      this.api.deleteUsuario(user.id).subscribe(() => this.load());
    }
  }
  static {
    this.\u0275fac = function UsuariosComponent_Factory(t) {
      return new (t || _UsuariosComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsuariosComponent, selectors: [["app-usuarios"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 71, vars: 24, consts: [[1, "page-header"], [1, "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-primary", "dropdown-toggle"], [1, "dropdown-menu", "dropdown-menu-end"], [1, "dropdown-item", "fw-bold", 3, "click"], [1, "dropdown-divider"], [1, "dropdown-item", 3, "click"], [1, "filters-bar", "mb-4"], [1, "filter-item"], [1, "form-select", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "autocomplete", "off", "placeholder", "Buscar en tabla...", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], [1, "table", "table-striped"], [1, "sortable", 3, "click"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "pagination-bar"], [1, "pagination-info"], [1, "pagination-controls"], [3, "click", "disabled"], [1, "pagination-size"], [3, "ngModelChange", "change", "ngModel"], ["class", "modal", 4, "ngIf"], [3, "value"], [1, "badge"], ["type", "button", "data-bs-toggle", "dropdown", "data-bs-popper", "false", "aria-expanded", "false", 1, "btn", "btn-sm", "btn-outline-secondary", "border-0"], [1, "bi", "bi-three-dots-vertical"], [1, "dropdown-item", "text-danger", 3, "click"], ["colspan", "8", 1, "text-center", "py-3"], [3, "click"], [1, "modal"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "modal-body"], ["class", "mb-3", 4, "ngIf"], [1, "mb-3"], ["type", "text", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "ngModel"], ["type", "email", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-danger"], ["type", "text", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "text", "disabled", "", 1, "form-control", 3, "value"], ["type", "password", "autocomplete", "new-password", 1, "form-control", 3, "ngModelChange", "ngModel"]], template: function UsuariosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Gesti\xF3n de Usuarios");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1)(4, "button", 2);
        \u0275\u0275text(5, " Opciones ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "ul", 3)(7, "li")(8, "button", 4);
        \u0275\u0275listener("click", function UsuariosComponent_Template_button_click_8_listener() {
          return ctx.openModal();
        });
        \u0275\u0275text(9, "+ Nuevo Usuario");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "li");
        \u0275\u0275element(11, "hr", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "li")(13, "button", 6);
        \u0275\u0275listener("click", function UsuariosComponent_Template_button_click_13_listener() {
          return ctx.api.exportUsuariosPdf();
        });
        \u0275\u0275text(14, "\u{1F4C4} Imprimir PDF");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "li")(16, "button", 6);
        \u0275\u0275listener("click", function UsuariosComponent_Template_button_click_16_listener() {
          return ctx.api.exportUsuariosExcel();
        });
        \u0275\u0275text(17, "\u{1F4CA} Exportar Excel");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(18, "div", 7)(19, "div", 8)(20, "label");
        \u0275\u0275text(21, "Rol:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "select", 9);
        \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_Template_select_ngModelChange_22_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filterRol, $event) || (ctx.filterRol = $event);
          return $event;
        });
        \u0275\u0275listener("change", function UsuariosComponent_Template_select_change_22_listener() {
          return ctx.filtrarPorRol();
        });
        \u0275\u0275elementStart(23, "option", 10);
        \u0275\u0275text(24, "Todos");
        \u0275\u0275elementEnd();
        \u0275\u0275template(25, UsuariosComponent_option_25_Template, 2, 2, "option", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 8)(27, "label");
        \u0275\u0275text(28, "Buscar:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "input", 12);
        \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_Template_input_ngModelChange_29_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
          return $event;
        });
        \u0275\u0275listener("input", function UsuariosComponent_Template_input_input_29_listener() {
          return ctx.currentPage = 1;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(30, "table", 13)(31, "thead")(32, "tr")(33, "th");
        \u0275\u0275text(34, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "th", 14);
        \u0275\u0275listener("click", function UsuariosComponent_Template_th_click_35_listener() {
          return ctx.sort("username");
        });
        \u0275\u0275text(36);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "th", 14);
        \u0275\u0275listener("click", function UsuariosComponent_Template_th_click_37_listener() {
          return ctx.sort("nombre");
        });
        \u0275\u0275text(38);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "th", 14);
        \u0275\u0275listener("click", function UsuariosComponent_Template_th_click_39_listener() {
          return ctx.sort("apellido");
        });
        \u0275\u0275text(40);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "th", 14);
        \u0275\u0275listener("click", function UsuariosComponent_Template_th_click_41_listener() {
          return ctx.sort("email");
        });
        \u0275\u0275text(42);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "th", 14);
        \u0275\u0275listener("click", function UsuariosComponent_Template_th_click_43_listener() {
          return ctx.sort("rol");
        });
        \u0275\u0275text(44);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "th", 14);
        \u0275\u0275listener("click", function UsuariosComponent_Template_th_click_45_listener() {
          return ctx.sort("activo");
        });
        \u0275\u0275text(46);
        \u0275\u0275elementEnd();
        \u0275\u0275element(47, "th");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "tbody");
        \u0275\u0275template(49, UsuariosComponent_tr_49_Template, 33, 11, "tr", 15)(50, UsuariosComponent_tr_50_Template, 3, 0, "tr", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(51, "div", 17)(52, "div", 18);
        \u0275\u0275text(53);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "div", 19)(55, "button", 20);
        \u0275\u0275listener("click", function UsuariosComponent_Template_button_click_55_listener() {
          return ctx.goToPage(1);
        });
        \u0275\u0275text(56, "\xAB\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "button", 20);
        \u0275\u0275listener("click", function UsuariosComponent_Template_button_click_57_listener() {
          return ctx.prevPage();
        });
        \u0275\u0275text(58, "\xAB");
        \u0275\u0275elementEnd();
        \u0275\u0275template(59, UsuariosComponent_span_59_Template, 3, 3, "span", 15);
        \u0275\u0275elementStart(60, "button", 20);
        \u0275\u0275listener("click", function UsuariosComponent_Template_button_click_60_listener() {
          return ctx.nextPage();
        });
        \u0275\u0275text(61, "\xBB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "button", 20);
        \u0275\u0275listener("click", function UsuariosComponent_Template_button_click_62_listener() {
          return ctx.goToPage(ctx.totalPages);
        });
        \u0275\u0275text(63, "\xBB\xBB");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(64, "div", 21)(65, "label");
        \u0275\u0275text(66, "Filas:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "select", 22);
        \u0275\u0275twoWayListener("ngModelChange", function UsuariosComponent_Template_select_ngModelChange_67_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
          return $event;
        });
        \u0275\u0275listener("change", function UsuariosComponent_Template_select_change_67_listener() {
          return ctx.onPageSizeChange();
        });
        \u0275\u0275template(68, UsuariosComponent_option_68_Template, 2, 2, "option", 11);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(69, UsuariosComponent_div_69_Template, 44, 13, "div", 23)(70, UsuariosComponent_div_70_Template, 22, 3, "div", 23);
      }
      if (rf & 2) {
        \u0275\u0275advance(22);
        \u0275\u0275twoWayProperty("ngModel", ctx.filterRol);
        \u0275\u0275advance();
        \u0275\u0275property("ngValue", null);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.roles);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("Username ", ctx.sortColumn === "username" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Nombre ", ctx.sortColumn === "nombre" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Apellido ", ctx.sortColumn === "apellido" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Email ", ctx.sortColumn === "email" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Rol ", ctx.sortColumn === "rol" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Estado ", ctx.sortColumn === "activo" ? ctx.sortDirection === "asc" ? "\u25B2" : "\u25BC" : "", "");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.usuariosPaginados);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.usuariosFiltrados.length === 0);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate3(" Mostrando ", (ctx.currentPage - 1) * ctx.pageSize + 1, " - ", ctx.Math.min(ctx.currentPage * ctx.pageSize, ctx.usuariosFiltrados.length), " de ", ctx.usuariosFiltrados.length, " registros ");
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
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showResetModal);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1e293b;\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.btn-with-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.mb-3[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 2px solid #e2e8f0;\n  background: #f8fafc;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd) {\n  background: #f9fafb;\n}\n.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #4f46e5);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);\n  transform: translateY(-1px);\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  color: white;\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background: #d97706;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n}\n.btn-info[_ngcontent-%COMP%] {\n  background: #06b6d4;\n  color: white;\n}\n.btn-info[_ngcontent-%COMP%]:hover {\n  background: #0891b2;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.bg-danger[_ngcontent-%COMP%] {\n  background: #ef4444 !important;\n  color: white !important;\n}\n.bg-warning[_ngcontent-%COMP%] {\n  background: #f59e0b !important;\n  color: white !important;\n}\n.bg-info[_ngcontent-%COMP%] {\n  background: #06b6d4 !important;\n  color: white !important;\n}\n.bg-success[_ngcontent-%COMP%] {\n  background: #10b981 !important;\n  color: white !important;\n}\n.bg-secondary[_ngcontent-%COMP%] {\n  background: #64748b !important;\n  color: white !important;\n}\n.form-select[_ngcontent-%COMP%], .form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n.form-control[_ngcontent-%COMP%]:focus, .form-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-control[_ngcontent-%COMP%]:disabled {\n  background: #f1f5f9;\n  cursor: not-allowed;\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  border-bottom: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #475569;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #cbd5e1;\n}\n/*# sourceMappingURL=usuarios.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsuariosComponent, { className: "UsuariosComponent", filePath: "app\\features\\admin\\pages\\usuarios\\usuarios.component.ts", lineNumber: 14 });
})();

export {
  UsuariosComponent
};
//# sourceMappingURL=chunk-C5QFIUKQ.js.map
