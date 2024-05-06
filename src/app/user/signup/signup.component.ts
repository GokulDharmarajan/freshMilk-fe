import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/core/utils/util.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(
    private formBulider: FormBuilder,
    private router: Router,
    private apiservice: ApiService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBulider.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get formData() {
    return this.signUpForm.controls;
  }
  routeLogin() {
    this.signUpForm.reset();
    this.router.navigate(['/']);
    console.log('p');
  }

  createAccount() {
    if (this.signUpForm.valid) {
      const data = this.signUpForm.value;
      this.apiservice.signup(data).subscribe({
        next: (res: any) => {
          console.log(res.userid);
          const userId = res.userid;
          this.router.navigate(['/']);
          console.log(data);
          console.log(res, '------------------> res');
          console.log(res.success, '------------------> res.success');
          this.utilService.successToast(res?.message);
        },
        error: (err) => {
          console.log('error', err);
          this.utilService.errorToast(err.error.message);
          console.log(err, '------------ > err');
          console.log(err.error.message, '------------> err.error.message');
        },
      });
    } else {
      this.signUpForm.markAllAsTouched();
      this.utilService.errorToast('Input filed is empty');
    }
  }
}
