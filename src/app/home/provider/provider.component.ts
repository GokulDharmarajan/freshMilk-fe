import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/core/utils/util.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements OnInit {
  providerForm!: FormGroup;
  providerId!: string | null;
  constructor(
    private router: Router,
    private formBulider: FormBuilder,
    private apiservice: ApiService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.providerForm = this.formBulider.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)],
      ],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });
    this.getProviderAutoId();
  }

  routeHome() {
    this.router.navigate(['/home/home-list']);
    this.providerForm.reset();
    this.ngOnInit();
  }
  routeprovider() {
    this.router.navigate(['/home/new-provider']);
  }
  routeCollect() {
    this.router.navigate(['/home/milk-collect']);
  }
  get formData() {
    return this.providerForm.controls;
  }
  getProviderAutoId() {
    const userId = localStorage.getItem('userId');
    this.apiservice.getProviderId(userId).subscribe((res: any) => {
      this.providerId = res.data;
    });
  }

  createProvider() {
    console.log(this.providerForm.value);
    if (this.providerForm.valid) {
      const userId = localStorage.getItem('userId');
      const name = this.providerForm.value.name;
      const mobileNumber = this.providerForm.value.mobileNumber;
      let data = {
        userId: userId,
        providerId: this.providerId,
        providerName: name,
        mobileNumber: mobileNumber,
      };
      this.apiservice.createProvider(data).subscribe({
        next: (res: any) => {
          this.router.navigate(['/home']);
          console.log(data);
          console.log(res, '------------------> res');
          console.log(res.success, '------------------> res.success');
          this.utilService.successToast(res?.message);
          this.ngOnInit();
        },
        error: (err) => {
          console.log('error', err);
          this.utilService.errorToast(err.error.message);
          console.log(err, '------------ > err');
          console.log(err.error.message, '------------> err.error.message');
        },
      });
    } else {
      this.providerForm.markAllAsTouched();
      this.utilService.errorToast('Input filed is empty');
    }
  }
}
