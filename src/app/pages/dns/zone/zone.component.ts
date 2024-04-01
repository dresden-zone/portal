import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DnsService} from "../../../api/dns/dns.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Record, RecordType} from "../../../api/dns/dns.domain";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs";
import {SidebarService} from "../../../lib/sidebar/sidebar.service";
import {RecordFormComponent} from "../../../lib/components/dns/record-form/record-form.component";

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
  protected readonly zone = this.zoneId.pipe(switchMap(zoneId => this.dnsService.getZone(zoneId)));

  protected readonly aRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.A, zoneId))
  );
  protected readonly aaaaRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.AAAA, zoneId))
  );
  protected readonly cnameRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.CNAME, zoneId))
  );
  protected readonly mxRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.MX, zoneId))
  );
  protected readonly nsRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.NS, zoneId))
  );
  protected readonly txtRecords = this.zoneId.pipe(
    switchMap(zoneId => this.dnsService.getRecords(RecordType.TXT, zoneId))
  );

  constructor(
    private readonly dnsService: DnsService,
    private readonly route: ActivatedRoute,
    private readonly sidebarService: SidebarService,
  ) {
  }

  protected new(zoneId: string): void {
    this.sidebarService.open("Create Record", RecordFormComponent, {zoneId});
  }

  protected edit(zoneId: string, recordType: RecordType, recordId: string): void {
    this.sidebarService.open("Modify Record", RecordFormComponent, {zoneId, recordType, recordId});
  }

  protected trackBy<T>(_idx: number, record: Record<T>): string {
    return record.id;
  }

  protected readonly RecordType = RecordType;
}
