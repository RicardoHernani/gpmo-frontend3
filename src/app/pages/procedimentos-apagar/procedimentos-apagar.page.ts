import { ProcedimentoService } from './../../services/domain/procedimento.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { CirurgiaDTO } from 'src/app/models/cirurgia.dto';
import { CirurgiaService } from 'src/app/services/domain/cirurgia.service';
import { ProcedimentoDTO } from 'src/app/models/procedimento.dto';

@Component({
  selector: 'app-procedimentos-apagar',
  templateUrl: './procedimentos-apagar.page.html',
  styleUrls: ['./procedimentos-apagar.page.scss'],
})
export class ProcedimentosApagarPage implements OnInit {

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
procedimentos: ProcedimentoDTO[];

  constructor(
    public cirurgiaService: CirurgiaService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public procedimentoService: ProcedimentoService,
    public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
  }

  async buscarCirurgiasPorData() {
    await this.showLoading();
    this.cirurgiaService.findCirurgiasByDate(this.refs.data)
      .subscribe(async resposta => {
        await this.loadingCtrl.dismiss();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.cirurgias = (resposta['content']);
        if (this.cirurgias.length === 0) {
          this.notFindCirurgias();
        }
      },
       async error => {
        await this.loadingCtrl.dismiss();
      });
  }

  selecionarCard(i: number, j: number) {
    if (this.cirurgias[i].procedimentos.length !== 1) {
      this.confirmAlert(i,j);
    } else {
        this.noProcedimentosAlert(i);
      }
  }

  async confirmAlert(i: number, j: number) {
    const alert = await this.alertCtrl.create({
      header: 'Apagar!!!',
      message: 'Esta operação apagará o procedimento selecionado.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.procedimentoService.deleteProcedimento(this.cirurgias[i].procedimentos[j].id)
              .subscribe(resposta => {
                this.cirurgias[i].procedimentos = this.cirurgias[i].procedimentos.filter(
                  item => this.cirurgias[i].procedimentos[j].id !== item.id
                );
              },
                error => {

              });
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
          }
        }
      ]
    });
      alert.present();
  }

  async noProcedimentosAlert(i: number) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção!!!',
      message: 'Todos os procedimentos para esta cirurgia serão apagados, portanto a cirurgia também será',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.cirurgiaService.deleteCirurgia(this.cirurgias[i].id)
              .subscribe(resposta => {
                this.cirurgias = this.cirurgias.filter(
                  item => this.cirurgias[i].id !== item.id
                );
              },
                error => {

              });
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
          }
        }
      ]
    });
      alert.present();
  }

  async notFindCirurgias() {
    const alert = await this.alertCtrl.create({
      header: 'Não encontrado!',
      message: ' Nenhuma cirurgia foi encontrada para esta data. Favor repetir a busca',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
      alert.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
    });

    loading.present();
    return loading;
  }

}
