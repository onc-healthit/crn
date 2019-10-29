import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/services/login.service';
import { CustomValidators } from 'src/validators/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  isLogin:any;
  constructor(private loginService: LoginService,
    private router: Router) {

      this.isLogin = localStorage.getItem('isLogin');
      if(this.isLogin) {
        this.router.navigate(['/']);
      }

    this.loginForm = new FormGroup({
      userID: new FormControl('',  [Validators.required, Validators.maxLength(25), CustomValidators.validateEmail]),
      password: new FormControl('', [Validators.required, Validators.maxLength(25)])
    })
   }

  ngOnInit() {

  }

  onSubmit() {
    this.validateAllFormFields(this.loginForm);
    if(this.loginForm) {
      let param = {
        email : this.loginForm.value.userID,
        password: this.loginForm.value.password
      }
      this.loginCall(param);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
        control.markAsDirty({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  loginCall(param) {
    this.loginService.login(param).subscribe(data => {
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('loginData', data);
      this.router.navigate(['/home']);
    })
  }

}
