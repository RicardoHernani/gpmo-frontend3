import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcedimentosBuscarInserirPageRoutingModule } from './procedimentos-buscar-inserir-routing.module';

import { ProcedimentosBuscarInserirPage } from './procedimentos-buscar-inserir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcedimentosBuscarInserirPageRoutingModule
  ],
  declarations: [ProcedimentosBuscarInserirPage]
})
export class ProcedimentosBuscarInserirPageModule {}
