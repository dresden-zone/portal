import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, switchMap} from "rxjs";
import {AuthService} from "../../../api/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordComponent {

  protected readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  protected readonly valid = this.form.valueChanges.pipe(map(() => !this.form.valid));

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  protected submit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid) {
      return;
    }

    const {name, password} = this.form.value;

    this.authService.password(name!, password!)
      .pipe(switchMap(() => this.router.navigateByUrl('/')))
      .subscribe();
  }
}
