import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HomeListComponent } from './home-list/home-list.component';
import { CollectComponent } from './collect/collect.component';
import { ProviderComponent } from './provider/provider.component';
import { SharedModule } from '../shared/shared.module';
import { MilkAddComponent } from './milk-add/milk-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
    HomeListComponent,
    CollectComponent,
    ProviderComponent,
    MilkAddComponent,
  ],
})
export class HomePageModule {}
