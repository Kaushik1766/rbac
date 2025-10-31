import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { MockUsers } from '../mock-data/mock-users';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // users: User[] = [];
  users = signal<User[]>([])

  constructor() {
    const localUsers = localStorage.getItem('users');

    if (localUsers) {
      this.users.set(JSON.parse(localUsers));
    }
    else {
      this.users.set(MockUsers)
    }
  }

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users()));
  }

  getUsersByEmail(email: string): Observable<User[]> {
    return of(this.users().filter((u: User) => u.email.includes(email)));
  }

  addUser(user: User): void {
    if (this.users().find((u: User) => u.email == user.email)) {
      throw new Error('User with this email already exists');
    }
    this.users.update(users => [...users, user]);
    this.saveUsers()
  }

  removeUserByEmail(email: string): void {
    this.users.set(this.users().filter((u: User) => u.email != email))
    this.saveUsers()
  }

  editUser(updatedUser: User): void {
    this.users.set(this.users().map((u: User) => u.email == updatedUser.email ? updatedUser : u))
    console.log(this.users())
    this.saveUsers()
  }
}
