import { CirurgiaDTO } from 'src/app/models/cirurgia.dto';
import { CirurgiaService } from 'src/app/services/domain/cirurgia.service';
/* eslint-disable radix */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-relatorios-producao-exibir',
  templateUrl: './relatorios-producao-exibir.page.html',
  styleUrls: ['./relatorios-producao-exibir.page.scss'],
})
export class RelatoriosProducaoExibirPage implements OnInit {

  dataInicial: string = this.route.snapshot.queryParamMap.get('dataInicial');
  dataFinal: string = this.route.snapshot.queryParamMap.get('dataFinal');
  diasValidos: number = parseInt((this.route.snapshot.queryParamMap.get('diasValidos')));
  pontosExtras: number = parseInt((this.route.snapshot.queryParamMap.get('pontosExtras')));

  cirurgias: CirurgiaDTO[];

  constructor(
    public route: ActivatedRoute,
    public cirurgiaService: CirurgiaService) {
     }

  ngOnInit() {

  }

  mostrarPorIntervaloData(){
    this.cirurgiaService.findCirurgiasByDateInterval(this.dataInicial, this.dataFinal)
      .subscribe(resposta => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.cirurgias = (resposta['content']);
      },
        error => {
        });
  }


}
