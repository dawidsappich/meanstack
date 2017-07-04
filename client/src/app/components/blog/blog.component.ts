import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  newPost: boolean = false;
  loadingBlog: boolean = false;

  message;
  messageClass;

  constructor() { }

  ngOnInit() {
  }

  newBlogForm() {
    this.newPost = true;
  }

  reloadBlogs() {
    this.loadingBlog = true;
    // TODO: Get all blogs
    setTimeout(() => {
      this.loadingBlog = false;
    },4000 )
  }

  draftComment() {
    
  }

}
