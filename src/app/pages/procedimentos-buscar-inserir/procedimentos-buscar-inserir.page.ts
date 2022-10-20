import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { CirurgiaDTO } from 'src/app/models/cirurgia.dto';
import { CirurgiaService } from 'src/app/services/domain/cirurgia.service';

@Component({
  selector: 'app-procedimentos-buscar-inserir',
  templateUrl: './procedimentos-buscar-inserir.page.html',
  styleUrls: ['./procedimentos-buscar-inserir.page.scss'],
})
export class ProcedimentosBuscarInserirPage implements OnInit {

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
  codCirurgia: string;

  constructor(
    public cirurgiaService: CirurgiaService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public router: Router,
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

  selecionarCard(i: number) {
    this.confirmAlert(i);
  }

  async confirmAlert(i: number) {
    this.codCirurgia= this.cirurgias[i].id;
    const alert = await this.alertCtrl.create({
      header: 'Cirurgia selecionada!!!',
      message: 'Esta operação seleciona a cirurgia à qual os procedimentos serão adicionados',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            const navigationExtras: NavigationExtras = {
              queryParams: {
                codCirurgia: this.codCirurgia
              }
            };
            this.router.navigate(['procedimentos-inserir'], navigationExtras);
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.navigateForward('procedimentos-buscar-inserir');
          }
        }
      ]
    });
      alert.present();
  }

  async notFindCirurgias() {
    const alert = await this.alertCtrl.create({
      header: 'Não encontrado!',
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

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
    });

    loading.present();
    return loading;
  }

}
