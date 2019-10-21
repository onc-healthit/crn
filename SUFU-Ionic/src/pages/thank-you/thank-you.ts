import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { AboutPage } from '../../pages/about/about';

/**
 * Generated class for the ThankYouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankYouPage {

  tab: Tabs
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab = navCtrl.parent;
    this.tab.select(1);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankYouPage');
  }

  homebutton(){
    this.navCtrl.setRoot(AboutPage);
  }

}
