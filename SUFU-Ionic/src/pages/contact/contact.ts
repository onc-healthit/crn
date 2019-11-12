import { Component } from '@angular/core';
import { NavController,LoadingController, Events } from 'ionic-angular';
import {ContactService} from '../contact/contact.service'
import { Storage } from '@ionic/storage';
import { SmartOnFhire } from '../../services/smartonfhire.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[ContactService]
})
export class ContactPage {

  patientlist:any=[]

  items:any=[]
  alldata:any=[]
  TessandPakages:any[] = [];
  loader:any

  NodataFound:boolean=false
  constructor(public navCtrl: NavController,
    public contactService:ContactService,
    public loadingCtrl:LoadingController,
    public storage: Storage,
    private smartFhirService: SmartOnFhire,
    private event: Events) {

    //console.log("sdkjsdfjas")
    console.log(this.patientlist)
    

   // this.getpatient()

  }

  ionViewWillEnter(){
    console.log("tab 2 click")
    this.loader = this.loadingCtrl.create({
      content: 'please wait..'
  })
  this.loader.present();
  this.storage.get('isFrom').then(data => {
    if(data != 'launcher') {
      this.getpatient();
    }
  })
    
  }




  getpatient(){

  this.smartFhirService.getListOfPatientFromFhir().subscribe(data=>{
    console.log(data)

    // data.sort(function (obj1, obj2) {
    //   return obj1.id - obj2.id;


    // })

    // let num = 3;//number
    // var stringForm = num.toString();
    // console.log(stringForm);

     if(data.total > 0){

    for(let i=0;i<data.entry.length;i++){
      data.entry[i]['PatentId'] = data.entry[i].resource.id
      data.entry[i]['firstname'] = data.entry[i].resource.name[0].given[0]
      data.entry[i]['lastname'] = data.entry[i].resource.name[0].family
      data.entry[i]['birthDate'] = data.entry[i].resource.birthDate
      data.entry[i]['gender'] = data.entry[i].gender
    }

    this.patientlist = data.entry
     console.log(this.patientlist)
    this.alldata = this.patientlist
    this.loader.dismiss();
  }else{
    this.loader.dismiss();
  }
  }, error => {
    this.event.publish('logout');
  })



  }


  gotopatientform(){
     
    this.navCtrl.push("PatientFormPage",{patientdata:undefined})

  }

  selectedPatient(patient:any){

    console.log(patient)

    this.navCtrl.push("PatientFormPage",{patientdata:{patient}})

  }


  initializeItems() {
    this.items = this.patientlist
   
  }
  getItems(ev: any) {
      
    this.initializeItems();
 
   
    let val = ev.target.value;
     //console.log(val)
    if(val == ''){
   
     
      this.TessandPakages = this.alldata
      //console.log(this.TessandPakages)
    }
    else if(val == undefined){
      this.TessandPakages = this.alldata
    } 
    // if the value is an empty string don't filter the items
    else  if (val && val.trim() != '') {
      console.log(val)
      this.TessandPakages = this.items.filter((item) => {
        var searchedText = item['PatentId']+item['birthDate'] + item['firstname'] +item['lastname']
         //console.log(searchedText)
        return (searchedText.toLowerCase().indexOf(val.toLowerCase()  ) > -1);
      })
    }

     console.log(this.TessandPakages)
    if(this.TessandPakages.length == 0){
    this.NodataFound = true
    }else{
     this.NodataFound = false 
    }
    this.patientlist =  this.TessandPakages
    //console.log(this.TessandPakages)
    //console.log(this.TessandPakages.length)
   
  }

}
