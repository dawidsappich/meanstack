import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  debug: boolean = false;

  constructor(private _fb: FormBuilder) {
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
      confirm: ['', Validators.required ]
    }, { validator: this.matchingPasswords('password', 'confirm') })
  }

  onSubmitForm() {
    console.log(this.form.controls);
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

}
