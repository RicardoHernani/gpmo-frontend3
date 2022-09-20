import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatoriosProducaoPageRoutingModule } from './relatorios-producao-routing.module';

import { RelatoriosProducaoPage } from './relatorios-producao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatoriosProducaoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RelatoriosProducaoPage]
})
export class RelatoriosProducaoPageModule {}
