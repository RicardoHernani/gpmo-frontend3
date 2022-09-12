import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { CirurgiaDTO } from 'src/app/models/cirurgia.dto';
import { CirurgiaForm } from 'src/app/models/cirurgia.form';
import { StorageService } from '../storage.service';

@Injectable()
export class CirurgiaService {

    constructor(
      public http: HttpClient,
      public storage: StorageService) {
    }

    insertCirurgia(obj: CirurgiaForm) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/cirurgias`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findCirurgiasByDate(data: string): Observable<CirurgiaDTO[]> {
      return this.http.get<CirurgiaDTO[]>(`${API_CONFIG.baseUrl}/cirurgias/data/page?dataCirurgia=${data}`);
    }

}
