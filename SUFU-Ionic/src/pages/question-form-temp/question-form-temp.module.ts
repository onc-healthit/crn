import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionFormTempPage } from './question-form-temp';

@NgModule({
  declarations: [
    QuestionFormTempPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionFormTempPage),
  ],
})
export class QuestionFormTempPageModule {}
