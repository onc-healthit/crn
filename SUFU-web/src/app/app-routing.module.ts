import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth.gaurd';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'home', component: HomePageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'patient', 
    loadChildren: './patient-info/patient-info.module#PatientInfoModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
