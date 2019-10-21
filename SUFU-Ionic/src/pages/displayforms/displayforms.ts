import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController  } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import {DisplayFormsService} from './../displayforms/displayforms.service'
// import { Subscription } from 'rxjs/Subscription';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { PopoverController } from 'ionic-angular';
import {PopoverPage} from '../../pages/popover/popover'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/customValidators';
import { QuestionFormPage } from '../question-form/question-form';


@IonicPage()
@Component({
  selector: 'page-displayforms',
  templateUrl: 'displayforms.html',
  providers:[DisplayFormsService]
})
export class DisplayformsPage {

  //public myForm: FormGroup;

  Questionnarie:any=[]
  questionsarray1: any[]=[]
  linkedQuestions:any[]=[]
  entrydata:any[]=[]
  getid:any
  displayforms1:any[]=[]
  displayforms:any[]=[]
  loader:any
  loader2:any
  PersonDetails:any={}
  personID:any
  errormessage:boolean = false
  items:any=[]
  alldata:any=[]
  Formdata:any[] = [];
  NodataFound:boolean=false
  // private subscription: Subscription;
  // private timer: Observable<any>;
  popover:any
  entryQuestionsdata:any[]=[]
  questionForm: FormGroup;
  searchText:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public popoverCtrl: PopoverController,
    //private formBuilder: FormBuilder,
    public displayFormsService:DisplayFormsService) {

      this.questionForm = new FormGroup({});

     // this.Questionnarie = this.navParams.data.Questions.resource
     // console.log(this.Questionnarie)
     // this.questionsarray1 = this.Questionnarie.item
      
     // this.items = this.Question.item
  }
  //form: FormGroup;

  ionViewWillEnter(){
    this.errormessage = false
    this.PersonDetails = JSON.parse(localStorage.getItem('LoginDetails'));
     this.personID= this.PersonDetails.entry[0].resource.id
    this.loader = this.loadingCtrl.create({
      content: 'please wait..'
  })
  this.loader.present();
   this.getQuestionnaireResponse()
  }

  ionViewDidLoad() {
    
  }

  getQuestionnaireResponse(){
    
    this.displayforms=[]
     this.displayFormsService.getQuestionnaireResponse(this.personID).subscribe(data=>{
       if(data.total >0){
         
        this.entrydata = data.entry 
        
        this.displaytabeldata() 

        // this.displayFormsService.getQuestionnaries().subscribe(data=>{
        //   this.entryQuestionsdata = data.entry
        //   //this.loader.dismiss()
        //    this.displaytabeldata()
        // })
              
       }else{
        this.loader.dismiss()
        this.errormessage = true
       }
     }) 
     
  }

  tempTest:any;
  displaytabeldata(){

    this.displayforms1=[]
    

   for(let i=0;i<this.entrydata.length;i++){
    let names = this.entrydata[i].resource.questionnaire.split("/");
     let id = names[1];
     this.entrydata[i]['id'] =  id

       this.displayFormsService.getQuetions(id).subscribe(data=>{
          this.tempTest = data;
          this.compareArrayToGetAnswer(this.tempTest.item, this.entrydata[i].resource.item);
          
          // data['submitedAns']=this.entrydata[i].resource.item
          this.tempTest['QuestionnaireResponseID'] = this.entrydata[i].resource.id
          this.tempTest['questionnaire'] = this.entrydata[i].resource.questionnaire
          this.tempTest['resourceType'] = this.entrydata[i].resource.resourceType
          this.tempTest['subject'] = this.entrydata[i].resource.subject
          this.tempTest['author'] = this.entrydata[i].resource.author
          this.tempTest['meta']=this.entrydata[i].resource.meta
          this.tempTest['status']=this.entrydata[i].resource.status
          // let names = this.entrydata[i].resource.subject.reference.split("/");
          // let id = names[1];
          // this.tempTest['patientname'] = id
          this.displayforms1.push(this.tempTest)
          this.alldata = this.displayforms
       })
      
   }
   
    setTimeout(() => {
      this.finaldisplaydata()
    }, 1500);   
  }

  compareArrayToGetAnswer(questionJson, answerJson) {
    this.answerObj = undefined;
    if(questionJson.hasOwnProperty('type') && questionJson.type != 'group') {
      let answerData = this.answerObject(answerJson, questionJson.linkId);
      if(answerData) {
        questionJson['answer'] = answerData;
      }

    }

    if(!questionJson.hasOwnProperty('type') && questionJson instanceof Array) {
      questionJson.map(el => this.compareArrayToGetAnswer(el, answerJson));
    }

    if(questionJson.hasOwnProperty('type') && questionJson.type == 'group') {
      questionJson.item.map(el => this.compareArrayToGetAnswer(el, answerJson));
    }
  }

  answerObj:any;
  answerObject(answerJson, compareObj) {
    
    if(answerJson.hasOwnProperty('linkId') && !answerJson.hasOwnProperty('item')) {
      if(answerJson.linkId == compareObj) {
        if(answerJson.hasOwnProperty('answer')) {
          this.answerObj = answerJson.answer;
          return answerJson;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }

    if(answerJson.hasOwnProperty('item')) {
      answerJson.item.map(el => this.answerObject(el, compareObj));
    }

    if(!answerJson.hasOwnProperty('linkId') && answerJson instanceof Array) {
      answerJson.map(el => this.answerObject(el, compareObj));
    }
    return this.answerObj;
  }
 

  finaldisplaydata(){
    this.displayforms = this.displayforms1;
    this.getPatientDetails();
    this.loader.dismiss()
  }

  // setTimer(){
  //   this.timer  = Observable.timer(2000); 
  //   this.subscription = this.timer.subscribe(() => {
  //     // set showloader to false to hide loading div from view after 5 seconds
  //     this.loader2.dismiss();
  // });
  // }

  displayFormdata(data:any, type){


  //   this.loader2 = this.loadingCtrl.create({
  //     content: 'please wait..'
  // })
  // this.loader2.present();
  // this.setTimer();
    this.questionForm = new FormGroup({});
    this.newBuildForm(data.item)
    // console.log('form update', this.newBuildForm(data.item))
    // this.navCtrl.push('DisplayQuestionnaireResponcePage' ,data)
    if(type == 'edit') {
      this.navCtrl.push(QuestionFormPage, {Questions: data, questionForm: this.questionForm, isFrom: 'editForm'});
    }
    
    if(type == "view") {
      this.questionForm.disable();
      this.navCtrl.push(QuestionFormPage, {Questions: data, questionForm: this.questionForm, isFrom: 'viewform'});
    }

  }

  getValidators(itemObj) {
    let validatorList: any = [];
    if(itemObj.hasOwnProperty('required')) {
      validatorList.push(Validators.required);
    }

    if(itemObj.hasOwnProperty('maxLength')) {
      validatorList.push(Validators.maxLength(itemObj.maxLength));
    }

    if(itemObj.hasOwnProperty('minLength')) {
      validatorList.push(Validators.minLength(itemObj.minLength));
    }

    if(itemObj.type == 'url') {
      validatorList.push(CustomValidators.validateEmail);
    }

    return validatorList;
  }

  setValueToForm(item) {
    if(item.hasOwnProperty('answer')) {
      switch(item.type) {
        case('boolean'): {
          if(item.answer[0].valueBoolean == true) {
            return true;
          } else if(item.answer[0].valueBoolean == false) {
            return 'false'
          }
          // return item.answer[0].valueBoolean
        };
        case('decimal'): return item.answer[0].valueDecimal;
        case('integer'): {
          // if(item.text == 'UDI (numbers only, max 14 digits)') {
          //   return item.answer[0].valueString
          // } else {
            return item.answer[0].valueInteger
          // }
        };
        case('date'): return item.answer[0].valueDate;
        case('dateTime'): return item.answer[0].valueDateTime;
        case('time'): return item.answer[0].valueTime;
        case('string'): return item.answer[0].valueString;
        case('text'): return item.answer[0].valueString;
        case('Coding'): return item.answer[0].valueCoding;
        case('Quantity'): return item.answer[0].valueQuantity;
        case('choice'): {
          let value:any ;
          if(item.hasOwnProperty('extension')) {
            for(let ext of item.extension) {
              if(ext.hasOwnProperty('valueCodeableConcept') && 
              ext.valueCodeableConcept.coding[0].code == 'check-boxes') {
                value = [];
                  for(let val of item.answer) {
                    value.push(val.valueCoding.display + '@@' + val.valueCoding.code);
                  }
                  // return value
                } else {
                  
                  value =  item.answer[0].valueCoding.display + '@@' + item.answer[0].valueCoding.code;
                }
            }
            return value;
          } else {
            return item.answer[0].valueCoding.display + '@@' + item.answer[0].valueCoding.code;
          }
        };
      }
    } else {
      return null;
    }

  }

  newBuildForm(item) {
    // if (item.type != "group") {
      this.questionForm.addControl(item.linkId, (new FormControl(this.setValueToForm(item) || null, this.getValidators(item))));
    // }

    if (item.type == 'group') {
      item.item.map(el => this.newBuildForm(el))
    }

    if(!item.hasOwnProperty('type') && item instanceof Array) {
      item.map(el => this.newBuildForm(el))
    }

    return this.questionForm;
  }


  editFormdata(data:any){
    this.navCtrl.push('EditQuestionnaireResponcePage',data)
  }

  getPatientDetailsById(patient) {
    let patientID = patient.subject.reference.split("/")[1];
    this.displayFormsService.getPatentByID(patientID).subscribe(data => {
      if(data) {
        let pName = data.name[0].given.join(' ') + ' ' + data.name[0].family;
        patient['patientname'] = pName;

      }
    }, error => {
    })
  }

  getPatientDetails() {
    for(let item of this.displayforms) {
      this.getPatientDetailsById(item);
    }
  }

  // initializeItems() {
  //   this.items = this.displayforms
  // }

  // getItems(ev: any) {
  //   this.initializeItems();
  //   let val = ev.target.value;
  //   if(val == ''){
  //     this.Formdata = this.alldata
  //   }
  //   else if(val == undefined){
  //     this.Formdata = this.alldata
  //   } 
  //   else  if (val && val.trim() != '') {
  //     this.Formdata = this.items.filter((item) => {
  //       var searchedText = item['id']+item['patientname'] + item['title']
  //       return (searchedText.toLowerCase().indexOf(val.toLowerCase()  ) > -1);
  //     })
  //   }
  //   if(this.Formdata.length == 0){
  //   this.NodataFound = true
  //   }else{
  //    this.NodataFound = false 
  //   }
  //   this.displayforms =  this.Formdata
  // }

  presentPopover(data:any){
     this.popover =  this.popoverCtrl.create(PopoverPage,{data:data});
  this.popover.present({
    //ev: myEvent
  });
  //this.popover.dismiss(this.navCtrl.push('DisplayQuestionnaireResponcePage',data))
  //this.navCtrl.push('DisplayQuestionnaireResponcePage',data)
  }

}
