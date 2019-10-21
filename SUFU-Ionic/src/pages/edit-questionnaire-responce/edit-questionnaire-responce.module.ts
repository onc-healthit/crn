import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditQuestionnaireResponcePage } from './edit-questionnaire-responce';

@NgModule({
  declarations: [
    EditQuestionnaireResponcePage,
  ],
  imports: [
    IonicPageModule.forChild(EditQuestionnaireResponcePage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditQuestionnaireResponcePageModule {}
