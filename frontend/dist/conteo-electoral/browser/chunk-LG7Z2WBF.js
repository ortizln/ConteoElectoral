import {
  AuthService,
  Router
} from "./chunk-KZU2HTPH.js";
import {
  catchError,
  inject,
  map,
  of
} from "./chunk-3DSQS3EE.js";

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`)
    });
    return next(cloned);
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
//# sourceMappingURL=chunk-LG7Z2WBF.js.map
