import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController  } from 'ionic-angular';
import {DisplayQuestionnaireFormsService} from '../display-questionnaire-responce/display-questionnaire-responce.service'



@IonicPage()
@Component({
  selector: 'page-display-questionnaire-responce',
  templateUrl: 'display-questionnaire-responce.html',
  providers: [DisplayQuestionnaireFormsService]
})
export class DisplayQuestionnaireResponcePage {

   displayquestions:any[]=[]
   Questionnarie:any= {}
   titleinfo:any
   loader:any
   items:any=[]
  enablewhen:any=[]
  groupenable:any=[]
  groupItem:any[]=[]
  displayQuestionitems:any[]=[]
  questionlinkID:any
  AnswerArry:any[]=[]
  RepeatingItem:any[]=[]
  userSubmited:any[]=[]
  disabled: boolean = true
  displaybutton:boolean = true
  validationpass:boolean = false
  barecodedata:any
 QuestionnaireResponse:any={}
 eventvalue:any
 selecetdtext:any
 testarray:any[]=[]
 deviceInformation:any={}
 passingarray:any[]=[]
 status:any
 validatefirttime:boolean = true
 linkedquestionNew:any=[]
   displaylinkedQueston:any=[]
   displayGroupItem:any=[]
 public isLoading: boolean = false;
 public  issaveLoading :boolean = false
    constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
       public displayQuestionnaireFormsService :DisplayQuestionnaireFormsService,public alertController: AlertController,
      ) {
        console.log(this.navParams.data)
        this.status = this.navParams.data.status
        console.log(this.status)
    //console.log(this.navParams.data.item)
    this.Questionnarie = this.navParams.data
    
    this.userSubmited = this.Questionnarie.submitedAns
    this.titleinfo = this.Questionnarie.title
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DisplayQuestionnaireResponcePage');
    this.loader = this.loadingCtrl.create({
      content: 'please wait..'
  })
  this.loader.present();
    //console.log('ionViewDidLoad QuestionsPage');
    this.quetionsdisplay()
  }

  quetionsdisplay(){

    this.enablewhen = []
   
       console.log(this.Questionnarie.item)
    for(let i=0;i<this.Questionnarie.item.length;i++){
      this.Questionnarie.item[i]['errorvalidation'] = false
      this.Questionnarie.item[i]['answer'] = [] 
      //this.Questionnarie.item[i]['displayAddButton'] = true
      //this.Questionnarie.item[i]['choiceUserOption'] = []
      if( this.Questionnarie.item[i].type == "boolean"){
      this.Questionnarie.item[i]['answer']  = [{"valueBoolean": null}]
       this.Questionnarie.item[i]['Yes']  = true
       this.Questionnarie.item[i]['No']  = false
      }
      else if(this.Questionnarie.item[i].type == "choice"){

       this.Questionnarie.item[i]['choiceUserOption']  = [{"valueCoding":{
              // "code":"",
              // "display":"" 
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
       this.Questionnarie.item[i]['answer'] = [] 
         for(let k=0;k<this.groupItem.length;k++){
              
          if(this.groupItem[k].answerOption !== undefined){
            for(let j=0;j<this.groupItem[k].answerOption.length;j++){
              this.groupItem[k].answerOption[j].valueCoding['userSelected'] = false
            }
          }
             this.RepeatingItem=[]
             this.groupItem[k]['errorvalidation'] = false
             this.groupItem[k]["openLinkQuetions"] = true
            this.groupItem[k]['linkedQuestions']=[]
            this.groupItem[k]['likedquestions2']=[]

            if(this.groupItem[k].enableWhen != undefined ){
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

 ///////////////////////////////////////////////// end of group item //////////////////////////////////////////////////     
      // else{
      //  this.Questionnarie.item[i]['answer'] =[{"valueString": ''}]  
      // }
     
    }
     //console.log(this.Questionnarie)
    this.items= this.Questionnarie.item
    //console.log(this.items)
     
    for(let i=0;i<this.items.length;i++){

         if(this.items[i].answerOption !== undefined){
           for(let j=0;j<this.items[i].answerOption.length;j++){
             this.items[i].answerOption[j].valueCoding['userSelected'] = false
           }
         }
         

     // console.log(this.items[i].enableWhen)
     this.items[i]["OneRepeatingItem"] = false
      this.items[i]["displayAddButton"]= true
     this.items[i]["openLinkQuetions"] = true
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
      console.log(this.items)
      this.displayQuestionitems = this.items
      
      this.loader.dismiss();

      this.populateuserans()
      console.log('displayQuestionitems', this.displayQuestionitems)
  }


  submitForm(){
    this.isLoading = !(this.isLoading);
     console.log(this.items)
    this.QuestionnaireResponse = {
      "questionnaire": this.Questionnarie.questionnaire,
      "subject": this.Questionnarie.subject,
      "author": this.Questionnarie.author,
       "resourceType": "QuestionnaireResponse",
       "id": this.Questionnarie.QuestionnaireResponseID,
       "status": "completed",
       'item':this.items,
       "title": this.Questionnarie.title  
      }

      this.Validations(this.items)
      console.log(this.QuestionnaireResponse )

      this.displayQuestionnaireFormsService.UpdateQuetionnaries( this.Questionnarie.QuestionnaireResponseID,this.QuestionnaireResponse).subscribe(data=>{
        console.log(data)
        this.isLoading = !(this.isLoading);
        this.navCtrl.pop()
      })
  
      //console.log(this.QuestionnaireResponse)
      
  }

 //////////////////////////////////////////////


 SaveForm(){

  this.issaveLoading = !(this.issaveLoading);
  console.log(this.items)
  this.QuestionnaireResponse = {
    "questionnaire": this.Questionnarie.questionnaire,
    "subject": this.Questionnarie.subject,
    "author": this.Questionnarie.author,
     "resourceType": "QuestionnaireResponse",
     "id": this.Questionnarie.QuestionnaireResponseID,
     "status": "in-progress",
     'item':this.items,
     "title": this.Questionnarie.title  
    }

    this.Validations(this.items)
    console.log(this.QuestionnaireResponse )

    this.displayQuestionnaireFormsService.UpdateQuetionnaries( this.Questionnarie.QuestionnaireResponseID,this.QuestionnaireResponse).subscribe(data=>{
      console.log(data)
      this.issaveLoading = !(this.issaveLoading);
      this.navCtrl.pop()
    })


 }
 
Validations(items){

  for(let i=0;i<items.length;i++){
    
    //console.log(items[i].linkId)
    //console.log(items[i].required)

    if(items[i].type == 'boolean'){
      if(items[i].required == true){
        items[i]['validation'] = true
      } 
      if(items[i].answer[0].valueBoolean == null && items[i].required){
        items[i]['validation'] = false
        items[i].errorvalidation = true
      }else{
        items[i].errorvalidation = false 
      }
      if(items[i].answer[0].valueBoolean == "No"){
        items[i].answer[0].valueBoolean = false
       }if(items[i].answer[0].valueBoolean == "Yes"){
        items[i].answer[0].valueBoolean = true
       }
 
    }

    if(items[i].type == 'date'){
      if(items[i].required == true){
        items[i]['validation'] = true
      } 
      if(items[i].answer[0].valueDate == "" && items[i].required){ 
        items[i]['validation'] = false
        //console.log(items[i].answer[0].valueDate)
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
      //console.log(items[i].item[j].linkId)
      //console.log(items[i].item[j].required)
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
           //console.log(items[i].item[j].validation)
            this.validationpass = false
          //  break
       }else{
       // console.log(items[i].item[j].validation)
        this.validationpass = true
        //break
       }
      }
     }

     //for()

    
 
 }



    
   
   }

   for(let i=0;i<items.length;i++){
     if(items[i].validation != undefined){
      if( items[i].validation == false ){
          //console.log(items[i].validation)
           this.validationpass = false
          // break
      }else{
       console.log(items[i].validation)
       this.validationpass = true
      // break
      }
     }
     

   }

  //   console.log("validatiosn passs")
  //  console.log(this.validationpass)

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


      console.log(items)

}

 


  EditForm(){
    this.disabled = false
    this.displaybutton = false
  }

  /////////////////////////////////////////////////////////Edit Function///////////////////
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
   
  console.log(this.items)

  }

  stateChange1(event:any,item:any){

    console.log(event)
    console.log(item)
    item.errorvalidation = false
    console.log("items")
    console.log(this.items)
    if(event == 'Yes'){
      this.eventvalue = true
    }else{
      this.eventvalue = false
    }
    this.questionlinkID = item.linkId
    //this.enablewhenQuestion = true
    for(let i=0;i<this.items.length;i++){
       console.log(this.items[i])
      if( this.items[i].linkId === item.linkId  ){
            
          console.log(this.items[i])
            // this.items[i].answer[0].valueBoolean =  this.eventvalue
             console.log(this.items[i].answer[0].valueBoolean) 
          if(this.eventvalue == true){
            this.items[i].openLinkQuetions = true
          }
          else{
            this.items[i].openLinkQuetions = false  
            
          } 
          
    }
   // break
    
  }
  
  }

stateChangegroup(event:any,item:any,mainitem:any){
 // console.log(this.groupItem)
  console.log(mainitem)
 console.log(event)
 console.log(item)

  //item.errorvalidation = false
 if(event == 'Yes'){
   this.eventvalue = true
 }else{
   this.eventvalue = false
 }
 for(let i=0;i<mainitem.item.length;i++){
   if(item.linkId == mainitem.item[i].linkId){
        
      mainitem.item[i].answer[0].valueBoolean =  event
         
       if(this.eventvalue == true){
         mainitem.item[i].openLinkQuetions = true
       }
       else{
         mainitem.item[i].openLinkQuetions = false  
       } 
 }
}

}

groupItemDropdwonIptions( event,item:any){
  console.log(event)
      
    item.answer = []
    item.answer =  event
    
    console.log(item.answer)
    
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

Groupdropdwonsingleselect(event:any,Groupitem:any){
  console.log(event)
  console.log(Groupitem)
  Groupitem.answer[0].valueCoding.code =  event.valueCoding.code
  Groupitem.answer[0].valueCoding.display =  event.valueCoding.display
}

groupdroupdowns(event:any,Groupitem:any){
  console.log(event)
  console.log(Groupitem)
  //console.log(event.valueCoding.display)
  //this.selecetdtext=event.valueCoding.display

  //Groupitem.answer[0].valueCoding.code =  event.valueCoding.code
  //Groupitem.answer[0].valueCoding.display =  event.valueCoding.display
  for(let i=0;i<Groupitem.answerOption.length;i++){
    if(event ===  Groupitem.answerOption[i].valueCoding.display){
      Groupitem.answer[0].valueCoding.code =   Groupitem.answerOption[i].valueCoding.code
      Groupitem.answer[0].valueCoding.display =   Groupitem.answerOption[i].valueCoding.display
    }
  }

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

///////////////////////////////////////////////////////////////////////////////////////////////////////

  populateuserans(){

    console.log(this.userSubmited)
    for(let i=0;i<this.Questionnarie.item.length;i++){

      console.log(this.Questionnarie.item[i])
      for(let j=0;j<this.userSubmited.length;j++){

        if(this.Questionnarie.item[i].linkId == this.userSubmited[j].linkId ){
          if( this.Questionnarie.item[i].answer  !== undefined  &&  this.userSubmited[j].answer !== undefined){
          this.Questionnarie.item[i].answer =  this.userSubmited[j].answer
          if(this.Questionnarie.item[i].type == "boolean"){
          if(this.Questionnarie.item[i].answer[0].valueBoolean == false){
            this.Questionnarie.item[i].answer[0].valueBoolean = "No"
            this.Questionnarie.item[i].openLinkQuetions = false
          } else if(this.Questionnarie.item[i].answer[0].valueBoolean == null){

          }
          else{
            this.Questionnarie.item[i].answer[0].valueBoolean = "Yes"

          }
          }
        }
        }

      }
    }


    for(let i=0;i<this.Questionnarie.item.length;i++){
      if(this.Questionnarie.item[i].item !== undefined){
       for(let j=0;j<this.Questionnarie.item[i].item.length;j++){
        for(let k=0;k<this.userSubmited.length;k++){
          if(this.userSubmited[k].item !== undefined){
            for(let t=0;t<this.userSubmited[k].item.length;t++){
              //console.log(this.userSubmited[k].item[t])
              if(this.Questionnarie.item[i].item[j].linkId == this.userSubmited[k].item[t].linkId ){
              if( this.Questionnarie.item[i].item[j].answer  !== undefined  &&  this.userSubmited[k].item[t].answer !== undefined){
              
                this.Questionnarie.item[i].item[j].answer = this.userSubmited[k].item[t].answer
              
                 if( this.Questionnarie.item[i].item[j].answer[0].valueCoding !== undefined){
                    console.log(this.Questionnarie.item[i].item[j].answer)
                   for(let d=0;d<this.Questionnarie.item[i].item[j].answer.length;d++){
                     if(this.Questionnarie.item[i].item[j].answerOption !== undefined){
                     for(let b=0;b< this.Questionnarie.item[i].item[j].answerOption.length;b++){
                       if( this.Questionnarie.item[i].item[j].answer[d].valueCoding.code == this.Questionnarie.item[i].item[j].answerOption[b].valueCoding.code){
                        this.Questionnarie.item[i].item[j].answerOption[b].valueCoding.userSelected = true
                       }
                     }
                    }
                    
                   }
                 }
                   if(this.Questionnarie.item[i].item[j].type == "boolean"){
                    // console.log(this.Questionnarie.item[i].item[j].answer[0].valueBoolean)

                 if(this.Questionnarie.item[i].item[j].answer[0].valueBoolean == true){
                  this.Questionnarie.item[i].item[j].answer[0].valueBoolean = "Yes"
                  this.Questionnarie.item[i].item[j]["checked"] = true


                 
                  
                // }else if(this.Questionnarie.item[i].item[j].answer[0].valueBoolean == false){
                //   console.log("value boolen is null")
                //   this.Questionnarie.item[i].item[j].answer[0].valueBoolean = "No"
                //   this.Questionnarie.item[i].item[j]["checked"] = false
                //   this.Questionnarie.item[i].item[j].openLinkQuetions = false
                 }
                else{
                  this.Questionnarie.item[i].item[j].answer[0].valueBoolean = "No"
                  this.Questionnarie.item[i].item[j].openLinkQuetions = false
                  this.Questionnarie.item[i].item[j]["checked"] = false
                }


              //  console.log( this.Questionnarie.item[i].item[j].linkId)
                //console.log( this.Questionnarie.item[i].item[j].answer)

              }
            }
            else{
              //console.log(this.Questionnarie.item[i].item[j].answer)
              if( this.Questionnarie.item[i].item[j].answer[0].valueBoolean == null){
                console.log( this.Questionnarie.item[i].item[j].linkId)
                console.log( this.Questionnarie.item[i].item[j].answer)
                if(this.Questionnarie.item[i].item[j].type == 'boolean'){
                this.Questionnarie.item[i].item[j].answer[0].valueBoolean = "No"
                  this.Questionnarie.item[i].item[j].openLinkQuetions = false
                  this.Questionnarie.item[i].item[j]["checked"] = false
                }
              }
            }
            }
            }
          }
       }   

      }
    }

  }
}

//////////////////////////////////
gertdeviceinfo(event:any,groupitem:any){

  //console.log(event.target.value)
  console.log(groupitem)
  if(groupitem.text== 'Device Information'){

       if(event.target.value.length == 14){
      //console.log(event.target.value)
      this.barecodedata =  event.target.value

      this.deviceinfo(this.barecodedata,groupitem)
      
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
       //  this.displayUDINUmberValidation = false
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

deviceinfo1(barecodedata:any,groupitem:any){

  this.displayQuestionnaireFormsService.getdeviceInfo(barecodedata).subscribe(data=>{
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

  if(barecodedata.length < 14){
    console.log("plss enster 14 degit number")
  }

 this.displayQuestionnaireFormsService.getdeviceInfo(barecodedata).subscribe(data=>{
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
presentConfirm() {
    
    
  let alert = this.alertController.create({
    title: 'There is no device information for this UDI. Please enter manually',
    //message: 'There is no device information for this UDI please enter manually',
    buttons: ['OK']
  });
  alert.present();
}

//////////////////////////
groupdroupdownsMainItem(event:any,item:any){
   console.log(event)
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


}
