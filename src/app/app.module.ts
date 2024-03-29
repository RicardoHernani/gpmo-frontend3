import { CollectorService } from './services/domain/collector.service';
import { ProcedimentoService } from './services/domain/procedimento.service';
import { CirurgiaService } from './services/domain/cirurgia.service';
import { AuthIntercept } from './interceptors/auth-interceptor';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorIntercept } from './interceptors/error-interceptor';
import { UsuarioService } from './services/domain/usuario.service';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercept,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    AuthService,
    StorageService,
    UsuarioService,
    CirurgiaService,
    ProcedimentoService,
    NavParams,
    ScreenOrientation,
    CollectorService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
