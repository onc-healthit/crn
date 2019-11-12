import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import  "rxjs/Rx";
import { ConstService } from '../providers/constent-service';
import { DataService } from './data.service';
//import {Observable} from "rxjs/Observable";
//import {map} from 'rxjs/Operator/map'

@Injectable()

export class SmartOnFhire {
    constructor(public http: Http, 
        public constService: ConstService,
        public DataService: DataService) {

    }

    getMetadata(url) {
        const headers = new Headers();
        return this.http.get(url + '/metadata', {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
    }

    getAccessToken(url, body) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, body, {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
    }

    getPatientFromFhir() {
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer` + this.DataService.accessToken
        });
        return this.http.get(this.DataService.fhirURL + '/Patient/' + this.DataService.patientID, {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
    }

    getListOfPatientFromFhir() {
        const headers = new Headers({
            'Authorization': `Bearer ` + this.DataService.accessToken
        });
        return this.http.get(this.DataService.fhirURL + '/Patient', {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
    }

    getPatientResource() {
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer` + this.DataService.accessToken
        });
        return this.http.get(this.DataService.fhirURL + '/Observation?patient=' + this.DataService.patientID, {
            headers: headers
        }) 
            .map((data: Response)=> data.json()|| {})
    }

}