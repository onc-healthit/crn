import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import  "rxjs/Rx";
//import {Observable} from "rxjs/Observable";
//import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/constent-service";

@Injectable()

export class ContactService {
    constructor(public http: Http, public constService: ConstService) {

    }
   // http://52.70.192.201/fhir-R4/fhir/Patient

    getPatient() {
        const headers = new Headers();
        return this.http.get(this.constService.base_url + 'fhir/Patient', {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
           // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // getQuestionnaries() {
    //     const headers = new Headers();
    //     return this.http.get(this.constService.base_url + 'fhir/Questionnaire', {
    //         headers: headers
    //     }) 
    //         .map((data: Response)=> data.json()|| {})
    //        // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }
}