import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menuCollection = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Referência', url: 'referencias', icon: 'reader' },
    { title: 'Perfil', url: 'profile', icon: 'person'},
    { title: 'Logout', url: 'home', icon: 'arrow-undo'}
  ];

  constructor(public auth: AuthService) {}

  logoutDetection(menu: {title: string; url: string; icon: string}): void {
    if (menu.title === 'Logout') {
      this.auth.logout();
    }
  }
}
