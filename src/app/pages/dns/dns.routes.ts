import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import("./zones/zones.component").then(c => c.ZonesComponent)},
  {path: ':zoneId', loadComponent: () => import("./zone/zone.component").then(c => c.ZoneComponent)}
];
