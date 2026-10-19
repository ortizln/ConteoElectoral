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
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-Y3MBZ57Z.js";
import {
  ApiService
} from "./chunk-ZGAD4T5T.js";
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
} from "./chunk-SNDXQHAQ.js";
import "./chunk-ASLTLD6L.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent__svg_path_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 43);
  }
}
function LoginComponent__svg_circle_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "circle", 44);
  }
}
function LoginComponent__svg_path_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 45);
  }
}
function LoginComponent__svg_line_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 46);
  }
}
function LoginComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function LoginComponent_div_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 49);
    \u0275\u0275element(2, "i", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Bienvenido al Sistema de Conteo Electoral");
    \u0275\u0275elementEnd()();
  }
}
function LoginComponent_div_50_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275element(1, "img", 54);
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
function LoginComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275template(1, LoginComponent_div_50_div_1_Template, 2, 4, "div", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.images);
  }
}
function LoginComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.images[ctx_r0.currentIndex].caption, " ");
  }
}
function LoginComponent_div_52_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function LoginComponent_div_52_button_1_Template_button_click_0_listener() {
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
function LoginComponent_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275template(1, LoginComponent_div_52_button_1_Template, 1, 2, "button", 57);
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 53, vars: 16, consts: [[1, "split-layout"], [1, "left-panel"], [1, "login-card"], [1, "login-header"], ["src", "assets/icons/icon-192.png", "alt", "", 1, "login-logo"], [1, "login-form", 3, "ngSubmit"], [1, "form-group"], ["for", "username"], ["id", "username", "type", "text", "name", "username", "placeholder", "Ingrese su usuario", "required", "", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "password"], [1, "password-wrapper"], ["id", "password", "name", "password", "placeholder", "Ingrese su contrase\xF1a", "required", "", "autocomplete", "new-password", 1, "form-control", 3, "ngModelChange", "type", "ngModel"], ["type", "button", 1, "btn-eye", 3, "click"], ["viewBox", "0 0 24 24", "width", "20", "height", "20", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", 4, "ngIf"], ["cx", "12", "cy", "12", "r", "3", 4, "ngIf"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24", 4, "ngIf"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-login", 3, "disabled"], [1, "download-apk"], [1, "apk-card", 3, "href"], [1, "apk-card-icon"], ["viewBox", "0 0 24 24", "fill", "currentColor", "width", "28", "height", "28"], ["d", "M17.523 14.143c-.191.726-.577 1.403-1.133 1.942-.674.666-1.462.935-2.373.808-.315-.038-.635-.094-.945-.147-.33-.052-.658-.106-.98-.106-.345 0-.683.057-1.023.113-.408.067-.817.137-1.232.137-.465 0-.927-.062-1.37-.181-2.076-.528-3.515-2.522-3.515-4.802 0-1.143.376-2.204 1.076-3.108.672-.864 1.596-1.416 2.654-1.566.544-.076 1.096-.097 1.648-.068.19.01.38.03.567.052.256.03.512.06.773.06.249 0 .497-.027.743-.054.349-.04.697-.082 1.04-.082.522 0 1.03.065 1.51.218 1.033.316 1.756.975 2.22 1.909-1.383.786-2.082 2.14-2.07 3.892.012 1.574.762 2.859 2.07 3.521v-.01zM12.088 2.077c.051-.704.406-1.323.962-1.773.23-.187.494-.336.78-.436.287-.1.584-.134.88-.103.022.05.044.1.054.152.104.515.204 1.031.21 1.553.011 1.067-.489 2.036-1.358 2.697-.427.325-.92.554-1.45.634-.02-.025-.04-.05-.054-.077-.207-.412-.336-.867-.365-1.339-.027-.407.003-.81.088-1.205.086-.395.215-.779.382-1.14.12-.258.258-.506.37-.763zM13.202.142l-.009-.003-.009.002C13.211.143 13.207.143 13.202.142z"], [1, "apk-card-text"], [1, "apk-card-title"], [1, "apk-card-sub"], [1, "apk-card-arrow"], [1, "bi", "bi-download"], [1, "right-panel"], [1, "stars-container"], [1, "star-layer", "stars-small"], [1, "star-layer", "stars-medium"], [1, "star-layer", "stars-large"], [1, "shooting-star", "s1"], [1, "shooting-star", "s2"], [1, "shooting-star", "s3"], [1, "carousel-container"], ["class", "carousel-empty", 4, "ngIf"], ["class", "carousel-slides", 4, "ngIf"], ["class", "carousel-description", 4, "ngIf"], ["class", "carousel-dots", 4, "ngIf"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], [1, "alert", "alert-danger"], [1, "carousel-empty"], [1, "carousel-empty-icon"], [1, "bi", "bi-camera"], [1, "carousel-slides"], ["class", "carousel-slide", 3, "active", 4, "ngFor", "ngForOf"], [1, "carousel-slide"], [1, "carousel-img", 3, "src", "alt"], [1, "carousel-description"], [1, "carousel-dots"], ["class", "dot", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "dot", 3, "click"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "img", 4);
        \u0275\u0275elementStart(5, "h2");
        \u0275\u0275text(6, "Conteo Electoral");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p");
        \u0275\u0275text(8, "Sistema de Conteo de Votos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "form", 5);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_9_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(10, "div", 6)(11, "label", 7);
        \u0275\u0275text(12, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.username, $event) || (ctx.username = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 6)(15, "label", 9);
        \u0275\u0275text(16, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div", 10)(18, "input", 11);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_18_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "button", 12);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_19_listener() {
          return ctx.showPassword = !ctx.showPassword;
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(20, "svg", 13);
        \u0275\u0275template(21, LoginComponent__svg_path_21_Template, 1, 0, "path", 14)(22, LoginComponent__svg_circle_22_Template, 1, 0, "circle", 15)(23, LoginComponent__svg_path_23_Template, 1, 0, "path", 16)(24, LoginComponent__svg_line_24_Template, 1, 0, "line", 17);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(25, LoginComponent_div_25_Template, 2, 1, "div", 18);
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(26, "button", 19);
        \u0275\u0275text(27);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "div", 20)(29, "a", 21)(30, "div", 22);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(31, "svg", 23);
        \u0275\u0275element(32, "path", 24);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(33, "div", 25)(34, "span", 26);
        \u0275\u0275text(35, "App M\xF3vil");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "span", 27);
        \u0275\u0275text(37, "Descargar APK");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "div", 28);
        \u0275\u0275element(39, "i", 29);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(40, "div", 30)(41, "div", 31);
        \u0275\u0275element(42, "div", 32)(43, "div", 33)(44, "div", 34)(45, "div", 35)(46, "div", 36)(47, "div", 37);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "div", 38);
        \u0275\u0275template(49, LoginComponent_div_49_Template, 5, 0, "div", 39)(50, LoginComponent_div_50_Template, 2, 1, "div", 40)(51, LoginComponent_div_51_Template, 2, 1, "div", 41)(52, LoginComponent_div_52_Template, 2, 1, "div", 42);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
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
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ['\n\n.split-layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n.left-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--alantek-primary) 0%,\n      var(--alantek-primary-strong) 100%);\n  padding: 20px;\n  position: relative;\n  overflow: hidden;\n}\n.left-panel[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: -50%;\n  right: -50%;\n  width: 100%;\n  height: 100%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(246, 240, 229, 0.08) 0%,\n      transparent 70%);\n  pointer-events: none;\n}\n.left-panel[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -30%;\n  left: -30%;\n  width: 80%;\n  height: 80%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(217, 119, 50, 0.10) 0%,\n      transparent 60%);\n  pointer-events: none;\n}\n.right-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      160deg,\n      var(--alantek-primary-dark) 0%,\n      #1b241d 45%,\n      var(--alantek-primary-strong) 100%);\n  padding: 20px;\n  overflow: hidden;\n  position: relative;\n}\n.right-panel[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background:\n    radial-gradient(\n      ellipse at 20% 50%,\n      rgba(217, 119, 50, 0.14) 0%,\n      transparent 50%),\n    radial-gradient(\n      ellipse at 80% 20%,\n      rgba(230, 185, 79, 0.10) 0%,\n      transparent 40%),\n    radial-gradient(\n      ellipse at 50% 80%,\n      rgba(120, 84, 61, 0.12) 0%,\n      transparent 40%);\n  pointer-events: none;\n}\n.stars-container[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  pointer-events: none;\n  z-index: 0;\n}\n.star-layer[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.stars-small[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_driftRight 60s linear infinite;\n}\n.stars-medium[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_driftLeft 80s linear infinite;\n}\n.stars-large[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_driftRight 100s linear infinite;\n}\n.stars-small[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  top: 0;\n  left: 0;\n  box-shadow:\n    20px 30px 0 #fff,\n    80px 120px 0 rgba(255, 255, 255, 0.8),\n    150px 50px 0 rgba(255, 255, 255, 0.6),\n    230px 180px 0 #fff,\n    310px 90px 0 rgba(255, 255, 255, 0.7),\n    400px 220px 0 rgba(255, 255, 255, 0.5),\n    480px 60px 0 #fff,\n    550px 250px 0 rgba(255, 255, 255, 0.6),\n    630px 140px 0 rgba(255, 255, 255, 0.8),\n    700px 30px 0 #fff,\n    50px 300px 0 rgba(255, 255, 255, 0.5),\n    180px 380px 0 #fff,\n    290px 420px 0 rgba(255, 255, 255, 0.7),\n    420px 350px 0 rgba(255, 255, 255, 0.6),\n    530px 480px 0 #fff,\n    650px 400px 0 rgba(255, 255, 255, 0.5),\n    750px 520px 0 rgba(255, 255, 255, 0.8),\n    100px 550px 0 #fff,\n    220px 600px 0 rgba(255, 255, 255, 0.6),\n    340px 580px 0 rgba(255, 255, 255, 0.7),\n    460px 650px 0 #fff,\n    570px 700px 0 rgba(255, 255, 255, 0.5),\n    680px 620px 0 rgba(255, 255, 255, 0.8),\n    90px 720px 0 #fff,\n    200px 780px 0 rgba(255, 255, 255, 0.6),\n    380px 750px 0 rgba(255, 255, 255, 0.7),\n    500px 820px 0 #fff,\n    620px 800px 0 rgba(255, 255, 255, 0.5),\n    720px 880px 0 rgba(255, 255, 255, 0.8),\n    40px 150px 0 rgba(255, 255, 255, 0.4),\n    160px 200px 0 rgba(255, 255, 255, 0.6),\n    350px 280px 0 rgba(255, 255, 255, 0.3),\n    600px 170px 0 rgba(255, 255, 255, 0.5),\n    450px 450px 0 rgba(255, 255, 255, 0.4),\n    130px 670px 0 rgba(255, 255, 255, 0.3),\n    770px 350px 0 rgba(255, 255, 255, 0.6);\n  animation: _ngcontent-%COMP%_twinkle 4s ease-in-out infinite alternate;\n}\n.stars-medium[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 2px;\n  height: 2px;\n  top: 0;\n  left: 0;\n  border-radius: 50%;\n  box-shadow:\n    60px 80px 0 #fff,\n    200px 150px 0 rgba(255, 255, 255, 0.8),\n    350px 60px 0 rgba(255, 255, 255, 0.7),\n    500px 200px 0 #fff,\n    650px 100px 0 rgba(255, 255, 255, 0.6),\n    100px 400px 0 rgba(255, 255, 255, 0.8),\n    300px 500px 0 #fff,\n    450px 350px 0 rgba(255, 255, 255, 0.7),\n    600px 550px 0 rgba(255, 255, 255, 0.6),\n    150px 650px 0 #fff,\n    400px 700px 0 rgba(255, 255, 255, 0.8),\n    700px 450px 0 rgba(255, 255, 255, 0.7),\n    550px 800px 0 #fff,\n    250px 850px 0 rgba(255, 255, 255, 0.6),\n    680px 200px 0 rgba(255, 255, 255, 0.8);\n  animation: _ngcontent-%COMP%_twinkle 5s ease-in-out infinite alternate;\n  animation-delay: 0.5s;\n}\n.stars-large[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 3px;\n  height: 3px;\n  top: 0;\n  left: 0;\n  border-radius: 50%;\n  filter: blur(0.5px);\n  box-shadow:\n    120px 100px 0 #fff,\n    450px 180px 0 #fff,\n    280px 420px 0 rgba(255, 255, 255, 0.9),\n    620px 300px 0 #fff,\n    180px 600px 0 rgba(255, 255, 255, 0.9),\n    520px 700px 0 #fff,\n    380px 800px 0 rgba(255, 255, 255, 0.8);\n  animation: _ngcontent-%COMP%_twinkle 6s ease-in-out infinite alternate;\n  animation-delay: 1.5s;\n}\n@keyframes _ngcontent-%COMP%_twinkle {\n  0% {\n    opacity: 0.15;\n    transform: scale(0.8);\n  }\n  50% {\n    opacity: 0.6;\n    transform: scale(1.1);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_driftRight {\n  0% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(25px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_driftLeft {\n  0% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(-15px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n}\n.shooting-star[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 3px;\n  height: 3px;\n  background: var(--alantek-highlight);\n  border-radius: 50%;\n  filter: blur(1px);\n}\n.shooting-star[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 80px;\n  height: 1.5px;\n  background:\n    linear-gradient(\n      to left,\n      rgba(230, 185, 79, 0),\n      rgba(246, 240, 229, 0.9));\n  right: 1px;\n}\n.shooting-star[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 30px;\n  height: 0.5px;\n  background:\n    linear-gradient(\n      to left,\n      rgba(230, 185, 79, 0),\n      rgba(217, 119, 50, 0.5));\n  right: 80px;\n}\n.shooting-star.s1[_ngcontent-%COMP%] {\n  top: 10%;\n  left: 75%;\n  animation: _ngcontent-%COMP%_shoot1 8s ease-in infinite;\n}\n.shooting-star.s2[_ngcontent-%COMP%] {\n  top: 35%;\n  left: 65%;\n  animation: _ngcontent-%COMP%_shoot2 10s ease-in infinite;\n  animation-delay: 2s;\n}\n.shooting-star.s3[_ngcontent-%COMP%] {\n  top: 60%;\n  left: 80%;\n  animation: _ngcontent-%COMP%_shoot3 12s ease-in infinite;\n  animation-delay: 5s;\n}\n@keyframes _ngcontent-%COMP%_shoot1 {\n  0% {\n    transform: translate(0, 0) rotate(-35deg);\n    opacity: 1;\n  }\n  4% {\n    opacity: 1;\n  }\n  12% {\n    transform: translate(-350px, 250px) rotate(-35deg);\n    opacity: 0;\n  }\n  100% {\n    transform: translate(-350px, 250px) rotate(-35deg);\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_shoot2 {\n  0% {\n    transform: translate(0, 0) rotate(-25deg);\n    opacity: 1;\n  }\n  3% {\n    opacity: 1;\n  }\n  10% {\n    transform: translate(-400px, 180px) rotate(-25deg);\n    opacity: 0;\n  }\n  100% {\n    transform: translate(-400px, 180px) rotate(-25deg);\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_shoot3 {\n  0% {\n    transform: translate(0, 0) rotate(-40deg);\n    opacity: 1;\n  }\n  5% {\n    opacity: 1;\n  }\n  14% {\n    transform: translate(-300px, 260px) rotate(-40deg);\n    opacity: 0;\n  }\n  100% {\n    transform: translate(-300px, 260px) rotate(-40deg);\n    opacity: 0;\n  }\n}\n@media (max-width: 768px) {\n  .split-layout[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .left-panel[_ngcontent-%COMP%] {\n    flex: none;\n    min-height: 100vh;\n    padding: 16px;\n  }\n  .right-panel[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .login-card[_ngcontent-%COMP%] {\n    max-width: 100%;\n    padding: 28px 20px;\n    box-shadow: var(--alantek-shadow-lg);\n    margin: auto;\n  }\n  .login-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .form-control[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    font-size: 13px;\n  }\n  .btn-login[_ngcontent-%COMP%] {\n    padding: 11px 20px;\n    font-size: 14px;\n  }\n  .download-apk[_ngcontent-%COMP%] {\n    margin-top: 20px;\n    padding-top: 16px;\n  }\n}\n@media (max-width: 480px) {\n  .left-panel[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    padding: 24px 12px;\n  }\n  .login-card[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n    border-radius: 12px;\n  }\n  .login-header[_ngcontent-%COMP%] {\n    margin-bottom: 24px;\n  }\n  .form-group[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n}\n.login-card[_ngcontent-%COMP%] {\n  background: var(--alantek-surface, #fff);\n  border-radius: 16px;\n  box-shadow: var(--alantek-shadow-lg);\n  padding: 40px;\n  max-width: 380px;\n  width: 100%;\n  position: relative;\n  z-index: 1;\n}\n.login-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 30px;\n}\n.login-logo[_ngcontent-%COMP%] {\n  display: block;\n  width: 88px;\n  height: 88px;\n  border-radius: 20px;\n  margin: 0 auto 16px;\n  box-shadow: 0 10px 28px rgba(19, 26, 22, 0.35);\n}\n.login-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--alantek-text);\n  margin: 0 0 8px;\n  font-size: 24px;\n  font-weight: 700;\n  letter-spacing: 0.3px;\n}\n.login-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--alantek-text-muted);\n  font-size: 14px;\n  margin: 0;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 14px;\n  color: var(--alantek-text-secondary);\n  font-weight: 500;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border: 1.5px solid var(--alantek-border);\n  border-radius: 8px;\n  font-size: 14px;\n  transition: border-color 0.2s, box-shadow 0.2s;\n  box-sizing: border-box;\n  background: var(--alantek-surface, #fff);\n  color: var(--alantek-text);\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--alantek-accent);\n  box-shadow: 0 0 0 3px rgba(217, 119, 50, 0.18);\n}\n.password-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.password-wrapper[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  padding-right: 44px;\n}\n.btn-eye[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 4px;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border: none;\n  background: transparent;\n  border-radius: 8px;\n  cursor: pointer;\n  color: var(--alantek-text-muted);\n  transition: background-color 0.15s, color 0.15s;\n  padding: 0;\n}\n.btn-eye[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-muted, #f0f3ee);\n  color: var(--alantek-text);\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  margin-bottom: 16px;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background: var(--alantek-danger-bg);\n  color: var(--alantek-danger);\n  border: 1px solid rgba(192, 57, 43, 0.25);\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 600;\n  width: 100%;\n  transition:\n    background-color 0.2s,\n    box-shadow 0.2s,\n    transform 0.2s;\n}\n.btn-login[_ngcontent-%COMP%] {\n  background: var(--alantek-accent);\n  color: #fff;\n  box-shadow: 0 4px 15px rgba(217, 119, 50, 0.32);\n}\n.btn-login[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--alantek-accent-hover);\n  transform: translateY(-1px);\n  box-shadow: 0 6px 20px rgba(217, 119, 50, 0.4);\n}\n.btn-login[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-login[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--alantek-highlight);\n  outline-offset: 2px;\n}\n.download-apk[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid var(--alantek-border);\n}\n.apk-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  background: var(--alantek-muted, #f0f3ee);\n  border: 1px solid var(--alantek-border);\n  border-radius: 12px;\n  cursor: pointer;\n  text-decoration: none;\n  transition:\n    background-color 0.2s,\n    border-color 0.2s,\n    transform 0.2s,\n    box-shadow 0.2s;\n}\n.apk-card[_ngcontent-%COMP%]:hover {\n  background: var(--alantek-surface, #fff);\n  border-color: var(--alantek-accent);\n  transform: translateY(-2px);\n  box-shadow: var(--alantek-shadow-md);\n}\n.apk-card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--alantek-primary),\n      var(--alantek-accent));\n  border-radius: 10px;\n  color: #fff;\n  flex-shrink: 0;\n  box-shadow: 0 2px 8px rgba(72, 86, 60, 0.3);\n}\n.apk-card-text[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  min-width: 0;\n}\n.apk-card-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--alantek-text);\n}\n.apk-card-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--alantek-text-muted);\n}\n.apk-card-arrow[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(217, 119, 50, 0.14);\n  border-radius: 50%;\n  color: var(--alantek-accent);\n  font-size: 16px;\n  font-weight: 700;\n  transition: background-color 0.2s, transform 0.2s;\n  flex-shrink: 0;\n}\n.apk-card[_ngcontent-%COMP%]:hover   .apk-card-arrow[_ngcontent-%COMP%] {\n  background: rgba(217, 119, 50, 0.24);\n  transform: translateY(2px);\n}\n.carousel-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 500px;\n  position: relative;\n  z-index: 1;\n}\n.carousel-empty[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.carousel-empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  margin-bottom: 16px;\n  display: block;\n}\n.carousel-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #c9d2c4;\n  font-size: 18px;\n  margin: 0;\n}\n.carousel-empty[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  color: #9aa896;\n  font-size: 13px;\n  margin-top: 8px;\n}\n.carousel-slides[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 16 / 10;\n  border-radius: 16px;\n  overflow: hidden;\n  background: var(--alantek-military-700, #344331);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);\n}\n.carousel-description[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 14px 18px;\n  background: rgba(246, 240, 229, 0.07);\n  border-radius: 10px;\n  border: 1px solid rgba(246, 240, 229, 0.1);\n  color: #e6ebe3;\n  font-size: 14px;\n  line-height: 1.5;\n  text-align: center;\n  min-height: 20px;\n}\n.carousel-slide[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  transition: opacity 0.6s ease-in-out;\n}\n.carousel-slide.active[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.carousel-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.carousel-dots[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  margin-top: 16px;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  border: 2px solid rgba(246, 240, 229, 0.4);\n  background: transparent;\n  cursor: pointer;\n  padding: 0;\n  transition: background-color 0.25s, border-color 0.25s;\n}\n.dot.active[_ngcontent-%COMP%] {\n  background: var(--alantek-accent);\n  border-color: var(--alantek-accent);\n  box-shadow: 0 0 8px rgba(217, 119, 50, 0.5);\n}\n.dot[_ngcontent-%COMP%]:hover {\n  border-color: #f6f0e5;\n}\n@media (prefers-reduced-motion: reduce) {\n  .stars-small[_ngcontent-%COMP%], .stars-medium[_ngcontent-%COMP%], .stars-large[_ngcontent-%COMP%], .shooting-star[_ngcontent-%COMP%] {\n    animation: none !important;\n  }\n  .carousel-slide[_ngcontent-%COMP%] {\n    transition: none;\n  }\n  .btn-login[_ngcontent-%COMP%]:hover:not(:disabled), .apk-card[_ngcontent-%COMP%]:hover {\n    transform: none;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "app\\features\\auth\\login\\login.component.ts", lineNumber: 17 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-RXRGTGP6.js.map
