import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Role } from '../../../../models/user';

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
  roles = [
    { label: 'Admin', value: Role.Admin },
    { label: 'Manager', value: Role.Manager },
    { label: 'User', value: Role.User }
  ];

  addUserFormGroup = new FormGroup({
    name: new FormControl('',{
      validators: [
        Validators.required
      ],
      updateOn: 'change'
    }),
    email: new FormControl('',{
      validators: [
        Validators.required,
        Validators.email
      ],
      updateOn: 'change'
    }),
    role: new FormControl('',{
      validators: [
        Validators.required
      ],
      updateOn: 'change'
    })
  })
}
