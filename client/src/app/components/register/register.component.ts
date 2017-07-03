import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  debug: boolean = false;

  message: string;
  messageClass: string;
  processing: boolean = false;

  isEmailValid: boolean = false;
  isEmailValidMessage: string;

  isUsernameValid: boolean = false;
  isUsernameValidMessage: string;

  constructor(private _fb: FormBuilder, private _auth: AuthService, private _router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.form = this._fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.validateUserName
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.validateEmail
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirm') })
  }

  onSubmitForm() {
    this.processing = true;
    this.disableForm();
    const user = {
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }

    this._auth.registerUser(user).subscribe(data => {
      this.message = data.message;
      if (!data.success) {
        this.enableForm()
        this.messageClass = 'alert alert-danger';
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        // if successful then redirect to login view
        setTimeout(() => {
          this._router.navigate(['/login']);
        }, 2000)
      }

    })
  }

  validateEmail(controls) {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return (regex.test(controls.value)) ? null : { notValidEmail: true };
  }

  validateUserName(controls) {
    const regex = new RegExp(/^[a-zA-Z0-9]+$/);
    return (regex.test(controls.value)) ? null : { notValidUserName: true };
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      return (group.controls[password].value === group.controls[confirm].value) ? null : { notMatchingPasswords: true };
    }
  }

  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  checkEmail() {
    this._auth.checkEmail(this.form.get('email').value).subscribe(data => {
      this.isEmailValidMessage = data.message;
      this.isEmailValid = !data.success ? false : true;
    })
  }


  checkUsername() {
    this._auth.checkUsername(this.form.get('username').value).subscribe(data => {
      this.isUsernameValidMessage = data.message;
      this.isUsernameValid = !data.success ? false : true;
    })
  }


}
