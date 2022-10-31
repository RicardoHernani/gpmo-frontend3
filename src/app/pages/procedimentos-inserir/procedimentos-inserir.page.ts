import { ProcedimentoService } from './../../services/domain/procedimento.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, NavController, MenuController } from '@ionic/angular';
import { ProcedimentoForm } from 'src/app/models/procedimento.form';
import { ReferenciaDTO } from 'src/app/models/referencia.dto';
import { ReferenciaService } from 'src/app/services/domain/referencia.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-procedimentos-inserir',
  templateUrl: './procedimentos-inserir.page.html',
  styleUrls: ['./procedimentos-inserir.page.scss'],
})
export class ProcedimentosInserirPage {
 @ViewChild(IonModal) modal: IonModal;

  guardaResposta: ReferenciaDTO;
  procedimento: ProcedimentoForm;
  buttonType: string;

  inserirProcedimentoFormGroup: FormGroup= this.formBuilder.group({
    tipo: ['', [Validators.required]],
    premio: ['', [Validators.required]],
    referenciaCodigo: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
  });

  constructor(
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public referenciaService: ReferenciaService,
    public procedimentoService: ProcedimentoService,
    public route: ActivatedRoute,
    public router: Router,
    public menu: MenuController) {
  }

  ionViewWillEnter(): void {
    this.menu.swipeGesture(false);
  }

  onSubmit(buttonType: string): void {
    this.procedimento = {
      tipo: this.inserirProcedimentoFormGroup.value.tipo,
      premio: this.inserirProcedimentoFormGroup.value.premio,
      cirurgiaId: this.route.snapshot.queryParamMap.get('codCirurgia'), //Ver vídeo: https://www.youtube.com/watch?v=1ZbhOJ5coY4
      referenciaCodigo: this.inserirProcedimentoFormGroup.value.referenciaCodigo
    };
    this.mostraReferenciaPorCodigo();

    if(buttonType === 'cancel') {
      this.cancel();
    }

    if(buttonType === 'confirmAndFinish') {
      this.confirmAndFinish();
    }

    if(buttonType === 'addMore') {
      this.addMore();
    }
  }

  mostraReferenciaPorCodigo(){
    this.referenciaService.findByCodigo(this.inserirProcedimentoFormGroup.value.referenciaCodigo)
      .subscribe(resposta => {
        this.guardaResposta = resposta;
      },
        error => {
          this.modal.dismiss();
      });
  }

  cancel() {
    this.modal.dismiss('cancel');
  }

  confirmAndFinish() {
    this.saveProcedimento();
    this.modal.dismiss('confirm');
  }

  addMore() {
    this.saveMultiplosProcedimentos();
    this.modal.dismiss('addMore');
  }

  saveProcedimento() {
    this.procedimentoService.insertProcedimento(this.procedimento)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => {
          this.showInsertNotOk();
        });
  }

  async showInsertOk() {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Procedimento cadastrado',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateForward('cirurgias-inserir');
          }
        }
      ]
    });
      alert.present();
  }

  async showInsertNotOk() {
    const alert = await this.alertCtrl.create({
      header: 'Falhou!',
      message: 'Procedimento NÃO cadastrado, favor repetir',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            const navigationExtras: NavigationExtras = {
              queryParams: {
                codCirurgia: this.route.snapshot.queryParamMap.get('codCirurgia')
              }
            };
            this.router.navigate(['procedimentos-inserir'], navigationExtras);
          }
        }
      ]
    });
      alert.present();
  }

  saveMultiplosProcedimentos() {
    this.procedimentoService.insertProcedimento(this.procedimento)
      .subscribe(response => {
        this.showInsertOkMultiplos();
      },
        error => {
          this.showInsertNotOkMultiplos();
        });
  }

  async showInsertOkMultiplos() {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Procedimento cadastrado',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateForward('procedimentos-inserir');
            this.inserirProcedimentoFormGroup.reset();
          }
        }
      ]
    });
      alert.present();
  }

  async showInsertNotOkMultiplos() {
    const alert = await this.alertCtrl.create({
      header: 'Falhou!',
      message: 'Procedimento NÃO cadastrado, favor repetir',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            const navigationExtras: NavigationExtras = {
              queryParams: {
                codCirurgia: this.route.snapshot.queryParamMap.get('codCirurgia')
              }
            };
            this.router.navigate(['procedimentos-inserir'], navigationExtras);
          }
        }
      ]
    });
      alert.present();
  }

}
