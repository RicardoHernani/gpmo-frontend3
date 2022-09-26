import { CirurgiaDTO } from 'src/app/models/cirurgia.dto';
import { CirurgiaService } from 'src/app/services/domain/cirurgia.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

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
  pontosNecessarios: number;

  constructor(
    public route: ActivatedRoute,
    public cirurgiaService: CirurgiaService,
    public screenOrientation: ScreenOrientation) {
  }

  ngOnInit() {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.cirurgiaService.findCirurgiasByDateInterval(this.dataInicial, this.dataFinal)
      .subscribe(resposta => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.cirurgias = (resposta['content']);
      },
        error => {
        });
  }

  ionViewDidEnter() {
    this.pontosNecessarios = (this.diasValidos * 16) - this.pontosExtras;
    this.calcularTotais();
  }

  ionViewDidLeave() {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  calcularTotais() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i<this.cirurgias.length; i++) {
      this.totalPontos = this.cirurgias[i].subTotalPontos + this.totalPontos;
      this.totalValor = this.cirurgias[i].subTotalValor + this.totalValor;
    }
  }

  selecionarProcedimento(i: number, j: number) {
    const pegarCirurgiaid =this.cirurgias[i];
    const pegarProcedimentoid = this.cirurgias[i].procedimentos[j].id;
  }

}




