import { Routes } from '@angular/router';
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
    title: 'Signup',
    loadComponent: () =>
      import('./signup/signup.component')
        .then(mod => mod.SignupComponent)
  },
  {
    path: 'login',
    title: 'Login',
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
    canActivate: [authGuard],
    canActivateChild: [authGuard]
  },
  {
    path: '**',
    title: 'Not Found',
    loadComponent: () => import('./error-page/error-page.component')
      .then(mod => mod.ErrorPageComponent)
  }
];
