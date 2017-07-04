import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [Modal]
})
export class NavbarComponent implements OnInit {

  constructor(private _autheService: AuthService, private _router: Router, public modal: Modal) { }

  ngOnInit() {
  }

  onLogout() {
    this._autheService.logout();
     this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('Information')
        .body(`
            <h4>Logout</h4>
            <p>You have been locked out</p>`)
        .open();
  }

}
