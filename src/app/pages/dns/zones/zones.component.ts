import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DnsService} from "../../../api/dns/dns.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SidebarService} from "../../../lib/sidebar/sidebar.service";
import {CreateZoneComponent} from "../../../lib/components/dns/create-zone/create-zone.component";

@Component({
  selector: 'app-zones',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZonesComponent {

  protected readonly zones = this.dnsService.getZones();

  constructor(
    private readonly dnsService: DnsService,
    private readonly sidebarService: SidebarService,
  ) {
  }

  protected new(): void {
    this.sidebarService.open("Create Zone", CreateZoneComponent);
  }
}
