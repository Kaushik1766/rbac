import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { ButtonModule } from "primeng/button";
import { FloatLabel } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { TextareaModule } from "primeng/textarea";

import { CardComponent } from "./card/card.component";
import { AnnouncementService } from "../../../services/announcement.service";
import { AuthService } from "../../../services/auth.service";
import { Announcement } from "../../../models/announcement";
import { Role } from "../../../models/user";
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

  readonly strings = ANNOUNCEMENTS_STRINGS;

  announcementFormGroup = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
      updateOn: "change",
    }),
    content: new FormControl('', {
      validators: [Validators.required],
      updateOn: "change",
    }),
  });

  addAnnouncement(): void {
    if (this.announcementFormGroup.valid) {
      this.announcementService.addAnnouncement({
        title: this.announcementFormGroup.value.title!,
        content: this.announcementFormGroup.value.content!,
        date: new Date()
      });
      this.announcementFormGroup.reset();
    }
  }

  get isAdmin(): boolean {
    return this.authService.currentUser()!.role == Role.Admin;
  }

  get announcements(): Announcement[] {
    return this.announcementService
      .announcements()
      .sort((announcement1, announcement2) => announcement2.date.getTime() - announcement1.date.getTime());
  }
}
