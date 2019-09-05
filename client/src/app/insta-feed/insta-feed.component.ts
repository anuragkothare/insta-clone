import { Component, OnInit } from '@angular/core';
import { InstaPostService } from '../services/insta-post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-insta-feed',
  templateUrl: './insta-feed.component.html',
  styleUrls: ['./insta-feed.component.css']
})
export class InstaFeedComponent implements OnInit {

  instaPosts$: Observable<Array<any>> ;

  constructor(private instaService: InstaPostService) { }

  ngOnInit() {
    this.getAllPost();
  }

  getAllPost() {
    this.instaPosts$ = this.instaService.getAllPost();
  }

  async likeButton(post) {
    await this.instaService.likePost(post._id).subscribe(
      (data) => {
        console.log(data);
      },
      error => console.log(error)
      );
  }


}
