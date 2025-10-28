import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = signal<User | null>(null)
  private userService = inject(UserService)

  constructor() { }

  login(email: string, password: string) {
    return new Observable<boolean>((observer) => {
      const user = this.userService.users.find(u => u.email == email && u.password == password)

      if (!user) {
        observer.error('User not found')
        return
      }

      this.user.set(user)
      observer.next(true)
      observer.complete()
    })
  }

  signup(signupReq: User) {
    return new Observable<boolean>((observer) => {
      const user = this.userService.users.find(u => u.email == signupReq.email)

      if (user) {
        observer.error('User already exists please try to login')
        return
      }

      this.userService.addUser(signupReq)
      observer.complete()
    })
  }

  get currentUser() {
    return this.user
  }
}
