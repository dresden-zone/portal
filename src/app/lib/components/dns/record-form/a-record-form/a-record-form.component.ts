import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RecordType} from "../../../../../api/dns/dns.domain";
import {AbstractRecordForm} from "../abstract-record-form";

@Component({
  selector: 'app-a-record-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './a-record-form.component.html',
  styleUrl: '../base.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ARecordFormComponent extends AbstractRecordForm<RecordType.A> {

  @Input()
  public zoneId!: string;

  @Input()
  public recordId?: string;

  constructor() {
    super(
      RecordType.A,
      new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required]),
        addr: new FormControl<string | null>(null, [Validators.required]),
        ttl: new FormControl<number | null>(null),
      }),
    );
  }
}
