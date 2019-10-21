import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import  "rxjs/Rx";
import {  tap } from 'rxjs/operators';
//import {Observable} from "rxjs/Observable";
//import {map} from 'rxjs/Operator/map'
import {ConstService} from "../../providers/constent-service";

@Injectable()

export class DisplayQuestionnaireFormsService {
    constructor(public http: Http, public constService: ConstService) {

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

    // http://52.70.192.201/fhir-R4/device/08717648200274
   // http://52.70.192.201/hive/device/08717648200274

    getdeviceInfo(id:any) {

        const headers = new Headers();
        return this.http.get(this.constService.base_url+'device/'+id, {
            headers: headers
        }) 

       
            .map((data: Response)=> data.json()|| {})
           // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    

    
    

    
}