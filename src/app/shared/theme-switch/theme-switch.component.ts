import { Component, inject } from '@angular/core';

import { Button } from "primeng/button";

import { ThemingService } from '../../services/theming.service';

@Component({
  selector: 'app-theme-switch',
  imports: [Button],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss'
})
export class ThemeSwitchComponent {
  private themeService = inject(ThemingService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
