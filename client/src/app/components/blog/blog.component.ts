import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { BlogService } from "../../services/blog.service";


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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private blogService: BlogService) {
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

    this.blogService.newBlog(blog).subscribe(data => {
      this.message = data.message;
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        // schlater für das formular umschwitchen und Form wieder aktiveren
        this.processing = false;
        this.enableNewBlogForm();
      } else {
        this.messageClass = 'alert alert-success';
        setTimeout(() => {
          this.newPost = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enableNewBlogForm();
        }, 2000);
      }
    })
  }

  goBack() {
    window.location.reload();
  }

}
