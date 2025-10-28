import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { Role, User } from '../../../../models/user';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule,

    DialogModule,
    ButtonModule,
    FloatLabel,
    InputText,
    Select
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  
  user = input.required<User>();

  roles = [
    { label: 'Admin', value: Role.Admin },
    { label: 'Manager', value: Role.Manager },
    { label: 'User', value: Role.User }
  ];

  editFormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    role: new FormControl()
  })

  ngOnInit(): void {
    this.editFormGroup.patchValue({
      name: this.user().name,
      email: this.user().email,
      role: this.user().role
    });
  }
  saveChanges() {}
}
