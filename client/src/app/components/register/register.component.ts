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
      username: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      confirm: ['', Validators.required ]
    })
  }

  onSubmitForm() {
    console.log(this.form.controls);
  }

}
