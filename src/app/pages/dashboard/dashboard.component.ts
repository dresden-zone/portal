import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from "../../api/auth/auth.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  protected readonly me = this.authService.me();

  constructor(
    private readonly authService: AuthService,
  ) {
  }
}
