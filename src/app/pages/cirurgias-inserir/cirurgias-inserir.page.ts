import { NavigationExtras, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { CirurgiaForm } from 'src/app/models/cirurgia.form';
import { CirurgiaService } from 'src/app/services/domain/cirurgia.service';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cirurgias-inserir',
  templateUrl: './cirurgias-inserir.page.html',
  styleUrls: ['./cirurgias-inserir.page.scss'],
})
export class CirurgiasInserirPage {

  cirurgia: CirurgiaForm;
  codCirurgia: string;

  inserirCirurgiaFormGroup: FormGroup= this.formBuilder.group({
    matricula: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]],
    data: ['', [Validators.required]]
    });

  constructor(
    public formBuilder: FormBuilder,
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public cirurgiaService: CirurgiaService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public router: Router) {
  }

  ionViewWillEnter() {
    this.inserirCirurgiaFormGroup.reset();
  }

  loadUsuario() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cirurgia = {
            matricula: this.inserirCirurgiaFormGroup.value.matricula,
            data: this.inserirCirurgiaFormGroup.value.data,
            usuarioId: response.id
          };
          this.saveCirurgia();
        },
        error => {
          if (error.status === 403) {
            this.showInsertNotOk();
          }
        });
    }
    else {
      this.showInsertNotOk();
    }
  }

  async showInsertNotOk() {
    const alert = await this.alertCtrl.create({
      header: 'Falhou!- Erro 403',
      message: 'Cadastro NÃO realizado - Falha de autenticação, Fazer login novamente',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateForward('home');
          }
        }
      ]
    });
      alert.present();
  }

  async showInsertOk() {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Cirurgia cadastrada. Você será direcionado para a tela de preenchimento dos procedimentos',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            const navigationExtras: NavigationExtras = {
              queryParams: {
                codCirurgia: this.codCirurgia
              }
            };
            this.router.navigate(['procedimentos-inserir'], navigationExtras); //Ver https://www.youtube.com/watch?v=1ZbhOJ5coY4
          }
        }
      ]
    });
      alert.present();
  }

  saveCirurgia() {
    this.cirurgiaService.insertCirurgia(this.cirurgia)
      .subscribe(response => {
        this.codCirurgia = (this.extractId(response.headers.get('location')));
        this.showInsertOk();
      },
      error => {});
  }

  private extractId(location: string): string {
    const position = location.lastIndexOf('/');
    return location.substring(position +1, location.length);
  }

}
