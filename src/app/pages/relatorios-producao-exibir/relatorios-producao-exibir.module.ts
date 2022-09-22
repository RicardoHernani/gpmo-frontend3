import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatoriosProducaoExibirPageRoutingModule } from './relatorios-producao-exibir-routing.module';

import { RelatoriosProducaoExibirPage } from './relatorios-producao-exibir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatoriosProducaoExibirPageRoutingModule,
  ],
  declarations: [RelatoriosProducaoExibirPage]
})
export class RelatoriosProducaoExibirPageModule {}
