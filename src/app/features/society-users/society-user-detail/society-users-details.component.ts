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

@Component({
  selector: 'app-society-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './society-users-details.component.html'
})
export class SocietyUserDetailComponent implements OnInit {
  user!: User;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private societyUsersService: SocietyUsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.societyUsersService.getById(+id).subscribe(res => {
        if (res.success) {
          this.user = res.data;
        }
      });
    }
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.societyUsersService.delete(this.user.id).subscribe(() => {
        this.router.navigate(['/society-users']);
      });
    }
  }

  editUser(): void {
    this.router.navigate(['/society-users', this.user.id, 'edit']);
  }
}
