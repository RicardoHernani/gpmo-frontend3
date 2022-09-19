import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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
    public router: Router) {
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

}
