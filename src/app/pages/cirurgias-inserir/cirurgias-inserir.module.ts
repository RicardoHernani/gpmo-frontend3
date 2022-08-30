import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CirurgiasInserirPageRoutingModule } from './cirurgias-inserir-routing.module';

import { CirurgiasInserirPage } from './cirurgias-inserir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CirurgiasInserirPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CirurgiasInserirPage]
})
export class CirurgiasInserirPageModule {}
