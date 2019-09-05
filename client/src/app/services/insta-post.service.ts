import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InstaPostService {

  authToken = localStorage.getItem('token');

  private instaPostUrl  = 'http://localhost:3001/api/v1/users/post';
  private allPostUrl  = 'http://localhost:3001/api/v1/users/posts';
  private likePostUrl  = 'http://localhost:3001/api/v1/users/like';

  constructor(private http: HttpClient) { }

  createPost(postObj) {
    return this.http.post<any>(this.instaPostUrl, postObj, {
      headers: {
        authToken: this.authToken
      }
    });
  }


  getAllPost() {
    console.log(this.http.get<any>(this.allPostUrl));
    return this.http.get<any>(this.allPostUrl);
  }

  likePost(postId) {
    console.log('Front Run');
    return this.http.put<any>(this.likePostUrl + '/' + postId, {} );
  }

}
