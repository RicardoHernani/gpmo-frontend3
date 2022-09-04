import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcedimentoForm } from 'src/app/models/procedimento.form';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../storage.service';

@Injectable()
export class ProcedimentoService {

    constructor(
      public http: HttpClient,
      public storage: StorageService) {
    }

    insertProcedimento(obj: ProcedimentoForm) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/procedimentos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
