// // /src/app/features/society/society.module.ts --- IGNORE ---
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from '../../core/guards/auth.guard';
// import { SocietyConfigComponent } from './society-config/society-config.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'config', pathMatch: 'full' },
//   { 
//     path: 'config', 
//     component: SocietyConfigComponent,
//     canActivate: [AuthGuard]
//   }
// ];

// @NgModule({
//   declarations: [
//     SocietyConfigComponent
//   ],
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     RouterModule.forChild(routes)
//   ]
// })
// export class SocietyModule { }


// src/app/features/society/society.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SocietyConfigComponent } from './society-config/society-config.component';

const routes: Routes = [
  { path: '', redirectTo: 'config', pathMatch: 'full' },
  { 
    path: 'config', 
    component: SocietyConfigComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  // 🚫 remove it from declarations
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SocietyConfigComponent   // ✅ import standalone here
  ]
})
export class SocietyModule { }
