import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionFormPage } from './question-form';

@NgModule({
  declarations: [
    QuestionFormPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionFormPage),
  ],
})
export class QuestionFormPageModule {}
