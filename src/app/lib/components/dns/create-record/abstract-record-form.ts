import {FormControl, FormGroup} from "@angular/forms";
import {map, tap} from "rxjs";
import {RecordInsert, RecordType} from "../../../../api/dns/dns.domain";
import {DnsService} from "../../../../api/dns/dns.service";
import {SidebarService} from "../../../sidebar/sidebar.service";

type RecordForm<T> = FormGroup<{ [K in keyof RecordInsert<T>]: FormControl<RecordInsert<T>[K] | null> }>;

export abstract class AbstractRecordForm<T extends RecordType> {

  protected readonly valid = this.form.valueChanges.pipe(map(() => this.form.valid));

  protected constructor(
    private readonly type: T,
    protected readonly form: RecordForm<T>,
    private readonly dnsService: DnsService,
    private readonly sidebarService: SidebarService,
  ) {
  }

  protected submit(event: SubmitEvent, zoneId: string) {
    event.preventDefault();

    if (!this.form.valid) {
      return;
    }

    // TODO: enforce required validator??
    this.dnsService.createRecord(this.type, zoneId, this.form.value as RecordInsert<T>)
      .pipe(tap(() => this.sidebarService.close()))
      .subscribe();
  }
}
