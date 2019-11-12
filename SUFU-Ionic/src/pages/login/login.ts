import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { HomePage } from '../../pages/home/home';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../login/login.service'
import { SmartOnFhire } from '../../services/smartonfhire.service';
//import { TabsPage } from '../../pages/tabs/tabs';
//import { MenuPage } from '../menu/menu';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[LoginService]
})
export class LoginPage {
  loginForm: FormGroup;
  displayerrormessage:boolean = false
  public isLoading: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder, 
    public loginservice:LoginService,
    private shartFhirService: SmartOnFhire) {
      // this.loginForm = fb.group({
      //   email: ['test@gmail.com', Validators.required],
      //   password: ['test', Validators.required],
      // });
      this.loginForm = fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
  }
  form: FormGroup;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(){
 
    this.isLoading = !(this.isLoading);
      this.loginservice.getPersonDetails(this.loginForm.value.email,this.loginForm.value.password).subscribe(data=>{
        console.log(data)
   
      // localStorage.removeItem('Patientdetails');
       localStorage.setItem('LoginDetails', JSON.stringify(data)); 
        this.navCtrl.setRoot('MenuPage');
        this.isLoading = !(this.isLoading);
      },(error)=>{

        console.log("plzz give valid username")
        this.isLoading = !(this.isLoading);
        this.displayerrormessage = true
      }
      )

    // if(this.loginForm.value.email == "test@gmail.com" && this.loginForm.value.password == "test"){
    // localStorage.removeItem('Patientdetails');
    // this.navCtrl.setRoot('MenuPage');
    // }else{
    //   console.log("plzz give valid username")
    //   this.displayerrormessage = true
    // }
    
  }

}
