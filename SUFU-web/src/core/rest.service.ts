import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map ,  catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from './loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public headers: HttpHeaders;
  public options: {};
  public disableLoader: boolean = false;
  public blobOutput: boolean = false;

  constructor(private http: HttpClient,
    public loaderService: LoaderService) {
      this.headers = new HttpHeaders();
      this.headers = this.headers.append('Content-Type', 'application/json');
      this.headers = this.headers.append('Accept', 'application/json');
      this.headers = this.headers.append('Cache-Control', 'no-cache');
      this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
      this.headers = this.headers.append('Pragma', 'no-cache');

   }

   public get(url: string, param: {}, disableLoader?: boolean, token?: boolean): Observable<any> {
    this.disableLoader = disableLoader;
    if (!this.disableLoader) {
      this.loaderService.show();
    }

    // TODO check out the usage of HTTPParams
    let queryParams: string = '';
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        queryParams += `${key}=${param[key]}&`;
      }
    }
    queryParams = queryParams.slice(0, -1);
    const paramz = new HttpParams({
      fromString: queryParams
    });

    this.options = {
      headers: this.headers,
      params: paramz,
      responseType: 'json',
      withCredentials: true
    };

    return this.http
      .get(url, this.options).pipe(
      map((data: any) =>
        this.handleResponse(data, this)),
        catchError((error: any) => {
          this.handleError(error, this);
          return observableThrowError(error);
        }), );
  }

  public post(url: string, param: {}, disableLoader?: boolean, token?: boolean, upload?: boolean, blobOutput?: boolean): Observable<any> {
    let responseType = 'json';
    this.disableLoader = disableLoader;

    this.blobOutput = blobOutput;

    let body = param;

    if (upload) {
      // Other header params are not accepted in upload (server)
      this.headers = new HttpHeaders({
        enctype: 'multipart/form-data'
      });
    } else {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      body = JSON.stringify(param);
    }

    if (!disableLoader) {
      this.loaderService.show();
    }
    if (this.blobOutput) {
      responseType = 'blob';
    }
    this.options = {
      headers: this.headers,
      responseType,
      withCredentials: true
    };

    return this.http.post(url, body, this.options).pipe(
      map((data: any) =>
        this.handleResponse(data, this)),
        catchError((error: any) => {
          this.handleError(error, this);
          return observableThrowError(error);
        }), );
  }

  public put(url: string, param: {}, disableLoader?: boolean, token?: boolean, upload?: boolean): Observable<any> {

    this.disableLoader = disableLoader;
    let body = param;
    this.blobOutput = false;
    if (upload) {
        // Other header params are not accepted in upload (server)
        this.headers = new HttpHeaders({
            enctype: 'multipart/form-data'
        });
    } else {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        body = JSON.stringify(param);
    }

    if (!disableLoader) {
        this.loaderService.show();
    }

    this.options = {
        headers: this.headers,
        withCredentials: true
    };

    return this.http.put(url, body, this.options).pipe(
        map((data: any) =>
            this.handleResponse(data, this)),
            catchError((error: any) => {
              this.handleError(error, this);
              return observableThrowError(error);
            }), );
}

public delete(url: string, param: {}, isUrlPAram?: boolean, disableLoader?: boolean): Observable<any> {
  this.disableLoader = disableLoader;

  if (!this.disableLoader) {
      this.loaderService.show();
  }

  let queryParams: string = '';
  for (const key in param) {
      if (param.hasOwnProperty(key)) {
          queryParams += `${key}=${param[key]}&`;
      }
  }
  queryParams = queryParams.slice(0, -1);

  this.options = {
      headers: this.headers,
      params: isUrlPAram ? queryParams : param,
      withCredentials: true
  };

  return this.http
      .delete(url, this.options).pipe(
      map((data: any) =>
          this.handleResponse(data, this)),
          catchError((error: any) => {
            this.handleError(error, this);
            return observableThrowError(error);
          }), );

}

public oauthLogin(url: string, param, disableLoader?: boolean, isRefresh?: boolean): Observable<any> {
  if (!disableLoader) {
    this.loaderService.show();
  }

  const clientName: string = 'teeupt';
  const clientPassword: string = 'secret';
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ` + btoa(`${clientName}:${clientPassword}`)
  });

  let bodyz: string = '';

  if (!isRefresh) {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', param.username)
      .set('password', param.password);
    bodyz = body.toString();
  } else {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token');
    bodyz = body.toString();
  }

  this.options = {
    headers,
    withCredentials: true
  };

  return this.http.post(url, param, this.options)
    .map((data: any) =>
      this.handleResponse(data, this))
    .catch((error) =>
      this.handleError(error, this));

}

  private handleResponse(res: Response, that){

    that.loaderService.hide();
    let body: any = res;

    console.log('api response', res);

    return body || {};
}

  private handleError = (error: HttpErrorResponse, that) => {
    if (!that.disableLoader) {
      that.loaderService.hide();
      }
    console.log('http error', error);

    return observableThrowError(error);
  }
   

}
