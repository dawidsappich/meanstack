import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  email: string;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.email = profile.user.email;
    })
  }

}
