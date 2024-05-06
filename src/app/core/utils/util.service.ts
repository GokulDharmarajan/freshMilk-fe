import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private messageService: MessageService) {}

  successToast(msg: string) {
    this.messageService.clear('c');
    this.messageService.add({
      key: 'c',
      closable: true,
      severity: 'success',
      detail: msg,
      life: 3000,
    });
  }

  errorToast(msg: string) {
    this.messageService.clear('c');
    this.messageService.add({
      key: 'c',
      closable: true,
      severity: 'error',
      detail: msg,
      life: 2000,
    });
  }
}
