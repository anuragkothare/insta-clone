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
}
