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

  analizaObjeto(objeto: string) {
    if (parseInt(objeto, 10)) {
      this.refs.codigo = objeto;
      this.varControle = true;
      this.mostraPorCodigo();
    } else {
        this.refs.descricao = objeto;
        this.varControle = false;
        this.mostraPorDescricao();
      }
  }

  mostraPorCodigo(){
    this.referenciaService.findByCodigo(this.refs.codigo)
      .subscribe(resposta => {
        this.guardaResposta = resposta;
      },
        error => {

      });
  }

  mostraPorDescricao(){
    this.referenciaService.findByDescricao(this.refs.descricao)
      .subscribe(resposta => {
       // eslint-disable-next-line @typescript-eslint/dot-notation
        this.items = (resposta['content']);
      },
        error => {

      });
  }

}
