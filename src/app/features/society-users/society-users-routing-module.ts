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
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: SocietyUsersListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: SocietyUserDetailComponent, canActivate: [AuthGuard] },
  { path: 'create', component: SocietyUserDetailComponent, canActivate: [AuthGuard] }, // reuse detail for create form
  { path: ':id/edit', component: SocietyUserDetailComponent, canActivate: [AuthGuard] } // reuse detail for edit
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocietyUsersRoutingModule {}
