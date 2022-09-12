import { ProcedimentoDTO } from './../../models/procedimento.dto';
import { CirurgiaDTO } from './../../models/cirurgia.dto';
import { CirurgiaService } from 'src/app/services/domain/cirurgia.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cirurgias-apagar',
  templateUrl: './cirurgias-apagar.page.html',
  styleUrls: ['./cirurgias-apagar.page.scss'],
})
export class CirurgiasApagarPage implements OnInit {

refs: CirurgiaDTO = {
  id: '',
  matricula: '',
  data: '',
  usuarioId: '',
  procedimentos: [],
  subTotalPontos: '',
  subTotalValor: ''
};
items: CirurgiaDTO[];

  constructor(
    public cirurgiaService: CirurgiaService) {
  }

  ngOnInit() {
  }

  buscarCirurgiasPorData() {
    this.cirurgiaService.findCirurgiasByDate(this.refs.data)
      .subscribe(resposta => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.items = (resposta['content']);
      },
        error => {
      });
    console.log(this.items);
  }

}
