import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestQuestionsDispalyPage } from './test-questions-dispaly';

@NgModule({
  declarations: [
    TestQuestionsDispalyPage,
  ],
  imports: [
    IonicPageModule.forChild(TestQuestionsDispalyPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestQuestionsDispalyPageModule {}
