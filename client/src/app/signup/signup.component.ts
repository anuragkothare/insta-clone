import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router'

import { SnackbarComponent } from '../snackbar/snackbar.component'


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private resgisterObj = {};

  durationInSeconds = 5;

  constructor(private auth: AuthenticationService,
              private router: Router, private snackBar: MatSnackBar) { }

  userFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);


  firstNameFormControl = new FormControl('', [
    Validators.required,

  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  openSnackBar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  registerUser() {
    this.auth.registerUser(this.resgisterObj)
      .subscribe(
        res => {
          if (res._id) {
            this.openSnackBar();
            this.router.navigate(['/login']);
          } else {
            console.log('Sign Up failed');
          }
        }
      );
  }

  ngOnInit() {
  }

}
