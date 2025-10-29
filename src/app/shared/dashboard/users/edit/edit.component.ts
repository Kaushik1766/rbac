import { Component, effect, inject, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { Role, User } from '../../../../models/user';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { UserService } from '../../../../services/user.service';
import { input } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { EDIT_USER_STRINGS } from '../../../../../constants/constants';

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
export class EditComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  user = input.required<User>();
  @Output() userUpdated = new EventEmitter<void>();

  readonly strings = EDIT_USER_STRINGS;

  roleMap = {
    [Role.Admin]: [
      { label: 'Admin', value: Role.Admin },
      { label: 'Manager', value: Role.Manager },
      { label: 'User', value: Role.User }
    ],
    [Role.Manager]: [
      { label: 'Manager', value: Role.Manager },
      { label: 'User', value: Role.User }
    ],
    [Role.User]: []
  };

  editFormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    role: new FormControl()
  });

  constructor() {
    effect(() => {
      const currentUser = this.user();
      this.editFormGroup.patchValue({
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role
      });
    });
  }

  saveChanges(): void {
    this.userService.editUser({
      ...this.user(),
      name: this.editFormGroup.value.name!,
      role: this.editFormGroup.value.role!
    });
    this.userUpdated.emit();
  }

  get roles(): { label: string; value: Role }[] {
    return this.roleMap[this.authService.currentUser()!.role]
  }
}
