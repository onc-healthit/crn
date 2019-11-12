import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login'
import {MenuPage} from '../pages/menu/menu'
import { SmartOnFhire } from '../services/smartonfhire.service';
import { ConstService } from '../providers/constent-service';
import { Storage } from '@ionic/storage';
import { DataService } from '../services/data.service';
import { AuthRequestPage } from '../pages/auth-request/auth-request';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  LoginDetails:any
  category:any;
  id:any;
  formatedFhirURL:any;
  urlParameters:any = [];
  iss:any;
  launch:any;
  state:any;
  code:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    public smartService: SmartOnFhire,
    public constService: ConstService,
    public storage: Storage,
    public DataService: DataService,
    private event: Events) {
    platform.ready().then(() => {

      this.event.subscribe('logout', (data) => {
        this.logOut();
      })
    
      this.storage.get('accessToken').then(data => {
        if(data) {
          this.DataService.accessToken = data.access_token;
          this.DataService.tokenType = data.token_type;
          this.DataService.patientID = data.patient;
          this.DataService.userName = data.user;

          this.LoginDetails = JSON.parse(localStorage.getItem('LoginDetails'));
          console.log('LoginDetails', this.LoginDetails)
          if(this.LoginDetails == null){
            this.rootPage = LoginPage;
          }else{
            this.rootPage = MenuPage
          }
        } else {
          this.smartOnFhire();
          this.rootPage = AuthRequestPage;
        }
      })

      this.storage.get('fhirURL').then(data => {
        console.log('fhirURL', data);
        this.DataService.fhirURL = data;
      })

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

     
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  getParamValue(variable) {
    if(document.URL.indexOf("?") != -1) {
      let splitURL = document.URL.split("?");
      let splitParams = splitURL[1].split("&");
      for (let i in splitParams) {
        let singleURLParam = splitParams[i].split('=');
        if(singleURLParam[0] == variable) {
          return singleURLParam[1];
        }
      }
    } else {
      return null;
      // this.nav.push(AuthRequestPage);
    }

  }

  smartOnFhire() {
    console.log('ssi', this.getParamValue('iss'));
    console.log('launch', this.getParamValue('launch'));
    this.launch = undefined;
    let iss;
    let launch;
    iss = this.getParamValue('iss');
    launch = this.getParamValue('launch');
    // this.code = this.getParamValue('code');
    // this.state = this.getParamValue('state');
    // console.log('code', this.code);
    // console.log('state', this.state);

    if(iss && launch) {
      this.nav.setRoot(AuthRequestPage, {iss: iss, launch: launch});
      // this.getMetadata(this.iss);
    }

    // if(this.code && this.state) {
    //   this.getoAuthToken(this.code, this.state);
    // }

    if(!iss && !launch) {
      this.nav.setRoot(AuthRequestPage);
    }
  }


  logOut() {
    this.storage.set('fhirURL', null);
    this.storage.set('isFrom', null);
    this.storage.set('tokenURL', null);
    this.storage.set('accessToken', null);
    localStorage.removeItem('Patientdetails');
    localStorage.removeItem('isFrom');
    localStorage.removeItem('LoginDetails');
    this.nav.setRoot('LoginPage');
  }

  getMetadata(url) {
    var state = Math.round(Math.random() * 100000000).toString();
    this.formatedFhirURL = decodeURIComponent(url).replace('%2f', '/');
    this.storage.set('fhirURL', this.formatedFhirURL);
    this.smartService.getMetadata(this.formatedFhirURL).subscribe(data => {
      console.log('smart success', data);
      var arg = data.rest[0].security.extension[0].extension;
      let authUsl;
      let tokenUrl;
      for(var i = 0; i < arg.length; i++) {
        if(arg[i].url === 'authorize') {
          authUsl = arg[i].valueUri;
        }
        if(arg[i].url === 'token') {
          tokenUrl = arg[i].valueUri;
        }
      }
      this.storage.set('tokenURL', tokenUrl);
      this.fhirOAuth(this.constService.cliendID, '', 'http://localhost:8100', authUsl, this.formatedFhirURL, state);
    }, error => {
      console.log('smart error', error);
    }) 
  }

  fhirOAuth(clientId, scope, redirectURI, authorizeURL, formatedUrl, state) {
    var path = authorizeURL + '?';
    var queryParams = [
      'response_type=code',
      'client_id=' + clientId,
      'redirect_uri=' + redirectURI,
      'launch=' + this.launch,
      'state=' + state,
      'scope=launch|patient/*.read',
      'aud=' + formatedUrl
    ];
    var query = queryParams.join('&');
    var url = path + query;
    console.log('redirect url', url);
    window.location.replace(url);
  }

  getoAuthToken(code, state) {
    console.log('f', code);
    console.log('s', state);
    let param = {
      grant_type : 'authorization_code',
      code : code,
      redirect_uri  : 'http://localhost:8100',
      client_id  : this.constService.cliendID
    }
    const searchParams = Object.keys(param)
    .map(key => {
      return (
        encodeURIComponent(key) + '=' + encodeURIComponent(param[key])
      );
    })
    .join('&');
    this.storage.get('tokenURL').then(data => {
      if(data) {
        this.smartService.getAccessToken(data, searchParams).subscribe(data => {
          console.log('access token success', data);
          this.storage.set('accessToken', data);
          if(data) {
            this.DataService.accessToken = data.access_token;
            this.DataService.tokenType = data.token_type;
            this.DataService.patientID = data.patient;
            this.DataService.userName = data.user;
            this.nav.setRoot(MenuPage);
          }

        }, error => {
          console.log('access token error', error);
        })
      }
    })


  }

}
