import { StorageService } from './../services/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';


@Injectable()
export class AuthIntercept implements HttpInterceptor {

  constructor(
    public storage: StorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const localUser = this.storage.getLocalUser();
      const n = API_CONFIG.baseUrl.length;
      const requestToAPI = request.url.substring(0, n) === API_CONFIG.baseUrl;

      if (localUser && requestToAPI) {
          const authReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localUser.token)});
          return next.handle(authReq);
      }
      else {
          return next.handle(request);
      }
  }
}
