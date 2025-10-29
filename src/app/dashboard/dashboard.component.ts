import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, Routes, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Button } from 'primeng/button';
import { Role } from '../models/user';
import { managerRoutes } from './manager/manager.routes';
import { adminRoutes } from './admin/admin.routes';
import { userRoutes } from './user/user.routes';
import { DASHBOARD_STRINGS } from '../../constants/constants';

type AvailableRoute = {
  title: string;
  link: string[];
}

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    RouterOutlet,

    Button,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;

  availableRoutes: AvailableRoute[] = [];

  readonly strings = DASHBOARD_STRINGS;

  ngOnInit(): void {
    this.availableRoutes = this.getAvailableRoutes();
  }

  private routesToAvailableRoutes(routes: Routes, roleString: string): AvailableRoute[] {
    return routes
      .filter(route => route.path !== '')
      .map(route => {
        return {
          title: route.title as string,
          link: [roleString, route.path!]
        }
      });
  }

  private getAvailableRoutes(): AvailableRoute[] {
    switch (this.currentUser()!.role) {
      case Role.Admin:
        return this.routesToAvailableRoutes(adminRoutes, 'admin');
      case Role.Manager:
        let managerAvailableRoutes = this.routesToAvailableRoutes(managerRoutes, 'manager');
        console.log(managerAvailableRoutes);
        return managerAvailableRoutes;
      case Role.User:
        return this.routesToAvailableRoutes(userRoutes, 'user');
    }
  }

  get isActiveRoute(): (routeLink: string) => boolean {
    const currentUrl = this.router.url
    return (routeLink: string) => currentUrl.includes(routeLink)
  }

  logout(): void {
    this.authService.logout();
  }
}
