import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/authService';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const guardLoginGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map(user => {
      if (user) {
        return true; 
      } else {
        return router.parseUrl('/login'); 
      }
    })
  );
};
