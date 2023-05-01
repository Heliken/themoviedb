import { inject } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

export const UnAuthGuard = () => {
  const authService = inject(AuthorizationService);
  const router = inject(Router);
  return authService.isLoggedIn$.pipe(
    map(isLogged => (isLogged ? router.navigate(['/']) : true))
  );
};
