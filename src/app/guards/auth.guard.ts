import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const seguridadGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.verificar()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
