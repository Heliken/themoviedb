import { inject } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

export const UnAuthGuard = () => {
  const userInfo = inject(UserInfoService);
  const router = inject(Router);
  return userInfo.isLoggedIn$.pipe(
    map(isLogged => (isLogged ? router.navigate(['/']) : true))
  );
};
