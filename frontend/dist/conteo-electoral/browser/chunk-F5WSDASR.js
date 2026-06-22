import {
  ApiService
} from "./chunk-5ZU65LVT.js";
import {
  FormsModule
} from "./chunk-XIYYPGDW.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7A5LCT4I.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/admin/pages/importar/importar.component.ts
function ImportarComponent_span_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\uF4C1 Seleccionar archivo Excel...");
    \u0275\u0275elementEnd();
  }
}
function ImportarComponent_span_40_Template(rf, ctx) {
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
function ImportarComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function ImportarComponent_div_44_div_34_li_4_Template(rf, ctx) {
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
function ImportarComponent_div_44_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "h5");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul");
    \u0275\u0275template(4, ImportarComponent_div_44_div_34_li_4_Template, 2, 1, "li", 19);
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
function ImportarComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "h4");
    \u0275\u0275text(2, "Resultado de la Importaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 13)(4, "div", 14)(5, "span", 15);
    \u0275\u0275text(6, "Filas procesadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 16);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 14)(10, "span", 15);
    \u0275\u0275text(11, "Zonas creadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 16);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 14)(15, "span", 15);
    \u0275\u0275text(16, "Provincias creadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 16);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 14)(20, "span", 15);
    \u0275\u0275text(21, "Cantones creados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 16);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 14)(25, "span", 15);
    \u0275\u0275text(26, "Parroquias creadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 16);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 14)(30, "span", 15);
    \u0275\u0275text(31, "Instituciones creadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 16);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(34, ImportarComponent_div_44_div_34_Template, 5, 2, "div", 17);
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
  static {
    this.\u0275fac = function ImportarComponent_Factory(t) {
      return new (t || _ImportarComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ImportarComponent, selectors: [["app-importar"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 45, vars: 6, consts: [[1, "container"], [1, "page-header"], [1, "card"], [1, "upload-section"], [1, "file-input-area"], ["type", "file", "accept", ".xlsx,.xls", "id", "fileInput", 3, "change"], ["for", "fileInput", 1, "file-label"], [4, "ngIf"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "result-card", 4, "ngIf"], [1, "alert", "alert-danger"], [1, "result-card"], [1, "result-grid"], [1, "result-item"], [1, "result-label"], [1, "result-value"], ["class", "errores-list mt-3", 4, "ngIf"], [1, "errores-list", "mt-3"], [4, "ngFor", "ngForOf"]], template: function ImportarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
        \u0275\u0275text(3, "Importar Datos desde Excel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 2)(5, "h5");
        \u0275\u0275text(6, "Instrucciones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p");
        \u0275\u0275text(8, "Sube un archivo Excel (.xlsx) con las siguientes columnas en la primera fila (encabezados):");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "ul")(10, "li")(11, "strong");
        \u0275\u0275text(12, "zona");
        \u0275\u0275elementEnd();
        \u0275\u0275text(13, " \u2014 Nombre de la zona (requerido)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "li")(15, "strong");
        \u0275\u0275text(16, "provincia");
        \u0275\u0275elementEnd();
        \u0275\u0275text(17, " \u2014 Nombre de la provincia (requerido)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "li")(19, "strong");
        \u0275\u0275text(20, "canton");
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, " \u2014 Nombre del cant\xF3n (requerido)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "li")(23, "strong");
        \u0275\u0275text(24, "parroquia");
        \u0275\u0275elementEnd();
        \u0275\u0275text(25, " \u2014 Nombre de la parroquia (requerido)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "li")(27, "strong");
        \u0275\u0275text(28, "institucion");
        \u0275\u0275elementEnd();
        \u0275\u0275text(29, " o ");
        \u0275\u0275elementStart(30, "strong");
        \u0275\u0275text(31, "recinto");
        \u0275\u0275elementEnd();
        \u0275\u0275text(32, " \u2014 Nombre de la instituci\xF3n educativa (opcional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "p");
        \u0275\u0275text(34, "El sistema recorrer\xE1 cada fila y crear\xE1 autom\xE1ticamente los registros que no existan en la jerarqu\xEDa: Zona \u2192 Provincia \u2192 Cant\xF3n \u2192 Parroquia \u2192 Instituci\xF3n.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(35, "div", 3)(36, "div", 4)(37, "input", 5);
        \u0275\u0275listener("change", function ImportarComponent_Template_input_change_37_listener($event) {
          return ctx.onFileSelected($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "label", 6);
        \u0275\u0275template(39, ImportarComponent_span_39_Template, 2, 0, "span", 7)(40, ImportarComponent_span_40_Template, 2, 1, "span", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "button", 8);
        \u0275\u0275listener("click", function ImportarComponent_Template_button_click_41_listener() {
          return ctx.importar();
        });
        \u0275\u0275text(42);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(43, ImportarComponent_div_43_Template, 2, 1, "div", 9)(44, ImportarComponent_div_44_Template, 35, 7, "div", 10);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(39);
        \u0275\u0275property("ngIf", !ctx.selectedFile);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedFile);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", !ctx.selectedFile || ctx.importing);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.importing ? "Importando..." : "Importar Datos", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMessage);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.result);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1e293b;\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  margin-bottom: 24px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.card[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 12px 0;\n  color: #1e293b;\n}\n.card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0 0 0 20px;\n  color: #475569;\n}\n.card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #475569;\n  font-size: 14px;\n  margin: 8px 0;\n}\n.upload-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 32px;\n  text-align: center;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  margin-bottom: 24px;\n}\n.file-input-area[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.file-input-area[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.file-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 28px;\n  background: #f8fafc;\n  border: 2px dashed #cbd5e1;\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 15px;\n  color: #475569;\n  transition: all 0.2s;\n  min-width: 300px;\n}\n.file-label[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  background: #eff6ff;\n  color: #1e40af;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 12px 32px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #4f46e5);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #991b1b;\n  border: 1px solid #fecaca;\n}\n.result-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.result-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  margin: 0 0 16px 0;\n  color: #1e293b;\n}\n.result-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n.result-item[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-radius: 10px;\n  padding: 16px;\n  text-align: center;\n}\n.result-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #64748b;\n  margin-bottom: 8px;\n  font-weight: 600;\n}\n.result-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 28px;\n  font-weight: 700;\n  color: #1e293b;\n}\n.errores-list[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border-radius: 10px;\n  padding: 16px;\n  border: 1px solid #fecaca;\n}\n.errores-list[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #991b1b;\n  margin: 0 0 8px 0;\n}\n.errores-list[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0 0 0 20px;\n}\n.errores-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #991b1b;\n  margin-bottom: 4px;\n}\n.mt-3[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.mt-4[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n/*# sourceMappingURL=importar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImportarComponent, { className: "ImportarComponent", filePath: "app\\features\\admin\\pages\\importar\\importar.component.ts", lineNumber: 13 });
})();
export {
  ImportarComponent
};
//# sourceMappingURL=chunk-F5WSDASR.js.map
