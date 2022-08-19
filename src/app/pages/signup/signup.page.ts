import { UsuarioService } from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  signupFormGroup: FormGroup= this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
  });

  constructor(
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {
  }

  signupUser() {
    this.usuarioService.insert(this.signupFormGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error =>{});
  }

  async showInsertOk() {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Cadastro realizado com sucesso',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.back();
          }
        }
      ]
    });
      alert.present();
  }

}
