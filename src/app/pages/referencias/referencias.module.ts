import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferenciasPageRoutingModule } from './referencias-routing.module';

import { ReferenciasPage } from './referencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferenciasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReferenciasPage]
})
export class ReferenciasPageModule {}
