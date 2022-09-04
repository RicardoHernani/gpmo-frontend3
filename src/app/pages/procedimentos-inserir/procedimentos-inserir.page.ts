import { ProcedimentoService } from './../../services/domain/procedimento.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, NavController, NavParams } from '@ionic/angular';
import { ProcedimentoForm } from 'src/app/models/procedimento.form';
import { ReferenciaDTO } from 'src/app/models/referencia.dto';
import { ReferenciaService } from 'src/app/services/domain/referencia.service';

@Component({
  selector: 'app-procedimentos-inserir',
  templateUrl: './procedimentos-inserir.page.html',
  styleUrls: ['./procedimentos-inserir.page.scss'],
})
export class ProcedimentosInserirPage {
 @ViewChild(IonModal) modal: IonModal;

  guardaResposta: ReferenciaDTO;
  procedimento: ProcedimentoForm;
  codCirurgia: string;

  inserirProcedimentoFormGroup: FormGroup= this.formBuilder.group({
    tipo: ['', [Validators.required]],
    premio: ['', [Validators.required]],
    referenciaCodigo: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
  });

  constructor(
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public referenciaService: ReferenciaService,
    public procedimentoService: ProcedimentoService) {

    this.codCirurgia = navParams.get('codCirurgia');
    console.log(this.codCirurgia);
  }

  mostraPorCodigo(){
    this.referenciaService.findByCodigo(this.inserirProcedimentoFormGroup.value.referenciaCodigo)
      .subscribe(resposta => {
        this.guardaResposta = resposta;
      },
        error => {
      });
  }

  cancel() {
    this.modal.dismiss('cancel');
  }

  confirm() {
    this.inserirProcedimento();
    this.modal.dismiss('confirm');
    console.log('confirmado');
  }

  addMore() {
    this.modal.dismiss('addMore');
    console.log('adicionado mais');
  }

  inserirProcedimento() {
    this.procedimento = {
      tipo: this.inserirProcedimentoFormGroup.value.tipo,
      premio: this.inserirProcedimentoFormGroup.value.premio,
      cirurgiaId: this.codCirurgia,
      referenciaCodigo: this.inserirProcedimentoFormGroup.value.referenciaCodigo
    };
    this.procedimentoService.insertProcedimento(this.procedimento);
    console.log(this.procedimento);
  }

/*
    inserirProcedimento() {
      let localUser = this.storage.getLocalUser();
      if (this.codCirurgia && localUser && localUser.email) {
        this.procedimento = {
          tipo: this.formGroup.value.tipo,
          premio: this.formGroup.value.premio,
          cirurgiaId: this.codCirurgia,
          referenciaCodigo: this.formGroup.value.referenciaCodigo
        };
      }
      else {
          this.showInsertNotOk();
      }

      if (this.procedimento.referenciaCodigo != null) {
        this.referenciaService.findByCodigo(this.procedimento.referenciaCodigo)
        .subscribe(response => {
          this.guardaResposta = response;
          this.hasCodigo = true;


          //this.saveProcedimento();
        },
        error => {
          if (error.status == 404) {
          }
        });
      }
      else {
        this.navCtrl.setRoot('ProcedimentosInsertPage');
      }
    }




    saveProcedimento() {
      this.procedimentoService.insertProcedimento(this.procedimento)
        .subscribe(response => {
        },
        error => {
          this.showInsertNotOk();
        });
    }


    cancelarInsertProcedimento() {
      let alert = this.alertCtrl.create({
        title: 'Cancelado!',
        message: 'Procedimento NÃO cadastrado. Repetir cadastro!',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.inserirProcedimento();
            }
          }
        ]
      });
      alert.present();
    }

    showInsertOk() {
      let alert = this.alertCtrl.create({
        title: 'Sucesso!',
        message: 'Procedimento cadastrado com sucesso!',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.setRoot('CirurgiasInsertPage');
            }
          }
        ]
      });
      alert.present();
    }

    showInsertNotOk() {
      let alert = this.alertCtrl.create({
        title: 'Falhou!',
        message: 'Procedimento NÃO cadastrado. Repetir cadastro!',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.setRoot('ProcedimentosInsertPage');
            }
          }
        ]
      });
      alert.present();
    }
 */

    async showInsertNotOk() {
      const alert = await this.alertCtrl.create({
        header: 'Falhou!',
        message: 'Procedimento NÃO cadastrado',
        backdropDismiss: false,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.navCtrl.navigateForward('procedimentos-inserir');
            }
          }
        ]
      });
        alert.present();
    }






  loadProcedimento(){
  }

}
