import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


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

  constructor(private _fb: FormBuilder) {
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
