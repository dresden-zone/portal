import {ChangeDetectionStrategy, Component, Input, Type} from '@angular/core';
import {AsyncPipe, NgComponentOutlet, NgIf} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {RecordType} from "../../../../api/dns/dns.domain";
import {map, startWith} from "rxjs";
import {ARecordFormComponent} from "./a-record-form/a-record-form.component";
import {AaaaRecordFormComponent} from "./aaaa-record-form/aaaa-record-form.component";
import {CnameRecordFormComponent} from "./cname-record-form/cname-record-form.component";
import {MxRecordFormComponent} from "./mx-record-form/mx-record-form.component";
import {NsRecordFormComponent} from "./ns-record-form/ns-record-form.component";
import {TxtRecordFormComponent} from "./txt-record-form/txt-record-form.component";

const DEFAULT_SELECTED = RecordType.A;

const RECORD_FORM_MAPPING: Record<RecordType, Type<unknown>> = {
  [RecordType.A]: ARecordFormComponent,
  [RecordType.AAAA]: AaaaRecordFormComponent,
  [RecordType.CNAME]: CnameRecordFormComponent,
  [RecordType.MX]: MxRecordFormComponent,
  [RecordType.NS]: NsRecordFormComponent,
  [RecordType.TXT]: TxtRecordFormComponent,
};

@Component({
  selector: 'app-create-record',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    NgComponentOutlet,
    NgIf
  ],
  templateUrl: './create-record.component.html',
  styleUrl: './create-record.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecordComponent {

  protected recordType = new FormControl(DEFAULT_SELECTED, {nonNullable: true});

  protected recordForm = this.recordType.valueChanges.pipe(
    startWith(DEFAULT_SELECTED),
    map(type => ({component: RECORD_FORM_MAPPING[type], inputs: {zoneId: this.zoneId}}))
  );

  @Input()
  public zoneId: string | null = null;
}
