import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl  = 'http://localhost:3001/api/v1/users/login';
  private signupUrl = 'http://localhost:3000/api/v1/users/signup';

  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    console.log('I m auth service');
    const res =  this.http.post<any>(this.loginUrl, user);
    console.log(res);
    return res;
  }
}
