import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

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

  constructor(public menu: MenuController, public navCtrl: NavController) {
   }

    ionViewWillEnter(): void {
     this.menu.swipeGesture(false);
  }

    login() {
      console.log(this.creds);
      this.navCtrl.navigateForward('referencias');
    }

}
