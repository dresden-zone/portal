import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RecordType} from "../../../../../api/dns/dns.domain";
import {AbstractRecordForm} from "../abstract-record-form";
import {DnsService} from "../../../../../api/dns/dns.service";
import {SidebarService} from "../../../../sidebar/sidebar.service";

@Component({
  selector: 'app-a-record-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './a-record-form.component.html',
  styleUrl: './a-record-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ARecordFormComponent extends AbstractRecordForm<RecordType.A> {

  @Input()
  public zoneId!: string;

  constructor(dnsService: DnsService, sidebarService: SidebarService) {
    super(
      RecordType.A,
      new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required]),
        addr: new FormControl<string | null>(null, [Validators.required]),
        ttl: new FormControl<number | null>(null),
      }),
      dnsService,
      sidebarService,
    );
  }
}
