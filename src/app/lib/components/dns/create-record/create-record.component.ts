import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, tap} from "rxjs";
import {DnsService} from "../../../../api/dns/dns.service";
import {SidebarService} from "../../../sidebar/sidebar.service";
import {RecordType} from "../../../../api/dns/dns.domain";

@Component({
  selector: 'app-create-record',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './create-record.component.html',
  styleUrl: './create-record.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecordComponent {

  @Input()
  public zoneId: string | null = null;

  protected readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    addr: new FormControl('', [Validators.required]),
  });

  protected readonly valid = this.form.valueChanges.pipe(map(() => this.form.valid));

  constructor(
    private readonly dnsService: DnsService,
    private readonly sidebarService: SidebarService,
  ) {
  }

  protected submit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid || !this.zoneId) {
      return;
    }

    const {name, addr} = this.form.value;

    this.dnsService.createRecord(RecordType.A, this.zoneId, name!, addr!)
      .pipe(tap(() => this.sidebarService.close()))
      .subscribe();
  }
}
