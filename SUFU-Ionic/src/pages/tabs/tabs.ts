import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,App ,ViewController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {DisplayformsPage} from '../displayforms/displayforms'
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  @ViewChild('myNav') nav: NavController

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = DisplayformsPage;
  myIndex:number
  hidePatientTab:boolean = false;
  constructor(public navCtrl: NavController,  
    public navParams: NavParams,
    public app:App,
    public viewCtrl: ViewController,
    public storage: Storage,) {
   this.myIndex = navParams.data.tabIndex || 0;

   this.storage.get('isFrom').then(data => {
     console.log('is from', data);
     if(data && data == 'launcher') {
      this.hidePatientTab = true;
     }
   })
  }


  myMethod(){
    console.log(" click on forms")
    //this.navCtrl.setRoot(AboutPage)
      //this.app.getRootNav().getActiveChildNav().select(1)
  }

  Mypatientdata(){

    console.log(" click on forms")
   // this.app.getRootNav().getActiveChildNav().push(1)
   //this.viewCtrl.dismiss();
      //this.app.getRootNav().getActiveChildNav().select(ContactPage);
     // this.app.getRootNav().push(1);
     //this.navCtrl.parent.select(1)
  }
  

}
