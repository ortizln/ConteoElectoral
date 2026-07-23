import {
  AuthService,
  Router
} from "./chunk-KZU2HTPH.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-27N6N5MO.js";
import {
  ApiService
} from "./chunk-QBYPS4NP.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  environment,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
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
} from "./chunk-3DSQS3EE.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent__svg_path_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 41);
  }
}
function LoginComponent__svg_circle_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "circle", 42);
  }
}
function LoginComponent__svg_path_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 43);
  }
}
function LoginComponent__svg_line_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 44);
  }
}
function LoginComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function LoginComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47);
    \u0275\u0275text(2, "\u{1F4F7}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Bienvenido al Sistema de Conteo Electoral");
    \u0275\u0275elementEnd()();
  }
}
function LoginComponent_div_49_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "img", 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const img_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", i_r3 === ctx_r0.currentIndex);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.getImageUrl(img_r2.id), \u0275\u0275sanitizeUrl)("alt", img_r2.caption);
  }
}
function LoginComponent_div_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275template(1, LoginComponent_div_49_div_1_Template, 2, 4, "div", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.images);
  }
}
function LoginComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.images[ctx_r0.currentIndex].caption, " ");
  }
}
function LoginComponent_div_51_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function LoginComponent_div_51_button_1_Template_button_click_0_listener() {
      const i_r5 = \u0275\u0275restoreView(_r4).index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.goToSlide(i_r5));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", i_r5 === ctx_r0.currentIndex);
  }
}
function LoginComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275template(1, LoginComponent_div_51_button_1_Template, 1, 2, "button", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.images);
  }
}
var LoginComponent = class _LoginComponent {
  constructor(authService, api, router) {
    this.authService = authService;
    this.api = api;
    this.router = router;
    this.username = "";
    this.password = "";
    this.showPassword = false;
    this.loading = false;
    this.error = "";
    this.images = [];
    this.currentIndex = 0;
    this.API_URL = environment.apiUrl;
    this.apkDownloadUrl = `${environment.apiUrl}/configuracion/apk`;
  }
  ngOnInit() {
    this.loadImages();
  }
  ngOnDestroy() {
    this.stopCarousel();
  }
  loadImages() {
    this.api.getCarouselImages().subscribe({
      next: (res) => {
        this.images = res;
        if (this.images.length > 1)
          this.startCarousel();
      }
    });
  }
  getImageUrl(id) {
    return `${this.API_URL}/carousel/${id}/image`;
  }
  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5e3);
  }
  stopCarousel() {
    if (this.intervalId)
      clearInterval(this.intervalId);
  }
  goToSlide(index) {
    this.currentIndex = index;
  }
  onSubmit() {
    this.loading = true;
    this.error = "";
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        this.loading = false;
        this.redirectByRole(response.rol);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || "Credenciales inv\xE1lidas";
      }
    });
  }
  redirectByRole(rol) {
    switch (rol) {
      case "ADMIN":
        this.router.navigate(["/admin"]);
        break;
      case "SUPERVISOR":
        this.router.navigate(["/dashboard"]);
        break;
      case "MIEMBRO_MESA":
        this.router.navigate(["/mesa"]);
        break;
      default:
        this.router.navigate(["/dashboard"]);
    }
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 52, vars: 16, consts: [[1, "split-layout"], [1, "left-panel"], [1, "login-card"], [1, "login-header"], [1, "login-form", 3, "ngSubmit"], [1, "form-group"], ["for", "username"], ["id", "username", "type", "text", "name", "username", "placeholder", "Ingrese su usuario", "required", "", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "password"], [1, "password-wrapper"], ["id", "password", "name", "password", "placeholder", "Ingrese su contrase\xF1a", "required", "", "autocomplete", "new-password", 1, "form-control", 3, "ngModelChange", "type", "ngModel"], ["type", "button", 1, "btn-eye", 3, "click"], ["viewBox", "0 0 24 24", "width", "20", "height", "20", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", 4, "ngIf"], ["cx", "12", "cy", "12", "r", "3", 4, "ngIf"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24", 4, "ngIf"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-login", 3, "disabled"], [1, "download-apk"], [1, "apk-card", 3, "href"], [1, "apk-card-icon"], ["viewBox", "0 0 24 24", "fill", "currentColor", "width", "28", "height", "28"], ["d", "M17.523 14.143c-.191.726-.577 1.403-1.133 1.942-.674.666-1.462.935-2.373.808-.315-.038-.635-.094-.945-.147-.33-.052-.658-.106-.98-.106-.345 0-.683.057-1.023.113-.408.067-.817.137-1.232.137-.465 0-.927-.062-1.37-.181-2.076-.528-3.515-2.522-3.515-4.802 0-1.143.376-2.204 1.076-3.108.672-.864 1.596-1.416 2.654-1.566.544-.076 1.096-.097 1.648-.068.19.01.38.03.567.052.256.03.512.06.773.06.249 0 .497-.027.743-.054.349-.04.697-.082 1.04-.082.522 0 1.03.065 1.51.218 1.033.316 1.756.975 2.22 1.909-1.383.786-2.082 2.14-2.07 3.892.012 1.574.762 2.859 2.07 3.521v-.01zM12.088 2.077c.051-.704.406-1.323.962-1.773.23-.187.494-.336.78-.436.287-.1.584-.134.88-.103.022.05.044.1.054.152.104.515.204 1.031.21 1.553.011 1.067-.489 2.036-1.358 2.697-.427.325-.92.554-1.45.634-.02-.025-.04-.05-.054-.077-.207-.412-.336-.867-.365-1.339-.027-.407.003-.81.088-1.205.086-.395.215-.779.382-1.14.12-.258.258-.506.37-.763zM13.202.142l-.009-.003-.009.002C13.211.143 13.207.143 13.202.142z"], [1, "apk-card-text"], [1, "apk-card-title"], [1, "apk-card-sub"], [1, "apk-card-arrow"], [1, "right-panel"], [1, "stars-container"], [1, "star-layer", "stars-small"], [1, "star-layer", "stars-medium"], [1, "star-layer", "stars-large"], [1, "shooting-star", "s1"], [1, "shooting-star", "s2"], [1, "shooting-star", "s3"], [1, "carousel-container"], ["class", "carousel-empty", 4, "ngIf"], ["class", "carousel-slides", 4, "ngIf"], ["class", "carousel-description", 4, "ngIf"], ["class", "carousel-dots", 4, "ngIf"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], [1, "alert", "alert-danger"], [1, "carousel-empty"], [1, "carousel-empty-icon"], [1, "carousel-slides"], ["class", "carousel-slide", 3, "active", 4, "ngFor", "ngForOf"], [1, "carousel-slide"], [1, "carousel-img", 3, "src", "alt"], [1, "carousel-description"], [1, "carousel-dots"], ["class", "dot", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "dot", 3, "click"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2");
        \u0275\u0275text(5, "Conteo Electoral");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Sistema de Conteo de Votos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "form", 4);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_8_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(9, "div", 5)(10, "label", 6);
        \u0275\u0275text(11, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_12_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.username, $event) || (ctx.username = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 5)(14, "label", 8);
        \u0275\u0275text(15, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 9)(17, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "button", 11);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_18_listener() {
          return ctx.showPassword = !ctx.showPassword;
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(19, "svg", 12);
        \u0275\u0275template(20, LoginComponent__svg_path_20_Template, 1, 0, "path", 13)(21, LoginComponent__svg_circle_21_Template, 1, 0, "circle", 14)(22, LoginComponent__svg_path_22_Template, 1, 0, "path", 15)(23, LoginComponent__svg_line_23_Template, 1, 0, "line", 16);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(24, LoginComponent_div_24_Template, 2, 1, "div", 17);
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(25, "button", 18);
        \u0275\u0275text(26);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "div", 19)(28, "a", 20)(29, "div", 21);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(30, "svg", 22);
        \u0275\u0275element(31, "path", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(32, "div", 24)(33, "span", 25);
        \u0275\u0275text(34, "App M\xF3vil");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "span", 26);
        \u0275\u0275text(36, "Descargar APK");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 27);
        \u0275\u0275text(38, "\u2193");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(39, "div", 28)(40, "div", 29);
        \u0275\u0275element(41, "div", 30)(42, "div", 31)(43, "div", 32)(44, "div", 33)(45, "div", 34)(46, "div", 35);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "div", 36);
        \u0275\u0275template(48, LoginComponent_div_48_Template, 5, 0, "div", 37)(49, LoginComponent_div_49_Template, 2, 1, "div", 38)(50, LoginComponent_div_50_Template, 2, 1, "div", 39)(51, LoginComponent_div_51_Template, 2, 1, "div", 40);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275twoWayProperty("ngModel", ctx.username);
        \u0275\u0275advance(5);
        \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", ctx.showPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Ingresando..." : "Ingresar", " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("href", ctx.apkDownloadUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance(20);
        \u0275\u0275property("ngIf", ctx.images.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.images.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.images.length > 0 && (ctx.images[ctx.currentIndex] == null ? null : ctx.images[ctx.currentIndex].caption));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.images.length > 1);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ['\n\n.split-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.left-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 20px;\n  position: relative;\n  overflow: hidden;\n}\n.left-panel[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: -50%;\n  right: -50%;\n  width: 100%;\n  height: 100%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(255, 255, 255, 0.08) 0%,\n      transparent 70%);\n  pointer-events: none;\n}\n.left-panel[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -30%;\n  left: -30%;\n  width: 80%;\n  height: 80%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(255, 255, 255, 0.05) 0%,\n      transparent 60%);\n  pointer-events: none;\n}\n.right-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      160deg,\n      #0a0f24 0%,\n      #1e1b4b 40%,\n      #172554 70%,\n      #0a0f24 100%);\n  padding: 20px;\n  overflow: hidden;\n  position: relative;\n}\n.right-panel[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background:\n    radial-gradient(\n      ellipse at 20% 50%,\n      rgba(102, 126, 234, 0.15) 0%,\n      transparent 50%),\n    radial-gradient(\n      ellipse at 80% 20%,\n      rgba(118, 75, 162, 0.12) 0%,\n      transparent 40%),\n    radial-gradient(\n      ellipse at 50% 80%,\n      rgba(99, 102, 241, 0.08) 0%,\n      transparent 40%);\n  pointer-events: none;\n}\n.stars-container[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  pointer-events: none;\n  z-index: 0;\n}\n.star-layer[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.stars-small[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_driftRight 60s linear infinite;\n}\n.stars-medium[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_driftLeft 80s linear infinite;\n}\n.stars-large[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_driftRight 100s linear infinite;\n}\n.stars-small[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  top: 0;\n  left: 0;\n  box-shadow:\n    20px 30px 0 #fff,\n    80px 120px 0 rgba(255, 255, 255, 0.8),\n    150px 50px 0 rgba(255, 255, 255, 0.6),\n    230px 180px 0 #fff,\n    310px 90px 0 rgba(255, 255, 255, 0.7),\n    400px 220px 0 rgba(255, 255, 255, 0.5),\n    480px 60px 0 #fff,\n    550px 250px 0 rgba(255, 255, 255, 0.6),\n    630px 140px 0 rgba(255, 255, 255, 0.8),\n    700px 30px 0 #fff,\n    50px 300px 0 rgba(255, 255, 255, 0.5),\n    180px 380px 0 #fff,\n    290px 420px 0 rgba(255, 255, 255, 0.7),\n    420px 350px 0 rgba(255, 255, 255, 0.6),\n    530px 480px 0 #fff,\n    650px 400px 0 rgba(255, 255, 255, 0.5),\n    750px 520px 0 rgba(255, 255, 255, 0.8),\n    100px 550px 0 #fff,\n    220px 600px 0 rgba(255, 255, 255, 0.6),\n    340px 580px 0 rgba(255, 255, 255, 0.7),\n    460px 650px 0 #fff,\n    570px 700px 0 rgba(255, 255, 255, 0.5),\n    680px 620px 0 rgba(255, 255, 255, 0.8),\n    90px 720px 0 #fff,\n    200px 780px 0 rgba(255, 255, 255, 0.6),\n    380px 750px 0 rgba(255, 255, 255, 0.7),\n    500px 820px 0 #fff,\n    620px 800px 0 rgba(255, 255, 255, 0.5),\n    720px 880px 0 rgba(255, 255, 255, 0.8),\n    40px 150px 0 rgba(255, 255, 255, 0.4),\n    160px 200px 0 rgba(255, 255, 255, 0.6),\n    350px 280px 0 rgba(255, 255, 255, 0.3),\n    600px 170px 0 rgba(255, 255, 255, 0.5),\n    450px 450px 0 rgba(255, 255, 255, 0.4),\n    130px 670px 0 rgba(255, 255, 255, 0.3),\n    770px 350px 0 rgba(255, 255, 255, 0.6);\n  animation: _ngcontent-%COMP%_twinkle 2s ease-in-out infinite alternate;\n}\n.stars-medium[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 2px;\n  height: 2px;\n  top: 0;\n  left: 0;\n  border-radius: 50%;\n  box-shadow:\n    60px 80px 0 #fff,\n    200px 150px 0 rgba(255, 255, 255, 0.8),\n    350px 60px 0 rgba(255, 255, 255, 0.7),\n    500px 200px 0 #fff,\n    650px 100px 0 rgba(255, 255, 255, 0.6),\n    100px 400px 0 rgba(255, 255, 255, 0.8),\n    300px 500px 0 #fff,\n    450px 350px 0 rgba(255, 255, 255, 0.7),\n    600px 550px 0 rgba(255, 255, 255, 0.6),\n    150px 650px 0 #fff,\n    400px 700px 0 rgba(255, 255, 255, 0.8),\n    700px 450px 0 rgba(255, 255, 255, 0.7),\n    550px 800px 0 #fff,\n    250px 850px 0 rgba(255, 255, 255, 0.6),\n    680px 200px 0 rgba(255, 255, 255, 0.8);\n  animation: _ngcontent-%COMP%_twinkle 3s ease-in-out infinite alternate;\n  animation-delay: 0.5s;\n}\n.stars-large[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 3px;\n  height: 3px;\n  top: 0;\n  left: 0;\n  border-radius: 50%;\n  filter: blur(0.5px);\n  box-shadow:\n    120px 100px 0 #fff,\n    450px 180px 0 #fff,\n    280px 420px 0 rgba(255, 255, 255, 0.9),\n    620px 300px 0 #fff,\n    180px 600px 0 rgba(255, 255, 255, 0.9),\n    520px 700px 0 #fff,\n    380px 800px 0 rgba(255, 255, 255, 0.8);\n  animation: _ngcontent-%COMP%_twinkle 4s ease-in-out infinite alternate;\n  animation-delay: 1.5s;\n}\n@keyframes _ngcontent-%COMP%_twinkle {\n  0% {\n    opacity: 0.15;\n    transform: scale(0.8);\n  }\n  50% {\n    opacity: 0.6;\n    transform: scale(1.1);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_driftRight {\n  0% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(25px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_driftLeft {\n  0% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(-15px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n}\n.shooting-star[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 3px;\n  height: 3px;\n  background: #fff;\n  border-radius: 50%;\n  filter: blur(1px);\n}\n.shooting-star[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 80px;\n  height: 1.5px;\n  background:\n    linear-gradient(\n      to left,\n      rgba(255, 255, 255, 0),\n      rgba(255, 255, 255, 0.9));\n  right: 1px;\n}\n.shooting-star[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 30px;\n  height: 0.5px;\n  background:\n    linear-gradient(\n      to left,\n      rgba(255, 255, 255, 0),\n      rgba(200, 210, 255, 0.5));\n  right: 80px;\n}\n.shooting-star.s1[_ngcontent-%COMP%] {\n  top: 10%;\n  left: 75%;\n  animation: _ngcontent-%COMP%_shoot1 8s ease-in infinite;\n}\n.shooting-star.s2[_ngcontent-%COMP%] {\n  top: 35%;\n  left: 65%;\n  animation: _ngcontent-%COMP%_shoot2 10s ease-in infinite;\n  animation-delay: 2s;\n}\n.shooting-star.s3[_ngcontent-%COMP%] {\n  top: 60%;\n  left: 80%;\n  animation: _ngcontent-%COMP%_shoot3 12s ease-in infinite;\n  animation-delay: 5s;\n}\n@keyframes _ngcontent-%COMP%_shoot1 {\n  0% {\n    transform: translate(0, 0) rotate(-35deg);\n    opacity: 1;\n  }\n  4% {\n    opacity: 1;\n  }\n  12% {\n    transform: translate(-350px, 250px) rotate(-35deg);\n    opacity: 0;\n  }\n  100% {\n    transform: translate(-350px, 250px) rotate(-35deg);\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_shoot2 {\n  0% {\n    transform: translate(0, 0) rotate(-25deg);\n    opacity: 1;\n  }\n  3% {\n    opacity: 1;\n  }\n  10% {\n    transform: translate(-400px, 180px) rotate(-25deg);\n    opacity: 0;\n  }\n  100% {\n    transform: translate(-400px, 180px) rotate(-25deg);\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_shoot3 {\n  0% {\n    transform: translate(0, 0) rotate(-40deg);\n    opacity: 1;\n  }\n  5% {\n    opacity: 1;\n  }\n  14% {\n    transform: translate(-300px, 260px) rotate(-40deg);\n    opacity: 0;\n  }\n  100% {\n    transform: translate(-300px, 260px) rotate(-40deg);\n    opacity: 0;\n  }\n}\n@media (max-width: 768px) {\n  .split-layout[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .left-panel[_ngcontent-%COMP%] {\n    flex: none;\n    min-height: 100vh;\n    padding: 16px;\n  }\n  .right-panel[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .login-card[_ngcontent-%COMP%] {\n    max-width: 100%;\n    padding: 28px 20px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);\n    margin: auto;\n  }\n  .login-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .form-control[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    font-size: 13px;\n  }\n  .btn-login[_ngcontent-%COMP%] {\n    padding: 11px 20px;\n    font-size: 14px;\n  }\n  .download-apk[_ngcontent-%COMP%] {\n    margin-top: 20px;\n    padding-top: 16px;\n  }\n}\n@media (max-width: 480px) {\n  .left-panel[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    padding: 24px 12px;\n  }\n  .login-card[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n    border-radius: 12px;\n  }\n  .login-header[_ngcontent-%COMP%] {\n    margin-bottom: 24px;\n  }\n  .form-group[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n}\n.login-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);\n  padding: 40px;\n  max-width: 380px;\n  width: 100%;\n  position: relative;\n  z-index: 1;\n}\n.login-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 30px;\n}\n.login-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #1e293b;\n  margin: 0 0 8px;\n  font-size: 24px;\n  font-weight: 700;\n}\n.login-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 14px;\n  margin: 0;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 14px;\n  color: #374151;\n  font-weight: 500;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: border-color 0.2s, box-shadow 0.2s;\n  box-sizing: border-box;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);\n}\n.password-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.password-wrapper[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  padding-right: 44px;\n}\n.btn-eye[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 4px;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border: none;\n  background: transparent;\n  border-radius: 8px;\n  cursor: pointer;\n  color: #64748b;\n  transition: all 0.15s;\n  padding: 0;\n}\n.btn-eye[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n  color: #1e293b;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  margin-bottom: 16px;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #991b1b;\n  border: 1px solid #fecaca;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 600;\n  width: 100%;\n  transition: all 0.2s;\n}\n.btn-login[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea,\n      #764ba2);\n  color: white;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);\n}\n.btn-login[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #5a6fd6,\n      #6a4192);\n  transform: translateY(-1px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n.btn-login[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.download-apk[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.apk-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(255, 255, 255, 0.9);\n  border-radius: 12px;\n  cursor: pointer;\n  text-decoration: none;\n  transition: all 0.25s;\n}\n.apk-card[_ngcontent-%COMP%]:hover {\n  background: white;\n  border-color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n}\n.apk-card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea,\n      #764ba2);\n  border-radius: 10px;\n  color: white;\n  flex-shrink: 0;\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n}\n.apk-card-text[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  min-width: 0;\n}\n.apk-card-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #1e293b;\n}\n.apk-card-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #64748b;\n}\n.apk-card-arrow[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(102, 126, 234, 0.12);\n  border-radius: 50%;\n  color: #667eea;\n  font-size: 16px;\n  font-weight: 700;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n.apk-card[_ngcontent-%COMP%]:hover   .apk-card-arrow[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.2);\n  color: #764ba2;\n  transform: translateY(2px);\n}\n.carousel-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 500px;\n  position: relative;\n  z-index: 1;\n}\n.carousel-empty[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.carousel-empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  margin-bottom: 16px;\n  display: block;\n}\n.carousel-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 18px;\n  margin: 0;\n}\n.carousel-empty[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #64748b;\n  font-size: 13px;\n  margin-top: 8px;\n}\n.carousel-slides[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 16 / 10;\n  border-radius: 16px;\n  overflow: hidden;\n  background: #1e293b;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n}\n.carousel-description[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 14px 18px;\n  background: rgba(255, 255, 255, 0.06);\n  border-radius: 10px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  color: #cbd5e1;\n  font-size: 14px;\n  line-height: 1.5;\n  text-align: center;\n  min-height: 20px;\n}\n.carousel-slide[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  transition: opacity 0.8s ease-in-out;\n}\n.carousel-slide.active[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.carousel-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.carousel-dots[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  margin-top: 16px;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  border: 2px solid rgba(148, 163, 184, 0.4);\n  background: transparent;\n  cursor: pointer;\n  padding: 0;\n  transition: all 0.3s;\n}\n.dot.active[_ngcontent-%COMP%] {\n  background: #667eea;\n  border-color: #667eea;\n  box-shadow: 0 0 8px rgba(102, 126, 234, 0.4);\n}\n.dot[_ngcontent-%COMP%]:hover {\n  border-color: #94a3b8;\n  border-width: 2px;\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "app\\features\\auth\\login\\login.component.ts", lineNumber: 17 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-QZGBJZPL.js.map
