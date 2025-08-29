// import { Component, OnInit } from '@angular/core';
// import { SocietyUsersService } from '../society-users.service';
// import { User } from '../../../shared/models/user.model';
// import { AuthService } from '../../../core/services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-society-users-list',
//   templateUrl: './society-users-list.component.html'
// })
// export class SocietyUsersListComponent implements OnInit {
//   users: User[] = [];
//   filteredUsers: User[] = [];
//   searchTerm: string = '';
//   isAdmin: boolean = false;

//   constructor(
//     private societyUsersService: SocietyUsersService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.isAdmin = this.authService.isAdmin();
//     this.loadUsers();
//   }

//   loadUsers(): void {
//     this.societyUsersService.getAll().subscribe(res => {
//       if (res.success) {
//         this.users = res.data;
//         this.filteredUsers = res.data;
//       }
//     });
//   }

//   searchUsers(): void {
//     this.filteredUsers = this.users.filter(u =>
//       u.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       u.email.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }

//   openUser(user: User): void {
//     this.router.navigate(['/society-users', user.id]);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SocietyUsersService } from '../society-users.service';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-society-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './society-users-list.component.html'
})
export class SocietyUsersListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  roleFilter: string = '';
  isAdmin = false;
  isLoading = false;
  currentUsername = '';

  constructor(
    private societyUsersService: SocietyUsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getCurrentUsername();
    this.loadUsers();
  }

  getCurrentUsername(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUsername = user?.username || '';
    });
  }

  loadUsers(): void {
    this.isLoading = true;
    this.societyUsersService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.users = res.data;
          this.applyFilters();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }

  searchUsers(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.users;

    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(u =>
        u.username.toLowerCase().includes(searchLower) ||
        u.email.toLowerCase().includes(searchLower) ||
        (u.details?.Name && u.details.Name.toLowerCase().includes(searchLower))
      );
    }

    // Apply role filter
    if (this.roleFilter) {
      filtered = filtered.filter(u => u.roles === this.roleFilter);
    }

    this.filteredUsers = filtered;
  }

  viewUser(user: User): void {
    this.router.navigate(['/society-users', user.id]);
  }

  editUser(user: User): void {
    this.router.navigate(['/society-users', user.id, 'edit']);
  }

  createUser(): void {
    this.router.navigate(['/society-users', 'create']);
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user "${user.username}"? This action cannot be undone.`)) {
      this.societyUsersService.delete(user.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.loadUsers(); // Reload the users list
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
}
