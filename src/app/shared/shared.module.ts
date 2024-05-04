import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CalendarModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    CalendarModule,
  ],
})
export class SharedModule {}
