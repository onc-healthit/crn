import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthRequestPage } from './auth-request';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthRequestPage,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IonicPageModule.forChild(AuthRequestPage),
  ],
})
export class AuthRequestPageModule {}
