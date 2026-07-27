import {
  BehaviorSubject,
  HttpClient,
  environment,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-MCJ4XKPH.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor(http) {
    this.http = http;
    this.API_URL = `${environment.apiUrl}/auth`;
    this.TOKEN_KEY = "electoral_token";
    this.USER_KEY = "electoral_user";
    this.currentUserSubject = new BehaviorSubject(this.getStoredUser());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }
  login(credentials) {
    return this.http.post(`${this.API_URL}/login`, credentials).pipe(tap((response) => {
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify({
        id: response.id,
        username: response.username,
        nombre: response.nombre,
        apellido: response.apellido,
        rol: response.rol
      }));
      this.currentUserSubject.next({
        id: response.id,
        username: response.username,
        nombre: response.nombre,
        apellido: response.apellido,
        rol: response.rol,
        email: "",
        activo: true
      });
    }));
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  isAuthenticated() {
    return !!this.getToken();
  }
  verifyToken() {
    return this.http.get(`${this.API_URL}/me`);
  }
  getCurrentUser() {
    return this.currentUserSubject.value;
  }
  getStoredUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  hasRole(roles) {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.rol) : false;
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
