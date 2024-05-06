import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { HomeListComponent } from './home-list/home-list.component';
import { ProviderComponent } from './provider/provider.component';
import { CollectComponent } from './collect/collect.component';
import { MilkAddComponent } from './milk-add/milk-add.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'home-list',
    component: HomeListComponent,
  },
  {
    path: 'new-provider',
    component: ProviderComponent,
  },
  {
    path: 'milk-collect',
    component: CollectComponent,
  },
  {
    path: 'milk-add',
    component: MilkAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
