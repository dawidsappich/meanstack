import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  messageClass: string;
  processing: boolean = false;
  form: FormGroup;

  constructor(private _fb: FormBuilder, private authServie: AuthService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }
    this.authServie.login(user).subscribe(data => {
      this.message = data.message;
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.authServie.storeUserData(data.token, data.user);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000)
      }
    })
  }

  createForm(): void {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }


}
