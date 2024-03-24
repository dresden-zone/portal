import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DnsService} from "../../../api/dns/dns.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Record, RecordType} from "../../../api/dns/dns.domain";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs";
import {SidebarService} from "../../../lib/sidebar/sidebar.service";
import {CreateRecordComponent} from "../../../lib/components/dns/create-record/create-record.component";

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZoneComponent {

  protected readonly zoneId = this.route.params.pipe(map(({zoneId}) => zoneId));

  protected aRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.A, zoneId))
  );
  protected aaaaRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.AAAA, zoneId))
  );
  protected cnameRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.CNAME, zoneId))
  );
  protected mxRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.MX, zoneId))
  );
  protected nsRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.NS, zoneId))
  );
  protected txtRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.TXT, zoneId))
  );

  constructor(
    private readonly dnsService: DnsService,
    private readonly route: ActivatedRoute,
    private readonly sidebarService: SidebarService,
  ) {
  }

  protected new(zoneId: string): void {
    this.sidebarService.open("Create Record", CreateRecordComponent, {zoneId});
  }

  protected trackBy<T>(_idx: number, record: Record<T>): string {
    return record.id;
  }
}
