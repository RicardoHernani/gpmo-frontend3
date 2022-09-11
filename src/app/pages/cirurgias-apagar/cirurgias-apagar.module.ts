import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CirurgiasApagarPageRoutingModule } from './cirurgias-apagar-routing.module';

import { CirurgiasApagarPage } from './cirurgias-apagar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CirurgiasApagarPageRoutingModule
  ],
  declarations: [CirurgiasApagarPage]
})
export class CirurgiasApagarPageModule {}
