import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ReferenciaDTO } from 'src/app/models/referencia.dto';
import { ReferenciaService } from 'src/app/services/domain/referencia.service';

@Component({
  selector: 'app-procedimentos-inserir',
  templateUrl: './procedimentos-inserir.page.html',
  styleUrls: ['./procedimentos-inserir.page.scss'],
})
export class ProcedimentosInserirPage {
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  guardaResposta: ReferenciaDTO;

  inserirProcedimentoFormGroup: FormGroup= this.formBuilder.group({
    tipo: ['', [Validators.required]],
    premio: ['', [Validators.required]],
    referenciaCodigo: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
  });

  constructor(
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public referenciaService: ReferenciaService,) {
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  mostraPorCodigo(){
    this.referenciaService.findByCodigo(this.inserirProcedimentoFormGroup.value.referenciaCodigo)
      .subscribe(resposta => {
        this.guardaResposta = resposta;
      },
        error => {
      });
  }

  loadProcedimento(){

  }

}
