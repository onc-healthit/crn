import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GroupQurtionsDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-qurtions-display',
  templateUrl: 'group-qurtions-display.html',
})
export class GroupQurtionsDisplayPage {
 
  groupQuetions:any=[]  
  @Input()
  set name(gruopQuetions:any) {
    this.groupQuetions =  gruopQuetions
  }

  @Input() prop1: string;
  //@Input() gruopQuetions: this.groupQuetions[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log("/////////////////")
    console.log(this.prop1)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupQurtionsDisplayPage');
  }

}
