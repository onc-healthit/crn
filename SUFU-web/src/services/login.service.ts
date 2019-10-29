import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RestService } from '../core/rest.service';
import * as Config from '../app/config'
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class LoginService {

    constructor(private restService: RestService,
        private http: HttpClient) {

    }

    login(data) {
        return this.restService.get(Config.baseData.base_url + 'fhir/Person?email='+data.email+'&password='+data.password, null, null)
        .map(res => res)
        .catch(error => 
            Observable.throw(error))
    }

}