import { DatePipeConfig } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router, private apiservice: ApiService) {}
  userLogo: any;
  userName!: string | null;
  dateSetter: string | undefined;
  userId!: any;
  providerLogo: any;
  providerName!: string | null;
  provideList: any;
  noData: boolean = false;
  dataList: boolean = true;
  noUser: boolean = false;

  ngOnInit() {
    // console.log('ngOnInit======================', this.userId);
    // // this.getAllProvider();
    // if (this.userId) this.getAllProvider();
    // console.log(this.userName, '------------------->this.userName');
    // console.log(this.userId, '-----------------------> userId');
    // if (this.userName) {
    //   const nameCharacters = this.userName.split('');
    //   const firstLetter = nameCharacters[0];
    //   this.userLogo = firstLetter;
    //   console.log(firstLetter, '-----------------------> firstLetter');
    // } else {
    //   console.log('Name not found in localStorage');
    // }
    // this.timeSetter();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ===========================', this.userId);
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('name');
    // this.getAllProvider();
    if (this.userId) this.getAllProvider();
    if (this.userName) {
      const nameCharacters = this.userName.split('');
      const firstLetter = nameCharacters[0];
      this.userLogo = firstLetter;
      console.log(firstLetter, '-----------------------> firstLetter');
    } else {
      console.log('Name not found in localStorage');
    }
    this.timeSetter();
  }
  routeProfile() {
    this.router.navigate(['/home/home-list']);
  }
  routeAdd(id: any) {
    console.log(id);
    this.router.navigate(['/home/milk-add'], {
      queryParams: { id: id },
    });
  }
  routeprovider() {
    this.router.navigate(['/home/new-provider']);
  }

  timeSetter() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let timeOfDay: string;
    if (currentHour >= 6 && currentHour < 12) {
      timeOfDay = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      timeOfDay = 'Good afternoon';
    } else if (currentHour >= 18 && currentHour < 22) {
      timeOfDay = 'Good evening';
    } else {
      timeOfDay = 'Good night';
    }
    console.log(timeOfDay);
    this.dateSetter = timeOfDay;
  }
  getAllProvider() {
    this.apiservice.getAllProvider(this.userId).subscribe((res: any) => {
      const providerData = res.data;
      this.provideList = providerData;
      console.log(this.provideList);
      console.log(this.provideList.length);
      if (this.provideList.length < 1) {
        this.noUser = true;
      } else {
        this.noUser = false;
      }
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    console.log(searchTerm);
    if (searchTerm && searchTerm.trim() !== '') {
      this.apiservice.searchFunction(this.userId, searchTerm).subscribe(
        (res: any) => {
          this.provideList = res.data;
          console.log(this.provideList);
          if (this.provideList.length < 1) {
            this.noData = true;
            console.log('1');
          } else {
            this.noData = false;
            console.log('2');
          }
        },
        (error: any) => {
          console.error('Error searching:', error);
        }
      );
    } else {
      this.provideList;
      this.noData = false;

      this.ionViewWillEnter();
    }
  }
}
