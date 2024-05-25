import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { UtilService } from 'src/app/core/utils/util.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-milk-add',
  templateUrl: './milk-add.component.html',
  styleUrls: ['./milk-add.component.scss'],
})
export class MilkAddComponent implements OnInit {
  milkAddForm!: FormGroup;
  totalAmount: any;
  id: any;
  providerName: any;
  userLogo: any;
  userId: any;
  totalLiter: any;
  constructor(
    private router: Router,
    private formBulider: FormBuilder,
    private route: ActivatedRoute,
    private apiservice: ApiService,
    private utilService: UtilService
  ) {
    this.milkAddForm = this.formBulider.group({
      liter: ['', Validators.required],
      mililiter: ['', Validators.required],
      fat: ['', Validators.required],
    });
  }

  async ngOnInit() {
    // this.route.queryParams.subscribe(async (params) => {
    //   this.id = params['id'];
    // });
    // this.getAllProviderById();
    // this.milkAddForm = this.formBulider.group({
    //   liter: ['', Validators.required],
    //   mililiter: ['', Validators.required],
    //   fat: ['', Validators.required],
    //   price: 0,
    // });
    // if (this.providerName) {
    //   const nameCharacters = this.providerName.split('');
    //   const firstLetter = nameCharacters[0];
    //   this.userLogo = firstLetter;
    //   console.log(this.userLogo, '-----------------------> firstLetter');
    // } else {
    //   console.log('Name not found in localStorage');
    // }
    // console.log(this.providerName, '++++++++++++++++++++++++++++');
  }
  ionViewWillEnter() {
    this.route.queryParams.subscribe(async (params) => {
      this.id = params['id'];
    });
    this.getAllProviderById();

    if (this.providerName) {
      const nameCharacters = this.providerName.split('');
      const firstLetter = nameCharacters[0];
      this.userLogo = firstLetter;
      console.log(this.userLogo, '-----------------------> firstLetter');
    } else {
      console.log('Name not found in localStorage');
    }
    console.log(this.providerName, '++++++++++++++++++++++++++++');
  }

  get formData() {
    return this.milkAddForm.controls;
  }
  routeHome() {
    this.router.navigate(['/home'], { queryParams: { id: this.id } });
    this.milkAddForm.reset();
  }
  getAllProviderById() {
    this.apiservice.getAllProviderById(this.id).subscribe((res: any) => {
      console.log(res.data, '=========================_');
      let data = res.data;
      data.map((e: any) => {
        console.log(e.providerName, e.providerId, 'e');
        this.providerName = e.providerName;
        this.userId = e.providerId;
        if (this.providerName) {
          const nameCharacters = this.providerName.split('');
          const firstLetter = nameCharacters[0];
          this.userLogo = firstLetter;
        } else {
          this.userLogo = '-';
        }
      });
    });
  }
  calculate() {
    if (this.milkAddForm.valid) {
      const liters = this.milkAddForm.value.liter;
      const milliliters = this.milkAddForm.value.mililiter;
      const fat = this.milkAddForm.value.fat;
      let price;
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
      const result = liters + milliliters / 1000;
      this.totalLiter = Math.round(result * 100) / 100;

      let data = {
        providerId: this.id,
        liter: liters,
        fat: fat,
        mililiter: milliliters,
        totalAmount: Math.round(this.totalAmount * 100) / 100,
        uploadDate: formattedDateTime,
      };
      console.log(data, '---------------------------------data');

      let smsData = {
        providerId: this.userId,
        Name: this.providerName,
        liter: this.totalLiter,
        fat: fat,
        totalAmount: Math.round(this.totalAmount * 100) / 100,
        uploadDate: currentDate.format('DD-MM-YYYY HH:mmA'),
      };
      console.log(smsData, '----------------------------->smsData');
      this.apiservice.addMilkData(data).subscribe({
        next: (res: any) => {
          this.apiservice.sendSms('+919952457246', smsData).subscribe({
            next: (res: any) => {
              console.log(res, 'sms send successfully');
            },
            error: (err) => {
              console.log(err, 'sms not send');
            },
          });
          this.router.navigate(['/home']);
          console.log(data);
          console.log(res, '------------------> res');
          console.log(res.success, '------------------> res.success');
          this.utilService.successToast(res?.message);
          this.milkAddForm.reset();
        },
        error: (err) => {
          console.log('error', err);
          this.utilService.errorToast(err.error.message);
          console.log(err, '------------ > err');
          console.log(err.error.message, '------------> err.error.message');
        },
      });
      console.log(smsData);
    } else {
      this.milkAddForm.markAllAsTouched();
      this.utilService.errorToast('Input filed is empty');
    }
  }
}
