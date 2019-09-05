import {NgModule} from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import { SignupComponent } from '../signup/signup.component';

import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
  { path: 'signup', component: SignupComponent },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
