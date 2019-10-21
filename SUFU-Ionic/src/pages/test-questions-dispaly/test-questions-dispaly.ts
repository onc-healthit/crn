import {  Component,ComponentFactoryResolver, Inject,QueryList,ViewChildren,ViewContainerRef ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Tabs,Slides } from 'ionic-angular';


import {QuestionaryService} from './../questions/questions.service'
import {GlobalService} from '../../providers/global.service'
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {DynamicQuestionsComponentPage} from './../dynamic-questions-component/dynamic-questions-component'

//import { IonSlides } from '@ionic/angular';

@IonicPage()

@Component({
  selector: 'page-test-questions-dispaly',
  templateUrl: 'test-questions-dispaly.html',
  providers:[QuestionaryService]
})
export class TestQuestionsDispalyPage {

  @ViewChild('slides') slides: Slides;

  //@ViewChild('slides') slider: IonSlides;
  segment = 0;

  @ViewChildren('dynamicQuestions', { read: ViewContainerRef })
  public pageTargets: QueryList<ViewContainerRef>;
  public myForm: FormGroup;
  tab:Tabs;
  Questionnarie:any= {}
  items:any=[]
  Question:any={}
  linkedQuestions: any = [];
  rootViewContainer: any;
  factoryResolver: any;
  groups:any[]=[]
  groupName:any="test"
  questionsarray: any[]=[]
  nextnumber:number = 4
  PatientDetails:any={}
  addinglengh:number = 4
  testObj:any=[]
  loadmoredisabale:boolean = false
  //////////////
  public isMenuOpen : boolean = false;
  size:any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,
    public QuestionaryService:QuestionaryService,public globalService: GlobalService,
    @Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver,) {
      this.tab = this.navCtrl.parent;
      this.Questionnarie = this.navParams.data.Questions.resource
      this.factoryResolver = factoryResolver;

      this.PatientDetails = JSON.parse(localStorage.getItem('Patientdetails'));
      if(this.PatientDetails !=null){

      }else{
        this.tab.select(1);
      }
    
    console.log(this.Questionnarie)
    this.items = this.Questionnarie.item
    //this.groups =  this.Questionnarie.item
    this.GroupDisplay()
    //console.log(this.items)
  }


  

  GroupDisplay(){
    //console.log("groups")
    //console.log(this.items)
       for(let i=0;i<this.items.length;i++){
         this.items[i]['limit'] = 5
         this.items[i]['offset'] = 0
         if(this.items[i].type == 'group'){
           this.groups.push(this.items[i])
            console.log(this.groups)
           this.groupName = this.groups[0].text
           this.questionsarray = this.groups[0].item
           this.createValidations(this.questionsarray);
         }
          
       }
  }

  



  groupquestionsdisplay(){
    console.log(this.groups)
    for(let i=0;i<this.groups.length;i++){
         this.groups[i]['isMenuOpen'] = false
         this.size = 4
         var item = this.groups[i].item.slice(0,this.size)
         this.groups[i]["diplayQuestions"] = item

    }
  }
  createValidations(questionsarray:any){

   // console.log(questionsarray)
  }
  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
    //console.log(this.rootViewContainer)
  }

  addDynamicComponent() {
    const factory = this.factoryResolver.resolveComponentFactory(
      DynamicQuestionsComponentPage
    );
   
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestQuestionsDispalyPage');
    this.groupquestionsdisplay()
    this.displayQuestionsQuestions()
  }


  segmentChanged(event) {
    //console.log(event.value);
    this.groupName = event.value
    let groupObj = this.groups.filter(item => {
      return item.text == event.value;
    });
    //console.log(groupObj);
    this.questionsarray = groupObj[0].item
    //this.groups = groupObj
    //this.groupQuestions = groupObj[0].questions;
    //this.loadForm(groupObj[0]);
  }
  displayQuestionsQuestions(){
 
     for(let i=0;i<this.Questionnarie.item.length;i++){
      this.Questionnarie.item[i]['linkedQuestion'] = [];
      if( this.Questionnarie.item[i].enableWhen !== undefined && this.Questionnarie.item[i].enableWhen.length > 0){
         this.linkedQuestions.push(this.Questionnarie.item[i])
        //console.log(this.linkedQuestions)
      }
     }
     this.globalService.totalLinkedQuestions = this.linkedQuestions;

     //console.log(this.globalService.totalLinkedQuestions)
     
     this.AddlinkedQuestion();
  }

  AddlinkedQuestion() {
    //console.log("hdsfhsdkj")
    for (let m = 0; m < this.linkedQuestions.length; m++) {
      for (let k = 0; k < this.linkedQuestions[m].enableWhen.length; k++) {
        for (let j = 0; j < this.Questionnarie.item.length; j++) {
          if (this.Questionnarie.item[j].linkId == this.linkedQuestions[m].enableWhen[k].question) {
            this.Questionnarie.item[j].linkedQuestion.push(this.linkedQuestions[m]);
            //console.log(this.Questionnarie)
          }
        }
      }
    }
    // let component = this.pageTargets.toArray()[queIndex];
    // if (component != undefined) {
    //   component.remove(0);
    //   this.setRootViewContainerRef(component);
    // this.addDynamicComponent();
  }


   
next(group:any){
    this.testObj  = group.diplayQuestions
   console.log(group.diplayQuestions.length)
   this.addinglengh = this.addinglengh + group.diplayQuestions.length
   console.log(this.addinglengh)
    group.diplayQuestions = []
    for(let i=0;i<group.item.length;i++){
      if(this.addinglengh >= i){
        group.diplayQuestions.push(group.item[i])
        console.log( group.diplayQuestions)
      }
    }

    
    
    for(let i =0; i<group.item.length;i++){
      for(let j=0;j<this.testObj.length;j++){
        
      if( group.item[i].linkId == this.testObj[j].linkId){
  
        this.testObj.splice(j,i)
         console.log(this.testObj)
      }

      }
    }
   

   this.nextnumber = this.nextnumber+4
   group.item.length 
   console.log(group.diplayQuestions)
   if(group.diplayQuestions.length == group.item.length){
     
          this.loadmoredisabale = true
   }else{
          this.loadmoredisabale = false
   }
  
}

back(group:any){

  console.log(group)

}

  public toggleAccordion(item:any) : void
  {
     // this.isMenuOpen = !this.isMenuOpen;
     item.isMenuOpen = !item.isMenuOpen
  }
  
  nextSlide() {
    this.slides.slideNext();
  }

  prevSlide() {
    this.slides.slidePrev();
  }
}
