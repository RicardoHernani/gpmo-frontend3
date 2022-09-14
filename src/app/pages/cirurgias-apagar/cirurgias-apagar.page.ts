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

/*
refs: CirurgiaDTO = {
  id: '',
  matricula: '',
  data: '',
  usuarioid: '',
  procedimentos: [],
  codigo: '',
  subTotalPontos: null,
  subTotalValor: null
};*/
cirurgias: CirurgiaDTO[];

  constructor(
    public cirurgiaService: CirurgiaService) {
  }

    ngOnInit() {
      this.cirurgias= [
      {
        id: '10',
        matricula: '77777777',
        data: '20/02/2020',
        usuarioid: '1',
        procedimentos: [{
            tipo: 'SECUNDARIO',
            premio: 'TAREFABASICA',
            referencia: {
              codigo: '10000007',
              descricao: 'tumor anorretal',
              pontos: '16.67',
              valor: '56.07'
            }
          },
          {
            tipo: 'PRINCIPAL',
            premio: 'TAREFABASICA',
            referencia: {
              codigo: '10000003',
              descricao: 'Amputação do pé',
              pontos: '33.33',
              valor: '103.02'
            }
          }
        ],
        subTotalPontos: 50.00,
        subTotalValor: 0.00
      },
      {
        id: '1',
        matricula: '11111111',
        data: '20/02/2020',
        usuarioid: '1',
        procedimentos: [{
            tipo: 'PRINCIPAL',
            premio: 'DINHEIRO',
            referencia: {
              codigo: '10000000',
              descricao: 'Ureterorrenolitotr Flex Unilat',
              pontos: '41.67',
              valor: '297.82'
            }
          },
          {
            tipo: 'SECUNDARIO',
            premio: 'DINHEIRO',
            referencia: {
              codigo: '10000001',
              descricao: 'Histerec total',
              pontos: '41.67',
              valor: '335.02'
            }
          }
        ],
        subTotalPontos: 0.00,
        subTotalValor: 465.33
      }
    ];
    console.log(this.cirurgias);
  }

}


 /*
  buscarCirurgiasPorData() {
    this.cirurgiaService.findCirurgiasByDate(this.refs.data)
      .subscribe(resposta => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.cirurgias = (resposta['content']);
      },
        error => {
      });
    console.log(this.cirurgias);
  }
*/
