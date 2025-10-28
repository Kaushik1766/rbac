import { Routes } from "@angular/router";
import { AnnouncementsComponent } from "../../shared/dashboard/announcements/announcements.component";

export const userRoutes: Routes = [
    {
        path: '',
        redirectTo: 'announcements',
        pathMatch: 'full'
    },
    {
        path: 'announcements',
        title: 'Announcements',
        component: AnnouncementsComponent
    }
]