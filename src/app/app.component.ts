import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public subMenusCirurgias = [
    { title: 'Inserir', url: 'cirurgias-inserir', icon: 'person-add'},
    { title: 'Apagar', url: 'cirurgias-apagar', icon: 'trash'}
  ];

  public subMenusProcedimentos = [
    { title: 'Inserir', url: 'procedimentos-buscar-inserir', icon: 'attach'},
    { title: 'Apagar', url: 'procedimentos-apagar', icon: 'trash'}
  ];

  public subMenusRelatorios = [
    { title: 'GPMO', url: 'relatorios-producao', icon: 'wallet'},
    { title: 'Contestação', url: 'collector', icon: 'mail'}
  ];

  constructor(public auth: AuthService) {}

  logoutDetection() {
      this.auth.logout();
  }

}
