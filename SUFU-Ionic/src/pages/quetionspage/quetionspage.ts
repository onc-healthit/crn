import {  Component,
  ComponentFactoryResolver,
  Inject,
  QueryList,
  ViewChildren,
  ViewContainerRef,ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalService} from '../../providers/global.service'
import {DynamicQuestionsComponentPage} from '../../pages/dynamic-questions-component/dynamic-questions-component'
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CompileMetadataResolver } from '@angular/compiler';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
/**
 * Generated class for the QuetionspagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quetionspage',
  templateUrl: 'quetionspage.html',
})
export class QuetionspagePage {
   @ViewChildren('dynamicQuestions', { read: ViewContainerRef })
  //@ViewChildren('dynamicQuestions') viewContainerRefList: QueryList<ViewContainerRef>;
  public pageTargets: QueryList<ViewContainerRef>;
  public myForm: FormGroup;
  public myGroupForm: FormGroup;
  Questionnarie:any= {}
  items:any=[]
  name: string = "Carlos";
  enablewhenQuestions:any=[]
  MainQuestions:any=[]
  MainQuestions1:any=[]
  groupmainQuetions:any=[]
  factoryResolver: any;
  rootViewContainer: any;
  display= true
  component:any
  validationsObject: any = {};
  GroupvalidationsObject:any={}
  groupQId:any = 1
  displaygroup:boolean = false

  constructor(public navCtrl: NavController, 
    @Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver,
    public navParams: NavParams,private cdr: ChangeDetectorRef,public globalService: GlobalService,private formBuilder: FormBuilder) {

    //console.log(this.navParams.data)
    this.factoryResolver = factoryResolver;
    this.Questionnarie = this.navParams.data.Questions.resource
    //this.items = this.Question.item
    //this.presentActionSheet()
    console.log(this.Questionnarie)
    
  }

  form: FormGroup;
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuetionspagePage');
    console.log(this.pageTargets)
    this.enableQuestions()
  }

  ngAfterViewInit(){
    //sthis.enableQuestions()
  }

  ngAfterContentInit() {
    // console.log("ngAfterContentInit")
    this.cdr.detectChanges();
  }
  enableQuestions(){
    console.log(this.Questionnarie.item)

       for(let i=0;i<this.Questionnarie.item.length;i++){
        this.Questionnarie.item[i]["QuestionId"] = i
        this.Questionnarie.item[i]['DisplayTemplet']= false
          if(this.Questionnarie.item[i].enableWhen !== undefined){
           // console.log(this.Questionnarie.item[i])
            this.enablewhenQuestions.push(this.Questionnarie.item[i])
          }else{
             this.MainQuestions.push(this.Questionnarie.item[i])
          }
          if(this.Questionnarie.item[i].type == "group"){
             for(let j=0;j<this.Questionnarie.item[i].item.length;j++){
              // console.log(j)
             // this.Questionnarie.item[i].item[j]['GroupQId'] = j
              if(this.Questionnarie.item[i].item[j].enableWhen !== undefined){
              //  console.log(this.Questionnarie.item[i].item[j])
                this.enablewhenQuestions.push(this.Questionnarie.item[i].item[j])
              }else{
               // this.Questionnarie.item[i].item[j]["MainQuetions"].push(this.Questionnarie.item[i].item[j])
              }
             }
          }

       }
      // console.log(this.enablewhenQuestions)
       this.globalService.linkedQuestions =  this.enablewhenQuestions
       console.log(this.globalService)
       
      // console.log(this.Questionnarie)
      // console.log(this.MainQuestions)
       for(let i=0;i<this.MainQuestions.length;i++){
         if(this.MainQuestions[i].type == "group"){
           this.MainQuestions[i]["groupmainQuetions"]=[]
           for(let j=0;j<this.MainQuestions[i].item.length;j++){
             if(this.MainQuestions[i].item[j].enableWhen == undefined){
             // console.log(this.MainQuestions[i].item[j])
               if(this.MainQuestions[i].item[j].type == "display"){
   
                  // this.displaydynamicQuetions(this.MainQuestions[i].item[j].linkId)
                 
              //     console.log(this.MainQuestions[i].item[j].linkId)
              //   let component = this.pageTargets.toArray()[this.MainQuestions[i].item[j].linkId];
              //   console.log(component)
              //  if (component != undefined) {
              //    component.remove(0);
              //    this.setRootViewContainerRef(component);
              //    this.addDynamicComponent();
              //  }

               }
               
              this.MainQuestions[i].groupmainQuetions.push(this.MainQuestions[i].item[j])
              console.log(this.MainQuestions[i].groupmainQuetions)
             }

           }
         }
       }

       
        // for(let i=0;i<this.MainQuestions.length;i++){
        //   for(let j=0;j<this.MainQuestions[i].groupmainQuetions.length;j++){
        //     this.MainQuestions[i].groupmainQuetions[j]["GroupQId"]= this.groupQId
        //     this.groupQId ++
        //   }
        // }
        console.log(this.MainQuestions)
       this.MainQuestions1 =  this.MainQuestions
       this.createValidations(this.MainQuestions);
  }



  displaydynamicQuetions(){

    for(let i=0;i<this.MainQuestions.length;i++){
      if(this.MainQuestions[i].type == "group"){
        //this.MainQuestions[i]["groupmainQuetions"]=[]
        for(let j=0;j<this.MainQuestions[i].item.length;j++){
          if(this.MainQuestions[i].item[j].enableWhen == undefined){
          // console.log(this.MainQuestions[i].item[j])
            if(this.MainQuestions[i].item[j].type == "display"){
               console.log(this.MainQuestions[i].item[j].linkId)
             let component = this.pageTargets.toArray()[this.MainQuestions[i].item[j].linkId];
             console.log(component)
            if (component != undefined) {
              component.remove(0);
              this.setRootViewContainerRef(component);
              this.addDynamicComponent();
            }

            }
            
         
          }

        }
      }
    }

  }

  createValidations(MainQuestions) {

     for(let i =0;i<MainQuestions.length;i++){
       console.log(MainQuestions[i])
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
             this.validationsObject[MainQuestions[i].linkId] = ['', Validators.required]
            }
            if(MainQuestions[i].extension[1].valueCodeableConcept.text=='Checkboxes'){
             this.validationsObject[MainQuestions[i].linkId] = ['false', Validators.required]
            }
          }else{
            this.validationsObject[MainQuestions[i].linkId] = ''
          }
         }
         else if( MainQuestions[i].type == 'group'){
            this.displaygroup = true
             for(let j=0;j<this.MainQuestions[i].groupmainQuetions.length;j++){
               this.MainQuestions[i].groupmainQuetions[j]['Qid'] = j
               console.log(this.MainQuestions[i].groupmainQuetions[j])
  
               if( this.MainQuestions[i].groupmainQuetions[j].type == 'choice'){
                console.log("1")
              console.log(this.MainQuestions[i].groupmainQuetions[j])
               if(this.MainQuestions[i].groupmainQuetions[j].extension[0].valueCodeableConcept == undefined){
                 console.log(this.MainQuestions[i].groupmainQuetions[j].linkId)
                 if(this.MainQuestions[i].groupmainQuetions[j].extension[1].valueCodeableConcept.text=='Drop down'){
                   console.log("3")
                  this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]
                 }
                 if(this.MainQuestions[i].groupmainQuetions[j].extension[1].valueCodeableConcept.text=='Checkboxes'){
                  this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['false', Validators.required]
                 }
               }
                 else if(this.MainQuestions[i].groupmainQuetions[j].extension[0].valueCodeableConcept != undefined){
                    if(this.MainQuestions[i].groupmainQuetions[j].extension[0].valueCodeableConcept.text=='Drop down'){
                      this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]
                    }

                 }
               else{
                 //this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].GroupQId] = ''
                 //console.log(this.GroupvalidationsObject)
               }
              }
              else if(this.MainQuestions[i].groupmainQuetions[j].type == 'boolean'){
                this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]

              }
              else if(this.MainQuestions[i].groupmainQuetions[j].type == 'string'){
                this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]

              }
              else if(this.MainQuestions[i].groupmainQuetions[j].type == 'text'){
                this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]

              }
              else if(this.MainQuestions[i].groupmainQuetions[j].type == 'date'){
                this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]

              }
              else if(this.MainQuestions[i].groupmainQuetions[j].type == 'integer'){
                console.log(this.MainQuestions[i].groupmainQuetions[j].linkId)
                this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]

              }
              else{
                this.GroupvalidationsObject[this.MainQuestions[i].groupmainQuetions[j].linkId] = ['', Validators.required]
              }

                
             

             }
         }
         else{
          this.validationsObject[MainQuestions[i].linkId] = ''
         // console.log(this.validationsObject)
        }
        
       }
     }

      console.log(this.validationsObject)
      console.log(this.GroupvalidationsObject)
      this.MainQuestions1 = this.MainQuestions
      if(this.displaygroup == true){
     this.myForm = this.formBuilder.group(this.GroupvalidationsObject);
      }
      else{
        this.myForm = this.formBuilder.group(this.validationsObject);
      }
      this.displaydynamicQuetions()
 
  }

  gertLinkedQuetions(event:any,item:any,queIndex){

    console.log(event)
    console.log(item)
    console.log(queIndex -1)
    this.globalService.selectedQuestionId = item.linkId;
   if(item.text == "Total number of pregnancies"){
    if(event.target.value > 0 ){
      for(let i=0;i<this.enablewhenQuestions.length;i++){
        for(let j=0;j<this.enablewhenQuestions[i].enableWhen.length;j++){
          if(item.linkId ==  this.enablewhenQuestions[i].enableWhen[j].question){
            console.log(this.pageTargets)
           let component = this.pageTargets.toArray()[queIndex-1];
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
     

     }else{
      if(item.DisplayTemplet == true){
        item.DisplayTemplet = false
       
      this.removeDynamicComponent(queIndex-1)
      }

     }



   }
      
   item['answer'] = [{"valueInteger": event.target.value}]
    var index = this.globalService.answerArray.findIndex(items => items.linkId === item.linkId);
     if(index> -1){
       console.log("item is there")
      this.globalService.answerArray[index] = item
     }else{
       console.log(" no item so push")
      this.globalService.answerArray.push(item)
     }

     console.log(this.globalService.answerArray);


     console.log(this.myForm.value)

  }


  groupstateChange(event,item:any,queIndex){

    console.log(event)
    console.log(queIndex)
    console.log(item)
   
    this.globalService.selectedQuestionId = item.linkId;
    if(event == 'Yes'){
         for(let i=0;i<this.enablewhenQuestions.length;i++){
           for(let j=0;j<this.enablewhenQuestions[i].enableWhen.length;j++){
             if(item.linkId ==  this.enablewhenQuestions[i].enableWhen[j].question){
               console.log(this.pageTargets)
              let component = this.pageTargets.toArray()[queIndex-1];
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
       
      this.removeDynamicComponent(queIndex-1)
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

    console.log(this.myForm.value)
  }
  stateChange(event,item:any,queIndex){

    console.log(event)
    console.log(queIndex)
    console.log(item)
   
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

  Groupdropdwonsingleselect(event:any,Groupitem:any,queIndex){

    console.log(event)
     console.log(Groupitem)
     console.log(this.enablewhenQuestions)
     console.log(queIndex)
     Groupitem['answer'] =  event
     this.globalService.selectedQuestionId = Groupitem.linkId;
     for(let i=0;i<this.enablewhenQuestions.length;i++){
      for(let j=0;j<this.enablewhenQuestions[i].enableWhen.length;j++){
        if(Groupitem.linkId ==  this.enablewhenQuestions[i].enableWhen[j].question){
          console.log(this.pageTargets)
         let component = this.pageTargets.toArray()[queIndex];
         console.log(component)
        if (component != undefined) {
          component.remove(0);
          this.setRootViewContainerRef(component);
          Groupitem.DisplayTemplet = true
          console.log(Groupitem)
          this.addDynamicComponent();
          break
        }
        break
        }
        
      }
    }
    var index = this.globalService.answerArray.findIndex(items => items.linkId === Groupitem.linkId);
  if(index> -1){
    console.log("item is there")
   this.globalService.answerArray[index] = Groupitem
  }else{
    console.log(" no item so push")
   this.globalService.answerArray.push(Groupitem)
  } 
  }

  groupdroupdownsMainItem(event:any,item:any,queindex:any){

    console.log(event)
    console.log(item)
    console.log(queindex)
    this.globalService.selectedQuestionId = item.linkId;
    console.log(this.enablewhenQuestions)
    this.globalService.selectedQuestionId = item.linkId;
    for(let i=0;i<this.enablewhenQuestions.length;i++){
      for(let j=0;j<this.enablewhenQuestions[i].enableWhen.length;j++){
        if(item.linkId ==  this.enablewhenQuestions[i].enableWhen[j].question){
          console.log(this.pageTargets)
         let component = this.pageTargets.toArray()[queindex];
         console.log(component)
        if (component != undefined) {
          component.remove(0);
          this.setRootViewContainerRef(component);
          item.DisplayTemplet = true
          console.log(item)
          this.addDynamicComponent();
          break
        }
        break
        }
        
      }
    }

  }


  Groupdropdeonlinkes(event:any,item:any){
   console.log(event)
   console.log(item)
   
    item['answer'] =  event
    var index = this.globalService.answerArray.findIndex(items => items.linkId === item.linkId);
  if(index> -1){
    console.log("item is there")
   this.globalService.answerArray[index] = item
  }else{
    console.log(" no item so push")
   this.globalService.answerArray.push(item)
  }
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
  
  getNumberInputAnswer(item:any,event:any){

  item['answer'] = [{"valueInteger" : event}]
  var index = this.globalService.answerArray.findIndex(items => items.linkId === item.linkId);
  if(index> -1){
    console.log("item is there")
   this.globalService.answerArray[index] = item
  }else{
    console.log(" no item so push")
   this.globalService.answerArray.push(item)
  }

  }


  getInputAnswer(item:any,event:any){
    item['answer'] = [{"valueString" : event}]
    var index = this.globalService.answerArray.findIndex(items => items.linkId === item.linkId);
    if(index> -1){
      console.log("item is there")
     this.globalService.answerArray[index] = item
    }else{
      console.log(" no item so push")
     this.globalService.answerArray.push(item)
    }

  }

  getInputGroupStringAnswer(qId:any,item:any,answer:any,customId){

     console.log(this.myForm.value)
       
      item['answer'] = [{"valueString": answer}]
     

      var index = this.globalService.answerArray.findIndex(items => items.linkId === item.linkId);
       if(index> -1){
        this.globalService.answerArray[index] = item
       }else{
        this.globalService.answerArray.push(item)
       }

       console.log(this.globalService.answerArray);

    // console.log(event)
    // console.log(item)
    // let ansobj = this.globalService.answerArray.filter(item => {
    //   return item.linkId == qId && item.customId == customId;
    // });
    // if (ansobj.length > 0) {
    //   ansobj[0].answer = answer;
    // } else {
    //   this.globalService.answerObject = {};
    //   this.globalService.answerObject['questionId'] = qId;
    //   this.globalService.answerObject['question'] = item;
    //   this.globalService.answerObject['answer'] = answer;
    //   this.globalService.answerObject['customId'] = customId;
    //   this.globalService.answerArray.push(this.globalService.answerObject);
    // }
    // console.log(this.globalService.answerArray);
  }

  
  submitForm(text:any){

    // this.globalService.answerArray = this.globalService.answerArray.filter((obj, pos, arr) => {
    //   return arr.map(mapObj => mapObj['questionId']).indexOf(obj['questionId']) === pos;
    // });

     console.log(this.globalService.answerArray)
     console.log(this.MainQuestions)
     console.log(this.Questionnarie.item)

      for(let i=0;i<this.MainQuestions.length;i++){
        if(this.MainQuestions[i].required  !== undefined && this.MainQuestions[i].answer == undefined){


            console.log( this.MainQuestions[i].linkId + "pla ans this quetion")

        } else{
          console.log( " answer all requerd  quetion")
        }
      }
    


      //  for(let i=0;i<this.globalService.answerArray.length;i++){
      //    if(this.globalService.answerArray[i].answer == undefined){

      //      alert(this.globalService.answerArray[i].linkId + "plaa ans this quetion")
      //    }else{
      //    // alert( "all")
      //    }
      //  }

  console.log(this.myForm.value)
  }

}
