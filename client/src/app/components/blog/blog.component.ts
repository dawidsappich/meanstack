import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  newPost: boolean = false;
  loadingBlog: boolean = false;
  form: FormGroup;
  processing: boolean = false;
  username: string;

  message;
  messageClass;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.createNewForm();
   }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    })
  }

  createNewForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.alphaNumericValidator
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ])]
    })
  }

  enableNewBlogForm() {
    this.form.get('title').enable();
    this.form.get('body').enable();
  }


  disableNewBlogForm() {
    this.form.get('title').disable();
    this.form.get('body').disable();
  }

  alphaNumericValidator(contorls) {
    const regex = new RegExp(/^[a-zA-Z0-9 ]+$/);
    if (regex.test(contorls.value)) {
      return null;
    } else {
      return { 'isNotAlphanumeric': true }
    }
  }

  newBlogForm() {
    this.newPost = true;
  }

  reloadBlogs() {
    this.loadingBlog = true;
    // TODO: Get all blogs
    setTimeout(() => {
      this.loadingBlog = false;
    }, 4000)
  }

  draftComment() {

  }

  onBlogSubmit() {
    this.processing = true;
    this.disableNewBlogForm();

    const blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username
    }

    console.log(blog);
  }

  goBack() {
    window.location.reload();
  }

}
