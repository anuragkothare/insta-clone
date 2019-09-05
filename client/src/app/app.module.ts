import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './core/material.module';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';

import { FileSelectDirective } from 'ng2-file-upload';


import { AppRoutingModule } from './core/app.routing.module';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { InstaFormComponent } from './insta-form/insta-form.component';
import { InstaFeedComponent } from './insta-feed/insta-feed.component';

import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    SignupComponent,
    SnackbarComponent,
    InstaFormComponent,
    FileSelectDirective,
    InstaFeedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  exports: [
    CustomMaterialModule,
    SnackbarComponent
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SnackbarComponent, InstaFormComponent],
})
export class AppModule { }
