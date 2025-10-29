import { Injectable, signal } from '@angular/core';
import { Announcement } from '../models/announcement';

const mockAnnouncements: Announcement[] = [
  {
    title: "System Maintenance",
    content: "The system will be down for maintenance on Saturday from 1 AM to 3 AM.",
    date: new Date("2024-06-10T01:00:00"),
  },
  {
    title: "New Feature Released",
    content: "We have released a new feature that allows users to customize their dashboards.",
    date: new Date("2024-06-08T09:30:00"),
  },
  {
    title: "Holiday Schedule",
    content: "Please note the office will be closed on July 4th in observance of Independence Day.",
    date: new Date("2024-06-15T00:00:00"),
  },
];

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  announcements = signal<Announcement[]>([]);

  constructor() {
    const localAnnouncements = localStorage.getItem('announcements');

    if (localAnnouncements) {
      const parsed = JSON.parse(localAnnouncements);
      this.announcements.set(parsed.map((a: any) => ({
        ...a,
        date: new Date(a.date)
      })));
    }
    else {
      this.announcements.set(mockAnnouncements);
    }
  }

  private saveAnnouncements(): void {
    localStorage.setItem('announcements', JSON.stringify(this.announcements()));
  }

  addAnnouncement(announcement: Announcement): void {
    this.announcements.update(announcements => [...announcements, announcement]);
    this.saveAnnouncements();
  }
}
