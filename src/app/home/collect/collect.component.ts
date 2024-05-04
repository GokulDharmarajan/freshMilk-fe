import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss'],
})
export class CollectComponent implements OnInit {
  constructor(private router: Router, private formBulider: FormBuilder) {}

  ngOnInit() {}
  routeHome() {
    this.router.navigate(['/home/home-list']);
  }
}
