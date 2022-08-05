import { StorageService } from 'src/app/services/storage.service';
//Implementado segundo www.positronx.io/angular-error-handling-tutorial-with-examples/
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Injectable()
export class ErrorIntercept implements HttpInterceptor {

  constructor(
    public storage: StorageService,
    public alertCtrl: AlertController){
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
          .pipe(
              catchError((error) => {
                  let errorObj = error;
                  if (errorObj.error) {
                    errorObj = errorObj.error;
                  }
                  if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                  }

                  console.log('Erro detectado pelo interceptor:');
                  console.log(errorObj);

                  switch(errorObj.status) {

                    case 401:
                    this.handle401();
                    break;

                    case 403:
                    this.handle403();
                    break;

                    default:
                    this.handleDefaultError(errorObj);
                  }

                  return throwError(errorObj);
              })
          );
  }

  async handle401() {
    const alert = await this.alertCtrl.create({
      header: 'Erro 401',
      subHeader: 'Falha de autenticação!',
      message: 'Email ou senha incorretos.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
      alert.present();
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  async handleDefaultError(errorObj: any) {
    const alert = await this.alertCtrl.create({
      header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
      alert.present();
  }

}
