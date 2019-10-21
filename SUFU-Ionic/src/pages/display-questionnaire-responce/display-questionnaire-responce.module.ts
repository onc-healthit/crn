import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayQuestionnaireResponcePage } from './display-questionnaire-responce';

@NgModule({
  declarations: [
    DisplayQuestionnaireResponcePage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayQuestionnaireResponcePage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DisplayQuestionnaireResponcePageModule {}
