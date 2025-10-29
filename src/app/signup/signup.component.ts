import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Role } from '../models/user';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SIGNUP_STRINGS } from '../../constants/signup';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,

    FloatLabel,
    InputText,
    ButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  strings = SIGNUP_STRINGS;

  signupFormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required
      ],
      updateOn: 'change'
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required
      ]
    }),
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.required
      ],
      updateOn: 'change'
    }),
    role: new FormControl<Role.Manager | Role.User>(Role.User, {
      validators: [
        Validators.minLength(3),
        Validators.required
      ],
      updateOn: 'change'
    }),
  })

  signup() {

  }
}
