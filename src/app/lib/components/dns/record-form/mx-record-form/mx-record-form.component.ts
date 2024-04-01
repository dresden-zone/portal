import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractRecordForm} from "../abstract-record-form";
import {RecordType} from "../../../../../api/dns/dns.domain";
import {DnsService} from "../../../../../api/dns/dns.service";
import {SidebarService} from "../../../../sidebar/sidebar.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-mx-record-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './mx-record-form.component.html',
  styleUrl: '../base.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MxRecordFormComponent extends AbstractRecordForm<RecordType.MX> {

  @Input()
  public zoneId!: string;

  @Input()
  public recordId?: string;

  constructor() {
    super(
      RecordType.MX,
      new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required]),
        preference: new FormControl<number | null>(null, [Validators.required]),
        exchange: new FormControl<string | null>(null, [Validators.required]),
        ttl: new FormControl<number | null>(null),
      }),
    );
  }
}
