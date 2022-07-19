import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { ReferenciaDTO } from 'src/app/models/referencia.dto';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService {

  constructor(public http: HttpClient) {
}

findByCodigo(codigo: string): Observable<ReferenciaDTO> {
        return this.http.get<ReferenciaDTO>(`${API_CONFIG.baseUrl}/referencias/${codigo}`);
    }

}
