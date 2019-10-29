import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HIVE-WEB';

  loginData:any;
  isLogin:any;
  pageUrl: string = "";
  constructor(private router: Router) {
    this.loginData = localStorage.getItem('loginData');
    this.isLogin = localStorage.getItem('isLogin');
    this.pageUrl = this.router.url;
    if(!this.isLogin) {
      this.router.navigate(['/login']);
    }
  }
}
