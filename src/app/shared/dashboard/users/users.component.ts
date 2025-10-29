import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TableModule } from 'primeng/table';
import { TitleCasePipe } from '@angular/common';
import { Button } from "primeng/button";
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Role, User } from '../../../models/user';
import { EditComponent } from './edit/edit.component';
import { Dialog } from "primeng/dialog";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddComponent } from './add/add.component';
import { Toast } from "primeng/toast";
import { USERS_STRINGS } from '../../../../constants/users';

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
    AddComponent,
    Toast
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class UsersComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  strings = USERS_STRINGS;

  searchText = '';

  editVisible = false;
  addUserVisible = false;
  selectedUser: User | null = null;

  openEditDialog(user: User): void {
    this.selectedUser = user;
    this.editVisible = true;
  }

  closeEditDialog(): void {
    this.editVisible = false;
    this.selectedUser = null;
  }

  onUserUpdated(): void {
    this.closeEditDialog();
  }

  onUserAdded(user: User): void {
    try {
      this.userService.addUser(user);
      this.addUserVisible = false;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to add user: ' + (error as Error).message
      });
    }
  }

  deleteUser(userEmail: string): void {
    this.confirmationService.confirm({
      header: 'Confirm Deletion',
      message: `Are you sure you want to delete the user with email: ${userEmail}?`,
      acceptButtonProps: {
        severity: 'danger',
        label: 'Delete',
      },
      rejectButtonProps: {
        severity: 'secondary',
        label: 'Cancel',
      },
      accept: () => {
        this.userService.removeUserByEmail(userEmail);
      }
    });
  }

  get users(): User[] {
    return this.userService.users.filter(u => u.email.includes(this.searchText));
  }

  get isAdmin(): boolean {
    return this.authService.currentUser()!.role == Role.Admin;
  }
}
