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
  ];

  constructor() {}
}
