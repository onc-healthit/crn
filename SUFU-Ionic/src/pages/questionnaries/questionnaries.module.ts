import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionnariesPage } from './questionnaries';

@NgModule({
  declarations: [
    QuestionnariesPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionnariesPage),
  ],
})
export class QuestionnariesPageModule {}
