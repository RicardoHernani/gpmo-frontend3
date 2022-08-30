import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { CirurgiaForm } from 'src/app/models/cirurgia.form';
import { StorageService } from '../storage.service';

@Injectable()
export class CirurgiaService {

    constructor(public http: HttpClient, public storage: StorageService){
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
}
