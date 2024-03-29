import {Routes} from '@angular/router';
import {DnsComponent} from "./dns.component";

export const routes: Routes = [{
  path: '', component: DnsComponent, children: [
    {path: '', loadComponent: () => import("./dashboard/dashboard.component").then(c => c.DashboardComponent)},
    {path: ':zoneId', loadComponent: () => import("./zone/zone.component").then(c => c.ZoneComponent)},
  ]
}];
