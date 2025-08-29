import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { 
    path: 'auth', 
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { 
    path: 'members', 
    loadChildren: () => import('./features/members/members.module').then(m => m.MembersModule) 
  },
  { 
    path: 'society', 
    loadChildren: () => import('./features/society/society.module').then(m => m.SocietyModule) 
  },
  { path: 'society-users', loadChildren: () => import('./features/society-users/society-users-module').then(m => m.SocietyUsersModule) },
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
