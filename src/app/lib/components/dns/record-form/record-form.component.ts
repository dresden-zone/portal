import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, Type} from '@angular/core';
import {AsyncPipe, NgComponentOutlet, NgIf} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {RecordType} from "../../../../api/dns/dns.domain";
import {combineLatest, map, share, Subject} from "rxjs";
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
  selector: 'app-record-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    NgComponentOutlet,
    NgIf
  ],
  templateUrl: './record-form.component.html',
  styleUrl: './record-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordFormComponent implements OnChanges, OnInit {

  protected recordTypeForm = new FormControl(DEFAULT_SELECTED, {nonNullable: true});

  private data = new Subject<{ zoneId: string, recordId?: string }>();

  protected recordForm = combineLatest(
    [this.recordTypeForm.valueChanges, this.data]
  ).pipe(
    map(([type, {zoneId, recordId}]) => ({component: RECORD_FORM_MAPPING[type], inputs: {zoneId, recordId}})),
    share()
  );

  @Input()
  public zoneId!: string;

  @Input()
  public recordType?: RecordType;

  @Input()
  public recordId?: string;

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnChanges(_?: SimpleChanges): void {
    this.data.next({zoneId: this.zoneId, recordId: this.recordId});
    this.recordTypeForm.setValue(this.recordType ?? DEFAULT_SELECTED);
  }
}
