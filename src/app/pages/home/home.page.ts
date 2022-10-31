import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: '',
    senha: ''
  };

  constructor(
    public menu: MenuController,
    public navCtrl: NavController,
    public auth: AuthService,
    public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(): void {
    this.menu.swipeGesture(false);
  }

  async ionViewDidEnter() {
    await this.showLoading();
    this.auth.refreshToken()
      .subscribe(async response => {
        await this.loadingCtrl.dismiss();
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateForward('referencias');
      },
      async error => {
        await this.loadingCtrl.dismiss();
      });
  }

  async login() {
    await this.showLoading();
    this.auth.authenticate(this.creds)
      .subscribe(async response => {
        await this.loadingCtrl.dismiss();
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateForward('referencias');
      },
      async error => {
        await this.loadingCtrl.dismiss();
      });
  }

  signup() {
    this.navCtrl.navigateForward('signup');
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
    });

    loading.present();
    return loading;
  }
}
