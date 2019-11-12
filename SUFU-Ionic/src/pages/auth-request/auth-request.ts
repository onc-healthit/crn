import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { SmartOnFhire } from '../../services/smartonfhire.service';
import { ConstService } from '../../providers/constent-service';
import { DataService } from '../../services/data.service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-auth-request',
  templateUrl: 'auth-request.html',
})
export class AuthRequestPage {
  authRequestForm: FormGroup;
  fhirUrl: AbstractControl;
  clientID: AbstractControl;
  formatedFhirURL: any;
  launch: any;
  iss: any;
  code: any;
  state: any;
  client_code: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public smartService: SmartOnFhire,
    public constService: ConstService,
    public storage: Storage,
    public DataService: DataService,
    private loadingCtrl: LoadingController) {

    console.log('app base url', window.location.origin + location.pathname);

    this.DataService.rediredtURL = window.location.origin + location.pathname

    let fromType = JSON.parse(localStorage.getItem('isFrom'));

    console.log('launcherlauncher', fromType);
    if (fromType == 'launcher') {
      this.client_code = this.constService.cliendID;
    } else if (fromType == 'standalone') {
      this.client_code = this.constService.cliendIDHealthIT
    } else {
      this.client_code = this.constService.cliendID;
    }


    this.authRequestForm = fb.group({
      fhirUrl: ['', Validators.compose([Validators.required])],
      clientID: ['', Validators.compose([Validators.required])],
    });

    this.fhirUrl = this.authRequestForm.controls['fhirUrl'];
    this.clientID = this.authRequestForm.controls['clientID'];

    this.code = this.getParamValue('code');
    this.state = this.getParamValue('state');
    console.log('code', this.code);
    console.log('state', this.state);
    if (this.code && this.state) {
      this.getoAuthToken(this.code, this.state);
    }

    this.iss = this.navParams.get('iss');
    this.launch = this.navParams.get('launch');
    console.log('iss', this.iss);
    console.log('launch', this.launch);
    if (this.iss && this.launch) {
      localStorage.setItem('isFrom', JSON.stringify('launcher'));
      this.storage.set('isFrom', 'launcher');
      this.getMetadata(this.iss);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthRequestPage');
  }

  onAuthineticate() {
    console.log(this.authRequestForm);
    if (this.authRequestForm.valid) {
      localStorage.setItem('isFrom', JSON.stringify('standalone'));
      this.storage.set('isFrom', 'standalone');

      this.client_code = this.authRequestForm.value.clientID;
      this.iss = this.authRequestForm.value.fhirUrl;
      this.storage.set('fhirURL', this.iss);
      this.getMetadata(this.authRequestForm.value.fhirUrl);
    }
  }

  getParamValue(variable) {
    if (document.URL.indexOf("?") != -1) {
      let splitURL = document.URL.split("?");
      let splitParams = splitURL[1].split("&");
      for (let i in splitParams) {
        let singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0] == variable) {
          return singleURLParam[1];
        }
      }
    } else {
      return null;
      // this.nav.push(AuthRequestPage);
    }

  }

  getMetadata(url) {
    var state = Math.round(Math.random() * 100000000).toString();
    this.formatedFhirURL = decodeURIComponent(url).replace('%2f', '/');
    this.storage.set('fhirURL', this.formatedFhirURL);
    this.DataService.fhirURL = this.formatedFhirURL;
    console.log('encodeURIComponent', this.formatedFhirURL);
    let loader = this.loadingCtrl.create({
      content: 'please wait..'
    })
    loader.present();
    this.smartService.getMetadata(this.formatedFhirURL).subscribe(data => {
      loader.dismiss();
      console.log('smart success', data);
      var arg = data.rest[0].security.extension[0].extension;
      let authUsl;
      let tokenUrl;
      for (var i = 0; i < arg.length; i++) {
        if (arg[i].url === 'authorize') {
          authUsl = arg[i].valueUri;
        }
        if (arg[i].url === 'token') {
          tokenUrl = arg[i].valueUri;
        }
      }
      this.storage.set('tokenURL', tokenUrl);
      this.fhirOAuth(this.client_code, '', this.DataService.rediredtURL, authUsl, this.formatedFhirURL, state);
    }, error => {
      loader.dismiss();
      console.log('smart error', error);
    })
  }

  fhirOAuth(clientId, scope, redirectURI, authorizeURL, formatedUrl, state) {
    var path = authorizeURL + '?';
    var queryParams = [
      'response_type=code',
      'client_id=' + clientId,
      'redirect_uri=' + redirectURI,
      // 'launch=' + this.launch,
      'state=' + state,
      'scope=patient/*.read',
      'aud=' + formatedUrl
    ];
    this.storage.get('isFrom').then(data => {
      if (data == 'launcher') {
        queryParams.push('launch=' + this.launch);
      }
      var query = queryParams.join('&');
      var url = path + query;
      window.location.replace(url);
    })

  }

  getoAuthToken(code, state) {
    let param = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.DataService.rediredtURL,
      client_id: this.client_code
    }
    console.log('client_codeclient_codeclient_code', this.client_code)
    const searchParams = Object.keys(param)
      .map(key => {
        return (
          encodeURIComponent(key) + '=' + encodeURIComponent(param[key])
        );
      })
      .join('&');
    this.storage.get('tokenURL').then(data => {
      if (data) {
        let loader = this.loadingCtrl.create({
          content: 'please wait..'
        })
        loader.present();
        this.smartService.getAccessToken(data, searchParams).subscribe(data => {
          loader.dismiss();
          console.log('access token success auth page', data);
          this.storage.set('accessToken', data);
          if (data) {
            this.DataService.accessToken = data.access_token;
            this.DataService.tokenType = data.token_type;
            this.DataService.patientID = data.patient;
            this.DataService.userName = data.user;
            this.navCtrl.setRoot(LoginPage);
          }

        }, error => {
          loader.dismiss();
          console.log('access token error auth page', error);
        })
      }
    })


  }

}
