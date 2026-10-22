import {
  UsuariosComponent
} from "./chunk-J3NQ2JNI.js";
import {
  utils,
  writeFileSync
} from "./chunk-TMB2UGAI.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-QNZTKR3G.js";
import {
  ApiService
} from "./chunk-4SK2KJWF.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf,
  environment,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6TL4F4J6.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/importar/importar.component.ts
function ImportarComponent_span_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\uF4C1 Seleccionar archivo Excel...");
    \u0275\u0275elementEnd();
  }
}
function ImportarComponent_span_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\uF4C4 ", ctx_r0.selectedFile.name, "");
  }
}
function ImportarComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function ImportarComponent_div_46_div_34_li_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(err_r2);
  }
}
function ImportarComponent_div_46_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "h5");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul");
    \u0275\u0275template(4, ImportarComponent_div_46_div_34_li_4_Template, 2, 1, "li", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Errores (", ctx_r0.result.errores.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.result.errores);
  }
}
function ImportarComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "h4");
    \u0275\u0275text(2, "Resultado de la Importaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 14)(4, "div", 15)(5, "span", 16);
    \u0275\u0275text(6, "Filas procesadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 17);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 15)(10, "span", 16);
    \u0275\u0275text(11, "Zonas creadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 17);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 15)(15, "span", 16);
    \u0275\u0275text(16, "Provincias creadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 17);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 15)(20, "span", 16);
    \u0275\u0275text(21, "Cantones creados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 17);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 15)(25, "span", 16);
    \u0275\u0275text(26, "Parroquias creadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 17);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 15)(30, "span", 16);
    \u0275\u0275text(31, "Instituciones creadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 17);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(34, ImportarComponent_div_46_div_34_Template, 5, 2, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.result.totalFilas);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.result.zonasCreadas);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.result.provinciasCreadas);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.result.cantonesCreados);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.result.parroquiasCreadas);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.result.institucionesCreadas);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.result.errores && ctx_r0.result.errores.length > 0);
  }
}
var ImportarComponent = class _ImportarComponent {
  constructor(api) {
    this.api = api;
    this.selectedFile = null;
    this.importing = false;
    this.result = null;
    this.errorMessage = "";
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files?.[0] || null;
    this.result = null;
    this.errorMessage = "";
  }
  importar() {
    if (!this.selectedFile)
      return;
    this.importing = true;
    this.result = null;
    this.errorMessage = "";
    this.api.importarExcel(this.selectedFile).subscribe({
      next: (res) => {
        this.result = res;
        this.importing = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Error al importar el archivo";
        this.importing = false;
      }
    });
  }
  descargarTemplate() {
    const header = ["zona", "provincia", "canton", "parroquia", "institucion"];
    const exampleRow = ["Zona 1", "Pichincha", "Quito", "La Mariscal", "Unidad Educativa Central"];
    const data = [header, exampleRow];
    const ws = utils.aoa_to_sheet(data);
    ws["!cols"] = header.map(() => ({ wch: 25 }));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Plantilla");
    writeFileSync(wb, "plantilla_importacion.xlsx");
  }
  static {
    this.\u0275fac = function ImportarComponent_Factory(t) {
      return new (t || _ImportarComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ImportarComponent, selectors: [["app-importar"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 47, vars: 6, consts: [[1, "page-header"], [1, "card"], [1, "upload-section"], [1, "file-input-area"], ["type", "file", "autocomplete", "off", "accept", ".xlsx,.xls", "id", "fileInput", 3, "change"], ["for", "fileInput", 1, "file-label"], [4, "ngIf"], [1, "upload-actions"], [1, "btn", "btn-success", 3, "click"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "result-card", 4, "ngIf"], [1, "alert", "alert-danger"], [1, "result-card"], [1, "result-grid"], [1, "result-item"], [1, "result-label"], [1, "result-value"], ["class", "errores-list mt-3", 4, "ngIf"], [1, "errores-list", "mt-3"], [4, "ngFor", "ngForOf"]], template: function ImportarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Importar Datos desde Excel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(3, "div", 1)(4, "h5");
        \u0275\u0275text(5, "Instrucciones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Sube un archivo Excel (.xlsx) con las siguientes columnas en la primera fila (encabezados):");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "ul")(9, "li")(10, "strong");
        \u0275\u0275text(11, "zona");
        \u0275\u0275elementEnd();
        \u0275\u0275text(12, " \u2014 Nombre de la zona (requerido)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "li")(14, "strong");
        \u0275\u0275text(15, "provincia");
        \u0275\u0275elementEnd();
        \u0275\u0275text(16, " \u2014 Nombre de la provincia (requerido)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "li")(18, "strong");
        \u0275\u0275text(19, "canton");
        \u0275\u0275elementEnd();
        \u0275\u0275text(20, " \u2014 Nombre del cant\xF3n (requerido)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "li")(22, "strong");
        \u0275\u0275text(23, "parroquia");
        \u0275\u0275elementEnd();
        \u0275\u0275text(24, " \u2014 Nombre de la parroquia (requerido)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "li")(26, "strong");
        \u0275\u0275text(27, "institucion");
        \u0275\u0275elementEnd();
        \u0275\u0275text(28, " o ");
        \u0275\u0275elementStart(29, "strong");
        \u0275\u0275text(30, "recinto");
        \u0275\u0275elementEnd();
        \u0275\u0275text(31, " \u2014 Nombre de la instituci\xF3n educativa (opcional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "p");
        \u0275\u0275text(33, "El sistema recorrer\xE1 cada fila y crear\xE1 autom\xE1ticamente los registros que no existan en la jerarqu\xEDa: Zona \u2192 Provincia \u2192 Cant\xF3n \u2192 Parroquia \u2192 Instituci\xF3n.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "div", 2)(35, "div", 3)(36, "input", 4);
        \u0275\u0275listener("change", function ImportarComponent_Template_input_change_36_listener($event) {
          return ctx.onFileSelected($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "label", 5);
        \u0275\u0275template(38, ImportarComponent_span_38_Template, 2, 0, "span", 6)(39, ImportarComponent_span_39_Template, 2, 1, "span", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "div", 7)(41, "button", 8);
        \u0275\u0275listener("click", function ImportarComponent_Template_button_click_41_listener() {
          return ctx.descargarTemplate();
        });
        \u0275\u0275text(42, " \uF4E5 Descargar Plantilla ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "button", 9);
        \u0275\u0275listener("click", function ImportarComponent_Template_button_click_43_listener() {
          return ctx.importar();
        });
        \u0275\u0275text(44);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(45, ImportarComponent_div_45_Template, 2, 1, "div", 10)(46, ImportarComponent_div_46_Template, 35, 7, "div", 11);
      }
      if (rf & 2) {
        \u0275\u0275advance(38);
        \u0275\u0275property("ngIf", !ctx.selectedFile);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedFile);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", !ctx.selectedFile || ctx.importing);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.importing ? "Importando..." : "Importar Datos", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMessage);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.result);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--alantek-text);\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  padding: 24px;\n  margin-bottom: 24px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.card[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n  color: var(--alantek-text);\n}\n.card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0 0 0 20px;\n  color: var(--alantek-text-secondary);\n}\n.card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--alantek-text-secondary);\n  font-size: 14px;\n  margin: 8px 0;\n}\n.upload-section[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  padding: 32px;\n  text-align: center;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  margin-bottom: 24px;\n}\n.upload-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.btn-success[_ngcontent-%COMP%] {\n  background: var(--alantek-success);\n  color: white;\n  box-shadow: 0 2px 8px rgba(27, 36, 29, 0.3);\n}\n.btn-success[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-success);\n  box-shadow: 0 4px 12px rgba(27, 36, 29, 0.4);\n  transform: translateY(-1px);\n}\n.file-input-area[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.file-input-area[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.file-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 28px;\n  background: var(--alantek-background);\n  border: 2px dashed var(--alantek-border-strong);\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 15px;\n  color: var(--alantek-text-secondary);\n  transition: all 0.2s;\n  min-width: 300px;\n}\n.file-label[_ngcontent-%COMP%]:hover {\n  border-color: var(--alantek-primary);\n  background: var(--alantek-info-bg);\n  color: var(--alantek-primary-dark);\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 12px 32px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--alantek-primary);\n  color: white;\n  box-shadow: 0 2px 8px rgba(27, 36, 29, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--alantek-primary-strong);\n  box-shadow: 0 4px 12px rgba(27, 36, 29, 0.4);\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg);\n  color: var(--alantek-danger);\n  border: 1px solid var(--alantek-danger);\n}\n.result-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.result-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  margin: 0 0 16px 0;\n  color: var(--alantek-text);\n}\n.result-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n.result-item[_ngcontent-%COMP%] {\n  background: var(--alantek-background);\n  border-radius: 10px;\n  padding: 16px;\n  text-align: center;\n}\n.result-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--alantek-text-muted);\n  margin-bottom: 8px;\n  font-weight: 600;\n}\n.result-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 28px;\n  font-weight: 700;\n  color: var(--alantek-text);\n}\n.errores-list[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg);\n  border-radius: 10px;\n  padding: 16px;\n  border: 1px solid var(--alantek-danger);\n}\n.errores-list[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--alantek-danger);\n  margin: 0 0 8px 0;\n}\n.errores-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0 0 0 20px;\n}\n.errores-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--alantek-danger);\n  margin-bottom: 4px;\n}\n.mt-3[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.mt-4[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n/*# sourceMappingURL=importar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImportarComponent, { className: "ImportarComponent", filePath: "app\\features\\admin\\pages\\importar\\importar.component.ts", lineNumber: 14 });
})();

// src/app/features/admin/pages/configuracion/configuracion.component.ts
function ConfiguracionComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
function ConfiguracionComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.successMsg);
  }
}
function ConfiguracionComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMsg);
  }
}
function ConfiguracionComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "button", 15);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_7_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeTab = "config");
    });
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275element(3, "i", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Configuraci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 15);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_7_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeTab = "carousel");
    });
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275element(7, "i", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Carrusel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 15);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_7_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      ctx_r0.loadApkVersions();
      return \u0275\u0275resetView(ctx_r0.activeTab = "apk");
    });
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275element(11, "i", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Versiones APK ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 15);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_7_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeTab = "usuarios");
    });
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275element(15, "i", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Usuarios ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 15);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_7_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeTab = "importar");
    });
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275element(19, "i", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " Importar Datos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 15);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_7_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.activeTab = "permisos");
    });
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275element(23, "i", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " Permisos ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r0.activeTab === "config");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.activeTab === "carousel");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.activeTab === "apk");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.activeTab === "usuarios");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.activeTab === "importar");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.activeTab === "permisos");
  }
}
function ConfiguracionComponent_div_8_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275element(1, "img", 43);
    \u0275\u0275elementStart(2, "button", 44);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_8_div_22_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.deleteLogo());
    });
    \u0275\u0275text(3, " Eliminar Logo ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.logoUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.uploading);
  }
}
function ConfiguracionComponent_div_8_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "span");
    \u0275\u0275text(2, "Sin logo");
    \u0275\u0275elementEnd()();
  }
}
function ConfiguracionComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23)(2, "h5")(3, "span");
    \u0275\u0275element(4, "i", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Informaci\xF3n del Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 25)(7, "label", 26);
    \u0275\u0275text(8, "Nombre del Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_div_8_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.config.nombrePartido, $event) || (ctx_r0.config.nombrePartido = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 25)(11, "label", 28);
    \u0275\u0275text(12, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "textarea", 29);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_div_8_Template_textarea_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.config.descripcion, $event) || (ctx_r0.config.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 30);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_8_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveConfig());
    });
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 23)(17, "h5")(18, "span");
    \u0275\u0275element(19, "i", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " Logo del Partido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 32);
    \u0275\u0275template(22, ConfiguracionComponent_div_8_div_22_Template, 4, 2, "div", 33)(23, ConfiguracionComponent_div_8_div_23_Template, 3, 0, "div", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 35)(25, "input", 36);
    \u0275\u0275listener("change", function ConfiguracionComponent_div_8_Template_input_change_25_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onLogoSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "label", 37);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 30);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_8_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.uploadLogo());
    });
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 23)(31, "h5")(32, "span");
    \u0275\u0275element(33, "i", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275text(34, " Manual de Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 39);
    \u0275\u0275text(36, "Descarga el manual completo del sistema en formato PDF.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "a", 40);
    \u0275\u0275element(38, "i", 41);
    \u0275\u0275text(39, " Descargar Manual PDF ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.config.nombrePartido);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.config.descripcion);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving ? "Guardando..." : "Guardar Cambios", " ");
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r0.logoUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.logoUrl);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.selectedLogo ? ctx_r0.selectedLogo.name : "Seleccionar imagen...");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.selectedLogo || ctx_r0.uploading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.uploading ? "Subiendo..." : "Subir Logo", " ");
    \u0275\u0275advance(8);
    \u0275\u0275property("href", ctx_r0.manualUrl, \u0275\u0275sanitizeUrl);
  }
}
function ConfiguracionComponent_div_9_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_9_div_9_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      \u0275\u0275nextContext();
      const carouselFileInput_r7 = \u0275\u0275reference(8);
      return \u0275\u0275resetView(carouselFileInput_r7.click());
    });
    \u0275\u0275elementStart(1, "div", 59);
    \u0275\u0275element(2, "i", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 60);
    \u0275\u0275text(4, "Arrastra una imagen aqu\xED o ");
    \u0275\u0275elementStart(5, "span", 61);
    \u0275\u0275text(6, "haz clic para seleccionar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 62);
    \u0275\u0275text(8, "PNG, JPEG o WebP");
    \u0275\u0275elementEnd()();
  }
}
function ConfiguracionComponent_div_9_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275element(1, "img", 64);
    \u0275\u0275elementStart(2, "div", 65)(3, "span", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 67);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 68);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_9_div_10_Template_button_click_7_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      ctx_r0.clearCarouselFile();
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275element(8, "i", 69);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.carouselPreviewUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.carouselFile.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r0.carouselFile.size / 1024 / 1024).toFixed(1), " MB");
  }
}
function ConfiguracionComponent_div_9_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
function ConfiguracionComponent_div_9_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "p");
    \u0275\u0275text(2, "No hay im\xE1genes en el carrusel. Agrega una usando el formulario de arriba.");
    \u0275\u0275elementEnd()();
  }
}
function ConfiguracionComponent_div_9_div_18_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "span", 83);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 84);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const img_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(img_r9.caption);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Orden: ", img_r9.orden, "");
  }
}
function ConfiguracionComponent_div_9_div_18_div_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85)(1, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_div_9_div_18_div_1_div_5_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.editCaption, $event) || (ctx_r0.editCaption = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "input", 87);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_div_9_div_18_div_1_div_5_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.editOrden, $event) || (ctx_r0.editOrden = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.editCaption);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.editOrden);
  }
}
function ConfiguracionComponent_div_9_div_18_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 88)(1, "button", 89);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_9_div_18_div_1_div_7_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const img_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.startEditCarousel(img_r9));
    });
    \u0275\u0275text(2, "Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 90);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_9_div_18_div_1_div_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r11);
      const img_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteCarouselImage(img_r9.id));
    });
    \u0275\u0275text(4, "Eliminar");
    \u0275\u0275elementEnd()();
  }
}
function ConfiguracionComponent_div_9_div_18_div_1_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 88)(1, "button", 91);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_9_div_18_div_1_div_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const img_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.saveCarouselEdit(img_r9.id));
    });
    \u0275\u0275text(2, "Guardar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 92);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_9_div_18_div_1_div_8_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.cancelEditCarousel());
    });
    \u0275\u0275text(4, "Cancelar");
    \u0275\u0275elementEnd()();
  }
}
function ConfiguracionComponent_div_9_div_18_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74)(1, "div", 75);
    \u0275\u0275element(2, "img", 76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 77);
    \u0275\u0275template(4, ConfiguracionComponent_div_9_div_18_div_1_div_4_Template, 5, 2, "div", 78)(5, ConfiguracionComponent_div_9_div_18_div_1_div_5_Template, 3, 2, "div", 79);
    \u0275\u0275elementStart(6, "div", 80);
    \u0275\u0275template(7, ConfiguracionComponent_div_9_div_18_div_1_div_7_Template, 5, 0, "div", 81)(8, ConfiguracionComponent_div_9_div_18_div_1_div_8_Template, 5, 0, "div", 81);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const img_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r0.getCarouselImageUrl(img_r9.id), \u0275\u0275sanitizeUrl)("alt", img_r9.caption);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.editingCarouselId !== img_r9.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.editingCarouselId === img_r9.id);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.editingCarouselId !== img_r9.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.editingCarouselId === img_r9.id);
  }
}
function ConfiguracionComponent_div_9_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275template(1, ConfiguracionComponent_div_9_div_18_div_1_Template, 9, 6, "div", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.carouselImages);
  }
}
function ConfiguracionComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47)(2, "div", 48)(3, "h4");
    \u0275\u0275element(4, "i", 17);
    \u0275\u0275text(5, " Agregar Nueva Imagen");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 49);
    \u0275\u0275listener("dragover", function ConfiguracionComponent_div_9_Template_div_dragover_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r0.carouselDragOver = true);
    })("dragleave", function ConfiguracionComponent_div_9_Template_div_dragleave_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.carouselDragOver = false);
    })("drop", function ConfiguracionComponent_div_9_Template_div_drop_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCarouselDrop($event));
    });
    \u0275\u0275elementStart(7, "input", 50, 0);
    \u0275\u0275listener("change", function ConfiguracionComponent_div_9_Template_input_change_7_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCarouselFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, ConfiguracionComponent_div_9_div_9_Template, 9, 0, "div", 51)(10, ConfiguracionComponent_div_9_div_10_Template, 9, 3, "div", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 53)(12, "div", 25)(13, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_div_9_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.carouselCaption, $event) || (ctx_r0.carouselCaption = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 30);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_9_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.uploadCarouselImage());
    });
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(16, ConfiguracionComponent_div_9_div_16_Template, 4, 0, "div", 55)(17, ConfiguracionComponent_div_9_div_17_Template, 3, 0, "div", 56)(18, ConfiguracionComponent_div_9_div_18_Template, 2, 1, "div", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275classProp("drag-over", ctx_r0.carouselDragOver)("has-file", ctx_r0.carouselFile);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r0.carouselFile);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.carouselFile && ctx_r0.carouselPreviewUrl);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.carouselCaption);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.carouselFile || !ctx_r0.carouselCaption.trim() || ctx_r0.uploading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.uploading ? "Subiendo..." : "Agregar Imagen", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.carouselLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.carouselLoading && ctx_r0.carouselImages.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.carouselLoading && ctx_r0.carouselImages.length > 0);
  }
}
function ConfiguracionComponent_div_10_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
function ConfiguracionComponent_div_10_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 108)(1, "p", 109);
    \u0275\u0275text(2, "No hay versiones APK subidas. Agrega una usando el formulario de arriba.");
    \u0275\u0275elementEnd()();
  }
}
function ConfiguracionComponent_div_10_div_23_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 112)(1, "div", 113)(2, "div", 114)(3, "div", 115)(4, "h6", 116);
    \u0275\u0275element(5, "i", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 117);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 118);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 119)(13, "a", 120);
    \u0275\u0275text(14, "Descargar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 90);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_10_div_23_div_1_Template_button_click_15_listener() {
      const v_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteApkVersionItem(v_r15.id));
    });
    \u0275\u0275text(16, "Eliminar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const v_r15 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" v", v_r15.version, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 4, v_r15.fechaSubida, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r15.nombreArchivo);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r0.getApkVersionDownloadUrl(v_r15.id), \u0275\u0275sanitizeUrl);
  }
}
function ConfiguracionComponent_div_10_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 110);
    \u0275\u0275template(1, ConfiguracionComponent_div_10_div_23_div_1_Template, 17, 7, "div", 111);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.apkVersions);
  }
}
function ConfiguracionComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 93)(2, "div", 94)(3, "h5", 95);
    \u0275\u0275element(4, "i", 18);
    \u0275\u0275text(5, " Subir Nueva Versi\xF3n APK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 96)(7, "div", 97)(8, "label", 98);
    \u0275\u0275text(9, "Versi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 99);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_div_10_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.apkVersionUploadVersion, $event) || (ctx_r0.apkVersionUploadVersion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 100)(12, "label", 98);
    \u0275\u0275text(13, "Archivo APK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 101)(15, "input", 102);
    \u0275\u0275listener("change", function ConfiguracionComponent_div_10_Template_input_change_15_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onApkVersionFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "label", 103);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 104)(19, "button", 105);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_10_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.uploadNewApkVersion());
    });
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275template(21, ConfiguracionComponent_div_10_div_21_Template, 4, 0, "div", 55)(22, ConfiguracionComponent_div_10_div_22_Template, 3, 0, "div", 106)(23, ConfiguracionComponent_div_10_div_23_Template, 2, 1, "div", 107);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.apkVersionUploadVersion);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.apkVersionFile ? ctx_r0.apkVersionFile.name : "Seleccionar APK...");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r0.apkVersionFile || !ctx_r0.apkVersionUploadVersion.trim() || ctx_r0.apkVersionUploading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.apkVersionUploading ? "Subiendo..." : "Subir Versi\xF3n", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.apkVersionsLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.apkVersionsLoading && ctx_r0.apkVersions.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.apkVersionsLoading && ctx_r0.apkVersions.length > 0);
  }
}
function ConfiguracionComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275element(1, "app-usuarios");
    \u0275\u0275elementEnd();
  }
}
function ConfiguracionComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275element(1, "app-importar");
    \u0275\u0275elementEnd();
  }
}
function ConfiguracionComponent_div_13_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
function ConfiguracionComponent_div_13_div_7_th_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 129);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rol_r17 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(rol_r17.nombre);
  }
}
function ConfiguracionComponent_div_13_div_7_tr_9_td_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 134)(1, "label", 135)(2, "input", 136);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_div_13_div_7_tr_9_td_3_div_1_Template_input_ngModelChange_2_listener($event) {
      const p_r19 = \u0275\u0275restoreView(_r18).ngIf;
      \u0275\u0275twoWayBindingSet(p_r19.puedeVer, $event) || (p_r19.puedeVer = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " V ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label", 137)(5, "input", 136);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_div_13_div_7_tr_9_td_3_div_1_Template_input_ngModelChange_5_listener($event) {
      const p_r19 = \u0275\u0275restoreView(_r18).ngIf;
      \u0275\u0275twoWayBindingSet(p_r19.puedeCrear, $event) || (p_r19.puedeCrear = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " C ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "label", 138)(8, "input", 136);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_div_13_div_7_tr_9_td_3_div_1_Template_input_ngModelChange_8_listener($event) {
      const p_r19 = \u0275\u0275restoreView(_r18).ngIf;
      \u0275\u0275twoWayBindingSet(p_r19.puedeEditar, $event) || (p_r19.puedeEditar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " E ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "label", 139)(11, "input", 136);
    \u0275\u0275twoWayListener("ngModelChange", function ConfiguracionComponent_div_13_div_7_tr_9_td_3_div_1_Template_input_ngModelChange_11_listener($event) {
      const p_r19 = \u0275\u0275restoreView(_r18).ngIf;
      \u0275\u0275twoWayBindingSet(p_r19.puedeEliminar, $event) || (p_r19.puedeEliminar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " D ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r19 = ctx.ngIf;
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", p_r19.puedeVer);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", p_r19.puedeCrear);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", p_r19.puedeEditar);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", p_r19.puedeEliminar);
  }
}
function ConfiguracionComponent_div_13_div_7_tr_9_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 132);
    \u0275\u0275template(1, ConfiguracionComponent_div_13_div_7_tr_9_td_3_div_1_Template, 13, 4, "div", 133);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rol_r20 = ctx.$implicit;
    const mod_r21 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.getPermiso(rol_r20.id, mod_r21.key));
  }
}
function ConfiguracionComponent_div_13_div_7_tr_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 130);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ConfiguracionComponent_div_13_div_7_tr_9_td_3_Template, 2, 1, "td", 131);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mod_r21 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(mod_r21.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.roles);
  }
}
function ConfiguracionComponent_div_13_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 123)(1, "div", 124)(2, "table", 125)(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "M\xF3dulo");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ConfiguracionComponent_div_13_div_7_th_7_Template, 2, 1, "th", 126);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "tbody");
    \u0275\u0275template(9, ConfiguracionComponent_div_13_div_7_tr_9_Template, 4, 2, "tr", 127);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 128)(11, "button", 30);
    \u0275\u0275listener("click", function ConfiguracionComponent_div_13_div_7_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.savePermisos());
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r0.roles);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.MODULOS);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.permisosSaving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.permisosSaving ? "Guardando..." : "Guardar Permisos", " ");
  }
}
function ConfiguracionComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 121)(2, "h3");
    \u0275\u0275text(3, "Gesti\xF3n de Permisos por Rol");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 39);
    \u0275\u0275text(5, "Define qu\xE9 acciones puede realizar cada rol en cada m\xF3dulo del sistema.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, ConfiguracionComponent_div_13_div_6_Template, 4, 0, "div", 55)(7, ConfiguracionComponent_div_13_div_7_Template, 13, 4, "div", 122);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r0.permisosLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.permisosLoading && ctx_r0.roles.length > 0);
  }
}
var ConfiguracionComponent = class _ConfiguracionComponent {
  constructor(api) {
    this.api = api;
    this.activeTab = "config";
    this.config = { nombrePartido: "", descripcion: "" };
    this.logoUrl = null;
    this.selectedLogo = null;
    this.loading = false;
    this.saving = false;
    this.uploading = false;
    this.successMsg = "";
    this.errorMsg = "";
    this.API_URL = environment.apiUrl;
    this.apkNombre = null;
    this.apkVersion = null;
    this.apkVersionInput = "";
    this.manualUrl = `${this.API_URL}/configuracion/manual?t=${(/* @__PURE__ */ new Date()).getTime()}`;
    this.apkDownloadUrl = "";
    this.tieneApk = false;
    this.selectedApk = null;
    this.uploadingApk = false;
    this.apkVersions = [];
    this.apkVersionsLoading = false;
    this.apkVersionUploadVersion = "";
    this.apkVersionFile = null;
    this.apkVersionUploading = false;
    this.carouselImages = [];
    this.carouselLoading = false;
    this.carouselFile = null;
    this.carouselPreviewUrl = null;
    this.carouselCaption = "";
    this.carouselDragOver = false;
    this.editingCarouselId = null;
    this.editCaption = "";
    this.editOrden = 0;
    this.roles = [];
    this.permisos = [];
    this.permisosLoading = false;
    this.permisosSaving = false;
    this.MODULOS = [
      { key: "ELECCIONES", label: "Elecciones" },
      { key: "ZONAS", label: "Zonas" },
      { key: "PROVINCIAS", label: "Provincias" },
      { key: "CANTONES", label: "Cantones" },
      { key: "PARROQUIAS", label: "Parroquias" },
      { key: "INSTITUCIONES", label: "Instituciones" },
      { key: "PARTIDOS", label: "Partidos" },
      { key: "CARGOS", label: "Cargos" },
      { key: "CANDIDATOS", label: "Candidatos" },
      { key: "MESAS", label: "Mesas" },
      { key: "USUARIOS", label: "Usuarios" },
      { key: "CONFIGURACION", label: "Configuraci\xF3n" }
    ];
  }
  ngOnInit() {
    this.loadConfig();
    this.loadCarousel();
    this.loadApkVersions();
    this.loadRoles();
    this.loadPermisos();
  }
  loadConfig() {
    this.loading = true;
    this.api.getConfiguracion().subscribe({
      next: (res) => {
        this.config = res;
        this.logoUrl = res.tieneLogo ? `${this.API_URL}/configuracion/logo?t=${(/* @__PURE__ */ new Date()).getTime()}` : null;
        this.tieneApk = res.tieneApk;
        this.apkNombre = res.apkNombre || null;
        this.apkVersion = res.apkVersion || null;
        this.apkVersionInput = res.apkVersion || "";
        this.apkDownloadUrl = `${this.API_URL}/configuracion/apk?t=${(/* @__PURE__ */ new Date()).getTime()}`;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = "Error al cargar la configuraci\xF3n";
        this.loading = false;
      }
    });
  }
  onLogoSelected(event) {
    this.selectedLogo = event.target.files?.[0] || null;
  }
  uploadLogo() {
    if (!this.selectedLogo)
      return;
    this.uploading = true;
    this.errorMsg = "";
    this.successMsg = "";
    this.api.uploadLogo(this.selectedLogo).subscribe({
      next: () => {
        this.uploading = false;
        this.selectedLogo = null;
        this.successMsg = "Logo actualizado correctamente";
        this.logoUrl = `${this.API_URL}/configuracion/logo?t=${(/* @__PURE__ */ new Date()).getTime()}`;
      },
      error: (err) => {
        this.uploading = false;
        this.errorMsg = err.error?.message || "Error al subir el logo";
      }
    });
  }
  deleteLogo() {
    this.uploading = true;
    this.errorMsg = "";
    this.successMsg = "";
    this.api.deleteLogo().subscribe({
      next: () => {
        this.uploading = false;
        this.logoUrl = null;
        this.successMsg = "Logo eliminado correctamente";
      },
      error: (err) => {
        this.uploading = false;
        this.errorMsg = err.error?.message || "Error al eliminar el logo";
      }
    });
  }
  saveConfig() {
    this.saving = true;
    this.errorMsg = "";
    this.successMsg = "";
    this.api.updateConfiguracion(this.config).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = "Configuraci\xF3n guardada correctamente";
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err.error?.message || "Error al guardar la configuraci\xF3n";
      }
    });
  }
  // APK methods
  getApkDownloadUrl() {
    return `${this.API_URL}/configuracion/apk?t=${(/* @__PURE__ */ new Date()).getTime()}`;
  }
  getManualUrl() {
    return `${this.API_URL}/configuracion/manual?t=${(/* @__PURE__ */ new Date()).getTime()}`;
  }
  onApkSelected(event) {
    this.selectedApk = event.target.files?.[0] || null;
  }
  uploadApk() {
    if (!this.selectedApk)
      return;
    this.uploadingApk = true;
    this.errorMsg = "";
    this.successMsg = "";
    const version = this.apkVersionInput.trim() || "1.0.0";
    this.api.uploadApk(this.selectedApk, version).subscribe({
      next: (res) => {
        this.uploadingApk = false;
        this.selectedApk = null;
        this.tieneApk = true;
        this.apkNombre = res.apkNombre || "app.apk";
        this.apkVersion = res.apkVersion || version;
        this.apkVersionInput = this.apkVersion || "";
        this.successMsg = "APK subido correctamente";
      },
      error: (err) => {
        this.uploadingApk = false;
        this.errorMsg = err.error?.message || "Error al subir el APK";
      }
    });
  }
  deleteApk() {
    if (!confirm("\xBFEliminar el archivo APK?"))
      return;
    this.uploadingApk = true;
    this.errorMsg = "";
    this.successMsg = "";
    this.api.deleteApk().subscribe({
      next: () => {
        this.uploadingApk = false;
        this.tieneApk = false;
        this.apkNombre = null;
        this.apkVersion = null;
        this.apkVersionInput = "";
        this.successMsg = "APK eliminado correctamente";
      },
      error: (err) => {
        this.uploadingApk = false;
        this.errorMsg = err.error?.message || "Error al eliminar el APK";
      }
    });
  }
  // APK version list methods
  loadApkVersions() {
    this.apkVersionsLoading = true;
    this.api.getApkVersions().subscribe({
      next: (res) => {
        this.apkVersions = res;
        this.apkVersionsLoading = false;
      },
      error: () => {
        this.apkVersionsLoading = false;
      }
    });
  }
  onApkVersionFileSelected(event) {
    this.apkVersionFile = event.target.files?.[0] || null;
  }
  uploadNewApkVersion() {
    if (!this.apkVersionFile || !this.apkVersionUploadVersion.trim())
      return;
    this.apkVersionUploading = true;
    this.errorMsg = "";
    this.successMsg = "";
    this.api.uploadApkVersion(this.apkVersionFile, this.apkVersionUploadVersion.trim()).subscribe({
      next: () => {
        this.apkVersionUploading = false;
        this.apkVersionFile = null;
        this.apkVersionUploadVersion = "";
        this.successMsg = "Versi\xF3n APK subida correctamente";
        this.loadApkVersions();
      },
      error: (err) => {
        this.apkVersionUploading = false;
        this.errorMsg = err.error?.message || "Error al subir versi\xF3n APK";
      }
    });
  }
  deleteApkVersionItem(id) {
    if (!confirm("\xBFEliminar esta versi\xF3n APK?"))
      return;
    this.api.deleteApkVersion(id).subscribe({
      next: () => {
        this.successMsg = "Versi\xF3n APK eliminada correctamente";
        this.loadApkVersions();
      },
      error: (err) => {
        this.errorMsg = err.error?.message || "Error al eliminar";
      }
    });
  }
  getApkVersionDownloadUrl(id) {
    return this.api.getApkVersionDownloadUrl(id);
  }
  // Carousel methods
  loadCarousel() {
    this.carouselLoading = true;
    this.api.getCarouselImages().subscribe({
      next: (res) => {
        this.carouselImages = res;
        this.carouselLoading = false;
      },
      error: () => {
        this.carouselLoading = false;
      }
    });
  }
  getCarouselImageUrl(id) {
    return `${this.API_URL}/carousel/${id}/image`;
  }
  setCarouselFile(file) {
    this.carouselFile = file;
    if (this.carouselPreviewUrl) {
      URL.revokeObjectURL(this.carouselPreviewUrl);
      this.carouselPreviewUrl = null;
    }
    if (file)
      this.carouselPreviewUrl = URL.createObjectURL(file);
  }
  onCarouselFileSelected(event) {
    this.setCarouselFile(event.target.files?.[0] || null);
  }
  onCarouselDrop(event) {
    event.preventDefault();
    this.carouselDragOver = false;
    this.setCarouselFile(event.dataTransfer?.files?.[0] || null);
  }
  clearCarouselFile() {
    this.setCarouselFile(null);
  }
  uploadCarouselImage() {
    if (!this.carouselFile || !this.carouselCaption.trim())
      return;
    this.uploading = true;
    this.errorMsg = "";
    this.successMsg = "";
    const nextOrden = this.carouselImages.length > 0 ? Math.max(...this.carouselImages.map((i) => i.orden)) + 1 : 1;
    this.api.uploadCarouselImage(this.carouselFile, this.carouselCaption, nextOrden).subscribe({
      next: () => {
        this.uploading = false;
        this.setCarouselFile(null);
        this.carouselCaption = "";
        this.successMsg = "Imagen del carrusel subida correctamente";
        this.loadCarousel();
      },
      error: (err) => {
        this.uploading = false;
        this.errorMsg = err.error?.message || "Error al subir imagen";
      }
    });
  }
  startEditCarousel(img) {
    this.editingCarouselId = img.id;
    this.editCaption = img.caption;
    this.editOrden = img.orden;
  }
  cancelEditCarousel() {
    this.editingCarouselId = null;
  }
  saveCarouselEdit(id) {
    if (!this.editCaption.trim())
      return;
    this.api.updateCarouselImage(id, { caption: this.editCaption, orden: this.editOrden }).subscribe({
      next: () => {
        this.editingCarouselId = null;
        this.successMsg = "Imagen actualizada correctamente";
        this.loadCarousel();
      },
      error: (err) => {
        this.errorMsg = err.error?.message || "Error al actualizar";
      }
    });
  }
  deleteCarouselImage(id) {
    if (!confirm("\xBFEliminar esta imagen del carrusel?"))
      return;
    this.api.deleteCarouselImage(id).subscribe({
      next: () => {
        this.successMsg = "Imagen eliminada correctamente";
        this.loadCarousel();
      },
      error: (err) => {
        this.errorMsg = err.error?.message || "Error al eliminar";
      }
    });
  }
  // Permisos
  loadRoles() {
    this.api.getRoles().subscribe({
      next: (res) => {
        this.roles = res;
      },
      error: () => {
      }
    });
  }
  loadPermisos() {
    this.permisosLoading = true;
    this.api.getPermisos().subscribe({
      next: (res) => {
        this.permisos = res;
        this.permisosLoading = false;
      },
      error: () => {
        this.permisosLoading = false;
      }
    });
  }
  getPermiso(rolId, modulo) {
    return this.permisos.find((p) => p.rolId === rolId && p.modulo === modulo);
  }
  togglePermiso(permiso, campo) {
    if (!permiso)
      return;
    permiso[campo] = !permiso[campo];
  }
  savePermisos() {
    this.permisosSaving = true;
    this.errorMsg = "";
    this.successMsg = "";
    let completed = 0;
    const total = this.permisos.length;
    this.permisos.forEach((p) => {
      this.api.updatePermiso(p.id, {
        rolId: p.rolId,
        modulo: p.modulo,
        puedeVer: p.puedeVer,
        puedeCrear: p.puedeCrear,
        puedeEditar: p.puedeEditar,
        puedeEliminar: p.puedeEliminar
      }).subscribe({
        next: () => {
          completed++;
          if (completed === total) {
            this.permisosSaving = false;
            this.successMsg = "Permisos guardados correctamente";
          }
        },
        error: () => {
          completed++;
          this.errorMsg = "Error al guardar algunos permisos";
          if (completed === total)
            this.permisosSaving = false;
        }
      });
    });
  }
  static {
    this.\u0275fac = function ConfiguracionComponent_Factory(t) {
      return new (t || _ConfiguracionComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfiguracionComponent, selectors: [["app-configuracion"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 14, vars: 10, consts: [["carouselFileInput", ""], [1, "container"], [1, "page-header"], ["class", "text-center py-5", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "tabs", 4, "ngIf"], ["class", "config-grid", 4, "ngIf"], ["class", "tab-content", 4, "ngIf"], [1, "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "alert", "alert-success"], [1, "alert", "alert-danger"], [1, "tabs"], [1, "tab", 3, "click"], [1, "bi", "bi-gear"], [1, "bi", "bi-camera"], [1, "bi", "bi-phone"], [1, "bi", "bi-people"], [1, "bi", "bi-box-arrow-in-down"], [1, "bi", "bi-shield-lock"], [1, "config-grid"], [1, "card"], [1, "bi", "bi-tag"], [1, "form-group"], ["for", "nombrePartido"], ["id", "nombrePartido", "type", "text", "autocomplete", "off", "placeholder", "Nombre del partido pol\xEDtico", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "descripcion"], ["id", "descripcion", "autocomplete", "off", "rows", "3", "placeholder", "Descripci\xF3n breve del partido", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "bi", "bi-image"], [1, "logo-preview"], ["class", "logo-display", 4, "ngIf"], ["class", "logo-placeholder", 4, "ngIf"], [1, "upload-section"], ["type", "file", "autocomplete", "off", "accept", "image/png,image/jpeg,image/webp", "id", "logoInput", 3, "change"], ["for", "logoInput", 1, "file-label"], [1, "bi", "bi-book"], [1, "text-muted"], ["download", "", 1, "btn", "btn-primary", 3, "href"], [1, "bi", "bi-file-pdf"], [1, "logo-display"], ["alt", "Logo del partido", 1, "logo-img", 3, "src"], [1, "btn", "btn-outline-danger", "btn-sm", 3, "click", "disabled"], [1, "logo-placeholder"], [1, "tab-content"], [1, "carousel-upload-card"], [1, "upload-header"], [1, "drop-zone", 3, "dragover", "dragleave", "drop"], ["type", "file", "autocomplete", "off", "accept", "image/png,image/jpeg,image/webp", 3, "change"], ["class", "drop-content", 3, "click", 4, "ngIf"], ["class", "drop-preview", 4, "ngIf"], [1, "form-row"], ["type", "text", "autocomplete", "off", "placeholder", "Descripci\xF3n de la imagen", 1, "form-control", 3, "ngModelChange", "ngModel"], ["class", "text-center py-3", 4, "ngIf"], ["class", "empty-carousel", 4, "ngIf"], ["class", "carousel-grid", 4, "ngIf"], [1, "drop-content", 3, "click"], [1, "drop-icon"], [1, "drop-text"], [1, "drop-link"], [1, "drop-hint"], [1, "drop-preview"], ["alt", "Preview", 1, "drop-preview-img", 3, "src"], [1, "drop-preview-info"], [1, "drop-preview-name"], [1, "drop-preview-size"], [1, "btn-clear-file", 3, "click"], [1, "bi", "bi-x-lg"], [1, "text-center", "py-3"], [1, "empty-carousel"], [1, "carousel-grid"], ["class", "carousel-image-card", 4, "ngFor", "ngForOf"], [1, "carousel-image-card"], [1, "carousel-img-preview"], [3, "src", "alt"], [1, "carousel-img-info"], ["class", "carousel-img-details", 4, "ngIf"], ["class", "carousel-img-edit", 4, "ngIf"], [1, "carousel-img-actions"], ["class", "btn-group", 4, "ngIf"], [1, "carousel-img-details"], [1, "carousel-img-caption"], [1, "carousel-img-orden"], [1, "carousel-img-edit"], ["type", "text", "autocomplete", "off", "placeholder", "Descripci\xF3n", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel"], ["type", "number", "autocomplete", "off", "min", "0", "placeholder", "Orden", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel"], [1, "btn-group"], [1, "btn", "btn-sm", "btn-outline-primary", 3, "click"], [1, "btn", "btn-sm", "btn-outline-danger", 3, "click"], [1, "btn", "btn-sm", "btn-primary", 3, "click"], [1, "btn", "btn-sm", "btn-outline-secondary", 3, "click"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title", "mb-3"], [1, "row", "g-3", "align-items-end"], [1, "col-md-3"], [1, "form-label"], ["type", "text", "autocomplete", "off", "placeholder", "Ej: 1.0.0", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-md-5"], [1, "input-group"], ["type", "file", "autocomplete", "off", "accept", ".apk", "id", "apkVersionInput", 1, "d-none", 3, "change"], ["for", "apkVersionInput", 1, "form-control", "cursor-pointer", 2, "cursor", "pointer", "background", "#f8fafc"], [1, "col-md-4"], [1, "btn", "btn-primary", "w-100", 3, "click", "disabled"], ["class", "text-center py-5 text-muted", 4, "ngIf"], ["class", "row g-3", 4, "ngIf"], [1, "text-center", "py-5", "text-muted"], [1, "mb-0"], [1, "row", "g-3"], ["class", "col-md-4 col-lg-3", 4, "ngFor", "ngForOf"], [1, "col-md-4", "col-lg-3"], [1, "card", "h-100", "shadow-sm"], [1, "card-body", "d-flex", "flex-column"], [1, "d-flex", "justify-content-between", "align-items-start", "mb-2"], [1, "card-title", "mb-0"], [1, "badge", "bg-light", "text-muted", "small"], [1, "card-text", "small", "text-muted", "mb-3", "flex-grow-1"], [1, "d-flex", "gap-2"], ["download", "", 1, "btn", "btn-sm", "btn-success", 3, "href"], [1, "permisos-header"], ["class", "permisos-matrix", 4, "ngIf"], [1, "permisos-matrix"], [1, "table-responsive"], [1, "table", "table-bordered", "table-permisos"], ["class", "text-center rol-header", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], [1, "permisos-actions"], [1, "text-center", "rol-header"], [1, "modulo-name"], ["class", "text-center", 4, "ngFor", "ngForOf"], [1, "text-center"], ["class", "permiso-group", 4, "ngIf"], [1, "permiso-group"], ["title", "Ver", 1, "permiso-check"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["title", "Crear", 1, "permiso-check"], ["title", "Editar", 1, "permiso-check"], ["title", "Eliminar", 1, "permiso-check"]], template: function ConfiguracionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h2");
        \u0275\u0275text(3, "Configuraci\xF3n del Sistema");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(4, ConfiguracionComponent_div_4_Template, 4, 0, "div", 3)(5, ConfiguracionComponent_div_5_Template, 2, 1, "div", 4)(6, ConfiguracionComponent_div_6_Template, 2, 1, "div", 5)(7, ConfiguracionComponent_div_7_Template, 25, 12, "div", 6)(8, ConfiguracionComponent_div_8_Template, 40, 10, "div", 7)(9, ConfiguracionComponent_div_9_Template, 19, 12, "div", 8)(10, ConfiguracionComponent_div_10_Template, 24, 7, "div", 8)(11, ConfiguracionComponent_div_11_Template, 2, 0, "div", 8)(12, ConfiguracionComponent_div_12_Template, 2, 0, "div", 8)(13, ConfiguracionComponent_div_13_Template, 8, 2, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.successMsg);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMsg);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.activeTab === "config");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.activeTab === "carousel");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.activeTab === "apk");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.activeTab === "usuarios");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.activeTab === "importar");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.activeTab === "permisos");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, MinValidator, NgModel, UsuariosComponent, ImportarComponent], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 24px;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--alantek-text);\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.config-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n@media (max-width: 768px) {\n  .config-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.card[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 20px 0;\n  color: var(--alantek-text);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--alantek-text-secondary);\n  margin-bottom: 6px;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px;\n  border: 1.5px solid var(--alantek-border);\n  border-radius: 8px;\n  font-size: 14px;\n  transition: border-color 0.2s;\n  box-sizing: border-box;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--alantek-primary);\n  box-shadow: 0 0 0 3px rgba(217, 119, 50, 0.15);\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--alantek-primary);\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--alantek-primary-strong);\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-outline-danger[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1.5px solid var(--alantek-danger);\n  color: var(--alantek-danger);\n  margin-top: 8px;\n}\n.btn-outline-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--alantek-danger);\n  color: white;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  font-size: 13px;\n}\n.logo-preview[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 16px;\n}\n.logo-display[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.logo-img[_ngcontent-%COMP%] {\n  max-width: 180px;\n  max-height: 180px;\n  border-radius: 12px;\n  border: 2px solid var(--alantek-border);\n  object-fit: contain;\n  margin-bottom: 8px;\n}\n.logo-placeholder[_ngcontent-%COMP%] {\n  width: 180px;\n  height: 180px;\n  border: 2px dashed var(--alantek-border-strong);\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--alantek-text-muted);\n  font-size: 14px;\n}\n.upload-section[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.upload-section[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.file-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 10px 18px;\n  background: var(--alantek-background);\n  border: 1.5px dashed var(--alantek-border-strong);\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 13px;\n  color: var(--alantek-text-secondary);\n  flex: 1;\n  min-width: 140px;\n  transition: all 0.2s;\n}\n.file-label[_ngcontent-%COMP%]:hover {\n  border-color: var(--alantek-primary);\n  background: var(--alantek-info-bg);\n  color: var(--alantek-primary-strong);\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  margin-bottom: 16px;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: var(--alantek-success-bg);\n  color: var(--alantek-success);\n  border: 1px solid var(--alantek-success);\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg);\n  color: var(--alantek-danger);\n  border: 1px solid var(--alantek-danger);\n}\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  margin-bottom: 24px;\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  padding: 4px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.tab[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 20px;\n  border: none;\n  background: transparent;\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--alantek-text-muted);\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.tab[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n  color: var(--alantek-text);\n}\n.tab.active[_ngcontent-%COMP%] {\n  background: var(--alantek-primary);\n  color: white;\n  box-shadow: 0 2px 8px rgba(27, 36, 29, 0.3);\n}\n.tab-content[_ngcontent-%COMP%] {\n  min-height: 200px;\n}\n.carousel-upload-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  padding: 20px 24px;\n  margin-bottom: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.upload-header[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.upload-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--alantek-text);\n}\n.upload-header[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%], .drop-zone[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n}\n.form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 180px;\n  margin-bottom: 0;\n}\n.form-row[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.drop-zone[_ngcontent-%COMP%] {\n  border: 2px dashed var(--alantek-border-strong);\n  border-radius: 12px;\n  padding: 20px;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-bottom: 16px;\n  background: var(--alantek-background);\n}\n.drop-zone[_ngcontent-%COMP%]:hover {\n  border-color: var(--alantek-primary);\n  background: var(--alantek-info-bg);\n}\n.drop-zone.drag-over[_ngcontent-%COMP%] {\n  border-color: var(--alantek-primary);\n  background: var(--alantek-info-bg);\n  border-style: solid;\n  transform: scale(1.01);\n}\n.drop-zone.has-file[_ngcontent-%COMP%] {\n  border-style: solid;\n  border-color: var(--alantek-success);\n  background: var(--alantek-success-bg);\n  padding: 12px;\n}\n.drop-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n.drop-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  line-height: 1;\n  margin-bottom: 4px;\n}\n.drop-text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: var(--alantek-text-secondary);\n}\n.drop-link[_ngcontent-%COMP%] {\n  color: var(--alantek-primary);\n  font-weight: 600;\n  text-decoration: underline;\n}\n.drop-hint[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  color: var(--alantek-text-muted);\n}\n.drop-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.drop-preview-img[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 8px;\n  border: 1px solid var(--alantek-border);\n}\n.drop-preview-info[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: left;\n  min-width: 0;\n}\n.drop-preview-name[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--alantek-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.drop-preview-size[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--alantek-text-muted);\n}\n.btn-clear-file[_ngcontent-%COMP%] {\n  background: var(--alantek-background);\n  border: none;\n  border-radius: 50%;\n  width: 28px;\n  height: 28px;\n  font-size: 14px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--alantek-text-muted);\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n.btn-clear-file[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-danger-bg);\n  color: var(--alantek-danger);\n}\n.empty-carousel[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  color: var(--alantek-text-muted);\n}\n.carousel-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 16px;\n}\n.carousel-image-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.carousel-img-preview[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 16 / 10;\n  overflow: hidden;\n  background: var(--alantek-background);\n}\n.carousel-img-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.carousel-img-info[_ngcontent-%COMP%] {\n  padding: 12px;\n}\n.carousel-img-details[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.carousel-img-caption[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--alantek-text);\n}\n.carousel-img-orden[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--alantek-text-muted);\n}\n.carousel-img-edit[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n.carousel-img-edit[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.carousel-img-edit[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:last-child {\n  max-width: 80px;\n}\n.carousel-img-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.btn-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.btn-outline-primary[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1.5px solid var(--alantek-primary);\n  color: var(--alantek-primary);\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-primary);\n  color: white;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1.5px solid var(--alantek-border-strong);\n  color: var(--alantek-text-muted);\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-background);\n}\n.form-control-sm[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  font-size: 13px;\n}\n.card-apk[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.apk-status[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.apk-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  align-items: center;\n}\n.apk-file-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--alantek-text);\n}\n.apk-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px;\n  background: var(--alantek-background);\n  border-radius: 8px;\n  border: 1px dashed var(--alantek-border-strong);\n  color: var(--alantek-text-muted);\n  font-size: 14px;\n}\n.apk-version-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: var(--alantek-info-bg);\n  color: var(--alantek-info);\n  font-size: 12px;\n  font-weight: 700;\n  padding: 2px 10px;\n  border-radius: 12px;\n}\n.apk-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.btn-success[_ngcontent-%COMP%] {\n  background: var(--alantek-success);\n  color: white;\n  box-shadow: 0 2px 8px rgba(27, 36, 29, 0.3);\n}\n.btn-success[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-success);\n  transform: translateY(-1px);\n}\n.permisos-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.permisos-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: var(--alantek-text);\n}\n.permisos-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n}\n.permisos-matrix[_ngcontent-%COMP%] {\n  background: var(--alantek-surface);\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.table-permisos[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.table-permisos[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-permisos[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 8px;\n  border: 1px solid var(--alantek-border);\n  vertical-align: middle;\n}\n.table-permisos[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: var(--alantek-background);\n  font-weight: 600;\n  color: var(--alantek-text);\n  white-space: nowrap;\n}\n.table-permisos[_ngcontent-%COMP%]   .rol-header[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  font-size: 11px;\n  letter-spacing: 0.5px;\n}\n.modulo-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--alantek-text-secondary);\n  white-space: nowrap;\n}\n.permiso-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  justify-content: center;\n  flex-wrap: nowrap;\n}\n.permiso-check[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--alantek-text-muted);\n  cursor: pointer;\n}\n.permiso-check[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  cursor: pointer;\n  accent-color: var(--alantek-primary);\n}\n.permisos-actions[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  display: flex;\n  justify-content: flex-end;\n}\n/*# sourceMappingURL=configuracion.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfiguracionComponent, { className: "ConfiguracionComponent", filePath: "app\\features\\admin\\pages\\configuracion\\configuracion.component.ts", lineNumber: 17 });
})();
export {
  ConfiguracionComponent
};
//# sourceMappingURL=chunk-CBS7FL5U.js.map
