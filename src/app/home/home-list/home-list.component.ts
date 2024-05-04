import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  routeHome() {
    this.router.navigate(['/home']);
  }
  routeprovider() {
    this.router.navigate(['/home/new-provider']);
  }
  routeCollect() {
    this.router.navigate(['/home/milk-collect']);
  }
}
