// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { SocietyUsersListComponent } from './society-users-list/society-users-list.component';
// import { SocietyUserDetailComponent } from './society-user-detail/society-users-details.component';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';
// // import { AdminGuard } from 'src/app/core/guards/admin.guard';

// const routes: Routes = [
//   { path: '', component: SocietyUsersListComponent, canActivate: [AuthGuard] },
//   { path: ':id', component: SocietyUserDetailComponent, canActivate: [AuthGuard] }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class SocietyUsersRoutingModule {}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocietyUsersListComponent } from './society-users-list/society-users-list.component';
import { SocietyUserDetailComponent } from './society-user-detail/society-users-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AdminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: SocietyUsersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: UserFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: ':id',
    component: SocietyUserDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: UserFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocietyUsersRoutingModule {}
