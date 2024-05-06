import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {
  userLogo: any;
  userName!: string | null;
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('name');
    this.userName = name;
    console.log(name, '------------------->this.userName');
    console.log(userId, '-----------------------> userId');
    if (name) {
      const nameCharacters = name.split('');
      const firstLetter = nameCharacters[0];
      this.userLogo = firstLetter;
      console.log(firstLetter, '-----------------------> firstLetter');
    } else {
      console.log('Name not found in localStorage');
    }
  }

  routeHome() {
    this.router.navigate(['/home']);
  }
  routeprovider() {
    this.router.navigate(['/home/new-provider']);
  }
  routeCollect() {
    this.router.navigate(['/home/milk-collect']);
  }

  closeModal() {
    this.modalController.dismiss();
    console.log('clicked');
  }
  logout() {
    localStorage?.clear();
    this.modalController.dismiss();
    this.ngOnInit();
    this.router.navigate(['/']);
  }
}
