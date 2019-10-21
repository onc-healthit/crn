import {Injectable} from '@angular/core';
import {Http,  Headers} from "@angular/http";
import  "rxjs/Rx";
import {  tap } from 'rxjs/operators';
import {ConstService} from "../../providers/constent-service";


@Injectable()

export class PatientFormService {
    constructor(public http: Http, public constService: ConstService) {

    }



    postForms(payload:any){
        console.log(payload)
        const body = JSON.stringify(payload);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.constService.base_url + 'fhir/Patient', body, {
            headers: headers
        })


       // Post: http://52.70.192.201/fhir-R4/createpatient

        .pipe(
            tap(res => {
                return res;
            }),
            // catchError(this.handleError('getAllExtractionDetails', []))
            );
    }

}