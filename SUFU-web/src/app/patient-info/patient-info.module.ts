import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PatientInfoRoutingModule } from './patient-info-routing.module';

import { DetailsComponent } from './details/details.component';
import { InfoListComponent } from './info-list/info-list.component';
import { PatienatInfoComponent } from './patient-info.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [
    PatienatInfoComponent,
    DetailsComponent, 
    InfoListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    PatientInfoRoutingModule,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientInfoModule { }
