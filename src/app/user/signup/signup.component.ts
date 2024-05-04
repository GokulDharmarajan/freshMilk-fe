import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(private formBulider: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.signUpForm = this.formBulider.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  createAccount() {
    let data = this.signUpForm.value;
    console.log(data);
  }
  get formData() {
    return this.signUpForm.controls;
  }
  routeLogin() {
    this.router.navigate(['/']);
  }
}
