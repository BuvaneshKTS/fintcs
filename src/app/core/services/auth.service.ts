// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, User, ApiResponse } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://fintcsapi-1.onrender.com/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.setSession(response.data);
          }
        })
      );
  }

  getCurrentUser(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.API_URL}/users/me`)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            this.currentUserSubject.next(response.data);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('fintcs_token');
    localStorage.removeItem('fintcs_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('fintcs_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Add buffer time to prevent premature logout
      const currentTime = Date.now() / 1000;
      const bufferTime = 60; // 1 minute buffer
      return payload.exp > (currentTime + bufferTime);
    } catch {
      // If token parsing fails, check if user data exists in storage
      const userStr = localStorage.getItem('fintcs_user');
      return !!userStr;
    }
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;    
    return user?.roles === 'admin';
  }

  private setSession(authResult: LoginResponse): void {
    localStorage.setItem('fintcs_token', authResult.token);
    localStorage.setItem('fintcs_user', JSON.stringify(authResult));
    
    const user: User = {
      id: 0, // Will be updated from API
      username: authResult.username,
      email: authResult.email,
      phone: authResult.phone,
      roles: authResult.roles,
      details: authResult.details,
      createdAt: ''
    };
    
    this.currentUserSubject.next(user);
  }

  private loadUserFromStorage(): void {
    const token = this.getToken();
    const userStr = localStorage.getItem('fintcs_user');
    
    if (token && userStr) {
      try {
        const authResult = JSON.parse(userStr);
        const user: User = {
          id: 0,
          username: authResult.username,
          email: authResult.email,
          phone: authResult.phone,
          roles: authResult.roles,
          details: authResult.details,
          createdAt: ''
        };
        this.currentUserSubject.next(user);
        
        // Only check authentication for expired tokens, not on every load
        if (!this.isAuthenticated()) {
          setTimeout(() => this.logout(), 100); // Delay logout to prevent immediate redirect
        }
      } catch {
        this.logout();
      }
    }
  }
}