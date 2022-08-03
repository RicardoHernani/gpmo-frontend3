import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;

  constructor(
    public storage: StorageService,
    public menu: MenuController) {
    }

  ngOnInit() {
    // eslint-disable-next-line prefer-const
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.email = localUser.email;
    }
  }
}
