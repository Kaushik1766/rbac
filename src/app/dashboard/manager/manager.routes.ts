import { Routes } from "@angular/router";
import { UsersComponent } from "../../shared/dashboard/users/users.component";

export const managerRoutes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: 'users',
        title: 'Users',
        component: UsersComponent
    },
    {
        path: 'announcements',
        title: 'Announcements',
        loadComponent: () => import('../../shared/dashboard/announcements/announcements.component')
        .then(m => m.AnnouncementsComponent)
    },
]