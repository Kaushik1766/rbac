import { Route, Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { ManagerComponent } from "./manager/manager.component";
import { AdminComponent } from "./admin/admin.component";

export const dashboardRoutes: Routes = [
  {
    path: 'user',
    loadComponent: () => import('./user/user.component')
      .then(m => m.UserComponent),
    loadChildren: () => import('./user/user.routes')
      .then(m => m.userRoutes)
  },
  {
    path: 'manager',
    loadComponent: () => import('./manager/manager.component')
      .then(m => m.ManagerComponent),
    loadChildren: () => import('./manager/manager.routes')
      .then(m => m.managerRoutes)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent),
    loadChildren: () => import('./admin/admin.routes')
      .then(m => m.adminRoutes)
  },
]
