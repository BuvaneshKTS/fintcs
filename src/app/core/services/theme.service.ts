import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.setDarkMode(savedTheme === 'dark');
    } else if (prefersDark) {
      this.setDarkMode(true);
    }
  }

  toggleTheme(): void {
    const isDark = !this.isDarkModeSubject.value;
    this.setDarkMode(isDark);
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkModeSubject.next(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }
}