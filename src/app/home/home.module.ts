
import { IonicModule } from '@ionic/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTMLEscapeUnescapeModule } from 'html-escape-unescape';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { GroupOneComponent } from '../group/group-one/group-one.component';
import { ListOneComponent } from './../list/list-one/list-one.component';
import { DetailComponent } from './../shared/components/detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FontAwesomeModule,
    HTMLEscapeUnescapeModule
  ],
  declarations: [HomePage, DetailComponent, ListOneComponent, GroupOneComponent]
})
export class HomePageModule {}
