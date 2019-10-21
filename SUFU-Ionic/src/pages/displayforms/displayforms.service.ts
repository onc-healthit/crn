import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import  "rxjs/Rx";
//import {Observable} from "rxjs/Observable";
//import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/constent-service";

@Injectable()

export class DisplayFormsService {
    constructor(public http: Http, public constService: ConstService) {

    }


    getQuestionnaireResponse(id:any) {
        const headers = new Headers();
        return this.http.get(this.constService.base_url + 'fhir/QuestionnaireResponse?author=Practitioner/'+id, {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
           // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getQuestionnaireResponseByID(id:any) {
        const headers = new Headers();
        return this.http.get(this.constService.base_url + 'fhir/Questionnaire/'+id, {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
           // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPatentByID(id:any) {
        const headers = new Headers();
        return this.http.get(this.constService.base_url + 'fhir/Patient/'+id, {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
           // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getQuetions(id:any) {

        const headers = new Headers();
        return this.http.get(this.constService.base_url + 'fhir/Questionnaire/'+id, {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
           // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getQuestionnaries() {
        const headers = new Headers();
        return this.http.get(this.constService.base_url + 'fhir/Questionnaire', {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
           // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}