import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionsPage } from './questions';

@NgModule({
  declarations: [
    QuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionsPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuestionsPageModule {}
