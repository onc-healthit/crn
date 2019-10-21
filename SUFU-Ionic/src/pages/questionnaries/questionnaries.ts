import { Component,OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Tabs,AlertController } from 'ionic-angular';
import {QuestionnariesService} from './questionnaries.service'
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

/**
 * Generated class for the QuestionnariesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionnaries',
  templateUrl: 'questionnaries.html',
  providers:[QuestionnariesService]
})
export class QuestionnariesPage implements  OnDestroy {

  Questonnary:any[]=[]
  loader:any
  loader2:any
  PatientDetails:any={}
  tab:Tabs;
  categoryName:any
  private subscription: Subscription;
  private timer: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public questionnariesService:QuestionnariesService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    
    ) {
      console.log(this.navParams.data)
      this.categoryName = this.navParams.data.category
      console.log(this.categoryName)
      this.tab = this.navCtrl.parent;
    console.log('Questionnary page')
    this.loader = this.loadingCtrl.create({
      content: 'please wait..'
  })
  this.loader.present();
  
  }

  public ngOnDestroy() {
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionnariesPage');
    
    console.log(this.PatientDetails)
    this.getQuestionnaries()
  }

  getQuestionnaries(){
   

     this.questionnariesService.getQuestionnaries().subscribe(data=>{
      // console.log(data)

      //  data.entry.resource.sort(function(obj1,obj2){
      //    return obj1.id - obj1.id
      // })

       
       

       this.Questonnary = data.entry
       for(let i=0;i<this.Questonnary.length;i++){
       // parseInt(this.Questonnary[i].resource.id)
       this.Questonnary[i]["ID"] = +this.Questonnary[i].resource.id
         
       }
       console.log(this.Questonnary)
       this.Questonnary.sort(function(obj1,obj2){
         return obj1.ID - obj2.ID
      })
      console.log(this.Questonnary)
       
       //this.Questonnary.resource.id
       this.loader.dismiss();
      
     })

  }

  setTimer(){
    this.timer  = Observable.timer(2000); 
    this.subscription = this.timer.subscribe(() => {
      // set showloader to false to hide loading div from view after 5 seconds
      this.loader2.dismiss();
  });
  }

  displayQuestions(item:any){

    //this.PatientDetails = JSON.parse(localStorage.getItem('Patientdetails'));

    //if(this.PatientDetails !=null){
      this.loader2 = this.loadingCtrl.create({
        content: 'please wait..'
    })
    this.loader2.present();
    this.setTimer();

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
      this.navCtrl.push('QuestionsPage',{Questions:item})
       
      // this.navCtrl.push('TestQuestionsDispalyPage',{Questions:item})


      //this.navCtrl.push('DisplayformsPage',{Questions:item})
    //}else{

      //this.tab.select(1);
     // this.presentConfirm()
      //

   // }  
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Patient Confirm',
      message: 'Please confirm Patient',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          
          }
        },
        {
          text: 'Yes',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }


}
