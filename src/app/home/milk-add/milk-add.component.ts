import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-milk-add',
  templateUrl: './milk-add.component.html',
  styleUrls: ['./milk-add.component.scss'],
})
export class MilkAddComponent implements OnInit {
  milkAddForm!: FormGroup;
  totalAmount: any;

  constructor(private router: Router, private formBulider: FormBuilder) {}

  ngOnInit() {
    this.milkAddForm = this.formBulider.group({
      liter: ['', Validators.required],
      mililiter: [, Validators.required],
      fat: ['', Validators.required],
      price: 0,
    });
  }

  get formData() {
    return this.milkAddForm.controls;
  }
  routeHome() {
    this.router.navigate(['/home']);
    this.milkAddForm.reset();
  }
  calculate() {
    if (this.milkAddForm.valid) {
      const liters = this.milkAddForm.value.liter;
      const milliliters = this.milkAddForm.value.mililiter;
      const fat = this.milkAddForm.value.fat;
      let price;
      console.log(price);
      if (fat >= 20 && fat <= 25) {
        price = 25;
      } else if (fat > 25 && fat <= 30) {
        price = 32;
      } else if (fat > 30 && fat <= 35) {
        price = 37;
      } else if (fat > 35 && fat <= 40) {
        price = 44;
      } else {
        console.error('Invalid fat content');
        return;
      }
      const currentDate = moment();
      const formattedDateTime = currentDate.format('YYYY-MM-DD HH:mm:ss');
      this.totalAmount = (liters + milliliters / 1000) * price;

      const userId = 1;
      const data = {
        userId: userId,
        liters: liters,
        fat: fat,
        milliliters: milliliters,
        totalAmount: this.totalAmount,
        uploadDate: formattedDateTime,
      };
      console.log(data);
    } else {
      this.milkAddForm.markAllAsTouched();
    }
  }
}
