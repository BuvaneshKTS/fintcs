// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { SocietyUsersService } from '../society-users.service';
// import { User } from '../../../shared/models/user.model';
// import { AuthService } from '../../../core/services/auth.service';

// @Component({
//   selector: 'app-society-user-detail',
//   templateUrl: './society-users-details.component.html'
// })
// export class SocietyUserDetailComponent implements OnInit {
//   user!: User;
//   isAdmin = false;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private societyUsersService: SocietyUsersService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.isAdmin = this.authService.isAdmin();
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.societyUsersService.getById(+id).subscribe(res => {
//         if (res.success) {
//           this.user = res.data;
//         }
//       });
//     }
//   }

//   deleteUser(): void {
//     if (confirm('Are you sure you want to delete this user?')) {
//       this.societyUsersService.delete(this.user.id).subscribe(() => {
//         this.router.navigate(['/society-users']);
//       });
//     }
//   }

//   editUser(): void {
//     this.router.navigate(['/society-users', this.user.id, 'edit']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SocietyUsersService } from '../society-users.service';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-society-user-detail',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './society-users-details.component.html'
})
export class SocietyUserDetailComponent implements OnInit {
  user: User | null = null;
  isAdmin = false;
  isLoading = false;
  currentUsername = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private societyUsersService: SocietyUsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getCurrentUsername();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(+id);
    }
  }

  getCurrentUsername(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUsername = user?.username || '';
    });
  }

  loadUser(id: number): void {
    this.isLoading = true;
    this.societyUsersService.getById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.user = res.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.isLoading = false;
      }
    });
  }

  deleteUser(): void {
    if (!this.user) return;
    if (confirm(`Are you sure you want to delete user "${this.user.username}"? This action cannot be undone.`)) {
      this.societyUsersService.delete(this.user.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate(['/society-users']);
          } else {
            alert('Failed to delete user: ' + res.message);
          }
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again.');
        }
      });
    }
  }

  editUser(): void {
    if (!this.user) return;
    this.router.navigate(['/society-users', this.user.id, 'edit']);
  }

  goBack(): void {
    this.router.navigate(['/society-users']);
  }
}
