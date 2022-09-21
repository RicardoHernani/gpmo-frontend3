import { CirurgiaDTO } from 'src/app/models/cirurgia.dto';
import { CirurgiaService } from 'src/app/services/domain/cirurgia.service';
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
  diasValidos: number = parseInt((this.route.snapshot.queryParamMap.get('diasValidos')), 10);
  pontosExtras: number = parseInt((this.route.snapshot.queryParamMap.get('pontosExtras')), 10);

  cirurgias: CirurgiaDTO[];
  totalPontos = 0;
  totalValor = 0;

  constructor(
    public route: ActivatedRoute,
    public cirurgiaService: CirurgiaService) {
  }

  ngOnInit() {
    this.cirurgiaService.findCirurgiasByDateInterval(this.dataInicial, this.dataFinal)
      .subscribe(resposta => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.cirurgias = (resposta['content']);
        console.log(this.cirurgias);

      },
        error => {
        });
  }

  ionViewDidEnter() {
    const pontosNecessarios = (this.diasValidos * 16) - this.pontosExtras;
    this.calcularTotais();
    console.log(pontosNecessarios);
    console.log(this.totalPontos, this.totalValor);
  }


  calcularTotais() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i<this.cirurgias.length; i++) {
      this.totalPontos = this.cirurgias[i].subTotalPontos + this.totalPontos;
      this.totalValor = this.cirurgias[i].subTotalValor + this.totalValor;
    }
  }

}
