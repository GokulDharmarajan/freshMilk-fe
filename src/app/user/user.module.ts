import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from '../user/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    SharedModule,
  ],
  declarations: [UserPage, SignupComponent],
})
export class UserPageModule {}
