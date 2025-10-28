import { Component, inject } from '@angular/core';
import { UserService } from '../../user.service';
import { TableModule } from 'primeng/table';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Button } from "primeng/button";
import { BaseIcon } from "primeng/icons/baseicon";
import { InputText } from 'primeng/inputtext';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Role } from '../../../models/user';
import { EditComponent } from './edit/edit.component';
import { Dialog } from "primeng/dialog";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule,
    TitleCasePipe,
    TableModule,
    Button,
    InputText,
    Dialog,
    ConfirmDialogModule,
    
    EditComponent,
    AddComponent
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [ConfirmationService]
})
export class UsersComponent {
  private userService = inject(UserService)
  private authService = inject(AuthService)
  private confirmationService = inject(ConfirmationService)

  searchText=''

  editVisible = false;
  addUserVisible = false;

  deleteUser(userEmail: string) {
    this.confirmationService.confirm({
      header: 'Confirm Deletion',
      message: `Are you sure you want to delete the user with email: ${userEmail}?`,
      acceptButtonProps:{
        severity: 'danger',
        label: 'Delete',
      },
      rejectButtonProps:{
        severity: 'secondary',
        label: 'Cancel',
      },
      accept: () => {
        this.userService.removeUserByEmail(userEmail);
      }
    });
  }

  get users() {
    return this.userService.users.filter(u => u.email.includes(this.searchText));
  }

  get isAdmin(){
    return this.authService.currentUser()!.role == Role.Admin;
  }
}
