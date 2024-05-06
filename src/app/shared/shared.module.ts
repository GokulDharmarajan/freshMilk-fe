import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ToastModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    CalendarModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class SharedModule {}
