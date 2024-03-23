import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {map, switchMap, tap} from "rxjs";
import {AuthService} from "../../../api/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Invite} from "../../../api/auth/auth.domain";
import {RelativeTimePipe} from "../../../lib/pipes/relative-time.pipe";

 function repeatPasswordValidator (control: AbstractControl<{password: string, repeat_password:string}>): ValidationErrors | null {
  return control.value.password === control.value.repeat_password
    ? null
    : {PasswordNoMatch: true};
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    NgIf,
    RelativeTimePipe,
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
    repeat_password: new FormControl('', [Validators.required])
  }, [repeatPasswordValidator]);

  protected readonly invite = this.route.params.pipe(
    switchMap(({inviteId}) => this.authService.checkInvite(inviteId)),
    tap(invite => this.form.controls.email.setValue(invite.email))
  );

  protected readonly valid = this.form.valueChanges.pipe(map(() => this.form.valid));

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  protected submit(event: SubmitEvent, invite: Invite): void {
    event.preventDefault();

    if (!this.form.valid) {
      return;
    }

    const {name, email, display_name, password} = this.form.value;

    this.authService.register(invite.id, name!, invite.email === email ? null : email!, display_name!, password!)
      .pipe(switchMap(() => this.router.navigateByUrl('/auth/password')))
      .subscribe();
  }
}
