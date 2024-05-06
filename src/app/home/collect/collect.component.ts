import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss'],
})
export class CollectComponent implements OnInit {
  collectData: any;
  userId!: string | null;
  totalLiter: any;
  dateSelect: Date = new Date();
  nodata: boolean = false;
  constructor(
    private router: Router,
    private formBulider: FormBuilder,
    private apiservice: ApiService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    // this.getAllCollectList();
  }
  ionViewWillEnter() {
    this.userId = localStorage.getItem('userId');
    this.getAllCollectList();
  }
  routeHome() {
    this.router.navigate(['/home/home-list']);
    this.ionViewWillEnter();
  }

  // getAllCollectList() {
  //   const data = {
  //     userId: this.userId
  //   }
  //   this.apiservice.getCollectList(this.userId).subscribe((res: any) => {
  //     console.log(res.data, '-----------------------> getCollectList');
  //     this.collectData = res.data;
  //     this.collectData.map((item: { amount: any }) => {
  //       item.amount = parseInt(item.amount, 10); // 10 is the radix (base) for parsing integers
  //     });

  //     this.apiservice.getMilkLitter(this.userId).subscribe((res: any) => {
  //       const total = res.data;
  //       for (let e of total) {
  //         this.totalLiter = e.totalLiter || '0';
  //       }

  //       console.log(this.totalLiter);
  //     });
  //   });
  // }
  onDateSelect(e: any) {
    console.log(e);
    this.dateSelect = e;
    this.getAllCollectList();
  }
  getAllCollectList() {
    const data = {
      userId: this.userId,
      date: moment(this.dateSelect).format('YYYY-MM-DD'),
    };
    console.log('data', data);
    this.apiservice.getCollectList(data).subscribe((res: any) => {
      console.log(res.data, '-----------------------> getCollectList');
      this.collectData = res.data;

      if (this.collectData.length > 0) {
        this.nodata = false;
        console.log('1');
      } else {
        this.nodata = true;
        console.log('2');
      }
      for (let e of this.collectData) {
        console.log(e.totalLiter);
        // this.totalLiter = e.totalLiter;
      }

      console.log(this.totalLiter, 'this.totalLiter');
      this.collectData.map((item: { amount: any }) => {
        item.amount = parseInt(item.amount, 10); // 10 is the radix (base) for parsing integers
      });

      this.apiservice.getMilkLitter(data).subscribe((res: any) => {
        this.totalLiter = res.data;
        // console.log(total, '===========================');
      });
    });
  }
}
