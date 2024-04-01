import {FormControl, FormGroup} from "@angular/forms";
import {map, Subject, takeUntil, tap} from "rxjs";
import {RecordInsert, RecordType} from "../../../../api/dns/dns.domain";
import {DnsService} from "../../../../api/dns/dns.service";
import {SidebarService} from "../../../sidebar/sidebar.service";
import {inject, Injectable, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";

type RecordForm<T> = FormGroup<{ [K in keyof RecordInsert<T>]: FormControl<RecordInsert<T>[K] | null> }>;

@Injectable()
export abstract class AbstractRecordForm<T extends RecordType> implements OnInit, OnDestroy, OnChanges {

  protected readonly valid = this.form.valueChanges.pipe(map(() => this.form.valid));
  protected readonly destroy = new Subject<void>();

  private readonly dnsService = inject(DnsService);
  private readonly sidebarService = inject(SidebarService);

  public abstract zoneId: string;
  public abstract recordId?: string;

  protected constructor(
    private readonly type: T,
    protected readonly form: RecordForm<T>,
  ) {
  }

  public ngOnInit(): void {
    this.ngOnChanges();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
  }

  public ngOnChanges(_?: SimpleChanges): void {
    if (typeof this.recordId === "undefined") {
      return;
    }

    this.dnsService.getRecord(this.type, this.zoneId, this.recordId)
      .pipe(takeUntil(this.destroy))
      // @ts-expect-error
      .subscribe(record => this.form.patchValue(record!));
  }

  protected submit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid) {
      return;
    }

    // TODO: enforce required validator??
    const data = this.form.value as RecordInsert<T>;

    const action = typeof this.recordId === "undefined"
      ? this.dnsService.createRecord(this.type, this.zoneId, data)
      : this.dnsService.modifyRecord(this.type, this.recordId, data);

    action
      .pipe(tap(() => this.sidebarService.close()))
      .subscribe();
  }
}
