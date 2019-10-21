import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login'
import {MenuPage} from '../pages/menu/menu'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any 
  LoginDetails:any

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.LoginDetails = JSON.parse(localStorage.getItem('LoginDetails'));
      console.log(this.LoginDetails)
      if(this.LoginDetails == null){
        this.rootPage = LoginPage
      }else{
        this.rootPage = MenuPage
       // this.navCtrl.setRoot('MenuPage');
      }
     
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
