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
  private signupUrl = 'http://localhost:3001/api/v1/users/signup';
  private allPostUrl = 'http://localhost:3001/api/v1/users/posts';

  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    console.log('I m auth service');
    const res =  this.http.post<any>(this.loginUrl, user);
    console.log(res);
    return res;
  }

  registerUser(user) {
    console.log(this.http.post<any>(this.signupUrl, user));
    return this.http.post<any>(this.signupUrl, user);
  }

  getAllPost() {
    console.log(this.http.get<any>(this.allPostUrl));
    return this.http.get<any>(this.allPostUrl);
  }


}
