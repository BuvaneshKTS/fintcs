// src/app/features/dashboard/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  
  // Dashboard statistics
  stats = {
    totalMembers: { value: 1234, growth: 12 },
    totalDeposits: { value: 45.2, growth: 8.5 },
    activeLoans: { value: 156, growth: 2.3 },
    interestEarned: { value: 2.1, growth: 15.2 }
  };

  quickActions = [
    {
      title: 'New Member',
      subtitle: 'Register new member',
      icon: '👤',
      route: '/members/new',
      color: 'bg-purple-600'
    },
    {
      title: 'New Deposit',
      subtitle: 'View/deposit receipt',
      icon: '💰',
      route: '/deposits/new',
      color: 'bg-blue-600'
    },
    {
      title: 'Process Loan',
      subtitle: 'Application processing',
      icon: '📄',
      route: '/loans/process',
      color: 'bg-green-600'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }
}