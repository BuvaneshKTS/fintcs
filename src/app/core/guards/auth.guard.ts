// src/app/core/guard/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const userStr = localStorage.getItem('fintcs_user');
    
    // If we have both token and user data, allow access
    if (token && userStr) {
      // Only validate token expiration for critical operations
      if (state.url.includes('/users') || state.url.includes('/admin')) {
        return this.authService.isAuthenticated();
      }
      return true;
    }
    
    // No authentication data, redirect to login
    this.router.navigate(['/auth/login']);
    return false;
  }
}