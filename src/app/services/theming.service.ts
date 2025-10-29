import { Injectable } from '@angular/core';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  currentTheme = Theme.LIGHT;

  constructor() {
    const theme = localStorage.getItem('theme');

    if (theme) {
      this.currentTheme = theme as Theme;
      this.setTheme(this.currentTheme);
    }
  }

  setTheme(theme: Theme) {
    document.querySelector('html')?.classList.remove(this.currentTheme)
    this.currentTheme = theme
    document.querySelector('html')?.classList.add(this.currentTheme)
    localStorage.setItem('theme', this.currentTheme)
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    localStorage.setItem('theme', this.currentTheme)
    document.querySelector('html')?.classList.toggle('dark')
  }
}
