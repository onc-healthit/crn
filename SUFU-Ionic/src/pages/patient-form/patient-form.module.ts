import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientFormPage } from './patient-form';

@NgModule({
  declarations: [
    PatientFormPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientFormPage),
  ],
})
export class PatientFormPageModule {}
