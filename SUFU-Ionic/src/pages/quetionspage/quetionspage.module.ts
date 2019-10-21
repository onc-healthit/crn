import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuetionspagePage } from './quetionspage';
import {GroupQurtionsDisplayPageModule} from '../../pages/group-qurtions-display/group-qurtions-display.module'

@NgModule({
  declarations: [
    QuetionspagePage
  ],
  imports: [
    IonicPageModule.forChild(QuetionspagePage),
    GroupQurtionsDisplayPageModule
  ],
  exports: [
    QuetionspagePage, GroupQurtionsDisplayPageModule
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuetionspagePageModule {}
