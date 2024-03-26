import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AbstractRecordForm} from "../abstract-record-form";
import {RecordType} from "../../../../../api/dns/dns.domain";
import {DnsService} from "../../../../../api/dns/dns.service";
import {SidebarService} from "../../../../sidebar/sidebar.service";

@Component({
  selector: 'app-cname-record-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './cname-record-form.component.html',
  styleUrl: './cname-record-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CnameRecordFormComponent extends AbstractRecordForm<RecordType.CNAME> {

  @Input()
  public zoneId!: string;

  constructor(dnsService: DnsService, sidebarService: SidebarService) {
    super(
      RecordType.CNAME,
      new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required]),
        target: new FormControl<string | null>(null, [Validators.required]),
        ttl: new FormControl<number | null>(null),
      }),
      dnsService,
      sidebarService,
    );
  }
}
