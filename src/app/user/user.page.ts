import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UtilService } from '../core/utils/util.service';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBulider: FormBuilder,
    private router: Router,
    private apiservice: ApiService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBulider.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  routeSignUp() {
    this.router.navigate(['/signup']);
    this.loginForm.reset();
  }
  get formData() {
    return this.loginForm.controls;
  }
  login() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      console.log(data);
      this.apiservice.login(data).subscribe({
        next: (res: any) => {
          console.log(res.userid);
          const userId = res.userid;
          const name = res.name;
          console.log(userId, name);
          localStorage.setItem('userId', userId);
          localStorage.setItem('name', name);
          console.log(data);
          console.log(res, '------------------> res');
          console.log(res.success, '------------------> res.success');
          this.utilService.successToast(res?.message);
          console.log('navigated');

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('error', err);
          this.utilService.errorToast(err.error.message);
          console.log(err, '------------ > err');
          console.log(err.error.message, '------------> err.error.message');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.utilService.errorToast('Input filed is empty');
    }
  }
}
