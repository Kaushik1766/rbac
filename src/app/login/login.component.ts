import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LOGIN_STRINGS } from '../../constants/constants';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,

    FloatLabel,
    InputText,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  strings = LOGIN_STRINGS;

  loginFormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.required
      ]
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required
      ]
    }),
  })

  login(): void {
    const sub = this
      .authService
      .login(this.loginFormGroup.value.email!, this.loginFormGroup.value.password!)
      .subscribe({
        next: () => {
          console.log('logged in successfully')
          this.router.navigate(['dashboard', 'user'])
        },
        error: err => {
          this.messageService.add({
            summary: 'Error',
            detail: err,
            severity: 'error'
          })
        }
      });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

}
