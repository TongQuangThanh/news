import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';

import { GroupPage } from './group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [GroupPage]
})
export class GroupPageModule {}
