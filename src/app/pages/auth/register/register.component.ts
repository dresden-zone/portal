import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, switchMap} from "rxjs";
import {AuthService} from "../../../api/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  protected readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    display_name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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

    const {name, email, display_name, password} = this.form.value;

    this.authService.register(name!, email!, display_name!, password!)
      .pipe(switchMap(() => this.router.navigateByUrl('/auth/password')))
      .subscribe();
  }
}
