import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/authService';
import { inject } from '@angular/core';
// Añadimos filter y switchMap
import { map, catchError, timeout, take, filter, switchMap } from 'rxjs/operators';
import { TimeoutError } from 'rxjs';
import { Observable, of } from 'rxjs';

/**
 */
export const guardLoginGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loginUrl = router.parseUrl('/login');

  return authService.isAuthReady$.pipe(
    filter(isReady => isReady),

    switchMap(() => authService.currentUser$.pipe(take(1))),
    
    timeout({ first: 3000 }),

    map(user => {
      if (user) {
        console.log('Guard: Usuario autenticado. Acceso permitido.');
        return true; 
      } else {
        console.warn('Guard: No hay usuario después de chequeo. Redirigiendo a Login.');
        return loginUrl;
      }
    }),

    catchError(error => {
      if (error instanceof TimeoutError) {
        console.error('Guard: Timeout de autenticación (3s). Redirigiendo a Login.');
      } else {
        console.error('Guard: Error de autenticación:', error);
      }
      return of(loginUrl);
    })
  );
};
