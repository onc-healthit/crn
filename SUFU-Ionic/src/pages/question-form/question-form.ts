import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner'
import { QuestionaryService } from '../questions/questions.service';
import { CustomValidators } from '../../validators/customValidators';
// import { lforms } from 'lforms'


@IonicPage()
@Component({
  selector: 'page-question-form',
  templateUrl: 'question-form.html',
  providers:[QuestionaryService]
})
export class QuestionFormPage {
  
  tab:Tabs;
  Questionnarie:any= {}
  PatientDetails:any={}
  PersonDetails:any;
  questionObject:any;
  form: FormGroup;
  questions:any = [];
  questionType:any;
  barcodeScannerOptions: BarcodeScannerOptions;
  scaneddata:any={}
  deviceInformation:any;
  public isLoading: boolean = false;
  isFrom:any;
  @ViewChild('myFormContainer') myFormContainer;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private QuestionaryService: QuestionaryService,
    private loadingCtrl: LoadingController, 
    private toasatCtrl: ToastController) {
      this.isFrom = this.navParams.get('isFrom');
      this.barcodeScannerOptions = {
        prompt:'Scan Barcode',
        showTorchButton: true,
        showFlipCameraButton: true
      };

      if(this.isFrom == 'newForm') {
        this.tab = this.navCtrl.parent;

        this.PatientDetails = JSON.parse(localStorage.getItem('Patientdetails'));
        if(this.PatientDetails !=null){
  
        }else{
          this.tab.select(1);
        }
        this.Questionnarie = this.navParams.data.Questions.resource;

        this.questionObject = this.navParams.get('Questions');
        this.form = this.navParams.get('questionForm');
        this.questions = this.questionObject.resource.item;

        if(this.questionObject.resource.id == '6' || this.questionObject.resource.id == '2') {
          this.hideAllSubgroup(this.questions, 'fillData');
        }
        this.checkEnableWhenObject(this.questions, false);


      }

      // this.PatientDetails = JSON.parse(localStorage.getItem('Patientdetails'));
      this.PersonDetails = JSON.parse(localStorage.getItem('LoginDetails'));
      

      if(this.isFrom == 'viewform') {
        this.questionObject = this.navParams.get('Questions');
        this.form = this.navParams.get('questionForm');
        this.questions = this.questionObject.item;

        this.checkEnableWhenObject(this.questions, true);

      }

      if(this.isFrom == 'editForm') {
        this.questionObject = this.navParams.get('Questions');
        this.form = this.navParams.get('questionForm');
        this.questions = this.questionObject.item;
        console.log('edit form data', this.questionObject);
        if(this.questionObject.id == '6' || this.questionObject.id == '2') {
          this.hideAllSubgroup(this.questions, 'fillData');
        }
        this.checkEnableWhenObject(this.questions, false);
        this.testNewFunction(this.questions);
       
        // this.editEnableLinkedQuestion(this.questions);


      }
      
      console.log('question obj', this.questions);
  



    
  }

  testNewFunction(questions) {
    if(questions.hasOwnProperty('type') && questions.type != 'group') {

      this.onCallFunction(questions, '', '')

      if(this.isFrom == 'editForm' ) {
        let UDIObjectText = questions.text;
        let UDIlinkID = questions.linkId;
        if(UDIObjectText == 'UDI (numbers only, max 14 digits)') {
          console.log('inside UDI (numbers only, max 14 digits)')
          this.deviceinfo(this.form.value[UDIlinkID]);
        }
      }
      // this.form.controls[questions.linkId].setValue(this.form.value[questions.linkId],
      //   { onlySelf: true, emitEvent: true, emitModelToViewChange: true, emitViewToModelChange: true });
        
    }
  
    if(questions.type == 'group') {
      questions.item.map(el => this.testNewFunction(el));
    }

    if(!questions.hasOwnProperty('type') && questions instanceof Array) {
      questions.map(el => this.testNewFunction(el));
    }
  }

  ionViewDidEnter() {
    this.PatientDetails = JSON.parse(localStorage.getItem('Patientdetails'));
    this.PersonDetails = JSON.parse(localStorage.getItem('LoginDetails'));
    if(this.PatientDetails && this.isFrom == 'newForm') {
      this.populatePatientDetails(this.questions);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionFormPage');
  }

  onCallFunction(item, index, event) {
    console.log('on function call', item);
    // let udiNumber = item;
    // if(udiNumber.text == 'UDI (numbers only, max 14 digits)') {
    //   if(this.form.value[udiNumber.linkId].length >= 14) {
    //     this.deviceinfo(this.form.value[udiNumber.linkId]);
    //   }
    // }
    this.questionType = this.getQuestionType(item.type, 'question');
    this.checkEnableWhenObject(this.questions, null, item.linkId);
  }

  onSubmit(form, action) {
    this.validateAllFormFields(this.form);
    if(this.form.valid) {
      this.submitFormAPIcall(action);
    } else {
    }
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

  populatePatientDetails(questionData) {
      if(questionData.hasOwnProperty('text')) {
        switch(questionData.text) {
          case('First Name') : this.form.controls[questionData.linkId].setValue(this.PatientDetails.patient.firstname);
          this.form.controls[questionData.linkId].disable();
          this.form.controls[questionData.linkId].updateValueAndValidity();
          break;
          case('Last Name') : this.form.controls[questionData.linkId].setValue(this.PatientDetails.patient.lastname);
          this.form.controls[questionData.linkId].disable();
          this.form.controls[questionData.linkId].updateValueAndValidity();
          break;
          case('Gender') : this.form.controls[questionData.linkId].setValue(this.PatientDetails.patient.resource.gender);
          this.form.controls[questionData.linkId].disable();
          this.form.controls[questionData.linkId].updateValueAndValidity();
          break;
          case('DOB') : this.form.controls[questionData.linkId].setValue(this.PatientDetails.patient.birthDate);
          this.form.controls[questionData.linkId].disable();
          this.form.controls[questionData.linkId].updateValueAndValidity();
        }
      }
  
    if(questionData.type == 'group') {
      questionData.item.map(el => this.populatePatientDetails(el));
    }

    if(!questionData.hasOwnProperty('type') && questionData instanceof Array) {
      questionData.map(el => this.populatePatientDetails(el));
    }
  }

  // editEnableLinkedQuestion(editQuestionData) {
  //   editQuestionData.isShowNow = true;
  //   if(editQuestionData.hasOwnProperty('type') && editQuestionData.type != 'group') {
  //     let qType = this.getQuestionType(editQuestionData.type, 'question');

  //     if(editQuestionData.text == 'UDI Number') {
  //       this.deviceinfo(this.form.value[editQuestionData.linkId]);
  //     }
  //     this.editEnableLoopMethod(this.questions, editQuestionData.linkId, qType);
  //   }
  
  //   if(editQuestionData.type == 'group') {
  //     editQuestionData.item.map(el => this.editEnableLinkedQuestion(el));
  //   }

  //   if(!editQuestionData.hasOwnProperty('type') && editQuestionData instanceof Array) {
  //     editQuestionData.map(el => this.editEnableLinkedQuestion(el));
  //   }
    
  // }

  // editEnableLoopMethod(questionData, linkId, qType) {
  //     if(questionData.hasOwnProperty('enableWhen')) {
  //       for(let item of questionData.enableWhen) {
  //         if(item.question == linkId) {

  //           if(this.form.value[linkId] == null) {
  //             questionData.isShowNow = false;
  //             this.form.controls[questionData.linkId].setValidators([]);
  //             this.form.controls[questionData.linkId].updateValueAndValidity();
  //           } else if(
  //             this.enableOrNot(item.hasOwnProperty('operator') ? item.operator : '=', 
  //               this.form.value[linkId], 
  //               (item[qType]) )) {
  //                 questionData.isShowNow = true;
  //                 this.form.controls[questionData.linkId].setValidators(this.getValidators(questionData));
  //                 this.form.controls[questionData.linkId].updateValueAndValidity();
  //           } else {
  //             questionData.isShowNow = false;
  //             this.form.controls[questionData.linkId].setValidators([]);
  //             this.form.controls[questionData.linkId].updateValueAndValidity();
  //           }
  
  //         } 
  //       }
  //     }
  //   if(questionData.type == 'group') {
  //     questionData.item.map(el => this.editEnableLoopMethod(el, linkId, qType));
  //   }

  //   if(!questionData.hasOwnProperty('type')) {
  //     questionData.map(el => this.editEnableLoopMethod(el, linkId, qType));
  //   }
  // }

  checkEnableWhenObject(questionData, condition?:any, compareLinkID?:any) {
    // if(this.isFrom == 'viewform' ) {
    //   if(questionData.hasOwnProperty('text')) {
    //   let UDIObjectText = questionData.text;
    //   let UDIlinkID = questionData.linkId;
    //   if(UDIObjectText == 'UDI (numbers only, max 14 digits)') {
    //     console.log('inside UDI (numbers only, max 14 digits)')
    //     this.deviceinfo(this.form.value[UDIlinkID]);
    //   }
    //   }

    // }
    
      if(!compareLinkID) {
        if(questionData.hasOwnProperty('enableWhen')) {
          questionData.isShowNow = condition;
          if(condition == false) {
            this.form.controls[questionData.linkId].setValidators([]);
            this.form.controls[questionData.linkId].updateValueAndValidity();
          }
        } else {
          questionData.isShowNow = true;
        }
      } else {
        if(questionData.hasOwnProperty('enableWhen')) {
          // if(linkID != '3') {
          // }
          for(let qItem of questionData.enableWhen) {
            if(qItem.question == compareLinkID) {
            // let tempVar = this.getenableWhenResult(questionData.enableWhen, compareLinkID);
              if(this.enableOrNot(qItem.hasOwnProperty('operator') ? qItem.operator : '=', 
              this.form.value[compareLinkID], 
              (qItem[this.questionType]) )) {
                    questionData.isShowNow = true;
                    this.form.controls[questionData.linkId].setValidators(this.getValidators(questionData));
                    this.form.controls[questionData.linkId].updateValueAndValidity();
                    break;
              } else {
                questionData.isShowNow = false;
                if(questionData.type == 'group') {
                  let subQuestions = questionData;
                  this.hideAllSubgroup(subQuestions, 'hideFields');
                  // return;
                } else {
                  if(this.isFrom != 'editForm') {
                    this.form.controls[questionData.linkId].setValue(null, {emitModelToViewChange: false});
                  }
                  this.form.controls[questionData.linkId].setValidators([]);
                  this.form.controls[questionData.linkId].updateValueAndValidity();

                }
              }
            }

          }
        }
    }

    if(questionData.type == 'group') {
      questionData.item.map(el => this.checkEnableWhenObject(el, condition, compareLinkID));
    }

    if(!questionData.hasOwnProperty('type')) {
      questionData.map(el => this.checkEnableWhenObject(el, condition, compareLinkID));
    }

    
  }

  // getenableWhenResult(enableWhen, checkWithId) {
  //   let result:boolean = false;
  //   for(let item of enableWhen) {
  //     if(item.question == checkWithId) {
  //       if(this.enableOrNot(item.hasOwnProperty('operator') ? item.operator : '=', 
  //       this.form.value[item.question], 
  //       (item[this.questionType]) )) {
  //         result = true;
  //         break;
  //       }
  //     }
  //   }

  //   return result;
  // }

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

  hideAllSubgroup(subQuestionData, ifFor) {
    
    if(subQuestionData.hasOwnProperty('type') && subQuestionData.type != 'group') {
      if(ifFor == 'fillData') { 
        switch(subQuestionData.text) {
          case('Brand Name'): { 
            if(this.deviceInformation) {
              this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.brandName, {emitEvent: false})
              this.form.controls[subQuestionData.linkId].disable();
              this.form.controls[subQuestionData.linkId].updateValueAndValidity();
            } else {
              this.form.controls[subQuestionData.linkId].setValue(null,{emitEvent: false})
              this.form.controls[subQuestionData.linkId].disable();
              this.form.controls[subQuestionData.linkId].updateValueAndValidity();
            }
  
          }
          break;
          case('Version or Model'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.versionModelNumber, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('Company Name'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.companyName, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('Device Description'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.deviceDescription, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('Primary Device Identifier Number'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.identifiers.map.identifier.myArrayList[0].map.deviceId, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('What MRI safety information does the labeling contain?'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.MRISafetyStatus, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('Device required to be labeled as containing natural rubber latex or dry natural rubber.'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.labeledContainsNRL, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('Device labeled as “Not made with natural rubber latex”.'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.labeledNoNRL, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('For Single-Use'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.singleUse, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('Kit'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.deviceKit, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('Combination Product'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.deviceCombinationProduct, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('Human Cell, Tissue or Cellular or Tissue-Based Product (HCT/P)'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.deviceHCTP, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('GMDN: (text box for name, not description; can contain more than one GMDN, comma separated)'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.gmdnTerms.map.gmdn.myArrayList[0].map.gmdnPTName, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('GMDN'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.gmdnTerms.map.gmdn.myArrayList[0].map.gmdnPTName, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
          case('FDA Product Code'): { 
            if(this.deviceInformation) {
            this.form.controls[subQuestionData.linkId].setValue(this.deviceInformation.productCodes.map.fdaProductCode.myArrayList[0].map.productCode, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          } else {
            this.form.controls[subQuestionData.linkId].setValue(null, {emitEvent: false})
            this.form.controls[subQuestionData.linkId].disable();
            this.form.controls[subQuestionData.linkId].updateValueAndValidity();
          }
          }
          break;
        }

    } else {
      
          subQuestionData.isShowNow = false;
        this.form.controls[subQuestionData.linkId].setValue(null, {emitModelToViewChange: false});
        this.form.controls[subQuestionData.linkId].setValidators([]);
        this.form.controls[subQuestionData.linkId].updateValueAndValidity();
      
    }
    }


    if(subQuestionData.type == 'group') {
      // this.form.controls[subQuestionData.linkId].setValue(null, {emitModelToViewChange: false});
      subQuestionData.item.map(el => this.hideAllSubgroup(el, ifFor));
    }

    if(!subQuestionData.hasOwnProperty('type') && subQuestionData instanceof Array) {
      subQuestionData.map(el => this.hideAllSubgroup(el, ifFor));
    }
  }

  enableOrNot(operatorTocheck, operandOne, operandTwo) {
    if(operatorTocheck != (undefined || null) && operandOne != (undefined || null) && operandTwo != (undefined || null)) {
      // let operandOne = operand1;
      // let operandTwo = operand2
      // let operatorTocheck = operator;

      if(typeof operandOne == 'string') {
        if(operandOne.includes('@@')) {
          let temp = null;
          temp = operandOne.split('@@')[0]
          operandOne = temp

        }
        //  else {
        //   operandOne = operandOne;
        // }
      }

      if(operandOne instanceof Array) {
        let val = [];
        if(operandOne[0].includes('@@')) {
          for(let item of operandOne) {
            val.push(item.split('@@')[0])

            
          }
          operandOne = val;
        }
      }
      switch(operatorTocheck) {
        case('=') :  
        {
          if(operandOne instanceof Array) {
            let returnVal:boolean;
            for(let val of operandOne) {
              val == operandTwo ? returnVal == true : '';
            }
            return returnVal;
          } else {
            return operandOne == operandTwo
          }
          // return typeof operandOne == 'object' ? 
          // operandOne.valueCoding.display == operandTwo:
          // operandOne == operandTwo
        };
        case('!=') : return operandOne != operandTwo;
        case('>') : return operandOne > operandTwo;
        case('<') : return operandOne < operandTwo;
        case('<=') : return operandOne <= operandTwo;
        case('>=') : return operandOne >= operandTwo;
      }
    }
  }

  

  getQuestionType(type, isFor) { 
    switch(type) {
      case('boolean'): return (isFor == 'question'? 'answerBoolean' : 'valueBoolean');
      case('decimal'): return (isFor == 'question'? 'answerDecimal' : 'valueDecimal');
      case('integer'): return (isFor == 'question'? 'answerInteger' : 'valueInteger');
      case('date'): return (isFor == 'question'? 'answerDate' : 'valueDate');
      case('dateTime'): return (isFor == 'question'? 'answerDateTime' : 'valueDateTime');
      case('time'): return (isFor == 'question'? 'answerTime' : 'valueTime');
      case('string'): return (isFor == 'question'? 'answerString' : 'valueString');
      case('text'): return (isFor == 'question'? 'answerString' : 'valueString');
      case('Coding'): return (isFor == 'question'? 'answerCoding' : 'valueCoding');
      case('Quantity'): return (isFor == 'question'? 'answerQuantity' : 'valueQuantity');
      case('choice'): return (isFor == 'question'? 'answerString' : 'valueString');
    }
  }

  scaningUID(groupitem:any){
      this.barcodeScanner.scan().then(barcodeData => {
        this.scaneddata= barcodeData
        groupitem.item[0].answer[0].valueString = this.scaneddata.text
        this.deviceinfo(this.scaneddata.text);
    
       }).catch(err => {
       });
    
    }

   deviceinfo(barecodedata) {
    this.QuestionaryService.getdeviceInfo(barecodedata).subscribe(data => {
      if(data) {
        this.deviceInformation = data.map.gudid.map.device.map;
        this.hideAllSubgroup(this.questions, 'fillData');
      } else {
        this.deviceInformation = null;
      }
      
      
    }, error => {
      this.deviceInformation = null;
      this.hideAllSubgroup(this.questions, 'fillData');
    })
   }

   gertdeviceinfo(event, node) {
     if(event.target.value.length == 14) {
      this.deviceinfo(event.target.value);
     } else {
      this.deviceInformation = null;
      this.hideAllSubgroup(this.questions, 'fillData');
     }
   }

  submitFormAPIcall(action) {
    if(this.isFrom == 'editForm') {
      this.updateFormAPIcall(action);
      return;
    }

    let loader = this.loadingCtrl.create({
      content: 'please wait..'
    })
    loader.present();
    // let patientName =  this.PatientDetails['patient'].firstname+" "+this.PatientDetails['patient'].lastname;
    

    let patientID = this.PatientDetails['patient'].PatentId;
    let personId = this.PersonDetails.entry[0].resource.id
    let questionnaireResponse = {
      "questionnaire": "Questionnaire/"+this.Questionnarie.id,
      "subject": {
        "reference": "Patient/"+patientID
      },
      "author": {
        "reference": "Practitioner/"+personId
      },
       "resourceType": "QuestionnaireResponse",
       "id": this.Questionnarie.id,
       "status": action == 'save'? "in-progress" : "completed",
       'item':this.answerObject(this.questions, this.form),
       "title": this.Questionnarie.title  
      }


     this.QuestionaryService.postQuetionnaries(questionnaireResponse).subscribe(data => {
       loader.dismiss();

       localStorage.removeItem('Patientdetails');
      //  this.navCtrl.push('ThankYouPage')
      this.navCtrl.pop();
      let toastMsg = action == 'save'? "Form saved successfully" : "Form submitted successfully";
      let toast = this.toasatCtrl.create({
        message: toastMsg,
        duration: 2000,
        // position: 'top'
      });
      toast.present();
     }, error => {
       loader.dismiss();
     })

  }

  updateFormAPIcall(action) {
    let loader = this.loadingCtrl.create({
      content: 'please wait..'
    })
    loader.present();
    let updateQuestionnaireResponse = {
      "questionnaire": this.questionObject.questionnaire,
      "subject": this.questionObject.subject,
      "author": this.questionObject.author,
       "resourceType": "QuestionnaireResponse",
       "id": this.questionObject.QuestionnaireResponseID,
       "status": action == 'save'? "in-progress" : "completed",
       'item':this.answerObject(this.questions, this.form),
       "title": this.questionObject.title  
      }


      this.QuestionaryService.UpdateQuetionnaries( this.questionObject.QuestionnaireResponseID, updateQuestionnaireResponse).subscribe(data=>{
        loader.dismiss();
        let toastMsg = action == 'save'? "Form updated successfully" : "Form submitted successfully";
        let toast = this.toasatCtrl.create({
          message: toastMsg,
          duration: 2000,
          // position: 'top'
        });
        toast.present();
        this.navCtrl.pop()
      }, error => {
        loader.dismiss();
      })
  }

  answerObject(questionJson, formData: FormGroup) {
    
    if(formData.getRawValue()[questionJson.linkId] != null) {
      let answerType = this.getQuestionType(questionJson.type, 'answer');
      if(questionJson.type == 'choice') {
        let tempArray = [];
        // questionJson['answer'] = formData.value[questionJson.linkId];
        if(formData.getRawValue()[questionJson.linkId]) {
          if(typeof formData.value[questionJson.linkId] != 'string') {
            for(let item of formData.value[questionJson.linkId]) {
              let tempVal = {
                valueCoding: {
                  code: item.split('@@')[1],
                  display: item.split('@@')[0]
                }
              }
              tempArray.push(tempVal);
            }
            questionJson['answer'] = tempArray;
          } else {
            questionJson['answer'] = {
              valueCoding: {
                code: formData.value[questionJson.linkId].split('@@')[1],
                display: formData.value[questionJson.linkId].split('@@')[0]
              }
            };
          }

        }
      } 
      // else if(questionJson.text == 'UDI (numbers only, max 14 digits)' || questionJson.text == 'Primary Device Identifier Number') {
      //   questionJson['answer'] = {'valueString': formData.getRawValue()[questionJson.linkId] };
      // } 
      else {
        questionJson['answer'] = {[answerType]: formData.getRawValue()[questionJson.linkId] }
        // questionJson['answer'] = {[answerType]: formData.value[questionJson.linkId]};
      }
    }

    if(questionJson.type == 'group') {
      questionJson.item.map(el => this.answerObject(el, formData));
    }

    if(!questionJson.hasOwnProperty('type') && questionJson instanceof Array) {
      questionJson.map(el => this.answerObject(el, formData));
    }

    return questionJson;
  }

  prepareAnswerObject(questions, form) {

  }

}
