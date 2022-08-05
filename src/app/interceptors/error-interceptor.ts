import { StorageService } from 'src/app/services/storage.service';
//Implementado segundo www.positronx.io/angular-error-handling-tutorial-with-examples/
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {

  constructor(public storage: StorageService){
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
                    case 403:
                    this.handle403();
                    break;
                  }

                  return throwError(errorObj);
              })
          );
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

}
