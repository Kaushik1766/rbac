import { Component } from "@angular/core";
import { CardComponent } from "./card/card.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FloatLabel } from "primeng/floatlabel";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TextareaModule } from "primeng/textarea";
import { inject } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Role } from "../../../models/user";
import { AnnouncementService } from "../../../services/announcement.service";
import { ANNOUNCEMENTS_STRINGS } from '../../../../constants/constants';

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
  private announcementService = inject(AnnouncementService);

  strings = ANNOUNCEMENTS_STRINGS;

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

  addAnnouncement() {
    if (this.announcementFormGroup.valid) {
      this.announcementService.addAnnouncement({
        title: this.announcementFormGroup.value.title!,
        content: this.announcementFormGroup.value.content!,
        date: new Date(),
      });
      this.announcementFormGroup.reset();
    }
  }

  get isAdmin() {
    return this.authService.currentUser()!.role == Role.Admin;
  }

  get announcements() {
    return this.announcementService
      .announcements()
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
