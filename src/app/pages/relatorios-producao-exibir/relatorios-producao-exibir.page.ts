import { CollectorService } from './../../services/domain/collector.service';
import { ProcedimentoDTO } from 'src/app/models/procedimento.dto';
import { CirurgiaDTO } from 'src/app/models/cirurgia.dto';
import { CirurgiaService } from 'src/app/services/domain/cirurgia.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { LoadingController } from '@ionic/angular';

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
  totalPontos: number;
  totalValor: number;
  pontosNecessarios: number;

  constructor(
    public route: ActivatedRoute,
    public cirurgiaService: CirurgiaService,
    public screenOrientation: ScreenOrientation,
    public collectorService: CollectorService,
    public loadingCtrl: LoadingController ) {
  }

  async ngOnInit() {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    await this.showLoading();
    this.cirurgiaService.findCirurgiasByDateInterval(this.dataInicial, this.dataFinal)
      .subscribe(async resposta => {
        await this.loadingCtrl.dismiss();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.cirurgias = (resposta['content']);
        this.pontosNecessarios = (this.diasValidos * 16) - this.pontosExtras;
        this.calcularTotais();
      },
        async error => {
          await this.loadingCtrl.dismiss();
        });
  }

  ionViewDidLeave() {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  calcularTotais() {
    this.totalValor = 0;
    this.totalPontos = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
     for (let i = 0; i<this.cirurgias.length; i++) {
      this.totalPontos = this.cirurgias[i].subTotalPontos + this.totalPontos;
      this.totalValor = this.cirurgias[i].subTotalValor + this.totalValor;
    }
  }

  addToCollector(procedimento: ProcedimentoDTO, cirurgia: CirurgiaDTO) {
    this.collectorService.addProcedimento(procedimento, cirurgia);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
    });

    loading.present();
    return loading;
  }

}




