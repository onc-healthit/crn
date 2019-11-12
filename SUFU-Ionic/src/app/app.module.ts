import { NgModule, ErrorHandler,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
//import { HomePage } from '../pages/home/home';
//import { TabsPage } from '../pages/tabs/tabs';
//import {LoginPage} from '../pages/login/login'

import {AboutPageModule} from '../pages/about/about.module'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {ConstService } from './../providers/constent-service';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
///import {TabsPageModule} from '../pages/tabs/tabs.module'

import {LoginPageModule} from '../pages/login/login.module'
import {DisplayformsPageModule} from '../pages/displayforms/displayforms.module'
import {GroupQurtionsDisplayPageModule} from '../pages/group-qurtions-display/group-qurtions-display.module'
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import {MenuPageModule} from '../pages/menu/menu.module'
import {PopoverPageModule} from  '../pages/popover/popover.module'
import {GlobalService} from '../providers/global.service'
import {DynamicQuestionsComponentPage} from '../pages/dynamic-questions-component/dynamic-questions-component'
import { QuestionFormPageModule } from '../pages/question-form/question-form.module';
import { QuestionFormTempPageModule } from '../pages/question-form-temp/question-form-temp.module';
import { SmartOnFhire } from '../services/smartonfhire.service';
import { DataService } from '../services/data.service';
import { AuthRequestPageModule } from '../pages/auth-request/auth-request.module';
//import {GroupQurtionsDisplayPage} from '../pages/group-qurtions-display/group-qurtions-display'
//import {MatExpansionModule } from '@angular/material';

//import {BrowserAnimationsModule} from '@angular/platform browser/animations';
//import { IonicTreeViewModule } from 'ionic-tree-view';

@NgModule({
  declarations: [
    MyApp,
    //AboutPage,
    ContactPage,
    DynamicQuestionsComponentPage,
    //HomePage,
    //LoginPage,
    //TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
   // TabsPageModule,
    LoginPageModule,
    MenuPageModule,
    AboutPageModule,
    DisplayformsPageModule,
    PopoverPageModule,
    GroupQurtionsDisplayPageModule,
    DisplayformsPageModule,
    QuestionFormPageModule,
    QuestionFormTempPageModule,
    AuthRequestPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    //IonicPageModule.forChild(LoginPage),
    
  ],
  exports: [GroupQurtionsDisplayPageModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //AboutPage,
    ContactPage,
    DynamicQuestionsComponentPage,
    //HomePage,
    //LoginPage,
    //TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    GlobalService,
    SmartOnFhire,
    DataService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConstService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
