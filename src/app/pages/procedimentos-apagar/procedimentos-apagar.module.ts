import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcedimentosApagarPageRoutingModule } from './procedimentos-apagar-routing.module';

import { ProcedimentosApagarPage } from './procedimentos-apagar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcedimentosApagarPageRoutingModule
  ],
  declarations: [ProcedimentosApagarPage]
})
export class ProcedimentosApagarPageModule {}
