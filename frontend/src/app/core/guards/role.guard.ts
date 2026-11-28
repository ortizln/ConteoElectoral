import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[];

  if (authService.hasRole(requiredRoles)) {
    return true;
  }

  // Cada perfil vuelve a su pantalla permitida. VISITANTE nunca debe caer
  // en /dashboard (privado) ni en un bucle de redirecciones.
  const rol = authService.getCurrentUser()?.rol;
  const destino = rol === 'VISITANTE' ? '/resultados'
    : rol === 'MIEMBRO_MESA' ? '/mesa'
    : rol === 'ADMIN' ? '/admin'
    : '/dashboard';

  router.navigate([state.url === destino ? '/login' : destino]);
  return false;
};