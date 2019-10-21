import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  status:any
  data:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    console.log(this.navParams.data.data)
    this.data = this.navParams.data.data
    this.status = this.navParams.data.data.status
    console.log(this.status)

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }


  viewdata(){
    this.viewCtrl.dismiss('DisplayQuestionnaireResponcePage',this.data);
    //this.navCtrl.push('DisplayQuestionnaireResponcePage',this.data)
  }

  editdata(){
    this.viewCtrl.dismiss('DisplayQuestionnaireResponcePage',this.data);
  // this.navCtrl.push('DisplayQuestionnaireResponcePage',this.data)
  }
  //this.navCtrl.push('DisplayQuestionnaireResponcePage',data)
}
