import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: 'password', loadComponent: () => import("./password/password.component").then(c => c.PasswordComponent)},
  {
    path: 'register/:inviteId',
    loadComponent: () => import("./register/register.component").then(c => c.RegisterComponent)
  }
];
