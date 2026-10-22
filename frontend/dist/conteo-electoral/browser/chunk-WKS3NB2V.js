import {
  Router
} from "./chunk-C67EKLAA.js";
import {
  AuthService
} from "./chunk-7K6Z2GKD.js";
import {
  catchError,
  inject,
  map,
  of,
  throwError
} from "./chunk-6TL4F4J6.js";

// src/app/core/interceptors/auth.interceptor.ts
var jwtDecode = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};
var authInterceptor = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  if (token) {
    const payload = jwtDecode(token);
    if (payload?.exp && payload.exp * 1e3 < Date.now()) {
      authService.logout();
      router.navigate(["/login"]);
      return throwError(() => new Error("Token expirado"));
    }
    const cloned = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`)
    });
    return next(cloned).pipe(catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        authService.logout();
        router.navigate(["/login"]);
      }
      return throwError(() => err);
    }));
  }
  return next(req);
};

// src/app/core/guards/auth.guard.ts
var authGuard = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isAuthenticated()) {
    router.navigate(["/login"]);
    return false;
  }
  return authService.verifyToken().pipe(map(() => true), catchError(() => {
    authService.logout();
    router.navigate(["/login"]);
    return of(false);
  }));
};

// src/app/core/guards/role.guard.ts
var roleGuard = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data["roles"];
  if (authService.hasRole(requiredRoles)) {
    return true;
  }
  router.navigate(["/dashboard"]);
  return false;
};

export {
  authGuard,
  roleGuard,
  authInterceptor
};
//# sourceMappingURL=chunk-WKS3NB2V.js.map
