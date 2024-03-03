import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet
  ]
})
export class AuthComponent {
}
