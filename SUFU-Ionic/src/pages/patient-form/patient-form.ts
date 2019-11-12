import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Tabs} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PatientFormService} from './patient-form.service' 

//import {TabsPage} from '../../pages/tabs/tabs'

/**
 * Generated class for the PatientFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-form',
  templateUrl: 'patient-form.html',
  providers :[PatientFormService]
})
export class PatientFormPage {

    tab:Tabs;

  user: FormGroup;
   patientdata:any={} 

   firstname:any
   lastname:any
   birthDate:any
   gender:any
   language:any
   ethnicity:any
   race:any
   BirthSex:any
   hasPatients:boolean;
   height:any
   HeightUnitofMeasure:any
   Weight:any
   WeightUnitofMeasure:any
   //joinDate:any
   displayinfo:boolean
   displayWeight:any
   displayWeightUnitofMeasure:any
   dipslayHeight:any
   dipslayHeightUnitofMeasure:any
   checkfomvalidation:boolean = true
   raceitemarray:any=[]

   patientPayload:any={}
   Urlconstent:any='http://hl7.org/fhir/StructureDefinition/'
   extensionObj:any=[]
   raceObj:any={}
   EthnicityObj:any={}
   heightObj:any={}
   weightObj:any={}
   heightUnitOfMeasureCodeObj:any={}
   weightUnitOfMeasureeObj:any={}
   racecoding:any[]=[]

   displayrace:any=[
    { val: 'American Indian or Alaska Native', isChecked: false },
    { val: 'Asian', isChecked: false },
    { val: 'Black or African American', isChecked: false },
    { val: 'Native Hawaiian or other Pacific Islander', isChecked: false },
    { val: 'White', isChecked: false },
    { val: 'Other race', isChecked: false },
    { val: 'Unknown', isChecked: false },
    { val: 'Asked but no answer', isChecked: false }
   ];
  //  public form = [
  //   { val: 'Pepperoni', isChecked: true },
  //   { val: 'Sausage', isChecked: false },
  //   { val: 'Mushroom', isChecked: false }
  // ];

  constructor(public navCtrl: NavController, public navParams: NavParams,  public fb: FormBuilder,
    public patientFormService:PatientFormService
    ) {
    
      this.tab = this.navCtrl.parent;
      console.log(this.tab)
    console.log(this.navParams.data.patientdata)
    this.patientdata = this.navParams.data.patientdata
    if(this.navParams.data.patientdata != undefined){
   
    if(this.patientdata == undefined){
          this.displayinfo = false
    }else{
           this.displayinfo = true
    }
    console.log(this.patientdata)
    }

    this.user = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required],
      EmailAddress:['',Validators.required],
      race:[],
      ethnicity:[],
      height:[],
      heightUnitOfMeasure :[],
      weight:[],
      weightUnitOfMeasure :[],
      StreetAddress:[],
      PatientMRN:[],
      City:[],
      State:[],
      ZipCode:[]
     
    

  });

  }

  form: FormGroup;

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientFormPage');
    console.log('patientdata', this.patientdata);
    //console.log(this.patientdata.ethnicity)
    
    //console.log(obj)
    
    if(this.patientdata!== undefined){
      this.hasPatients = true;
      console.log(this.patientdata)
      //var obj = JSON.parse(this.patientdata.language);
      this.firstname = this.patientdata.patient.firstname
      this.lastname = this.patientdata.patient.lastname
      this.gender = this.patientdata.patient.resource.gender
      this.birthDate = this.patientdata.patient.birthDate
      console.log(this.patientdata.patient.resource.extension)
      // for(let i=0; i<this.patientdata.patient.resource.extension.length;i++){
      //    if(this.patientdata.patient.resource.extension[i].url == 'http://hl7.org/fhir/StructureDefinition/us-core-race'){
      //      for(let j=0;j<this.patientdata.patient.resource.extension[i].valueCodeableConcept.coding.length;j++){
      //       this.raceitemarray.push(this.patientdata.patient.resource.extension[i].valueCodeableConcept.coding[j].display) 
      //      }
      //    }
      // }

      for(let item of this.patientdata.patient.resource.extension) {
        if(item.url.includes('race')) {
          for(let j=0;j<item.valueCodeableConcept.coding.length;j++){
            this.raceitemarray.push(item.valueCodeableConcept.coding[j].display)
           }
           this.race = this.raceitemarray.join(",")
        }
        if(item.url.includes('ethnicity')) {
          this.ethnicity = item.valueCodeableConcept.coding[0].display
        }
        if(item.url.includes('height')) {
          this.dipslayHeight = item.valueCodeableConcept.coding[0].display
        }
        if(item.url.includes('heightUnit')) {
          this.dipslayHeightUnitofMeasure = item.valueCodeableConcept.coding[0].display
        }
        if(item.url.includes('weight')) {
          this.displayWeight = item.valueCodeableConcept.coding[0].display
        }
        if(item.url.includes('weightUnit')) {
          this.displayWeightUnitofMeasure = item.valueCodeableConcept.coding[0].display
        }
      }
     
      // this.ethnicity = this.patientdata.patient.resource.extension[1].valueCodeableConcept.coding[0].display
      // this.race = this.raceitemarray.join(",")
      // this.dipslayHeight = this.patientdata.patient.resource.extension[2].valueCodeableConcept.coding[0].display
      // this.dipslayHeightUnitofMeasure = this.patientdata.patient.resource.extension[3].valueCodeableConcept.coding[0].display
      // this.displayWeight = this.patientdata.patient.resource.extension[4].valueCodeableConcept.coding[0].display
      // this.displayWeightUnitofMeasure  = this.patientdata.patient.resource.extension[5].valueCodeableConcept.coding[0].display
      // console.log(this.race)

      // if(this.patientdata.gender == 'MALE'){
      //   this.BirthSex = "M"
      // }else{
      //   this.BirthSex = "F"
      // }
      // this.joinDate = this.patientdata.joinDate
       console.log(this.ethnicity)
      
      

      this.user.value.FirstName = this.patientdata.givenName
      this.user.value.LastName = this.patientdata.familyName
      this.user.value.birthDate = this.patientdata.birthDate
      this.user.value.gender = this.patientdata.gender
      

    }else{

      this.hasPatients = false;
      this.firstname = ""
      this.lastname = ""
      this.gender = ""
      this.birthDate = ""
      this.language = ""
      this.ethnicity = ""
      this.race = ""
      this.BirthSex =""

    } 

     // console.log(this.joinDate)
    
    
  

    //console.log(this.user.value)
  }

  backpage(valueboolen:boolean){
    console.log(valueboolen)
    this.checkfomvalidation = valueboolen
    this.navCtrl.pop();
  }

  submit(){

    if(this.hasPatients){
      localStorage.setItem('Patientdetails', JSON.stringify(this.patientdata)); 

      console.log(this.user.value)
      this.navCtrl.pop();
      ///this.navCtrl.setRoot('AboutPage')
      this.tab.select(0);
    }else{
      this.navCtrl.pop();
    }
    

  }
  selectedrace(event:any){
 // alert("event")
    console.log(event)
    for(let i=0;i<event.length;i++){
     this.racecoding.push({
      "system":"http://hl7.org/fhir/v3/vs/Race",
      "code":event[i],
      "display":event[i]
    })
    }

    ///console.log(this.racecoding)

    this.raceObj = {
      "url":this.Urlconstent +"us-core-race",
      "valueCodeableConcept":{ "coding":this.racecoding
        
      }
    }
    this.extensionObj.push(this.raceObj)
    console.log(this.extensionObj)

  }

  selectedEthnicity(event:any){
    console.log(event)
    var EthnicityCode ={"system":"http://hl7.org/fhir/v3/vs/Ethnicity",
    "code":event,
    "display":event

    }

    this.EthnicityObj = {
      "url":this.Urlconstent +"us-core-ethnicity",
      "valueCodeableConcept":{ "coding":EthnicityCode
        
      }
    }
    this.extensionObj.push(this.EthnicityObj)

  }

  SubmitPatienForm(){
    console.log('onsubmit form', this.user);


      console.log(this.user.value.height)
      if(this.user.value.height !== null){
        var heightCode ={"system":"http://hl7.org/fhir/v3/vs/Height",
        "code":this.user.value.height,
        "display":this.user.value.height
        }
        this.heightObj ={
          "url":this.Urlconstent +"us-core-vitalsigns",
          "valueCodeableConcept":{ "coding":heightCode
            
          }
        }
        this.extensionObj.push(this.heightObj)

      }
      console.log(this.user.value.heightUnitOfMeasure )
      if(this.user.value.heightUnitOfMeasure  !== null){

        var heightUnitOfMeasureCode ={"system":"http://hl7.org/fhir/v3/vs/Height_Unit_Of_Measure",
        "code":this.user.value.heightUnitOfMeasure,
        "display":this.user.value.heightUnitOfMeasure
        }
        this.heightUnitOfMeasureCodeObj ={
          "url":this.Urlconstent +"us-core-vitalsigns",
          "valueCodeableConcept":{ "coding":heightUnitOfMeasureCode
            
          }
        }
        this.extensionObj.push(this.heightUnitOfMeasureCodeObj)

      }
      console.log(this.user.value.weight)
      if(this.user.value.weight !== null){
        var weightCode ={"system":"http://hl7.org/fhir/v3/vs/Weight",
        "code":this.user.value.weight,
        "display":this.user.value.weight
        }
        this.weightObj ={
          "url":this.Urlconstent +"us-core-vitalsigns",
          "valueCodeableConcept":{ "coding":weightCode
            
          }
        }
        this.extensionObj.push(this.weightObj)
      }
      console.log(this.user.value.weightUnitOfMeasure )
      if(this.user.value.weightUnitOfMeasure !== null){
        var weightUnitOfMeasureCode ={"system":"http://hl7.org/fhir/v3/vs/Weight_Unit_Of_Measure",
        "code":this.user.value.weightUnitOfMeasure,
        "display":this.user.value.weightUnitOfMeasure
        }
        this.weightUnitOfMeasureeObj ={
          "url":this.Urlconstent +"us-core-vitalsigns",
          "valueCodeableConcept":{ "coding":weightUnitOfMeasureCode
            
          }
        }
        this.extensionObj.push(this.weightUnitOfMeasureeObj)
      }

      this.patientPayload = {
        "resourceType":"Patient",
        "name":[{
          "family": this.user.value.lastName,
          "given":[this.user.value.firstName] 
        }],
        "gender":this.user.value.sex,
        "birthDate":this.user.value.birthDate,
        ///"extension":[{ "valueCodeableConcept":{"coding":[{"code":this.user.value.race, "display":this.user.value.race
     // }]}}]
        "extension":this.extensionObj,
        address: [
          {
            line: [this.user.value['StreetAddress']],
            city: this.user.value['city'],
            state: this.user.value['state'],
            postalCode: this.user.value['ZipCode']
          }],
          "identifier": [
            {
              "value": [this.user.value['PatientMRN']]
            }]
            
         
      }


      console.log("/////////////////////")
      console.log(this.patientPayload)
      console.log(JSON.stringify(this.patientPayload))

    //this.checkfomvalidation = valueboolen
    console.log(this.checkfomvalidation)
     console.log(this.user.value)
     if(this.checkfomvalidation !== false){
       if(this.user.value.race !== null){
      var str =  this.user.value.race.join(",")
      console.log(str)
      this.user.value.race = str
       }
      console.log(this.user.value)
     this.patientFormService.postForms(this.patientPayload).subscribe(data=>{
  
       console.log(data)
       localStorage.setItem('Patientdetails', JSON.stringify(data)); 
       this.navCtrl.pop();
      this.tab.select(0);

     })

  }
}

}
