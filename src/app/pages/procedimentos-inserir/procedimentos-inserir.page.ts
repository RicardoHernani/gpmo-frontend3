import { ProcedimentoService } from './../../services/domain/procedimento.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { ProcedimentoForm } from 'src/app/models/procedimento.form';
import { ReferenciaDTO } from 'src/app/models/referencia.dto';
import { ReferenciaService } from 'src/app/services/domain/referencia.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-procedimentos-inserir',
  templateUrl: './procedimentos-inserir.page.html',
  styleUrls: ['./procedimentos-inserir.page.scss'],
})
export class ProcedimentosInserirPage {
 @ViewChild(IonModal) modal: IonModal;

  guardaResposta: ReferenciaDTO;
  procedimento: ProcedimentoForm;

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
    public router: Router) {
  }


  mostraReferenciaPorCodigo(){
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
  }

  addMore() {
    this.modal.dismiss('addMore');
    console.log('adicionado mais');
  }

  inserirProcedimento() {
    this.procedimento = {
      tipo: this.inserirProcedimentoFormGroup.value.tipo,
      premio: this.inserirProcedimentoFormGroup.value.premio,
      cirurgiaId: this.route.snapshot.queryParamMap.get('codCirurgia'), //Ver vídeo: https://www.youtube.com/watch?v=1ZbhOJ5coY4
      referenciaCodigo: this.inserirProcedimentoFormGroup.value.referenciaCodigo
    };
    this.saveProcedimento();
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
