import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
// import { lforms } from 'lforms'

const lforms = null;

@IonicPage()
@Component({
  selector: 'page-question-form-temp',
  templateUrl: 'question-form-temp.html',
})
export class QuestionFormTempPage {
  questionObject:any;
  form: FormGroup;
  questions:any = [];
  questionType:any;
  @ViewChild('myFormContainer') myFormContainer;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private ngZone: NgZone) {
      
    this.questionObject = this.navParams.get('questions');
    this.form = this.navParams.get('questionForm');
    this.questions = this.questionObject.resource.item;
    console.log('question form page', this.questionObject);

    this.checkEnableWhenObject(this.questions, false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionFormPage');
  }

  onCallFunction(item) {
    console.log('item', item);
    this.getQuestionType(item.type);
    this.checkEnableWhenObject(this.questions, null, item.linkId);
  }

  getQuestionType(type) { 
    console.log('questiontype', type);
    switch(type) {
      case('boolean'): this.questionType = 'answerBoolean';
      break;
      case('decimal'): this.questionType = 'answerDecimal';
      break;
      case('integer'): this.questionType = 'answerInteger';
      break;
      case('date'): this.questionType = 'answerDate';
      break;
      case('dateTime'): this.questionType = 'answerDateTime';
      break;
      case('time'): this.questionType = 'answerTime';
      break;
      case('string'): this.questionType = 'answerString';
      break;
      case('Coding'): this.questionType = 'answerCoding';
      break;
      case('Quantity'): this.questionType = 'answerQuantity';
      break;
      case('choice'): this.questionType = 'answerString';
      break;
    }
    console.log('selected Question type', this.questionType);
  }

  onSubmit(form) {
    this.validateAllFormFields(this.form);
    console.log('form data on submit',form);
    // console.log('is valid form', form.valid)
  }

  onClickQuestion(item, groupID) {
    console.log('itme', item);
    console.log('group key', groupID);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
        control.markAsDirty({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  checkEnableWhenObject(questionData, condition?:any, linkID?:any) {

    // if (questionData.type != "group") {
      if(!linkID) {
        if(questionData.hasOwnProperty('enableWhen')) {
          questionData.isShowNow = condition;
        } else {
          questionData.isShowNow = true;
        }
      } else {
        if(questionData.hasOwnProperty('enableWhen') && questionData.enableWhen[0].question == linkID) {
          for(let condition of questionData.enableWhen) {
            if(
              this.enableOrNot(condition.hasOwnProperty('operator') ? condition.operator : '=', 
                this.form.value[condition.question], 
                (condition[this.questionType]) )) {
                  console.log('inside');
                  questionData.isShowNow = true;
            } else {
              console.log('outside');
              questionData.isShowNow = false;
            }
          }
          // if(this.enableOrNot(questionData.enableWhen[0].operator, this.form.value[questionData.enableWhen[0].question], (typeof this.form.value[questionData.enableWhen[0].question] == 'boolean'? questionData.enableWhen[0][this.questionType] : questionData.enableWhen[0].answerInteger) )) {
          //   questionData.isShowNow = true;
          // } else {
          //   questionData.isShowNow = false;
          // }
    
        }
      // }

    }

    if(questionData.type == 'group') {
      questionData.item.map(el => this.checkEnableWhenObject(el, condition, linkID));
    }

    if(!questionData.hasOwnProperty('type')) {
      questionData.map(el => this.checkEnableWhenObject(el, condition, linkID));
    }
    
  }

  enableLinkedQuestions(questionItem) {

    
  }

  enableOrNot(operator, operand1, operand2) {
    console.log('operator', operator);
    console.log('operand1', operand1);
    console.log('operand2', operand2);
    console.log('operand1 typeof', typeof operand1);
    switch(operator) {
      case('=') :  
      {
        return typeof operand1 == 'object' ? 
        operand1.valueCoding.display == operand2:
        operand1 == operand2
      };
      case('!=') : return operand1 != operand2;
      case('>') : return operand1 > operand2;
      case('<') : return operand1 < operand2;
      case('<=') : return operand1 <= operand2;
      case('>=') : return operand1 >= operand2;
    }
  }

}
