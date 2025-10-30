import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TableModule } from 'primeng/table';
import { TitleCasePipe } from '@angular/common';
import { Button } from "primeng/button";
import { InputText } from 'primeng/inputtext';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Role, User } from '../../../models/user';
import { EditComponent } from './edit/edit.component';
import { Dialog } from "primeng/dialog";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddComponent } from './add/add.component';
import { Toast } from "primeng/toast";
import { USERS_STRINGS } from '../../../../constants/constants';
import { debounceTime, distinctUntilChanged, from, fromEvent, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [
    // FormsModule,
    ReactiveFormsModule,
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
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  readonly strings = USERS_STRINGS;

  currentUser: Signal<User | null> = this.authService.currentUser;

  searchText: string = '';

  editVisible: boolean = false;
  addUserVisible: boolean = false;

  selectedUser: User | null = null;

  searchControl = new FormControl('');

  filteredUsers: User[] = [];

  ngOnInit(): void {
    const subscription = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.userService.getUsersByEmail(value || ''))
    ).subscribe(value => {
      console.log(value);
      this.filteredUsers = value;
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

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
        summary: this.strings.ERROR_SUMMARY,
        detail: this.strings.FAILED_TO_ADD_USER + (error as Error).message
      });
    }
  }

  deleteUser(userEmail: string): void {
    this.confirmationService.confirm({
      header: this.strings.CONFIRM_DELETION,
      message: this.strings.DELETE_USER_CONFIRM_MESSAGE + userEmail + '?',
      acceptButtonProps: {
        severity: 'danger',
        label: this.strings.DELETE_BUTTON,
      },
      rejectButtonProps: {
        severity: 'secondary',
        label: this.strings.CANCEL_BUTTON,
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

  get allowedRoles(): Role[] {
    switch (this.currentUser()!.role) {
      case Role.Admin:
        return [Role.Manager, Role.User];
      case Role.Manager:
        return [Role.User];
    }
    return []
  }
}
