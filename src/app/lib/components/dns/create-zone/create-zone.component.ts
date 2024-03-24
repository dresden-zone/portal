import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {DnsService} from "../../../../api/dns/dns.service";
import {SidebarService} from "../../../sidebar/sidebar.service";

@Component({
  selector: 'app-create-zone',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './create-zone.component.html',
  styleUrl: './create-zone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateZoneComponent {

  protected readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  protected readonly valid = this.form.valueChanges.pipe(map(() => this.form.valid));

  constructor(
    private readonly dnsService: DnsService,
    private readonly router: Router,
    private readonly sidebarService: SidebarService,
  ) {
  }

  protected submit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid) {
      return;
    }

    const {name} = this.form.value;

    this.dnsService.createZone(name!)
      .pipe(switchMap(zone =>{
        this.sidebarService.close();
        return this.router.navigateByUrl(`/dns/${zone.id}`);
      }))
      .subscribe();
  }
}
