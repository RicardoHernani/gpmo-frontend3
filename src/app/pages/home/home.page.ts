import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
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
    public auth: AuthService) {
   }

  ionViewWillEnter(): void {
    this.menu.swipeGesture(false);
}


  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateForward('referencias');
      },
      error => {});
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateForward('referencias');
      },
      error => {});
  }

}
