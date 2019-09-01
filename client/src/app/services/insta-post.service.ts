import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InstaPostService {

  authToken = localStorage.getItem('token');

  private instaPostUrl  = 'http://localhost:3001/api/v1/users/post';

  constructor(private http: HttpClient) { }

  createPost(postObj) {
    return this.http.post<any>(this.instaPostUrl, postObj, {
      headers: {
        authToken: this.authToken
      }
    });
  }

}
