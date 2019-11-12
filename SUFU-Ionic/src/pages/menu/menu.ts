import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav ,App} from 'ionic-angular';
import { Storage } from '@ionic/storage';

//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
//import {TabsPage} from '../tabs/tabs'
//import { fromPromise } from 'rxjs/observable/fromPromise';
//import { HomePage } from '../home/home';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage = 'TabsPage';
  @ViewChild(Nav) nav: Nav;
  pages: PageInterface[] = [
    { title: 'Home', pageName: 'HomePage', icon: 'home' },
    { title: 'Forms', pageName: 'TabsPage', tabComponent: 'AboutPage', index: 0, icon: 'list' },
    { title: 'Search Patient', pageName: 'TabsPage', tabComponent: 'ContactPage', index: 1, icon: 'search' },
    { title: 'Submitted Forms', pageName: 'TabsPage', tabComponent: 'DisplayformsPage',index: 2, icon: 'paper' },
    //{ title: 'Profile', pageName: 'ProfilePage', icon: 'contacts' },
    // { title: 'Logout', pageName: 'LogoutPage', icon: 'log-out' },
  ];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page: PageInterface) {
    console.log("click")
    let params = {};
    //console.log(page)
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
     // console.log(params)
     
       
    }
 
     //console.log(this.pages)
    // The active child nav is our Tabs Navigation
    // console.log('active child', this.nav.getActiveChildNav());
    // console.log('active childs', this.nav.getActiveChildNavs());
    if (this.nav.getActiveChildNavs()[0] && page.index != undefined) {

      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
        this.nav.setRoot(page.pageName, params);
     
        
    }
    
  }

  isActive(page: PageInterface) {
    //console.log(" Again the Tabs Navigation")
    let childNav = this.nav.getActiveChildNavs()[0];
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
   }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }


  logout(page: PageInterface){
    this.storage.set('fhirURL', null);
    this.storage.set('isFrom', null);
    this.storage.set('tokenURL', null);
    this.storage.set('accessToken', null);
    localStorage.removeItem('Patientdetails');
    localStorage.removeItem('isFrom');
    localStorage.removeItem('LoginDetails');
    this.app.getRootNav().setRoot('LoginPage');
  }

  Home(){

    //this.navCtrl.setRoot(HomePage)
  }
  

}
