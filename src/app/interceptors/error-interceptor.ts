//Implementado segundo www.positronx.io/angular-error-handling-tutorial-with-examples/
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {

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

                  return throwError(errorObj);
              })
          );
  }
}
