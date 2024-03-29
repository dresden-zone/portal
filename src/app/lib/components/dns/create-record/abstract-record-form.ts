import {FormControl, FormGroup} from "@angular/forms";
import {map, tap} from "rxjs";
import {RecordInsert, RecordType} from "../../../../api/dns/dns.domain";
import {DnsService} from "../../../../api/dns/dns.service";
import {SidebarService} from "../../../sidebar/sidebar.service";
import {inject} from "@angular/core";

type RecordForm<T> = FormGroup<{ [K in keyof RecordInsert<T>]: FormControl<RecordInsert<T>[K] | null> }>;

export abstract class AbstractRecordForm<T extends RecordType> {

  protected readonly valid = this.form.valueChanges.pipe(map(() => this.form.valid));

  private readonly dnsService = inject(DnsService);
  private readonly sidebarService = inject(SidebarService);

  protected constructor(
    private readonly type: T,
    protected readonly form: RecordForm<T>,
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
