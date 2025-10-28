import { Component } from "@angular/core";
import { CardComponent } from "./card/card.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { formatDate } from "@angular/common";
import { FloatLabel } from "primeng/floatlabel";
import { ButtonModule } from "primeng/button";
import { InputText, InputTextModule } from "primeng/inputtext";
import { TextareaModule } from "primeng/textarea";
import { inject } from "@angular/core";
import { AuthService } from "../../auth.service";
import { Role } from "../../../models/user";

const announcements = [
  {
    title: "System Maintenance",
    content:
      "The system will be down for maintenance on Saturday from 1 AM to 3 AM.",
    date: new Date("2024-06-10T01:00:00"),
  },
  {
    title: "New Feature Released",
    content:
      "We have released a new feature that allows users to customize their dashboards.",
    date: new Date("2024-06-08T09:30:00"),
  },
  {
    title: "Holiday Schedule",
    content:
      "Please note the office will be closed on July 4th in observance of Independence Day.",
    date: new Date("2024-06-15T00:00:00"),
  },
];

@Component({
  selector: "app-announcements",
  imports: [
    ReactiveFormsModule,

    CardComponent,
    FloatLabel,
    ButtonModule,
    InputTextModule,
    TextareaModule,
  ],
  templateUrl: "./announcements.component.html",
  styleUrl: "./announcements.component.scss",
})
export class AnnouncementsComponent {
  private authService = inject(AuthService);

  announcements = announcements;

  announcementFormGroup = new FormGroup({
    title: new FormControl("", {
      validators: [Validators.required],
      updateOn: "change",
    }),
    content: new FormControl("", {
      validators: [Validators.required],
      updateOn: "change",
    }),
  });

  addAnnouncement() {}

  get isAdmin(){
    return this.authService.currentUser()!.role == Role.Admin;
  }
}
