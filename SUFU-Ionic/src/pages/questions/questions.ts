import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Tabs,AlertController  } from 'ionic-angular';
import {QuestionaryService} from './../questions/questions.service'
//import { CompileMetadataResolver } from '@angular/compiler';
import { ActionSheetController } from 'ionic-angular';
import {  FormGroup } from '@angular/forms';
//import { timeInterval } from 'rxjs/operator/timeInterval';
//import { ColdObservable } from 'rxjs/testing/ColdObservable';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner'

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
  providers:[QuestionaryService]
})
export class QuestionsPage {

  public myForm: FormGroup;

  tab:Tabs;
  BrandName:any
  VersionorModel:any
  CompanyName:any
  DeviceDescription:any
  PrimaryDeviceIdentifierNumber:any
  WhatMRIsafety:any
  Devicerequired:any
  Devicelabeled:any
  ForSingleUse:any
  Kit:any
  CombinationProduct:any
  HumanCell:any
  GMDN:any
  FDAProductCode:any
  
  dropdwonansdisplay:any=[]
  
  validationpass:boolean = false
 
  ansEveryQueatiosn:boolean = false
  eventvalue:any
  barecodedata:any

  selecetdtext:any
  displayUDINUmberValidation:boolean = false
  //linked
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  loader:any
  Question:any={}
  items:any=[]
  enablewhen:any=[]
  groupenable:any=[]
  Questionnarie:any= {}
  groupItem:any[]=[]
  displayQuestionitems:any[]=[]
  questionlinkID:any
  AnswerArry:any[]=[]

  AnswerArry1:any[]=[]
  testarray1:any[]=[]
  public isLoading: boolean = false;
  public  issaveLoading :boolean = false
  LinkedTypeQuestionsRepete:any={}
  RepeatingItem:any[]=[]

  selectYes:boolean = false
  selectNo:boolean = false
  QuestionnaireResponse:any={}
  UsergrouplinktextAns:any

  testarray:any[]=[]
   passingarray:any[]=[]
   createDummyAns:any[]=[]

   titleinfo:any
   displaydeviceInfo:boolean=false
   UdiID:any

   gender:any="MALE"
  validatefirttime:boolean = true
   deviceInformation:any={}

   enterUidNumer:boolean = false
   PatientDetails:any={}
   PersonDetails:any={}
   personId:any
   patientName:any
   barcodeScannerOptions: BarcodeScannerOptions;
   encodeText:string
   encodeddata:any={}
   scaneddata:any={}
   unvantedObject:any=[]
   linkedquestionNew:any=[]
   displaylinkedQueston:any=[]
   displayGroupItem:any=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public actionSheetCtrl: ActionSheetController,
    //private formBuilder: FormBuilder,
    private barcodeScanner: BarcodeScanner,
    public QuestionaryService:QuestionaryService) {
      this.tab = this.navCtrl.parent;
      this.barcodeScannerOptions = {
        prompt:'Scan Barcode',
        showTorchButton: true,
        showFlipCameraButton: true
      };
      this.PatientDetails = JSON.parse(localStorage.getItem('Patientdetails'));
      if(this.PatientDetails !=null){

      }else{
        this.tab.select(1);
      }
    //console.log(this.navParams.data)
    this.Questionnarie = this.navParams.data.Questions.resource
    this.items = this.Question.item
    //this.presentActionSheet()
    console.log(this.Questionnarie)
    this.titleinfo = this.Questionnarie.title
    console.log(this.titleinfo)
    if(this.titleinfo == 'Device Information'){
      this.displaydeviceInfo=true
    }else{
      this.displaydeviceInfo=true
    }
    //console.log(this.items)
  }

  form: FormGroup;

  ionViewDidLoad() {
    this.loader = this.loadingCtrl.create({
      content: 'please wait..'
  })
  this.loader.present();
    console.log('ionViewDidLoad QuestionsPage');
    this.quetionsdisplay()
  }

  quetionsdisplay(){

    this.enablewhen = []
   
    for(let i=0;i<this.Questionnarie.item.length;i++){
      this.Questionnarie.item[i]['errorvalidation'] = false
      this.Questionnarie.item[i]['answer'] = [] 
      this.Questionnarie.item[i]['Displayform'] = false
      //this.Questionnarie.item[i]['displayAddButton'] = true
      this.Questionnarie.item[i]['UserAns'] = {}
      //this.Questionnarie.item[i]['choiceUserOption'] = []
      if( this.Questionnarie.item[i].type == "boolean"){
       this.Questionnarie.item[i]['answer']  = [{"valueBoolean": null}]
       this.Questionnarie.item[i]['Yes']  = true
       this.Questionnarie.item[i]['No']  = false
      }
      else if(this.Questionnarie.item[i].type == "choice"){

       this.Questionnarie.item[i]['answer']  = [{"valueCoding":{
              "code":"",
              "display":"" 
             }}]

            //    console.log("///////////////////////////////////////////////////")
            // console.log(this.Questionnarie.item[i].answerOption)
      }
      else if(this.Questionnarie.item[i].type == "date"){
       this.Questionnarie.item[i]['answer'] = [{"valueDate" : ''}]        
      }else if(this.Questionnarie.item[i].type == "string"){
        this.Questionnarie.item[i]['answer'] =[{"valueString" : ''}]
      }
      else if(this.Questionnarie.item[i].type == "integer"){
       this.Questionnarie.item[i]['answer'] =[{"valueString" : ''}]         
      }
      else if(this.Questionnarie.item[i].type == "text"){
        this.Questionnarie.item[i]['answer'] =[{"valueString" : ''}]         
       }
       
// console.log(".................group items ........................................................................")
      //console.log(this.groupItem)
      else if(this.Questionnarie.item[i].type == "group"){

         this.groupItem = this.Questionnarie.item[i].item

         for(let k=0;k<this.groupItem.length;k++){

          if(this.groupItem[k].answerOption !== undefined){
            for(let j=0;j<this.groupItem[k].answerOption.length;j++){
              this.groupItem[k].answerOption[j].valueCoding['userSelected'] = false
            }
          }
             this.RepeatingItem=[]
             this.groupItem[k]['errorvalidation'] = false
             this.groupItem[k]["openLinkQuetions"] = false
            this.groupItem[k]['linkedQuestions']=[]
            this.groupItem[k]['likedquestions2']=[]

            if(this.groupItem[k].enableWhen != undefined ){
             // console.log(this.groupItem[k].enableWhen)
              this.groupItem[k]["enablequestions"] = false
            }else{
              this.groupItem[k]['enablequestions'] = true
            }
            if(this.groupItem[k].enableWhen !== undefined){
              this.groupenable.push(this.groupItem[k])
              //console.log(this.enablewhen)
            }
           this.groupItem[k]['answer']  = [{"valueString": ''}]
           if(this.groupItem[k].type == 'boolean'){
            this.groupItem[k]['answer']  = [{"valueBoolean": null}]

           }else if(this.groupItem[k].type == 'choice'){
            this.groupItem[k]['answer'] =[{"valueCoding":{
               "code":"",
               "display":"" 
             }}]
             
           }else if(this.groupItem[k].type == 'text'){
            this.groupItem[k]['answer']  = [{"valueString" : ''}]
           }else if(this.groupItem[k].type == 'decimal'){
            this.groupItem[k]['answer']  = [{"valueInteger" : ''}]
           }else if(this.groupItem[k].type == 'string'){
            this.groupItem[k]['answer']  = [{"valueString": ''}]
           }else if(this.groupItem[k].type == 'integer'){
            this.groupItem[k]['answer']  = [{"valueString": ''}]
           }else if(this.groupItem[k].type == 'date'){
            this.groupItem[k]['answer']  = [{"valueDate": ''}]
           }else if(this.groupItem[k].type == 'group'){
             
             for(let e=0;e<this.groupItem[k].item.length;e++){
               if(this.groupItem[k].item[e].type=='text'){
                this.groupItem[k].item[e]['answer']  = [{"valueString" : ''}]
               }else if(this.groupItem[k].item[e].type == 'choice'){
                this.groupItem[k].item[e]['answer']  =[{"valueCoding":{
                  "code":"",
                  "display":"" 
                }}]
               }
             }


           }
    
         }

         for(let i=0;i<this.groupItem.length;i++ ){
          this.RepeatingItem=[]
           //this.likedquestions2=[]
          for(let j=0;j<this.groupenable.length;j++){
            if( this.groupItem[i].linkId == this.groupenable[j].enableWhen[0].question){
             this.RepeatingItem.push(this.groupenable[j])
             //console.log(this.RepeatingItem)
              this.groupItem[i].linkedQuestions.push(this.groupenable[j])

             // this.items[i].likedquestions2.push(this.enablewhen[j])
              
              //
              this.groupItem[i].likedquestions2=[{'link':this.RepeatingItem}]
              
            }
          }
          
        }

      }

      console.log(this.groupItem) 

 ///////////////////////////////////////////////// end of group item //////////////////////////////////////////////////     
      // else{
      //  this.Questionnarie.item[i]['answer'] =[{"valueString": ''}]  
      // }
     
    }
     //console.log(this.Questionnarie)
    this.items= this.Questionnarie.item
    console.log(this.items)
     
    for(let i=0;i<this.items.length;i++){

         if(this.items[i].answerOption !== undefined){
           for(let j=0;j<this.items[i].answerOption.length;j++){
             this.items[i].answerOption[j].valueCoding['userSelected'] = false
           }
         }
         

     // console.log(this.items[i].enableWhen)
     this.items[i]["OneRepeatingItem"] = false
      this.items[i]["displayAddButton"]= true
     this.items[i]["openLinkQuetions"] = false
     this.items[i]["linkedQuestions"] = []
     this.items[i]['likedquestions2']=[]
      if(this.items[i].enableWhen != undefined ){
        this.items[i]["enablequestions"] = false
      }else{
        this.items[i]['enablequestions'] = true
      }
      if(this.items[i].enableWhen !== undefined){
        this.enablewhen.push(this.items[i])
        //console.log(this.enablewhen)
      }
    }
   // console.log(this.enablewhen)
     for(let i=0;i<this.items.length;i++ ){
       this.RepeatingItem=[]
        //this.likedquestions2=[]
       for(let j=0;j<this.enablewhen.length;j++){
         if( this.items[i].linkId == this.enablewhen[j].enableWhen[0].question){
          this.RepeatingItem.push(this.enablewhen[j])
           this.items[i].linkedQuestions.push(this.enablewhen[j])
          // this.items[i].likedquestions2.push(this.enablewhen[j])
           
           //
           this.items[i].likedquestions2=[{'link':this.RepeatingItem}]
           
         }
       }
       
     }

     console.log("////////////////////////////////////////////")
      console.log(this.items)
      this.displayQuestionitems = this.items
      // console.log(this.displayQuestionitems)
      this.loader.dismiss();
  }


  enableQuestions(event:any,item:any){
    this.selectYes = true

    console.log(event)
    
    this.questionlinkID = item.linkId
    //this.enablewhenQuestion = true
    for(let i=0;i<this.items.length;i++){
      if(item.linkId == this.items[i].linkId){
            this.items[i].errorvalidation = false
            this.items[i].answer[0].valueBoolean =  event
           // console.log( this.items[i].answer[0].valueBoolean)
            
          if(event == true){
            this.items[i].openLinkQuetions = true
          }
          else{
            this.items[i].openLinkQuetions = false  
          } 
    }
  } 
  }

  disableQuestions(event:any,item:any){
    //console.log(event.value)
    console.log(item)
    this.questionlinkID = item.linkId
    //this.enablewhenQuestion = true
    for(let i=0;i<this.items.length;i++){
      if(item.linkId == this.items[i].linkId){
            this.items[i].errorvalidation = false
            this.items[i].answer[0].valueBoolean =  event
            
          if(event == true){
            this.items[i].openLinkQuetions = true
          }
          else{
            this.items[i].openLinkQuetions = false  
          } 
    }
  }

   if(item.linkedQuestions.length != 0 ){
     for(let j=0;j<item.linkedQuestions.length;j++){
       if(item.linkedQuestions[j].type == 'date'){
         item.linkedQuestions[j].answer[0].valueDate = ""
         item.linkedQuestions[j].errorvalidation = false
       }
      //  if(item.linkedQuestions[j].type == 'choice'){
      //   item.linkedQuestions[j].errorvalidation = false
      //   item.linkedQuestions[j].answer= [{"valueCoding":{
      //     "code":"",
      //     "display":"" 
      //    }}]
      //  }

     }
   }
    console.log(item)

  }

  checkboxOptionsGroup(item:any,choice:any,mainitem:any){

  }

  friedFun(event,item:any,choice:any){
    //this.AnswerArry=[]
    // console.log(choice)
     console.log(event)
     console.log(item)
    // this.AnswerArry.push(choice)
      // if(event.valueCoding.userSelected == false){
      //   event.valueCoding.userSelected = true
      //   // if(item.answer[0]== undefined){
      //   //   item.answer
      //   // }
      //  if( item.answer[0].valueCoding.display == ""){
      //   item.answer[0].valueCoding.display = event.valueCoding.display
      //   item.answer[0].valueCoding.code = event.valueCoding.code
      //  }else{
      //   var valueCoding:{} = event.valueCoding
      //   item.answer.push(({'valueCoding':valueCoding}))
      //  }


      // }else{
      //   event.valueCoding.userSelected = false
      // }
     
      // console.log(item)

  }

   groupItemDropdwonIptions( event,item:any){
  console.log(event)
      
    item.answer = []
    item.answer =  event
    
    console.log(item.answer)
    
   }
  groupItemDropdwonIptionsduplicate(){
    console.log("selected dropdwon single")
  }


  // GroupItemcheckboxOptionsdisplayBasedOnAns(){
   
    
  // }


  GroupItemcheckboxOptions(item:any,choice:any,mainitem:any){
     console.log("selected check Box in side  options")
    console.log(mainitem)
    console.log(choice)
   console.log(item)
    //var index: number
    if(choice.valueCoding.userSelected == true){
      if(item.answer[0] == undefined){
        item.answer = [
          { 
           "valueCoding":{
            "code":"",
            "display":"" 
           }  
          }
        ]
      }
       if(item.answer[0].valueCoding.display == ""){
         item.answer[0].valueCoding.display = choice.valueCoding.display
         item.answer[0].valueCoding.code = choice.valueCoding.code
       }else{
        var valueCoding:{} = choice.valueCoding
        item.answer.push({'valueCoding':valueCoding})
       }

      }

   else{
     this.testarray= []
     this.passingarray=[]
     console.log()

       for(let i=0;item.answer.length;i++){
          if(item.answer[i].valueCoding.code == choice.valueCoding.code){
            item.answer.splice(i,1)
            break
          }
       }             
 
      console.log(item)

   }
 console.log(this.items)

  }

  checkboxOptions(item:any,choice:any,mainitem:any){

    console.log(mainitem)
    console.log(choice)
   console.log(item)
   // var index: number

    if(choice.valueCoding.userSelected == true){
      if(item.answer[0] == undefined){
        item.answer = [
          { 
           "valueCoding":{
            "code":"",
            "display":"" 
           }  
          }
        ]
      }
       if(item.answer[0].valueCoding.display == ""){
         item.answer[0].valueCoding.display = choice.valueCoding.display
         item.answer[0].valueCoding.code = choice.valueCoding.code
       }else{
        var valueCoding:{} = choice.valueCoding
        item.answer.push({'valueCoding':valueCoding})
       }

      }
      else{
        this.testarray= []
        this.passingarray=[]
        console.log()
   
          for(let i=0;item.answer.length;i++){
             if(item.answer[i].valueCoding.code == choice.valueCoding.code){
               item.answer.splice(i,1)
               break
             }
          }             
    
         console.log(item)
   
      }
    // if(choice.valueCoding.userSelected == true){

    //    // console.log(choice.valueCoding.userSelected)
    //     for(let i=0;i<this.items.length;i++){
    //       if(item.linkId == this.items[i].linkId){
        
    //           console.log(this.items[i].choiceUserOption[0].valueCoding)
               
    //        // console.log(this.items[i].answer[0].display)
    //       if(this.items[i].choiceUserOption[0] == undefined){
    //           this.items[i].choiceUserOption = [
    //             {
                  
    //              "valueCoding":{
    //               "code":"",
    //               "display":"" 
    //              }
                  
    //             }
    //           ]
    //         }

    //         // if(this.items[i].answer[0] == undefined){
    //         //   this.items[i].answer = [
    //         //     {
                  
    //         //      "valueCoding":{
    //         //       "code":"",
    //         //       "display":"" 
    //         //      }
                  
    //         //     }
    //         //   ]
    //         // }

    //         console.log( this.items[i].choiceUserOption.valueCoding)
           
    //         if(this.items[i].choiceUserOption[0].valueCoding.display == ""){

    //           this.items[i].choiceUserOption[0].valueCoding.code =   choice.valueCoding.code
    //           this.items[i].choiceUserOption[0].valueCoding.display =   choice.valueCoding.display
    //             for(let k=0;k<mainitem.linkedQuestions.length;k++){
    //                if(mainitem.linkedQuestions[k].linkId == item.linkId){
    //                mainitem.linkedQuestions[k].errorvalidation = false                     

    //                }

    //             }
               
    //         }
            
    //         else{

    //           var valueCoding:{} = choice.valueCoding
    //           this.items[i].choiceUserOption.push({'valueCoding':valueCoding})
    //         }
            
    //        }
    //      }
         


    // }else{
    //   this.testarray= []
    //   this.passingarray=[]
    //   console.log()
    //   for(let i=0;i<this.items.length;i++){
    //     if(item.linkId == this.items[i].linkId){
    //           console.log(this.items[i].choiceUserOption)
    //          this.AnswerArry = this.items[i].choiceUserOption
    //            for(let k=0;k<this.items[i].choiceUserOption.length;k++){
    //                this.testarray.push(this.items[i].choiceUserOption[k].valueCoding) 
    //            }
    //            console.log(this.testarray)
    //          console.log(this.AnswerArry)

  
    //       var index = this.testarray.findIndex(item => item.code === choice.valueCoding.code );
    //       if(index> -1){

    //         console.log("inside")
    //         this.testarray.splice(index,1)
    //         console.log("test array ")
    //       console.log(this.testarray)
    //         for(let t=0;t<this.testarray.length;t++){
    //           this.passingarray.push({'valueCoding':this.testarray[t]})

    //           //this.items[i].answer.push({'valueCoding':valueCoding})
    //         }
    //         console.log(this.passingarray)
    //         this.items[i].choiceUserOption = this.passingarray
    //         console.log(this.items[i].choiceUserOption)
    //         if(this.items[i].choiceUserOption[0] == undefined){
    //           for(let k=0;k<mainitem.linkedQuestions.length;k++){
    //             if(mainitem.linkedQuestions[k].linkId == item.linkId){
    //             mainitem.linkedQuestions[k].errorvalidation = true                   

    //             }

    //          }

    //         }
            
            
    //        }else{

    //         console.log("outside")
    //        }
          
    //      }
    //    }


   // }
  console.log(this.items)

  }


  enablelinkedstateChange( event:any,item:any){

    //this.LinkedTypeQuestionsRepete = item.linkedQuestions
    console.log(event)
    console.log(item)
    this.questionlinkID = item.linkId
    //this.enablewhenQuestion = true
    for(let i=0;i<this.items.length;i++){
      if(item.linkId == this.items[i].linkId){
           
            this.items[i].answer[0].valueBoolean =  event
            
          if(event.value == true){
            this.items[i].openLinkQuetions = true
          }
          else{
            this.items[i].openLinkQuetions = false  
          } 
    }
  }

  }

  disablelinkedstateChange( event:any,item:any){

    console.log(event)
    console.log(item)
    this.questionlinkID = item.linkId
    //this.enablewhenQuestion = true
    for(let i=0;i<this.items.length;i++){
      if(item.linkId == this.items[i].linkId){
           
            this.items[i].answer[0].valueBoolean =  event
            
          if(event.value == true){
            this.items[i].openLinkQuetions = true
          }
          else{
            this.items[i].openLinkQuetions = false  
          } 
    }
  }

  }


  changeFolder2(event:any,linkitem:any){
   
    console.log(event)
    console.log(linkitem)
    for(let i=0;i<this.items.length;i++){
      if(this.items[i].enableWhen !== undefined){
      if(linkitem.linkId == this.items[i].linkId){
        console.log("//////////////////////////////////////////////////")
        
        this.items[i].answer[0].valueString = event
        console.log(this.items[i])
       
         break
      }}}
    
  }
  changeFolder1(event:any,linkitem:any){

    console.log(event)
    console.log(linkitem)
    for(let i=0;i<this.items.length;i++){
      if(this.items[i].enableWhen !== undefined){
      if(linkitem.linkId == this.items[i].linkId){
        console.log("//////////////////////////////////////////////////")
        
        this.items[i].answer[0].valueString = event
        console.log(this.items[i])
       
         break
      }}}

    console.log(this.items)
  

  }
    

  changeFolder(event:any,Groupitem:any){

    console.log(event)
    console.log(Groupitem)
    for(let i=0;i<this.items.length;i++){
      if(Groupitem.linkId == this.items[i].linkId){
       // console.log(this.item[i])

        for(let j=0;j<this.items[i].item.length;j++){
          //console.log(this.items[i].item[j])
          if(this.items[i].item[j].type == 'open-choice'){
            this.items[i].item[j].answer[0].valueString = event
          }
        }

      }}

    console.log(this.items)
  }

  displaycontent(item:any){

    console.log(this.items)

    console.log(item)
    for(let i=0;i<this.items.length;i++){

        if(this.items[i].text == "UDI (numbers only, max 14 digits)"){
          this.UdiID= this.items[i].answer[0].valueInteger
        }

         

      if(item.linkId == this.items[i].linkId){
        console.log(this.UdiID)
        if(this.UdiID != ""){
          this.enterUidNumer = false
          if(item.openLinkQuetions == false){
            this.items[i].openLinkQuetions = true
          }
          else{
            this.items[i].openLinkQuetions = false  
          } 
        }else{
          console.log("not uidi number")
          this.enterUidNumer = true
        }
    }
  }


  this.QuestionaryService.getdeviceInfo(this.UdiID).subscribe(data=>{
    console.log(data)
    this.deviceInformation = data.map
    console.log(this.deviceInformation.gudid.map.device.map.versionModelNumber)
    //this.BrandName = 
    item.linkedQuestions[0].answer[0].valueString = this.deviceInformation.gudid.map.device.map.brandName 
    item.linkedQuestions[1].answer[0].valueString =  this.deviceInformation.gudid.map.device.map.versionModelNumber
    item.linkedQuestions[2].answer[0].valueString  =  this.deviceInformation.gudid.map.device.map.companyName
    item.linkedQuestions[3].answer[0].valueString  =  this.deviceInformation.gudid.map.device.map.deviceDescription
    //item.linkedQuestions[4].answer[0].valueString =     this.deviceInformation.gudid.map.device.map.
  
    item.linkedQuestions[13].answer[0].valueString =   this.deviceInformation.productCodes.myArrayList[0].map.productCode
  })


  }


 






//////////////////////////////////////////////////////////////

stateChange(event:any,item:any){

  console.log(event)
  console.log(item)
  item.errorvalidation = false
  console.log(item.likedquestions2.link)
  if(event == 'Yes'){
    this.eventvalue = true
  }else{
    this.eventvalue = false
  }
  this.questionlinkID = item.linkId
  //this.enablewhenQuestion = true
  for(let i=0;i<this.items.length;i++){
    if(item.linkId == this.items[i].linkId){
         
          this.items[i].answer[0].valueBoolean =  this.eventvalue
          
        if(this.eventvalue == true){
          this.items[i].openLinkQuetions = true
        }
        else{
          this.items[i].openLinkQuetions = false  
        } 
  }
}

}

stateChangetoggol(event:any,item:any,mainitem:any){
  console.log(this.groupItem)
   console.log(mainitem)
   console.log(event.checked); 
  console.log(item)

  for(let i=0;i<mainitem.likedquestions2[0].link[0].item.length;i++){
    if(item.linkId == mainitem.likedquestions2[0].link[0].item[i].linkId){
         
      mainitem.likedquestions2[0].link[0].item[i].answer[0].valueBoolean =  event.checked
          
        if(event.checked == true){
          mainitem.likedquestions2[0].link[0].item[i].openLinkQuetions = true
        }
        else{
          mainitem.likedquestions2[0].link[0].item[i].openLinkQuetions = false  
        } 
        console.log(mainitem.likedquestions2[0].link[0].item[i])
  }
}

}

stateChangetoggolgroup(event:any,item:any,mainitem:any){
  console.log(this.groupItem)
  console.log(mainitem)
  console.log(event.checked); 
 console.log(item)

 for(let i=0;i<item.likedquestions2[0].link[0].item.length;i++){
   if(item.linkId == item.likedquestions2[0].link[0].item[i].linkId){
        
     mainitem.likedquestions2[0].link[0].item[i].answer[0].valueBoolean =  event.checked
         
       if(event.checked == true){
        item.likedquestions2[0].link[0].item[i].openLinkQuetions = true
       }
       else{
        item.likedquestions2[0].link[0].item[i].openLinkQuetions = false  
       } 
       console.log(item.likedquestions2[0].link[0].item[i])
 }
}
  
}

linkedgroupitemChanges(event:any,item:any,mainitem:any){

  console.log(this.groupItem)
   console.log(mainitem)
  console.log(event)
  console.log(item)
  

  if(event == 'Yes'){
    this.eventvalue = true
  }else{
    this.eventvalue = false
  }
  for(let i=0;i<mainitem.likedquestions2[0].link[0].item.length;i++){
    if(item.linkId == mainitem.likedquestions2[0].link[0].item[i].linkId){
         
      mainitem.likedquestions2[0].link[0].item[i].answer[0].valueBoolean =  this.eventvalue
          
        if(this.eventvalue == true){
          mainitem.likedquestions2[0].link[0].item[i].openLinkQuetions = true
        }
        else{
          mainitem.likedquestions2[0].link[0].item[i].openLinkQuetions = false  
        } 
        console.log(mainitem.likedquestions2[0].link[0].item[i])
  }
}


}


stateChangegroupINside(event:any,item:any,mainitem:any){
  
  console.log(this.groupItem)
  console.log(mainitem)
 console.log(event)
 console.log(item)

  item.errorvalidation = false
 if(event == 'Yes'){
   this.eventvalue = true
 }else{
   this.eventvalue = false
 }
 for(let i=0;i<mainitem.linkedQuestions.length;i++){
   if(item.linkId == mainitem.linkedQuestions[i].linkId){
        
      mainitem.linkedQuestions[i].answer[0].valueBoolean =  this.eventvalue
         
       if(this.eventvalue == true){
         mainitem.linkedQuestions[i].openLinkQuetions = true
       }
       else{
         mainitem.linkedQuestions[i].openLinkQuetions = false  
       } 
 }
}
}
stateChangegroup2(event:any,item:any,mainitem:any){
  console.log(this.groupItem)
  console.log(mainitem)
 console.log(event)
 console.log(item)
  item.errorvalidation = false
  if(event == 'Yes'){
    this.eventvalue = true
    item.openLinkQuetions = true
  }else{
    this.eventvalue = false
    item.openLinkQuetions = false
  }
  item.answer[0].valueBoolean = this.eventvalue

}
  

stateChangegroup(event:any,item:any,mainitem:any){
   console.log(this.groupItem)
   console.log(mainitem)
  console.log(event)
  console.log(item)

   item.errorvalidation = false
  if(event == 'Yes'){
    this.eventvalue = true
  }else{
    this.eventvalue = false
  }
  for(let i=0;i<mainitem.item.length;i++){
    if(item.linkId == mainitem.item[i].linkId){
         
       mainitem.item[i].answer[0].valueBoolean =  this.eventvalue
          
        if(this.eventvalue == true){
          mainitem.item[i].openLinkQuetions = true
        }
        else{
          mainitem.item[i].openLinkQuetions = false  
        } 
  }
}

}

 Keyeventvalidation(event:any,item:any){

console.log(event)
console.log(item)
 }


 presentActionSheet() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Select',
    cssClass: 'action-sheets-basic-page',
    buttons: [
      { icon:'checkmark',
        text: 'Yes',
        role: 'destructive',
        handler: () => {
          console.log('Destructive clicked');
          //this.callUs()
        }
      },{
        icon:'close',
        text: 'NO',
        handler: () => {
          console.log('Archive clicked');
          //this.contact()
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}



groupdroupdownsingelselect(event:any,linkitem:any){

  console.log(event)
  console.log(linkitem)
   this.selecetdtext = event

  for(let i=0;i<linkitem.answerOption.length;i++){
    if(event == linkitem.answerOption[i].valueCoding.display){

      linkitem.answer[0].valueCoding.code = linkitem.answerOption[i].valueCoding.code
      linkitem.answer[0].valueCoding.display = linkitem.answerOption[i].valueCoding.display

    }
  }

  if(linkitem.linkedQuestions != 0 ){
    for(let i=0;i<linkitem.linkedQuestions.length;i++){
      // for(let j=0;j<event.length;j++){
        if(event == linkitem.linkedQuestions[i].enableWhen[0].answerString){
          console.log(linkitem.linkedQuestions[i].enableWhen[0].answerString)
          linkitem.openLinkQuetions = true
          break
        }else{
          linkitem.openLinkQuetions = false
       }
  
      // }
   }
  }
  console.log(linkitem)

}


removerepeteitem(item:any){
  console.log(item)
  console.log(item.likedquestions2)

  for(let i=0;i<item.likedquestions2.length;i++){

    
    item.likedquestions2.splice(i,1)
    if(item.likedquestions2.length == 1){
      item.OneRepeatingItem = false
    }
    break

    

  }
 
    // if(item.)

  
}



getdeviceinfo(deviceId:any){

  console.log(deviceId)
  this.QuestionaryService.getdeviceInfo(deviceId).subscribe(data=>{
    console.log(data)
    //localStorage.removeItem('Patientdetails');
  })

}

Groupdropdeonlinkes(event:any,linkitem:any){

  console.log(event)
  console.log(linkitem)

  console.log(event)
      
  linkitem.answer = []
  linkitem.answer =  event

  for(let i=0;i<linkitem.linkedQuestions.length;i++){
     for(let j=0;j<event.length;j++){
       if(event[i].valueCoding.display == linkitem.linkedQuestions[i].enableWhen[0].answerString){
        linkitem.openLinkQuetions = true
       }else{
        linkitem.openLinkQuetions = false
       }


     }
  }

  // if(event == 'Urinary Tract Injury '){
  //   linkitem.openLinkQuetions = true
  // }else{
  //   linkitem.openLinkQuetions = false
  // }

}

scaningUID(groupitem:any){
console.log(groupitem)
  this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData);
    //this.barecodedata = barcodeData
    this.scaneddata= barcodeData
    groupitem.item[0].answer[0].valueString = this.scaneddata.text
    this.deviceinfo(this.scaneddata.text,groupitem)

   }).catch(err => {
       console.log('Error', err);
       //this.deviceinfo(this.barecodedata,groupitem)
   });

}


deviceinfo1(barecodedata:any,groupitem:any){

  this.QuestionaryService.getdeviceInfo(barecodedata).subscribe(data=>{
    this.deviceInformation = data.map
    console.log(this.deviceInformation)
    console.log(this.deviceInformation.gudid.map.device.map.versionModelNumber)

    for(let i=0;i<groupitem.likedquestions2[0].link.length;i++){

       // console.log(groupitem.likedquestions2[0].link[i])
        groupitem.likedquestions2[0].link[i]['hide'] = false
        if(groupitem.likedquestions2[0].link[i].linkId == '1.3'){
             console.log(this.deviceInformation.gudid.map.device.map.brandName)
          groupitem.likedquestions2[0].link[i].answer[0].valueString = this.deviceInformation.gudid.map.device.map.brandName 
          groupitem.likedquestions2[0].link[i].hide = true
           //console.log( groupitem.likedquestions2[0].link[i])
           console.log(groupitem)

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.4'){

          groupitem.likedquestions2[0].link[i].answer[0].valueString = this.deviceInformation.gudid.map.device.map.versionModelNumber 
          groupitem.likedquestions2[0].link[i].hide = true

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.5'){

          groupitem.likedquestions2[0].link[i].answer[0].valueString = this.deviceInformation.gudid.map.device.map.companyName 
          groupitem.likedquestions2[0].link[i].hide = true

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.6'){

          groupitem.likedquestions2[0].link[i].answer[0].valueString = this.deviceInformation.gudid.map.device.map.deviceDescription 
          groupitem.likedquestions2[0].link[i].hide = true

        }

        if(groupitem.likedquestions2[0].link[i].linkId == '1.7'){

          console.log(this.deviceInformation.gudid.map.device.map.identifiers.map.identifier.myArrayList[0].map.deviceId)
          groupitem.likedquestions2[0].link[i].answer[0].valueString = this.deviceInformation.gudid.map.device.map.identifiers.map.identifier.myArrayList[0].map.deviceId 
          groupitem.likedquestions2[0].link[i].hide = true

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.8'){

          groupitem.likedquestions2[0].link[i].answer[0].valueString = this.deviceInformation.gudid.map.device.map.MRISafetyStatus
          groupitem.likedquestions2[0].link[i].hide = true

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.9'){

          if(this.deviceInformation.gudid.map.device.map.labeledContainsNRL == false){
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "No"
          }else{
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "Yes"
          }
         
          groupitem.likedquestions2[0].link[i].hide = true

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.10'){

          if(this.deviceInformation.gudid.map.device.map.labeledNoNRL == false){
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "No"
          }else{
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "Yes"
          }
        
          groupitem.likedquestions2[0].link[i].hide = true

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.11'){

          if(this.deviceInformation.gudid.map.device.map.singleUse == false){
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "No"
          }else{
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "Yes"
          }
         
          groupitem.likedquestions2[0].link[i].hide = true

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.12'){

          if(this.deviceInformation.gudid.map.device.map.deviceKit == false){
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "No"
          }else{
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "Yes"
          }
         
          groupitem.likedquestions2[0].link[i].hide = true

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.13'){

          if(this.deviceInformation.gudid.map.device.map.deviceCombinationProduct == false){
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "No"
          }else{
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "Yes"
          }
         
          groupitem.likedquestions2[0].link[i].hide = true

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.14'){

          if(this.deviceInformation.gudid.map.device.map.deviceHCTP == false){
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "No"
          }else{
            groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = "Yes"
          }
         
          groupitem.likedquestions2[0].link[i].hide = true

        }

        if(groupitem.likedquestions2[0].link[i].linkId == '1.15'){

          groupitem.likedquestions2[0].link[i].answer[0].valueString = this.deviceInformation.gudid.map.device.map.gmdnTerms.map.gmdn.myArrayList[0].map.gmdnPTName
          groupitem.likedquestions2[0].link[i].hide = true

        }
        if(groupitem.likedquestions2[0].link[i].linkId == '1.16'){

           console.log(this.deviceInformation.gudid.map.device.map.productCodes.map.fdaProductCode.myArrayList[0].map.productCode)

           groupitem.likedquestions2[0].link[i].answer[0].valueString = this.deviceInformation.gudid.map.device.map.productCodes.map.fdaProductCode.myArrayList[0].map.productCode
           groupitem.likedquestions2[0].link[i].hide = true

        }
        
       

    }
  }, error => {

    console.log("No device info")
    this.presentConfirm()
  for(let i=0;i<groupitem.likedquestions2[0].link.length;i++){
           groupitem.likedquestions2[0].link[i]['hide'] = false
           groupitem.likedquestions2[0].link[i].answer[0].valueString = ""
           groupitem.likedquestions2[0].link[i].answer[0].valueBoolean = null
           groupitem.likedquestions2[0].link[i].answer[0].valueInteger =""
  }

})
  
  
}

deviceinfo(barecodedata:any,groupitem:any){
  
     console.log(barecodedata.length)
   if(barecodedata.length < 14){
     console.log("plss enster 14 degit number")
     
   }

  this.QuestionaryService.getdeviceInfo(barecodedata).subscribe(data=>{
    this.deviceInformation = data.map
    console.log(this.deviceInformation)
    console.log(this.deviceInformation.gudid.map.device.map.versionModelNumber)

        for(let i=0;i<groupitem.item.length;i++){
          if(groupitem.item[i].linkedQuestions.length !=0){
          
          for(let j=0;j<groupitem.item[i].linkedQuestions.length;j++){
           groupitem.item[i].linkedQuestions[j]['hide'] = false
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.1'){

               groupitem.item[i].linkedQuestions[j].answer[0].valueString = this.deviceInformation.gudid.map.device.map.brandName 
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.2'){

               groupitem.item[i].linkedQuestions[j].answer[0].valueString = this.deviceInformation.gudid.map.device.map.versionModelNumber 
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.3'){

               groupitem.item[i].linkedQuestions[j].answer[0].valueString = this.deviceInformation.gudid.map.device.map.companyName 
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.4'){

               groupitem.item[i].linkedQuestions[j].answer[0].valueString = this.deviceInformation.gudid.map.device.map.deviceDescription 
               groupitem.item[i].linkedQuestions[j].hide = true

             }

             if(groupitem.item[i].linkedQuestions[j].linkId == '16.5'){

               console.log(this.deviceInformation.gudid.map.device.map.identifiers.map.identifier.myArrayList[0].map.deviceId)
               groupitem.item[i].linkedQuestions[j].answer[0].valueString = this.deviceInformation.gudid.map.device.map.identifiers.map.identifier.myArrayList[0].map.deviceId 
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.6'){

               groupitem.item[i].linkedQuestions[j].answer[0].valueString = this.deviceInformation.gudid.map.device.map.MRISafetyStatus
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.7'){

               if(this.deviceInformation.gudid.map.device.map.labeledContainsNRL == false){
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "No"
               }else{
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "Yes"
               }
              
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.8'){

               if(this.deviceInformation.gudid.map.device.map.labeledNoNRL == false){
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "No"
               }else{
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "Yes"
               }
             
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.9'){

               if(this.deviceInformation.gudid.map.device.map.singleUse == false){
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "No"
               }else{
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "Yes"
               }
              
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.10'){

               if(this.deviceInformation.gudid.map.device.map.deviceKit == false){
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "No"
               }else{
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "Yes"
               }
              
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.11'){

               if(this.deviceInformation.gudid.map.device.map.deviceCombinationProduct == false){
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "No"
               }else{
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "Yes"
               }
              
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.12'){

               if(this.deviceInformation.gudid.map.device.map.deviceHCTP == false){
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "No"
               }else{
                 groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = "Yes"
               }
              
               groupitem.item[i].linkedQuestions[j].hide = true

             }

             if(groupitem.item[i].linkedQuestions[j].linkId == '16.13'){

               groupitem.item[i].linkedQuestions[j].answer[0].valueString = this.deviceInformation.gudid.map.device.map.gmdnTerms.map.gmdn.myArrayList[0].map.gmdnPTName
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             if(groupitem.item[i].linkedQuestions[j].linkId == '16.14'){

                console.log(this.deviceInformation.gudid.map.device.map.productCodes.map.fdaProductCode.myArrayList[0].map.productCode)

               groupitem.item[i].linkedQuestions[j].answer[0].valueString = this.deviceInformation.gudid.map.device.map.productCodes.map.fdaProductCode.myArrayList[0].map.productCode
               groupitem.item[i].linkedQuestions[j].hide = true

             }
             
            


          }
         }
        }

   }, error => {

       console.log("No device info")
       this.presentConfirm()
       for(let i=0;i<groupitem.item.length;i++){
       if(groupitem.item[i].linkedQuestions.length !=0){
          
         for(let j=0;j<groupitem.item[i].linkedQuestions.length;j++){
          groupitem.item[i].linkedQuestions[j]['hide'] = false
          groupitem.item[i].linkedQuestions[j].answer[0].valueString = ""
          groupitem.item[i].linkedQuestions[j].answer[0].valueBoolean = null
          groupitem.item[i].linkedQuestions[j].answer[0].valueInteger =""
         }
       }
     }

   })

}

gertdeviceinfo(event:any,groupitem:any){

  console.log(event.target.value)
   console.log(groupitem)
  if(groupitem.text== 'Device Information'){

       if(event.target.value.length == 14){
         this.displayUDINUmberValidation = false
      //console.log(event.target.value)
      this.barecodedata =  event.target.value

      this.deviceinfo(this.barecodedata,groupitem)
      
   }else{
     console.log("Pla enter 14 degit number" )
     this.displayUDINUmberValidation = true
   }
   console.log(groupitem)
  
  }
  else if(groupitem.text== 'Medical History'){
   
    for(let i=0;i<groupitem.item.length;i++){

     for(let j=0;j<groupitem.item[i].linkedQuestions.length;j++){
       if(groupitem.item[i].text== 'Total number of pregnancies'){
          
         if(event.target.value > 0 ){
            
          console.log(groupitem.item[i].linkedQuestions[j])
           groupitem.item[i].openLinkQuetions = true

         }else{
          groupitem.item[i].openLinkQuetions = false

         }
       }
     }

    }
     
  }

  if(groupitem.linkedQuestions.length !==0){
   for(let i=0;i<groupitem.linkedQuestions.length;i++){
     if(groupitem.linkedQuestions[i].text == 'UDI Number'){
      if(event.target.value.length == 14){
        this.displayUDINUmberValidation = false
     //console.log(event.target.value)
     this.barecodedata =  event.target.value

     this.deviceinfo1(this.barecodedata,groupitem)
     
  }else{
    console.log("Pla enter 14 degit number" )
   // this.displayUDINUmberValidation = true
  }

     }
   }

  }

}

presentConfirm() {
    
    
  let alert = this.alertController.create({
    title: 'There is no device information for this UDI. Please enter manually',
    //message: 'There is no device information for this UDI please enter manually',
    buttons: ['OK']
  });
  alert.present();
}


groupdropdownsingelselect(event:any,Groupitem:any){

}


Groupdropdwonsingleselect(event:any,Groupitem:any){
  console.log(event)
  console.log(Groupitem)
  Groupitem.answer[0].valueCoding.code =  event.valueCoding.code
  Groupitem.answer[0].valueCoding.display =  event.valueCoding.display
}

groupdroupdowns(event:any,Groupitem:any){
  console.log(event)
  console.log(Groupitem)
  console.log(event.valueCoding.display)
  this.selecetdtext=event.valueCoding.display

  Groupitem.answer[0].valueCoding.code =  event.valueCoding.code
  Groupitem.answer[0].valueCoding.display =  event.valueCoding.display

  if(Groupitem.linkedQuestions != 0 ){
    for(let i=0;i<Groupitem.linkedQuestions.length;i++){
      // for(let j=0;j<event.length;j++){
        if(event.valueCoding.display == Groupitem.linkedQuestions[i].enableWhen[0].answerString){
          console.log(Groupitem.linkedQuestions[i].enableWhen[0].answerString)
          Groupitem.openLinkQuetions = true
          break
        }else{
          Groupitem.openLinkQuetions = false
       }
  
      // }
   }
  }
}

groupdroupdownsMainItem(event:any,item:any){
 // console.log(event)
  console.log(item)

  //console.log(event.valueCoding.display)
  item.answer[0].valueCoding.code =  event.valueCoding.code
  item.answer[0].valueCoding.display =  event.valueCoding.display
  if(item.linkedQuestions != 0 ){
    if(this.validatefirttime == true){
      this.validatefirttime = false
    this.linkedquestionNew = item.linkedQuestions
    }
   // console.log("////////// linked Questions")
    //console.log(this.linkedquestionNew)
       this.displaylinkedQueston = []
      for(let i=0;i<this.linkedquestionNew.length;i++){
        for(let j=0;j<this.linkedquestionNew[i].enableWhen.length;j++){
          if( this.linkedquestionNew[i].enableWhen[j] !== undefined){
            if(event.valueCoding.display == this.linkedquestionNew[i].enableWhen[j].answerString){
               //console.log( this.linkedquestionNew[i])
               this.displaylinkedQueston.push(this.linkedquestionNew[i])      
            } 
          }

        }

      }

        
        for(let i=0;i< this.displaylinkedQueston.length;i++){
          this.displaylinkedQueston[i]["hide"]=false
        }

        console.log("///////////////////////////////////////////////")
        console.log(this.displaylinkedQueston)

        //    for(let i =0;i<this.displaylinkedQueston.length;i++){
        //   if(this.displaylinkedQueston[i].type ==  'group'){
        //       for(let j=0;j<this.displaylinkedQueston[i].item.length;i++){
        //         console.log(this.displaylinkedQueston[i].item[j])
        //         // if(item.linkId ==  this.displaylinkedQueston[i].item[j].enableWhen[0].question ){
        //         //   this.displaylinkedQueston[i].item[j]['displayOnlyMainLinked'] = true
        //         // }else{
        //         //   this.displaylinkedQueston[i].item[j]['displayOnlyMainLinked'] = false
        //         // }
        //       }     
              
        //     }
        // }


        this.displayGroupItem=[]
        for(let i =0;i<this.displaylinkedQueston.length;i++){
          if(this.displaylinkedQueston[i].type ==  'group'){
             for(let j=0 ;j<this.displaylinkedQueston[i].enableWhen.length;j++){
               if(this.displaylinkedQueston[i].enableWhen[j] !== undefined){
                if(event.valueCoding.display == this.displaylinkedQueston[i].enableWhen[j].answerString){ 
                      for(let k=0;k<this.displaylinkedQueston[i].item.length;k++){
                          // console.log(this.displaylinkedQueston[i].item[k])
                              for(let l=0;l<this.displaylinkedQueston[i].item[k].enableWhen.length;l++){
                                //if(event.valueCoding.display ==  this.displaylinkedQueston[i].item[k].enableWhen[l].answerString){
                                   console.log("////////////////////////////////////////////////////////////////////")
                                    console.log(this.displaylinkedQueston[i].item[k])
                                     if(item.linkId ==  this.displaylinkedQueston[i].item[k].enableWhen[0].question){
                                       this.displaylinkedQueston[i].item[k]["displayOnlyMainLinked"] = true   
                                     }else{
                                       this.displaylinkedQueston[i].item[k]["displayOnlyMainLinked"] =false
                                     }
                                   // this.displaylinkedQueston[i].item.splice()
                                   // this.displayGroupItem.push(this.displaylinkedQueston[i].item[k])
                               // }
                              }

                              //console.log(this.displayGroupItem)
                              //console.log(this.displaylinkedQueston[i].item)
                             // this.displaylinkedQueston[i].item= this.displayGroupItem
                      }
                }
               }

             }

          }
        }

         
        item.linkedQuestions = this.displaylinkedQueston
        item.likedquestions2 = [{'link': this.displaylinkedQueston}]
        console.log(item)

    for(let i=0;i<item.linkedQuestions.length;i++){
        for(let j=0;j<item.linkedQuestions[i].enableWhen.length;j++){
          console.log(item.linkedQuestions[i].enableWhen[j])
          if( item.linkedQuestions[i].enableWhen[j] !== undefined){
          if(event.valueCoding.display == item.linkedQuestions[i].enableWhen[j].answerString){    
             item.openLinkQuetions = true
             break
          }else{
              item.openLinkQuetions = true
          }
         // break
        }else{
         // break
        }
      }
   }
  }
}

ItemcheckboxOptionsMain(item:any,choice:any,mainitem:any){

  console.log(mainitem)
    console.log(choice)
   console.log(item)
   // var index: number

    if(choice.valueCoding.userSelected == true){
      if(mainitem.answer[0] == undefined){
        mainitem.answer = [
          { 
           "valueCoding":{
            "code":"",
            "display":"" 
           }  
          }
        ]
      }
       if(mainitem.answer[0].valueCoding.display == ""){
        mainitem.answer[0].valueCoding.display = choice.valueCoding.display
        mainitem.answer[0].valueCoding.code = choice.valueCoding.code
       }else{
        var valueCoding:{} = choice.valueCoding
        mainitem.answer.push({'valueCoding':valueCoding})
       }

      }
      else{
        this.testarray= []
        this.passingarray=[]
        console.log()
   
          for(let i=0;mainitem.answer.length;i++){
             if(mainitem.answer[i].valueCoding.code == choice.valueCoding.code){
              mainitem.answer.splice(i,1)
               break
             }
          }             
    
         console.log(mainitem)
   
      }
}

groupdropdownreppet43(event:any,Groupitem:any){

}


///////////////////////////////////////////////////// submit /////////////////////////

submitForm(){

   this.PatientDetails = JSON.parse(localStorage.getItem('Patientdetails'));
   this.PersonDetails = JSON.parse(localStorage.getItem('LoginDetails'));
    console.log(this.PersonDetails)
    console.log(this.PatientDetails)
      this.patientName =  this.PatientDetails.patient.firstname+" "+this.PatientDetails.patient.lastname
    this.personId = this.PersonDetails.entry[0].resource.id
 console.log(this.PatientDetails)

  this.isLoading = !(this.isLoading);
   
  console.log(this.items)

  this.QuestionnaireResponse = {
"questionnaire": "Questionnaire/"+this.Questionnarie.id,
"subject": {
  "reference": "Patient/"+this.patientName
},
"author": {
  "reference": "Practitioner/"+this.personId
},
 "resourceType": "QuestionnaireResponse",
 "id": this.Questionnarie.id,
 "status": "completed",
 'item':this.items,
 "title": this.Questionnarie.title  
}

  this.Validations(this.items)





   console.log(this.QuestionnaireResponse)
    console.log(JSON.stringify(this.QuestionnaireResponse))
   if(this.validationpass == true){
     this.ansEveryQueatiosn = false
  
    this.QuestionaryService.postQuetionnaries(this.QuestionnaireResponse).subscribe(data=>{
      //console.log(data)
       localStorage.removeItem('Patientdetails');
      this.navCtrl.setRoot('ThankYouPage')
      this.isLoading = !(this.isLoading);
   })
   }else{
     console.log("plzz ans all mandat qiestiosn")
     this.ansEveryQueatiosn = true
     this.isLoading = !(this.isLoading);
   }

}

///////////////////////////////////////// Save //////////////////////
SaveForm(){

  this.PatientDetails = JSON.parse(localStorage.getItem('Patientdetails'));
  this.PersonDetails = JSON.parse(localStorage.getItem('LoginDetails'));
   console.log(this.PersonDetails)
   console.log(this.PatientDetails)
     this.patientName =  this.PatientDetails.patient.firstname+" "+this.PatientDetails.patient.lastname
   this.personId = this.PersonDetails.entry[0].resource.id
console.log(this.PatientDetails)

 this.issaveLoading = !(this.issaveLoading);
  
 console.log(this.items)

 this.QuestionnaireResponse = {
"questionnaire": "Questionnaire/"+this.Questionnarie.id,
"subject": {
 "reference": "Patient/"+this.patientName
},
"author": {
 "reference": "Practitioner/"+this.personId
},
"resourceType": "QuestionnaireResponse",
"id": this.Questionnarie.id,
"status": "in-progress",
'item':this.items,
"title": this.Questionnarie.title  
}

 this.Validations(this.items)





  console.log(this.QuestionnaireResponse)
   console.log(JSON.stringify(this.QuestionnaireResponse))
  if(this.validationpass == true){
    this.ansEveryQueatiosn = false
 
   this.QuestionaryService.postQuetionnaries(this.QuestionnaireResponse).subscribe(data=>{
     //console.log(data)
      localStorage.removeItem('Patientdetails');
     this.navCtrl.setRoot('ThankYouPage')
     this.issaveLoading = !(this.issaveLoading);
  })
  }else{
    console.log("plzz ans all mandat qiestiosn")
    this.ansEveryQueatiosn = true
    this.issaveLoading = !(this.issaveLoading);
  }

}

//////////////////////////////////////////////
 
Validations(items){

  for(let i=0;i<items.length;i++){
    
    console.log(items[i].linkId)
    console.log(items[i].required)
      // if( items[i].required !== undefined){
    if(items[i].type == 'integer'){
      if(items[i].required == true){
        items[i]['validation'] = true
      } 
      if(items[i].answer[0].valueInteger == null && items[i].required){
        items[i]['validation'] = false
        items[i].errorvalidation = true
      }else{
        items[i].errorvalidation = false 
      }
 
    }
    if(items[i].type == 'choice'){
      if(items[i].required == true){
        items[i]['validation'] = true
      } 
      console.log(items[i].answer[0].valueCoding)
      if(items[i].answer[0].valueCoding.display == ""  && items[i].required){
        items[i]['validation'] = false
        items[i].errorvalidation = true
      }else{
        items[i].errorvalidation = false 
      }
 
    }

    if(items[i].type == 'boolean'){
      console.log("///////////////////////// boolean ///////////////////////")
      if(items[i].answer[0].valueBoolean == "No"){
          
        items[i].answer[0].valueBoolean = false
       }if(items[i].answer[0].valueBoolean == "Yes"){
        items[i].answer[0].valueBoolean = true
       }

      if(items[i].required == true){
        items[i]['validation'] = true
      } 
      if(items[i].answer[0].valueBoolean == null && items[i].required){
        items[i]['validation'] = false
        items[i].errorvalidation = true
      }else{
        items[i].errorvalidation = false 
      }
 
    }

    if(items[i].type == 'date'){
      if(items[i].required == true){
        items[i]['validation'] = true
      } 
      if(items[i].answer[0].valueDate == "" && items[i].required){ 
        items[i]['validation'] = false
        console.log(items[i].answer[0].valueDate)
        items[i].errorvalidation = true
       }else{
        items[i].errorvalidation = false 
       }

     }

    //  if(items[i].validation != undefined){
    //   if( items[i].validation == false ){
    //       console.log(items[i].validation)
    //        this.validationpass = true
    //   }else{
    //    console.log(items[i].validation)
    //    this.validationpass = false
    //    break
    //   }
    //  }
 
 
    if(items[i].type == 'group'){
     for(let j=0;j<items[i].item.length;j++){
      console.log(items[i].item[j].linkId)
      console.log(items[i].item[j].required)
      if( items[i].item[j].required == true){
        items[i].item[j]['validation'] = true
        if(items[i].item[j].answer[0].valueInteger == ""){
          items[i].item[j].validation = false
        } 
        if(items[i].item[j].answer[0].valueString == ""){
          items[i].item[j].validation = false
        }
        if(items[i].item[j].answer[0].valueBoolean == null){
          items[i].item[j].validation = false
        }
        if(items[i].item[j].answer[0].valueDate == "")
        items[i].item[j].validation = false
      }
       if(items[i].item[j].type == 'boolean'){
        console.log(items[i].item[j].answer[0].valueBoolean)
         if(items[i].item[j].answer[0].valueBoolean == "No"){
          
          items[i].item[j].answer[0].valueBoolean = false
         }if(items[i].item[j].answer[0].valueBoolean == "Yes"){
          items[i].item[j].answer[0].valueBoolean = true
         }
 
         if(items[i].item[j].answer[0].valueBoolean == null && items[i].item[j].required){
 
          items[i].item[j].errorvalidation = true
         }else{
          items[i].item[j].errorvalidation = false 
         }
         
 
       }
       if(items[i].item[j].type == 'date'){

        if(items[i].item[j].answer[0].valueDate == "" && items[i].item[j].required){ 
          console.log(items[i].item[j].answer[0].valueDate)
          items[i].item[j].errorvalidation = true
         }else{
          items[i].item[j].errorvalidation = false 
         }

       }
       if(items[i].item[j].type == 'integer'){

        if(items[i].item[j].answer[0].valueString == "" && items[i].item[j].required){ 
          console.log(items[i].item[j].answer[0].valueInteger)
          items[i].item[j].errorvalidation = true
         }else{
          items[i].item[j].errorvalidation = false 
         }

       }


        if(items[i].item[j].validation != undefined){
       if( items[i].item[j].validation == false ){
           console.log(items[i].item[j].validation)
            this.validationpass = false
            break
       }else{
        console.log(items[i].item[j].validation)
        this.validationpass = true
        //break
       }
      }
     }

     if(items[i].type == 'group'){
      for(let j=0;j<items[i].item.length;j++){
        if(items[i].item[j].type == 'boolean'){
          console.log(items[i].item[j].answer[0].valueBoolean)
         if(items[i].item[j].answer[0].valueBoolean == "No"){
          
          items[i].item[j].answer[0].valueBoolean = false
         }if(items[i].item[j].answer[0].valueBoolean == "Yes"){
          items[i].item[j].answer[0].valueBoolean = true
         }
        }

      }
     }

     
     //for()

      console.log(this.validationpass)
 
 }



    
   
   }

   for(let i=0;i<items.length;i++){
    console.log(items[i].validation)
        if(items[i].required  !== undefined){
     if(items[i].validation != undefined){
      if( items[i].validation == false ){
          console.log(items[i].validation)
           this.validationpass = false
           break
      }else{
       console.log(items[i].validation)
       this.validationpass = true
      // break
      }
     }
     
    }
    else{
       items[i].required = false
     }

   }

   for(let i=0;i<this.items.length;i++){
     console.log(items[i].required)
     if(this.items[i].type !== 'group'){
     if( items[i].required == true){
      if( items[i].validation == false ){
        console.log(items[i].validation)
         this.validationpass = false
        // break
    }
    break

     }else{
      this.validationpass = true
     }
   }
  }

  //   console.log("validatiosn passs")
    console.log(this.validationpass)

  //    this.unvantedObject = items
  //    console.log(items)

  //    for(let i=0;i<this.unvantedObject.length;i++){
  //      console.log(this.unvantedObject[i].answer)
  //      if(this.unvantedObject[i].type ==  "boolean"){
  //      if(this.unvantedObject[i].answer[0].valueBoolean == null){

  //         console.log(this.unvantedObject[i])
  //          this.unvantedObject.splice(i,1)
         
  //      }
  //     }
  //     if(this.unvantedObject[i].type == "string"){

  //     }
  //    }


     console.log(this.unvantedObject)

}




}
