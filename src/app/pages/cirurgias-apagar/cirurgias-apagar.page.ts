import { CirurgiaDTO } from './../../models/cirurgia.dto';
import { CirurgiaService } from 'src/app/services/domain/cirurgia.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

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
    public cirurgiaService: CirurgiaService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,) {
  }

    ngOnInit() {
  }

  buscarCirurgiasPorData() {
    this.cirurgiaService.findCirurgiasByDate(this.refs.data)
      .subscribe(resposta => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.cirurgias = (resposta['content']);
        if (this.cirurgias.length === 0) {
          this.notFindCirurgias();
        }

      },
        error => {
      });
  }

  selecionarCard(i: number) {
    this.confirmAlert(i);
  }

  async confirmAlert(i: number) {
    const alert = await this.alertCtrl.create({
      header: 'Apagar!!!',
      message: 'Esta operação apagará a cirurgia selecionada e todos os seus procedimentos.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.cirurgiaService.deleteCirurgia(this.cirurgias[i].id)
              .subscribe(resposta => {
                this.cirurgias = this.cirurgias.filter(           //Filtro para mostrar apenas os que não
                  item => this.cirurgias[i].id !== item.id        // foram apagados conforme aula 56 do Denner
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
      header: 'Não encontrado',
      message: 'Não foi encontrada nenhuma cirurgia para esta data. Favor repetir a busca',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
      alert.present();
  }

}
