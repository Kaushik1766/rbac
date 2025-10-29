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

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  addUser(user: User): void {
    if (this.users.find(u => u.email == user.email)) {
      throw new Error('User with this email already exists');
    }
    this.users.push(user);
    this.saveUsers()
  }

  removeUserByEmail(email: string): void {
    this.users = this.users.filter(u => u.email != email)
    this.saveUsers()
  }

  editUser(updatedUser: User): void {
    this.users = this.users.map(u => u.email == updatedUser.email ? updatedUser : u)
    this.saveUsers()
  }
}
