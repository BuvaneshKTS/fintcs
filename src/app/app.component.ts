import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'Fintcs Frontend';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Theme service will initialize automatically
  }
}
