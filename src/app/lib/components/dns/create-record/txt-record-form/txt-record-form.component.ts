import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractRecordForm} from "../abstract-record-form";
import {RecordType} from "../../../../../api/dns/dns.domain";
import {DnsService} from "../../../../../api/dns/dns.service";
import {SidebarService} from "../../../../sidebar/sidebar.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-txt-record-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './txt-record-form.component.html',
  styleUrl: './txt-record-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TxtRecordFormComponent extends AbstractRecordForm<RecordType.TXT> {

  @Input()
  public zoneId!: string;

  constructor(dnsService: DnsService, sidebarService: SidebarService) {
    super(
      RecordType.TXT,
      new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required]),
        content: new FormControl<string | null>(null, [Validators.required]),
        ttl: new FormControl<number | null>(null),
      }),
      dnsService,
      sidebarService,
    );
  }
}
