import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { MockUsers } from '../mock-data/mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];

  constructor() {
    const localUsers = localStorage.getItem('users');

    if (localUsers) {
      this.users = JSON.parse(localUsers);
    }
    else {
      this.users = MockUsers
    }
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  addUser(user: User) {
    this.users.push(user);
    this.saveUsers()
  }

  removeUserByEmail(email: string) {
    this.users = this.users.filter(u => u.email != email)
    this.saveUsers()
  }
}
