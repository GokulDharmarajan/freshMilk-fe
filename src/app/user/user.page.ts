import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBulider: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBulider.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  routeSignUp() {
    this.router.navigate(['/signup']);
  }
  get formData() {
    return this.loginForm.controls;
  }
}
