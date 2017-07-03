import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain: string = 'http://localhost:8080';
  user;
  authToken;

  constructor(private _http: Http) { }

  registerUser(user) {
    return this._http.post(`${this.domain}/authentication/register`, user).map(res => res.json());
  }
  checkUsername(username) {
    return this._http.get(`${this.domain}/authentication/checkUsername/${username}`).map(res => res.json());
  }
  checkEmail(email) {
    return this._http.get(`${this.domain}/authentication/checkEmail/${email}`).map(res => res.json());
  }

  storeUserData(token, user) {
    this.user = user;
    this.authToken = token;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(user) {
    return this._http.post(`${this.domain}/authentication/login`, user).map(res => res.json());
  }

}
