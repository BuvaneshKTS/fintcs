// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { SocietyUsersRoutingModule } from './society-users-routing-module';
// import { SocietyUsersListComponent } from './society-users-list/society-users-list.component';
// import { SocietyUserDetailComponent } from './society-user-detail/society-users-details.component';

// @NgModule({
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     FormsModule,
//     SocietyUsersRoutingModule,
//     SocietyUsersListComponent,
//     SocietyUserDetailComponent
//   ]
// })
// export class SocietyUsersModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SocietyUsersRoutingModule } from './society-users-routing-module';

// ✅ Standalone components are imported, not declared
import { SocietyUsersListComponent } from './society-users-list/society-users-list.component';
import { SocietyUserDetailComponent } from './society-user-detail/society-users-details.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SocietyUsersRoutingModule,
    SocietyUsersListComponent,   // ✅ imported instead of declared
    SocietyUserDetailComponent,  // ✅ imported instead of declared
    UserFormComponent            // ✅ imported instead of declared
  ]
})
export class SocietyUsersModule {}

