import { UsuarioService } from './../../services/domain/usuario.service';
import { UsuarioDTO } from './../../models/usuario.dto';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario: UsuarioDTO;

  constructor(
    public storage: StorageService,
    public navCtrl: NavController,
    public usuarioService: UsuarioService) {
    }

  ngOnInit() {
    // eslint-disable-next-line prefer-const
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
      .subscribe(response => {
        this.usuario = response;
      },
      error =>{
        if (error.status === 403) {
          this.navCtrl.navigateForward('home');
        }
      });
    }
    else {
      this.navCtrl.navigateForward('home');
    }
  }
}
