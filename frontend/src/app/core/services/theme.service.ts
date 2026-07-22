import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      const isDark = stored === 'true';
      this.darkModeSubject.next(isDark);
      this.applyTheme(isDark);
    }
  }

  toggleDarkMode(): void {
    const newValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newValue);
    localStorage.setItem('darkMode', String(newValue));
    this.applyTheme(newValue);
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      this.renderer.setAttribute(document.body, 'data-theme', 'dark');
    } else {
      this.renderer.removeAttribute(document.body, 'data-theme');
    }
  }
}
