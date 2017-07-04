import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _autheService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this._autheService.logout();
    setTimeout(() => {
      this._router.navigate(['/home']);
    }, 2000);
  }

}
