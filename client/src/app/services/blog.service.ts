import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class BlogService {

  options;
  domain: string = this.authService.domain;

  constructor(private authService: AuthService, private http: Http) { }

  createAuthHeaders() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorisation': this.authService.authToken
      })
    })
  }

  newBlog(blog) {
    this.createAuthHeaders();
    return this.http.post(`${this.domain}/blog/newBlog`, blog, this.options).map(blog => blog.json());
  }

}
