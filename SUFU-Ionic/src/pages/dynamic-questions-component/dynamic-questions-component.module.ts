import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DynamicQuestionsComponentPage } from './dynamic-questions-component';

@NgModule({
  declarations: [
    DynamicQuestionsComponentPage,
  ],
  imports: [
    IonicPageModule.forChild(DynamicQuestionsComponentPage),
  ],
})
export class DynamicQuestionsComponentPageModule {}
