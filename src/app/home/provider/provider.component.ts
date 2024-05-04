import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements OnInit {
  providerForm!: FormGroup;
  constructor(private router: Router, private formBulider: FormBuilder) {}

  ngOnInit() {
    this.providerForm = this.formBulider.group({
      providerId: ['', Validators.required],
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
    });
  }

  routeHome() {
    this.router.navigate(['/home/home-list']);
    this.providerForm.reset();
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
}
