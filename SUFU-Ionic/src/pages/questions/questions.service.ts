import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import  "rxjs/Rx";
import {  tap } from 'rxjs/operators';
//import { catchError, map, tap } from 'rxjs/operators';
import {ConstService} from "../../providers/constent-service";


@Injectable()

export class QuestionaryService {
    constructor(public http: Http, public constService: ConstService) {

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

    postQuetionnaries(payload:any){
        console.log(payload)
        const body = JSON.stringify(payload);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'fhir/QuestionnaireResponse', body, {
            headers: headers
        })

        .pipe(
            tap(res => {
                return res;
            }),
            // catchError(this.handleError('getAllExtractionDetails', []))
            );
            
        
        //.map((data: Response) => data.json() )
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    UpdateQuetionnaries(id:any,payload:any){
        console.log(payload)
        const body = JSON.stringify(payload);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.constService.base_url + 'fhir/QuestionnaireResponse/'+id, body, {
            headers: headers
        })

        .pipe(
            tap(res => {
                return res;
            }),
            // catchError(this.handleError('getAllExtractionDetails', []))
            );
            
        
        //.map((data: Response) => data.json() )
            //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    getdeviceInfo(id:any) {

        const headers = new Headers();
        return this.http.get(this.constService.base_url+'device/'+id, {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
           // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}