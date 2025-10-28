import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component')
        .then(mod => mod.SignupComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component')
        .then(mod => mod.LoginComponent),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () =>
      import('./dashboard/dashboard.routes')
        .then(mod => mod.dashboardRoutes),
    canActivate: [authGuard]
  }
];
