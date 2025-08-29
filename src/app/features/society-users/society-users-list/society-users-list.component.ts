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
  isAdmin = false;

  constructor(
    private societyUsersService: SocietyUsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadUsers();
  }

  loadUsers(): void {
    this.societyUsersService.getAll().subscribe(res => {
      if (res.success) {
        this.users = res.data;
        this.filteredUsers = res.data;
      }
    });
  }

  searchUsers(): void {
    this.filteredUsers = this.users.filter(u =>
      u.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openUser(user: User): void {
    this.router.navigate(['/society-users', user.id]);
  }

  createUser(): void {
    // Navigate to a dedicated "create user" form (can be popup or route)
    this.router.navigate(['/society-users', 'create']);
  }
}
