import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ReferenciaService } from 'src/app/services/domain/referencia.service';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.page.html',
  styleUrls: ['./referencias.page.scss'],
})
export class ReferenciasPage  {

  constructor(public referenciaService: ReferenciaService,
     public menu: MenuController) { }

  mostrarPorCodigo(){
    this.referenciaService.findByCodigo('10101012')
      .subscribe(resposta => {
      console.log(resposta);
      },
      error => {console.log(error);
      });
  }

  mostrarPorDescricao(){
    this.referenciaService.findByDescricao('consulta')
      .subscribe(resposta => {
      console.log(resposta);
      },
      error => {console.log(error);
      });
  }


}
