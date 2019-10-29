import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatienatInfoComponent } from './patient-info.component';
import { InfoListComponent } from './info-list/info-list.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
        path: '', component: PatienatInfoComponent
      },
      {
        path: 'info-list', component: InfoListComponent
      },
      {
        path: 'details', component: DetailsComponent
      }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientInfoRoutingModule { }
