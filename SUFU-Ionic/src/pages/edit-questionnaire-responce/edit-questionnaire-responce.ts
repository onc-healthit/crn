import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import { group } from '@angular/core/src/animation/dsl';



@IonicPage()
@Component({
  selector: 'page-edit-questionnaire-responce',
  templateUrl: 'edit-questionnaire-responce.html',
})
export class EditQuestionnaireResponcePage {

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
 QuestionnaireResponse:any={}
 eventvalue:any
 selecetdtext:any
 testarray:any[]=[]
 passingarray:any[]=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    console.log(this.navParams.data)
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
      ///console.log(this.items)
      this.displayQuestionitems = this.items
      // console.log(this.displayQuestionitems)
      this.loader.dismiss();

      this.populateuserans()
  }

  populateuserans(){

    //console.log(this.userSubmited)
    for(let i=0;i<this.Questionnarie.item.length;i++){

      //console.log(this.Questionnarie.item[i])
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
                   for(let d=0;d<this.Questionnarie.item[i].item[j].answer.length;d++){
                     for(let b=0;b< this.Questionnarie.item[i].item[j].answerOption.length;b++){
                       if( this.Questionnarie.item[i].item[j].answer[d].valueCoding.code == this.Questionnarie.item[i].item[j].answerOption[b].valueCoding.code){
                        this.Questionnarie.item[i].item[j].answerOption[b].valueCoding.userSelected = true
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

               // console.log( this.Questionnarie.item[i].item[j].answer)

              }
            }
            else{
              //console.log(this.Questionnarie.item[i].item[j].answer)
              if( this.Questionnarie.item[i].item[j].answer[0].valueBoolean == null){
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

/////////////////////////////////////////////////////////Edit Function///////////////////

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

updateForm(){


  this.QuestionnaireResponse = {
    "questionnaire": "Questionnaire/"+this.Questionnarie.id,
    "subject": {
      "reference": "Patient/"+1
    },
    "author": {
      "reference": "Practitioner/"+1
    },
     "resourceType": "QuestionnaireResponse",
     "id": this.Questionnarie.id,
     "status": "completed",
     'item':this.items,
     "title": this.Questionnarie.title  
    }

    console.log(this.QuestionnaireResponse)

  //this.navCtrl.pop()
}

}
