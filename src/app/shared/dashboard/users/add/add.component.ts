import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';

import { Role, User } from '../../../../models/user';
import { ADD_USER_STRINGS } from '../../../../../constants/constants';

@Component({
  selector: 'app-add',
  imports: [
    ReactiveFormsModule,

    FloatLabel,
    InputText,
    ButtonModule,
    Select
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  @Output() userAdded = new EventEmitter<User>();
  @Output() cancelled = new EventEmitter<void>();

  readonly strings = ADD_USER_STRINGS;

  roles = [
    { label: 'Admin', value: Role.Admin },
    { label: 'Manager', value: Role.Manager },
    { label: 'User', value: Role.User }
  ];

  addUserFormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required
      ],
      updateOn: 'change'
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
      ],
      updateOn: 'change'
    }),
    role: new FormControl<Role>(Role.User, {
      validators: [
        Validators.required
      ],
      updateOn: 'change'
    })
  })

  addUser(): void {
    if (this.addUserFormGroup.valid) {
      const user: User = {
        name: this.addUserFormGroup.value.name!,
        email: this.addUserFormGroup.value.email!,
        role: this.addUserFormGroup.value.role!,
        password: '123'
      };
      this.userAdded.emit(user);
      this.addUserFormGroup.reset({ role: Role.User });
    }
  }

  cancel(): void {
    this.cancelled.emit();
    this.addUserFormGroup.reset({ role: Role.User });
  }
}
