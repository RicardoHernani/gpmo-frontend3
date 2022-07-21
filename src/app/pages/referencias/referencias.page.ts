import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ReferenciaDTO } from 'src/app/models/referencia.dto';
import { ReferenciaService } from 'src/app/services/domain/referencia.service';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.page.html',
  styleUrls: ['./referencias.page.scss'],
})
export class ReferenciasPage  {

  objeto: string;
  refs: ReferenciaDTO = {
    codigo: '',
    descricao: '',
    pontos: '',
    valor: ''
  };
  guardaResposta: ReferenciaDTO;
  items: ReferenciaDTO[];
  varControle = false;

  constructor(public referenciaService: ReferenciaService,
              public menu: MenuController) {
  }


/*
  onSubmit(buttonType: any): void {
    if(buttonType==="inserirMaisProcedimento") {
        this.inserirMaisProcedimento();
    }
    if(buttonType==="inserirFinalizarProcedimento"){
        this.inserirFinalizarProcedimento();
    }

  }*/

  analizaObjeto(objeto: string) {
    console.log(this.refs.codigo);
    if (parseInt(objeto, 10)) {
      console.log('É número');
      this.refs.codigo = objeto;
      this.varControle = true;
      this.mostraPorCodigo();
    } else {
        console.log('Não é número');
        this.refs.descricao = objeto;
        this.varControle = false;
        this.mostraPorDescricao();
      }
  }

  mostraPorCodigo(){
    this.referenciaService.findByCodigo(this.refs.codigo)
      .subscribe(resposta => {
        this.guardaResposta = resposta;
        console.log(resposta);
      },
        error => {
          console.log(error);
      });
  }

  mostraPorDescricao(){
    this.referenciaService.findByDescricao(this.refs.descricao)
      .subscribe(resposta => {
       // eslint-disable-next-line @typescript-eslint/dot-notation
        this.items = (resposta['content']);
        console.log(this.items);
      },
        error => {
          console.log(error);
      });
  }

}
