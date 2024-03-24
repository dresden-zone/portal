import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dns',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './dns.component.html',
  styleUrl: './dns.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DnsComponent {

}
