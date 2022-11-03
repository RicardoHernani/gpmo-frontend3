import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ReferenciaDTO } from 'src/app/models/referencia.dto';
import { ReferenciaService } from 'src/app/services/domain/referencia.service';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.page.html',
  styleUrls: ['./referencias.page.scss'],
})
export class ReferenciasPage implements OnInit {

  referenciaFormGroup: FormGroup= this.formBuilder.group({
    objeto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });

  objeto: string;
  refs: ReferenciaDTO = {
    codigo: '',
    descricao: '',
    pontos: '',
    valor: ''
  };
  guardaResposta: ReferenciaDTO;
  items: ReferenciaDTO[];
  varControle: boolean;

  constructor(
    public formBuilder: FormBuilder,
    public referenciaService: ReferenciaService,
    public menu: MenuController,
    public modal: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
  }

  analizaObjeto() {
    if (parseInt(this.referenciaFormGroup.value.objeto, 10)) {
      this.refs.codigo = this.referenciaFormGroup.value.objeto;
      this.varControle = true;
      this.mostraPorCodigo();
    } else {
        this.refs.descricao = this.referenciaFormGroup.value.objeto;
        this.varControle = false;
        this.mostraPorDescricao();
      }
  }

  mostraPorCodigo(){
    this.referenciaService.findByCodigo(this.refs.codigo)
      .subscribe(resposta => {
        this.guardaResposta = resposta;
      },
        error => {
          this.modal.dismiss();
      });
  }

  async mostraPorDescricao() {
    await this.showLoading();
    this.referenciaService.findByDescricao(this.refs.descricao)
      .subscribe(async resposta => {
        await this.loadingCtrl.dismiss();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.items = (resposta['content']);
        if (this.items.length === 0) {
          this.modal.dismiss();
          this.notFindDescricao();
        }
      },
        async error => {
          await this.loadingCtrl.dismiss();
      });
  }

  async notFindDescricao() {
    const alert = await this.alertCtrl.create({
      header: 'Erro 404:',
      message: 'Descrição não encontrada',
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

  async expand(item) {
    const alert = await this.alertCtrl.create({
      header: 'Descrição',
      message: item.descricao,
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
