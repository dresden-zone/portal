import {Routes} from '@angular/router';
import {authGuard} from "./api/auth/auth.guard";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {
    path: 'dashboard',
    loadComponent: () => import("./pages/dashboard/dashboard.component").then(c => c.DashboardComponent),
    canActivate: [authGuard]
  },
  {path: 'auth', loadChildren: () => import("./pages/auth/auth.routes").then(r => r.routes)}
];
