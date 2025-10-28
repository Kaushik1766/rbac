import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Role } from '../models/user';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  const currentUser = authService.currentUser()
  console.log(currentUser)

  if (!currentUser) {
    if (state.url.includes('login')) {
      return true
    }
    else {
      return router.createUrlTree(['login'])
    }
  }

  if (!state.url.includes('dashboard/user') && currentUser.role == Role.User) {
    return router.createUrlTree(['dashboard', 'user'])
  }
  if (!state.url.includes('dashboard/manager') && currentUser.role == Role.Manager) {
    return router.createUrlTree(['dashboard', 'manager'])
  }
  if (!state.url.includes('dashboard/admin') && currentUser.role == Role.Admin) {
    return router.createUrlTree(['dashboard', 'admin'])
  }
  return true
};
