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
  usuarioid: '',
  procedimentos: [],
  subTotalPontos: null,
  subTotalValor: null
};
cirurgias: CirurgiaDTO[];

  constructor(
    public cirurgiaService: CirurgiaService) {
  }

    ngOnInit() {
  }

  buscarCirurgiasPorData() {
    this.cirurgiaService.findCirurgiasByDate(this.refs.data)
      .subscribe(resposta => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.cirurgias = (resposta['content']);
      },
        error => {
      });
  }
}
