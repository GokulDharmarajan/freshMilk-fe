import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() data: any;
  @Input() dataName: string = '';
  @Input() minLength: number = 10;
  @Input() maxLength: number = 10;
  constructor() {}

  ngOnInit() {}
}
