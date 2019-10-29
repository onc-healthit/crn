import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule, MatTableModule, MatPaginatorModule, MatInputModule, MatSortModule, MatProgressSpinnerModule, MatProgressBarModule  } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from '../core/loader/loader.component';
import { RestService } from './../core/rest.service';
import { LoaderService } from './../core/loader/loader.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from 'src/services/login.service';
import { PatientService } from 'src/services/patient.service';
import { TransferService } from 'src/services/transferdata.service';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    LoaderComponent,
    
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgbModule,
    FormsModule,
    HeaderModule
  ],
  providers: [
    RestService,
    LoaderService,
    LoginService,
    PatientService,
    TransferService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
