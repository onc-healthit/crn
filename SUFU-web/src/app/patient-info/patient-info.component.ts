import { Component, OnInit} from '@angular/core';
import { TransferService } from 'src/services/transferdata.service';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatienatInfoComponent implements OnInit {
 
  patientDetails:any;
  patientResourceByGroup:any;
  patientResourceKey:any;
  selectedType:any;
  selectedData:any;
  entrydata:any = [];
  errorMessage:any = '';
  constructor(private transferService: TransferService,
    private patientService: PatientService) {
      this.patientDetails = this.transferService.getData();
    }


  ngOnInit() {
    if(this.patientDetails) {
      this.getPatientResourcecDetails(this.patientDetails.PatentId);
    }
  }

  onSelectType(type, data) {
    if(data) {
      this.selectedData = data;
      this.selectedType = type;
    }
  }


  getPatientResourcecDetails(patientId) {
    this.patientService.getPatientResource(patientId).subscribe(data => {
      if(data && data.hasOwnProperty('entry')) {
        let temp =  data.entry.reduce(function (r, a) {
            r[a.resource.resourceType] = r[a.resource.resourceType] || [];
            r[a.resource.resourceType].push(a);
            return r;
        }, Object.create(null));
        this.patientResourceByGroup = temp;
        this.patientResourceKey =  Object.keys(this.patientResourceByGroup);
      } else {
        this.errorMessage = 'No record Found!';
      }



    })
  }

  getSubmitedQuestion(id, type) {
    this.patientService.getSubmitedFormByPatentID(id).subscribe(data => {
      if(data.total > 0) {
        this.selectedData = data.entry
        this.selectedType = type.name;
      }
    })
  }
  
  // getQuestionNmae() {
  //   for(let i=0;i<this.entrydata.length;i++){
  //     let names = this.entrydata[i].resource.questionnaire.split("/");
  //      let id = names[1];
  //      this.entrydata[i]['id'] =  id
  
  //        this.patientService.getQuetions(id).subscribe(data=>{
  //           let tempTest = data;
            
  //           // data['submitedAns']=this.entrydata[i].resource.item
  //           tempTest['QuestionnaireResponseID'] = this.entrydata[i].resource.id
  //           tempTest['questionnaire'] = this.entrydata[i].resource.questionnaire
  //           tempTest['resourceType'] = this.entrydata[i].resource.resourceType
  //           tempTest['subject'] = this.entrydata[i].resource.subject
  //           tempTest['author'] = this.entrydata[i].resource.author
  //           tempTest['meta']=this.entrydata[i].resource.meta
  //           tempTest['status']=this.entrydata[i].resource.status
  //           let names = this.entrydata[i].resource.subject.reference.split("/");
  //           let id = names[1];
  //           // this.displayforms1.push(tempTest)
  //           // this.alldata = this.displayforms
  //        })
        
  //    }
  // }

}
