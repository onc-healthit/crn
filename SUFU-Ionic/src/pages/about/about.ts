import { Component,OnDestroy } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {AboutService} from './about.service'
import {QuestionnariesService} from '../questionnaries/questionnaries.service'
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionFormPage } from '../question-form/question-form';
import { CustomValidators } from '../../validators/customValidators';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers:[AboutService,QuestionnariesService]
})
export class AboutPage implements  OnDestroy {

  loader:any
  loader2:any
  categorydata:any;
  Questonnary:any[]=[]
  panelOpenState = false;
  private subscription: Subscription;
  private timer: Observable<any>;
  displayerroermessage:boolean=false
  displaycontent:boolean = false
  CatogoryData:any={}
  displayQuetions:boolean = false
  questionForm: FormGroup;
  constructor(public navCtrl: NavController,
    public aboutService:AboutService,
    public loadingCtrl: LoadingController, 
    public questionnariesService:QuestionnariesService) {
      this.questionForm = new FormGroup({});
    console.log("category")

  }


  public ngOnDestroy() {
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  ionViewWillEnter(){
    this.questionForm = new FormGroup({});
    console.log('categorydata category', this.categorydata);
    if(!this.categorydata) {
      this.loader = this.loadingCtrl.create({
        content: 'please wait..'
    })
    this.loader.present();
    this.getcategory()
    }
  }

  ionViewDidLoad(){
   console.log('ionViewDidLoad category');
  }


  getcategory(){
    this.aboutService.getCategories().subscribe(data=>{
      console.log('category list', data);
      if(data && data.hasOwnProperty('categories')) {
        data.categories.sort(function (obj1, obj2) {
          return obj1.categoryId - obj2.categoryId;
   
       })
         
         this.categorydata = data.categories
         for(let i=0;i<this.categorydata.length;i++){
           this.categorydata[i]['isShowQuestions'] = false
           this.getQuestionnairesByCategoryID(this.categorydata[i]);
         }
         this.loader.dismiss();
      }

    })
    
  }
  public toggleAccordion(selectedItem:any) : void {

    for(let item of this.categorydata) {
      if(item.categoryId == selectedItem.categoryId) {
        item.isShowQuestions = !item.isShowQuestions;
      } else {
        item.isShowQuestions = false;
      }
    }
    // this.ngZone.run(() => {
    //   item.isShowQuestions = !item.isShowQuestions;
    // })

  }

  getQuestionnairesByCategoryID(categoey) {
    this.aboutService.getCategoriesByID(categoey.categoryId).subscribe(data=>{
      if(data.total > 0) {
        categoey['children'] = data.entry.sort(function (obj1, obj2) {
          return obj1.resource.id - obj2.resource.id;
       })
        
      }
      
    })
  }

  setTimer(){
    this.timer  = Observable.timer(2000); 
    this.subscription = this.timer.subscribe(() => {
      // set showloader to false to hide loading div from view after 5 seconds
      this.loader2.dismiss();
  });
  }


  displayQuestions(item:any,category:any){
        
        category.isMenuOpen = false

        this.loader2 = this.loadingCtrl.create({
          content: 'please wait..'
      })
      this.loader2.present();
      this.setTimer();
      console.log("displayQuestions", item)
      console.log(this.categorydata)
   
      this.navCtrl.push(QuestionFormPage, {Questions: item,
      questionForm: this.newBuildForm(item.resource.item), isFrom: 'newForm'});

      // this.navCtrl.push('QuestionsPage',{Questions:item})

     // this.navCtrl.push('QuetionspagePage',{Questions:item})
  }

  togglesection(i){

    this.categorydata[i].open =!this.categorydata[i].open


  }

  toggleItem(i,j){

    this.categorydata[i].children[j].open = !this.categorydata[i].children[j].open;

  }

  Questionspage(categoryName:any){

    console.log(categoryName)

    this.navCtrl.push('QuestionnariesPage',{category:categoryName})
    
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

  newBuildForm(item) {
    // if (item.type != "group") {
      this.questionForm.addControl(item.linkId, ( item.required ? new FormControl(item.value || null, this.getValidators(item))
      : new FormControl(item.value || null)));
    // }

    if (item.type == 'group') {
      item.item.map(el => this.newBuildForm(el))
    }

    if(!item.hasOwnProperty('type') && item instanceof Array) {
      item.map(el => this.newBuildForm(el))
    }

    return this.questionForm;
  }

 

}
