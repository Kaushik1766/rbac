import { Route, Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { ManagerComponent } from "./manager/manager.component";
import { AdminComponent } from "./admin/admin.component";

export const dashboardRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'manager',
    component: ManagerComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
]
