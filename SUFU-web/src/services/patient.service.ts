import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RestService } from '../core/rest.service';
import * as Config from '../app/config'
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class PatientService {

    constructor(private restService: RestService,
        private http: HttpClient) {

    }

    getPatients() {
        return this.restService.get(Config.baseData.base_url + 'fhir/Patient', null, null)
        .map(res => res)
        .catch(error => 
            Observable.throw(error))
    }

    getSubmitedFormByPatentID(id) {
        return this.restService.get(Config.baseData.base_url + 'fhir/QuestionnaireResponse?author=Practitioner/3', null, null)
        .map(res => res)
        .catch(error => 
            Observable.throw(error))  
    }

    getPatientResource(id) {
        return this.restService.get(Config.baseData.base_url + 'fhir/Patient?_id=' + id, null, null)
        .map(res => res)
        .catch(error => 
            Observable.throw(error))  
    }

}