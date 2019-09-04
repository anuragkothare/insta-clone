import { Component, OnInit } from '@angular/core';
import { InstaPostService } from '../services/insta-post.service';

@Component({
  selector: 'app-insta-feed',
  templateUrl: './insta-feed.component.html',
  styleUrls: ['./insta-feed.component.css']
})
export class InstaFeedComponent implements OnInit {

  instaPosts = [];

  constructor(private instaService: InstaPostService) { }

  ngOnInit() {
    this.getAllPost();
  }

  getAllPost() {
    this.instaService.getAllPost()
      .subscribe((res) => {
        this.instaPosts = res;
        console.log(this.instaPosts);
      });
  }

  async likeButton(post) {
    console.log('Like Func called');
    await this.instaService.likePost(post._id);
    this.instaService.getAllPost().subscribe(
      (data) => {
        this.instaPosts = data;
      },
      error => console.log(error)
    );
  }


}
