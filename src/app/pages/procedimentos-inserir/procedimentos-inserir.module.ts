import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcedimentosInserirPageRoutingModule } from './procedimentos-inserir-routing.module';

import { ProcedimentosInserirPage } from './procedimentos-inserir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcedimentosInserirPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProcedimentosInserirPage]
})
export class ProcedimentosInserirPageModule {}
