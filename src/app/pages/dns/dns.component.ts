import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AsyncPipe, NgForOf} from "@angular/common";
import {DnsService} from "../../api/dns/dns.service";
import {SidebarService} from "../../lib/sidebar/sidebar.service";
import {CreateZoneComponent} from "../../lib/components/dns/create-zone/create-zone.component";
import {Zone} from "../../api/dns/dns.domain";

@Component({
  selector: 'app-dns',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    NgForOf,
    RouterLink
  ],
  templateUrl: './dns.component.html',
  styleUrl: './dns.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DnsComponent {

  protected readonly zones = this.dnsService.getZones();

  constructor(
    private readonly dnsService: DnsService,
    private readonly sidebarService: SidebarService,
  ) {
  }

  protected new(): void {
    this.sidebarService.open("Create Zone", CreateZoneComponent);
  }

  protected trackBy(_idx: number, zone: Zone): string {
    return zone.id;
  }
}
