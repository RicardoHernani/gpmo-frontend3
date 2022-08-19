import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { UsuarioDTO } from 'src/app/models/usuario.dto';
import { UsuarioForm } from 'src/app/models/usuario.form';
import { StorageService } from '../storage.service';

@Injectable()
export class UsuarioService {

  constructor(
    public http: HttpClient,
    public storage: StorageService) {
  }

  findByEmail(email: string): Observable<UsuarioDTO> {
      return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
  }

  insert(obj: UsuarioForm) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/usuarios`,
        obj,
        {
            observe: 'response',
            responseType: 'text'
        }
    );
  }

}
