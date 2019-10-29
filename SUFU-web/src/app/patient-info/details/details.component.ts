import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() patientdetails
  @Input() type
  jsonData:any
  constructor() {
   }

  ngOnInit() {

  }

  public toggleAccordion(selectedItem:any) {
    for(let item of this.patientdetails) {
      if(item.resource.id == selectedItem.resource.id) {
        item.isShowQuestions = !item.isShowQuestions;
      } else {
        item.isShowQuestions = false;
      }
    }
    // this.ngZone.run(() => {
    //   item.isShowQuestions = !item.isShowQuestions;
    // })

  }

}
