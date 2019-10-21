import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayformsPage } from './displayforms';
import { FilterByContacts } from '../../pipes/searchPipe';

@NgModule({
  declarations: [
    DisplayformsPage,
    FilterByContacts
  ],
  imports: [
    IonicPageModule.forChild(DisplayformsPage),
  ],
})
export class DisplayformsPageModule {}
