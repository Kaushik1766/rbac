import { Component, computed, DestroyRef, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Button } from "primeng/button";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from "primeng/dialog";
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Toast } from "primeng/toast";
import { debounceTime, distinctUntilChanged, from, fromEvent, startWith, switchMap } from 'rxjs';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Role, User } from '../../../models/user';
import { USERS_STRINGS } from '../../../../constants/constants';

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


  editVisible: boolean = false;
  addUserVisible: boolean = false;

  selectedUser: User | null = null;

  searchControl = new FormControl('');

  filteredUsers = signal<User[]>([]);

  constructor() {
    effect(() => {
      this.userService.users();
      const currentSearch = this.searchControl.value || '';
      this.userService.getUsersByEmail(currentSearch).subscribe(users => {
        this.filteredUsers.set(users);
      });
    });
  }

  ngOnInit(): void {
    const subscription = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.userService.getUsersByEmail(value || ''))
    ).subscribe(users => {
      this.filteredUsers.set(users);
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
