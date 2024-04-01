import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractRecordForm} from "../abstract-record-form";
import {RecordType} from "../../../../../api/dns/dns.domain";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-ns-record-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './ns-record-form.component.html',
  styleUrl: '../base.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NsRecordFormComponent extends AbstractRecordForm<RecordType.NS> {

  @Input()
  public zoneId!: string;

  @Input()
  public recordId?: string;

  constructor() {
    super(
      RecordType.NS,
      new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required]),
        target: new FormControl<string | null>(null, [Validators.required]),
        ttl: new FormControl<number | null>(null),
      }),
    );
  }
}
