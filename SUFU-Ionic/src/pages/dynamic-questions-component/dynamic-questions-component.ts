import { Component,
  QueryList,
  ViewChildren,
  ViewContainerRef,
  Inject,
  ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import {GlobalService} from '../../providers/global.service'
import { CompileMetadataResolver, analyzeAndValidateNgModules } from '@angular/compiler';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-dynamic-questions-component',
  templateUrl: 'dynamic-questions-component.html',
})
export class DynamicQuestionsComponentPage {

  public myForm: FormGroup;
  factoryResolver: any;
  rootViewContainer: any;
  parentQuestionId: any;
  LinkedQId: any = [];
  LinkedQ: any= []
  enablewhenQuestions:any=[]
  MainQuestions:any=[]
  dynamicpadding:any
  component:any
  validationsObject: any = {};
  GroupvalidationsObject:any={}
  displaygroup:boolean = false
  @ViewChildren('dynamicQuestions', { read: ViewContainerRef })
  //@Input
  public pageTargets: QueryList<ViewContainerRef>;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams,public globalService: GlobalService,
    @Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver) {
      this.factoryResolver = factoryResolver;
      this.parentQuestionId = this.globalService.selectedQuestionId;
      console.log(this.globalService.linkedQuestions)
       
      
      for(let i=0;i<this.globalService.linkedQuestions.length;i++){
        //this.LinkedQ=[]
        for(let j=0;j<this.globalService.linkedQuestions[i].enableWhen.length;j++){
          if( this.parentQuestionId ==  this.globalService.linkedQuestions[i].enableWhen[j].question){
          //  console.log(this.globalService.linkedQuestions[i].enableWhen[j])
            this.LinkedQ.push(this.globalService.linkedQuestions[i]);
            break
          }
        }
      }

    console.log(this.LinkedQ.length )
    console.log(this.LinkedQ)
    
     if(this.LinkedQ.length >= 0  &&  this.LinkedQ.length <= 5){
      this.dynamicpadding = this.LinkedQ.length * 35
     }
     else if( this.LinkedQ.length >= 5 &&  this.LinkedQ.length <= 20 ){
      this.dynamicpadding = this.LinkedQ.length * 15
     }
      for(let i=0;i<this.LinkedQ.length;i++){
        if(this.LinkedQ[i].type == 'group'){
          for(let j=0;j<this.LinkedQ[i].item.length;j++){
            if(this.LinkedQ[i].item[j].enableWhen !== undefined){
              this.enablewhenQuestions.push(this.LinkedQ[i].item[j])
          }else{
              this.MainQuestions.push(this.LinkedQ[i].item[j])
          }
        }
         
      }
    }
      
      console.log(this.enablewhenQuestions)
      console.log(this.MainQuestions) 

      this.createValidations(this.LinkedQ);
  }


  createValidations(MainQuestions) {

    for(let i =0;i<MainQuestions.length;i++){
      console.log( MainQuestions[i].type)
      //console.log(MainQuestions[i])
      if(MainQuestions[i].required == true){

        if(MainQuestions[i].type == 'date'){
         this.validationsObject[MainQuestions[i].linkId] = ['', Validators.required]
        }
        else if(MainQuestions[i].type == 'text'){
         this.validationsObject[MainQuestions[i].linkId] = ['', Validators.required]
        }
        else if(MainQuestions[i].type == 'boolean'){
         this.validationsObject[MainQuestions[i].linkId] = ['', Validators.required]
        }
        else if(MainQuestions[i].type == 'choice'){
            if( MainQuestions[i].extension[0].valueCodeableConcept == undefined){
              if(MainQuestions[i].extension[1].valueCodeableConcept.text=='Drop down'){
               this.validationsObject[MainQuestions[i].linkId] = ['', Validators.required]
              }
              if(MainQuestions[i].extension[1].valueCodeableConcept.text=='Checkboxes'){
               this.validationsObject[MainQuestions[i].linkId] = ['false',Validators.required]
              }
            }
            //if()
         this.validationsObject[MainQuestions[i].linkId] = ['', Validators.required]
        }
        else {
         this.validationsObject[MainQuestions[i].linkId] = ''
        }

      }else{
        if( MainQuestions[i].type == 'choice'){
          console.log("1")
         if( MainQuestions[i].extension[0].valueCodeableConcept == undefined){
           console.log(MainQuestions[i].linkId)
           if(MainQuestions[i].extension[1].valueCodeableConcept.text=='Drop down'){
             console.log("3")
            this.validationsObject[MainQuestions[i].linkId] = ['']
           }
           if(MainQuestions[i].extension[1].valueCodeableConcept.text=='Checkboxes'){
            this.validationsObject[MainQuestions[i].linkId] = ['false']
           }
         }else{
           this.validationsObject[MainQuestions[i].linkId] = ''
         }
        }else{
          this.validationsObject[MainQuestions[i].linkId] = ''
        }
           
        // else if( MainQuestions[i].type == 'group'){
        //    this.displaygroup = true
        //     for(let j=0;j<this.MainQuestions[i].groupmainQuetions.length;j++){
        //       this.MainQuestions[i].groupmainQuetions[j]['Qid'] = j
        //       console.log(this.MainQuestions[i].groupmainQuetions[j])
 
        //       if( this.MainQuestions[i].groupmainQuetions[j].type == 'choice'){
        //        console.log("1")
        //      console.log(this.MainQuestions[i].groupmainQuetions[j])
        //       if(this.MainQuestions[i].groupmainQuetions[j].extension[0].valueCodeableConcept == undefined){
        //         console.log(this.MainQuestions[i].groupmainQuetions[j].linkId)
        //         if(this.MainQuestions[i].groupmainQuetions[j].extension[1].valueCodeableConcept.text=='Drop down'){
        //           console.log("3")
        //          this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]
        //         }
        //         if(this.MainQuestions[i].groupmainQuetions[j].extension[1].valueCodeableConcept.text=='Checkboxes'){
        //          this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['false', Validators.required]
        //         }
        //       }
        //         else if(this.MainQuestions[i].groupmainQuetions[j].extension[0].valueCodeableConcept != undefined){
        //            if(this.MainQuestions[i].groupmainQuetions[j].extension[0].valueCodeableConcept.text=='Drop down'){
        //              this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]
        //            }

        //         }
        //       else{
        //         //this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].GroupQId] = ''
        //         //console.log(this.GroupvalidationsObject)
        //       }
        //      }
        //      else if(this.MainQuestions[i].groupmainQuetions[j].type == 'boolean'){
        //        this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]

        //      }
        //      else if(this.MainQuestions[i].groupmainQuetions[j].type == 'string'){
        //        this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]

        //      }
        //      else if(this.MainQuestions[i].groupmainQuetions[j].type == 'text'){
        //        this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]

        //      }
        //      else if(this.MainQuestions[i].groupmainQuetions[j].type == 'date'){
        //        this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]

        //      }
        //      else if(this.MainQuestions[i].groupmainQuetions[j].type == 'integer'){
        //        console.log(this.MainQuestions[i].groupmainQuetions[j].linkId)
        //        this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]

        //      }
        //      else{
        //        this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]
        //      }

               
            

        //     }
        // }
      //   else{
      //    this.validationsObject[MainQuestions[i].linkId] = ''
      //   // console.log(this.validationsObject)
      //  }
       
      }
    }

     console.log(this.validationsObject)
     console.log(this.GroupvalidationsObject)
    // this.MainQuestions1 = this.MainQuestions
     if(this.displaygroup == true){
    this.myForm = this.formBuilder.group(this.GroupvalidationsObject);
     }
     else{
       this.myForm = this.formBuilder.group(this.validationsObject);
     }
    // this.displaydynamicQuetions()

 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DynamicQuestionsComponentPage');
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }
  removeDynamicComponent(queIndex:any):void {
    console.log("remove index:",queIndex )
    console.log(this.rootViewContainer)
    //const index = this.rootViewContainer.indexOf(this.component.hostView)
    //console.log(index)
    this.rootViewContainer.remove(queIndex);
  }
  addDynamicComponent() {
    const factory = this.factoryResolver.resolveComponentFactory(
      DynamicQuestionsComponentPage
    );
    this.component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(this.component.hostView);
  }

  stateChange(event,item:any,queIndex){

    console.log(event)
    console.log(queIndex)
    console.log(item)
    console.log(this.enablewhenQuestions)
    this.globalService.selectedQuestionId = item.linkId;
    if(event == 'Yes'){
         for(let i=0;i<this.enablewhenQuestions.length;i++){
           for(let j=0;j<this.enablewhenQuestions[i].enableWhen.length;j++){
             if(item.linkId ==  this.enablewhenQuestions[i].enableWhen[j].question){
               console.log(this.pageTargets)
              let component = this.pageTargets.toArray()[queIndex];
              console.log(component)
             if (component != undefined) {
               component.remove(0);
               this.setRootViewContainerRef(component);
               item.DisplayTemplet = true
               console.log(item)
               this.addDynamicComponent();
             }
             break
             }
             
           }
         }     
    }
    else{
      // //item.DisplayTemplet = false
      if(item.DisplayTemplet == true){
        item.DisplayTemplet = false
       
      this.removeDynamicComponent(queIndex)
      }
    }
    if(event == 'Yes'){
      var Ans = true
    }else{
      Ans = false
    }

 item['answer'] = [{"valueBoolean": Ans}]
 var index = this.globalService.answerArray.findIndex(items => items.linkId === item.linkId);
  if(index> -1){
    console.log("item is there")
   this.globalService.answerArray[index] = item
  }else{
    console.log(" no item so push")
   this.globalService.answerArray.push(item)
  }

  console.log(this.globalService.answerArray);
  }

  checkboxOptions(linkitem:any,choice:any,item:any,event){

    console.log(linkitem)
    console.log(choice)
    console.log(item)
    console.log(event)
    linkitem['answer'] =  choice
    var index = this.globalService.answerArray.findIndex(items => items.linkId === linkitem.linkId);
  if(index> -1){
    console.log("item is there")
   this.globalService.answerArray[index] = linkitem
  }else{
    console.log(" no item so push")
   this.globalService.answerArray.push(linkitem)
  }

  console.log(this.globalService.answerArray);

  }


  getInputAnswer(linkitem:any,event:any){

    console.log(linkitem)
    console.log(event)
    linkitem['answer'] = [{"valueString": event}]
    var index = this.globalService.answerArray.findIndex(item => item.linkId === item.linkId);
     if(index> -1){
      this.globalService.answerArray[index] = linkitem
     }else{
      this.globalService.answerArray.push(linkitem)
     }

     console.log(this.globalService.answerArray);

  }
  getintegerInputAnswer(linkitem:any,event:any){
    console.log(linkitem)
    console.log(event)
    linkitem['answer'] = [{"valueInteger": event}]
    var index = this.globalService.answerArray.findIndex(item => item.linkId === item.linkId);
     if(index> -1){
      this.globalService.answerArray[index] = linkitem
     }else{
      this.globalService.answerArray.push(linkitem)
     }

     console.log(this.globalService.answerArray);
  }

  Groupdropdeonlinkes(event:any,linkitem:any,queIndex:any){
    console.log(event)
    console.log(linkitem)
    //console.log(this.enablewhenQuestions)
    console.log(this.globalService.linkedQuestions)
    this.globalService.selectedQuestionId = linkitem.linkId;
    for(let i=0;i<this.globalService.linkedQuestions.length;i++){
      //console.log(this.globalService.linkedQuestions[i])
       for(let j=0;j<this.globalService.linkedQuestions[i].enableWhen.length;j++){
        // console.log(this.globalService.linkedQAnswers[i].enableWhen[j])
        
         if(event[0].valueCoding.display ==  this.globalService.linkedQuestions[i].enableWhen[j].answerString){
           console.log( this.globalService.linkedQuestions[i].enableWhen[j].answerString)
           console.log(event[0].valueCoding.display)
          console.log(this.pageTargets)
          let component = this.pageTargets.toArray()[queIndex];
          console.log(component)
         if (component != undefined) {
           component.remove(0);
           this.setRootViewContainerRef(component);
           linkitem.DisplayTemplet = true
           console.log(linkitem)
           this.addDynamicComponent();
         }
         break
         }

        //  if(event[0].valueCoding.display !==  this.globalService.linkedQuestions[i].enableWhen[j].answerString){
        //   if(linkitem.DisplayTemplet == true){
        //     linkitem.DisplayTemplet = false
           
        //   this.removeDynamicComponent(queIndex)
        //   }
        //  }
         

         }
       }
  
    linkitem['answer'] =  event
    var index = this.globalService.answerArray.findIndex(items => items.linkId === linkitem.linkId);
     if(index> -1){
      this.globalService.answerArray[index] = linkitem
     }else{
      this.globalService.answerArray.push(linkitem)
     }
     console.log(this.globalService.answerArray);

  }

  getInputDateAnswer(item:any,answer:any){
    console.log(item)
    console.log(event)
    let day = answer.day;
    let month = answer.month;
    let year = answer.year;
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    let date = day + '/' + month + '/' + year;

    console.log(date)
    item['answer'] = [{"valueDate": date}]
    var index = this.globalService.answerArray.findIndex(items => items.linkId === item.linkId);
  if(index> -1){
    console.log("item is there")
   this.globalService.answerArray[index] = item
  }else{
    console.log(" no item so push")
   this.globalService.answerArray.push(item)
  }

  }

}
