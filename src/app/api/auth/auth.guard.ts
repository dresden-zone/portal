import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated()
    .pipe(map(authenticated => authenticated ? true : router.parseUrl('/auth/password')));
};
