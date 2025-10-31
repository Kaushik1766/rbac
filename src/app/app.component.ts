import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemingService } from './services/theming.service';
import { ThemeSwitchComponent } from './shared/theme-switch/theme-switch.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,

    ThemeSwitchComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rbac';

  themeService = inject(ThemingService);

  @HostListener('document:keydown', ['$event'])
  toggleDarkMode(e: KeyboardEvent) {
    if (e.altKey && e.key.toLowerCase() == 't') {
      this.themeService.toggleTheme()
    }
  }
}
